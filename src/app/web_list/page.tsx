import { Text } from '@/lib/common'
import { SvgBack } from '@/lib/icons'
import { SvgWebListVoice } from '@/lib/icons/weblist_voice'

export default function WebListPage() {
    return (
        <div className="flex size-full flex-col items-start justify-start">
            <div className="mt-8 flex w-full flex-row items-center justify-between">
                <SvgBack />
                <SvgWebListVoice />
            </div>
            <div className="mx-8 size-full ">
                <Text.Heading>웹 사이트</Text.Heading>
                <Text.SubHeading>어디 웹 사이트에 들어갈까요?</Text.SubHeading>
            </div>
        </div>
    )
}
