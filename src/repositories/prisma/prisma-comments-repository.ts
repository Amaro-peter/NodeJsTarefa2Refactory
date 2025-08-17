import { prisma } from '@/lib/prisma';
import { CommentsRepository, UpdateCommentInput } from '../comments-repository';
import { Prisma } from '@/generated/prisma';

export class PrismaCommentsRepository implements CommentsRepository {
  async create(data: Prisma.CommentUncheckedCreateInput) {
    const comment = await prisma.comment.create({
      data,
    });
    return comment;
  }

  async findById(id: string) {
    const comment = await prisma.comment.findUnique({
      where: { id },
    });
    return comment;
  }

  async delete(id: string) {
    await prisma.comment.delete({
      where: { id },
    });
  }

  async update(id: string, data: UpdateCommentInput) {
    const comment = await prisma.comment.update({
      where: { id },
      data,
    });
    return comment;
  }
  async findManyByPostId(postId: string) {
    return await prisma.comment.findMany({
      where: {
        postId,
      },
    });
  }
  async findAll() {
    return await prisma.comment.findMany();
  }

  async findManyByUserId(userId: string) {
    return await prisma.comment.findMany({
      where: {
        authorId: userId,
      },
    });
  }
}