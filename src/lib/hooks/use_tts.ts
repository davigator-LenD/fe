/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import { useState } from 'react'
import { Fetcher } from '@/helpers/fetcher'

const fetcher = new Fetcher({
    cache: {
        dev: 'default',
        prod: 'default',
    },
})

type AudioUrl = string
/**
 * @description useTTS
 * @example
 * ```tsx
    export const TTS = () => {
        const [text, setText] = useState<string>('')
        const { get, store } = useTTS()

        return (
            <form
                onSubmit={async (e) => {
                    e.preventDefault()
                    await get(text)
                }}
            >
                <input
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                />
            </form>
        )
    }
 * ```
 */
export const useTTS = () => {
    const [audioUrlList, setAudioUrlList] = useState<Map<string, { url: AudioUrl; blob: Blob }>>(new Map())

    const fetchTTSAudio = async (text: string): Promise<AudioUrl> => {
        if (audioUrlList.has(text)) {
            const { url } = audioUrlList.get(text)!
            return url
        }

        const ttsResponse = await fetcher.post('tts', {
            body: {
                text,
            },
            option: {
                disableJsonParse: true,
            },
        })

        const audioBuffer: ArrayBuffer = await ttsResponse.arrayBuffer()
        const blob: Blob = new Blob([audioBuffer], { type: 'audio/mpeg' })
        const audioUrl: AudioUrl = URL.createObjectURL(blob)

        setAudioUrlList((prev) => {
            prev.set(text, {
                blob,
                url: audioUrl,
            })
            return prev
        })

        return audioUrl
    }

    return {
        /**
         * @description fetch tts audio from text
         * @param text
         */
        getTTS: fetchTTSAudio,
        /**
         * @description store of audio cache url
         */
        store: audioUrlList as ReadonlyMap<string, { url: AudioUrl; blob: Blob }>,
    }
}
