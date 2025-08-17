import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { create } from './comment';
import { getPostComments } from './getPostComments';
import { deleteComment } from './deleteComment';
import { update } from './update';
import { getCommentById } from './getCommentById';
import { getAllComments } from './getAllComments';
import { getCommentsByUser } from './getCommentsByUser';

export async function commentsRoutes(app: FastifyInstance) {

    app.get('/comments', getAllComments);

    app.get('/comments/:commentId', getCommentById);

    app.get('/comments/post/:postId', getPostComments);

    app.get('/comments/user/:userId', getCommentsByUser);

    //Authenticated routes
    app.post('/comments', { onRequest: [verifyJwt] }, create);

    app.delete('/comments/:commentId', { onRequest: [verifyJwt] }, deleteComment);

    app.patch('/comments/:commentId', { onRequest: [verifyJwt] }, update);
}