
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../registerSchema';
import { Link } from 'next/link';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

export const SignUpView = () => {
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            username: '',
        },
    })
    const onSubmit = (value: z.infer<typeof registerSchema>) => {
        console.log(value)
    }


    return (
        <div className='grid grid-cols-1 lg:grid-cols-5'>
            <div className='bg-background w-full h-screen lg:col-span-3 overflow-y-auto '>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='flex flex-col gap-4 p-4 lg:px-12 py-8'
                    >
                        <div className='flex items-center justify-between mb-2'>
                            <Link href="/">
                                <span className='text-2xl font-bold'>
                                    logo
                                </span>
                            </Link>
                            <Button 
                                asChild
                                variant='ghost'
                                size='sm'
                                className='text-base border-none underline hover:no-underline'
                            >
                                <Link href="/sign-in">Login</Link>
                            </Button>
                        </div>
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
