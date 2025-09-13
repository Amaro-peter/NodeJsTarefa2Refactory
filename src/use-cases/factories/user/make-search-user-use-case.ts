import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { SearchUsersUseCase } from "@/use-cases/user/search-users-use-case";


export function MakeSearchUsersUseCase(): SearchUsersUseCase {
    const usersRepository = new PrismaUsersRepository();
    return new SearchUsersUseCase(usersRepository);
}