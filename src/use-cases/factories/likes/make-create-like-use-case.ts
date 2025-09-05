import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { CreateLikeUseCase } from "@/use-cases/likes/create-like-use-case";

export function makeCreateLikeUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const createLikeUseCase = new CreateLikeUseCase(likesRepository);

    return createLikeUseCase;
}