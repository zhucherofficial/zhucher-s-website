import { lazy, Suspense, useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { projects } from '../data/siteData'
import { projectStringManifest } from '../data/projectManifest'
import { GuitarPickCursor } from './GuitarPickCursor'
import './GuitarSelector.css'

const PhysicsFormulaRings = lazy(() =>
  import('./PhysicsFormulaRings').then((module) => ({ default: module.PhysicsFormulaRings })),
)

const STRING_POSITIONS = ['29.7%', '38.1%', '46.5%', '54.9%', '63.3%', '71.7%']

const projectById = new Map(projects.map((project) => [project.id, project]))

const strings = projectStringManifest.map((entry, index) => ({
  ...entry,
  index,
  project: entry.id ? projectById.get(entry.id) : null,
}))

function rectToPayload(rect) {
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width,
    x: rect.x,
    y: rect.y,
  }
}

export function GuitarSelector({
  active = true,
  className = '',
  id = 'projects',
  initialFocusId = null,
  onBack,
  onEmptyString,
  onRouteStart,
}) {
  const navigate = useNavigate()
  const headingId = useId()
  const scopeRef = useRef(null)
  const scrollRef = useRef(null)
  const [activeString, setActiveString] = useState(null)

  useEffect(() => {
    const scrollArea = scrollRef.current
    const narrowScreen = window.matchMedia('(max-width: 700px)')

    if (!scrollArea || !narrowScreen.matches) return undefined

    const frame = window.requestAnimationFrame(() => {
      scrollArea.scrollLeft = Math.min(112, scrollArea.scrollWidth - scrollArea.clientWidth)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!active || !initialFocusId || !scopeRef.current) return undefined
    const frame = window.requestAnimationFrame(() => {
      scopeRef.current?.querySelector(`[data-project-id="${initialFocusId}"]`)?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [active, initialFocusId])

  const emptyStringIsActive = activeString !== null && !strings[activeString]?.project

  const handleProjectClick = (event, slot) => {
    event.preventDefault()
    if (!active) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const payload = {
      accent: slot.accent,
      itemId: slot.project.id,
      mediaSrc: slot.project.image,
      origin: 'guitar',
      sourceRect: rectToPayload(rect),
    }

    if (onRouteStart?.(payload) === false) return

    navigate(slot.route, {
      state: {
        projectTransition: payload,
        returnScene: 'guitar',
      },
    })
  }

  const handleEmptyClick = (slot) => {
    if (!active) return
    setActiveString(slot.index)
    onEmptyString?.(slot.index + 1)
  }

  return (
    <section
      aria-hidden={!active}
      aria-labelledby={headingId}
      className={`guitar-selector ${active ? 'guitar-selector--active' : 'guitar-selector--inactive'} ${className}`.trim()}
      id={id}
      ref={scopeRef}
    >
      <GuitarPickCursor active={active} scopeRef={scopeRef} />
      <Suspense fallback={null}>
        <PhysicsFormulaRings active={active} className="guitar-selector__formula-rings" />
      </Suspense>
      <h2 className="guitar-selector__sr-only" id={headingId}>
        Projects guitar
      </h2>

      {onBack ? (
        <button className="guitar-selector__back" type="button" onClick={onBack}>
          <svg viewBox="0 0 64 36" aria-hidden="true">
            <path d="M30 3L6 18l24 15M8 18h51" />
          </svg>
          <span>Back</span>
        </button>
      ) : null}

      <div className="guitar-selector__scroll" ref={scrollRef}>
        <div className="guitar-selector__instrument">
          <svg
            className="guitar-selector__art"
            viewBox="0 0 1440 820"
            role="img"
            aria-label="A hand-drawn solid-body Telecaster guitar with two pickups, six strings, and six inline tuning pegs."
          >
            <g className="guitar-selector__construction" aria-hidden="true">
              <path d="M34 163C179 108 365 109 541 168M42 739C224 790 411 764 571 686" />
              <path d="M485 180C790 150 1112 167 1408 145M505 693C816 717 1129 700 1412 719" />
            </g>

            <g className="guitar-selector__neck-paint" aria-hidden="true">
              <path d="M534 251C785 235 1038 234 1318 248" />
              <path d="M525 356C790 345 1050 344 1320 354" />
              <path d="M523 462C786 451 1056 453 1322 462" />
              <path d="M524 568C799 561 1056 558 1324 569" />
              <path d="M530 648C801 643 1063 643 1320 649" />
            </g>

            <g className="guitar-selector__body-paint" aria-hidden="true">
              <path d="M104 237C222 164 394 169 532 230" />
              <path d="M75 342C202 269 410 278 574 334" />
              <path d="M77 450C221 376 418 389 590 445" />
              <path d="M80 559C215 486 413 499 598 554" />
              <path d="M118 670C249 614 405 619 535 652" />
              <path className="guitar-selector__body-paint-accent" d="M91 705C230 759 393 715 483 655" />
            </g>

            <g className="guitar-selector__outline">
              <path
                data-anatomy="solid-rounded-lower-bout-single-cutaway"
                d="M619 214C579 215 551 195 522 169C474 126 407 111 333 116C224 123 132 163 80 230C43 278 43 331 67 375C88 413 123 430 126 460C130 493 94 524 82 572C67 634 104 691 171 716C252 746 345 713 402 663C442 628 470 598 511 601C548 604 579 628 614 613C649 598 663 561 646 530C631 502 599 491 584 469C568 446 573 416 595 394C615 375 640 358 649 332C660 301 649 269 626 251C607 236 586 233 562 233L619 232Z"
              />
              <path d="M529 215L1280 201L1394 230L1400 670L1280 690L529 651Z" />
              <path className="guitar-selector__headstock" d="M1280 201C1323 200 1368 211 1394 230L1400 670C1369 684 1325 691 1280 690Z" />
              <path className="guitar-selector__body-highlight" d="M90 239C146 174 239 139 337 140C416 141 478 164 524 202" />
              <path className="guitar-selector__body-highlight guitar-selector__body-highlight--pink" d="M101 602C139 684 253 714 343 663C394 634 425 600 472 590" />
            </g>

            <path
              className="guitar-selector__pickguard"
              d="M166 218C234 170 341 181 402 241C439 278 451 321 439 365C430 400 399 427 389 461C378 496 394 536 430 576C358 613 270 601 214 545C171 502 168 449 198 404C229 357 220 293 166 218Z"
            />

            <g className="guitar-selector__pickup" data-feature="pickup">
              <rect x="397" y="224" width="42" height="390" rx="19" />
              <g className="guitar-selector__pickup-poles">
                <circle cx="418" cy="247" r="5" />
                <circle cx="418" cy="322" r="5" />
                <circle cx="418" cy="397" r="5" />
                <circle cx="418" cy="472" r="5" />
                <circle cx="418" cy="547" r="5" />
                <circle cx="418" cy="592" r="5" />
              </g>
            </g>
            <g className="guitar-selector__pickup guitar-selector__pickup--bridge" data-feature="pickup">
              <path d="M480 214L575 212L578 653L479 650Z" />
              <rect x="506" y="230" width="41" height="405" rx="9" />
              <g className="guitar-selector__pickup-poles">
                <circle cx="526" cy="247" r="5" />
                <circle cx="526" cy="322" r="5" />
                <circle cx="526" cy="397" r="5" />
                <circle cx="526" cy="472" r="5" />
                <circle cx="526" cy="547" r="5" />
                <circle cx="526" cy="622" r="5" />
              </g>
            </g>

            <g className="guitar-selector__bridge" aria-hidden="true">
              <rect x="548" y="254" width="21" height="34" rx="3" />
              <rect x="548" y="370" width="21" height="34" rx="3" />
              <rect x="548" y="486" width="21" height="34" rx="3" />
              <rect x="548" y="602" width="21" height="34" rx="3" />
            </g>

            <g className="guitar-selector__control-plate">
              <path d="M190 625C261 644 347 641 419 606L432 663C352 706 254 704 181 670Z" />
              <path d="M213 638L197 609" />
              <circle className="guitar-selector__switch" cx="194" cy="603" r="8" />
              <circle className="guitar-selector__knob guitar-selector__knob--one" cx="282" cy="661" r="20" />
              <circle className="guitar-selector__knob guitar-selector__knob--two" cx="369" cy="650" r="20" />
            </g>

            <g className="guitar-selector__frets" aria-hidden="true">
              <path d="M578 213L580 655" />
              <path d="M650 210L652 658" />
              <path d="M744 208L746 662" />
              <path d="M840 206L842 666" />
              <path d="M938 204L940 670" />
              <path d="M1038 203L1040 675" />
              <path d="M1140 202L1142 680" />
              <path d="M1244 201L1246 685" />
            </g>
            <path className="guitar-selector__nut" d="M1280 201L1280 690" />

            <g className="guitar-selector__tuners" data-feature="six-inline-tuner-bank">
              {[0, 1, 2, 3, 4, 5].map((index) => {
                const y = 244 + index * 69
                return (
                  <g key={y}>
                    <path d={`M1350 ${y}H1380`} />
                    <circle data-feature="tuner" cx="1387" cy={y} r="8" />
                  </g>
                )
              })}
            </g>

            <text className="guitar-selector__body-label" x="112" y="668" transform="rotate(-5 112 668)">
              PROJECTS
            </text>
          </svg>

          <div className="guitar-selector__strings" role="group" aria-label="Project strings">
            {strings.map((slot) => {
              const sharedProps = {
                className: `guitar-selector__string ${slot.project ? 'guitar-selector__string--assigned' : 'guitar-selector__string--empty'} ${activeString === slot.index ? 'guitar-selector__string--current' : ''}`,
                'data-pick-accent': slot.accent,
                onBlur: () => setActiveString(null),
                onFocus: () => setActiveString(slot.index),
                onPointerEnter: () => setActiveString(slot.index),
                onPointerLeave: (event) => {
                  if (!event.currentTarget.matches(':focus')) setActiveString(null)
                },
                style: { '--string-accent': slot.accent, '--string-y': STRING_POSITIONS[slot.index] },
                tabIndex: active ? undefined : -1,
              }

              const contents = (
                <>
                  <span className="guitar-selector__string-wire" aria-hidden="true" />
                  {slot.project ? (
                    <span className="guitar-selector__project-label">
                      <span>{slot.project.title}</span>
                    </span>
                  ) : (
                    <span className="guitar-selector__sr-only">
                      Future project string {slot.index + 1}, unassigned
                    </span>
                  )}
                </>
              )

              if (slot.project) {
                return (
                  <Link
                    {...sharedProps}
                    aria-label={`Open project: ${slot.project.title}`}
                    data-project-id={slot.project.id}
                    key={slot.project.id}
                    onClick={(event) => handleProjectClick(event, slot)}
                    to={slot.route}
                  >
                    {contents}
                  </Link>
                )
              }

              return (
                <button
                  {...sharedProps}
                  aria-label={`Future project string ${slot.index + 1}, unassigned`}
                  key={`future-${slot.index + 1}`}
                  onClick={() => handleEmptyClick(slot)}
                  type="button"
                >
                  {contents}
                </button>
              )
            })}
          </div>

          <div
            aria-live="polite"
            className="guitar-selector__empty-display"
            data-visible={emptyStringIsActive ? 'true' : 'false'}
            role="status"
          >
            {emptyStringIsActive ? (
              <>
                <strong>UNASSIGNED_</strong>
                <span>awaiting the next experiment</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
