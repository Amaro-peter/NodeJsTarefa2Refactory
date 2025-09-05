import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { GetLikeByIdUseCase } from "@/use-cases/likes/get-like-by-id-use-case";

export function makeGetLikesByIdUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const getLikeByIdUseCase = new GetLikeByIdUseCase(likesRepository);

    return getLikeByIdUseCase;
}