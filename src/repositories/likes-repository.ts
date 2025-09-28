import { Like, Post, Prisma } from '@prisma/client'


export interface CreateLikeParams {
  authorId: string;
  postId?: string | null;
  commentId?: string | null;
}

export interface LikesRepository {
  create(data: CreateLikeParams): Promise<Like | null>;
  delete(id: string): Promise<void>;
  findById(likeId: string): Promise<Like | null>;
  findManyByPostId(postId: string): Promise<Like[] | null>;
  findManyByCommentId(commentId: string): Promise<Like[] | null>;
  findManyByUserId(userId: string): Promise<Like[] | null>;
  findManyByCommentId(commentId: string): Promise<Like[] | null>;
  findByAuthorAndPostId(authorId: string, postId: string): Promise<Like | null>
  findByAuthorAndCommentId(authorId: string, commentId: string): Promise<Like | null>;
  findMostLikedPosts(): Promise<Post[] | null>;
}