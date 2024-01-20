import * as React from 'react'
import { SVGProps } from 'react'
const SvgClickSend = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" {...props}>
        <circle cx="20" cy="20" r="20" fill="#262626" transform="matrix(-1 0 0 1 40 0)" />
        <path
            stroke="#EBFE83"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="1.7"
            d="M20.243 12.236 16.486 16M24 16l-3.757-3.764M20.243 27.869V12.236"
        />
    </svg>
)
export default SvgClickSend
