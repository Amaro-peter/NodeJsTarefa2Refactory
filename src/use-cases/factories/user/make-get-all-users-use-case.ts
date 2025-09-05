import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetAllUsersUseCase } from "../../user/get-all-users-use-case";

export function makeGetAllUsersUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository);

    return getAllUsersUseCase;
}