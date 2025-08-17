import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { GetAllUsersUseCase } from "@/use-cases/user/get-all-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository);
        const { users } = await getAllUsersUseCase.execute();

        const usersWithoutPassword = users.map(user => {
            const { senha, ...userWithoutPassword } = user;
            return userWithoutPassword;
        })

        return reply.status(200).send(usersWithoutPassword);

    } catch (err) {
        if(err instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: err.message ?? 'Recurso não encontrado.' });
        }

        throw err;
    }
}