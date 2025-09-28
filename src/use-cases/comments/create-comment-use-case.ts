import { Comment } from '@prisma/client'
import { CommentsRepository } from '@/repositories/comments-repository';
import { CreateCommentError } from '../errors/create-comment-error';

interface CreateCommentUseCaseRequest {
  conteudo: string;
  authorId: string;
  postId: string;
}

interface CreateCommentUseCaseResponse {
  comment: Comment;
}

export class CreateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    conteudo,
    authorId,
    postId,
  }: CreateCommentUseCaseRequest): Promise<CreateCommentUseCaseResponse> {
    const comment = await this.commentsRepository.create({
      conteudo,
      authorId,
      postId,
    });

    if (!comment) {
      throw new CreateCommentError('Não foi possível criar o comentário.');
    }

    return {
      comment,
    };
  }
}