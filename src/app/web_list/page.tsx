'use client'
import { useState } from 'react'
import { Text } from '@/lib/common'
import { SvgBack, SvgWebList } from '@/lib/icons'
import { SvgWebListVoice } from '@/lib/icons/weblist_voice'

export default function WebListPage() {
    const [question, setQuestion] = useState('')
    return (
        <div className="flex size-full flex-col items-start justify-start">
            <div className="mt-8 flex w-full flex-row items-center justify-between">
                <SvgBack />
                <SvgWebListVoice />
            </div>
            <div className="flex size-full flex-col px-5 ">
                <Text.Heading>웹 사이트</Text.Heading>
                <Text.SubHeading>어디 웹 사이트에 들어갈까요?</Text.SubHeading>
                <div className="mt-4 flex w-full flex-row items-center justify-center">
                    <form className={` flex w-full `}>
                        <input
                            className={`flex max-h-[80px] w-full items-center  border-[1px] border-background border-b-white bg-background p-3  caret-primary-logo shadow-inner placeholder:text-3xl ${question === '' ? 'placeholder:text-primary-box' : ' placeholder:text-theme-font'}`}
                            id="textfield1"
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="웹 사이트 입력"
                        />
                    </form>

                    <div className={`  ml-[-32px] flex items-center justify-end`}>
                        <SvgWebList />
                    </div>
                </div>
            </div>
        </div>
    )
}
