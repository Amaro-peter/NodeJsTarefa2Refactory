import { User, UserRole } from '@prisma/client'

type HTTPUser = {
  id: number
  publicId: string
  name: string
  email: string
  cpf: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export class UserPresenter {
  static toHTTP(input: User | User[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((u) => this.toHTTP(u) as HTTPUser)
    }

    return {
      id: input.id,
      publicId: input.publicId,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      role: input.role,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}