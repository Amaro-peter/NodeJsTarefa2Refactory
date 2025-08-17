import { Post } from '@/generated/prisma';
import { PostsRepository, PostUpdateInput } from '@/repositories/posts-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidCrendentialsError } from '../errors/invalid-credentials-error';

interface UpdatePostUseCaseRequest {
  postId: string;
  authorId: string;
  data: PostUpdateInput;
}

interface UpdatePostUseCaseResponse {
  post: Post;
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    postId,
    authorId,
    data
  }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {
    const post = await this.postsRepository.findById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    if (post.authorId !== authorId) {
      throw new InvalidCrendentialsError('You are not the author of this post.');
    }

    const updatedPost = await this.postsRepository.update(postId, data);

    if (!updatedPost) {
      throw new ResourceNotFoundError('Post not found or could not be updated.');
    }

    return {
      post: updatedPost,
    };
  }
}