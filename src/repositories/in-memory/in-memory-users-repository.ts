import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository{
    public items: User[] = [];

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find((item) => item.email === email);
        return user ?? null;
    }

    async findById(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        const user = this.items.find((item) => item.id === where.id)
        return user ?? null;
    }

    async searchMany(query: string, page: number): Promise<User[]> {
        return this.items;
    }

    async findBy(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
        const user = this.items.find((item) => item.id === where.id || item.email === where.email)
        return user ?? null;
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const now = new Date();
        const user = {
            id: this.items.length + 1,
            publicId: (data as any).publicId || crypto.randomUUID(),
            name: (data as any).name,
            email: (data as any).email,
            passwordHash: (data as any).passwordHash,
            photo: (data as any).photo ?? null,
            cpf: (data as any).cpf,
            loginAttempts: (data as any).loginAttempts ?? 0,
            lastLogin: (data as any).lastLogin ? new Date((data as any).lastLogin as any) : null,
            role: (data as any).role ?? "DEFAULT",
            resetToken: null,
            resetExpiresAt: null,
            token: null,
            tokenExpiresAt: (data as any).tokenExpiresAt ? new Date((data as any).tokenExpiresAt as any) : null,
            createdAt: now,
            updatedAt: now,
            passwordChangedAt: (data as any).passwordChangedAt ? new Date((data as any).passwordChangedAt as any) : null,
        } as any as User;

        this.items.push(user);
        return user;
    }

    async delete (id: string): Promise<User | null> {
        return null;
    }

    async update(id: string, data: any): Promise<User | null> {
        return null;
    }

    async updateCredentials(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
        return null;
    }

    async findAll(): Promise<User[] | null> {
        return this.items;
    }


}