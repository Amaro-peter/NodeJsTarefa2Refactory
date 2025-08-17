import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserCase } from "@/use-cases/user/get-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const prismaUsersRepository = new PrismaUsersRepository();
    const userUseCase = new GetUserCase(prismaUsersRepository);

    const { user } = await userUseCase.execute({
        userId: request.user.sub
    });

    if (!user) {
        return reply.status(404).send({ error: "User not found" });
    }

    const { senha, ...userWithoutPassword } = user;

    return reply.status(200).send({
        user: userWithoutPassword
    });

}