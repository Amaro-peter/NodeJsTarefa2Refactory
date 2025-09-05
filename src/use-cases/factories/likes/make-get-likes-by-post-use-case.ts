import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { GetLikesByPostUseCase } from "@/use-cases/likes/get-likes-by-post-use-case";

export function makeGetLikesByPostUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const getLikesByPostUseCase = new GetLikesByPostUseCase(likesRepository);

    return getLikesByPostUseCase;
}