import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface LegalDocumentProps {
  /** Markdown 본문 */
  content: string
  /** 페이지 메인 타이틀 (markdown H1 대신 사용) */
  title: string
  /** 시행일 (예: '2026년 5월 14일') */
  effectiveDate: string
  /** 버전 (예: '1.0') */
  version: string
}

/**
 * Plan-T 약관/정책 본문 렌더러.
 *
 * @description
 * - Markdown 본문은 GFM 표 + heading 자동 렌더
 * - 본문 첫 줄 `# ...` H1과 frontmatter-like meta(`> **시행일**: ...`)는 제거하고
 *   페이지가 직접 타이틀/시행일/버전을 표시
 * - A11y: <main id="main-content"> + heading 계층 유지
 * - 표는 overflow wrapper로 모바일 대응
 */
export function LegalDocument({ content, title, effectiveDate, version }: LegalDocumentProps) {
  // 본문 첫 H1과 메타 인용블록(> ...) 제거 — 페이지 헤더에서 직접 표시
  const body = stripLeadingMetadata(content)

  return (
    <main id="main-content" className="mx-auto max-w-[760px] px-4 py-12 sm:px-6 sm:py-16">
      <header className="mb-10 border-b border-border pb-6">
        <p className="mb-2 text-xs font-medium tracking-wider text-muted-foreground">
          PLAN-T · LIFECARELOG
        </p>
        <h1 className="mb-3 text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground sm:flex sm:gap-6">
          <div className="flex gap-1.5">
            <dt className="font-medium text-foreground/70">시행일</dt>
            <dd>{effectiveDate}</dd>
          </div>
          <div className="flex gap-1.5">
            <dt className="font-medium text-foreground/70">버전</dt>
            <dd>{version}</dd>
          </div>
        </dl>
      </header>

      <article className="legal-prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h2 className="mb-3 mt-10 text-xl font-bold text-foreground">{children}</h2>
            ),
            h2: ({ children }) => (
              <h2 className="mb-3 mt-10 text-lg font-bold text-foreground">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-2 mt-6 text-base font-semibold text-foreground">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="mb-4 list-disc space-y-1.5 pl-5 text-foreground/90">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-foreground/90">{children}</ol>
            ),
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            hr: () => <hr className="my-8 border-border" />,
            blockquote: ({ children }) => (
              <blockquote className="mb-4 border-l-4 border-border bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <div className="mb-6 overflow-x-auto" tabIndex={0}>
                <table className="w-full border-collapse text-sm">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
            th: ({ children }) => (
              <th className="border border-border px-3 py-2 text-left text-xs font-semibold text-foreground">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-border px-3 py-2 align-top text-xs leading-relaxed text-muted-foreground">
                {children}
              </td>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-primary underline-offset-2 hover:underline"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">{children}</strong>
            ),
          }}>
          {body}
        </ReactMarkdown>
      </article>
    </main>
  )
}

/**
 * 본문 상단의 H1 + 메타데이터 인용블록을 제거.
 *
 * @example
 * 입력:
 *   # 플랜티 개인정보처리방침
 *
 *   > **시행일**: 2026년 5월 14일
 *   > **버전**: 1.0
 *
 *   본문 시작...
 *
 * 출력: "본문 시작..."
 */
function stripLeadingMetadata(content: string): string {
  const lines = content.split('\n')
  let i = 0
  // H1 제거
  while (i < lines.length && lines[i].trim() === '') i++
  if (i < lines.length && lines[i].startsWith('# ')) i++
  // 빈 줄 스킵
  while (i < lines.length && lines[i].trim() === '') i++
  // `> **시행일** ...` 메타 인용블록 제거
  while (i < lines.length && lines[i].startsWith('>')) i++
  // 빈 줄 스킵
  while (i < lines.length && lines[i].trim() === '') i++
  // `---` 구분선 제거
  if (i < lines.length && lines[i].trim() === '---') i++
  return lines.slice(i).join('\n')
}
