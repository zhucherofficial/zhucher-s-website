import { ArrowLeft, Clock, HandHeart } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getServiceById } from '../data/siteData'

export function ServiceDetailPage() {
  const { id } = useParams()
  const service = getServiceById(id)

  if (!service) {
    return (
      <main className="detail-page page-shell">
        <h1>Service page not found</h1>
      </main>
    )
  }

  return (
    <main className="detail-page">
      <section className="service-detail page-shell">
        <Link className="back-link" to="/#service">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to service
        </Link>

        <div className="service-detail__hero">
          <div className="service-detail__icon">
            <HandHeart size={42} aria-hidden="true" />
          </div>
          <div>
            <span className="section-label">{service.period}</span>
            <h1>{service.title}</h1>
            <p>{service.detail}</p>
            <div className="detail-meta">
              <span>
                <Clock size={17} aria-hidden="true" />
                {service.commitment}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-body detail-body--single">
          <article>
            <h2>Planned Impact</h2>
            <ul className="outcome-list">
              {service.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  )
}
