import * as z from 'zod'


export const signInFormSchema = z.object({
    email: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }).email(),
    password:z.string().min(8,{message:"The password must be 8 characters long"})
  })