'use client'

import { useState } from 'react'
import { Grid, QuestionTextField } from '@/lib/common'
import {
    type AudioURL,
    AudioVisualizer,
    useAudioPlayer,
    useAudioVisualizer,
    useMediaRecorder,
} from '@/lib/common/audio_visualizer'
import { useSTT } from '@/lib/hooks/use_stt'
import { useTTS } from '@/lib/hooks/use_tts'
import { SvgArrowRight, SvgKeyboard, SvgVoice, SvgVoiceSmall } from '@/lib/icons'
import { SvgClose } from '@/lib/icons/close'

export const AssistantModule = () => {
    const { getSTT } = useSTT()
    const { getTTS } = useTTS()

    const [stt, setStt] = useState<string>('')

    const [assistantMode, setAssistantMode] = useState<'standby' | 'recording' | 'thinking' | 'answering'>('standby')

    const [audioURL, setAudioURL] = useState<AudioURL>('')

    const { isMediaStreamReady, mediaStream, startRecord, stopRecord } = useMediaRecorder({
        constraints: { audio: true },
        whenAudioBlobReady: async (audioBlob) => {
            await getSTT({
                audioBlob,
                whenDataReady: async (text) => {
                    setStt(text)
                    const audioURL = await getTTS(text)
                    setAssistantMode('answering')
                    setAudioURL(audioURL)
                    player.play()
                },
            })
        },
    })

    const isRecording = assistantMode === 'recording'

    const visualizer = useAudioVisualizer({
        autoBoot: false,
        isMediaStreamReady,
        mediaStream: mediaStream.current,
        analyzerOptions: {
            maxDecibels: -20,
            minDecibels: -90,
            fftResolution: 32,
            smoothingTimeConstant: 0.85,
        },
    })

    const player = useAudioPlayer(audioURL, {
        maxDecibels: -20,
        minDecibels: -90,
        fftResolution: 32,
        smoothingTimeConstant: 0.85,
        onAudioEnded: () => {
            setAssistantMode('standby')
        },
    })

    const [inputMode, setInputMode] = useState<'keyboard' | 'record'>('record')
    const isKeyboardMode = inputMode === 'keyboard'

    if (isKeyboardMode) {
        return (
            <QuestionTextField
                onClose={() => {
                    setInputMode('record')
                    setAssistantMode('standby')
                }}
                onSubmit={async (question) => {
                    const audioURL = await getTTS(question)
                    setAudioURL(audioURL)
                    player.play()
                }}
            />
        )
    }

    const assistantModeText =
        assistantMode === 'standby'
            ? '대기 중'
            : assistantMode === 'recording'
              ? '질문을 듣고 있어요'
              : assistantMode === 'thinking'
                ? '생각 중이에요'
                : '답변 중입니다'

    return (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2">
            <div
                className={`${isRecording ? 'bg-[#959595]' : 'bg-primary-box'} relative -z-20 flex size-fit min-h-64 min-w-64 flex-col items-center justify-between rounded-[3.75rem]  p-5 backdrop-blur-3xl transition`}
            >
                <button
                    type="button"
                    aria-label="키보드 닫기"
                    className="absolute right-5 top-6 z-10"
                    onClick={() => {}}
                >
                    <SvgClose stroke={isRecording ? 'black' : 'white'} />
                </button>

                <div className="flex flex-row items-center justify-center gap-2">
                    <SvgVoiceSmall />
                    <p className={`${isRecording ? 'text-theme-background' : 'text-theme-font'} select-none`}>
                        {assistantModeText}
                    </p>
                </div>

                <div className="relative flex h-fit w-full items-center justify-center">
                    <Grid
                        thickness="h-0.5"
                        gap="gap-3"
                        bg={isRecording ? 'bg-stone-200' : 'bg-primary-icon'}
                        count={4}
                        style={{
                            zIndex: '-z-10',
                            position: 'absolute',
                            opacity: 'opacity-20',
                        }}
                    />

                    <AudioVisualizer
                        size={100}
                        visibleBarNumber={5}
                        amplitudeMergeStepNumber={8}
                        getAmplitude={
                            assistantMode === 'recording'
                                ? visualizer.getAmplitude
                                : assistantMode === 'answering'
                                  ? player.getAmplitude
                                  : visualizer.getAmplitude
                        }
                        style={{
                            gap: 5,
                            backgroundColor: assistantMode === 'standby' ? '#ECFE83A9' : '#EBFE83',
                            defaultBarHeight: 30,
                            alignment: 'center',
                        }}
                    />
                </div>

                <div className="flex flex-row items-center justify-between gap-4 rounded-full bg-primary-toggleBG ">
                    <button
                        onPointerDown={(e) => {
                            e.preventDefault()
                            if (assistantMode === 'standby') {
                                setAssistantMode('recording')
                                visualizer.connect()
                                startRecord()
                            }
                        }}
                        onPointerUp={(e) => {
                            if (assistantMode === 'recording') {
                                e.preventDefault()
                                setAssistantMode('thinking')
                                visualizer.disconnect()
                                stopRecord()
                            }
                        }}
                    >
                        <SvgVoice />
                    </button>

                    <SvgArrowRight />

                    <button
                        onClick={() => {
                            setInputMode('keyboard')
                        }}
                    >
                        <SvgKeyboard />
                    </button>
                </div>
            </div>
        </div>
    )
}
