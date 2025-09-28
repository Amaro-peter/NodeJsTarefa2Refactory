import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { User } from '@prisma/client'
import { InvalidCrendentialsError } from "../errors/invalid-credentials-error";

interface AuthenticateUseCaseRequest {
    email: string
    senha: string;
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    
    constructor(private usersRepository: UsersRepository) {

    }

    async execute({ email, senha }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        const userFound = await this.usersRepository.findByEmail(email);

        if (!userFound) {
            throw new InvalidCrendentialsError();
        }

        const doesPasswordMatch = await compare(senha, userFound.passwordHash)

        if(!doesPasswordMatch) {
            throw new InvalidCrendentialsError();
        }

        return {user: userFound};
    }
}