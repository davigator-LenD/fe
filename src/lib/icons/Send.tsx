import * as React from 'react'
import { SVGProps } from 'react'
const SvgSend = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="none" {...props}>
        <circle cx="42.5" cy="42.5" r="42.5" fill="#EBFE83" transform="matrix(-1 0 0 1 85 0)" />
        <path
            stroke="#262626"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="3.131"
            d="m43.016 26-7.984 8M51 34l-7.984-8M43.016 59.22V26"
        />
    </svg>
)
export default SvgSend
