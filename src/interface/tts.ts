import { Infer, t } from '@metal-box/type'

export const tts = {
    body: t
        .object({
            text: t.string,
        })
        .strict(),
}

export type TTSBody = Infer<(typeof tts)['body']>
