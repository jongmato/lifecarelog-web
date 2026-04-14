'use client'

import { useState } from 'react'
import { NavigationHeader } from '@/widgets/navigation-header'
import { HeroSection } from './hero-section'
import { PhilosophySection } from './sections/philosophy-section'
import { StorySection } from './sections/story-section'
import { ServicesPreviewSection } from './sections/services-preview-section'
import { ContactSectionV2 } from './sections/contact-section-v2'
import { ContactDialog } from './contact-dialog'
import { Footer } from './footer'

export function LandingPage() {
  const [contactOpen, setContactOpen] = useState(false)

  function openContact() {
    setContactOpen(true)
  }

  return (
    <>
      <NavigationHeader onContact={openContact} />

      <main id="main-content" className="flex flex-1 flex-col">
        {/* Section 1: Hero — full viewport, brand first impression */}
        <HeroSection onContact={openContact} />

        {/* Section 2: Philosophy — brand core message */}
        <PhilosophySection />

        {/* Section 3: Brand Story — narrative journey */}
        <StorySection />

        {/* Section 4: Services Preview — minimal cards */}
        <ServicesPreviewSection />

        {/* Section 5: Contact / Coffee Chat */}
        <ContactSectionV2 onContact={openContact} />
      </main>

      <Footer onContact={openContact} />

      {/* Contact Modal */}
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
