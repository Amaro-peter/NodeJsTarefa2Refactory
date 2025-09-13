import { logger } from "@/lib/logger";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { MakeSearchUsersUseCase } from "@/use-cases/factories/user/make-search-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function searchUsersController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { query, page } = request.query as { query?: string; page?: string };

        const searchQuery = query || "";
        const pageNumber = page ? parseInt(page, 10) : 1;

        if(isNaN(pageNumber) || pageNumber < 1) {
            return reply.status(400).send({ message: "Invalid page number. Page must be a positive integer." });
        }

        const searchUsersUseCase = MakeSearchUsersUseCase();

        const { users } = await searchUsersUseCase.execute({
            query: searchQuery,
            page: pageNumber,
        });

        logger.info(`Found ${users.length} users matching query "${searchQuery}" on page ${pageNumber}.`);

        return reply.status(200).send({ users });
    } catch (error) {
        if(error instanceof ResourceNotFoundError) {
            return reply.status(404).send({ message: error.message });
        }
        logger.error("Error searching users");
        return reply.status(500).send({ message: "Internal server error." });
    }
}