import { UserRole } from '@prisma/client'
import { verifyJwt } from '@/http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.middleware'
import { FastifyInstance } from 'fastify'
import rateLimit from '@fastify/rate-limit'
import { register, registerAdmin } from './register'
import { authenticateUser } from './authenticate'
import { forgotPassword } from './forgot-password'
import { resetPassword } from './reset-password'
import { updateUser } from './updateUser'
import { deleteUser, deleteUserByPublicId } from './deleteUser'
import { listUsers } from './getAllUsers'
import { getUserProfile, getUserByPublicId } from './profile'
import { searchUsersController } from './searchUsersController'
import { verifyUserOrAdmin } from '@/http/middlewares/verify-user-or-admin.middleware'
import { config } from 'dotenv'

export async function usersRoutes(app: FastifyInstance) {

  await app.register(rateLimit, {
    global: false,
    max: 10000,
    timeWindow: '1 minute'
  })

  // Register routes:
  app.post(
    '/register/admin', 
    { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])], config: { rateLimit: { max: 15, timeWindow: '1 hour' } } }, 
    registerAdmin
  )
  app.post('/register', { config: { rateLimit: { max: 2000, timeWindow: '1 minute' } } }, register)

  // Authentication routes:
  app.post('/sessions', authenticateUser)
  app.post('/forgot-password', { config: { rateLimit: { max: 100, timeWindow: '1 hour' } } }, forgotPassword)
  app.patch('/reset-password', { config: { rateLimit: { max: 200, timeWindow: '1 hour' } } }, resetPassword)

  app.get('/me', { onRequest: [verifyJwt, verifyUserOrAdmin()] }, getUserProfile)
  app.delete('/me', { onRequest: [verifyJwt, verifyUserOrAdmin()] }, deleteUser)

  // Admin-only listing & searching
  app.get('/', { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])] }, listUsers)
  app.get('/search', { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])] }, searchUsersController)

  // Owner or admin can update
  app.patch('/:publicId', { onRequest: [verifyJwt, verifyUserOrAdmin()] }, updateUser)

  // Admin-only specific user actions
  app.delete('/:publicId', { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])] }, deleteUserByPublicId)
  app.get('/:publicId', { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])] }, getUserByPublicId)
}