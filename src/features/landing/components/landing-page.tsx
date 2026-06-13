'use client'

import { useContact } from '@/widgets/contact-context'
import { HeroSection } from './hero-section'
import { WorkSection } from './sections/work-section'
import { AboutSection } from './sections/about-section'
import { HowSection } from './sections/how-section'
import { ContactSectionV2 } from './sections/contact-section-v2'

export function LandingPage() {
  const onContact = useContact()

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <HowSection />
      <ContactSectionV2 onContact={onContact} />
    </main>
  )
}
