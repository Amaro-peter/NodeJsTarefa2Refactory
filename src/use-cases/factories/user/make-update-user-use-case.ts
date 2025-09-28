import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { UpdateUserUseCase } from "../../user/update-user-use-case";

export function makeUpdateUserUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);

    return updateUserUseCase;
}