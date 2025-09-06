import { UserRole } from '@/generated/prisma/client'
import { verifyJwt } from '@/http/middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@/http/middlewares/verify-user-role.middleware'
import { FastifyInstance } from 'fastify'
import { register, registerAdmin } from './register'
import { authenticateUser } from './authenticate'
import { forgotPassword } from './forgot-password'
import { resetPassword } from './reset-password'
import { updateUser, updateUserByPublicId } from './updateUser'
import { deleteUser, deleteUserByPublicId } from './deleteUser'
import { listUsers } from './getAllUsers'
import { getUserProfile, getUserByPublicId } from './profile'

export async function usersRoutes(app: FastifyInstance) {
  // Register routes:
  app.post('/register/admin', { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])] }, registerAdmin)
  app.post('/register', register)

  // Authentication routes:
  app.post('/sessions', authenticateUser)
  app.post('/forgot-password', forgotPassword)
  app.patch('/reset-password', resetPassword)

  // User routes:
  app.patch('/me', { onRequest: [verifyJwt] }, updateUser)
  app.get('/me', { onRequest: [verifyJwt] }, getUserProfile)
  app.delete('/me', { onRequest: [verifyJwt] }, deleteUser)

  // Users administration routes:
  app.patch('/:publicId', { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])] }, updateUserByPublicId)
  app.delete('/:publicId', { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])] }, deleteUserByPublicId)
  app.get('/:publicId', { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])] }, getUserByPublicId)
  app.get('/', { onRequest: [verifyJwt, verifyUserRole([UserRole.ADMIN])] }, listUsers)
}