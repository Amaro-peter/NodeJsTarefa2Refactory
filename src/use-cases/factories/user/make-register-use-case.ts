import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUseCase } from "../../user/register-use-case";

export function makeRegisterUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    return registerUseCase;
}