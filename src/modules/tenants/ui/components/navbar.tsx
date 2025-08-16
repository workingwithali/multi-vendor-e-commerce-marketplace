import React from 'react'

export const Navbar = () => {
    return (
        <nav className='h-16 border-b font-medium bg-background'>
            <div className='max-w-(--breakpoint-xl) mx-auto flex items-center justify-between h-full px-4 lg:px-8'>
            <p className='text-xl font-semibold'>Tenants</p>
            </div>
        </nav>
    )
}
