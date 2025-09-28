import { env } from '@/env'
import { User } from '@prisma/client'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { InvalidTokenError } from '../errors/invalid-token-error'

interface ResetPasswordUseCaseCaseRequest {
  token: string
  password: string
}

type ResetPasswordUseCaseCaseResponse = {
  user: User
}

export class ResetPasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ token, password }: ResetPasswordUseCaseCaseRequest): Promise<ResetPasswordUseCaseCaseResponse> {
    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const userExists = await this.usersRepository.findBy({ token })

    if (!userExists || !userExists.tokenExpiresAt || userExists.tokenExpiresAt < new Date()) {
      throw new InvalidTokenError()
    }

    const user = await this.usersRepository.update(userExists.publicId, {
      senha: passwordHash,
    })

    if (!user) {
      throw new Error('Failed to update user')
    }

    return { user }
  }
}