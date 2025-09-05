import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { GetAllCommentsUseCase } from "@/use-cases/comments/get-all-comments-use-case";

export function makeGetAllCommentsUseCase() {
    const commentsRepository = new PrismaCommentsRepository();
    const getAllCommentsUseCase = new GetAllCommentsUseCase(commentsRepository);

    return getAllCommentsUseCase;
}