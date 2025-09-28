import { messages } from "@/constants/messages";


export class ForbiddenError extends Error {
  constructor(message: string = messages.errors.forbidden) {
    super(message);
  }
}