import { messages } from "@/constants/messages";

export class UserAlreadyExists extends Error {
    constructor() {
        super(messages.validation.userAlreadyExists);
    }
}