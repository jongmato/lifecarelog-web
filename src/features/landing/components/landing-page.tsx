'use client'

import { useState } from 'react'
import { BentoGrid, BentoRow, BentoSectionBreak } from './bento-grid'
import { HeroSection } from './hero-section'
import { AboutCard } from './cards/about-card'
import { PlanCCard } from './cards/plan-c-card'
import { PlanLCard } from './cards/plan-l-card'
import { PlanTCard } from './cards/plan-t-card'
import { StatsTechCard } from './cards/stats-tech-card'
import { SocialCoffeeCard } from './cards/social-coffee-card'
import { ContactDialog } from './contact-dialog'
import { Footer } from './footer'

export function LandingPage() {
  const [contactOpen, setContactOpen] = useState(false)

  function openContact() {
    setContactOpen(true)
  }

  return (
    <>
      <main
        id="main-content"
        className="flex flex-1 flex-col px-4 sm:px-6 py-8 sm:py-10"
      >
        <BentoGrid>
          {/* Row 1: Hero (full width) */}
          <BentoRow className="mb-3 sm:mb-4 lg:mb-5">
            <HeroSection onContact={openContact} />
          </BentoRow>

          {/* Row 2: About (8col) + Plan-C (4col) */}
          <BentoRow className="mb-3 sm:mb-4 lg:mb-5">
            <AboutCard index={1} onContact={openContact} />
            <PlanCCard index={2} />
          </BentoRow>

          {/* Row 3: Plan-L (4col) + Plan-T (8col) */}
          <BentoRow>
            <PlanLCard index={3} />
            <PlanTCard index={4} />
          </BentoRow>

          {/* Section break */}
          <BentoSectionBreak />

          {/* Row 4: Stats+Tech (6col) + Social+Coffee (6col) */}
          <BentoRow>
            <StatsTechCard index={5} />
            <SocialCoffeeCard index={6} />
          </BentoRow>
        </BentoGrid>
      </main>

      <Footer onContact={openContact} />

      {/* Contact Modal */}
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  )
}
