import { messages } from "@/constants/messages";

export class CreateCommentError extends Error {
  constructor(message: string = messages.errors.createCommentError) {
    super(message);
  }
}