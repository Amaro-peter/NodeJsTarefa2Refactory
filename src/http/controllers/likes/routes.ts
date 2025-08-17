import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { create } from './createLikes';
import { deleteLikes } from './deleteLikes';
import { getLikeById } from './getLikeById';
import { getLikesByUser } from './getLikesByUser';
import { getLikesByPost } from './getLikesByPost';
import { getLikesByComment } from './getLikesByComment';

export async function likesRoutes(app: FastifyInstance) {
    app.get('/likes/:likeId', getLikeById);
    app.get('/likes/user/:userId', getLikesByUser);
    app.get('/likes/post/:postId', getLikesByPost);
    app.get('/likes/comment/:commentId', getLikesByComment);

    //Authenticated routes
    app.post('/likes', { onRequest: [verifyJwt] }, create);
    app.delete('/likes/:likeId', { onRequest: [verifyJwt] }, deleteLikes);
}