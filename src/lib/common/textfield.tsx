'use client'
import React, { FormEvent, useState } from 'react'
import { useEffect } from 'react'
import SvgSend from '../icons/send'

export const TextField = () => {
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
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        alert(`website: ${website}`)
    }

    return (
        <div className="flex h-screen w-full items-center justify-center p-8">
            <div className={`fixed bottom-4 flex w-full  items-center p-[10px]`} style={{ height: inputHeight }}>
                <form className=" flex w-full " onSubmit={handleSubmit}>
                    <input
                        className={`flex max-h-[80px] w-full items-center rounded-3xl border-2 border-primary-box bg-transparent p-3 px-6 caret-primary-logo shadow-inner ${website === '' ? 'placeholder:text-primary-box' : ' placeholder:text-theme-font'}`}
                        id="textfield1"
                        type="text"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="웹 사이트 이름"
                    />
                </form>

                {/* {website === '' ? <div></div> 
               :
               <div className="z-10 ml-[-40px] flex items-center justify-end"
               >
               <SvgSend />
               </div> } */}
            </div>
        </div>
    )
}
