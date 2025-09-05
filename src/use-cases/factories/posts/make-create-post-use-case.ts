import { PrismaPostsRepository } from "@/repositories/prisma/prisma-posts-repository";
import { CreatePostUseCase } from "@/use-cases/posts/create-posts-use-case";

export function makeCreatePostUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const createPostUseCase = new CreatePostUseCase(postsRepository);

    return createPostUseCase;
}