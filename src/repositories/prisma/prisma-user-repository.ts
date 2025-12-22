import { Prisma, User } from '@prisma/client'
import { prisma } from "@/lib/prisma";
import {FindByToken, UsersRepository, UserUpdateInput } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
    public items: User[] = [];

    async findAll() {
        const users = await prisma.user.findMany();
        return users;
    }

    async update(publicId: string, data: UserUpdateInput) {
        const existingUser = await prisma.user.findUnique({
            where: { publicId }
        });

        if(!existingUser) {
            return null;
        }

        const updateData: Prisma.UserUpdateInput = {};
        if (data.name !== undefined) updateData.name = data.name;
        if (data.email !== undefined) updateData.email = data.email;
        if (data.passwordHash !== undefined) updateData.passwordHash = data.passwordHash;
        if (data.token !== undefined) updateData.token = data.token;
        if (data.tokenExpiresAt !== undefined) updateData.tokenExpiresAt = data.tokenExpiresAt;
        if (data.passwordChangedAt !== undefined) updateData.passwordChangedAt = data.passwordChangedAt;
        if ((data as any).photo !== undefined) updateData.photo = (data as any).photo;
        if ((data as any).senha !== undefined) updateData.passwordHash = (data as any).senha;

        const user = await prisma.user.update({
            where: { publicId },
            data: updateData,
        });

        return user;
    }

    async updateCredentials(id: string, data: Prisma.UserUpdateInput) {
        return await prisma.user.update({
            where: {
                publicId: id,
            },
            data,
        });
    }

    async delete(publicId: string) {
        const existingUser = await prisma.user.findUnique({
            where: {
                publicId
            }
        });

        if (!existingUser) {
            return null;
        }

        const user = await prisma.user.delete({
            where: {
                publicId
            }
        });

        return user;
    }

    async findById(where: Prisma.UserWhereUniqueInput) {
        const user = await prisma.user.findUnique({
            where,
        });

        return user;
    }

    async searchMany(query: string, page: number) {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: query,
                    mode: 'insensitive',

                },
            },
            skip: (page - 1) * 20,
            take: 20,
        });

        return users;
    }

    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return user;
    }

    async findBy(findByToken: FindByToken): Promise<User | null> {
        return await prisma.user.findFirst({
            where: {
                token: findByToken.token,
            }
        })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        });

        return user;
    }
}