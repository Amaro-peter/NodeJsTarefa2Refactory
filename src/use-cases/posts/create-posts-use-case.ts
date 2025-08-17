import { Post } from '@/generated/prisma';
import { PostsRepository } from '@/repositories/posts-repository';
import { PostCreationError } from '../errors/create-post-error';


interface CreatePostUseCaseRequest {
  titulo: string;
  conteudo: string;
  authorId: string;
}

interface CreatePostUseCaseResponse {
  post: Post;
}

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    titulo,
    conteudo,
    authorId,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const post = await this.postsRepository.create({
      titulo,
      conteudo,
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