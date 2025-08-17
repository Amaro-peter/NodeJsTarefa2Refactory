import { UsersRepository } from "@/repositories/users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExists } from "./errors/user-already-exists-error";
import { User } from "@/generated/prisma";
import { InvalidCrendentialsError } from "./errors/invalid-credentials-error";

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

        const doesPasswordMatch = await compare(senha, userFound.senha)

        if(!doesPasswordMatch) {
            throw new InvalidCrendentialsError();
        }

        return {user: userFound};
    }
}