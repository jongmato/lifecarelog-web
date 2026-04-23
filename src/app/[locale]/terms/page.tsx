import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이용약관 — LifeCareLog',
  description: 'LifeCareLog 서비스 이용약관',
}

export default function TermsPage() {
  return (
    <main className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        이용약관
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        최종 업데이트: 2026년 4월 23일
      </p>

      <div className="prose-custom space-y-8 text-foreground/90 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제1조 (목적)</h2>
          <p>
            이 약관은 LifeCareLog(이하 &ldquo;회사&rdquo;)가 제공하는 서비스의 이용 조건 및 절차,
            회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 해요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제2조 (정의)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>&ldquo;서비스&rdquo;란 회사가 제공하는 AI 기반 문서 분석, 검색, 생산성 도구 및 관련 부가 서비스를 말해요.</li>
            <li>&ldquo;이용자&rdquo;란 이 약관에 따라 회사의 서비스를 이용하는 자를 말해요.</li>
            <li>&ldquo;유료 서비스&rdquo;란 구독, 크레딧 구매, 외주 개발 서비스 등 결제가 수반되는 서비스를 말해요.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제3조 (약관의 효력)</h2>
          <p>
            이 약관은 서비스 화면에 게시하거나 기타 방법으로 이용자에게 공지함으로써 효력이 발생해요.
            회사는 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위에서 약관을 변경할 수 있어요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제4조 (서비스 이용)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>서비스는 연중무휴 24시간 제공을 원칙으로 하되, 시스템 점검 등 필요한 경우 일시 중단할 수 있어요.</li>
            <li>이용자는 서비스를 업무 목적 또는 개인 목적으로 이용할 수 있어요.</li>
            <li>이용자는 서비스를 이용하여 불법 행위를 해서는 안 돼요.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제5조 (결제 및 환불)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>유료 서비스의 결제는 Paddle(결제 대행사)을 통해 처리돼요.</li>
            <li>구독 서비스는 매월 자동 갱신되며, 해지 시 현재 결제 기간이 끝날 때까지 서비스를 이용할 수 있어요.</li>
            <li>크레딧은 구매 후 사용하지 않은 경우, 구매일로부터 7일 이내 환불 요청이 가능해요.</li>
            <li>외주 개발 서비스는 착수 전 100% 환불, 착수 후에는 진행 비율에 따라 부분 환불이 가능해요.</li>
            <li>환불은 원래 결제 수단으로 처리되며, 처리까지 영업일 기준 5~10일이 소요될 수 있어요.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제6조 (면책)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>AI가 제공하는 분석 결과는 참고 목적이며, 전문적인 조언을 대체하지 않아요.</li>
            <li>천재지변, 서비스 장애 등 불가항력에 의한 서비스 중단에 대해 회사는 책임을 지지 않아요.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제7조 (분쟁 해결)</h2>
          <p>
            서비스 이용과 관련하여 분쟁이 발생한 경우, 회사와 이용자는 성실히 협의하여 해결해요.
            협의가 이루어지지 않는 경우 관할 법원에 소를 제기할 수 있어요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제8조 (연락처)</h2>
          <p>
            서비스 관련 문의는 아래로 연락해 주세요.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>이메일: lifecarelog.official@gmail.com</li>
            <li>웹사이트: lifecarelog.co.kr</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
