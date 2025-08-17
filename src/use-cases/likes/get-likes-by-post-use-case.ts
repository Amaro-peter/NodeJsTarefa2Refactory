import { LikesRepository } from '@/repositories/likes-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { Like } from '@/generated/prisma';

interface GetLikesByPostUseCaseRequest {
  postId: string;
}

interface GetLikesByPostUseCaseResponse {
  likes: Like[];
}

export class GetLikesByPostUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({
    postId,
  }: GetLikesByPostUseCaseRequest): Promise<GetLikesByPostUseCaseResponse> {
    const likes = await this.likesRepository.findManyByPostId(postId);

    if(!likes) {
        throw new ResourceNotFoundError();
    }

    return {
      likes,
    };
  }
}