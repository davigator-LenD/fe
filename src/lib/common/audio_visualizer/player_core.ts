import { useCallback, useEffect, useRef } from 'react'
import { Logger } from '@/helpers/logger'
import { type AudioAnalyzerOption, decibel, mergeFrequencyStep, smoothing } from './utils'

const lg = new Logger({
    name: 'AudioPlayer',
})

export type AudioURL = string
interface CreateAudioRecordAnalyzerOption extends AnalyserOptions {
    audioURL: AudioURL
    onAudioEnded?: () => void
}
interface AudioPlayerEngine {
    analyzer: AnalyserNode
    frequencyStep: Uint8Array
    disconnect: () => void
    connect: () => void
    play: () => void
    stop: () => void
}
const createAudioPlayerEngine = ({
    audioURL,
    onAudioEnded,
    fftSize = 32,
    maxDecibels,
    minDecibels,
    smoothingTimeConstant,
}: CreateAudioRecordAnalyzerOption): AudioPlayerEngine => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const analyzer = audioContext.createAnalyser()
    const audioElement = new Audio(audioURL)

    audioElement.onended = () => {
        setTimeout(() => onAudioEnded?.(), 500)
    }

    // set analyzer options
    analyzer.fftSize = fftSize
    analyzer.minDecibels = decibel.parse(minDecibels ?? -90)
    analyzer.maxDecibels = decibel.parse(maxDecibels ?? -10)
    analyzer.smoothingTimeConstant = smoothing.parse(smoothingTimeConstant ?? 0.85)

    const source = audioContext.createMediaElementSource(audioElement)

    const play = () => {
        audioElement.playbackRate = 4

        audioElement.load()
        audioElement.play()

        source.connect(analyzer)
        analyzer.connect(audioContext.destination)
    }

    const disconnect = () => {
        source.disconnect()
        analyzer.disconnect()
    }

    const stop = () => {
        audioElement.pause()
    }

    const frequencyStep: Uint8Array = new Uint8Array(analyzer.frequencyBinCount)

    return {
        analyzer,
        frequencyStep,
        disconnect,
        connect: play,
        play,
        stop,
    }
}

interface UseAudioVisualizerOption extends AudioAnalyzerOption {
    onAudioEnded?: () => void
}
export const useAudioPlayer = (audioURL: AudioURL, option: UseAudioVisualizerOption) => {
    const playerEngine = useRef<AudioPlayerEngine | null>(null)

    useEffect(() => {
        if (!audioURL || audioURL === '') return

        playerEngine.current = createAudioPlayerEngine({
            fftSize: 32,
            audioURL,
            ...option,
        })
        lg.success('PLAYER ENGINE CREATED')
        playerEngine.current.connect()

        return () => {
            playerEngine.current?.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioURL])

    const connect = useCallback(() => {
        if (!playerEngine.current) return
        playerEngine.current.connect()
    }, [])

    const disconnect = useCallback(() => {
        if (!playerEngine.current) return
        playerEngine.current.disconnect()
    }, [])

    const play = useCallback(() => {
        if (!playerEngine.current) return
        playerEngine.current.play()
    }, [])

    const stop = useCallback(() => {
        if (!playerEngine.current) return
        playerEngine.current.stop()
    }, [])

    const getAmplitude = useCallback((activeBarNumber: number) => {
        if (!playerEngine.current) return []
        playerEngine.current.analyzer.getByteFrequencyData(playerEngine.current.frequencyStep)
        const amplitude: Array<number> = mergeFrequencyStep(playerEngine.current.frequencyStep, activeBarNumber)
        return amplitude
    }, [])

    return {
        connect,
        disconnect,
        play,
        stop,
        getAmplitude,
    }
}
