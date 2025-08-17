import { Movie, } from "@/generated/prisma";
import { MoviesRepository } from "@/repositories/movies-repository";

interface CreateMovieUseCaseRequest {
    title: string;
    genre: string;
    ageRating: string;
}

interface CreateMovieUseCaseResponse {
    movie: Movie;
}

export class CreateMovieUseCase {
    
    constructor(private movieRepository: MoviesRepository) {

    }

    async execute({ title, genre, ageRating }: CreateMovieUseCaseRequest): Promise <CreateMovieUseCaseResponse> {

        const movie = await this.movieRepository.create({
            titulo: title,
            genero: genre,
            classificacao: ageRating,
        });

        return { movie };
    }
}