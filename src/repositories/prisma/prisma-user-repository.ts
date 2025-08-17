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
                id
            },
            data: data
        });

        return user;
    }

    async delete(id: string) {
        const existingUser = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!existingUser) {
            return null;
        }

        const user = await prisma.user.delete({
            where: {
                id
            }
        });

        return user;
    }

    async findById(userId: string) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
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

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        });

        return user;
    }
}