import { Like } from "@/generated/prisma";
import { LikesRepository } from "@/repositories/likes-repository";
import { CreateLikeError } from "../errors/create-like-error";


interface CreateLikeUseCaseRequest {
  authorId: string;
  postId?: string;
  commentId?: string;
}

interface CreateLikeUseCaseResponse {
  like: Like;
}

export class CreateLikeUseCase {
  constructor(private likesRepository: LikesRepository) {}

  async execute({
    authorId,
    postId,
    commentId,
  }: CreateLikeUseCaseRequest): Promise<CreateLikeUseCaseResponse> {

    if (!authorId) {
      throw new CreateLikeError('O ID do autor é obrigatório.');
    }

    if (!postId && !commentId) {
      throw new CreateLikeError('É necessário fornecer o ID do post ou do comentário.');
    }

    if (postId && commentId) {
      throw new CreateLikeError('Não é permitido fornecer ambos os IDs (post e comentário) ao mesmo tempo.');
    }

    const existingLike = postId ? await this.likesRepository.findByAuthorAndPostId(authorId, postId)
                                : await this.likesRepository.findByAuthorAndCommentId(authorId, commentId!);

    if (existingLike) {
        throw new CreateLikeError('Você já deu like neste conteúdo.');
    }

    const like = await this.likesRepository.create({
      authorId,
      postId: postId ?? null,
      commentId: commentId ?? null,
    });

    if (!like) {
      throw new CreateLikeError('Não foi possível criar o like.');
    }

    return {
      like,
    };
  }
}