import { env } from "@/env";
import { PrismaClient } from "@/generated/prisma";

export const prisma = new PrismaClient({
    log: env.LOG_LEVEL === 'debug' ? ['query', 'info', 'warn'] : [],
});