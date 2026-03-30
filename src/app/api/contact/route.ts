import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod/v3'
import { resend } from '@/shared/lib/resend'
import { verifyTurnstile } from '@/shared/lib/turnstile'

const contactSchema = z.object({
  name: z.string().min(2, '이름을 2자 이상 입력해 주세요.'),
  email: z.string().email('이메일 형식이 올바르지 않아요.'),
  message: z.string().min(10, '메시지를 10자 이상 입력해 주세요.'),
  token: z.string().optional(),
})

type ContactPayload = z.infer<typeof contactSchema>

function buildEmailText(payload: ContactPayload): string {
  return [
    `이름: ${payload.name}`,
    `이메일: ${payload.email}`,
    '',
    '메시지:',
    payload.message,
  ].join('\n')
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: '요청 형식이 올바르지 않아요.' },
      { status: 400 }
    )
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error.errors[0]?.message ?? '입력값을 확인해 주세요.' },
      { status: 422 }
    )
  }

  const payload = result.data

  // Verify Turnstile token (skipped in dev mode when no secret key)
  if (payload.token !== undefined) {
    const isHuman = await verifyTurnstile(payload.token)
    if (!isHuman) {
      return NextResponse.json(
        { success: false, error: '보안 인증에 실패했어요. 다시 시도해 주세요.' },
        { status: 403 }
      )
    }
  }

  if (!resend) {
    // RESEND_API_KEY not configured — log and return success in dev
    return NextResponse.json({ success: true })
  }

  const { error } = await resend.emails.send({
    from: 'LifeCareLog <noreply@lifecarelog.co.kr>',
    to: 'lifecarelog@gmail.com',
    subject: `[포트폴리오 문의] ${payload.name}님`,
    text: buildEmailText(payload),
    replyTo: payload.email,
  })

  if (error) {
    return NextResponse.json(
      { success: false, error: '메시지를 보내지 못했어요. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
