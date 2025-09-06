import type { FastifyInstance } from 'fastify'
import { userRoutes } from './controllers/users/routes'
import { postsRoutes } from './controllers/posts/routes'
import { likesRoutes } from './controllers/likes/routes'
import { commentsRoutes } from './controllers/comments/routes'
import { healthCheckRoutes } from './controllers/health-check/health-check.routes'


export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: '/users' })
  app.register(postsRoutes, { prefix: '/posts' })
  app.register(likesRoutes, { prefix: '/likes' })
  app.register(commentsRoutes, { prefix: '/comments' })
  app.register(healthCheckRoutes, { prefix: '/health' })
}