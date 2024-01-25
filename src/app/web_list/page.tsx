'use client'
import { PropsWithChildren, useRef, useState } from 'react'
import { ReactNode } from 'react'
import { Text } from '@/lib/common'
import { SvgBack, SvgVoice, SvgWebList } from '@/lib/icons'
import { SvgEclipse } from '@/lib/icons/eclipse'
import { SvgStar } from '@/lib/icons/star'
import { SvgWebListVoice } from '@/lib/icons/weblist_voice'

interface SwipeToDeleteProps {
    rows: Array<{ id: number; name: string; url: string }>
    onDelete: (id: number) => void
}
const Item = ({ children }: { children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null)
    let downX: number

    const onPointerMove = (e: MouseEvent) => {
        const newX = e.clientX
        if (newX - downX < -30 && ref.current) {
            ref.current.style.transform = 'translateX(-55px)'
            setTimeout(() => {
                if (ref.current) {
                    ref.current.style.transform = 'translateX(0px)'
                }
            }, 4000)
        } else {
            if (ref.current) {
                ref.current.style.transform = 'translateX(0px)'
            }
        }
    }
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        downX = e.clientX
        if (ref.current) {
            ref.current.addEventListener('pointermove', onPointerMove)
        }
    }
    const onPointerUp = () => {
        if (ref.current) {
            ref.current.removeEventListener('pointermove', onPointerMove)
        }
    }

    return (
        <div
            className="ml-[3px] flex w-full"
            style={{ transition: 'transform 800ms' }}
            onPointerDown={onPointerDown}
            ref={ref}
            onPointerUp={onPointerUp}
        >
            {children}
        </div>
    )
}
const SwipeToDelete = ({ rows, onDelete }: PropsWithChildren<SwipeToDeleteProps>) => {
    return (
        <div className="w-full overflow-hidden border-solid">
            {rows.map((row) => (
                <Item key={row.id}>
                    <div className=" flex shrink-0 grow basis-full flex-row py-4">
                        <div>
                            <SvgEclipse />
                        </div>

                        <div className="flex w-full items-center justify-between">
                            <div className="ml-4 flex flex-col items-start justify-center">
                                <div className=" font-[600]">{row.name}</div>
                                <div className="w-full max-w-[180px] truncate">{row.url}</div>
                            </div>

                            <div className="mr-[2px]">
                                <SvgStar />
                            </div>
                        </div>
                    </div>

                    <button
                        className="min-w-[55px] cursor-pointer border-none bg-primary-logo text-left"
                        onClick={() => onDelete(row.id)}
                    >
                        delete
                    </button>
                </Item>
            ))}
        </div>
    )
}
export default function WebListPage() {
    const [question, setQuestion] = useState('')
    const [list, setList] = useState([
        { id: 0, name: '정부24', url: 'https://www.gov.kr/yearend_main.html' },
        { id: 1, name: '네이버', url: 'https://www.naver.com' },
    ])
    const onDelete = (id: number) => {
        setList((prev) => prev.filter((row) => row.id !== id))
    }
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
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <div className="mb-4 mt-8 text-xl font-[700] text-primary-websitelist">내 웹사이트</div>
                        <SwipeToDelete rows={list} onDelete={onDelete} />
                    </div>

                    <div className="flex flex-col">
                        <div className="mb-4 mt-8 text-xl font-[700] text-primary-websitelist">추천 웹사이트</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
