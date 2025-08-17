import { Comment } from '@/generated/prisma';
import { CommentsRepository } from '@/repositories/comments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetCommentsByUserUseCaseRequest {
  userId: string;
}

interface GetCommentsByUserUseCaseResponse {
  comments: Comment[];
}

export class GetCommentsByUserUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute({
    userId,
  }: GetCommentsByUserUseCaseRequest): Promise<GetCommentsByUserUseCaseResponse> {
    const comments = await this.commentsRepository.findManyByUserId(userId);

    if(!comments) {
        throw new ResourceNotFoundError();
    }

    return {
      comments,
    };
  }
}