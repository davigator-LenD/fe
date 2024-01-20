import { SvgArrowLeft } from '../icons/arrow'
import { SvgArrowRight } from '../icons/arrow'
import SvgKeyboard from '../icons/keyboard'
import SvgVoice from '../icons/voice'
export const Toggle = () => {
    return (
        <div className="flex w-[210px] flex-row items-center justify-between rounded-full bg-primary-toggleBG ">
            <SvgVoice />
            <SvgArrowRight />
            <SvgKeyboard />
        </div>
    )
}
