import { messages } from "@/constants/messages";

export class InvalidCrendentialsError extends Error {
    constructor(message: string = messages.errors.invalidCredentials) {
        super(message);
    }
}