import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { User } from '../entities/User.entity';
import { MyContext } from '../types';

@InputType()
class RegisterUserInput {
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
    @Arg('options') options: RegisterUserInput
  ) {
    const user = await context.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ ...options }])
      .execute();

    return user.raw[0];
  }

  @Mutation(() => User)
  async updateUser(
    @Ctx() context: MyContext,
    @Arg('options') options: UpdateUserInput,
    @Arg('id', () => Int) id: number
  ): Promise<User | undefined> {
    const user = await context.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    const updatedUser = await context.connection
      .getRepository(User)
      .save({ ...user, ...options });

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
}
