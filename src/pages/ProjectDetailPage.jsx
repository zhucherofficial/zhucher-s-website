import { ArrowLeft, Clock, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getProjectById } from '../data/siteData'

export function ProjectDetailPage() {
  const { id } = useParams()
  const project = getProjectById(id)

  if (!project) {
    return <NotFoundDetail title="Project not found" />
  }

  return (
    <main className="detail-page">
      <section className="detail-hero page-shell">
        <Link className="back-link" to="/#projects">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to projects
        </Link>
        <div className="detail-hero__grid">
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
          <img src={project.image} alt="" />
        </div>
      </section>

      <section className="detail-body page-shell">
        <article>
          <h2>Project Narrative</h2>
          <p>{project.detail}</p>
        </article>
        <article>
          <h2>Outcomes</h2>
          <ul className="outcome-list">
            {project.outcomes.map((outcome) => (
              <li key={outcome}>{outcome}</li>
            ))}
          </ul>
        </article>
        <aside className="tag-panel">
          <span className="section-label">Tags</span>
          <div>
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </aside>
      </section>
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
