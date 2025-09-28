import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "../errors/user-already-exists-error";
import { UserRole } from '@prisma/client'

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: UserRole;
}

export class RegisterUseCase {
    
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, email, password, cpf, role }: RegisterUseCaseRequest) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExists();
        }

        const senhaHash = await hash(password, 8);

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