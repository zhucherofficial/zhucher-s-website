import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { profile } from '../data/siteData'
import DecryptedText from './DecryptedText'
import { SectionHeading } from './SectionHeading'

const FluidGlass = lazy(() => import('./FluidGlass'))

export function ProfileSection() {
  return (
    <section className="profile-section page-shell" id="experience">
      <div className="profile-fluid-field" aria-hidden="true">
        <span className="profile-fluid-field__wave profile-fluid-field__wave--a" />
        <span className="profile-fluid-field__wave profile-fluid-field__wave--b" />
      </div>
      <Suspense fallback={null}>
        <FluidGlass className="profile-fluid-glass" mode="bar" />
      </Suspense>

      <SectionHeading
        label="Personal Experience"
        title="A technical profile built from research, competitions, and hands-on engineering."
        copy="This first version keeps unknown personal details explicit so later updates can replace them with confirmed contact information."
      />

      <div className="profile-layout">
        <Link className="profile-portrait profile-portrait--link" to="/experience" aria-label="Open full experience timeline">
          <img src={profile.portrait} alt="Portrait" />
          <span className="profile-portrait__glass profile-portrait__glass--top" aria-hidden="true" />
          <span className="profile-portrait__glass profile-portrait__glass--bottom" aria-hidden="true" />
        </Link>

        <div className="profile-copy">
          <span className="profile-copy__glass-edge" aria-hidden="true" />
          <p className="lead-copy">{profile.intro}</p>
          <p>{profile.statement}</p>

          <p className="profile-mantra" aria-label="Every invention starts small">
            <DecryptedText
              text="every invention starts small"
              animateOn="view"
              replayOnView
              sequential
              revealDirection="center"
              speed={42}
              characters="01<>/{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              parentClassName="profile-mantra__text"
              className="profile-mantra__revealed"
              encryptedClassName="profile-mantra__encrypted"
            />
          </p>
        </div>
      </div>
    </section>
  )
}
