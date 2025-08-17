import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists-error";
import { RegisterUseCase } from "@/use-cases/register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
    });

    const { nome, email, senha } = registerBodySchema.parse(request.body);

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(prismaUsersRepository);

        await registerUseCase.execute({
            nome,
            email,
            senha,
        });
    } catch (err) {
        if (err instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }

    return reply.status(201).send({ message: "Usuário criado com sucesso" });
}