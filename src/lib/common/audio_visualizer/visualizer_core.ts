import { t } from '@metal-box/type'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Logger } from '@/helpers/logger'
import { v } from '@/helpers/validator'
import { mergeFrequencyStep } from './utils'

const lg = new Logger({ name: 'AudioVisualizer' })

const decibel = t.number.validate(v.min(-100), v.max(0))
const smoothing = t.number.validate(v.min(0), v.max(1))

interface AudioAnalyzerOption {
    /**
     * @description fft resolution, fourier transform step resolution
     */
    fftResolution: 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768
    /**
     * @description max decibels [db], `max: 0, min: -100`
     */
    maxDecibels?: number
    /**
     * @description min decibels [db], `max: 0, min: -100`
     */
    minDecibels?: number
    /**
     * @description amplitude smoothing level, if higher, the amplitude will be more soft and stable
     */
    smoothingTimeConstant?: number
}

interface CreateAudioAnalyzerOption extends AudioAnalyzerOption {
    /**
     * @description media stream, core of audio analyzer
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStream MediaStream}
     */
    mediaStream: MediaStream
}
interface AudioAnalyzer {
    /**
     * @description audio analyzer node
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode AnalyserNode}
     */
    analyzer: AnalyserNode
    /**
     * @description frequency step, the domain of input frequency
     */
    frequencyStep: Uint8Array
    /**
     * @description disconnect audio analyzer
     */
    disconnect: () => void
    /**
     * @description connect audio analyzer
     */
    connect: () => void
}
const createAudioRecordAnalyzer = ({
    mediaStream,
    fftResolution,
    maxDecibels,
    minDecibels,
    smoothingTimeConstant,
}: CreateAudioAnalyzerOption): AudioAnalyzer => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const analyzer = audioContext.createAnalyser()

    // set analyzer options
    analyzer.fftSize = fftResolution
    analyzer.minDecibels = decibel.parse(minDecibels ?? -90)
    analyzer.maxDecibels = decibel.parse(maxDecibels ?? -10)
    analyzer.smoothingTimeConstant = smoothing.parse(smoothingTimeConstant ?? 0.85)

    const source: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(mediaStream)
    const connect = () => {
        source.connect(analyzer)
    }

    const disconnect = () => {
        source.disconnect()
        analyzer.disconnect()
    }

    const frequencyStep: Uint8Array = new Uint8Array(analyzer.frequencyBinCount)
    return {
        analyzer,
        frequencyStep,
        disconnect,
        connect,
    }
}

