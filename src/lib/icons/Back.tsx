import * as React from 'react'
import { SVGProps } from 'react'
const SvgBack = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="13" fill="none" {...props}>
        <path
            stroke="#fff"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="m1 6.1 5.11 5.1M6.11 1 1 6.1M22.22 6.1H1"
        />
    </svg>
)
export default SvgBack
