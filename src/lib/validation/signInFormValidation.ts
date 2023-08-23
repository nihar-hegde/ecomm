import * as z from 'zod'


export const signInFormSchema = z.object({
    email: z.string().min(1, {
      message: "Email is required.",
    }).email({message:"Invalid email"}),
    password:z.string().min(1,{message:"Password is required"}).min(8,{message:"The password must be 8 characters long"})
  })


  export const signUpFormSchema = z.object({
    username:z.string().min(1,{message:"Username is required"}).max(50,{message:"Username must be under 50 characters"}),
    email: z.string().min(1, {
      message: "Email is required.",
    }).email({message:"Invalid email"}),
    password:z.string().min(1,{message:"Password is required"}).min(8,{message:"The password must be 8 characters long"}),
    confirmPassword:z.string().min(1,{message:"Please Retype your password"})
  }).refine((data)=>data.password === data.confirmPassword,{
    path:['confirmPassword'],
    message:"Passwords do not match"
  })

  export const signUpServerFormSchema = z.object({
    username:z.string().min(1,{message:"Username is required"}).max(50,{message:"Username must be under 50 characters"}),
    email: z.string().min(1, {
      message: "Email is required.",
    }).email({message:"Invalid email"}),
    password:z.string().min(1,{message:"Password is required"}).min(8,{message:"The password must be 8 characters long"}),
  })
  export const userSchema = z.object({
    _id:z.string(),
    username:z.string(),
    email:z.string()
  })