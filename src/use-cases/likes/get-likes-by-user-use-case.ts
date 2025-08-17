import { Like } from '@/generated/prisma';
import { LikesRepository } from '@/repositories/likes-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetLikesByUserUseCaseRequest {
  userId: string;
}

interface GetLikesByUserUseCaseResponse {
  likes: Like[];
}

export class GetLikesByUserUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({
    userId,
  }: GetLikesByUserUseCaseRequest): Promise<GetLikesByUserUseCaseResponse> {
    const likes = await this.likesRepository.findManyByUserId(userId);

    if(!likes) {
        throw new ResourceNotFoundError();
    }

    return {
      likes,
    };
  }
}