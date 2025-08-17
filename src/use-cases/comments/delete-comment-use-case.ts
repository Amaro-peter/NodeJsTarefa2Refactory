import { CommentsRepository } from '@/repositories/comments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error';

interface DeleteCommentUseCaseRequest {
  commentId: string;
  authorId: string;
}

export class DeleteCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    commentId,
    authorId,
  }: DeleteCommentUseCaseRequest): Promise<void> {
    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new ResourceNotFoundError();
    }

    if (comment.authorId !== authorId) {
      throw new InvalidCrendentialsError();
      
    }

    await this.commentsRepository.delete(commentId);
  }
}