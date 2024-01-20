import { SvgArrowRight, SvgKeyboard, SvgVoice } from '@/lib/icons'

export const Toggle = () => {
    return (
        <div className="flex w-[210px] flex-row items-center justify-between rounded-full bg-primary-toggleBG ">
            <SvgVoice />
            <SvgArrowRight />
            <SvgKeyboard />
        </div>
    )
}
