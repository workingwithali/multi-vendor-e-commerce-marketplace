"use client";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/modules/auth/schema';
import { useTRPC } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export const SignInView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const login = useMutation(trpc.auth.login.mutationOptions({
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
      router.push('/');
    }
  }));
  const form = useForm<z.infer<typeof loginSchema>>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const onSubmit = (value: z.infer<typeof loginSchema>) => {
    login.mutate(value);
  }


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
                <Link prefetch href="/sign-up">SignUp</Link>
              </Button>
            </div>
            <h1 className='text-3xl font-medium'>
              welcome back to logo
            </h1>
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
              disabled={login.isPending}
              type="submit"
              size="lg"
              variant="default"
              className='bg-foreground text-background'
            >
              Log in
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
