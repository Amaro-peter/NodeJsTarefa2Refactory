import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetUserPostsUseCase } from "@/use-cases/posts/get-user-posts-use-case";

export function makeGetUserPostUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const getUserPostsUseCase = new GetUserPostsUseCase(postsRepository);

    return getUserPostsUseCase;
}