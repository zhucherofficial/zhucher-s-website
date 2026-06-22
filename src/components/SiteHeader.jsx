import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navItems, profile } from '../data/siteData'
import StaggeredMenu from './StaggeredMenu'

function getActiveNavIndex(pathname, hash) {
  if (pathname === '/experience') {
    return navItems.findIndex((item) => item.href === '/#experience')
  }

  if (pathname.startsWith('/projects/')) {
    return navItems.findIndex((item) => item.href === '/#projects')
  }

  if (pathname.startsWith('/service/')) {
    return navItems.findIndex((item) => item.href === '/service/physics-education')
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
  const menuItems = navItems.map((item) => ({
    ...item,
    ariaLabel: `Go to ${item.label}`,
  }))
  const socialItems = profile.socials.map((item) => ({
    label: item.label,
    href: item.href,
  }))

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

      <StaggeredMenu
        className="site-header__menu"
        items={menuItems}
        socialItems={socialItems}
        activeIndex={activeIndex}
        colors={['#ff8d61', '#d6ed6f', '#8be7dc', '#eef5f4']}
        accentColor="#ff5e3a"
        contactHref={`mailto:${profile.email}`}
        contactLabel="Contact by email"
        onNavigate={(href) => navigate(href)}
      />
    </header>
  )
}
