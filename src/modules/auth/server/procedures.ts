
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { cookies as getCookies, headers as getHeaders } from 'next/headers';

import { AUth_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schema";


export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();
        const session = await ctx.db.auth({ headers })
        return session
    }),
    logout: baseProcedure.mutation(async () => {
        const cookies = await getCookies()
        cookies.delete(AUth_COOKIE)
    }),
    register: baseProcedure
        .input(
            registerSchema
        )
        .mutation(async ({ ctx, input }) => {
            const existingData = await ctx.db.find({
                collection: 'users',
                where: {
                    username: {
                        equals: input.username,
                    }
                },
            })
            const existingUser = existingData.docs[0];
            if (existingUser) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User already exists"
                })
            }
            await ctx.db.create({
                collection: 'users',
                data: {
                    username: input.username,
                    email: input.email,
                    password: input.password,
                }
            })
        }),
    login: baseProcedure
        .input(
            loginSchema
        )
        .mutation(async ({ ctx, input }) => {
            const data = await ctx.db.login({
                collection: 'users',
                data: {
                    email: input.email,
                    password: input.password
                }
            })
            if (!data.token) {
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