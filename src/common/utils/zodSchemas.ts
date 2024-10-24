import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().min(1, 'Введите адрес электронной почты').email(),
  password: z.string().min(1, 'Введите пароль'),
})
