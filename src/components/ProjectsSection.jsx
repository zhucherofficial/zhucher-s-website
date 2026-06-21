import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data/siteData'
import PixelCard from './PixelCard'
import { SectionHeading } from './SectionHeading'

const pixelPalettes = [
  '#8be7dc,#d6ed6f,#ff8d61,#ff5e3a',
  '#8be7dc,#94a3ff,#ff8d61,#eef5f4',
  '#d6ed6f,#ff8d61,#ffd166,#8be7dc',
  '#8be7dc,#ff8d61,#ff5e3a,#f5f0e8',
]

export function ProjectsSection() {
  return (
    <section className="projects-section page-shell" id="projects">
      <SectionHeading
        label="Selected Projects"
        title="Large-format project cards for the work that best explains the technical direction."
        copy="Each card opens a dedicated project page with role, timeline, outcomes, and tags."
      />

      <div className="project-grid">
        {projects.map((project, index) => (
          <PixelCard
            as={Link}
            className={`project-card project-card--${index + 1}`}
            key={project.id}
            to={`/projects/${project.id}`}
            variant="kinetic"
            gap={index === 0 ? 10 : 9}
            speed={index === 2 ? 62 : 46}
            colors={pixelPalettes[index % pixelPalettes.length]}
            aria-label={`Open project: ${project.title}`}
          >
            <div className="project-card__media">
              <img src={project.image} alt="" style={{ objectPosition: project.imagePosition }} />
            </div>
            <div className="project-card__content">
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="project-card__footer">
                <ArrowUpRight size={19} aria-hidden="true" />
              </div>
            </div>
          </PixelCard>
        ))}
      </div>
    </section>
  )
}
