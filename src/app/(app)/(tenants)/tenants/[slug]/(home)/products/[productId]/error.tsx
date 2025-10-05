"use client"
import {  TriangleAlertIcon } from 'lucide-react'
import React from 'react'

const ErrorPage = () => {
  return (
    <div className='px-4 lg:px-54 py-8'>
        <div className='flex flex-col justify-center items-center text-2xl font-semibold border border-foreground py-8 border-dashed gap-y-4 bg-background w-full rounded-lg'>
                <TriangleAlertIcon />
                <p className='text-base font-medium'>Something went wrong</p>
              </div>
    </div>
  )
}

export default ErrorPage