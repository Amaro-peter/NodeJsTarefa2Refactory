import { Post, Prisma } from '@prisma/client'


export interface PostUpdateInput extends Prisma.PostUpdateInput {}

export interface CreatePostParams {
  title: string;
  content: string;
  authorId: string;
}

export interface PostsRepository {
  create(data: CreatePostParams): Promise<Post | null>;
  findById(publicId: string): Promise<Post | null>;
  findManyByUserId(publicId: string): Promise<Post[] | null>;
  delete(publicId: string): Promise<void>;
  update(publicId: string, data: PostUpdateInput): Promise<Post | null>;
  findAll(): Promise<Post[]>;
}