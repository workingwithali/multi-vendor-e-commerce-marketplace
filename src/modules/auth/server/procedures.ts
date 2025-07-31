
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import  { headers as getHeaders , cookies as getCookies } from 'next/headers'

import { z } from "zod";
import { AUth_COOKIE } from "../constants";


export const authRouter = createTRPCRouter({
    session :baseProcedure.query(async ({ctx}) => {
        const headers = await getHeaders();
        const session = await ctx.db.auth({headers})
      
        return session
    }),
    logout :baseProcedure.mutation(async () => {
        const cookies = await getCookies()
        cookies.delete(AUth_COOKIE)
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
    login :baseProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string().min(8),
            })
        )
        .mutation(async ({ctx,input}) => {
            const data = await ctx.db.login({
                collection: 'users',
                data: {
                    email: input.email,
                    password: input.password
                }   
            })
            if(!data.token){
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Invalid credentials"
                })
            }
            const cookies = await getCookies()
            cookies.set({
                name: AUth_COOKIE,
                value: data.token,
                httpOnly: true,
                path: "/"
            })
        }),
        
        
})