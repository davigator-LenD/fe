import { Toggle } from '@/lib/common'
import { AudioVisualizerExample } from './_components/ex_audio'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <AudioVisualizerExample />

            <Toggle />
        </main>
    )
}
