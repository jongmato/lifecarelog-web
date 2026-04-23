'use client'

import { createContext, useContext } from 'react'

const ContactContext = createContext<(() => void) | null>(null)

export function ContactProvider({
  onContact,
  children,
}: {
  onContact: () => void
  children: React.ReactNode
}) {
  return (
    <ContactContext.Provider value={onContact}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact(): () => void {
  const ctx = useContext(ContactContext)
  return ctx ?? (() => {})
}
