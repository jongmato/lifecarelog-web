import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '이용약관 — LifeCareLog',
  description: 'LifeCareLog 서비스 이용약관',
}

export default function TermsPage() {
  const effectiveDate = '2026년 5월 14일'

  return (
    <main className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* 본 초안은 2025.4.21 개인정보 처리방침 작성지침 및 공정거래위원회 전자상거래 표준약관 구조를 참고했으나, 개별 서비스 특성에 따른 법률 검토가 필요합니다. */}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        이용약관
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        시행일: {effectiveDate}
      </p>

      <div className="prose-custom space-y-8 text-foreground/90 text-[15px] leading-relaxed">
        <section className="rounded-lg border bg-muted/30 p-4">
          <h2 className="text-base font-semibold text-foreground mb-2">서비스 범위 안내</h2>
          <p className="text-sm text-muted-foreground">
            LifeCareLog는 개인이 직접 겪은 문제를 바탕으로 만든 웹 서비스와 제작 포트폴리오를 소개하는 브랜드 사이트입니다.
            Plan-L은 공개 법령·판례 검색과 정리를 돕는 도구이며, 법률 자문·상담·대리·법률문서 작성·변호사 알선·사건 수임을 제공하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제1조 (목적)</h2>
          <p>
            이 약관은 lifecarelog(이하 &ldquo;운영자&rdquo;)가 lifecarelog.co.kr 및 연결 서비스에서 제공하는
            웹 서비스, 정보 제공, 포트폴리오, 문의 기능의 이용 조건과 운영자·이용자의 권리와 의무를 정합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제2조 (정의)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>&ldquo;서비스&rdquo;란 운영자가 제공하는 웹사이트, 제품 소개, 연결 서비스, 문의 및 제작 상담 기능을 말합니다.</li>
            <li>&ldquo;이용자&rdquo;란 이 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
            <li>&ldquo;연결 서비스&rdquo;란 Plan-C, Plan-L, Plan-T 등 LifeCareLog가 소개하거나 운영하는 별도 서비스를 말합니다.</li>
            <li>&ldquo;제작 서비스&rdquo;란 운영자와 별도 합의 또는 계약에 따라 제공되는 웹 개발, 유지보수, 기술 자문 업무를 말합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제3조 (약관의 명시와 변경)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>운영자는 이용자가 쉽게 확인할 수 있도록 본 약관을 서비스 화면에 게시합니다.</li>
            <li>운영자는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.</li>
            <li>약관 변경 시 적용일자와 변경 사유를 7일 전부터 공지합니다. 이용자에게 불리한 변경은 30일 전부터 공지합니다.</li>
            <li>이용자는 변경 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제4조 (서비스 제공)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>LifeCareLog 브랜드, 운영자 소개, 서비스 로드맵 및 포트폴리오 정보 제공</li>
            <li>Plan-C, Plan-L, Plan-T 등 연결 서비스로 이동하는 링크 제공</li>
            <li>제작 문의, 협업 문의, 유지보수 상담 접수</li>
            <li>운영자가 직접 만든 서비스의 업데이트, 공지 및 고객 지원</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제5조 (연결 서비스의 별도 약관)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>연결 서비스에는 각 서비스의 성격에 맞는 별도 이용약관과 개인정보처리방침이 적용될 수 있습니다.</li>
            <li>Plan-L은 현재 무료 사용 및 유료 기능 관심 등록 단계이며, 서비스 내 결제·구독·크레딧 구매 기능을 제공하지 않습니다.</li>
            <li>Plan-L의 유료 기능이 도입되는 경우 해당 서비스 화면에서 요금, 결제, 청약철회 및 환불 기준을 별도로 고지하고 필요한 동의를 받습니다.</li>
            <li>연결 서비스의 결과나 정보는 각 서비스의 고지와 제한 범위에 따라 이용해야 합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제6조 (제작 서비스와 비용)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>웹 개발, 유지보수, 기술 자문 등 제작 서비스는 별도 견적, 계약서, 세금계산서 또는 합의서에 따릅니다.</li>
            <li>문의 접수나 외부 예약은 상담 일정 조율일 뿐이며, 제작 계약 체결이나 결제 의무를 의미하지 않습니다.</li>
            <li>제작 서비스의 범위, 일정, 비용, 검수, 수정 횟수, 해지 및 환불 조건은 개별 계약에서 정합니다.</li>
            <li>사이트에 표시된 제작 관련 예시는 일반 안내이며, 확정 견적이나 자동 결제 청약이 아닙니다.</li>
            <li>LifeCareLog 웹사이트 자체는 현재 일반 이용자를 대상으로 자동 구독 결제나 크레딧 구매를 제공하지 않습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제7조 (이용자의 의무)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>이용자는 관련 법령, 본 약관, 서비스 안내사항을 준수해야 합니다.</li>
            <li>타인의 개인정보, 영업비밀, 저작권 침해 자료를 무단으로 입력하거나 전송해서는 안 됩니다.</li>
            <li>서비스를 자동화 호출, 스크래핑, 역공학, 보안 우회, 과도한 트래픽 발생 목적으로 이용해서는 안 됩니다.</li>
            <li>문의 기능을 스팸, 광고, 불법 행위, 권리 침해 목적으로 사용해서는 안 됩니다.</li>
            <li>운영자는 약관 위반 또는 보안 위험이 확인된 이용을 제한할 수 있으며, 가능한 범위에서 사유와 해제 또는 이의제기 방법을 안내합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제8조 (AI 및 정보 제공 관련 면책)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>서비스에서 제공하는 AI 요약, 계산 결과, 검색 결과, 글은 참고용 정보입니다.</li>
            <li>Plan-L은 공개 법령·판례 검색을 돕는 도구이며 법률 자문, 상담, 대리, 법률문서 작성, 변호사 알선, 사건 수임을 제공하지 않습니다.</li>
            <li>Plan-T 등 마음 기록 관련 서비스는 의료 행위, 진단, 치료, 상담을 제공하지 않습니다.</li>
            <li>중요한 결정 전에는 원문 자료를 확인하고 필요한 경우 자격 있는 전문가와 상담해야 합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제9조 (저작권)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>운영자가 작성한 사이트 콘텐츠, 코드, 화면 구성, 문구의 권리는 운영자에게 있습니다.</li>
            <li>이용자가 문의 또는 연결 서비스에 입력한 자료의 권리는 이용자 또는 정당한 권리자에게 있습니다.</li>
            <li>이용자는 운영자의 사전 동의 없이 사이트 콘텐츠를 영리 목적으로 복제, 배포, 전송할 수 없습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제10조 (서비스 중단 및 변경)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>운영자는 시스템 점검, 장애, 보안 대응, 외부 서비스 장애 등 필요한 경우 서비스를 일시 중단할 수 있습니다.</li>
            <li>운영자는 서비스 구성, 연결 링크, 소개 내용, 기능을 변경할 수 있으며 중요한 변경은 가능한 범위에서 공지합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제11조 (책임 제한)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>운영자는 천재지변, 통신 장애, 외부 API 장애, 이용자 귀책 사유 등 통제하기 어려운 사유로 인한 손해에 책임을 지지 않습니다.</li>
            <li>이용자가 입력한 정보의 부정확성, 원문 미확인, 약관 위반, 계정 관리 소홀로 발생한 손해는 이용자가 부담합니다.</li>
            <li>운영자의 책임이 인정되는 경우에도 관련 법령이 허용하는 범위에서 직접적이고 통상적인 손해로 제한됩니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제12조 (분쟁 해결)</h2>
          <p>
            서비스 이용과 관련하여 분쟁이 발생한 경우 운영자와 이용자는 성실히 협의하여 해결합니다.
            협의가 어려운 경우 대한민국 법을 준거법으로 하며, 관할 법원은 관련 법령에 따릅니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제13조 (연락처)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>운영자: lifecarelog</li>
            <li>대표: 원종현</li>
            <li>이메일: support@lifecarelog.co.kr</li>
            <li>웹사이트: lifecarelog.co.kr</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
