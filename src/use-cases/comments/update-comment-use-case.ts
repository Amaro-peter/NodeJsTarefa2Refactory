import { Comment } from '@/generated/prisma';
import { CommentsRepository, UpdateCommentInput } from '@/repositories/comments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { update } from '@/http/controllers/posts/update';
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error';

interface UpdateCommentUseCaseRequest {
  commentId: string;
  authorId: string;
  data: UpdateCommentInput
}

interface UpdateCommentUseCaseResponse {
  comment: Comment;
}

export class UpdateCommentUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    commentId,
    authorId,
    data,
  }: UpdateCommentUseCaseRequest): Promise<UpdateCommentUseCaseResponse> {
    const comment = await this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new ResourceNotFoundError();
    }

    if (comment.authorId !== authorId) {
      throw new InvalidCrendentialsError();
    }

    const updatedComment = await this.commentsRepository.update(
      commentId,
      data
    );

    if(!updatedComment) {
        throw new ResourceNotFoundError("It was not possible to update the comment.");
    }

    return {
      comment: updatedComment,
    };
  }
}