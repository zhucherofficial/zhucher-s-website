import { Play, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { TargetCursor } from '../components/TargetCursor'
import { getProjectManifestEntry } from '../data/projectManifest'
import { getProjectById, projects } from '../data/siteData'
import './ProjectDetailPage.css'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function rectToObject(rect) {
  return {
    height: rect.height,
    left: rect.left,
    top: rect.top,
    width: rect.width,
  }
}

function projectEvidenceItems(project) {
  if (project.media?.length) return project.media.map((item) => item.title)
  return project.outcomes
}

export function ProjectDetailPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const project = getProjectById(id)
  const projectIndex = projects.findIndex((entry) => entry.id === id)
  const nextProject = projectIndex >= 0 ? projects[(projectIndex + 1) % projects.length] : null
  const manifestEntry = getProjectManifestEntry(id)
  const transition = location.state?.projectTransition
  const accent = transition?.accent ?? manifestEntry?.accent ?? '#2ce6e8'

  const rootRef = useRef(null)
  const mediaRef = useRef(null)
  const railCopyRef = useRef(null)
  const contentRef = useRef(null)
  const cloneRef = useRef(null)
  const entranceTimelineRef = useRef(null)
  const exitTimelineRef = useRef(null)
  const [leaving, setLeaving] = useState(false)

  useLayoutEffect(() => {
    const root = rootRef.current
    const media = mediaRef.current
    const railCopy = railCopyRef.current
    const content = contentRef.current
    const clone = cloneRef.current
    if (!root || !media || !railCopy || !content || !clone) return undefined

    const contentSections = [...content.children]
    const cloneImage = clone.querySelector('img')
    const reducedMotion = prefersReducedMotion()

    const context = gsap.context(() => {
      entranceTimelineRef.current?.kill()
      gsap.set(clone, { display: 'none' })

      if (reducedMotion) {
        gsap.set([media, railCopy, contentSections], { autoAlpha: 1, clearProps: 'transform' })
        return
      }

      gsap.set(railCopy, { autoAlpha: 0, x: -22 })
      gsap.set(contentSections, { autoAlpha: 0, y: 24 })

      const sourceRect = transition?.sourceRect
      if (sourceRect) {
        const targetRect = rectToObject(media.getBoundingClientRect())
        gsap.set(media, { autoAlpha: 0 })
        gsap.set(clone, {
          display: 'block',
          x: sourceRect.left,
          y: sourceRect.top,
          width: sourceRect.width,
          height: Math.max(sourceRect.height, 4),
          borderColor: accent,
          backgroundColor: accent,
        })
        gsap.set(cloneImage, { autoAlpha: 0, scale: 1.08 })

        entranceTimelineRef.current = gsap.timeline({ defaults: { overwrite: 'auto' } })
          .to(clone, {
            x: targetRect.left,
            y: targetRect.top,
            width: targetRect.width,
            height: targetRect.height,
            duration: 0.82,
            ease: 'power4.inOut',
          })
          .to(cloneImage, { autoAlpha: 1, scale: 1, duration: 0.36, ease: 'power2.out' }, 0.24)
          .set(media, { autoAlpha: 1 })
          .set(clone, { display: 'none' })
          .to(railCopy, { autoAlpha: 1, x: 0, duration: 0.45, ease: 'power3.out' }, '-=0.2')
          .to(contentSections, {
            autoAlpha: 1,
            y: 0,
            duration: 0.54,
            stagger: 0.08,
            ease: 'power3.out',
          }, '-=0.38')
        return
      }

      entranceTimelineRef.current = gsap.timeline()
        .fromTo(media, { autoAlpha: 0, scale: 0.94, rotation: -1.5 }, {
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 0.66,
          ease: 'back.out(1.25)',
        })
        .to(railCopy, { autoAlpha: 1, x: 0, duration: 0.42, ease: 'power3.out' }, '-=0.3')
        .to(contentSections, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
        }, '-=0.34')
    }, root)

    return () => {
      entranceTimelineRef.current?.kill()
      context.revert()
    }
  }, [accent, id, transition])

  useEffect(() => () => exitTimelineRef.current?.kill(), [])

  if (!project) return <NotFoundDetail />

  const returnToGuitar = () => {
    navigate('/', {
      state: {
        openScene: 'guitar',
        returnFocusId: project.id,
      },
    })
  }

  const handleBack = (event) => {
    event.preventDefault()
    if (leaving) return
    setLeaving(true)

    const root = rootRef.current
    const media = mediaRef.current
    const railCopy = railCopyRef.current
    const content = contentRef.current
    const clone = cloneRef.current
    const sourceRect = transition?.sourceRect

    if (!root || !media || !railCopy || !content || !clone || !sourceRect || prefersReducedMotion()) {
      if (!root || prefersReducedMotion()) {
        returnToGuitar()
        return
      }
      exitTimelineRef.current = gsap.to(root, {
        autoAlpha: 0,
        duration: 0.28,
        ease: 'power2.in',
        onComplete: returnToGuitar,
      })
      return
    }

    const targetRect = rectToObject(media.getBoundingClientRect())
    const cloneImage = clone.querySelector('img')
    const contentSections = [...content.children]

    exitTimelineRef.current?.kill()
    gsap.set(clone, {
      display: 'block',
      x: targetRect.left,
      y: targetRect.top,
      width: targetRect.width,
      height: targetRect.height,
      borderColor: accent,
      backgroundColor: accent,
    })
    gsap.set(cloneImage, { autoAlpha: 1, scale: 1 })
    gsap.set(media, { autoAlpha: 0 })

    exitTimelineRef.current = gsap.timeline({ onComplete: returnToGuitar })
      .to([railCopy, ...contentSections], {
        autoAlpha: 0,
        y: 18,
        duration: 0.28,
        stagger: 0.015,
        ease: 'power2.in',
      }, 0)
      .to(clone, {
        x: sourceRect.left,
        y: sourceRect.top,
        width: sourceRect.width,
        height: Math.max(sourceRect.height, 4),
        duration: 0.7,
        ease: 'power4.inOut',
      }, 0.08)
      .to(cloneImage, { autoAlpha: 0, scale: 1.06, duration: 0.25 }, 0.4)
  }

  const evidenceItems = projectEvidenceItems(project)

  return (
    <main
      className={`project-case ${leaving ? 'project-case--leaving' : ''}`}
      data-transition-origin={transition?.origin ?? 'direct'}
      ref={rootRef}
      style={{ '--project-accent': accent }}
    >
      <TargetCursor activeColor={accent} color="#ffffff" spinDuration={2.2} />

      <div className="project-case__transition-clone" ref={cloneRef} aria-hidden="true">
        <img src={project.image} alt="" style={{ objectPosition: project.imagePosition }} />
      </div>

      <Link
        className="project-case__close target-cursor-hit"
        to="/"
        state={{ openScene: 'guitar', returnFocusId: project.id }}
        onClick={handleBack}
        aria-label="Back to project guitar"
      >
        <X aria-hidden="true" />
      </Link>

      <aside className="project-case__rail" ref={railCopyRef}>
        <header className="project-case__rail-header">
          <p>{project.eyebrow}</p>
          <i />
          <i />
          <h1>{project.title}</h1>
        </header>

        <dl className="project-case__facts">
          <div className="project-case__fact project-case__fact--role">
            <dt>ROLE</dt>
            <dd>{project.role}</dd>
          </div>
          <div className="project-case__fact">
            <dt>PERIOD</dt>
            <dd>{project.period}</dd>
          </div>
          <div className="project-case__fact">
            <dt>CADENCE</dt>
            <dd>{project.hours}</dd>
          </div>
        </dl>

        <section className="project-case__rail-section">
          <h2>FOCUS</h2>
          <p>{project.summary}</p>
        </section>

        <section className="project-case__rail-section project-case__rail-outcomes">
          <h2>OUTCOMES / RECORDED</h2>
          {project.outcomes.slice(0, 2).map((outcome) => <p key={outcome}>{outcome}</p>)}
        </section>

        <div className="project-case__rail-progress" aria-hidden="true">
          <span>{String(projectIndex + 1).padStart(2, '0')}</span>
          <i><b style={{ width: `${((projectIndex + 1) / projects.length) * 100}%` }} /></i>
          <span>{String(projects.length).padStart(2, '0')}</span>
        </div>
      </aside>

      <article className="project-case__stage" ref={contentRef}>
        <section className="project-case__beat project-case__beat--cover">
          <header className="project-case__beat-label">
            <span>STORY BEAT 01 / PORTRAIT COVER</span>
            <i />
            <small>SCROLL COUPLES NARRATIVE + EVIDENCE</small>
          </header>

          <div className="project-case__evidence-surface">
            <figure className="project-case__hero-media" ref={mediaRef}>
              <img
                src={project.image}
                alt={project.title}
                style={{ objectPosition: project.imagePosition }}
              />
            </figure>

            <aside className="project-case__evidence-index">
              <header>
                <strong>{`EVIDENCE_${String(projectIndex + 1).padStart(3, '0')}.JPG`}</strong>
                <span>REAL PROJECT MEDIA / UNFILTERED</span>
              </header>

              <section>
                <h2>VISIBLE SYSTEM</h2>
                <p>{project.summary}</p>
              </section>

              <section>
                <h2>PROJECT TAGS</h2>
                <ul>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </section>

              <section className="project-case__working-loop">
                <h2>WORKING LOOP</h2>
                <div aria-label="Input to experiment to result, then iterate">
                  <span>INPUT</span><b aria-hidden="true">›</b>
                  <span>EXPERIMENT</span><b aria-hidden="true">›</b>
                  <span>RESULT</span>
                </div>
                <p>iterate / keep the failure</p>
              </section>

              <section className="project-case__next-evidence">
                <h2>NEXT EVIDENCE</h2>
                <ul>
                  {evidenceItems.slice(0, 3).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            </aside>
          </div>
        </section>

        <div className="project-case__story">
          <section className="project-case__story-section">
            <p className="project-case__section-number">02 / THE EXPERIMENT</p>
            <h2>Build the system, then let the evidence argue back.</h2>
            <p>{project.detail}</p>
          </section>

          <section className="project-case__story-section project-case__story-outcomes">
            <p className="project-case__section-number">03 / WHAT MOVED FORWARD</p>
            <h2>Recorded outcomes</h2>
            <ol>
              {project.outcomes.map((outcome, index) => (
                <li key={outcome}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{outcome}</p>
                </li>
              ))}
            </ol>
          </section>

          {project.media ? (
            <section className="project-case__story-section project-case__archive">
              <p className="project-case__section-number">04 / FIELD ARCHIVE</p>
              <h2>Test footage and supporting evidence</h2>
              <div className="project-case__media-grid">
                {project.media.map((item) => (
                  <figure key={item.title}>
                    {item.type === 'video' ? (
                      <video src={item.src} controls poster={item.poster} preload="metadata" playsInline />
                    ) : (
                      <img src={item.src} alt={item.title} style={{ objectPosition: item.imagePosition }} />
                    )}
                    <figcaption>
                      {item.type === 'video' ? <Play aria-hidden="true" /> : null}
                      <strong>{item.title}</strong>
                      <span>{item.caption}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {nextProject ? (
            <footer className="project-case__next">
              <span>NEXT EXPERIMENT</span>
              <Link to={`/projects/${nextProject.id}`} state={{ returnScene: 'guitar' }}>
                {nextProject.title}
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
    <main className="project-case project-case--not-found">
      <Link className="project-case__close" to="/" state={{ openScene: 'guitar' }} aria-label="Back to project guitar">
        <X aria-hidden="true" />
      </Link>
      <h1>PROJECT NOT FOUND</h1>
    </main>
  )
}
