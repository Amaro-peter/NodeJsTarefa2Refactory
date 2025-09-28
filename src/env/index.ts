import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
    // Environment
    NODE_ENV: z.enum(['development', 'staging', 'production', 'test']).default('development'),
    LOG_LEVEL: z.enum(['info', 'debug', 'warn', 'error', 'trace']).default('info'),

    // Database
    DATABASE_URL: z.url(),

    // App
    APP_NAME: z.string().default('Projeto Base'),
    APP_PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string().min(60, 'The JWT_SECRET must be at least 60 characters long'),
    FRONTEND_URL: z.url().default('http://localhost:5173'),
    HASH_SALT_ROUNDS: z.coerce.number().default(12),

    SENTRY_DSN: z.string().optional(),

    //SMTP
    SMTP_EMAIL: z.string().email(),
    SMTP_PASSWORD: z.string().min(1),
    SMTP_PORT: z.coerce.number(),
    SMTP_HOST: z.string().min(1),
    SMTP_SECURE: z.enum(['true', 'false']).transform((value) => value === 'true'),
});

const _env = envSchema.safeParse(process.env);

if(_env.success === false) {
    console.error('Invalid environment variables:', _env.error.format());

    throw new Error('Variables de ambiente inválidas');
}

export const env = _env.data;

