import * as React from 'react'
import { SVGProps } from 'react'
export const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" {...props}>
        <path
            fill="#fff"
            fill-rule="evenodd"
            d="M.294 1.708A1 1 0 0 1 1.706.292l5.1 5.09.012.011a.997.997 0 0 1-.012 1.425l-5.1 5.09a1 1 0 0 1-1.412-1.416l4.4-4.392-4.4-4.392Z"
            clip-rule="evenodd"
        />
        <path
            fill="#fff"
            fill-opacity=".5"
            fill-rule="evenodd"
            d="M7.073 1.708A1 1 0 0 1 8.486.292l5.1 5.09.011.011a.997.997 0 0 1-.012 1.425l-5.1 5.09a1 1 0 0 1-1.412-1.416l4.4-4.392-4.4-4.392Z"
            clip-rule="evenodd"
        />
    </svg>
)

export const SvgSmallSend = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" {...props}>
        <circle cx="20" cy="20" r="20" fill="#EBFE83" transform="matrix(-1 0 0 1 40 0)" />
        <path
            stroke="#262626"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="1.7"
            d="M20.243 12.236 16.486 16M24 16l-3.757-3.764M20.243 27.869V12.236"
        />
    </svg>
)
