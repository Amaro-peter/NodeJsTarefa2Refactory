import { messages } from "@/constants/messages";

export class UserAlreadyExists extends Error {
    constructor(message: string = messages.validation.userAlreadyExists) {
        super(message);
    }
}