import { experiences } from '../data/siteData'

export function ExperienceTimeline() {
  return (
    <div className="timeline-panel">
      {experiences.map((item) => (
        <article className="timeline-item" key={item.title}>
          <time>{item.year}</time>
          <div>
            <h3>{item.title}</h3>
            <span>{item.meta}</span>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
