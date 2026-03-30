import { BentoGrid, BentoRow, BentoSectionBreak } from '@/features/landing/components/bento-grid'
import { HeroSection } from '@/features/landing/components/hero-section'
import { AboutCard } from '@/features/landing/components/cards/about-card'
import { PlanCCard } from '@/features/landing/components/cards/plan-c-card'
import { PlanLCard } from '@/features/landing/components/cards/plan-l-card'
import { PlanTCard } from '@/features/landing/components/cards/plan-t-card'
import { StatsTechCard } from '@/features/landing/components/cards/stats-tech-card'
import { SocialCoffeeCard } from '@/features/landing/components/cards/social-coffee-card'
import { Footer } from '@/features/landing/components/footer'

export default function LocalePage() {
  return (
    <>
      <main
        id="main-content"
        className="flex flex-1 flex-col px-4 sm:px-6 py-8 sm:py-10"
      >
        <BentoGrid>
          {/* Row 1: Hero (full width) */}
          <BentoRow className="mb-3 sm:mb-4 lg:mb-5">
            <HeroSection />
          </BentoRow>

          {/* Row 2: About (8col) + Plan-C (4col) */}
          <BentoRow className="mb-3 sm:mb-4 lg:mb-5">
            <AboutCard index={1} />
            <PlanCCard index={2} />
          </BentoRow>

          {/* Row 3: Plan-L (4col) + Plan-T (8col) */}
          <BentoRow>
            <PlanLCard index={3} />
            <PlanTCard index={4} />
          </BentoRow>

          {/* Section break between project and utility sections */}
          <BentoSectionBreak />

          {/* Row 4: Stats+Tech (6col) + Social+Coffee (6col) */}
          <BentoRow>
            <StatsTechCard index={5} />
            <SocialCoffeeCard index={6} />
          </BentoRow>

          {/* Contact placeholder */}
          <div id="contact" className="mt-3 sm:mt-4 lg:mt-5 scroll-mt-8" />
        </BentoGrid>
      </main>

      <Footer />
    </>
  )
}
