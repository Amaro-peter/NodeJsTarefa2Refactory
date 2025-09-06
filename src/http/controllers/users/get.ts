import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeUserUseCase } from "@/use-cases/factories/user/make-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        publicId: z.string().uuid()
    });

    const { publicId } = getParamsSchema.parse(request.params);

    try {
        const userUseCase = makeUserUseCase();

        const user = await userUseCase.execute({
            publicId
        });

        return reply.status(200).send(user);

    } catch (err) {
        if (err instanceof ResourceNotFoundError) {
            return reply.status(404).send({
                message: err.message,
            });
        }

        throw err;
    }

}