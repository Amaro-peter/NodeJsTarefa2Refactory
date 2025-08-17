export class DeleteLikeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DeleteLikeError';
  }
}