import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { DeleteUserUseCase } from "@/use-cases/user/delete-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {

    const userId = request.user.sub;

    try {
        const prismaUsersRepository = new PrismaUsersRepository();
        const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);
        const user = await deleteUserUseCase.execute({
            userId
        });

        return reply.status(204).send();
    } catch (err) {
        if(err instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: err.message,
            });
        }
        throw err;
    }
}