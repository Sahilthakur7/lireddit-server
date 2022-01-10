import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Post } from '../entities/Post.entity';
import { MyContext } from '../types';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(@Ctx() context: MyContext): Promise<Array<Post>> {
    const allPosts = await context.connection
      .getRepository(Post)
      .createQueryBuilder('post')
      .getMany();

    return allPosts;
  }

  @Query(() => Post, { nullable: true })
  async post(
    @Ctx() context: MyContext,
    @Arg('id', () => Int) id: number
  ): Promise<Post | undefined> {
    const post = await context.connection
      .getRepository(Post)
      .createQueryBuilder('post')
      .where('post.id = :id', { id: id })
      .getOne();

    return post;
  }

  @Mutation(() => Post)
  async createPost(
    @Ctx() context: MyContext,
    @Arg('title', () => String) title: string
  ): Promise<boolean> {
    const post = await context.connection
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values([{ title }])
      .execute();

      console.log("Post----", post.raw);
      return post.raw[0];
  }
}
