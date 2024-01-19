/* eslint-disable no-console */
import { t } from '@metal-box/type'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Logger } from '@/helpers/logger'
import { v } from '@/helpers/validator'

const lg = new Logger({ name: 'AudioVisualizer' })

const decibel = t.number.validate(v.min(-100), v.max(0))
const smoothing = t.number.validate(v.min(0), v.max(1))

interface CreateAudioAnalyzerOption {
    /**
     * @description media stream, core of audio analyzer
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStream MediaStream}
     */
    mediaStream: MediaStream
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
const createAudioAnalyzer = ({
    mediaStream,
    fftResolution,
    maxDecibels,
    minDecibels,
    smoothingTimeConstant,
}: CreateAudioAnalyzerOption): AudioAnalyzer => {
    const audioContext = new window.AudioContext()
    const analyzer = audioContext.createAnalyser()

    // set analyzer options
    analyzer.fftSize = fftResolution
    analyzer.minDecibels = decibel.parse(minDecibels ?? -90)
    analyzer.maxDecibels = decibel.parse(maxDecibels ?? -10)
    analyzer.smoothingTimeConstant = smoothing.parse(smoothingTimeConstant ?? 0.85)

    const source: MediaStreamAudioSourceNode = audioContext.createMediaStreamSource(mediaStream)

    const connect = () => {
        source.connect(analyzer)
        source.connect(audioContext.destination)
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

/**
 * @description merge frequency step to active bar number
 * @param frequencyStep merged frequency step
 * @param activeBarNumber compress frequency step to active bar number
 * @example
 * ```md
 *  Input: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], Merge to 5
 *  ---
    Process:
    -> First pair: (10 + 20) / 2 = 15
    -> Second pair: (30 + 40) / 2 = 35
    -> Third pair: (50 + 60) / 2 = 55
    -> Fourth pair: (70 + 80) / 2 = 75
    -> Fifth pair: (90 + 100) / 2 = 95
    ---
    Output: [15, 35, 55, 75, 95]
 * ```
 */
const mergeFrequencyStep = (frequencyStep: Uint8Array, activeBarNumber: number): Array<number> => {
    const mergedFrequencyStep: Array<number> = []
    const step = Math.floor(frequencyStep.length / activeBarNumber)

    for (let i = 0; i < activeBarNumber; i++) {
        let sum = 0
        const startIndex = i * step
        const endIndex = startIndex + step

        for (let j = startIndex; j < endIndex; j++) {
            sum += frequencyStep[j]!
        }

        mergedFrequencyStep.push(sum / step)
    }

    return mergedFrequencyStep
}

interface UseMediaStreamProps {
    /**
     * @description media stream constraints
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints constraints}
     */
    constraints: Omit<MediaStreamConstraints, 'video'>
}
const useMediaStream = ({ constraints }: UseMediaStreamProps) => {
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
    const [isMediaStreamReady, setIsRecordReady] = useState<boolean>(false)

    useEffect(() => {
        const setupMediaStream = async () => {
            const stream: MediaStream = await navigator.mediaDevices.getUserMedia(constraints)
            setMediaStream(stream)
        }

        setupMediaStream().then(() => {
            setIsRecordReady(true)
        })
    }, [constraints])

    return {
        mediaStream,
        isMediaStreamReady,
    }
}

interface UseMediaRecorderProps extends UseMediaStreamProps {
    /**
     * @description handle media chunks when ready
     * @param mediaChunks recorded media chunks, `Array<Blob>`
     */
    whenMediaChunksReady: (mediaChunks: Array<Blob>) => void
}
export const useMediaRecorder = ({ constraints, whenMediaChunksReady }: UseMediaRecorderProps) => {
    const { isMediaStreamReady, mediaStream } = useMediaStream({ constraints })

    const mediaRecorder = useRef<MediaRecorder | null>(null)
    const mediaChunks = useRef<Array<Blob>>([])

    const [isRecording, setIsRecording] = useState<boolean>(false)

    useEffect(() => {
        if (isMediaStreamReady && mediaStream) {
            const recorder = new MediaRecorder(mediaStream)
            mediaRecorder.current = recorder
            mediaRecorder.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    mediaChunks.current.push(event.data)
                    whenMediaChunksReady(mediaChunks.current)
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
     * @see {@link createAudioAnalyzer}'s `CreateAudioAnalyzerOption`
     */
    analyzerOptions?: Omit<CreateAudioAnalyzerOption, 'mediaStream'>
}
export interface AudioVisualizerHook {
    /**
     * @description audio analyzer ready state
     */
    isAudioEngineReady: boolean
    /**
     * @description connect audio analyzer
     */
    connect: () => void
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
    const audioEngine = useRef<AudioAnalyzer | null>(null)
    const [isAudioEngineReady, setIsAudioEngineReady] = useState<boolean>(false)

    useEffect(() => {
        if (!isMediaStreamReady) return
        if (!mediaStream) return

        const engine = createAudioAnalyzer({
            fftResolution: 32,
            ...analyzerOptions,
            mediaStream,
        })
        audioEngine.current = engine
        setIsAudioEngineReady(true)
        lg.success('audio engine created')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMediaStreamReady])

    const connect = useCallback(() => {
        if (!audioEngine.current) return
        audioEngine.current.connect()
    }, [])

    const disconnect = useCallback(() => {
        if (!audioEngine.current) return
        audioEngine.current.disconnect()
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
        if (!audioEngine.current) return []
        audioEngine.current.analyzer.getByteFrequencyData(audioEngine.current.frequencyStep)
        const amplitude: Array<number> = mergeFrequencyStep(audioEngine.current.frequencyStep, activeBarNumber)
        return amplitude
    }, [])

    return {
        isAudioEngineReady,
        connect,
        disconnect,
        getAmplitude,
    }
}
