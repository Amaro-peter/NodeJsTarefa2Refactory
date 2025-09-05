import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../../user/authenticate-use-case";

export function makeAuthenticationUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

    return authenticateUseCase;
}