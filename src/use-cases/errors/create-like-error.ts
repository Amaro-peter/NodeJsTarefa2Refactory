export class CreateLikeError extends Error {
  constructor(message: string = 'Erro ao criar o like.') {
    super(message);
    this.name = 'CreateLikeError';
  }
}