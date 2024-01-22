import { Toggle } from '@/lib/common'
import { Text } from '@/lib/common/heading'
import { AudioVisualizerExample } from './_components/ex_audio'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-8">
            <Text>
                <Text.Heading>Assistance</Text.Heading>
                <Text.SubHeading>접속하고자 하는 사이트</Text.SubHeading>
            </Text>

            <AudioVisualizerExample />

            <Toggle />
        </main>
    )
}
