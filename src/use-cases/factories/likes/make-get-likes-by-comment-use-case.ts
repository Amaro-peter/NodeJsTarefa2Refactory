import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { GetLikesByCommentUseCase } from "@/use-cases/likes/get-likes-by-comment-use-case";

export function makeGetLikesByCommentUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const getLikesByCommentUseCase = new GetLikesByCommentUseCase(
        likesRepository
    );

    return getLikesByCommentUseCase;
}