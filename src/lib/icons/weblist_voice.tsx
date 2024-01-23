import * as React from 'react'
import { SVGProps } from 'react'
export const SvgWebListVoice = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="none" {...props}>
        <g filter="url(#a)">
            <rect width="54.695" height="54.695" fill="#959595" fill-opacity=".2" rx="27.347" />
        </g>
        <path
            stroke="#fff"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="1.061"
            d="M27.307 32.856v5.43M21.976 38.285h10.67"
        />
        <path
            fill="#fff"
            stroke="#fff"
            stroke-width=".53"
            d="M27.307 17.693h-.008c-2.529 0-4.585 2.074-4.585 4.64v6.76c0 2.567 2.056 4.641 4.585 4.641h.008c2.53 0 4.585-2.074 4.585-4.64v-6.76c0-2.567-2.056-4.641-4.585-4.641Z"
        />
        <path
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.061"
            d="M33.31 24.652v4.412a6.108 6.108 0 0 1-1.76 4.29 5.97 5.97 0 0 1-4.243 1.775 5.937 5.937 0 0 1-2.295-.461 5.99 5.99 0 0 1-1.945-1.315 6.069 6.069 0 0 1-1.3-1.968 6.124 6.124 0 0 1-.457-2.32v-4.413h12Z"
        />
        <defs>
            <filter
                id="a"
                width="334.695"
                height="334.695"
                x="-140"
                y="-140"
                color-interpolation-filters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feGaussianBlur in="BackgroundImageFix" stdDeviation="70" />
                <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_235_785" />
                <feBlend in="SourceGraphic" in2="effect1_backgroundBlur_235_785" result="shape" />
            </filter>
        </defs>
    </svg>
)
