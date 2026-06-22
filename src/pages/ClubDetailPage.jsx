import {
  ArrowLeft,
  ArrowUpRight,
  Atom,
  BookOpen,
  CircuitBoard,
  Droplets,
  Leaf,
  Play,
  UsersRound,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getClubById } from '../data/siteData'

const clubSignals = [
  'AP and school physics support',
  'Advanced topic lectures',
  'CAD and circuit prototyping',
  'Robot test archive',
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
    copy: 'Turn physics ideas into circuits, CAD models, irrigation devices, and robot test footage.',
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
          <div className="club-detail__hero-media">
            <img src={club.heroImage} alt="" />
          </div>

          <div className="club-detail__hero-copy page-shell">
            <span className="club-detail__pretitle">The physics learning ecosystem</span>
            <h1>{club.name}</h1>
            <p>{club.detail}</p>
            <Link className="club-detail__cta" to="/#contact">
              Explore the club archive
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="club-detail__reasons">
          <div className="club-detail__reasons-inner page-shell">
            <div className="club-detail__reasons-copy">
              <span>Let us be precise.</span>
              <h2>Physics should feel structured, testable, and buildable.</h2>
              <p>
                The club gives students a place to slow down, ask sharper questions, and connect
                textbook equations with lectures, CAD sessions, circuits, and robotics experiments.
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
            <h2>A technical club system already becoming an archive.</h2>
            <p>
              The club archive now includes lectures, member CAD work, Cindy's automatic watering
              robot, circuit close-ups, and early wheeled-legged robot tests.
            </p>
          </div>

          <figure className="club-detail__photo-arch">
            <img src={club.featureImage} alt="" />
            <figcaption>{club.featureCaption}</figcaption>
          </figure>
        </section>

        <section className="club-detail__gallery page-shell" aria-labelledby="club-gallery-title">
          <div className="club-detail__section-heading">
            <span>Media archive</span>
            <h2 id="club-gallery-title">Photos from lectures, builds, and prototypes.</h2>
          </div>

          <div className="club-detail__gallery-grid">
            {club.gallery.map((item) => (
              <figure className="club-detail__gallery-item" key={item.title}>
                <img src={item.src} alt="" style={{ objectPosition: item.imagePosition }} />
                <figcaption>
                  <strong>{item.title}</strong>
                  <span>{item.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="club-detail__projects page-shell" aria-labelledby="club-projects-title">
          <div className="club-detail__section-heading">
            <span>Student engineering</span>
            <h2 id="club-projects-title">Two club-connected builds with real test media.</h2>
          </div>

          <div className="club-detail__project-stack">
            {club.studentProjects.map((project) => (
              <article className="club-detail__project-card" key={project.id}>
                <div className="club-detail__project-copy">
                  <span>{project.owner}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p>{project.purpose}</p>

                  <div className="club-detail__project-metrics">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <strong>{metric.value}</strong>
                        <span>{metric.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="club-detail__project-process">
                    <strong>Project process</strong>
                    <ul>
                      {project.process.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {project.images ? (
                  <div className="club-detail__project-images">
                    {project.images.map((image) => (
                      <img
                        src={image.src}
                        alt={image.alt}
                        key={image.alt}
                        style={{ objectPosition: image.imagePosition }}
                      />
                    ))}
                  </div>
                ) : null}

                {project.videos ? (
                  <div className="club-detail__project-videos">
                    {project.videos.map((video) => (
                      <figure key={video.title}>
                        <video
                          src={video.src}
                          controls
                          poster={video.poster}
                          preload="metadata"
                          playsInline
                        />
                        <figcaption>
                          <Play size={15} aria-hidden="true" />
                          {video.title}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
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
            <div>
              <Droplets size={22} aria-hidden="true" />
              <span>Humidity sensor irrigation</span>
            </div>
            <div>
              <Leaf size={22} aria-hidden="true" />
              <span>Public-welfare engineering</span>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}
