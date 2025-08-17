import { compare, hash } from "bcryptjs";
import { UsersRepository, UserUpdateInput } from "@/repositories/users-repository";
import { User } from "@/generated/prisma";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UserAlreadyExists } from "../errors/user-already-exists-error";


interface UpdateUserUseCaseRequest {
    id: string;
    data: UserUpdateInput;
}

interface UpdateUserUseCaseResponse {
    user: User | null;
}

export class UpdateUserUserCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ id, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const user = await this.usersRepository.findById(id);

        if(!user) {
            throw new ResourceNotFoundError();
        }

        if(data.senha) {
            const doesPasswordMatch = await compare(data.senha, user.senha);

            if(!doesPasswordMatch) {
                data.senha = await hash(data.senha, 8);
            }
        }

        if(data.email) {
            const userWithSameEmail = await this.usersRepository.findByEmail(data.email);

            if(userWithSameEmail && userWithSameEmail.id !== user.id) {
                throw new UserAlreadyExists();
            }
        }

        const updatedUser = await this.usersRepository.update(id, data);

        if(!updatedUser) {
            throw new ResourceNotFoundError();
        }

        return { user: updatedUser };
    }
}