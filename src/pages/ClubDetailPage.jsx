import { ArrowLeft, ArrowUpRight, Atom, BookOpen, CircuitBoard, UsersRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getClubById } from '../data/siteData'

const clubSignals = [
  'AP and school physics support',
  'Advanced topic lectures',
  'Problem-solving studio',
  'Future outreach platform',
]

const labTracks = [
  {
    title: 'Concepts',
    copy: 'Turn mechanics, electromagnetism, waves, and modern physics into discussable models.',
    icon: Atom,
  },
  {
    title: 'Practice',
    copy: 'Work through hard problems in a shared room where methods are explained, not hidden.',
    icon: BookOpen,
  },
  {
    title: 'Build',
    copy: 'Reserve space for later demonstrations, experiment photos, and student-made apparatus.',
    icon: CircuitBoard,
  },
]

export function ClubDetailPage() {
  const { id } = useParams()
  const club = getClubById(id)

  if (!club) {
    return (
      <main className="detail-page page-shell">
        <h1>Club not found</h1>
      </main>
    )
  }

  return (
    <main className="club-detail-page">
      <section className="club-detail club-detail--editorial">
        <div className="club-detail__nav page-shell">
          <Link className="club-detail__back" to="/#club">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to club
          </Link>
          <span>{club.school}</span>
        </div>

        <section className="club-detail__hero">
          <div className="club-detail__hero-media" aria-label="Reserved space for future physics club photography">
            <div className="club-detail__media-grid" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="club-detail__hero-mark" aria-hidden="true">
              <span>{club.logoText}</span>
            </div>
          </div>

          <div className="club-detail__hero-copy page-shell">
            <span className="club-detail__pretitle">The physics learning ecosystem</span>
            <h1>{club.name}</h1>
            <p>{club.detail}</p>
            <Link className="club-detail__cta" to="/#contact">
              Start building the club archive
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="club-detail__reasons">
          <div className="club-detail__reasons-inner page-shell">
            <div className="club-detail__reasons-copy">
              <span>Let’s be precise.</span>
              <h2>You are here because physics should feel structured, not mysterious.</h2>
              <p>
                The club gives students a place to slow down, ask sharper questions, and connect
                textbook equations with experiments, competitions, and future engineering work.
              </p>
            </div>

            <div className="club-detail__signal-card">
              <p>Members come in when they need:</p>
              <ul>
                {clubSignals.map((signal) => (
                  <li key={signal}>
                    <span aria-hidden="true">+</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="club-detail__ecosystem page-shell">
          <div className="club-detail__intro">
            <span>Introducing</span>
            <h2>A technical club system with room to grow.</h2>
            <p>
              The club structure can expand from weekly explanation into demonstrations, lecture
              boards, apparatus close-ups, and member work while keeping one clear learning path.
            </p>
          </div>

          <div className="club-detail__photo-arch" aria-label="Reserved space for a future club photo" />
        </section>

        <section className="club-detail__tracks page-shell" aria-labelledby="club-direction-title">
          <div className="club-detail__section-heading">
            <span>Club direction</span>
            <h2 id="club-direction-title">Three layers of learning.</h2>
          </div>

          <div className="club-detail__track-grid">
            {labTracks.map(({ title, copy, icon: Icon }) => (
              <article className="club-detail__track-card" key={title}>
                <Icon size={26} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="club-detail__actions page-shell">
          <div className="club-detail__role">
            <UsersRound size={24} aria-hidden="true" />
            <span>{club.role}</span>
          </div>

          <div className="club-detail__action-list">
            <h2>What has already started</h2>
            <ul>
              {club.actions.map((action) => (
                <li key={action}>{action}</li>
              ))}
            </ul>
          </div>

          <div className="club-detail__blank-stack" aria-label="Reserved spaces for future supporting images">
            <div />
            <div />
          </div>
        </section>
      </section>
    </main>
  )
}
