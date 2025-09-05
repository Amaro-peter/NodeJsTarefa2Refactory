import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetAllUsersUseCase } from "@/use-cases/factories/user/make-get-all-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getAllUsersUseCase = makeGetAllUsersUseCase();

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