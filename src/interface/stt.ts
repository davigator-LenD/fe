import { Infer, t } from '@metal-box/type'

export const stt = {
    body: t
        .object({
            audio: t.string,
        })
        .strict(),
} as const

export type STTBody = Infer<(typeof stt)['body']>
