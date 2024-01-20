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

export const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" fill="none" {...props}>
        <path
            fill="#fff"
            fill-rule="evenodd"
            d="M12.93 1.708A1 1 0 0 0 11.515.292L6.703 5.096a.997.997 0 0 0 0 1.436l4.813 4.803A1 1 0 0 0 12.93 9.92L8.815 5.814l4.114-4.106Z"
            clip-rule="evenodd"
        />
        <path
            fill="#fff"
            fill-opacity=".5"
            fill-rule="evenodd"
            d="M6.53 1.708A1 1 0 0 0 5.117.292L.304 5.096A1.008 1.008 0 0 0 0 5.814a.997.997 0 0 0 .304.718l4.813 4.803A1 1 0 0 0 6.53 9.92L2.416 5.814 6.53 1.708Z"
            clip-rule="evenodd"
        />
    </svg>
)
