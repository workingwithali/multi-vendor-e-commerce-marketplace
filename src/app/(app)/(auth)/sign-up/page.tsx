import { SignUpView } from '@/components/auth/sign-up-view'
import { caller } from '@/trpc/server';
import { redirect } from 'next/navigation';
import React from 'react'

const SignUp = async () => {
  const session = await caller.auth.session();
    if (session.user) {
      redirect('/');
    }
  return (
    <SignUpView/>
  )
}

export default SignUp
