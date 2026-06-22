import { Link } from 'react-router-dom'
import { profile } from '../data/siteData'
import DecryptedText from './DecryptedText'
import PixelSnow from './PixelSnow'
import { SectionHeading } from './SectionHeading'

export function ProfileSection() {
  return (
    <section className="profile-section page-shell" id="experience">
      <PixelSnow
        className="section-pixel-snow section-pixel-snow--profile"
        color="#f7fbff"
        flakeSize={0.01}
        minFlakeSize={1.34}
        pixelResolution={170}
        speed={0.92}
        density={0.82}
        direction={118}
        brightness={1.2}
        depthFade={11}
        farPlane={22}
        variant="snowflake"
      />

      <SectionHeading
        label="Personal Experience"
        title="A technical profile built from research, competitions, and hands-on engineering."
        copy="This first version keeps unknown personal details explicit so later updates can replace them with confirmed contact information."
      />

      <div className="profile-layout">
        <Link
          className="profile-portrait profile-portrait--link target-cursor-hit"
          to="/experience"
          aria-label="Open full experience timeline"
        >
          <img src={profile.portrait} alt="Portrait" />
          <span className="profile-portrait__glass profile-portrait__glass--top" aria-hidden="true" />
          <span className="profile-portrait__glass profile-portrait__glass--bottom" aria-hidden="true" />
        </Link>

        <div className="profile-copy target-cursor-hit">
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
