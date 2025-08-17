export class PostCreationError extends Error {
  constructor() {
    super('Failed to create the post.');
    this.name = 'PostCreationError';
  }
}