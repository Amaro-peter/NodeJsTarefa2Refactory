import { prisma } from '@/lib/prisma';
import { PostsRepository, PostUpdateInput } from '../posts-repository';
import { Prisma } from '@/generated/prisma';

export class PrismaPostsRepository implements PostsRepository {
  async create(data: Prisma.PostUncheckedCreateInput) {
    const post = await prisma.post.create({
      data,
    });
    return post;
  }

  async findById(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    return post;
  }

  async findManyByUserId(userId: string) {
    const posts = await prisma.post.findMany({
      where: { authorId: userId },
    });
    return posts;
  }

  async delete(id: string) {
    await prisma.post.delete({
      where: { id },
    });
  }

  async update(id: string, data: PostUpdateInput) {
    const post = await prisma.post.update({
      where: { id },
      data: data,
    });
    return post;
  }

  async findAll() {
    return await prisma.post.findMany();
  }
}