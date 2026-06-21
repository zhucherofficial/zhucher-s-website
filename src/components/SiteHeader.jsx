import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Mail } from 'lucide-react'
import { navItems, profile } from '../data/siteData'
import GooeyNav from './GooeyNav'

function getActiveNavIndex(pathname, hash) {
  if (pathname === '/experience') {
    return navItems.findIndex((item) => item.href === '/#experience')
  }

  const exactIndex = navItems.findIndex((item) => item.href === `${pathname}${hash}`)
  if (exactIndex >= 0) return exactIndex

  if (pathname === '/' && hash === '') return 0

  const routeIndex = navItems.findIndex((item) => {
    if (item.href.startsWith('/#')) return false
    return item.href !== '/' && pathname.startsWith(item.href)
  })

  return routeIndex >= 0 ? routeIndex : 0
}

export function SiteHeader({ floating = false }) {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const activeIndex = getActiveNavIndex(pathname, hash)
  const paperHeader = pathname.startsWith('/club/')

  return (
    <header
      className={`site-header ${floating ? 'site-header--floating' : ''} ${
        paperHeader ? 'site-header--paper' : ''
      }`}
    >
      <Link className="brand-mark" to="/" aria-label="Go to homepage">
        <span className="brand-mark__glyph">ZE</span>
        <span className="brand-mark__text">Physics Engineering</span>
      </Link>

      <div className="nav-links">
        <GooeyNav
          items={navItems}
          initialActiveIndex={activeIndex}
          particleCount={12}
          particleDistances={[58, 8]}
          particleR={72}
          animationTime={520}
          timeVariance={220}
          colors={[1, 2, 3, 1, 3, 4, 2, 1]}
          onNavigate={(href) => navigate(href)}
        />
      </div>

      <a className="contact-button" href={`mailto:${profile.email}`}>
        <Mail size={16} aria-hidden="true" />
        Contact
        <ArrowUpRight size={15} aria-hidden="true" />
      </a>
    </header>
  )
}
