'use client'

interface StatCardProps {
  number: string
  label: string
}

export function StatCard({ number, label }: StatCardProps) {
  return (
    <div
      className="flex flex-col gap-1 rounded-xl p-5"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <span
        className="font-sans font-bold text-4xl leading-none tracking-tight"
        style={{ color: 'var(--foreground)' }}
      >
        {number}
      </span>
      <span
        className="font-sans text-sm leading-snug mt-1"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {label}
      </span>
    </div>
  )
}
