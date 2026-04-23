import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보 처리방침 — LifeCareLog',
  description: 'LifeCareLog 개인정보 처리방침',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        개인정보 처리방침
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        최종 업데이트: 2026년 4월 23일
      </p>

      <div className="prose-custom space-y-8 text-foreground/90 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">1. 수집하는 개인정보</h2>
          <p>회사는 서비스 제공을 위해 다음 정보를 수집해요.</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li><strong>필수 정보:</strong> 이메일 주소, 비밀번호(암호화 저장)</li>
            <li><strong>자동 수집:</strong> 접속 로그, 쿠키, 서비스 이용 기록</li>
            <li><strong>결제 시:</strong> 결제 정보는 Paddle(결제 대행사)이 직접 처리하며, 회사는 카드번호 등 민감한 결제 정보를 저장하지 않아요.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">2. 개인정보 이용 목적</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>서비스 제공 및 계정 관리</li>
            <li>결제 처리 및 환불</li>
            <li>서비스 개선 및 통계 분석 (비식별 처리)</li>
            <li>고객 문의 대응</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">3. 개인정보 보유 기간</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>회원 탈퇴 시 즉시 삭제해요.</li>
            <li>관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관해요.</li>
            <li>전자상거래 거래 기록: 5년</li>
            <li>접속 로그: 3개월</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">4. 개인정보 제3자 제공</h2>
          <p>
            회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않아요.
            다만, 다음의 경우에는 예외로 해요.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>법령에 의한 요청이 있는 경우</li>
            <li>결제 처리를 위해 Paddle에 필요 최소한의 정보를 전달하는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">5. 개인정보 보호 조치</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>비밀번호는 단방향 암호화하여 저장해요.</li>
            <li>모든 데이터 전송은 SSL/TLS로 암호화돼요.</li>
            <li>접근 권한을 최소화하고 정기적으로 보안 점검을 실시해요.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">6. 이용자의 권리</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>언제든지 개인정보 열람, 수정, 삭제를 요청할 수 있어요.</li>
            <li>회원 탈퇴를 통해 개인정보 삭제를 요청할 수 있어요.</li>
            <li>마케팅 수신 동의는 언제든 철회할 수 있어요.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">7. 쿠키 사용</h2>
          <p>
            서비스 이용 편의를 위해 쿠키를 사용해요.
            브라우저 설정에서 쿠키를 차단할 수 있으나, 일부 서비스 이용에 제한이 있을 수 있어요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">8. 연락처</h2>
          <p>개인정보 관련 문의는 아래로 연락해 주세요.</p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>개인정보 보호 책임자: 원종현</li>
            <li>이메일: support@lifecarelog.co.kr</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
