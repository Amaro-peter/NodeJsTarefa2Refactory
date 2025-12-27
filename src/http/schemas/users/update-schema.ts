import { z } from 'zod'
import { usernameSchema } from '../utils/username'
import { emailSchema } from '../utils/email'

export const updateSchema = z.object({
  name: z.string().trim().min(4).optional(),
  email: emailSchema.optional(),
  photo: z.string().optional(),
})

export type updateSchemaType = z.infer<typeof updateSchema>