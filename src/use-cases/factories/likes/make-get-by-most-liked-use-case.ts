import { PrismaLikesRepository } from "@/repositories/prisma/prisma-likes-repository";
import { GetPostsByMostLikedUseCase } from "@/use-cases/likes/get-by-most-liked-use-case";

export function makeGetByMostLikedUseCase() {
    const likesRepository = new PrismaLikesRepository();
    const getLikeUseCase = new GetPostsByMostLikedUseCase(likesRepository);

    return getLikeUseCase;
}