import * as React from 'react'
import { SVGProps } from 'react'
const SvgVoice = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="85" height="85" fill="none" {...props}>
        <circle cx="42.5" cy="42.5" r="42.5" fill="#EBFE83" />
        <path
            stroke="#060707"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M46.08 40.72v3.43M41.72 37.08v10.71M33 39.91v5.05M37.36 33v18.87M50.44 43.06v-.69"
        />
    </svg>
)
export default SvgVoice
