import { messages } from "@/constants/messages";

export class ResourceNotFoundError extends Error {
    constructor(arg: string = messages.errors.resourceNotFound) {
        super(arg);
    }
}