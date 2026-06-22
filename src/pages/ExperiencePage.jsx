import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ExperienceTimeline } from '../components/ExperienceTimeline'
import { ReactBitsBackdrop } from '../components/ReactBitsBackdrop'
import { TargetCursor } from '../components/TargetCursor'

export function ExperiencePage() {
  return (
    <main className="detail-page experience-page">
      <ReactBitsBackdrop
        variant="pixelsnow"
        palette={['#eef5f4', '#8be7dc', '#d6ed6f', '#ff8d61']}
        density={1.24}
      />
      <ReactBitsBackdrop
        className="detail-page__secondary-field"
        variant="dotfield"
        palette={['#8be7dc', '#d6ed6f', '#ff8d61']}
        density={0.86}
        subtle
      />
      <TargetCursor activeColor="#b497cf" color="#ffffff" spinDuration={2} />
      <section className="experience-detail page-shell">
        <Link className="back-link target-cursor-hit" to="/#experience">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to profile
        </Link>

        <div className="experience-detail__hero target-cursor-hit">
          <span className="section-label">Personal Experience</span>
          <h1>Experience timeline</h1>
          <p>
            A motion map of engineering programs, research practice, peer teaching, internship work, and
            creative discipline.
          </p>
        </div>

        <section className="timeline-section timeline-section--detail" aria-label="Experience timeline">
          <ExperienceTimeline />
        </section>
      </section>
    </main>
  )
}
