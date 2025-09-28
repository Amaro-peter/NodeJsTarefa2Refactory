import { env } from "@/env";
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
    log: env.LOG_LEVEL === 'debug' ? ['query', 'info', 'warn'] : [],
});