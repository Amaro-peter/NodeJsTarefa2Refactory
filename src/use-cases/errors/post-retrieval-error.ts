import { messages } from "@/constants/messages";

export class PostsRetrievalError extends Error {
  constructor(message: string = messages.errors.postRetrievalError) {
    super(message);
  }
}