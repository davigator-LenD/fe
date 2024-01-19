import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx,md}'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                eng: ['var(--bylander)'],
                kor: ['var(--pretendard)'],
            },
            fontSize: {
                '8xl': '6rem',
                '6xl': '3.75rem',
                '4xl': '2.5rem', //bold 40px
                '3xl': '1.5rem', //bold 24px
                '2xl': '1.25rem', //regular : 20px
                xl: '0.875rem', //medium : 14px
            },
            colors: {
                background: '#121212',
                theme: {
                    background: '#121212',
                    font: '#FFFFFF',
                },
                primary: {
                    logo: '#EBFE83',
                    icon: '#959595',
                    box: '#262626',
                    toggleBG: '#171413',
                },
            },
        },
    },
    plugins: [require('tailwindcss-3d'), require('tailwind-scrollbar-hide')],
}
export default config
