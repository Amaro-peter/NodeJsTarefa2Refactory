import { prisma } from '@/lib/prisma';
import { LikesRepository } from '../likes-repository';
import { Like, Prisma } from '@/generated/prisma';

export class PrismaLikesRepository implements LikesRepository {
  findById(likeId: string): Promise<Like | null> {
    const like = prisma.like.findUnique({
        where: { id: likeId },
    });

    return like;
  }

  async create(data: Prisma.LikeUncheckedCreateInput) {
    const like = await prisma.like.create({
      data,
    });
    return like;
  }

  async delete(id: string) {
    await prisma.like.delete({
      where: { id },
    });
  }

  async findManyByPostId(postId: string) {
    return await prisma.like.findMany({
      where: {
        postId,
      },
    });
  }

  async findManyByUserId(userId: string): Promise<Like[]> {
    return await prisma.like.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async findManyByCommentId(commentId: string): Promise<Like[]> {
    return await prisma.like.findMany({
      where: {
        commentId,
      },
    });
  }

  async findByAuthorAndPostId(authorId: string, postId: string) {
    return await prisma.like.findFirst({
        where: {
        authorId,
        postId,
        },
    });
  }

  async findByAuthorAndCommentId(authorId: string, commentId: string) {
    return await prisma.like.findFirst({
        where: {
        authorId,
        commentId,
        },
    });
  }

}