import { User, UserRole } from '@prisma/client'

type HTTPUser = {
  publicId: string
  name: string
  email: string
  cpf: string
  photo?: string | null
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
      publicId: input.publicId,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      photo: input.photo,
      role: input.role,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}