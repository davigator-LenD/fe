import type { Metadata } from 'next'
import type { Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../style/globals.css'

const inter = Inter({ subsets: ['latin'] })
export const viewport: Viewport = {
    themeColor: '#ffc211',
}
export const metadata: Metadata = {
    title: 'LenD',
    description: '',
    icons: {
        other: [
            {
                url: '/icons/splashscreens/iphone5_splash.png',
                media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
                rel: 'apple-touch-startup-image',
            },
        ],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
