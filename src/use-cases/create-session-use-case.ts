import { hash } from "bcryptjs";
import { UserAlreadyExists } from "./errors/user-already-exists-error";
import { SessionRepository } from "@/repositories/sessions-repository";
import { Session } from "@/generated/prisma";

interface CreateSessionUseCaseRequest {
    movieId: string;
    startTime: Date;

}

interface CreateSessionUseCaseResponse {
    session: Session;
}

export class CreateSessionUseCase {
    
    constructor(private sessionRepository: SessionRepository) {

    }

    async execute({ movieId, startTime }: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> {

        const session = await this.sessionRepository.create({
            filmeId: movieId,
            horario: startTime.toString(),
        });

        return { session };
    }
}