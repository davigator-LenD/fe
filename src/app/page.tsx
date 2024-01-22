import { useState } from 'react'
import { QuestionTextField } from '@/lib/common'
import { AudioVisualizerExample } from './_components/ex_audio'

export default function Home() {
    return (
        <main>
            <AudioVisualizerExample />
            {/* <QuestionTextField />  */}
        </main>
    )
}
