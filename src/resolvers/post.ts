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

    return post.raw[0];
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
