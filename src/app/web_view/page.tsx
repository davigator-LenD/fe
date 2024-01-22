export default function WebViewPage() {
    return (
        <div className="size-full">
            <iframe
                src={`https://www.gov.kr/yearend_main.html`}
                //         //src={`https://www.youtube.com/embed/${videoId}`}
                //         //src={`https://shopping.naver.com/`}
                //         //쿠팡 & 국민은행 & 정부24 & 정부정책 &
                //         src="https://www.google.com/webhp?igu=1"
                height="100%"
                allowFullScreen
            />
        </div>
    )
}
