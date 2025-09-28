import { prisma } from '@/lib/prisma';
import { CreatePostParams, PostsRepository, PostUpdateInput } from '../posts-repository';
import { Prisma } from '@prisma/client'

export class PrismaPostsRepository implements PostsRepository {
  async create({title, content, authorId}: CreatePostParams) {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: { publicId: authorId },
        }
      }
    });
    return post;
  }

  async findById(publicId: string) {
    const post = await prisma.post.findUnique({
      where: { publicId },
    });
    return post;
  }

  async findManyByUserId(userId: string) {
    const posts = await prisma.post.findMany({
      where: { publicId: userId },
    });
    return posts;
  }

  async delete(publicId: string) {
    await prisma.post.delete({
      where: { publicId },
    });
  }

  async update(publicId: string, data: PostUpdateInput) {
    const post = await prisma.post.update({
      where: { publicId },
      data: data,
    });
    return post;
  }

  async findAll() {
    return await prisma.post.findMany();
  }
}