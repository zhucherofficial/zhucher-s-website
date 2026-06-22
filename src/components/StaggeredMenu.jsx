import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import './StaggeredMenu.css'

const DEFAULT_LAYER_COLORS = ['#ff8d61', '#d6ed6f', '#8be7dc', '#eef5f4']

function isModifiedClick(event) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0
}

export function StaggeredMenu({
  position = 'right',
  colors = DEFAULT_LAYER_COLORS,
  items = [],
  socialItems = [],
  activeIndex = 0,
  displaySocials = true,
  displayItemNumbering = true,
  className = '',
  accentColor = '#ff5e3a',
  closeOnClickAway = true,
  contactHref,
  contactLabel = 'Email',
  onNavigate,
  onMenuOpen,
  onMenuClose,
}) {
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)
  const panelRef = useRef(null)
  const preLayersRef = useRef(null)
  const preLayerElsRef = useRef([])
  const openTimelineRef = useRef(null)
  const closeTweenRef = useRef(null)

  const layerColors = useMemo(() => {
    const raw = colors.length ? colors.slice(0, 4) : DEFAULT_LAYER_COLORS
    if (raw.length < 3) return raw

    const layered = [...raw]
    layered.splice(Math.floor(layered.length / 2), 1)
    return layered
  }, [colors])

  const setMenuOpen = useCallback(
    (nextOpen) => {
      if (openRef.current === nextOpen) return

      openRef.current = nextOpen
      setOpen(nextOpen)

      if (nextOpen) {
        onMenuOpen?.()
      } else {
        onMenuClose?.()
      }
    },
    [onMenuClose, onMenuOpen],
  )

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
  }, [setMenuOpen])

  const toggleMenu = useCallback(() => {
    setMenuOpen(!openRef.current)
  }, [setMenuOpen])

  useLayoutEffect(() => {
    const panel = panelRef.current
    const preLayers = preLayersRef.current
      ? Array.from(preLayersRef.current.querySelectorAll('.staggered-menu__prelayer'))
      : []

    if (!panel) return undefined

    preLayerElsRef.current = preLayers
    const offscreen = position === 'left' ? -100 : 100
    gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 })
    gsap.set(panel.querySelectorAll('.staggered-menu__item-label'), { yPercent: 140, rotate: 8 })
    gsap.set(panel.querySelectorAll('.staggered-menu__social-link, .staggered-menu__contact'), {
      y: 22,
      opacity: 0,
    })

    return () => {
      openTimelineRef.current?.kill()
      closeTweenRef.current?.kill()
    }
  }, [items.length, position, socialItems.length])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    const layers = preLayerElsRef.current
    const offscreen = position === 'left' ? -100 : 100
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const layerDuration = reducedMotion ? 0.01 : 0.48
    const panelDuration = reducedMotion ? 0.01 : 0.68
    const itemDuration = reducedMotion ? 0.01 : 0.9

    openTimelineRef.current?.kill()
    closeTweenRef.current?.kill()

    if (open) {
      const itemLabels = Array.from(panel.querySelectorAll('.staggered-menu__item-label'))
      const numberedItems = Array.from(
        panel.querySelectorAll('.staggered-menu__list[data-numbering] .staggered-menu__item'),
      )
      const socialLinks = Array.from(panel.querySelectorAll('.staggered-menu__social-link'))
      const contactLink = panel.querySelector('.staggered-menu__contact')

      gsap.set([panel, ...layers], { xPercent: offscreen, opacity: 1 })
      gsap.set(itemLabels, { yPercent: 140, rotate: 8 })
      gsap.set(numberedItems, { '--sm-num-opacity': 0 })
      gsap.set([...socialLinks, contactLink].filter(Boolean), { y: 22, opacity: 0 })

      const timeline = gsap.timeline()
      layers.forEach((layer, index) => {
        timeline.to(
          layer,
          { xPercent: 0, duration: layerDuration, ease: 'power4.out' },
          index * 0.07,
        )
      })

      const panelStart = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0
      timeline.to(panel, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelStart)

      timeline.to(
        itemLabels,
        {
          yPercent: 0,
          rotate: 0,
          duration: itemDuration,
          ease: 'power4.out',
          stagger: reducedMotion ? 0 : 0.085,
        },
        panelStart + panelDuration * 0.18,
      )

      timeline.to(
        numberedItems,
        {
          '--sm-num-opacity': 1,
          duration: reducedMotion ? 0.01 : 0.42,
          ease: 'power2.out',
          stagger: reducedMotion ? 0 : 0.06,
        },
        panelStart + panelDuration * 0.28,
      )

      timeline.to(
        [...socialLinks, contactLink].filter(Boolean),
        {
          y: 0,
          opacity: 1,
          duration: reducedMotion ? 0.01 : 0.48,
          ease: 'power3.out',
          stagger: reducedMotion ? 0 : 0.07,
        },
        panelStart + panelDuration * 0.48,
      )

      openTimelineRef.current = timeline
      return
    }

    closeTweenRef.current = gsap.to([panel, ...layers], {
      xPercent: offscreen,
      duration: reducedMotion ? 0.01 : 0.34,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        gsap.set(panel.querySelectorAll('.staggered-menu__item-label'), {
          yPercent: 140,
          rotate: 8,
        })
        gsap.set(
          panel.querySelectorAll('.staggered-menu__social-link, .staggered-menu__contact'),
          { y: 22, opacity: 0 },
        )
      },
    })
  }, [open, position])

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeMenu, open])

  const handleNavClick = (event, href) => {
    if (isModifiedClick(event)) return

    event.preventDefault()
    onNavigate?.(href)
    closeMenu()
  }

  const panel = (
    <div
      className="staggered-menu__portal"
      data-open={open || undefined}
      data-position={position}
      style={{ '--sm-accent': accentColor }}
    >
      <button
        className="staggered-menu__scrim"
        type="button"
        aria-label="Close menu"
        tabIndex={open && closeOnClickAway ? 0 : -1}
        onClick={closeOnClickAway ? closeMenu : undefined}
      />
      <div ref={preLayersRef} className="staggered-menu__prelayers" aria-hidden="true">
        {layerColors.map((color) => (
          <div className="staggered-menu__prelayer" key={color} style={{ background: color }} />
        ))}
      </div>
      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu__panel"
        aria-hidden={!open}
        aria-label="Site menu"
      >
        <div className="staggered-menu__panel-brand" aria-hidden="true">
          <span className="staggered-menu__brand-glyph">ZE</span>
          <span>Physics Engineering</span>
        </div>

        <nav aria-label="Menu navigation">
          <ul
            className="staggered-menu__list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items.map((item, index) => (
              <li className="staggered-menu__item-wrap" key={item.href}>
                <a
                  className={`staggered-menu__item ${activeIndex === index ? 'is-active' : ''}`}
                  href={item.href}
                  aria-label={item.ariaLabel ?? `Go to ${item.label}`}
                  tabIndex={open ? 0 : -1}
                  onClick={(event) => handleNavClick(event, item.href)}
                >
                  <span className="staggered-menu__item-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {displaySocials && socialItems.length > 0 ? (
          <div className="staggered-menu__socials">
            <p className="staggered-menu__social-title">Socials</p>
            <ul className="staggered-menu__social-list" role="list">
              {socialItems.map((item) => (
                <li key={item.href}>
                  <a
                    className="staggered-menu__social-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={open ? 0 : -1}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {contactHref ? (
          <a className="staggered-menu__contact" href={contactHref} tabIndex={open ? 0 : -1}>
            {contactLabel}
          </a>
        ) : null}
      </aside>
    </div>
  )

  return (
    <div
      className={`staggered-menu ${className}`.trim()}
      data-open={open || undefined}
      style={{ '--sm-accent': accentColor }}
    >
      <button
        className="staggered-menu__toggle"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="staggered-menu-panel"
        onClick={toggleMenu}
      >
        <span className="staggered-menu__toggle-text" aria-hidden="true">
          <span className="staggered-menu__toggle-text-inner">
            <span>Menu</span>
            <span>Close</span>
          </span>
        </span>
        <span className="staggered-menu__icon" aria-hidden="true">
          <span className="staggered-menu__icon-line" />
          <span className="staggered-menu__icon-line staggered-menu__icon-line--vertical" />
        </span>
      </button>
      {typeof document !== 'undefined' ? createPortal(panel, document.body) : null}
    </div>
  )
}

export default StaggeredMenu
