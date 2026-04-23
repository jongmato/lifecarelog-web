'use client'

import { useState } from 'react'
import { NavigationHeader } from '@/widgets/navigation-header'
import { ContactProvider } from '@/widgets/contact-context'
import { Footer } from '@/features/landing/components/footer'
import { ContactDialog } from '@/features/landing/components/contact-dialog'

export function PageShell({ children }: { children: React.ReactNode }) {
  const [contactOpen, setContactOpen] = useState(false)

  function openContact() {
    setContactOpen(true)
  }

  return (
    <ContactProvider onContact={openContact}>
      <NavigationHeader onContact={openContact} />
      {children}
      <Footer onContact={openContact} />
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </ContactProvider>
  )
}
