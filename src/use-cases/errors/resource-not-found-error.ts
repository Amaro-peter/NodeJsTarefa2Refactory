import { messages } from "@/constants/messages";

export class ResourceNotFoundError extends Error {
    constructor(message: string = messages.errors.resourceNotFound) {
        super(message);
    }
}