import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/user/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        senha: z.string().min(6),
        foto: z.string().optional(),
    });

    const { nome, email, senha, foto } = registerBodySchema.parse(request.body);

    try {
        
        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({
            nome,
            email,
            senha,
            foto,
        });
    } catch (err) {
        if (err instanceof UserAlreadyExists) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }

    return reply.status(201).send({ message: "Usuário criado com sucesso" });
}