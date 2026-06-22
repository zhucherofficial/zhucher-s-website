import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceProjects } from '../data/siteData'
import Folder from './Folder'
import { ReactBitsBackdrop } from './ReactBitsBackdrop'
import { SectionHeading } from './SectionHeading'

const buildFolderItems = (service) => [
  <div className="service-folder-paper" key="introduction">
    <span>Introduction</span>
    <strong>{service.title}</strong>
    <p>{service.summary}</p>
  </div>,
  <div className="service-folder-paper" key="resources">
    <span>Resources</span>
    <strong>{service.role}</strong>
    <p>{service.outcomes[0]}</p>
  </div>,
]

export function ServiceSection() {
  return (
    <section className="service-section page-shell" id="service">
      <ReactBitsBackdrop
        className="section-atmosphere section-atmosphere--service"
        variant="dotfield"
        palette={['#8be7dc', '#d6ed6f', '#ff8d61']}
        density={0.76}
        subtle
      />
      <SectionHeading
        label="Public Service"
        title="Public service boards for science access and early confidence."
        copy="The service pages are designed as resource paths, not just activity summaries."
      />

      <div className="service-grid">
        {serviceProjects.map((service, index) => (
          <article className="service-card service-card--folder target-cursor-hit" key={service.id}>
            <ReactBitsBackdrop
              variant={index === 0 ? 'pixelsnow' : 'particles'}
              palette={index === 0 ? ['#eef5f4', '#8be7dc', '#d6ed6f'] : ['#8be7dc', '#ff8d61', '#d6ed6f']}
              density={0.42}
              subtle
            />
            <div className="service-folder-stage" aria-label={`${service.title} folder`}>
              <Folder
                className="service-folder"
                color={index === 0 ? '#74d9cf' : '#d6ed6f'}
                size={2.45}
                items={buildFolderItems(service)}
              />
            </div>
            <div className="service-folder-copy">
              <span>{service.period}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <Link className="service-folder-link" to={`/service/${service.id}`}>
                Open page
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
