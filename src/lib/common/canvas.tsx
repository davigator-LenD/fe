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
const useCanvas = ({ draw, height, width }: UseCanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isCanvasReady, setIsCanvasReady] = useState<boolean>(false)

    useEffect(() => {
        if (!canvasRef.current) return
        setIsCanvasReady(true)
    }, [])

    useEffect(() => {
        if (!isCanvasReady) return

        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (!context || !canvas) return

        const setCanvas = () => {
            const devicePixelRatio = window.devicePixelRatio || 1
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            canvas.width = width * devicePixelRatio
            canvas.height = height * devicePixelRatio
            context.scale(devicePixelRatio, devicePixelRatio)
        }

        setCanvas()

        let animationFrameId: number
        const renderFrame = () => {
            draw(context)
            animationFrameId = window.requestAnimationFrame(renderFrame)
        }
        renderFrame()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCanvasReady])

    return { canvasRef, isCanvasReady }
}

interface CanvasProps extends UseCanvasProps {}
export const Canvas = ({ width, height, draw }: CanvasProps) => {
    const { canvasRef } = useCanvas({
        width,
        height,
        draw,
    })

    return <canvas ref={canvasRef} className="bg-transparent" />
}
