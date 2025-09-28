import { messages } from "@/constants/messages";

export class DeleteLikeError extends Error {
  constructor(message: string = messages.errors.deleteLikeError) {
    super(message);
  }
}