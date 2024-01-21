import { tts } from '@/interface/tts'
import { Assistant } from '@/service/assistant'
import { openAi } from '@/service/open_ai'

const assistant = Assistant.create(openAi)

export async function POST(req: Request) {
    const { text } = tts.body.parse(await req.json())

    try {
        const ttsBuffer: ArrayBuffer = await assistant.getTTS({
            input: text,
        })

        return new Response(ttsBuffer, {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'audio/mpeg',
            },
        })
    } catch (e) {
        if (e instanceof Error) {
            return new Response(null, {
                status: 500,
                statusText: 'TTS Error',
            })
        }
        return new Response(null, {
            status: 500,
            statusText: 'TTS Error',
        })
    }
}
