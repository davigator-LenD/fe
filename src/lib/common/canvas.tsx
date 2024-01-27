import { useEffect, useRef, useState } from 'react'

interface UseCanvasProps {
    width: number
    height: number
    /**
     * @description draw frames using `requestAnimationFrame`
     * @param context pencil
     */
    draw: (context: CanvasRenderingContext2D) => void
}
export const useCanvas = ({ draw, height, width }: UseCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false)

    useEffect(() => {
        const context = canvasRef.current?.getContext('2d')
        if (!context) return

        let animationFrameId: number
        const renderFrame = () => {
            draw(context)
            animationFrameId = window.requestAnimationFrame(renderFrame)
        }
        renderFrame()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (!context || !canvas) return

        const setCanvas = (): void => {
            const devicePixelRatio = window.devicePixelRatio || 1
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            canvas.width = width * devicePixelRatio
            canvas.height = height * devicePixelRatio
            context.scale(devicePixelRatio, devicePixelRatio)
        }

        setCanvas()
        setIsCanvasReady(true)
    }, [width, height])

    return { canvasRef, isCanvasReady }
}

interface CanvasProps extends UseCanvasProps {}
export const Canvas = ({ width, height, draw }: CanvasProps) => {
    const { canvasRef, isCanvasReady } = useCanvas({
        width,
        height,
        draw,
    })

    return (
        <div
            className="relative"
            style={{
                width,
                height,
            }}
        >
            <canvas
                ref={canvasRef}
                className={`${isCanvasReady ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} absolute inset-0 origin-center bg-transparent transition-all duration-700`}
            />
            {isCanvasReady === false && <CanvasLoader />}
        </div>
    )
}

const CanvasLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center gap-1 bg-transparent">
        <div className="size-2.5 animate-[pulse_0.3s_infinite_0ms] select-none rounded-full bg-primary-logo"></div>
        <div className="size-2.5 animate-[pulse_0.3s_infinite_100ms] select-none rounded-full bg-primary-logo"></div>
        <div className="size-2.5 animate-[pulse_0.3s_infinite_200ms] select-none rounded-full bg-primary-logo"></div>
        <div className="size-2.5 animate-[pulse_0.3s_infinite_300ms] select-none rounded-full bg-primary-logo"></div>
    </div>
)
