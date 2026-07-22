import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, FlaskConical, Music2, Volume2, VolumeX, X } from 'lucide-react'
import gsap from 'gsap'
import { experiences, honors, profile } from '../data/siteData'
import { GuitarSelector } from './GuitarSelector'
import './PortfolioScene.css'

const loadPhysicsFormulaRings = () =>
  import('./PhysicsFormulaRings').then((module) => ({ default: module.PhysicsFormulaRings }))
const PhysicsFormulaRings = lazy(loadPhysicsFormulaRings)

const HOME_STATES = {
  DRAWING: 'drawing',
  GATE: 'gate',
  POWERING: 'powering',
  MAIN: 'main',
  ABOUT_BIO: 'about-bio',
  ABOUT_MORE: 'about-more',
  GUITAR: 'guitar',
  FOLDER: 'folder',
  ROUTING: 'routing',
}

function sceneReducer(state, action) {
  switch (action.type) {
    case 'INTRO_DONE':
      return { ...state, view: HOME_STATES.GATE }
    case 'POWER':
      return { ...state, view: HOME_STATES.POWERING }
    case 'POWERED':
      return { ...state, view: HOME_STATES.MAIN }
    case 'OPEN_BIO':
      return { ...state, view: HOME_STATES.ABOUT_BIO }
    case 'OPEN_MORE':
      return { ...state, view: HOME_STATES.ABOUT_MORE, aboutPanel: 'honors' }
    case 'ABOUT_PANEL':
      return { ...state, aboutPanel: action.panel }
    case 'OPEN_GUITAR':
      return { ...state, view: HOME_STATES.GUITAR }
    case 'OPEN_FOLDER':
      return { ...state, view: HOME_STATES.FOLDER }
    case 'ROUTING':
      return { ...state, view: HOME_STATES.ROUTING }
    case 'BACK':
      if (state.view === HOME_STATES.ABOUT_MORE) return { ...state, view: HOME_STATES.ABOUT_BIO }
      return { ...state, view: HOME_STATES.MAIN }
    default:
      return state
  }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function CircuitBoard({ disabled = false, view, onPower, onOpenAbout }) {
  const rootRef = useRef(null)
  const isGate = view === HOME_STATES.DRAWING || view === HOME_STATES.GATE
  const isMain = view === HOME_STATES.MAIN

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || view !== HOME_STATES.DRAWING) return undefined

    const context = gsap.context(() => {
      const construction = gsap.utils.toArray('.ken-pcb__construction > *', root)
      const perimeter = gsap.utils.toArray('.ken-pcb__outline > *', root)
      const oled = gsap.utils.toArray('.ken-pcb__oled > *', root)
      const traces = gsap.utils.toArray('.ken-pcb__traces > *', root)
      const paint = gsap.utils.toArray('.ken-pcb__paint > *', root)
      const componentGroups = gsap.utils.toArray('.ken-pcb__components > g', root)
      const drawTargets = [...construction, ...perimeter, ...oled, ...traces]
      componentGroups.forEach((group) => drawTargets.push(...group.children))

      gsap.set(drawTargets, {
        autoAlpha: 0,
        strokeDasharray: 1,
        strokeDashoffset: 1,
      })
      gsap.set(paint, {
        autoAlpha: 0,
        strokeDasharray: 1,
        strokeDashoffset: 1,
      })

      const timeline = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      timeline.to(construction[0], { autoAlpha: 1, strokeDashoffset: 0, duration: 0.72 }, 0.05)
      timeline.to(construction[1], { autoAlpha: 1, strokeDashoffset: 0, duration: 0.72 }, 0.45)
      timeline.to(perimeter, { autoAlpha: 1, strokeDashoffset: 0, duration: 0.5, stagger: 0.055 }, 1.14)
      timeline.to(oled, { autoAlpha: 1, strokeDashoffset: 0, duration: 0.42, stagger: 0.045 }, 1.45)
      timeline.to(traces, { autoAlpha: 1, strokeDashoffset: 0, duration: 0.38, stagger: 0.065 }, 1.86)

      componentGroups.forEach((group, index) => {
        timeline.to(
          [...group.children],
          { autoAlpha: 1, strokeDashoffset: 0, duration: 0.28, stagger: 0.025 },
          2.02 + index * 0.12,
        )
      })

      timeline.to(
        paint,
        { autoAlpha: 0.96, strokeDashoffset: 0, duration: 0.42, stagger: 0.055 },
        2.58,
      )
    }, root)

    return () => context.revert()
  }, [view])

  return (
    <div className="ken-pcb" data-view={view} ref={rootRef}>
      <svg viewBox="0 0 720 500" role="img" aria-label="Hand-drawn green circuit board with an OLED screen, integrated circuit, pin header, resistor, LED, connector, and traces">
        <g className="ken-pcb__construction" aria-hidden="true">
          <path pathLength="1" d="M34 78C174 22 462 18 675 83M19 409C221 489 510 472 703 393" />
          <path pathLength="1" d="M71 22C39 151 47 337 86 472M642 25C688 162 681 354 631 479" />
        </g>
        <g className="ken-pcb__paint" aria-hidden="true">
          <path pathLength="1" d="M88 102H635" />
          <path pathLength="1" d="M69 160H661" />
          <path pathLength="1" d="M73 221H650" />
          <path pathLength="1" d="M60 286H667" />
          <path pathLength="1" d="M73 347H650" />
          <path pathLength="1" d="M92 407H625" />
          <path pathLength="1" d="M129 449H578" />
        </g>
        <g className="ken-pcb__outline ken-pcb__draw">
          <path pathLength="1" d="M72 56L650 48L680 76L667 431L625 460L76 452L45 419L51 91Z" />
          <circle pathLength="1" cx="83" cy="91" r="15" />
          <circle pathLength="1" cx="641" cy="84" r="15" />
          <circle pathLength="1" cx="90" cy="418" r="15" />
          <circle pathLength="1" cx="627" cy="420" r="15" />
        </g>
        <g className="ken-pcb__traces ken-pcb__draw" aria-hidden="true">
          <path pathLength="1" d="M125 126H181V162H232M125 354H181V310H240M480 125H548V165H610M475 361H548V316H620" />
          <path pathLength="1" d="M250 102V143H292M427 103V145H386M251 399V361H295M432 402V360H389" />
          <path pathLength="1" d="M109 234H186V257H248M476 247H535V218H622" />
          {[132, 180, 228, 276, 324, 372].map((x) => <circle pathLength="1" key={x} cx={x} cy="426" r="5" />)}
        </g>
        <g className="ken-pcb__oled ken-pcb__draw">
          <path pathLength="1" d="M188 129L517 124L535 146L525 321L500 339L190 334L171 312L174 151Z" />
          <rect pathLength="1" x="197" y="153" width="310" height="155" rx="5" />
          <circle pathLength="1" cx="188" cy="143" r="5" /><circle pathLength="1" cx="518" cy="140" r="5" />
          <circle pathLength="1" cx="187" cy="321" r="5" /><circle pathLength="1" cx="513" cy="322" r="5" />
        </g>
        <g className="ken-pcb__components ken-pcb__draw" aria-hidden="true">
          <g className="ken-pcb__ic">
            <rect pathLength="1" x="273" y="360" width="148" height="55" rx="4" />
            {[0, 1, 2, 3, 4, 5, 6].map((index) => <path key={`t-${index}`} pathLength="1" d={`M${285 + index * 20} 360V347`} />)}
            {[0, 1, 2, 3, 4, 5, 6].map((index) => <path key={`b-${index}`} pathLength="1" d={`M${285 + index * 20} 415V429`} />)}
            <circle pathLength="1" cx="290" cy="376" r="4" />
          </g>
          <g className="ken-pcb__header">
            <rect pathLength="1" x="102" y="178" width="35" height="132" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => <circle pathLength="1" key={index} cx="119" cy={190 + index * 15} r="4" />)}
          </g>
          <g className="ken-pcb__resistor">
            <path pathLength="1" d="M82 353H101M158 353H184" />
            <rect pathLength="1" x="101" y="340" width="57" height="26" rx="9" />
            <path pathLength="1" d="M116 341V365M128 341V365M142 341V365" />
          </g>
          <g className="ken-pcb__connector">
            <path pathLength="1" d="M625 164H687V224H625Z" />
            <path pathLength="1" d="M641 178H687M641 210H687" />
          </g>
          <g className="ken-pcb__led">
            <circle pathLength="1" cx="475" cy="391" r="13" />
            <path pathLength="1" d="M475 378V404M462 391H488" />
          </g>
        </g>
      </svg>

      <div className="ken-pcb__screen" aria-live="polite">
        {isGate ? <span className="ken-pcb__power-label">CLICK TO POWER ON</span> : null}
        {!isGate ? (
          <div className="ken-pcb__identity">
            <strong>I'm Ken! <span>(he/him)</span></strong>
            <span>I am an experimentalist</span>
            <span>I build playful things<b aria-hidden="true">_</b></span>
          </div>
        ) : null}
      </div>

      {isGate ? (
        <button className="ken-pcb__power-hit" type="button" onClick={onPower} disabled={view !== HOME_STATES.GATE}>
          <span>Power on Ken's portfolio</span>
        </button>
      ) : null}
      {isMain ? (
        <button className="ken-pcb__about-hit" type="button" onClick={onOpenAbout} disabled={disabled}>
          <span>ABOUT_KEN</span>
        </button>
      ) : null}
    </div>
  )
}

