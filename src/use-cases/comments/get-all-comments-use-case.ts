import { CommentsRepository } from '@/repositories/comments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { Comment } from '@/generated/prisma';

interface GetAllCommentsUseCaseResponse {
  comments: Comment[];
}

export class GetAllCommentsUseCase {
  constructor(private commentsRepository: CommentsRepository) {}

  async execute(): Promise<GetAllCommentsUseCaseResponse> {
    const comments = await this.commentsRepository.findAll();

    if(!comments) {
        throw new ResourceNotFoundError();
    }

    return {
      comments,
    };
  }
}