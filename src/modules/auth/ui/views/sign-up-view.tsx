import React from 'react'

export const SignUpView = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-5'>
            <div className='w-full h-screen lg:col-span-3 overflow-y-auto bg-background'>
                sign-up
            </div>
            <div className='w-full h-screen lg:col-span-2 hidden lg:block'
                style={{
                    backgroundImage: "url('/auth-bg.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }} />
        </div>
    )
}
