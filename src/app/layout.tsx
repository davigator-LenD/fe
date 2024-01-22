import type { Metadata } from 'next'
import type { Viewport } from 'next'
import localFont from 'next/font/local'
import '../style/globals.css'

const pretendard = localFont({
    src: [
        { path: '../style/fonts/100.woff2', weight: '100', style: 'normal' },
        { path: '../style/fonts/200.woff2', weight: '200', style: 'normal' },
        { path: '../style/fonts/300.woff2', weight: '300', style: 'normal' },
        { path: '../style/fonts/400.woff2', weight: '400', style: 'normal' },
        { path: '../style/fonts/500.woff2', weight: '500', style: 'normal' },
        { path: '../style/fonts/600.woff2', weight: '600', style: 'normal' },
        { path: '../style/fonts/700.woff2', weight: '700', style: 'normal' },
        { path: '../style/fonts/800.woff2', weight: '800', style: 'normal' },
        { path: '../style/fonts/900.woff2', weight: '900', style: 'normal' },
    ],
    variable: '--pretendard',
})
const bylander = localFont({
    src: [{ path: '../style/fonts/BylanderItalic.otf' }],
    variable: '--bylander',
})
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
    manifest: '/manifest.webmanifest', // enable PWA
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="kr" className={`${bylander.variable} ${pretendard.variable}`}>
            <body className="h-screen max-h-screen min-h-screen  bg-background font-kor text-theme-font">
                <main className="mx-auto size-full px-6">{children}</main>
            </body>
        </html>
    )
}
