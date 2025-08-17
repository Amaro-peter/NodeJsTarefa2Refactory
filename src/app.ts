
import fastify from 'fastify';
import { userRoutes} from './http/controllers/users/routes';
import { ZodError } from 'zod';
import fastifyJwt from '@fastify/jwt';
import { env } from './env';
import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import { postsRoutes } from './http/controllers/posts/routes';
import { commentsRoutes } from './http/controllers/comments/routes';
import { likesRoutes } from './http/controllers/likes/routes';

export const app = fastify();

app.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
});

app.register(fastifyJwt, {
    secret: env.JWT_SECRET, 
    cookie: {
        cookieName: 'refreshToken',
        signed: false,
    },
    sign: {
        expiresIn: '10m'
    }
});

app.register(fastifyCookie);

app.register(userRoutes);

app.register(postsRoutes);

app.register(commentsRoutes);

app.register(likesRoutes);

app.setErrorHandler((error, request, reply) => {
    if(error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation error',
            issues: error.format()
        });
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
})