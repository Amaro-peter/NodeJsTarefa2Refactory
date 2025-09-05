import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { DeletePostUseCase } from "@/use-cases/posts/delete-posts-use-case";

export function makeDeletePostsUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const deletePostUseCase = new DeletePostUseCase(postsRepository);

    return deletePostUseCase;
}