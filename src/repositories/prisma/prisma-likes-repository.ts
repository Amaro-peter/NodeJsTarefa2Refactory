import { prisma } from '@/lib/prisma';
import { CreateLikeParams, LikesRepository } from '../likes-repository';
import { Like, Prisma } from '@prisma/client'
import { connect } from 'node:http2';

export class PrismaLikesRepository implements LikesRepository {
  findById(likeId: string): Promise<Like | null> {
    const like = prisma.like.findUnique({
        where: { publicId: likeId },
    });

    return like;
  }

  async create(data: CreateLikeParams) {
    const like = await prisma.like.create({
      data: {
        author: {
          connect: { publicId: data.authorId },
        },
        ...(data.postId && {
          post: {
            connect: {
              publicId: data.postId,
            }
          }
        }),
        ...(data.commentId && {
          comment: {
            connect: {
              publicId: data.commentId,
            }
          }
        })
      }
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
        post: {
          publicId: postId,
        }
      },
    });
  }

  async findManyByUserId(userId: string): Promise<Like[]> {
    return await prisma.like.findMany({
      where: {
        author: {
          publicId: userId,
        }
      },
    });
  }

  async findManyByCommentId(commentId: string): Promise<Like[]> {
    return await prisma.like.findMany({
      where: {
        comment: {
          publicId: commentId,
        }
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