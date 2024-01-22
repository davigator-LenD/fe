import * as React from 'react'
import { SVGProps } from 'react'
export const SvgBack = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" {...props}>
        <path
            stroke="#060707"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="m1 1 10.2 10.2M11.2 1 1 11.2"
        />
    </svg>
)
