import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserCase } from "../../user/get-user-use-case";

export function makeUserUseCase() {
    const prismaUsersRepository = new PrismaUsersRepository();
    const userUseCase = new GetUserCase(prismaUsersRepository);

    return userUseCase;
}