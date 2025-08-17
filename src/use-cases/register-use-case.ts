import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExists } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
    nome: string;
    email: string;
    senha: string;
}

export class RegisterUseCase {
    
    constructor(private usersRepository: UsersRepository) {}

    async execute({ nome, email, senha }: RegisterUseCaseRequest) {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExists();
        }

        const senhaHash = await hash(senha, 8);

        await this.usersRepository.create({
            nome,
            email,
            senha: senhaHash,
        });
    }
}