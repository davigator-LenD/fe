'use client'
import { useEffect, useState } from 'react'
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
interface QuestionTextFieldProps {
    onClose: () => void
    onSubmit: (question: string) => void
}
export const QuestionTextField = ({ onClose, onSubmit }: QuestionTextFieldProps) => {
    const [question, setQuestion] = useState('')
    const isQuestionEmpty: boolean = question === ''

    const inputHeight = useKeyboardHeight()

    const resetQuestion = () => {
        setQuestion('')
    }

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div
                className={`fixed bottom-0 flex w-full flex-col items-center justify-evenly bg-primary-textfieldBOX/80 px-4 backdrop-blur-3xl`}
                style={{ height: `${inputHeight + 60}px` }}
            >
                <div className="relative flex w-full flex-row items-center justify-center">
                    <span className={`h-[3.5px] w-[110px] select-none rounded-3xl bg-background`} />
                    <button
                        type="button"
                        aria-label="키보드 닫기"
                        className="absolute -top-1 right-2 z-10"
                        onClick={onClose}
                    >
                        <SvgClose />
                    </button>
                </div>

                <div className="flex h-fit w-full items-center justify-center">
                    <form
                        className="h-fit w-full"
                        onSubmit={(e) => {
                            e.preventDefault()
                            if (isQuestionEmpty) return
                            onSubmit(question)
                            resetQuestion()
                        }}
                    >
                        <input
                            className={`flex max-h-[80px] w-full items-center rounded-3xl border-2 border-primary-box bg-background p-3 px-6 caret-primary-logo shadow-inner outline-none ${question === '' ? 'placeholder:text-stone-600' : ' placeholder:text-theme-font'}`}
                            id="textfield1"
                            type="text"
                            value={question}
                            placeholder="이동하고 싶은 웹사이트를 적어주세요"
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                    </form>

                    <button
                        type="button"
                        aria-label="ai에게 전송"
                        disabled={isQuestionEmpty}
                        className={`${isQuestionEmpty ? 'opacity-0 scale-75' : 'opacity-100 scale-100'} z-10 ml-[-50px] flex items-center justify-end p-1 transition-all`}
                        onClick={resetQuestion}
                    >
                        <SvgSmallSend />
                    </button>
                </div>
            </div>
        </div>
    )
}
