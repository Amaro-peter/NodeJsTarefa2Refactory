import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { UpdateUserUserCase } from "../../user/update-user-use-case";

export function makeUpdateUserUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const updateUserUseCase = new UpdateUserUserCase(prismaUsersRepository);

    return updateUserUseCase;
}