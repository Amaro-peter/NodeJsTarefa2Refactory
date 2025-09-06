import { messages } from '@/constants/messages'
import { forgotPasswordSchema } from '@/http/schemas/users/forgot-password-schema'
import { logger } from '@/lib/logger'
import { forgotPasswordHtmlTemplate } from '@/templates/forgot-password/forgot-password-html'
import { forgotPasswordTextTemplate } from '@/templates/forgot-password/forgot-password-text'
import { UserNotFoundForPasswordResetError } from '@/use-cases/errors/user-not-found-for-password-reset-error'
import { makeForgotPasswordUseCase } from '@/use-cases/factories/user/make-forgot-password-use-case'
import { makeSendEmailUseCase } from '@/use-cases/factories/user/make-send-email-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { email } = forgotPasswordSchema.parse(request.body)

    const forgotPasswordUseCase = makeForgotPasswordUseCase()

    const { user, token } = await forgotPasswordUseCase.execute({ email })

    const sendEmailUseCase = makeSendEmailUseCase()

    await sendEmailUseCase.execute({
      to: user.email,
      subject: messages.email.passwordRecoverySubject,
      message: forgotPasswordTextTemplate(user.name, token),
      html: forgotPasswordHtmlTemplate(user.name, token),
    })

    logger.info({ targetId: user.publicId }, 'Password reset email sent')

    return reply.status(200).send({ message: messages.info.passwordResetGeneric })
  } catch (error) {
    if (error instanceof UserNotFoundForPasswordResetError) {
      return reply.status(200).send({ message: error.message })
    }

    throw error
  }
}