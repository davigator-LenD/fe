import { Canvas } from '../canvas'
import { type AudioVisualizerHook } from '.'

interface DrawAudioVisualizerProps {
    width: number
    height: number
    /**
     * @description visible bar number = number of bars
     */
    visibleBarNumber: number
    /**
     * @description bar style
     */
    style: {
        /**
         * @description bar background color
         */
        backgroundColor: string
        /**
         * @description bar gap
         */
        gap: number
        /**
         * @description bar radius
         */
        radius?: number
        /**
         * @description bar alignment
         */
        alignment?: 'top' | 'center' | 'bottom'
        /**
         * @description minimum bar height
         */
        minHeight?: number
        /**
         * @description default bar height, if it is bigger -> visualizer will be more dynamically moved
         */
        defaultBarHeight?: number
    }
    ctx: CanvasRenderingContext2D
    /**
     * @description render target amplitude list
     */
    amplitude: number[]
}
const drawAudioVisualizer = ({
    ctx,
    width,
    height,
    amplitude,
    visibleBarNumber,
    style: { backgroundColor, gap, alignment, radius, minHeight, defaultBarHeight: defaultH },
}: DrawAudioVisualizerProps) => {
    ctx.clearRect(0, 0, width, height) // clear previous frame

    const barWidth = (width - gap * (visibleBarNumber - 1)) / visibleBarNumber
    const maxBarHeight = height
    const defaultBarHeight = defaultH ?? 50
    const maxAmplitude = 250 as const
    const barRadius = radius ?? (barWidth + 2.5) / 2

    for (let i = 0; i < visibleBarNumber; i++) {
        const scale = (amplitude[i]! / maxAmplitude) * (i + 1)
        const barHeight = defaultBarHeight * scale + (minHeight ?? barWidth)
        const finalBarHeight = barHeight > maxBarHeight ? maxBarHeight : barHeight
        const x = i * (barWidth + gap)
        let y
        switch (alignment) {
            case 'top':
                y = 0
                break
            case 'center':
                y = (height - finalBarHeight) / 2
                break
            case 'bottom':
            default:
                y = height - finalBarHeight
                break
        }

        roundRect(ctx, x, y, { width: barWidth, height: finalBarHeight, radius: barRadius, color: backgroundColor })
    }
}

/**
 * @description draw rounded rectangle from bottom left corner -> clockwise
 */
const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    style: { width: number; height: number; radius: number; color: string }
) => {
    ctx.beginPath()

    const { width, height, color, radius } = style

    ctx.moveTo(x + radius, y)

    ctx.lineTo(x + width - radius, y) // bottom center
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius) // bottom right corner

    ctx.lineTo(x + width, y + height - radius) // right center
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height) // top right corner

    ctx.lineTo(x + radius, y + height) // top center
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius) // top left corner

    ctx.lineTo(x, y + radius) // left center
    ctx.quadraticCurveTo(x, y, x + radius, y) // bottom left corner

    ctx.closePath()

    ctx.fillStyle = color
    ctx.fill()
}

interface AudioVisualizerProps extends Pick<DrawAudioVisualizerProps, 'style' | 'visibleBarNumber'> {
    /**
     * @description canvas render size, square
     */
    size: number
    /**
     * @see {@link AudioVisualizerHook}
     */
    getAmplitude: AudioVisualizerHook['getAmplitude']
    /**
     * @default visibleBarNumber
     */
    amplitudeMergeStepNumber?: Parameters<AudioVisualizerHook['getAmplitude']>[0]
}
export const AudioVisualizer = ({
    size,
    style,
    getAmplitude,
    visibleBarNumber,
    amplitudeMergeStepNumber = visibleBarNumber,
}: AudioVisualizerProps) => {
    return (
        <Canvas
            width={size}
            height={size}
            draw={(ctx) => {
                const amplitude = getAmplitude(amplitudeMergeStepNumber)
                drawAudioVisualizer({
                    ctx,
                    amplitude,
                    visibleBarNumber,
                    width: size,
                    height: size,
                    style,
                })
            }}
        />
    )
}
