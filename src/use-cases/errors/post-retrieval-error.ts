export class PostsRetrievalError extends Error {
  constructor(message: string = 'Error retrieving posts') {
    super(message);
    this.name = 'PostsRetrievalError';
  }
}