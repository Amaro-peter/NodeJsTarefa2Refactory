import { UserRole } from '@prisma/client'
import { UserPresenter } from '@/http/presenters/user-presenter'
import { registerSchema } from '@/http/schemas/users/register-schema'
import { logger } from '@/lib/logger'
import { UserAlreadyExists } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/user/make-register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, username, email, cpf, password } = registerSchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()

    const { user } = await registerUseCase.execute({
      name,
      email,
      cpf,
      password,
      role: UserRole.DEFAULT,
    })

    logger.info({ userId: user.publicId }, 'Researcher registered successfully!')

    reply.status(201).send({ user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}

export async function registerAdmin(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, username, email, cpf, password } = registerSchema.parse(request.body)

    const registerUseCase = makeRegisterUseCase()

    const { user } = await registerUseCase.execute({ name, email, cpf, password, role: UserRole.ADMIN })

    return reply.status(201).send({ user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}