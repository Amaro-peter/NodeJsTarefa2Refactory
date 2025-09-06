import { User } from "@/generated/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";


interface GetUserUseCaseRequest {
    publicId: string;

}

interface GetUserUseCaseResponse {
    user: User | null;
}

export class GetUserCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ publicId }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
        const user = await this.usersRepository.findById(publicId);

        if(!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}