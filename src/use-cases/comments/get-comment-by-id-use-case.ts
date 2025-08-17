import { Comment } from '@/generated/prisma';
import { CommentsRepository } from '@/repositories/comments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetCommentByIdUseCaseRequest {
  commentId: string;
}

interface GetCommentByIdUseCaseResponse {
  comment: Comment;
}

export class GetCommentByIdUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    commentId,
  }: GetCommentByIdUseCaseRequest): Promise<GetCommentByIdUseCaseResponse> {
    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new ResourceNotFoundError();
    }

    return {
      comment,
    };
  }
}