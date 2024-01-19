import { Tw, tw } from '@/style/tw'

const divider = tw.style({
    width: 'w-full',
    borderRadius: 'rounded',
})
export interface DividerProps {
    bg?: Tw['backgroundColor']
    thickness?: Tw['height']
}
export const Divider = ({ bg = 'bg-gray-400', thickness = 'h-[1px]' }: DividerProps) => {
    return (
        <div
            className={
                divider.compose({
                    backgroundColor: bg,
                    height: thickness,
                }).class
            }
        />
    )
}
