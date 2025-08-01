
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


export const SignUpView = () => {


    return (
        <div className='grid grid-cols-1 lg:grid-cols-5'>
            <div className='bg-background w-full h-screen lg:col-span-3 overflow-y-auto '>
                sign-up erer
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
