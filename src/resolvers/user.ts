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
import { Post } from '../entities/Post.entity';
import { User } from '../entities/User.entity';
import { MyContext } from '../types';

@InputType()
class RegisterUserInput {
  @Field()
  username!: string;
  @Field()
  password!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User], {nullable: true})
  async users(@Ctx() context: MyContext): Promise<Array<User>> {
    const allUsers = await context.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .getMany();

    return allUsers;
  }

  @Mutation(() => User)
  async registerUser(
    @Ctx() context: MyContext,
    @Arg('options') options: RegisterUserInput
  ): Promise<boolean> {
    const user = await context.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{ ...options }])
      .execute();

	  console.log("user----", user.raw)

    return user.raw[0];
  }

  @Mutation(() => Post)
  async updatePost(
    @Ctx() context: MyContext,
    @Arg('title', () => String) title: string,
    @Arg('id') id: string
  ): Promise<Post> {
    const post = await context.connection
      .createQueryBuilder()
      .update(Post)
      .set({ title })
      .where('id = :id', { id })
      .returning('*')
      .updateEntity(true)
      .execute();

    return post.raw[0];
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Ctx() context: MyContext,
    @Arg('id') id: string
  ): Promise<boolean> {
    const post = await context.connection
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :id', { id })
      .execute();

    return true;
  }
}
