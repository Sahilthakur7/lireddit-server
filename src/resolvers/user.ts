import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '../entities/User.entity';
import { MyContext } from '../types';
import argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@InputType()
class UpdateUserInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [Error], { nullable: true })
  errors?: Error[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => [User], { nullable: true })
  async users(@Ctx() context: MyContext): Promise<Array<User>> {
    const allUsers = await context.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();

    return allUsers;
  }

  @Mutation(() => User!)
  async registerUser(
    @Ctx() context: MyContext,
    @Arg('options') options: UsernamePasswordInput
  ) {
    const hashedPassword = await argon2.hash(options?.password);

    const values: UsernamePasswordInput = {
      ...options,
      password: hashedPassword,
    };

    const user = await context.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ ...values }])
      .execute();

    return user.raw[0];
  }

  @Mutation(() => User)
  async updateUser(
    @Ctx() context: MyContext,
    @Arg('options') options: UpdateUserInput,
    @Arg('id', () => Int) id: number
  ): Promise<User | undefined> {
    const hashedPassword = await argon2.hash(options?.password);

    const values: UpdateUserInput = {
      ...options,
      password: hashedPassword,
    };

    const user = await context.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    const updatedUser = await context.connection
      .getRepository(User)
      .save({ ...user, ...values });

    return updatedUser;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Ctx() context: MyContext,
    @Arg('id') id: string
  ): Promise<boolean> {
    const user = await context.connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();

    return true;
  }

  @Mutation(() => UserResponse)
  async login(
    @Ctx() context: MyContext,
    @Arg('options') options: UsernamePasswordInput
  ) {
    const user = await context.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username: options.username })
      .getOne();

    if (!user) {
      errors: [{}];
    }
  }
}
