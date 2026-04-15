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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br />')
}

function buildEmailText(payload: ContactPayload): string {
  return [
    `이름: ${payload.name}`,
    `이메일: ${payload.email}`,
    '',
    '메시지:',
    payload.message,
  ].join('\n')
}

function buildEmailHtml(payload: ContactPayload): string {
  const now = new Date().toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background-color:#FAF8F5;font-family:'Apple SD Gothic Neo','Malgun Gothic',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);">

        <!-- Header -->
        <tr><td style="background-color:#D4849A;padding:28px 32px;text-align:center;">
          <p style="margin:0;font-size:20px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">새로운 메시지가 도착했어요</p>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.85);">lifecarelog.co.kr 컨택폼</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px;">

          <!-- Sender info -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="padding:12px 16px;background-color:#FAF8F5;border-radius:10px;">
                <p style="margin:0 0 4px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.5px;">보낸 사람</p>
                <p style="margin:0;font-size:16px;font-weight:600;color:#1a1a1a;">${escapeHtml(payload.name)}</p>
              </td>
            </tr>
            <tr><td style="height:8px;"></td></tr>
            <tr>
              <td style="padding:12px 16px;background-color:#FAF8F5;border-radius:10px;">
                <p style="margin:0 0 4px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.5px;">이메일</p>
                <a href="mailto:${escapeHtml(payload.email)}" style="font-size:15px;color:#D4849A;text-decoration:none;font-weight:500;">${escapeHtml(payload.email)}</a>
              </td>
            </tr>
          </table>

          <!-- Divider -->
          <hr style="border:none;border-top:1px solid #f0ece8;margin:0 0 24px;" />

          <!-- Message -->
          <p style="margin:0 0 8px;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.5px;">메시지</p>
          <div style="font-size:15px;line-height:1.75;color:#333;word-break:keep-all;">
            ${escapeHtml(payload.message)}
          </div>

        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 32px;background-color:#FAF8F5;border-top:1px solid #f0ece8;">
          <p style="margin:0;font-size:12px;color:#aaa;text-align:center;">
            ${now} · 이 메일에 답장하면 ${escapeHtml(payload.name)}님에게 바로 전달돼요.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
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
    subject: `[LifeCareLog] ${payload.name}님의 메시지`,
    html: buildEmailHtml(payload),
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
