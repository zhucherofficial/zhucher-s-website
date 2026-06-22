import { ArrowLeft, Clock, Play, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ReactBitsBackdrop } from '../components/ReactBitsBackdrop'
import { TargetCursor } from '../components/TargetCursor'
import { getProjectById } from '../data/siteData'

export function ProjectDetailPage() {
  const { id } = useParams()
  const project = getProjectById(id)

  if (!project) {
    return <NotFoundDetail title="Project not found" />
  }

  return (
    <main className="detail-page">
      <ReactBitsBackdrop
        variant="particles"
        palette={['#8be7dc', '#d6ed6f', '#ff8d61', '#eef5f4']}
        density={1.1}
      />
      <ReactBitsBackdrop
        className="detail-page__secondary-field"
        variant="pixeltrail"
        palette={['#8be7dc', '#ff8d61', '#d6ed6f']}
        density={0.92}
        subtle
      />
      <TargetCursor activeColor="#b497cf" color="#ffffff" spinDuration={2} />
      <section className="detail-hero page-shell">
        <Link className="back-link target-cursor-hit" to="/#projects">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to projects
        </Link>
        <div className="detail-hero__grid detail-hero__grid--project">
          <div>
            <span className="section-label">{project.eyebrow}</span>
            <h1>{project.title}</h1>
            <p>{project.summary}</p>
            <div className="detail-meta">
              <span>
                <UserRound size={17} aria-hidden="true" />
                {project.role}
              </span>
              <span>
                <Clock size={17} aria-hidden="true" />
                {project.hours}
              </span>
            </div>
          </div>
          <div className="detail-media target-cursor-hit">
            <ReactBitsBackdrop
              variant="dotfield"
              palette={['#8be7dc', '#d6ed6f', '#ff8d61']}
              density={0.72}
              subtle
            />
            <img src={project.image} alt="" style={{ objectPosition: project.imagePosition }} />
          </div>
        </div>
      </section>

      <section className="detail-body page-shell">
        <article className="target-cursor-hit">
          <h2>Project Narrative</h2>
          <p>{project.detail}</p>
        </article>
        <article className="target-cursor-hit">
          <h2>Outcomes</h2>
          <ul className="outcome-list">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </article>
        <aside className="tag-panel target-cursor-hit">
          <span className="section-label">Tags</span>
          <div>
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </aside>
      </section>

      {project.media ? (
        <section className="project-media-section page-shell" aria-labelledby="project-media-title">
          <div className="project-media-section__heading">
            <span className="section-label">Media archive</span>
            <h2 id="project-media-title">Test footage and supporting project images.</h2>
          </div>

          <div className="project-media-grid">
            {project.media.map((item) => (
              <figure className="project-media-card target-cursor-hit" key={item.title}>
                {item.type === 'video' ? (
                  <video src={item.src} controls poster={item.poster} preload="metadata" playsInline />
                ) : (
                  <img src={item.src} alt="" style={{ objectPosition: item.imagePosition }} />
                )}
                <figcaption>
                  {item.type === 'video' ? <Play size={15} aria-hidden="true" /> : null}
                  <strong>{item.title}</strong>
                  <span>{item.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}

function NotFoundDetail({ title }) {
  return (
    <main className="detail-page">
      <section className="detail-hero page-shell">
        <Link className="back-link" to="/">
          <ArrowLeft size={17} aria-hidden="true" />
          Back home
        </Link>
        <h1>{title}</h1>
      </section>
    </main>
  )
}
