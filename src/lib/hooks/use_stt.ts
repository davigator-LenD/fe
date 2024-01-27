'use client'

import { useCallback } from 'react'
import { Fetcher } from '@/helpers/fetcher'
import { ApiResponse } from '@/interface/api'

const fetcher = new Fetcher({
    cache: {
        dev: 'default',
        prod: 'default',
    },
})

export const useSTT = () => {
    const getSTT = useCallback(
        async ({
            audioBlob,
            whenDataReady,
        }: {
            audioBlob: Blob
            whenDataReady: (sttText: string) => Promise<void>
        }) => {
            if (!audioBlob) return
            const reader = new FileReader()
            reader.readAsDataURL(audioBlob)
            reader.onloadend = async function () {
                const base64Audio: string | undefined = reader.result?.toString().split(',')[1]
                if (!base64Audio) throw new Error('base64Audio is undefined')

                const sttText = await fetcher.post<ApiResponse<string>>('stt', {
                    body: {
                        audio: base64Audio,
                    },
                })
                await whenDataReady(sttText.response)
            }
        },
        []
    )

    return {
        getSTT,
    }
}
