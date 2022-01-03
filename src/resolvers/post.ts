import { Ctx, Query, Resolver } from 'type-graphql';
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

    console.log('All posts---', allPosts);
    return [];
  }
}
