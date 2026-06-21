import { ClubSection } from '../components/ClubSection'
import { ContactFinale } from '../components/ContactFinale'
import { Hero } from '../components/Hero'
import { ProfileSection } from '../components/ProfileSection'
import { ProjectsSection } from '../components/ProjectsSection'
import { ServiceSection } from '../components/ServiceSection'

export function HomePage() {
  return (
    <main>
      <Hero />
      <ProfileSection />
      <ProjectsSection />
      <ClubSection />
      <ServiceSection />
      <ContactFinale />
    </main>
  )
}
