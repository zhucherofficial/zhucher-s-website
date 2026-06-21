import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './BounceCards.css'

export default function BounceCards({
  className = '',
  cards = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(10deg) translate(-170px)',
    'rotate(5deg) translate(-85px)',
    'rotate(-3deg)',
    'rotate(-10deg) translate(85px)',
    'rotate(2deg) translate(170px)',
  ],
  enableHover = true,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bounce-card',
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      )
    }, containerRef)
    return () => ctx.revert()
  }, [animationDelay, animationStagger, easeType])

  const getNoRotationTransform = (transformStr) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)
    if (hasRotate) return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
    if (transformStr === 'none') return 'rotate(0deg)'
    return `${transformStr} rotate(0deg)`
  }

  const getPushedTransform = (baseTransform, offsetX) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/
    const match = baseTransform.match(translateRegex)
    if (match) {
      const currentX = parseFloat(match[1])
      return baseTransform.replace(translateRegex, `translate(${currentX + offsetX}px)`)
    }
    return baseTransform === 'none' ? `translate(${offsetX}px)` : `${baseTransform} translate(${offsetX}px)`
  }

  const pushSiblings = (hoveredIdx) => {
    if (!enableHover || !containerRef.current) return

    const q = gsap.utils.selector(containerRef)
    cards.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`)
      gsap.killTweensOf(target)

      const baseTransform = transformStyles[i] || 'none'
      const transform =
        i === hoveredIdx
          ? getNoRotationTransform(baseTransform)
          : getPushedTransform(baseTransform, i < hoveredIdx ? -96 : 96)

      gsap.to(target, {
        transform,
        duration: 0.4,
        ease: 'back.out(1.4)',
        delay: i === hoveredIdx ? 0 : Math.abs(hoveredIdx - i) * 0.035,
        overwrite: 'auto',
      })
    })
  }

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return

    const q = gsap.utils.selector(containerRef)
    cards.forEach((_, i) => {
      const target = q(`.bounce-card-${i}`)
      gsap.killTweensOf(target)
      gsap.to(target, {
        transform: transformStyles[i] || 'none',
        duration: 0.4,
        ease: 'back.out(1.4)',
        overwrite: 'auto',
      })
    })
  }

  return (
    <div
      className={`bounce-cards-container ${className}`}
      ref={containerRef}
      style={{ '--bounce-width': `${containerWidth}px`, '--bounce-height': `${containerHeight}px` }}
    >
      {cards.map((card, idx) => (
        <a
          key={card.id}
          className={`bounce-card bounce-card-${idx}`}
          href={card.href}
          target={card.external ? '_blank' : undefined}
          rel={card.external ? 'noreferrer' : undefined}
          style={{ transform: transformStyles[idx] ?? 'none', '--card-index': idx }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
          onFocus={() => pushSiblings(idx)}
          onBlur={resetSiblings}
        >
          {card.content}
        </a>
      ))}
    </div>
  )
}
