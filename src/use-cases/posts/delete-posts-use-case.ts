import { PostsRepository } from '@/repositories/posts-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error';

interface DeletePostUseCaseRequest {
  postId: string;
  authorId: string;
}

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({ postId, authorId }: DeletePostUseCaseRequest): Promise<void> {
    const post = await this.postsRepository.findById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    if (post.authorId !== authorId) {
      throw new InvalidCrendentialsError();
    }

    await this.postsRepository.delete(postId);
  }
}