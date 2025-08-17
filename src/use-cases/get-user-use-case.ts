import { User } from "@/generated/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface GetUserUseCaseRequest {
    userId: string;

}

interface GetUserUseCaseResponse {
    user: User | null;
}

export class GetUserCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ userId }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findById(userId);

        if(!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}