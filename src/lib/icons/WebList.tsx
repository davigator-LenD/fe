import * as React from 'react'
import { SVGProps } from 'react'
const SvgWebList = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="29" fill="none" {...props}>
        <path
            fill="#fff"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 1 1 6.99l14 5.98 14-5.98L15 1Z"
        />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.53 12.15 1 14.09l14 5.98 14-5.98-4.53-1.94"
        />
        <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.53 19.17 1 21.1l14 5.99 14-5.99-4.53-1.93"
        />
    </svg>
)
export default SvgWebList
