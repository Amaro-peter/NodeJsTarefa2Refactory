import { z } from 'zod'
import { usernameSchema } from '../utils/username'
import { emailSchema } from '../utils/email'
import { cpfSchema } from '../utils/cpf'
import { passwordSchema } from '../utils/password'

export const updateSchema = z.object({
  name: z.string().trim().min(4).optional(),
  email: emailSchema.optional(),
  cpf: cpfSchema.optional(),
  username: usernameSchema.optional(),
  password: passwordSchema.optional(),
})

export type updateSchemaType = z.infer<typeof updateSchema>