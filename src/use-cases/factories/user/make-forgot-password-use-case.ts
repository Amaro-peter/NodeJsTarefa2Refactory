import { PrismaUsersRepository } from "@/repositories/prisma/prisma-user-repository"
import { ForgotPasswordUseCase } from "@/use-cases/user/forgot-password-use-case"


export function makeForgotPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

  return forgotPasswordUseCase
}