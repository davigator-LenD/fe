/* eslint-disable no-console */
export class StreamHandler {
    private static $instance: StreamHandler
    private constructor() {}
    public static create(): StreamHandler {
        return (StreamHandler.$instance ??= new StreamHandler())
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public transformNodeStreamToWebReadableStream(nodeStream: any) {
        const reader = nodeStream[Symbol.asyncIterator]()

        return new ReadableStream({
            async pull(controller) {
                const { value, done } = await reader.next()
                if (done) {
                    controller.close()
                } else {
                    controller.enqueue(value)
                }
            },
            cancel() {
                nodeStream.destroy()
            },
        })
    }

    private createBlobFromChunks(chunks: Uint8Array[]): Blob {
        return new Blob(chunks)
    }

    public async getBlobFromStream(stream: ReadableStream): Promise<Blob> {
        const transformedStream = stream

        const chunksMemory: Uint8Array[] = []

        const writableStream = new WritableStream({
            write(chunk) {
                chunksMemory.push(chunk)
            },
            close() {
                console.log('Stream successfully processed.')
            },
            abort(err) {
                console.error('Stream processing aborted:', err)
            },
        })

        console.log(transformedStream)

        await transformedStream.pipeTo(writableStream)

        return this.createBlobFromChunks(chunksMemory)
    }
}
