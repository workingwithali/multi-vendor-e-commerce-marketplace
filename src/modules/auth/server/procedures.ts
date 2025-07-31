
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import  { headers as getHeaders } from 'next/headers'

import { z } from "zod";


export const authRouter = createTRPCRouter({
    session :baseProcedure.query(async ({ctx}) => {
        const headers = await getHeaders();
        const session = await ctx.db.auth({headers})
      
        return session
    }),
    register :baseProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(8),
                username: z
                .string()
                .min(3,"username must be at least 3 characters long")
                .max(63,"username must be less than 63 characters long")
                    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/,"username must be lowercase and contain only letters, numbers, and hyphens. It must start and end with a letter or number.")
                .refine((val)=>!val.includes("__"),"username cannot contain double underscores")  
                .transform((val)=>val.toLowerCase()) , 
            })
        )
        .mutation(async ({ctx,input}) => {
            await ctx.db.create({
                collection: 'users',
                data: {
                    email: input.email,
                    password: input.password,
                    username: input.username,
                }
            })
        }),
        
        
})