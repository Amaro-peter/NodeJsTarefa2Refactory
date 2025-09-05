import { makeUserUseCase } from "@/use-cases/factories/user/make-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";


export async function profile(request: FastifyRequest, reply: FastifyReply) {
    const userUseCase = makeUserUseCase();

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