export class CreateCommentError extends Error {
  constructor(message: string = 'Erro ao criar o comentário.') {
    super(message);
    this.name = 'CreateCommentError';
  }
}