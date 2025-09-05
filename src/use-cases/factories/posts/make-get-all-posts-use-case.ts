import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetAllPostsUseCase } from "@/use-cases/posts/get-all-posts-use-case";

export function makeGetAllPostsUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const getAllPostsUseCase = new GetAllPostsUseCase(postsRepository);

    return getAllPostsUseCase;
}