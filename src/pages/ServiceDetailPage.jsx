import { ArrowLeft, Clock, HandHeart } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ReactBitsBackdrop } from '../components/ReactBitsBackdrop'
import { TargetCursor } from '../components/TargetCursor'
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
      <ReactBitsBackdrop
        variant="dotfield"
        palette={['#8be7dc', '#d6ed6f', '#ff8d61', '#eef5f4']}
        density={1.04}
      />
      <ReactBitsBackdrop
        className="detail-page__secondary-field"
        variant="pixelsnow"
        palette={['#eef5f4', '#8be7dc', '#d6ed6f']}
        density={0.82}
        subtle
      />
      <TargetCursor activeColor="#b497cf" color="#ffffff" spinDuration={2} />
      <section className="service-detail page-shell">
        <Link className="back-link target-cursor-hit" to="/#service">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to service
        </Link>

        <div className="service-detail__hero target-cursor-hit">
          <ReactBitsBackdrop
            variant="pixeltrail"
            palette={['#8be7dc', '#d6ed6f', '#ff8d61']}
            density={0.84}
            subtle
          />
          <div className="service-detail__icon">
            <HandHeart size={42} aria-hidden="true" />
          </div>
          <div>
            <span className="section-label">{service.period}</span>
            <h1>{service.title}</h1>
            <p>{service.detail}</p>
            <p className="service-detail__note">
              Built as a public-facing learning path: concept pages, vivid demonstrations, and
              contributor-ready materials.
            </p>
            <div className="detail-meta">
              <span>
                <Clock size={17} aria-hidden="true" />
                {service.commitment}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-body detail-body--single">
          <article className="target-cursor-hit">
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
