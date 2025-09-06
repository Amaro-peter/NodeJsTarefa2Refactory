import { UserPresenter } from '@/http/presenters/user-presenter'
import { logger } from '@/lib/logger'
import { makeGetAllUsersUseCase } from '@/use-cases/factories/user/make-get-all-users-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  const listUsers = makeGetAllUsersUseCase()

  const { users } = await listUsers.execute()

  logger.info('Admins retrieved successfully!')

  return reply.status(200).send({ admins: UserPresenter.toHTTP(users) })
}