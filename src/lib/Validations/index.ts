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
