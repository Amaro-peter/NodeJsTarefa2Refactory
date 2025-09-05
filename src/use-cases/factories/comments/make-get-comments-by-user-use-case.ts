import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { GetCommentsByUserUseCase } from "@/use-cases/comments/get-comments-by-user-use-case";

export function makeGetCommentsByUserUseCase() {
    const commentsRepository = new PrismaCommentsRepository();
    const getCommentsByUserUseCase = new GetCommentsByUserUseCase(
        commentsRepository
    );

    return getCommentsByUserUseCase;
}