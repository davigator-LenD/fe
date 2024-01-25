import * as React from 'react'
import { SVGProps } from 'react'
export const SvgEclipse = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" {...props}>
        <circle cx="25" cy="25" r="25" fill="#D6D6D6" />
    </svg>
)
