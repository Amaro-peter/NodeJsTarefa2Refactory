import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository"
import { ResetPasswordUseCase } from "@/use-cases/user/reset-password-use-case"


export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const resetPasswordUseCase = new ResetPasswordUseCase(usersRepository)

  return resetPasswordUseCase
}