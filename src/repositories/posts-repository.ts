import { Post, Prisma } from "@/generated/prisma";


export interface PostUpdateInput extends Prisma.PostUpdateInput {}

export interface PostsRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post | null>;
  findById(id: string): Promise<Post | null>;
  findManyByUserId(userId: string): Promise<Post[] | null>;
  delete(id: string): Promise<void>;
  update(id: string, data: PostUpdateInput): Promise<Post | null>;
  findAll(): Promise<Post[]>;
}