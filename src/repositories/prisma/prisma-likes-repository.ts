import { prisma } from '@/lib/prisma';
import { LikesRepository } from '../likes-repository';
import { Like, Prisma } from '@prisma/client'

export class PrismaLikesRepository implements LikesRepository {
  findById(likeId: string): Promise<Like | null> {
    const like = prisma.like.findUnique({
        where: { publicId: likeId },
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
      where: { publicId: id },
    });
  }

  async findManyByPostId(postId: string) {
    return await prisma.like.findMany({
      where: {
        publicId: postId,
      },
    });
  }

  async findManyByUserId(userId: string): Promise<Like[]> {
    return await prisma.like.findMany({
      where: {
        publicId: userId,
      },
    });
  }

  async findManyByCommentId(commentId: string): Promise<Like[]> {
    return await prisma.like.findMany({
      where: {
        publicId: commentId,
      },
    });
  }

  async findByAuthorAndPostId(authorId: string, postId: string) {
    return await prisma.like.findFirst({
        where: {
          author: {
            publicId: authorId,
          },
          post: {
            publicId: postId,
          },
        },
    });
  }

  async findByAuthorAndCommentId(authorId: string, commentId: string) {
    return await prisma.like.findFirst({
        where: {
          author: {
            publicId: authorId,
          },
          comment: {
            publicId: commentId,
          },
        }
    });
  }

  async findMostLikedPosts() {
      const topPosts = await prisma.post.findMany({
        take: 5,
        orderBy: {
          likes: {_count: "desc"},
        },
        include: {
          _count: { select: { likes: true } },
        },
      })

      return topPosts;
  }

}