function MainGuitar() {
  return (
    <svg viewBox="0 0 760 380" aria-hidden="true">
      <g className="main-guitar__paint">
        <path d="M62 115C129 57 250 54 337 108" />
        <path d="M38 190C128 118 274 132 353 187" />
        <path d="M55 271C143 216 266 222 337 268" />
      </g>
      <g className="main-guitar__outline">
        <path d="M361 93C321 95 309 69 266 53C194 25 104 49 58 106C24 148 29 185 53 216C72 241 78 260 58 293C38 327 63 359 111 368C180 381 228 347 258 313C285 282 314 281 342 294C370 307 395 287 390 259C386 236 359 227 355 205C350 181 369 162 388 147C408 130 399 91 361 93Z" />
        <path d="M340 104L654 98L728 118V278L653 291L340 282Z" />
        <path d="M654 98C684 99 714 106 728 118V278C708 286 680 291 653 291Z" />
      </g>
      <path className="main-guitar__pickguard" d="M101 87C158 54 229 74 255 125C272 159 252 188 238 214C226 237 232 264 259 296C203 322 135 305 102 260C74 222 84 181 112 153C129 135 119 107 101 87Z" />
      <g className="main-guitar__pickups"><rect x="253" y="96" width="31" height="196" rx="13" /><rect x="308" y="93" width="42" height="201" rx="4" /></g>
      <g className="main-guitar__controls"><path d="M107 295C155 315 219 312 263 284L271 325C217 352 151 348 102 326Z" /><circle cx="163" cy="321" r="13" /><circle cx="224" cy="315" r="13" /></g>
      <g className="main-guitar__frets">{[390, 438, 488, 540, 594, 650].map((x) => <path key={x} d={`M${x} 102V286`} />)}</g>
      <g className="main-guitar__strings">{[120, 148, 176, 204, 232, 260].map((y) => <path key={y} d={`M78 ${y}H709`} />)}</g>
      <g className="main-guitar__tuners">{[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx="711" cy={126 + i * 27} r="7" />)}</g>
    </svg>
  )
}

