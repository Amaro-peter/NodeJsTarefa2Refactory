import { messages } from "@/constants/messages";

export class CreateLikeError extends Error {
  constructor(message: string = messages.errors.createLikeError) {
    super(message);
  }
}