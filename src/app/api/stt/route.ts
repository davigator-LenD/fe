/* eslint-disable no-console */
import { ApiResponse } from '@/interface/api'
import { stt } from '@/interface/stt'
import { Assistant } from '@/service/assistant'
import { openAi } from '@/service/open_ai'

const assistant = Assistant.create(openAi)

export async function POST(req: Request) {
    const body = stt.body.parse(await req.json())
    try {
        const ttsText = await assistant.getSTT({
            base64Audio: body.audio,
        })

        const apiRes: ApiResponse<string> = {
            message: 'OK',
            ok: true,
            response: ttsText,
            status: 200,
        }

        return Response.json(apiRes, {
            status: 200,
            statusText: 'OK',
        })
    } catch (e) {
        const errorApiRes: ApiResponse<null> = {
            message: 'STT Error',
            ok: false,
            response: null,
            status: 500,
        }
        return Response.json(errorApiRes, {
            status: 500,
            statusText: 'STT Error',
        })
    }
}
