import { User } from "@/generated/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetAllUsersUseCaseResponse {
    users: User[]
}

export class GetAllUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute(): Promise<GetAllUsersUseCaseResponse> {
        const users = await this.usersRepository.findAll();

        if(!users) {
            throw new ResourceNotFoundError();
        }

        return { users };
    }
}