import { Post } from '@prisma/client'
import { PostsRepository } from '@/repositories/posts-repository';
import { PostsRetrievalError } from '../errors/post-retrieval-error';

interface GetUserPostsUseCaseRequest {
  userId: string;
}

interface GetUserPostsUseCaseResponse {
  posts: Post[];
}

export class GetUserPostsUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    userId,
  }: GetUserPostsUseCaseRequest): Promise<GetUserPostsUseCaseResponse> {
    const posts = await this.postsRepository.findManyByUserId(userId);

    if(!posts) {
        throw new PostsRetrievalError();
    }

    return {
      posts,
    };
  }
}