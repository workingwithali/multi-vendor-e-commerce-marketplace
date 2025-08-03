
import { SignInView } from '@/modules/auth/view/sign-in-view'
import { caller } from '@/trpc/server'
import { redirect } from 'next/navigation';


const SignUp = async () => {
  const session = await caller.auth.session();
  if (session.user) {
    redirect('/');
  }
  return (
    <SignInView />
  )
}

export default SignUp
