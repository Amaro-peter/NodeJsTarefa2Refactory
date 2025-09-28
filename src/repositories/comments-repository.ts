import { Comment, Prisma } from '@prisma/client'

export interface UpdateCommentInput extends Prisma.CommentUpdateInput {}

export interface CommentsRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment | null>;
  findById(id: string): Promise<Comment | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: UpdateCommentInput): Promise<Comment | null>;
  findManyByPostId(postId: string): Promise<Comment[] | null>;
  findAll(): Promise<Comment[] | null>;
  findManyByUserId(userId: string): Promise<Comment[] | null>;
}