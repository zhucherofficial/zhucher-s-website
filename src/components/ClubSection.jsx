import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clubs } from '../data/siteData'

const clubSignals = ['Lectures', 'CAD work', 'Robot archive']

export function ClubSection() {
  const club = clubs[0]

  return (
    <section className="club-section" id="club">
      <div className="club-section__inner page-shell">
        <div className="club-section__copy">
          <span>Student Club</span>
          <h2>A school physics club with a technical public identity.</h2>
          <p>
            A living archive for physics lectures, peer problem solving, CAD work, student circuits,
            and robot tests from the club room.
          </p>

          <div className="club-section__signals" aria-label="Physics club focus areas">
            {clubSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>

          <Link className="club-section__cta" to={`/club/${club.id}`}>
            View physics club
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>

        <div className="club-section__stage">
          <Link className="club-card" to={`/club/${club.id}`} aria-label={`Open ${club.name}`}>
            <div className="club-card__media">
              <img src={club.cardImage} alt="" />
              <div className="club-logo">
                <span>{club.logoText}</span>
              </div>
            </div>

            <div className="club-card__content">
              <span>{club.school}</span>
              <h3>{club.name}</h3>
              <p>{club.summary}</p>
              <strong>
                {club.role}
                <ArrowRight size={17} aria-hidden="true" />
              </strong>
            </div>
          </Link>

          <div className="club-section__page-slot">
            <img src={club.gallery[2].src} alt="" />
            <span>{club.gallery[2].title}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
