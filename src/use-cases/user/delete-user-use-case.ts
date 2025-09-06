import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteUserUseCaseRequest {
    publicId: string;
}

export class DeleteUserUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ publicId }: DeleteUserUseCaseRequest): Promise<void> {
        const user = await this.usersRepository.delete(publicId);

        if (!user) {
            throw new ResourceNotFoundError("User not found.");
        }
    }
}