import { Prisma, User } from '@prisma/client'

export interface UserUpdateInput {
    name?: string;
    email?: string;
    senha?: string;
    photo?: string;
    passwordHash?: string;
    token?: string | null;
    tokenExpiresAt?: Date | null;
    passwordChangedAt?: Date | null;
    updatedAt?: Date;
}

export interface FindByToken {
    token: string;
}

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(where: Prisma.UserWhereUniqueInput | string): Promise<User | null>;
    searchMany(query: string, page: number): Promise<User[]>;
    findBy(findByToken: FindByToken): Promise<User | null>
    delete(id: string): Promise<User | null>;
    update(id: string, data: UserUpdateInput): Promise<User | null>;
    updateCredentials(id: string, data: UserUpdateInput): Promise<User | null>;
    findAll(): Promise<User[] | null>;
}