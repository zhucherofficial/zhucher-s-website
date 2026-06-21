import { ArrowUpRight, Mail, MapPin } from 'lucide-react'
import { profile } from '../data/siteData'
import BounceCards from './BounceCards'
import { SocialIcon } from './SocialIcon'

export function ContactFinale() {
  const contactCards = [
    {
      id: 'email',
      href: `mailto:${profile.email}`,
      content: (
        <span className="contact-card contact-card--email">
          <span className="contact-card__icon">
            <Mail size={18} aria-hidden="true" />
          </span>
          <span>
            <strong>Email</strong>
            <small>{profile.email}</small>
          </span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      ),
    },
    ...profile.socials.map((social) => ({
      id: social.id,
      href: social.href,
      external: true,
      content: (
        <span className="contact-card">
          <span className={`contact-card__icon contact-card__icon--${social.id}`}>
            <SocialIcon id={social.id} />
          </span>
          <span>
            <strong>{social.label}</strong>
            <small>{social.handle}</small>
          </span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </span>
      ),
    })),
  ]

  return (
    <section className="contact-finale" id="contact">
      <div className="page-shell finale-inner">
        <div>
          <span className="section-label">Contact</span>
          <h2>Let the next version become more concrete.</h2>
          <p>
            This foundation is ready for real portraits, club logos, project screenshots, videos,
            and confirmed contact details.
          </p>
        </div>

        <div className="finale-actions">
          <BounceCards
            className="contact-bounce-cards"
            cards={contactCards}
            containerWidth={460}
            containerHeight={300}
            animationDelay={0.2}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.56)"
            transformStyles={[
              'rotate(-7deg) translate(-92px, -58px)',
              'rotate(4deg) translate(84px, -40px)',
              'rotate(-3deg) translate(-78px, 68px)',
              'rotate(7deg) translate(90px, 74px)',
            ]}
            enableHover
          />
          <span className="finale-location">
            <MapPin size={18} aria-hidden="true" />
            {profile.location}
          </span>
        </div>
      </div>
    </section>
  )
}
