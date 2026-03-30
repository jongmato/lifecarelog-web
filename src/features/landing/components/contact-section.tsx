'use client'

import { useTranslations } from 'next-intl'
import { Mail } from 'lucide-react'
import { ContactForm } from './contact-form'

export function ContactSection() {
  const t = useTranslations('contact')

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="font-sans text-xl font-semibold text-foreground">
          {t('headline')}
        </h2>
        <p className="font-sans text-sm text-muted-foreground mt-1">
          {t('subheadline')}
        </p>
      </div>

      {/* Email direct link */}
      <a
        href="mailto:lifecarelog@gmail.com"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 w-fit"
      >
        <Mail size={16} strokeWidth={1.75} aria-hidden="true" />
        <span>lifecarelog@gmail.com</span>
      </a>

      {/* Contact Form */}
      <ContactForm />
    </div>
  )
}
