'use client'

import { useState } from 'react'
import { QuestionTextField } from '@/lib/common'
import { AudioVisualizer, useAudioVisualizer, useMediaRecorder } from '@/lib/common/audio_visualizer'
import { useSTT } from '@/lib/hooks/use_stt'
import { SvgArrowRight, SvgKeyboard, SvgVoice } from '@/lib/icons'

export const AssistantModule = () => {
    const { getSTT } = useSTT()

    const [stt, setStt] = useState('')
    const [isRecordClicked, setIsRecordClicked] = useState<boolean>(false)
    const [isKeyboardMode, setIsKeyboardMode] = useState<boolean>(false)

    const { isRecording, isMediaStreamReady, mediaStream, startRecord, stopRecord } = useMediaRecorder({
        constraints: { audio: true },
        whenAudioBlobReady: async (chunks) => {
            await getSTT({
                whenDataReady: (text) => {
                    setStt(text)
                },
                audioBlob: chunks,
            })
        },
    })

    const { connect, getAmplitude } = useAudioVisualizer({
        isMediaStreamReady,
        mediaStream,
        analyzerOptions: {
            fftResolution: 32,
            maxDecibels: -20,
            minDecibels: -90,
            smoothingTimeConstant: 0.85,
        },
    })

    return (
        <>
            {isKeyboardMode === false ? (
                <div>
                    <h1 className="text-2xl font-bold">Record: {isRecording ? 'yes' : 'no'}</h1>
                    <h2 className="font-kor text-xl font-semibold">{stt}</h2>

                    <div className="flex w-[210px] flex-row items-center justify-between rounded-full bg-primary-toggleBG ">
                        <button
                            onClick={() => {
                                setIsRecordClicked(!isRecordClicked)
                                if (isRecordClicked) {
                                    connect()
                                    startRecord()
                                } else {
                                    stopRecord()
                                }
                            }}
                        >
                            <SvgVoice />
                        </button>
                        <SvgArrowRight />
                        <button
                            onClick={() => {
                                setIsKeyboardMode(!isKeyboardMode)
                            }}
                        >
                            <SvgKeyboard />
                        </button>
                    </div>
                    <div className="flex flex-row items-center justify-center rounded-[2rem] bg-[#121212] p-10">
                        <AudioVisualizer
                            size={75}
                            visibleBarNumber={8}
                            amplitudeMergeStepNumber={8}
                            getAmplitude={getAmplitude}
                            style={{
                                backgroundColor: '#EBFE83',
                                gap: 5,
                                alignment: 'center',
                                defaultBarHeight: 50,
                            }}
                        />
                    </div>
                </div>
            ) : (
                <QuestionTextField />
            )}
        </>
    )
}

{
    /* <button
                    className={btn}
                    onClick={() => {
                        stopRecord()
                        disconnect()
                    }}
                >
                    Disconnect
                </button> */
}
