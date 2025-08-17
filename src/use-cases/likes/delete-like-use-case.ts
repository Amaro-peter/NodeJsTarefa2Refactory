import { LikesRepository } from '@/repositories/likes-repository';
import { DeleteLikeError } from '../errors/delete-like-error';
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error';

interface DeleteLikeUseCaseRequest {
  likeId: string;
  authorId: string;
}

export class DeleteLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({ likeId, authorId }: DeleteLikeUseCaseRequest): Promise<void> {
    const like = await this.likesRepository.findById(likeId);

    if (!like) {
      throw new DeleteLikeError('O like especificado não foi encontrado.');
    }

    if(like.authorId !== authorId) {
        throw new InvalidCrendentialsError('Você não tem permissão para deletar este like.');
    }

    await this.likesRepository.delete(likeId);
  }
}