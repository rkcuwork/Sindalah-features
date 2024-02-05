import * as z from "zod";

export const SignUpValidation = z.object({
    
    name: z.string().min(2),
    username: z.string().min(2).max(20),
    password: z.string().min(8).max(25),
    email: z.string().email(),

  })

  export const SignInValidation = z.object({
    email:z.string().email(),
    password: z.string().min(8).max(50),
  })

  export const ForgotPasswordValidation = z.object({
    email:z.string().email(),
  })

  export const ResetPasswordValidation = z.object({
    password: z.string().min(8,"Password must contain at least 8 character(s)").max(25,"Password must contain at most 25 character(s)"),
    confirmPassword: z.string().min(8,"Password must contain at least 8 character(s)").max(25,"Password must contain at most 25 character(s)"),
  })
  .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });



    export const PostValidation = z.object({
      caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
      file: z.custom<File[]>(),
      location: z.string().min(1, { message: "This field is required" }).max(1000, { message: "Maximum 1000 characters." }),
      tags: z.string(),
    });
