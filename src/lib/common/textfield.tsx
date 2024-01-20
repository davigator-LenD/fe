'use client'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { SvgSmallSend } from '../icons/ send_small'

export const WebTextField = () => {
    const [website, setWebsite] = useState('')
    const [inputHeight, setInputHeight] = useState(60)
    useEffect(() => {
        const handleResize = () => {
            setInputHeight(window.innerHeight * 0.1) // 예시: 뷰포트 높이의 10%
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
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

export const QuestionTextField = () => {
    const [website, setWebsite] = useState('')
    const [inputHeight, setInputHeight] = useState(60)
    useEffect(() => {
        const handleResize = () => {
            setInputHeight(window.innerHeight * 0.1) // 예시: 뷰포트 높이의 10%
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const handleSubmit = () => {
        //alert(`website: ${website}`)
        setWebsite('')
    }

    return (
        <div className="flex h-screen w-full items-center justify-center p-8">
            <div
                className={`fixed bottom-0 flex w-full flex-col items-center justify-evenly bg-primary-textfieldBOX  p-[10px]`}
                style={{ height: `${inputHeight + 60}px` }}
            >
                <div className={`${website === '' ? 'mb-[4px]' : ''}  h-[3px] w-1/5 rounded-3xl bg-background`}></div>
                <div className="flex w-full items-center justify-center">
                    <form className={`${website === '' ? 'mb-[-12px]' : 'mb-[-12px]'} flex w-full `}>
                        <input
                            className={`flex max-h-[80px] w-full items-center rounded-3xl border-2 border-primary-box bg-background p-3 px-6 caret-primary-logo shadow-inner ${website === '' ? 'placeholder:text-primary-box' : ' placeholder:text-theme-font'}`}
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
                        <div
                            className={`${website === '' ? '' : 'mb-[-12px]'} z-10 ml-[-48px] flex items-center justify-end`}
                            onClick={handleSubmit}
                        >
                            <SvgSmallSend />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
