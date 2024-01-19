'use client'
import React, { FormEvent, useState } from 'react'
import { useEffect } from 'react'

export const TextField = () => {
    const [question, setQuestion] = useState('')
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
        alert(`question: ${question}`)
    }

    return (
        <div className="flex h-screen w-full items-center justify-center p-8">
            <div className={` fixed bottom-0 p-[10px]`} style={{ height: inputHeight }}>
                <form className=" flex w-full opacity-20" onSubmit={handleSubmit}>
                    <input
                        className="flex w-full rounded-3xl border-2 bg-transparent p-2 px-6 shadow-inner placeholder:text-theme-font"
                        id="name"
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="웹 사이트 이름"
                    />
                </form>
            </div>
        </div>
    )
}
