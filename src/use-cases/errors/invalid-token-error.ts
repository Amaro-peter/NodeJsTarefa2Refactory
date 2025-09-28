import { messages } from "@/constants/messages";

export class InvalidTokenError extends Error {
  constructor(message: string = messages.errors.invalidToken) {
    super(message);
  }
}