import { CompoundHeading, Heading, SubHeading } from '@/lib/common/heading'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-8">
            <CompoundHeading>
                <Heading>
                    Text <div>Assistance</div>
                </Heading>
                <SubHeading>접속하고 싶은 웹페이지를 입력하세요</SubHeading>
            </CompoundHeading>
        </main>
    )
}
