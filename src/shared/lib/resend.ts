import { Resend } from 'resend'

// Singleton Resend client — instantiated once per cold start
const resendApiKey = process.env.RESEND_API_KEY

export const resend = resendApiKey
  ? new Resend(resendApiKey)
  : null
