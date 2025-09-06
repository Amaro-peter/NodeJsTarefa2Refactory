import { Prisma, User } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { UsersRepository, UserUpdateInput } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {

    async findAll() {
        const users = await prisma.user.findMany();
        return users;
    }

    async update(id: string, data: UserUpdateInput) {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: data
        });

        return user;
    }

    async delete(id: string) {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!existingUser) {
            return null;
        }

        const user = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        });

        return user;
    }

    async findById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        });

        return user;
    }

    async findByEmail(email: string){
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        return user;
    }

    async findBy(where: Prisma.UserWhereUniqueInput) {
        return await prisma.user.findUnique({
        where,
        })
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        });

        return user;
    }
}