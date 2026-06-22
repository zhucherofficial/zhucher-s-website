import { ClubSection } from '../components/ClubSection'
import { ContactFinale } from '../components/ContactFinale'
import { Hero } from '../components/Hero'
import { ProfileSection } from '../components/ProfileSection'
import { ProjectsSection } from '../components/ProjectsSection'
import { ServiceSection } from '../components/ServiceSection'
import { TargetCursor } from '../components/TargetCursor'

export function HomePage() {
  return (
    <main>
      <TargetCursor activeColor="#b497cf" color="#ffffff" spinDuration={2} />
      <Hero />
      <ProfileSection />
      <ProjectsSection />
      <ClubSection />
      <ServiceSection />
      <ContactFinale />
    </main>
  )
}
