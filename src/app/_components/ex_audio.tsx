'use client'

import { useState } from 'react'
import { AudioVisualizer, useAudioVisualizer, useMediaRecorder } from '@/lib/common/audio_visualizer'
import { useSTT } from '@/lib/hooks/use_stt'

export const AudioVisualizerExample = () => {
    const { getSTT } = useSTT()

    const [stt, setStt] = useState('')

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

    const { connect, disconnect, getAmplitude } = useAudioVisualizer({
        isMediaStreamReady,
        mediaStream,
        analyzerOptions: {
            fftResolution: 32,
            maxDecibels: -20,
            minDecibels: -90,
            smoothingTimeConstant: 0.85,
        },
    })

    const btn = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'

    return (
        <>
            <h1 className="text-2xl font-bold">Record: {isRecording ? 'yes' : 'no'}</h1>
            <h2 className="font-kor text-xl font-semibold">{stt}</h2>
            <div className="flex flex-row items-center justify-center gap-3">
                <button
                    className={btn}
                    onClick={() => {
                        connect()
                        startRecord()
                    }}
                >
                    start record
                </button>
                <button
                    className={btn}
                    onClick={() => {
                        stopRecord()
                    }}
                >
                    stop record
                </button>
                <button
                    className={btn}
                    onClick={() => {
                        stopRecord()
                        disconnect()
                    }}
                >
                    Disconnect
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
        </>
    )
}
