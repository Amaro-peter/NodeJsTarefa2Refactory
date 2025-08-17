import { LikesRepository } from '@/repositories/likes-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { Like } from '@/generated/prisma';

interface GetLikesByCommentUseCaseRequest {
  commentId: string;
}

interface GetLikesByCommentUseCaseResponse {
  likes: Like[];
}

export class GetLikesByCommentUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({
    commentId,
  }: GetLikesByCommentUseCaseRequest): Promise<GetLikesByCommentUseCaseResponse> {
    const likes = await this.likesRepository.findManyByCommentId(commentId);

    if(!likes) {
        throw new ResourceNotFoundError();
    }

    return {
      likes,
    };
  }
}