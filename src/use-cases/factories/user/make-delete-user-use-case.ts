import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { DeleteUserUseCase } from "../../user/delete-user-use-case";

export function makeDeleteUserUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);

    return deleteUserUseCase;
}