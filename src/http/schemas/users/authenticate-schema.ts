import { z } from 'zod'
import { emailSchema } from '../utils/email'
import { usernameSchema } from '../utils/username'

export const authenticateSchema = z.object({
  email: z.union([usernameSchema, emailSchema]),
  senha: z.string().trim().min(4),
})

export type AuthenticateSchemaType = z.infer<typeof authenticateSchema>