function PhysicsFolderIcon() {
  return (
    <svg viewBox="0 0 330 220" aria-hidden="true">
      <g className="physics-folder__papers"><path d="M65 30L275 21L286 165L78 177Z" /><path d="M82 42L291 49L272 187L62 174Z" /></g>
      <path className="physics-folder__back" d="M29 68L126 65L148 87L304 82L288 194L34 202Z" />
      <path className="physics-folder__paint" d="M48 112C119 91 212 99 281 116M45 157C126 137 217 145 277 159M61 189C132 172 209 178 260 187" />
      <path className="physics-folder__front" d="M29 91L295 86L286 197L35 204Z" />
      <text x="72" y="158" transform="rotate(-2 72 158)">PHYSICS</text>
    </svg>
  )
}

function SelfConceptStack({ photos, onActivate }) {
  const [primaryPhoto, ...hiddenPhotos] = photos

  return (
    <div
      className="about-portrait"
      role="button"
      tabIndex={0}
      aria-label="Ken Zhang self-concept photo stack. Open it, if you dare."
      aria-haspopup="dialog"
      onClick={onActivate}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onActivate()
        }
      }}
    >
      {hiddenPhotos.map((photo, index) => (
        <div
          className={`about-photo about-photo--hidden about-photo--hidden-${index + 1}`}
          key={photo.src}
        >
          <img src={photo.src} alt={photo.alt} draggable="false" decoding="async" />
        </div>
      ))}
      <div className="about-photo about-photo--primary">
        <img src={primaryPhoto.src} alt={primaryPhoto.alt} draggable="false" decoding="async" />
      </div>
    </div>
  )
}

function WatchingYouOverlay({ meme, onClose, closeRef }) {
  return (
    <div
      className="watching-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="watching-warning"
      onClick={onClose}
    >
      <figure
        className="app-window watching-window"
        onClick={(event) => event.stopPropagation()}
      >
        <header><span /><span /><span /><figcaption>WARNING.exe</figcaption></header>
        <div className="watching-window__body">
          <img src={meme.src} alt={meme.alt} draggable="false" decoding="async" />
          <p className="watching-window__zh">{meme.warningZh}</p>
          <p className="watching-window__en" id="watching-warning">{meme.warningEn}</p>
          <button ref={closeRef} type="button" onClick={onClose}>OK, I GET IT</button>
        </div>
      </figure>
    </div>
  )
}

