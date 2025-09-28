import { Like, Prisma } from '@prisma/client'


export interface LikesRepository {
  create(data: Prisma.LikeUncheckedCreateInput): Promise<Like | null>;
  delete(id: string): Promise<void>;
  findById(likeId: string): Promise<Like | null>;
  findManyByPostId(postId: string): Promise<Like[] | null>;
  findManyByCommentId(commentId: string): Promise<Like[] | null>;
  findManyByUserId(userId: string): Promise<Like[] | null>;
  findManyByCommentId(commentId: string): Promise<Like[] | null>;
  findByAuthorAndPostId(authorId: string, postId: string): Promise<Like | null>
  findByAuthorAndCommentId(authorId: string, commentId: string): Promise<Like | null>;
}