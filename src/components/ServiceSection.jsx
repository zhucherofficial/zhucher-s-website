import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { serviceProjects } from '../data/siteData'
import Folder from './Folder'
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
      <SectionHeading
        label="Public Service"
        title="Physics outreach as a bridge between technical study and broader access."
        copy="The service section starts with a clear content page, then can grow into a real resource library."
      />

      <div className="service-grid">
        {serviceProjects.map((service, index) => (
          <article className="service-card service-card--folder" key={service.id}>
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
