'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

function Login() {
    return (
        <div>
            <button className="h-[40px] w-1/2 bg-white" onClick={() => signIn('google', { callbackUrl: '/' })} />
        </div>
    )
}

export default Login
