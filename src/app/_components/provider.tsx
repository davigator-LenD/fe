'use client'
import { SessionProvider, type SessionProviderProps } from 'next-auth/react'

export const SessionProviderContainer = ({ children, ...props }: React.PropsWithChildren<SessionProviderProps>) => {
    return <SessionProvider {...props}>{children}</SessionProvider>
}
