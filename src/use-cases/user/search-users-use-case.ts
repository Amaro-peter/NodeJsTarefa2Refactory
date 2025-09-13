import { User } from "@/generated/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface SearchUserUseCaseRequest {
    query: string;
    page: number;
}

interface SearchUserUseCaseResponse {
    users: User[];
}

export class SearchUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ query, page }: SearchUserUseCaseRequest): Promise<SearchUserUseCaseResponse> {
        const users = await this.usersRepository.searchMany(query, page);

        if (!users || users.length === 0) {
            throw new ResourceNotFoundError("No users found for the given query.");
        }

        return { users }
    }
}