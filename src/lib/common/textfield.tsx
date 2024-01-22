'use client'
import { useEffect, useState } from 'react'
import { AssistantModule } from '@/app/_components/assistant_module'
import { SvgSmallSend } from '@/lib/icons'
import { SvgClose } from '../icons/close'
const useKeyboardHeight = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(60)
    useEffect(() => {
        const handleResize = () => {
            setKeyboardHeight(window.innerHeight * 0.1) // 예시: 뷰포트 높이의 10%
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return keyboardHeight
}
export const WebTextField = () => {
    const [website, setWebsite] = useState('')
    const inputHeight = useKeyboardHeight()
    const handleSubmit = () => {
        //console.log(`website: ${website}`)
        setWebsite('')
    }

    return (
        <div className="flex h-screen w-full items-center justify-center p-8">
            <div className={`fixed bottom-4 flex w-full  items-center p-[10px]`} style={{ height: inputHeight }}>
                <form className=" flex w-full ">
                    <input
                        className={`flex max-h-[80px] w-full items-center rounded-3xl border-2 border-primary-box bg-transparent p-3 px-6 caret-primary-logo shadow-inner ${website === '' ? 'placeholder:text-primary-box' : ' placeholder:text-theme-font'}`}
                        id="textfield1"
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="웹 사이트 이름"
                    />
                </form>

                {website === '' ? (
                    <div></div>
                ) : (
                    <div className="z-10 ml-[-48px] flex items-center justify-end" onClick={handleSubmit}>
                        <SvgSmallSend />
                    </div>
                )}
            </div>
        </div>
    )
}
interface ModeProps {
    mode: boolean
}
export const QuestionTextField = () => {
    const [question, setQuestion] = useState('')
    const inputHeight = useKeyboardHeight()
    const [isKeyboardMode, setIsKeyboardMode] = useState<boolean>(true)

    const handleSubmit = () => {
        //alert(`website: ${website}`)
        setQuestion('')
    }

    return (
        <div>
            {isKeyboardMode ? (
                <div className="flex h-screen w-full items-center justify-center p-8">
                    <div
                        className={`fixed bottom-0 flex w-full flex-col items-center justify-evenly bg-primary-textfieldBOX  p-[10px]`}
                        style={{ height: `${inputHeight + 60}px` }}
                    >
                        <div className="flex w-full flex-row items-center justify-between">
                            <div></div>
                            <div
                                className={` ${question === '' ? 'mb-[4px]' : ''}  h-[3px] w-1/5 rounded-3xl bg-background`}
                            ></div>
                            <div
                                className="mt-[-16px]"
                                onClick={() => {
                                    setIsKeyboardMode(!isKeyboardMode)
                                }}
                            >
                                <SvgClose />
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center">
                            <form className={`${question === '' ? 'mb-[-12px]' : 'mb-[-12px]'} flex w-full `}>
                                <input
                                    className={`flex max-h-[80px] w-full items-center rounded-3xl border-2 border-primary-box bg-background p-3 px-6 caret-primary-logo shadow-inner ${question === '' ? 'placeholder:text-primary-box' : ' placeholder:text-theme-font'}`}
                                    id="textfield1"
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="웹 사이트 이름"
                                />
                            </form>

                            {question === '' ? (
                                <div></div>
                            ) : (
                                <div
                                    className={`${question === '' ? '' : 'mb-[-12px]'} z-10 ml-[-48px] flex items-center justify-end`}
                                    onClick={handleSubmit}
                                >
                                    <SvgSmallSend />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <AssistantModule />
            )}
        </div>
    )
}
