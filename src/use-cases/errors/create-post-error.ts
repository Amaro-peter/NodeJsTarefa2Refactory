import { messages } from "@/constants/messages";

export class PostCreationError extends Error {
  constructor(message: string = messages.errors.createPostError) {
    super(message);
  }
}