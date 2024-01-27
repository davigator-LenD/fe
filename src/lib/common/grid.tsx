import { Tw, tw } from '@/style/tw'
import { Divider, type DividerProps } from './divider'

interface GridProps extends DividerProps {
    count: number
    gap?: Tw['gap']
    style?: Tw
}
const grid = tw.style({
    display: 'flex',
    flexDirection: 'flex-col',
    alignItems: 'items-center',
    justifyContent: 'justify-between',

    width: 'w-full',
    height: 'h-fit',
})

export const Grid = ({ count, gap = 'gap-5', style, ...dividerStyle }: GridProps) => {
    return (
        <div
            className={
                grid.compose({
                    ...style,
                    gap,
                }).class
            }
        >
            {Array.from({ length: count }).map((_, i) => (
                <Divider key={i} {...dividerStyle} />
            ))}
        </div>
    )
}
