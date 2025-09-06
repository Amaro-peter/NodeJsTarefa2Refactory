import { z } from 'zod'
import { usernameSchema } from '../utils/username'
import { emailSchema } from '../utils/email'
import { cpfSchema } from '../utils/cpf'
import { passwordSchema } from '../utils/password'


export const registerSchema = z.object({
  name: z.string().trim().min(4).max(255),
  username: usernameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  password: passwordSchema,
})

export type registerSchemaType = z.infer<typeof registerSchema>