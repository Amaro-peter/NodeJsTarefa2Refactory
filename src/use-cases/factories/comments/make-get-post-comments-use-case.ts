import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { GetPostCommentsUseCase } from "@/use-cases/comments/get-post-comments-use-case";

export function makeGetPostCommentsUseCase() {
    const commentsRepository = new PrismaCommentsRepository();
    const getPostCommentsUseCase = new GetPostCommentsUseCase(
        commentsRepository
    );

    return getPostCommentsUseCase;
}