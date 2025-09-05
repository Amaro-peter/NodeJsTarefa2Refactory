import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { GetCommentByIdUseCase } from "@/use-cases/comments/get-comment-by-id-use-case";

export function makeGetCommentByIdUseCase() {
    const commentsRepository = new PrismaCommentsRepository();
    const getCommentByIdUseCase = new GetCommentByIdUseCase(commentsRepository);

    return getCommentByIdUseCase;
}