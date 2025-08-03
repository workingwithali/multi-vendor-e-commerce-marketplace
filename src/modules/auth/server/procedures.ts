
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import {  headers as getHeaders } from 'next/headers';

import { loginSchema, registerSchema } from "../schema";
import { generateAuthCookie } from "../utils";


export const authRouter = createTRPCRouter({
    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();
        const session = await ctx.db.auth({ headers })
        return session
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
            await generateAuthCookie({
                prefix: ctx.db.config.cookiePrefix,
                value: data.token
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
            await generateAuthCookie({
                prefix: ctx.db.config.cookiePrefix,
                value: data.token
            })
            return data
        }),


})