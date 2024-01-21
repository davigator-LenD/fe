import fs from 'fs'
import type OpenAI from 'openai'

export class Assistant {
    private static instance: Assistant
    public static create($api: OpenAI): Assistant {
        return (Assistant.instance ??= new Assistant($api))
    }

    private constructor(private readonly $api: OpenAI) {}

    public async getTTS({
        input,
        model = 'tts-1',
        voice = 'alloy',
        response_format = 'mp3',
    }: {
        input: string
    } & Partial<Parameters<OpenAI['audio']['speech']['create']>[0]>): Promise<ArrayBuffer> {
        const response = await this.$api.audio.speech.create({
            input,
            model,
            voice,
            response_format,
        })
        return response.arrayBuffer()
    }

    public async getSTT({
        base64Audio,
        ...openAiOptions
    }: {
        base64Audio: string
    } & Partial<Omit<Parameters<OpenAI['audio']['transcriptions']['create']>[0], 'model' | 'file'>>): Promise<string> {
        const audio = Buffer.from(base64Audio, 'base64')

        const tempFilePath = 'tmp/input.wav' as const
        fs.mkdirSync('tmp', {
            recursive: true,
        })
        fs.writeFileSync(tempFilePath, audio)

        const readStream = fs.createReadStream(tempFilePath)

        const sttText: string = await this.$api.audio.transcriptions
            .create({
                file: readStream,
                model: 'whisper-1',
                language: 'ko',
                ...openAiOptions,
            })
            .then((res) => res.text)

        fs.unlinkSync(tempFilePath)

        return sttText
    }
}
