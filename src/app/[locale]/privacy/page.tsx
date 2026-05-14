import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '개인정보 처리방침 — LifeCareLog',
  description: 'LifeCareLog 개인정보 처리방침',
}

export default function PrivacyPage() {
  const effectiveDate = '2026년 5월 14일'

  return (
    <main className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 sm:py-24">
      {/* 본 초안은 2025.4.21 개인정보 처리방침 작성지침 및 2026.3.10 공포 개정 개인정보보호법을 반영하였으나, 개별 서비스 특성에 따른 법률 검토가 필요합니다. */}
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        개인정보 처리방침
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        시행일: {effectiveDate}
      </p>

      <div className="prose-custom space-y-8 text-foreground/90 text-[15px] leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제1조 (개인정보처리방침의 목적)</h2>
          <p>
            lifecarelog(이하 &ldquo;운영자&rdquo;)는 LifeCareLog 웹사이트 및 연결 서비스(이하 &ldquo;서비스&rdquo;)를
            제공하면서 개인정보보호법 제30조에 따라 이용자의 개인정보를 보호하고 개인정보 관련 고충을 처리하기 위해
            본 방침을 공개합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제2조 (개인정보 처리 목적)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>서비스 제공: 웹사이트 표시, 연결 서비스 안내, 문의 접수, 제작 상담</li>
            <li>회원 서비스 제공: 연결 서비스의 계정 생성, 로그인 유지, 이용 이력 제공</li>
            <li>고객 지원: 문의 답변, 오류 신고 처리, 권리 행사 요청 처리</li>
            <li>보안 및 안정성 확보: 비정상 이용 탐지, 접속 제한, 오류 분석, 장애 대응</li>
            <li>서비스 개선: 비식별 통계 분석, 콘텐츠와 기능 개선</li>
            <li>제작 서비스 계약 이행: 별도 계약이 체결된 경우 견적, 일정 관리, 세금계산서 발행, 대금 정산</li>
          </ul>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border bg-muted">
                  <th className="border px-3 py-2 text-left">서비스 구분</th>
                  <th className="border px-3 py-2 text-left">처리 목적</th>
                  <th className="border px-3 py-2 text-left">주요 항목</th>
                  <th className="border px-3 py-2 text-left">처리 근거</th>
                  <th className="border px-3 py-2 text-left">필수·선택</th>
                  <th className="border px-3 py-2 text-left">보유 기간</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border px-3 py-2">브랜드 사이트</td>
                  <td className="border px-3 py-2">웹사이트 표시, 보안, 문의 접수</td>
                  <td className="border px-3 py-2">접속 기록, 문의자 이름, 이메일, 문의 내용</td>
                  <td className="border px-3 py-2">이용자 요청 처리, 서비스 안정성 확보를 위한 정당한 이익</td>
                  <td className="border px-3 py-2">필수</td>
                  <td className="border px-3 py-2">문의 처리 후 1년, 접속 로그 3개월</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">연결 서비스</td>
                  <td className="border px-3 py-2">계정 관리, 서비스 제공, 이용 이력 제공</td>
                  <td className="border px-3 py-2">이메일, 이름 또는 닉네임, 서비스 이용 기록</td>
                  <td className="border px-3 py-2">서비스 이용계약 이행</td>
                  <td className="border px-3 py-2">필수</td>
                  <td className="border px-3 py-2">회원 탈퇴 또는 서비스 종료 시까지</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Plan-L</td>
                  <td className="border px-3 py-2">법령·판례 검색, 텍스트 추출, AI 요약 보조</td>
                  <td className="border px-3 py-2">검색 문구, 업로드 파일, 추출 텍스트, 검색 결과</td>
                  <td className="border px-3 py-2">이용자 요청에 따른 서비스 제공</td>
                  <td className="border px-3 py-2">필수</td>
                  <td className="border px-3 py-2">업로드 원본은 처리 후 즉시 삭제, 검색 결과는 7일 또는 직접 삭제 시까지</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">예약·제작 상담</td>
                  <td className="border px-3 py-2">일정 예약, 견적, 계약, 정산</td>
                  <td className="border px-3 py-2">이름, 이메일, 회사명, 계약·정산 정보</td>
                  <td className="border px-3 py-2">계약 체결 전 요청 처리, 계약 이행, 법령상 의무</td>
                  <td className="border px-3 py-2">필수</td>
                  <td className="border px-3 py-2">상담 종료 후 1년 또는 법령상 보존 기간</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">이용 통계</td>
                  <td className="border px-3 py-2">비식별 통계 분석, 콘텐츠와 기능 개선</td>
                  <td className="border px-3 py-2">접속 기록, 페이지 이용 패턴</td>
                  <td className="border px-3 py-2">이용자 선택 동의</td>
                  <td className="border px-3 py-2">선택</td>
                  <td className="border px-3 py-2">동의 철회 또는 분석 도구 보관 기간까지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제3조 (처리하는 개인정보 항목)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border bg-muted">
                  <th className="border px-3 py-2 text-left">구분</th>
                  <th className="border px-3 py-2 text-left">항목</th>
                  <th className="border px-3 py-2 text-left">수집 방법</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border px-3 py-2">문의</td>
                  <td className="border px-3 py-2">이름 또는 닉네임, 이메일 주소, 문의 내용, Turnstile 검증 토큰</td>
                  <td className="border px-3 py-2">문의 폼 또는 이메일</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">회원 서비스</td>
                  <td className="border px-3 py-2">이메일 주소, 이름 또는 닉네임, 서비스 이용 기록</td>
                  <td className="border px-3 py-2">연결 서비스 가입 및 이용</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Plan-L 이용</td>
                  <td className="border px-3 py-2">검색 문구, 업로드 파일, 추출 텍스트, 검색 결과, 관심 등록 일시</td>
                  <td className="border px-3 py-2">Plan-L 검색 요청 및 관심 등록</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">제작 서비스 계약</td>
                  <td className="border px-3 py-2">담당자명, 연락처, 이메일, 회사명, 견적·계약·정산에 필요한 정보</td>
                  <td className="border px-3 py-2">상담, 계약, 세금계산서 발행 과정</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">외부 예약</td>
                  <td className="border px-3 py-2">예약자가 Cal.com에 직접 입력하는 이름, 이메일, 예약 내용</td>
                  <td className="border px-3 py-2">Cal.com 외부 예약 페이지</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">자동 수집</td>
                  <td className="border px-3 py-2">IP 주소, 브라우저·기기 정보, 접속 일시, 쿠키, 로컬스토리지, 이용 기록</td>
                  <td className="border px-3 py-2">서비스 접속 및 이용 과정</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            LifeCareLog 웹사이트와 Plan-L은 현재 일반 이용자를 대상으로 카드번호 등 결제 수단 정보를 직접 수집하지 않습니다.
            제작 서비스 비용 처리는 별도 계약 및 정산 절차에 따릅니다.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            주민등록번호, 계좌번호, 건강정보 등 문의나 검색에 불필요한 민감정보는 입력하지 않는 것을 권장하며, Plan-L은 검색
            처리 전 가능한 범위에서 자동 마스킹을 적용합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제4조 (개인정보 처리 및 보유 기간)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border bg-muted">
                  <th className="border px-3 py-2 text-left">항목</th>
                  <th className="border px-3 py-2 text-left">보유 기간</th>
                  <th className="border px-3 py-2 text-left">근거</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border px-3 py-2">문의 정보</td>
                  <td className="border px-3 py-2">문의 처리 완료 후 1년</td>
                  <td className="border px-3 py-2">고객 지원 및 분쟁 대응</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">회원 정보</td>
                  <td className="border px-3 py-2">회원 탈퇴 또는 서비스 종료 후 지체 없이 삭제. 단, 분쟁 대응을 위해 30일간 보관 가능</td>
                  <td className="border px-3 py-2">서비스 제공 및 부정 이용 방지</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Plan-L 업로드 원본</td>
                  <td className="border px-3 py-2">텍스트 추출 처리 후 즉시 삭제</td>
                  <td className="border px-3 py-2">개인정보 최소 처리 원칙</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Plan-L 검색 결과</td>
                  <td className="border px-3 py-2">무료 계정 기준 7일 또는 이용자가 직접 삭제할 때까지</td>
                  <td className="border px-3 py-2">검색 이력 제공</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">제작 서비스 계약·정산 자료</td>
                  <td className="border px-3 py-2">계약 종료 후 관련 법령상 보존 기간</td>
                  <td className="border px-3 py-2">전자상거래법, 국세기본법 등</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">접속 로그</td>
                  <td className="border px-3 py-2">3개월</td>
                  <td className="border px-3 py-2">통신비밀보호법</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            운영자는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행 목적 외 처리 금지, 기술적·관리적
            보호조치, 재위탁 제한, 수탁자 관리·감독, 손해배상 책임에 관한 사항을 문서로 정하고 수탁자가 개인정보를 안전하게
            처리하는지 점검합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제5조 (개인정보 제3자 제공)</h2>
          <p>
            운영자는 이용자의 개인정보를 처리 목적 범위 내에서만 처리하며, 이용자의 사전 동의가 있거나 법령에 근거가 있는
            경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제6조 (개인정보 처리위탁)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border bg-muted">
                  <th className="border px-3 py-2 text-left">수탁자</th>
                  <th className="border px-3 py-2 text-left">위탁 업무</th>
                  <th className="border px-3 py-2 text-left">처리 항목</th>
                  <th className="border px-3 py-2 text-left">보유·이용 기간</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border px-3 py-2">Supabase, Inc.</td>
                  <td className="border px-3 py-2">인증 및 데이터베이스 호스팅</td>
                  <td className="border px-3 py-2">회원 정보, 이용 기록, 서비스 데이터</td>
                  <td className="border px-3 py-2">서비스 이용 기간</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Cloudflare, Inc.</td>
                  <td className="border px-3 py-2">콘텐츠 전송, 보안, 캐싱, Turnstile 봇 방지</td>
                  <td className="border px-3 py-2">접속 기록, IP 주소, 기기 정보, Turnstile 검증 토큰</td>
                  <td className="border px-3 py-2">서비스 처리 기간</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Resend, Inc.</td>
                  <td className="border px-3 py-2">문의 내용 이메일 발송</td>
                  <td className="border px-3 py-2">이름, 이메일 주소, 문의 내용</td>
                  <td className="border px-3 py-2">메일 발송 및 운영 로그 보관 기간</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Cal.com, Inc.</td>
                  <td className="border px-3 py-2">외부 일정 예약 페이지 제공</td>
                  <td className="border px-3 py-2">예약자가 Cal.com에 직접 입력한 정보</td>
                  <td className="border px-3 py-2">Cal.com 정책에 따름</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Google LLC</td>
                  <td className="border px-3 py-2">분석 도구, 이미지/PDF 텍스트 추출, AI 처리</td>
                  <td className="border px-3 py-2">접속 통계, 업로드 파일, 추출 텍스트</td>
                  <td className="border px-3 py-2">처리 후 즉시 삭제 또는 공급자 정책에 따른 기간</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">OpenAI, Inc.</td>
                  <td className="border px-3 py-2">AI 요약 보조 처리</td>
                  <td className="border px-3 py-2">마스킹된 텍스트</td>
                  <td className="border px-3 py-2">처리 후 즉시 삭제 또는 공급자 정책에 따른 기간</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Functional Software, Inc. (Sentry)</td>
                  <td className="border px-3 py-2">오류 모니터링</td>
                  <td className="border px-3 py-2">오류 로그, 기기 정보</td>
                  <td className="border px-3 py-2">90일</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제7조 (개인정보의 국외 이전)</h2>
          <p>
            문의 접수, 예약 연결, 호스팅, 보안, 오류 모니터링, AI 처리 과정에서 일부 수탁자에게 개인정보가 국외 이전될 수
            있습니다. 필수 이전을 거부하는 경우 문의, 예약, 연결 서비스 이용이 제한될 수 있으며, 통계 분석 목적 이전은 서비스
            하단 동의 배너에서 거부하거나 철회할 수 있습니다.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="border bg-muted">
                  <th className="border px-3 py-2 text-left">수탁자</th>
                  <th className="border px-3 py-2 text-left">국가</th>
                  <th className="border px-3 py-2 text-left">이전 항목</th>
                  <th className="border px-3 py-2 text-left">시점·방법</th>
                  <th className="border px-3 py-2 text-left">목적·기간</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr>
                  <td className="border px-3 py-2">Cloudflare, Resend, Cal.com</td>
                  <td className="border px-3 py-2">미국 등 서비스 제공 국가</td>
                  <td className="border px-3 py-2">접속 기록, 문의 정보, 예약 정보, 검증 토큰</td>
                  <td className="border px-3 py-2">접속, 문의 접수, 예약 연결 시 암호화된 네트워크 통신</td>
                  <td className="border px-3 py-2">보안, 메일 발송, 예약 연결. 처리 기간 또는 각 정책상 기간</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Supabase, Google LLC, OpenAI, Inc.</td>
                  <td className="border px-3 py-2">미국 등 서비스 제공 국가</td>
                  <td className="border px-3 py-2">회원 정보, 서비스 처리 데이터, 업로드 파일, 마스킹된 텍스트</td>
                  <td className="border px-3 py-2">연결 서비스 이용 또는 AI 처리 요청 시 암호화된 네트워크 통신</td>
                  <td className="border px-3 py-2">인증, 데이터베이스, 텍스트 추출, AI 요약 보조. 처리 후 삭제 또는 공급자 정책상 기간</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Google Analytics, Sentry</td>
                  <td className="border px-3 py-2">미국 등 서비스 제공 국가</td>
                  <td className="border px-3 py-2">접속 기록, 이용 패턴, 오류 로그, 기기 정보</td>
                  <td className="border px-3 py-2">동의 후 접속 또는 오류 발생 시 암호화된 네트워크 통신</td>
                  <td className="border px-3 py-2">이용 통계, 오류 모니터링. 동의 철회 또는 각 정책상 기간까지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제8조 (쿠키 및 행태정보)</h2>
          <p>
            운영자는 로그인 유지, 보안, 서비스 이용 통계 분석을 위해 쿠키와 로컬스토리지를 사용할 수 있습니다. 현재 맞춤형
            광고 목적의 행태정보 처리는 하지 않습니다.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 mt-2">
            <li>필수 저장소: 보안, 언어 설정, 문의 보호, 연결 서비스 로그인 유지에 필요한 범위에서 사용합니다.</li>
            <li>분석 저장소: Google Analytics는 이용자가 &ldquo;분석 허용&rdquo;을 선택한 뒤에만 로드됩니다.</li>
            <li>동의 철회: 브라우저의 로컬스토리지에서 lifecarelog-analytics-consent 값을 삭제하거나 쿠키/사이트 데이터를 초기화하면 다시 선택할 수 있습니다.</li>
            <li>브라우저 설정: Chrome, Safari, Edge의 개인정보 및 보안 설정에서 쿠키를 차단하거나 삭제할 수 있습니다.</li>
            <li>쿠키를 차단하면 로그인 유지 등 일부 기능이 제한될 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제9조 (개인정보 파기)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>보유 기간이 지나거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다.</li>
            <li>전자 파일은 복구하기 어려운 방식으로 삭제하고, 출력물은 분쇄 또는 소각합니다.</li>
            <li>법령상 보관이 필요한 정보는 별도 저장 공간에 분리 보관한 뒤 기간 종료 시 파기합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제10조 (이용자의 권리와 행사 방법)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>이용자는 개인정보 열람, 정정, 삭제, 처리정지, 동의 철회, 전송요구를 요청할 수 있습니다.</li>
            <li>권리 행사는 support@lifecarelog.co.kr 또는 연결 서비스의 계정 관리 기능을 통해 할 수 있습니다.</li>
            <li>운영자는 계정 이메일, 문의 이력, 필요한 경우 추가 확인 절차로 본인 여부를 확인한 뒤 관련 법령에서 정한 기한 안에 처리합니다.</li>
            <li>법령상 예외 사유가 있는 경우 요청의 전부 또는 일부가 제한될 수 있으며, 제한 사유와 이의제기 방법을 안내합니다.</li>
            <li>14세 미만 아동의 개인정보가 확인될 경우 지체 없이 삭제하며, 법정대리인은 아동의 개인정보 권리를 행사할 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제11조 (개인정보 전송요구권)</h2>
          <p>
            이용자는 관련 법령에서 정한 요건을 충족하는 경우 본인의 개인정보를 본인 또는 다른 개인정보처리자에게 전송해
            달라고 요구할 수 있습니다. 요청은 support@lifecarelog.co.kr로 접수할 수 있으며, 운영자는 본인 확인과 전송 가능
            범위 확인 후 관련 법령에 따라 처리합니다. 현재 별도 자동 내보내기 화면은 제공하지 않으며, 요청 접수 후 문의 정보,
            연결 서비스 계정 정보, Plan-L 검색 이력 등 전송 가능 항목과 제공 형식을 개별 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제12조 (자동화된 결정 및 AI 처리 안내)</h2>
          <p>
            서비스의 AI 요약, 계산 또는 정리 기능은 이용자의 권리 또는 의무에 중대한 영향을 미치는 자동화된 결정을 하기
            위한 것이 아닙니다. Plan-L 등 연결 서비스에서 AI를 사용하는 경우 입력 문구, 업로드 파일에서 추출한 텍스트,
            공개 자료 검색 결과를 바탕으로 보조 요약을 생성합니다. 업로드 원본은 처리 후 삭제하며, 외부 AI 제공자의
            보관·학습 사용 여부는 적용 중인 API 설정과 공급자 정책을 따릅니다. 이용자는 AI 처리 설명, 오류 신고, 재검토
            요청을 support@lifecarelog.co.kr로 접수할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제13조 (안전성 확보 조치)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>전송 구간 암호화 및 접근 권한 최소화</li>
            <li>인증 정보 보호 및 데이터베이스 접근 통제</li>
            <li>오류 로그와 접속 기록 모니터링</li>
            <li>민감정보 최소 수집 및 필요한 경우 마스킹 처리</li>
            <li>개인정보 처리 시스템 접근 권한 관리</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제14조 (개인정보 보호책임자 및 열람청구 접수처)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>개인정보 보호책임자: 원종현</li>
            <li>직책: 대표</li>
            <li>이메일: support@lifecarelog.co.kr</li>
            <li>열람청구 및 고충처리 접수처: support@lifecarelog.co.kr</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제15조 (권익침해 구제 방법)</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>개인정보 침해신고센터: privacy.kisa.or.kr / 국번 없이 118</li>
            <li>개인정보 분쟁조정위원회: www.kopico.go.kr / 1833-6972</li>
            <li>대검찰청: www.spo.go.kr / 국번 없이 1301</li>
            <li>경찰청: ecrm.police.go.kr / 국번 없이 182</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-3">제16조 (처리방침 변경)</h2>
          <p>
            본 개인정보처리방침은 {effectiveDate}부터 적용됩니다. 운영자는 처리방침을 변경하는 경우 서비스 화면을 통해
            변경 내용과 시행일을 공지합니다.
          </p>
        </section>
      </div>
    </main>
  )
}
