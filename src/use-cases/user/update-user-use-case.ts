import { UsersRepository, UserUpdateInput } from '@/repositories/users-repository';
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateUserUseCaseRequest {
  publicId: string;
  name?: string;
  email?: string;
  cpf?: string;
  username?: string;
  photo?: string;
}

interface UpdateUserUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({publicId, name, email, cpf, username, photo}: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const data: UserUpdateInput = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (cpf) data.cpf = cpf;
    if (username) data.username = username;
    if (photo) data.photo = photo;
    data.updatedAt = new Date()

    const user = await this.usersRepository.update(publicId, data);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return {
      user,
    };

    
  }
}