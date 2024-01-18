/* eslint-disable no-console */
import type OpenAi from 'openai'

export class Assistant {
    private static instance: Assistant
    public static create($api: OpenAi): Assistant {
        return (Assistant.instance ??= new Assistant($api))
    }

    private constructor(private readonly $api: OpenAi) {}

    public async getTTS({
        input,
        model = 'tts-1',
        voice = 'alloy',
        response_format = 'mp3',
    }: {
        input: string
    } & Partial<Parameters<OpenAi['audio']['speech']['create']>[0]>): Promise<ArrayBuffer> {
        const response = await this.$api.audio.speech.create({
            input,
            model,
            voice,
            response_format,
        })
        return response.arrayBuffer()
    }
}
