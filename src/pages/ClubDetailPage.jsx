import { ArrowUpRight, Atom, BookOpen, CircuitBoard, Play, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { AssetImage } from '../components/AssetImage'
import { TargetCursor } from '../components/TargetCursor'
import { getProjectManifestEntry } from '../data/projectManifest'
import { getClubById, getProjectById, getServiceById, profile, projects } from '../data/siteData'
// The club page is the second sheet in the home-scene PHYSICS_ARCHIVE folder, so it
// reuses the project case-study shell (rail + evidence stage) and only layers the
// paper-dossier treatment and club-specific sections on top.
import './ProjectDetailPage.css'
import './ClubDetailPage.css'

const CLUB_ACCENT = '#ffd632'
const TRACK_ICONS = { concepts: Atom, practice: BookOpen, build: CircuitBoard }

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Member builds that map to a full case study borrow their copy, tags, outcomes, and
// footage from that project entry instead of carrying a second copy of the facts.
function resolveStudentProject(entry) {
  const project = entry.projectId ? getProjectById(entry.projectId) : null
  if (!project) return { ...entry, images: entry.images ?? [], videos: entry.videos ?? [] }

  return {
    ...entry,
    title: project.title,
    eyebrow: project.eyebrow,
    summary: project.summary,
    detail: project.detail,
    tags: project.tags,
    outcomes: project.outcomes,
    href: `/projects/${project.id}`,
    accent: getProjectManifestEntry(project.id)?.accent,
    images: entry.images ?? [],
    videos: project.media?.filter((item) => item.type === 'video') ?? [],
  }
}

export function ClubDetailPage() {
  const { id = 'physics-club' } = useParams()
  const navigate = useNavigate()
  const club = getClubById(id)

  const rootRef = useRef(null)
  const mediaRef = useRef(null)
  const railRef = useRef(null)
  const contentRef = useRef(null)
  const exitTimelineRef = useRef(null)
  const [leaving, setLeaving] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    const media = mediaRef.current
    const rail = railRef.current
    const content = contentRef.current
    if (!root || !media || !rail || !content) return undefined

    const sections = [...content.children]
    const context = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([media, rail, sections], { autoAlpha: 1, clearProps: 'transform' })
        return
      }

      gsap.timeline()
        .fromTo(media, { autoAlpha: 0, scale: 0.94, rotation: -1.5 }, {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 0.66,
          ease: 'back.out(1.25)',
        })
        .fromTo(rail, { autoAlpha: 0, x: -22 }, { autoAlpha: 1, x: 0, duration: 0.42, ease: 'power3.out' }, '-=0.3')
        .fromTo(sections, { autoAlpha: 0, y: 24 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
        }, '-=0.34')
    }, root)

    return () => context.revert()
  }, [id])

  useEffect(() => () => exitTimelineRef.current?.kill(), [])

  if (!club) return <NotFoundDetail />

  const returnToFolder = () => navigate('/', { state: { openScene: 'folder' } })

  const handleBack = (event) => {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)

    if (!rootRef.current || prefersReducedMotion()) {
      returnToFolder()
      return
    }

    exitTimelineRef.current = gsap.to(rootRef.current, {
      autoAlpha: 0,
      duration: 0.28,
      ease: 'power2.in',
      onComplete: returnToFolder,
    })
  }

  const studentProjects = club.studentProjects.map(resolveStudentProject)
  const videoCount = studentProjects.reduce((total, project) => total + project.videos.length, 0)
  const metrics = [
    { value: String(club.gallery.length).padStart(2, '0'), label: 'archive photos' },
    { value: String(studentProjects.length).padStart(2, '0'), label: 'member builds' },
    { value: String(videoCount).padStart(2, '0'), label: 'robot test videos' },
    { value: String(club.tracks.length).padStart(2, '0'), label: 'learning tracks' },
  ]
  const nextEvidence = [...studentProjects.map((project) => project.title), 'Field archive']
  const nextSheet = getServiceById('physics-education')

  return (
    <main
      className={`project-case club-case ${leaving ? 'project-case--leaving' : ''}`}
      ref={rootRef}
      style={{ '--project-accent': CLUB_ACCENT }}
    >
      <TargetCursor blendMode="difference" activeColor="#ffffff" color="#ffffff" spinDuration={2.2} />

      <Link
        className="project-case__close target-cursor-hit"
        to="/"
        state={{ openScene: 'folder' }}
        onClick={handleBack}
        aria-label="Back to the physics archive folder"
      >
        <X aria-hidden="true" />
      </Link>

      <aside className="project-case__rail" ref={railRef}>
        <header className="project-case__rail-header">
          <p>{club.eyebrow}</p>
          <i />
          <i />
          <h1>{club.name}</h1>
        </header>

        <dl className="project-case__facts">
          <div className="project-case__fact project-case__fact--role">
            <dt>ROLE</dt>
            <dd>{club.role}</dd>
          </div>
          <div className="project-case__fact">
            <dt>PERIOD</dt>
            <dd>{club.period}</dd>
          </div>
          <div className="project-case__fact">
            <dt>SCHOOL</dt>
            <dd>{club.school}</dd>
          </div>
        </dl>

        <section className="project-case__rail-section">
          <h2>FOCUS</h2>
          <p>{club.summary}</p>
        </section>

        <section className="project-case__rail-section project-case__rail-outcomes">
          <h2>ARCHIVE / RECORDED</h2>
          {club.actions.slice(0, 2).map((action) => <p key={action}>{action}</p>)}
        </section>

        <div className="project-case__rail-progress" aria-hidden="true">
          <span>{club.sheet}</span>
          <i><b style={{ width: `${(Number(club.sheet) / Number(club.sheetCount)) * 100}%` }} /></i>
          <span>{club.sheetCount}</span>
        </div>
      </aside>

      <article className="project-case__stage" ref={contentRef}>
        <section className="project-case__beat project-case__beat--cover">
          <header className="project-case__beat-label">
            <span>STORY BEAT 01 / DOSSIER COVER</span>
            <i />
            <small>PULLED FROM THE PHYSICS_ARCHIVE FOLDER</small>
          </header>

          <div className="project-case__evidence-surface club-case__dossier">
            <div className="club-case__dossier-tab" aria-hidden="true">
              <strong>PHYSICS_CLUB.dossier</strong>
              <span>{`SHEET ${club.sheet} / ${club.sheetCount}`}</span>
            </div>

            <figure className="project-case__hero-media" ref={mediaRef}>
              <AssetImage
                priority
                src={club.heroImage}
                alt={`${club.name} lecture session at ${club.school}`}
                style={{ objectPosition: club.heroImagePosition }}
              />
            </figure>

            <aside className="project-case__evidence-index club-case__paper">
              <header>
                <strong>LECTURE_001.JPG</strong>
                <span>REAL CLUB MEDIA / UNFILTERED</span>
              </header>

              <section>
                <h2>VISIBLE SYSTEM</h2>
                <p>{club.heroCaption}</p>
              </section>

              <section>
                <h2>CLUB TRACKS</h2>
                <ul>{club.tracks.map((track) => <li key={track.id}>{track.title}</li>)}</ul>
              </section>

              <section className="project-case__working-loop">
                <h2>WORKING LOOP</h2>
                <div aria-label="Learn, then build, then test, then iterate">
                  <span>LEARN</span><b aria-hidden="true">›</b>
                  <span>BUILD</span><b aria-hidden="true">›</b>
                  <span>TEST</span>
                </div>
                <p>iterate / keep the failure</p>
              </section>

              <section className="project-case__next-evidence">
                <h2>NEXT EVIDENCE</h2>
                <ul>
                  {nextEvidence.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </aside>
          </div>
        </section>

        <div className="project-case__story">
          <section className="project-case__story-section">
            <p className="project-case__section-number">02 / THE CLUB</p>
            <h2>Physics should feel structured, testable, and buildable.</h2>
            <p>{club.detail}</p>
          </section>

          <section className="project-case__story-section club-case__system" aria-labelledby="club-system-title">
            <p className="project-case__section-number">03 / CLUB SYSTEM</p>
            <h2 id="club-system-title">Three layers of learning, one shared room.</h2>
            <p>
              Members come in for AP and school physics support, stay for advanced topic lectures, and
              leave with CAD models, circuits, and robot test footage. Everything below is counted from
              the archive on this page.
            </p>

            <div className="club-case__metrics" aria-label="Club archive counts">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <ol className="club-case__tracks" aria-label="Club learning tracks">
              {club.tracks.map((track, index) => {
                const Icon = TRACK_ICONS[track.id] ?? Atom
                return (
                  <li key={track.id}>
                    <Icon aria-hidden="true" />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{track.title}</strong>
                    <p>{track.copy}</p>
                  </li>
                )
              })}
            </ol>

            <div className="club-case__signals">
              <h3>MEMBERS COME IN WHEN THEY NEED</h3>
              <ul>{club.signals.map((signal) => <li key={signal}>{signal}</li>)}</ul>
            </div>
          </section>

          <section className="project-case__story-section club-case__builds" aria-labelledby="club-builds-title">
            <p className="project-case__section-number">04 / MEMBER BUILDS</p>
            <h2 id="club-builds-title">Two club-connected builds with real test media.</h2>
            <p>
              Each build keeps its owner, purpose, and evidence together. The wheeled-legged robot is
              also documented as a full case study, so its facts here are read from that project entry.
            </p>

            <div className="club-case__build-stack">
              {studentProjects.map((project, index) => (
                <article
                  className="club-case__build"
                  key={project.id}
                  style={project.accent ? { '--build-accent': project.accent } : undefined}
                >
                  <header className="club-case__build-header">
                    <span>{`BUILD_${String(index + 1).padStart(2, '0')} / ${project.eyebrow}`}</span>
                    <h3>{project.title}</h3>
                  </header>

                  <div className="club-case__build-body">
                    <div className="club-case__build-copy">
                      <dl className="club-case__build-facts">
                        <div>
                          <dt>OWNER</dt>
                          <dd>{project.owner}</dd>
                        </div>
                        <div>
                          <dt>ROLE</dt>
                          <dd>{project.role}</dd>
                        </div>
                      </dl>

                      <p>{project.summary}</p>
                      <p>{project.detail}</p>

                      {project.tags?.length ? (
                        <ul className="club-case__build-tags" aria-label="Build tags">
                          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                        </ul>
                      ) : null}

                      <div className="club-case__build-metrics">
                        {project.metrics.map((metric) => (
                          <div key={metric.label}>
                            <strong>{metric.value}</strong>
                            <span>{metric.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="club-case__build-process">
                        <h4>PROJECT PROCESS</h4>
                        <ol>
                          {project.process.map((step, stepIndex) => (
                            <li key={step}>
                              <span>{String(stepIndex + 1).padStart(2, '0')}</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {project.outcomes?.length ? (
                        <div className="club-case__build-process">
                          <h4>RECORDED OUTCOMES</h4>
                          <ol>
                            {project.outcomes.map((outcome, outcomeIndex) => (
                              <li key={outcome}>
                                <span>{String(outcomeIndex + 1).padStart(2, '0')}</span>
                                {outcome}
                              </li>
                            ))}
                          </ol>
                        </div>
                      ) : null}

                      {project.href ? (
                        <Link className="club-case__build-link target-cursor-hit" to={project.href}>
                          OPEN THE FULL CASE STUDY
                          <ArrowUpRight aria-hidden="true" />
                        </Link>
                      ) : null}
                    </div>

                    <div className="club-case__build-media">
                      {project.images.map((image) => (
                        <figure key={image.src}>
                          <AssetImage src={image.src} alt={image.alt} style={{ objectPosition: image.imagePosition }} />
                          <figcaption>
                            <strong>{image.title}</strong>
                            <span>{image.caption}</span>
                          </figcaption>
                        </figure>
                      ))}
                      {project.videos.map((video) => (
                        <figure className="club-case__build-video" key={video.src}>
                          <video src={video.src} controls poster={video.poster} preload="metadata" playsInline />
                          <figcaption>
                            <Play aria-hidden="true" />
                            <strong>{video.title}</strong>
                            <span>{video.caption}</span>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="project-case__story-section club-case__archive-links" aria-labelledby="club-archive-title">
            <p className="project-case__section-number">05 / FROM THE PROJECT ARCHIVE</p>
            <h2 id="club-archive-title">Lecture material comes from the same experiments.</h2>
            <p>
              The projects documented elsewhere on this site supply the club&apos;s lecture examples;
              four of them are on the screen in the cover photo. Each entry below opens the full case
              study.
            </p>

            <ol className="club-case__project-list">
              {projects.map((project, index) => {
                const accent = getProjectManifestEntry(project.id)?.accent ?? CLUB_ACCENT
                return (
                  <li key={project.id} style={{ '--build-accent': accent }}>
                    <Link className="target-cursor-hit" to={`/projects/${project.id}`}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <small>{project.eyebrow}</small>
                        <strong>{project.title}</strong>
                        <p>{project.summary}</p>
                      </div>
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </li>
                )
              })}
            </ol>
          </section>

          <section className="project-case__story-section project-case__archive club-case__gallery" aria-labelledby="club-gallery-title">
            <p className="project-case__section-number">06 / FIELD ARCHIVE</p>
            <h2 id="club-gallery-title">Photos from lectures, builds, and prototypes.</h2>
            <div className="project-case__media-grid club-case__media-grid">
              {club.gallery.map((item, index) => (
                <figure key={item.title}>
                  <AssetImage src={item.src} alt={item.title} style={{ objectPosition: item.imagePosition }} />
                  <figcaption>
                    <strong>{`ARCHIVE_${String(index + 1).padStart(3, '0')} / ${item.title}`}</strong>
                    <span>{item.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="project-case__story-section project-case__story-outcomes">
            <p className="project-case__section-number">07 / WHAT HAS ALREADY STARTED</p>
            <h2>Recorded club actions</h2>
            <ol>
              {club.actions.map((action, index) => (
                <li key={action}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{action}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="project-case__cta">
            <p className="project-case__section-number">08 / QUESTIONS?</p>
            <h2>Want to start a physics club, or join this one?</h2>
            <p>
              Happy to share lecture notes, the build archive, and what it took to keep the room running.
              The inbox is always open.
            </p>
            <a className="project-case__cta-link target-cursor-hit" href={`mailto:${profile.email}`}>
              {profile.email}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </section>

          {nextSheet ? (
            <footer className="project-case__next">
              <span>NEXT SHEET / 01</span>
              <Link className="target-cursor-hit" to="/physics-education">
                {nextSheet.title}
              </Link>
            </footer>
          ) : null}
        </div>
      </article>
    </main>
  )
}

function NotFoundDetail() {
  return (
    <main className="project-case project-case--not-found club-case" style={{ '--project-accent': CLUB_ACCENT }}>
      <Link className="project-case__close" to="/" state={{ openScene: 'folder' }} aria-label="Back to the physics archive folder">
        <X aria-hidden="true" />
      </Link>
      <h1>CLUB NOT FOUND</h1>
    </main>
  )
}
