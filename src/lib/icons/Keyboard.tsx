import * as React from 'react'
import { SVGProps } from 'react'
export const SvgKeyboard = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="none" {...props}>
        <g filter="url(#a)">
            <rect width="85" height="85" fill="#959595" fillOpacity=".2" rx="42.5" />
        </g>
        <path stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" d="M47.43 45.84H36.58" />
        <path
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="2"
            d="M53.7 33H30.3a2.3 2.3 0 0 0-2.3 2.3v13.96a2.3 2.3 0 0 0 2.3 2.3h23.4a2.3 2.3 0 0 0 2.3-2.3V35.3a2.3 2.3 0 0 0-2.3-2.3Z"
        />
        <path
            fill="#fff"
            d="M42 39.58a1.42 1.42 0 1 0 0-2.84 1.42 1.42 0 0 0 0 2.84ZM37 39.58a1.42 1.42 0 1 0 0-2.84 1.42 1.42 0 0 0 0 2.84ZM32 39.58a1.42 1.42 0 1 0 0-2.84 1.42 1.42 0 0 0 0 2.84ZM47 39.58a1.42 1.42 0 1 0 0-2.84 1.42 1.42 0 0 0 0 2.84ZM52 39.58a1.42 1.42 0 1 0 0-2.84 1.42 1.42 0 0 0 0 2.84ZM32 47.26a1.42 1.42 0 1 0 0-2.84 1.42 1.42 0 0 0 0 2.84ZM52 47.26a1.42 1.42 0 1 0 0-2.84 1.42 1.42 0 0 0 0 2.84Z"
        />
        <defs>
            <filter
                id="a"
                width="365"
                height="365"
                x="-140"
                y="-140"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="70" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_97_119" />
                <feBlend in="SourceGraphic" in2="effect1_backgroundBlur_97_119" result="shape" />
            </filter>
        </defs>
    </svg>
)
