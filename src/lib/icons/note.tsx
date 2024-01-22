import * as React from 'react'
import { SVGProps } from 'react'
export const SvgNote = (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="22" fill="none" {...props}>
        <path
            fill="#EBFE83"
            stroke="#EBFE83"
            d="M12.48 17.97c0 .843-.566 1.69-1.66 2.351-1.084.657-2.614 1.079-4.33 1.079-1.716 0-3.246-.422-4.33-1.079C1.067 19.66.5 18.813.5 17.97s.567-1.69 1.66-2.351c1.084-.657 2.614-1.079 4.33-1.079 1.716 0 3.246.422 4.33 1.079 1.094.662 1.66 1.508 1.66 2.351ZM25.71 1.97a1.47 1.47 0 1 1-2.94 0 1.47 1.47 0 0 1 2.94 0Z"
        />
        <path
            stroke="#EBFE83"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m12.17 14.04 5.1-12.07s3.54 3.43 7 0"
        />
    </svg>
)
