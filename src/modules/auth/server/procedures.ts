
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import  { headers as getHeaders , cookies as getCookies } from 'next/headers'

import { z } from "zod";
import { AUth_COOKIE } from "../constants";
import { registerSchema } from "../registerSchema";


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
           registerSchema
        )
        .mutation(async ({ctx,input}) => {
            await ctx.db.create({
                collection: 'users',
                data: {
                    username: input.username,
                    email: input.email,
                    password: input.password,
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