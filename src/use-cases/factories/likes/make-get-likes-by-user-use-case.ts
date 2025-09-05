import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { GetLikesByUserUseCase } from "@/use-cases/likes/get-likes-by-user-use-case";

export function makeGetLikesByUserUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const getLikesByUserUseCase = new GetLikesByUserUseCase(likesRepository);

    return getLikesByUserUseCase;
}