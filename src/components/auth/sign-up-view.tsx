"use client";
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { registerSchema } from '@/modules/auth/schema';
import { useTRPC } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export const SignUpView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const register = useMutation(trpc.auth.register.mutationOptions({
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.success('Account created successfully');
            router.push('/');
        }
    }));
    const form = useForm<z.infer<typeof registerSchema>>({
        mode: 'all',
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
        },
    })
    const onSubmit = (value: z.infer<typeof registerSchema>) => {
        register.mutate(value);
    }
    const username = form.watch('username');
    const usernameerror = form.formState.errors.username;
    const showPreview = username && !usernameerror;


    return (
        <div className='grid grid-cols-1 lg:grid-cols-5'>
            <div className='bg-background w-full h-screen lg:col-span-3 overflow-y-auto '>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col gap-8 p-4 lg:p-16'
                    >
                        <div className='flex items-center justify-between mb-2'>
                            <Link href="/">
                                <span className='text-2xl font-bold'>
                                    logo
                                </span>
                            </Link>
                            <Button
                                asChild
                                variant='link'
                                size='sm'
                                className='text-base border-none underline hover:no-underline text-foreground'
                            >
                                <Link prefetch href="/sign-in">LogIn</Link>
                            </Button>
                        </div>
                        <h1 className='text-3xl font-medium'>
                            join our 1,580 creators earing $100,000/month
                        </h1>
                        <FormField
                            name='username'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-base'>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription
                                        className={cn("hidden", showPreview && "block")}
                                    >
                                        you store will be available at&nbsp;
                                        <strong>{username}</strong>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-base'>email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='text-base'>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={register.isPending}
                            type="submit"
                            size="lg"
                            variant="default"
                            className='bg-foreground text-background'
                        >
                            Create Account
                        </Button>
                    </form>
                </Form>
            </div>
            <div className='w-full h-screen lg:col-span-2 hidden lg:block'
                style={{
                    backgroundImage: "url('/auth-bg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
        </div>
    )
}
