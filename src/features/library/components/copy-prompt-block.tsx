'use client'

import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import type { LibraryPrompt } from '@/content/library/blog-prompts-10'

const COPIED_RESET_MS = 1500

export function CopyPromptBlock({ title, prompt }: LibraryPrompt) {
  const [copied, setCopied] = useState(false)
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      if (resetTimerRef.current !== null) clearTimeout(resetTimerRef.current)
      resetTimerRef.current = setTimeout(() => setCopied(false), COPIED_RESET_MS)
    } catch {
      // ponytail: clipboard API can fail (permissions/insecure context) — silent no-op,
      // user can still select the text manually from the block below.
    }
  }

  return (
    <div className="rounded-2xl p-6 shadow-card" style={{ background: 'var(--card)', border: '1px solid var(--border)' }}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-sans text-base font-semibold text-foreground">{title}</h3>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          className="shrink-0 gap-1.5"
          aria-label={`"${title}" 프롬프트 복사`}
        >
          {copied ? (
            <>
              <Check size={14} aria-hidden="true" />
              복사됨
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
              복사
            </>
          )}
        </Button>
      </div>
      <p
        className="font-sans text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap break-words rounded-lg px-4 py-3"
        style={{ background: 'var(--muted)' }}
      >
        {prompt}
      </p>
    </div>
  )
}
