import { Post } from '@/generated/prisma';
import { PostsRepository } from '@/repositories/posts-repository';
import { PostsRetrievalError } from '../errors/post-retrieval-error';

interface GetAllPostsUseCaseResponse {
  posts: Post[];
}

export class GetAllPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute(): Promise<GetAllPostsUseCaseResponse> {
    const posts = await this.postsRepository.findAll();

    if(!posts) {
      throw new PostsRetrievalError();
    }

    return {
      posts,
    };
  }
}