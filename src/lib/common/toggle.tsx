import SvgKeyboard from '../icons/keyboard'
import SvgVoice from '../icons/voice'
export const Toggle = () => {
    return (
        <div className="flex h-[100px] w-[400px] items-center justify-center bg-white">
            <div className="flex w-[200px] flex-row items-center justify-between rounded-full bg-primary-toggleBG ">
                <SvgVoice />
                <SvgKeyboard />
            </div>
        </div>
    )
}
