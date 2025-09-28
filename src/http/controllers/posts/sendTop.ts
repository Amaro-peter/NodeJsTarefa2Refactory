import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetByMostLikedUseCase } from "@/use-cases/factories/likes/make-get-by-most-liked-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

async function topPosts(request: FastifyRequest, reply: FastifyReply) {
    try {
        const getMostLikedPosts = makeGetByMostLikedUseCase();
        const posts = await getMostLikedPosts.execute();

        return reply.status(200).send(posts);
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }

        throw error;
    }
}