function SocialPlatformIcon({ id }) {
  if (id === 'bilibili') {
    return (
      <svg className="more-socials__platform-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7.4 4.8 5.7 3.1M16.6 4.8l1.7-1.7M5.6 7.2h12.8a2.8 2.8 0 0 1 2.8 2.8v6.2a3.4 3.4 0 0 1-3.4 3.4H6.2a3.4 3.4 0 0 1-3.4-3.4V10a2.8 2.8 0 0 1 2.8-2.8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.2 13h.1M15.7 13h.1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    )
  }

  if (id === 'douyin') {
    return (
      <svg className="more-socials__platform-icon more-socials__platform-icon--douyin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M15.2 3.5v10.1a5.2 5.2 0 1 1-3.9-5v3.2a2 2 0 1 0 1.2 1.8V3.5h2.7Z" stroke="#25f4ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.2 5.2c1 2.6 2.6 4.1 5.1 4.5" stroke="#fe2c55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg className="more-socials__platform-icon more-socials__platform-icon--youtube" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4.2 7.4a2.5 2.5 0 0 1 1.9-1.8C7.6 5.2 12 5.2 12 5.2s4.4 0 5.9.4a2.5 2.5 0 0 1 1.9 1.8c.4 1.5.4 4.6.4 4.6s0 3.1-.4 4.6a2.5 2.5 0 0 1-1.9 1.8c-1.5.4-5.9.4-5.9.4s-4.4 0-5.9-.4a2.5 2.5 0 0 1-1.9-1.8c-.4-1.5-.4-4.6-.4-4.6s0-3.1.4-4.6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m10.4 9.3 4.2 2.7-4.2 2.7V9.3Z" fill="currentColor" />
    </svg>
  )
}

function MoreAboutPage({ panel }) {
  if (panel === 'honors') {
    return (
      <div className="more-about__page" data-panel="honors">
        <p className="window-kicker">AWARDS / COMPETITIONS</p>
        <h3>Honors</h3>
        <ol>{honors.map((honor) => <li key={honor}>{honor}</li>)}</ol>
      </div>
    )
  }

  if (panel === 'field-notes') {
    return (
      <div className="more-about__page" data-panel="field-notes">
        <p className="window-kicker">EXPERIENCE / FIELD LOG</p>
        <h3>Field Notes</h3>
        <ol>
          {experiences.map((experience) => (
            <li key={experience.title}>
              <time>{experience.year}</time>
              <strong>{experience.title}</strong>
              <span>{experience.meta}</span>
              <p>{experience.description}</p>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <div className="more-about__page" data-panel="socials">
      <p className="window-kicker">BUILD LOGS / EXPERIMENT CLIPS</p>
      <h3>Socials</h3>
      <p className="more-socials__intro">
        Follow the workshop in motion: projects, physics, robotics, and everything between prototypes.
      </p>
      <ul className="more-socials" role="list">
        {profile.socials.map((social, index) => (
          <li key={social.id} data-platform={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${social.label}, ${social.handle} (opens in a new tab)`}
            >
              <span className="more-socials__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="more-socials__identity">
                <span className="more-socials__label">
                  <SocialPlatformIcon id={social.id} />
                  <strong>{social.id === 'youtube' ? 'YouTube' : social.label}</strong>
                </span>
                <span>{social.handle}</span>
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AboutWindows({ state, panel, dispatch, closeRef, onBack }) {
  const showMore = state === HOME_STATES.ABOUT_MORE
  const [showMeme, setShowMeme] = useState(false)
  const memeCloseRef = useRef(null)
  const openMeme = useCallback(() => setShowMeme(true), [])
  const closeMeme = useCallback(() => setShowMeme(false), [])

  useEffect(() => {
    if (!showMeme) return undefined
    memeCloseRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setShowMeme(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [showMeme])

  return (
    <div className={`about-desktop ${showMore ? 'about-desktop--more' : ''}`}>
      <button ref={closeRef} className="scene-close" type="button" onClick={onBack} aria-label="Close About Ken">
        <X aria-hidden="true" />
      </button>
      <section className="app-window app-window--bio" aria-labelledby="bio-title" inert={showMore}>
        <header><span /><span /><span /><h2 id="bio-title">Ken_Zhang.app</h2></header>
        <div className="app-window__bio-copy">
          <p>I'm a high school student who dreams of building awesome engineering projects and shipping them into the world.</p>
          <p>Together, let's create something that sparks - something that impresses your friends, your family, and maybe even society, and leaves people saying, "woah."</p>
          {!showMore ? <button type="button" onClick={() => dispatch({ type: 'OPEN_MORE' })}>MORE_ABOUT_ME</button> : null}
        </div>
      </section>

      {!showMore ? (
        <figure className="app-window app-window--portrait">
          <header><span /><span /><span /><figcaption>SELF_CONCEPT.jpg</figcaption></header>
          <SelfConceptStack photos={profile.selfConceptPhotos} onActivate={openMeme} />
        </figure>
      ) : null}

      {showMeme ? (
        <WatchingYouOverlay meme={profile.watchingYouMeme} onClose={closeMeme} closeRef={memeCloseRef} />
      ) : null}

      {showMore ? (
        <section className="app-window app-window--more" aria-labelledby="more-title">
          <header><span /><span /><span /><h2 id="more-title">MORE_ABOUT_KEN.app</h2></header>
          <div className="more-about__layout">
            <nav aria-label="More about Ken sections">
              <button aria-pressed={panel === 'honors'} className={panel === 'honors' ? 'is-active' : ''} type="button" onClick={() => dispatch({ type: 'ABOUT_PANEL', panel: 'honors' })}>HONORS</button>
              <button aria-pressed={panel === 'field-notes'} className={panel === 'field-notes' ? 'is-active' : ''} type="button" onClick={() => dispatch({ type: 'ABOUT_PANEL', panel: 'field-notes' })}>FIELD_NOTES</button>
              <button aria-pressed={panel === 'socials'} className={panel === 'socials' ? 'is-active' : ''} type="button" onClick={() => dispatch({ type: 'ABOUT_PANEL', panel: 'socials' })}>SOCIALS</button>
            </nav>
            <div className="more-about__content" aria-live="polite">
              <MoreAboutPage key={panel} panel={panel} />
            </div>
          </div>
        </section>
      ) : null}
    </div>
  )
}

function SiteCreditDialog({ onClose, closeRef }) {
  useEffect(() => {
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, closeRef])

  return (
    <div
      className="watching-overlay site-credit-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-credit-title"
      onClick={onClose}
    >
      <figure
        className="app-window site-credit-window"
        onClick={(event) => event.stopPropagation()}
      >
        <header><span /><span /><span /><figcaption id="site-credit-title">ABOUT_THIS_SITE.txt</figcaption></header>
        <div className="site-credit-window__body">
          <p>
            This site is inspired by bryantcodes.art, which is truly amazing. It stands out among
            today’s homogenized websites and genuinely makes me say "woah."
          </p>
          <p>
            A special thanks to the creator, Bryant, for contributing his code to the open-source
            community. His work has allowed me to study and create my own version inspired by this
            site. Thank you again.
          </p>
          <a
            className="site-credit-window__link"
            href="https://bryantcodes.art"
            target="_blank"
            rel="noreferrer"
          >
            VISIT_BRYANTCODES.ART
          </a>
          <button ref={closeRef} className="site-credit-window__close" type="button" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </figure>
    </div>
  )
}

function PhysicsFolder({ dispatch, closeRef, onBack }) {
  return (
    <section className="folder-scene" aria-labelledby="folder-title">
      <button ref={closeRef} className="scene-close" type="button" onClick={onBack} aria-label="Close Physics folder"><X aria-hidden="true" /></button>
      <div className="folder-scene__folder">
        <div className="folder-scene__tab"><h2 id="folder-title">PHYSICS_ARCHIVE</h2><span>02 SHEETS</span></div>
        <Link to="/physics-education" onClick={() => dispatch({ type: 'ROUTING' })}><span>01</span><strong>PHYSICS_EDU</strong><small>Resources and public learning</small></Link>
        <Link to="/physics-club" onClick={() => dispatch({ type: 'ROUTING' })}><span>02</span><strong>PHYSICS_CLUB</strong><small>Lectures, builds, and experiments</small></Link>
        <Link className="folder-scene__lab-link" to="/lab"><FlaskConical aria-hidden="true" />ENTER THE PIXEL LAB</Link>
      </div>
    </section>
  )
}

export function PortfolioScene({ initialView = null, returnFocusId = null }) {
  const [state, dispatch] = useReducer(
    sceneReducer,
    undefined,
    () => ({
      view: initialView === HOME_STATES.GUITAR
        ? HOME_STATES.GUITAR
        : prefersReducedMotion()
          ? HOME_STATES.GATE
          : HOME_STATES.DRAWING,
      aboutPanel: 'honors',
    }),
  )
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem('ken-site:sound:v1') === 'on')
  const [transitioning, setTransitioning] = useState(false)
  const [showSiteCredit, setShowSiteCredit] = useState(false)
  const sceneRef = useRef(null)
  const stageRef = useRef(null)
  const returnFocusRef = useRef(null)
  const closeRef = useRef(null)
  const siteCreditCloseRef = useRef(null)
  const previousViewRef = useRef(state.view)
  const transitionTimelineRef = useRef(null)

  const openSiteCredit = useCallback(() => setShowSiteCredit(true), [])
  const closeSiteCredit = useCallback(() => setShowSiteCredit(false), [])

  const openScene = useCallback((action, sourceSelector, rotation) => {
    if (transitioning) return

    const scene = sceneRef.current
    const stage = stageRef.current
    const selected = scene?.querySelector(sourceSelector)
    const reducedMotion = prefersReducedMotion()

    if (!scene || !stage || !selected || reducedMotion) {
      dispatch(action)
      return
    }

    const otherObjects = [...scene.querySelectorAll('.ken-pcb, .main-object')]
      .filter((element) => element !== selected)
    const rings = scene.querySelector('.portfolio-scene__rings')

    setTransitioning(true)
    transitionTimelineRef.current?.kill()
    const timeline = gsap.timeline({
      defaults: { overwrite: 'auto' },
      onComplete: () => {
        dispatch(action)
        setTransitioning(false)
      },
    })
    timeline.to(stage, { x: 0, y: 0, duration: 0.2, ease: 'power2.out' }, 0)
    timeline.to(otherObjects, {
        autoAlpha: 0,
        scale: 0.76,
        duration: 0.42,
        stagger: 0.045,
        ease: 'power3.inOut',
      }, 0)
    if (rings) timeline.to(rings, { autoAlpha: 0.35, duration: 0.38, ease: 'power2.out' }, 0)
    timeline.to(selected, {
        scale: 1.1,
        rotation,
        duration: 0.42,
        ease: 'back.out(1.8)',
      }, 0.04)
    timeline.to(selected, {
        autoAlpha: 0,
        scale: 1.42,
        duration: 0.26,
        ease: 'power3.in',
      }, 0.4)
    transitionTimelineRef.current = timeline
  }, [transitioning])

  const closeScene = useCallback(() => {
    if (transitioning) return
    if (state.view === HOME_STATES.ABOUT_MORE) {
      dispatch({ type: 'BACK' })
      return
    }

    const scene = sceneRef.current
    const selector = state.view === HOME_STATES.GUITAR
      ? '.portfolio-scene__guitar'
      : state.view === HOME_STATES.FOLDER
        ? '.folder-scene'
        : '.about-desktop'
    const target = scene?.querySelector(selector)

    if (!target || prefersReducedMotion()) {
      dispatch({ type: 'BACK' })
      return
    }

    setTransitioning(true)
    transitionTimelineRef.current?.kill()
    transitionTimelineRef.current = gsap.timeline({
      onComplete: () => {
        dispatch({ type: 'BACK' })
        setTransitioning(false)
      },
    }).to(target, {
      autoAlpha: 0,
      scale: 0.84,
      rotation: state.view === HOME_STATES.GUITAR ? -4 : 2,
      duration: 0.38,
      ease: 'power3.in',
    })
  }, [state.view, transitioning])

  useEffect(() => () => transitionTimelineRef.current?.kill(), [])

  useEffect(() => {
    if (state.view !== HOME_STATES.DRAWING) return undefined
    const timer = window.setTimeout(() => dispatch({ type: 'INTRO_DONE' }), 3450)
    return () => window.clearTimeout(timer)
  }, [state.view])

  useLayoutEffect(() => {
    const scene = sceneRef.current
    if (!scene) return undefined

    const overlaySelector = state.view === HOME_STATES.GUITAR
      ? '.portfolio-scene__guitar'
      : state.view === HOME_STATES.FOLDER
        ? '.folder-scene'
        : [HOME_STATES.ABOUT_BIO, HOME_STATES.ABOUT_MORE].includes(state.view)
          ? '.about-desktop'
          : null

    if (overlaySelector) {
      const overlay = scene.querySelector(overlaySelector)
      if (!overlay || prefersReducedMotion()) return undefined
      const context = gsap.context(() => {
        gsap.fromTo(
          overlay,
          { autoAlpha: 0, scale: 0.86, rotation: state.view === HOME_STATES.GUITAR ? 4 : -2 },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.66,
            ease: 'back.out(1.55)',
            clearProps: 'transform,opacity,visibility',
          },
        )
      }, scene)
      return () => context.revert()
    }

    if (state.view === HOME_STATES.MAIN) {
      const returningFromPower = previousViewRef.current === HOME_STATES.POWERING
      const objects = scene.querySelectorAll(returningFromPower ? '.main-object' : '.ken-pcb, .main-object')
      const rings = scene.querySelector('.portfolio-scene__rings')
      const context = gsap.context(() => {
        gsap.fromTo(
          objects,
          { autoAlpha: 0, scale: returningFromPower ? 0.7 : 0.78, rotation: returningFromPower ? -4 : 0 },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.64,
            stagger: 0.09,
            ease: 'back.out(1.6)',
            clearProps: 'transform,opacity,visibility',
          },
        )
        if (rings) gsap.fromTo(rings, { autoAlpha: 0.2 }, { autoAlpha: 0.82, duration: 0.55, clearProps: 'opacity,visibility' })
      }, scene)
      return () => context.revert()
    }

    return undefined
  }, [state.view])

  useEffect(() => {
    const stage = stageRef.current
    const scene = sceneRef.current
    if (!stage || !scene || state.view !== HOME_STATES.MAIN || transitioning) return undefined

    const canParallax = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canParallax) return undefined

    let frame = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let velocityX = 0
    let velocityY = 0

    const render = () => {
      velocityX = (velocityX + (targetX - currentX) * 0.032) * 0.86
      velocityY = (velocityY + (targetY - currentY) * 0.032) * 0.86
      currentX += velocityX
      currentY += velocityY
      stage.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`

      if (
        Math.abs(targetX - currentX) > 0.03
        || Math.abs(targetY - currentY) > 0.03
        || Math.abs(velocityX) > 0.02
        || Math.abs(velocityY) > 0.02
      ) {
        frame = window.requestAnimationFrame(render)
      } else {
        frame = 0
      }
    }

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 64
      targetY = (event.clientY / window.innerHeight - 0.5) * 38
      requestRender()
    }
    const settle = () => {
      targetX = 0
      targetY = 0
      requestRender()
    }

    scene.addEventListener('pointermove', handlePointerMove, { passive: true })
    scene.addEventListener('pointerleave', settle)
    window.addEventListener('blur', settle)

    return () => {
      scene.removeEventListener('pointermove', handlePointerMove)
      scene.removeEventListener('pointerleave', settle)
      window.removeEventListener('blur', settle)
      if (frame) window.cancelAnimationFrame(frame)
      stage.style.transform = ''
    }
  }, [state.view, transitioning])

  useEffect(() => {
    if (state.view !== HOME_STATES.POWERING) return undefined
    const timer = window.setTimeout(() => dispatch({ type: 'POWERED' }), 1600)
    return () => window.clearTimeout(timer)
  }, [state.view])

  useEffect(() => {
    if (state.view !== HOME_STATES.GATE) return undefined

    const preload = () => loadPhysicsFormulaRings().catch(() => undefined)
    if ('requestIdleCallback' in window) {
      const idle = window.requestIdleCallback(preload, { timeout: 1200 })
      return () => window.cancelIdleCallback(idle)
    }

    const timer = window.setTimeout(preload, 450)
    return () => window.clearTimeout(timer)
  }, [state.view])

  useEffect(() => {
    const wasMain = previousViewRef.current === HOME_STATES.MAIN
    const isOverlay = [HOME_STATES.ABOUT_BIO, HOME_STATES.ABOUT_MORE, HOME_STATES.GUITAR, HOME_STATES.FOLDER].includes(state.view)
    const frames = []
    if (wasMain && isOverlay) frames.push(window.requestAnimationFrame(() => closeRef.current?.focus()))
    if (state.view === HOME_STATES.MAIN && previousViewRef.current !== HOME_STATES.POWERING) frames.push(window.requestAnimationFrame(() => returnFocusRef.current?.focus()))
    previousViewRef.current = state.view
    return () => frames.forEach((frame) => window.cancelAnimationFrame(frame))
  }, [state.view])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key !== 'Escape') return
      if ([HOME_STATES.ABOUT_BIO, HOME_STATES.ABOUT_MORE, HOME_STATES.GUITAR, HOME_STATES.FOLDER].includes(state.view)) closeScene()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeScene, state.view])

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    localStorage.setItem('ken-site:sound:v1', next ? 'on' : 'off')
  }

  const handlePower = () => {
    dispatch({ type: 'POWER' })
    if (!soundOn) return
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    const context = new AudioContextClass()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.frequency.setValueAtTime(190, context.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(720, context.currentTime + 0.12)
    gain.gain.setValueAtTime(0.05, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.18)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start()
    oscillator.stop(context.currentTime + 0.18)
    oscillator.addEventListener('ended', () => context.close())
  }

  const showBoard = [HOME_STATES.DRAWING, HOME_STATES.GATE, HOME_STATES.POWERING, HOME_STATES.MAIN].includes(state.view)
  const showRings = [HOME_STATES.POWERING, HOME_STATES.MAIN, HOME_STATES.ABOUT_BIO, HOME_STATES.ABOUT_MORE, HOME_STATES.FOLDER].includes(state.view)
  const showToolbar = [HOME_STATES.DRAWING, HOME_STATES.GATE, HOME_STATES.POWERING, HOME_STATES.MAIN].includes(state.view)

  return (
    <main
      className={`portfolio-scene portfolio-scene--${state.view}`}
      data-transitioning={transitioning ? 'true' : 'false'}
      ref={sceneRef}
    >
      <svg className="portfolio-scene__scribbles" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M-30 169C188 28 313 206 497 105S798 3 987 111S1266 247 1471 103" />
        <path pathLength="1" d="M-52 711C129 591 291 806 483 693S805 611 1008 729S1294 829 1490 704" />
        <path pathLength="1" d="M96 18C187 182 35 294 147 432S305 673 176 912" />
      </svg>

      {showToolbar ? (
        <div className="portfolio-scene__toolbar">
          <div className="portfolio-scene__toolbar-left">
            <span>KEN_ZHANG // PORTFOLIO</span>
            <button
              className="portfolio-scene__about-site"
              type="button"
              onClick={openSiteCredit}
              aria-haspopup="dialog"
            >
              ABOUT_SITE
            </button>
          </div>
          <div><Link to="/lab">LAB</Link><button type="button" onClick={toggleSound} aria-label={soundOn ? 'Mute sound' : 'Enable sound'}>{soundOn ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}</button></div>
        </div>
      ) : null}

      {showSiteCredit ? <SiteCreditDialog onClose={closeSiteCredit} closeRef={siteCreditCloseRef} /> : null}

      {showRings ? <Suspense fallback={null}><PhysicsFormulaRings className="portfolio-scene__rings" /></Suspense> : null}

      <div className="portfolio-scene__stage" ref={stageRef}>
        {showBoard ? (
          <CircuitBoard
            disabled={transitioning}
            view={state.view}
            onPower={handlePower}
            onOpenAbout={() => openScene({ type: 'OPEN_BIO' }, '.ken-pcb', -7)}
          />
        ) : null}

        {state.view === HOME_STATES.MAIN ? (
          <div className="portfolio-scene__main-controls">
            <button
              ref={returnFocusRef}
              className="main-object main-object--guitar"
              type="button"
              disabled={transitioning}
              onClick={() => openScene({ type: 'OPEN_GUITAR' }, '.main-object--guitar', 6)}
            >
              <MainGuitar />
              <span className="main-object__label">PROJECT_STRINGS</span>
              <span className="main-guitar__notes" aria-hidden="true">
                <Music2 /><Music2 /><Music2 />
              </span>
            </button>
            <button
              className="main-object main-object--folder"
              type="button"
              disabled={transitioning}
              onClick={() => openScene({ type: 'OPEN_FOLDER' }, '.main-object--folder', -5)}
            >
              <PhysicsFolderIcon />
              <span className="main-object__label">PHYSICS_ARCHIVE</span>
            </button>
          </div>
        ) : null}
      </div>

      {state.view === HOME_STATES.GUITAR ? <GuitarSelector className="portfolio-scene__guitar" initialFocusId={returnFocusId} onBack={closeScene} /> : null}
      {state.view === HOME_STATES.FOLDER ? <PhysicsFolder dispatch={dispatch} closeRef={closeRef} onBack={closeScene} /> : null}
      {[HOME_STATES.ABOUT_BIO, HOME_STATES.ABOUT_MORE].includes(state.view) ? <AboutWindows state={state.view} panel={state.aboutPanel} dispatch={dispatch} closeRef={closeRef} onBack={closeScene} /> : null}

      {state.view === HOME_STATES.DRAWING ? <p className="portfolio-scene__drawing-status">INITIALIZING KEN_ZHANG...</p> : null}
      {state.view === HOME_STATES.POWERING ? <p className="portfolio-scene__drawing-status">POWERING EXPERIMENTS...</p> : null}
    </main>
  )
}
