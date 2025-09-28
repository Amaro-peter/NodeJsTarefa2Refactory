import { LikesRepository } from "@/repositories/likes-repository";
import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPostsByMostLikedUseCaseResponse {
    posts: Post[];
}

export class GetPostsByMostLikedUseCase {
    constructor(private likesRepository: LikesRepository) {}

    async execute(): Promise<GetPostsByMostLikedUseCaseResponse> {
        const posts = await this.likesRepository.findMostLikedPosts();

        if(!posts) {
            throw new ResourceNotFoundError();
        }

        return {
            posts,
        };
    }
}