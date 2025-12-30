import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "../errors/user-already-exists-error";
import { User, UserRole } from '@prisma/client'
import { env } from "@/env";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: UserRole;
}

interface RegisterUseCaseResponse {
    user: User;
}

export class RegisterUseCase {
    
    constructor(private usersRepository: UsersRepository) {}

    async execute({ 
        name, 
        email, 
        password, 
        cpf, 
        role 
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExists();
        }

        const senhaHash = await hash(password, env.HASH_SALT_ROUNDS);

        const user = await this.usersRepository.create({
            name,
            email,
            passwordHash: senhaHash,
            cpf,
            role
        });

        return { user };
    }
}