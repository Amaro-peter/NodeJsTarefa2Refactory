import { Like } from '@/generated/prisma';
import { LikesRepository } from '@/repositories/likes-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetLikeByIdUseCaseRequest {
  likeId: string;
}

interface GetLikeByIdUseCaseResponse {
  like: Like;
}

export class GetLikeByIdUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({
    likeId,
  }: GetLikeByIdUseCaseRequest): Promise<GetLikeByIdUseCaseResponse> {
    const like = await this.likesRepository.findById(likeId);

    if (!like) {
      throw new ResourceNotFoundError();
    }

    return {
      like,
    };
  }
}