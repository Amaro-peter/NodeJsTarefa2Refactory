import { User } from '@/generated/prisma/client'
import { emailSchema } from '@/http/schemas/utils/email'
import { UsersRepository } from '@/repositories/users-repository'
import { randomBytes } from 'crypto'
import { UserNotFoundForPasswordResetError } from '../errors/user-not-found-for-password-reset-error'

interface ForgotPasswordUseCaseRequest {
  email: string
}

type ForgotPasswordUseCaseResponse = {
  user: User
  token: string
}

const EXPIRES_IN_MINUTES = 15
const TOKEN_LENGTH = 32

export class ForgotPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    let userExists: User | null = null

    if (emailSchema.safeParse(email).success) {
      userExists = await this.usersRepository.findByEmail(email)
    } else {
      userExists = await this.usersRepository.findByEmail(email)
    }

    const passwordToken = randomBytes(TOKEN_LENGTH).toString('hex')

    const tokenExpiresAt = new Date(Date.now() + EXPIRES_IN_MINUTES * 60 * 1000)

    const tokenData = {
      token: passwordToken,
      tokenExpiresAt,
    }

    if (!userExists) throw new UserNotFoundForPasswordResetError()

    const user = await this.usersRepository.update(userExists.id, {
      ...tokenData,
    })

    return {
      user,
      token: passwordToken,
    }
  }
}