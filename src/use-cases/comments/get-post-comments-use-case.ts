import { Comment } from '@/generated/prisma';
import { CommentsRepository } from '@/repositories/comments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetPostCommentsUseCaseRequest {
  postId: string;
}

interface GetPostCommentsUseCaseResponse {
  comments: Comment[];
}

export class GetPostCommentsUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    postId,
  }: GetPostCommentsUseCaseRequest): Promise<GetPostCommentsUseCaseResponse> {

    const comments = await this.commentsRepository.findManyByPostId(postId);

    if (!comments || comments.length === 0) {
      throw new ResourceNotFoundError("Comments for the specified post were not found.");
    }

    return {
      comments,
    };
  }
}