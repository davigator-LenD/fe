import { t } from '@metal-box/type'
import { v } from '@/helpers/validator'

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
export const mergeFrequencyStep = (frequencyStep: Uint8Array, activeBarNumber: number): Array<number> => {
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

export const decibel = t.number.validate(v.min(-100), v.max(0))
export const smoothing = t.number.validate(v.min(0), v.max(1))

/**
 * @description audio analyzer option
 */
export interface AudioAnalyzerOption {
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
