import { Post } from '@prisma/client'
import { PostsRepository } from '@/repositories/posts-repository';
import { PostCreationError } from '../errors/create-post-error';


interface CreatePostUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
}

interface CreatePostUseCaseResponse {
  post: Post;
}

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    title,
    content,
    authorId,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const post = await this.postsRepository.create({
      title,
      content,
      authorId,
    });

    if (!post) {
      throw new PostCreationError();
    }

    return {
      post,
    };
  }
}