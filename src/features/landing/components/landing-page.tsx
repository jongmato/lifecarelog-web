'use client'

import { useContact } from '@/widgets/contact-context'
import { HeroSection } from './hero-section'
import { PhilosophySection } from './sections/philosophy-section'
import { StorySection } from './sections/story-section'
import { ServicesPreviewSection } from './sections/services-preview-section'
import { DevServiceSection } from './sections/dev-service-section'
import { ContactSectionV2 } from './sections/contact-section-v2'

export function LandingPage() {
  const onContact = useContact()

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <HeroSection onContact={onContact} />
      <PhilosophySection />
      <StorySection />
      <ServicesPreviewSection />
      <DevServiceSection onContact={onContact} />
      <ContactSectionV2 onContact={onContact} />
    </main>
  )
}