interface UseMediaStreamProps {
    /**
     * @description media stream constraints
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints constraints}
     */
    constraints: Omit<MediaStreamConstraints, 'video'>
}
const useMediaStream = ({ constraints }: UseMediaStreamProps) => {
    const mediaStream = useRef<MediaStream | null>(null)
    const [isMediaStreamReady, setIsMediaStreamReady] = useState<boolean>(false)

    useEffect(() => {
        const setupMediaStream = async () => {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints)
            mediaStream.current = stream
        }

        setupMediaStream().then(() => {
            setIsMediaStreamReady(true)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        return () => {
            mediaStream.current?.getTracks().forEach((track) => {
                track.stop()
            })
        }
    }, [])

    return {
        mediaStream,
        isMediaStreamReady,
    }
}

interface UseMediaRecorderProps extends UseMediaStreamProps {
    /**
     * @description handle recorded audio blob when ready
     * @param audioBlob recorded audioBlob, `Blob`
     */
    whenAudioBlobReady: (audioBlob: Blob) => Promise<void>
}
export const useMediaRecorder = ({ constraints, whenAudioBlobReady }: UseMediaRecorderProps) => {
    const { isMediaStreamReady, mediaStream } = useMediaStream({ constraints })

    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const mediaChunks = useRef<Array<Blob>>([])

    const [isRecording, setIsRecording] = useState<boolean>(false)

    useEffect(() => {
        if (isMediaStreamReady && mediaStream.current) {
            const recorder: MediaRecorder = new MediaRecorder(mediaStream.current)
            mediaRecorder.current = recorder
            mediaRecorder.current.ondataavailable = async (event) => {
                if (event.data.size > 0) {
                    mediaChunks.current.push(event.data)
                    const combinedChunks = new Blob(mediaChunks.current, { type: 'audio/webm' })
                    await whenAudioBlobReady(combinedChunks)
                }
            }
            lg.success('media recorder created')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMediaStreamReady])

    const startRecord = useCallback(() => {
        if (!mediaRecorder.current) return
        setIsRecording(true)
        mediaChunks.current = []
        mediaRecorder.current.start()
        lg.log('start recording')
    }, [])

    const stopRecord = useCallback(() => {
        if (!mediaRecorder.current) return
        setIsRecording(false)
        mediaRecorder.current.stop()
        lg.log('stop recording')
    }, [])

    return {
        startRecord,
        stopRecord,
        isRecording,
        mediaRecorder,
        mediaStream,
        isMediaStreamReady,
    }
}

export interface UseAudioVisualizerProps {
    /**
     * @description auto boot-initialize audio visualizer
     * @default true
     */
    autoBoot?: boolean
    /**
     * @description media stream
     * @see {@link useMediaRecorder}'s `mediaStream`
     */
    mediaStream: MediaStream | null
    /**
     * @description media stream ready state
     */
    isMediaStreamReady?: boolean
    /**
     * @description audio analyzer options
     * @see {@link createAudioRecordAnalyzer}'s `CreateAudioAnalyzerOption`
     */
    analyzerOptions?: Omit<CreateAudioAnalyzerOption, 'mediaStream'>
}
export interface AudioVisualizerHook {
    /**
     * @description audio analyzer ready state
     */
    isAudioEngineReady: boolean
    /**
     * @description disconnect audio analyzer
     */
    disconnect: () => void
    /**
     * @description get amplitude
     * @param amplitudeMergeStepNumber compress frequency step to amplitudeMergeStepNumber
     */
    getAmplitude: (amplitudeMergeStepNumber: number) => number[]
}
/**
 * @description audio visualizer headless hook
 * @example
 * ```tsx
 * // Import useMediaRecorder to get mediaStream
 * const {
 *      isMediaStreamReady,
 *      mediaStream,
 *      // startRecord,
 *      // stopRecord
 *      // isRecording,
 * } = useMediaRecorder({
 *      constraints: { audio: true },
 *      whenMediaChunksReady: async (chunks) => {
 *          // handle chunks
 *      },
 * })
 * // Plug mediaStream into useAudioVisualizer
 * const { connect, disconnect, getAmplitude } = useAudioVisualizer({
 *      isMediaStreamReady,
 *      mediaStream,
 *      analyzerOptions: {
 *          fftResolution: 32,
 *          maxDecibels: -20,
 *          minDecibels: -90,
 *          smoothingTimeConstant: 0.85,
 *      },
 * })
 * ```
 */
export const useAudioVisualizer = ({
    mediaStream,
    isMediaStreamReady,
    analyzerOptions,
    autoBoot = true,
}: UseAudioVisualizerProps) => {
    const audioAnalyzer = useRef<AudioAnalyzer | null>(null)
    const [isAudioEngineReady, setIsAudioEngineReady] = useState<boolean>(false)

    useEffect(() => {
        if (!isMediaStreamReady) return
        if (!mediaStream) return

        const engine = createAudioRecordAnalyzer({
            fftResolution: 32,
            ...analyzerOptions,
            mediaStream,
        })
        audioAnalyzer.current = engine
        setIsAudioEngineReady(true)
        lg.success('audio visualizer engine created')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMediaStreamReady])

    const connect = useCallback(() => {
        if (!audioAnalyzer.current) return
        audioAnalyzer.current.connect()
    }, [])

    const disconnect = useCallback(() => {
        if (!audioAnalyzer.current) return
        audioAnalyzer.current.disconnect()
    }, [])

    useEffect(() => {
        if (!autoBoot) return

        connect()
        return () => {
            disconnect()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAudioEngineReady, autoBoot])

    const getAmplitude = useCallback((activeBarNumber: number) => {
        if (!audioAnalyzer.current) return []
        audioAnalyzer.current.analyzer.getByteFrequencyData(audioAnalyzer.current.frequencyStep)
        const amplitude: Array<number> = mergeFrequencyStep(audioAnalyzer.current.frequencyStep, activeBarNumber)
        return amplitude
    }, [])

    return {
        isAudioEngineReady,
        connect,
        disconnect,
        getAmplitude,
    }
}
