import { FastifyInstance } from 'fastify';
import { create } from './create';
import { verifyJwt } from '@/http/middlewares/verify-jwt.middleware';
import { getAllPosts } from './getAllPosts';
import { getUserPosts } from './getUserPosts';
import { deletePost } from './deletePost';
import { update } from './update';

export async function postsRoutes(app: FastifyInstance) {
  app.get('/posts', getAllPosts);
  app.get('/posts/user/:userId', getUserPosts);

  //Authenticated route
  app.post('/posts', { onRequest: [verifyJwt] }, create);
  app.delete('/posts/:postId', { onRequest: [verifyJwt] }, deletePost);
  app.patch('/posts/:postId', { onRequest: [verifyJwt] }, update);
}