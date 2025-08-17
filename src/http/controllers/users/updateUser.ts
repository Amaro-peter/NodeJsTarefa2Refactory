import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { UpdateUserUserCase } from "@/use-cases/update-user-use-case";
import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import z from "zod";


export async function updateUser(request: FastifyRequest, reply: FastifyReply) {

    const updateUserBodySchema = z.object({
        nome: z.string().optional(),
        email: z.string().email().optional(),
        senha: z.string().optional(),
        foto: z.string().optional(),
    });

    const { nome, email, senha, foto } = updateUserBodySchema.parse(request.body);

    const userId = request.user.sub;

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const updateUserUseCase = new UpdateUserUserCase(prismaUsersRepository);
        const user = await updateUserUseCase.execute({
            id: userId,
            data: Object.fromEntries(
                Object.entries({
                    nome: nome,
                    email: email,
                    senha: senha,
                    foto: foto
                }).filter(([_, value]) => value !== undefined)
            )
        });

        return reply.status(200).send({ user });
    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: err.message,
            });
        }
        throw err;
    }
}