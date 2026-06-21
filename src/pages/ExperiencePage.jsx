import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ExperienceTimeline } from '../components/ExperienceTimeline'

export function ExperiencePage() {
  return (
    <main className="detail-page experience-page">
      <section className="experience-detail page-shell">
        <Link className="back-link" to="/#experience">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to profile
        </Link>

        <div className="experience-detail__hero">
          <span className="section-label">Personal Experience</span>
          <h1>Experience timeline</h1>
          <p>
            A focused record of research, engineering, music, internship, and science education work.
          </p>
        </div>

        <section className="timeline-section timeline-section--detail" aria-label="Experience timeline">
          <ExperienceTimeline />
        </section>
      </section>
    </main>
  )
}
