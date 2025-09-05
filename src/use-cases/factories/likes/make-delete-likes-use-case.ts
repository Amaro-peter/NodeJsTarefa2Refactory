import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { DeleteLikeUseCase } from "@/use-cases/likes/delete-like-use-case";

export function makeDeleteLikesUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const deleteLikeUseCase = new DeleteLikeUseCase(likesRepository);

    return deleteLikeUseCase;
}