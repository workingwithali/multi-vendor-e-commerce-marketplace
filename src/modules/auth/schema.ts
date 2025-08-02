import { z } from "zod"

export  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 characters long"),
})

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "password must be at least 8 characters long"),
    username: z
        .string()
        .min(3, "username must be at least 3 characters long")
        .max(63, "username must be less than 63 characters long")
        .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "username must be lowercase and contain only letters, numbers, and hyphens. It must start and end with a letter or number.")
        .refine((val) => !val.includes("__"), "username cannot contain double underscores")
        .transform((val) => val.toLowerCase()),
})