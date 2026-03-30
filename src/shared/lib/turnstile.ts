const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * Verifies a Cloudflare Turnstile token server-side.
 * Returns true if no secret key is configured (dev mode bypass).
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  // Dev mode bypass — skip verification when secret key not configured
  if (!secretKey) return true

  const params = new URLSearchParams({
    secret: secretKey,
    response: token,
  })

  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    body: params,
  })

  if (!res.ok) return false

  const data = (await res.json()) as { success: boolean }
  return data.success === true
}
