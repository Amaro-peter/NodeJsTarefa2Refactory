import { messages } from "@/constants/messages";

export class InvalidCrendentialsError extends Error {
    constructor(arg = messages.errors.invalidCredentials) {
        super(arg);
    }
}