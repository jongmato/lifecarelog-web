'use client'

interface PrincipleCardProps {
  number: string
  title: string
  body: string
}

export function PrincipleCard({ number, title, body }: PrincipleCardProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-xl p-6 transition-shadow duration-300 hover:shadow-card-hover"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <span
        className="font-sans text-xs font-semibold"
        style={{ color: 'var(--primary)' }}
        aria-hidden="true"
      >
        {number}
      </span>
      <h3
        className="font-sans text-base font-semibold leading-snug"
        style={{ color: 'var(--foreground)' }}
      >
        {title}
      </h3>
      <p
        className="font-sans text-sm leading-relaxed"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {body}
      </p>
    </div>
  )
}
