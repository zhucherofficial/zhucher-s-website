import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'

const srOnly = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  border: 0,
}

function getRevealOrder(length, direction) {
  const order = []
  if (direction === 'end') {
    for (let i = length - 1; i >= 0; i -= 1) order.push(i)
    return order
  }
  if (direction === 'center') {
    const middle = Math.floor(length / 2)
    let offset = 0
    while (order.length < length) {
      const index = offset % 2 === 0 ? middle + offset / 2 : middle - Math.ceil(offset / 2)
      if (index >= 0 && index < length) order.push(index)
      offset += 1
    }
    return order
  }
  for (let i = 0; i < length; i += 1) order.push(i)
  return order
}

function createAvailableCharacters(text, useOriginalCharsOnly, characters) {
  if (!useOriginalCharsOnly) return characters.split('')
  return Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
}

function scrambleText(text, revealedIndices, availableCharacters) {
  return text
    .split('')
    .map((char, index) => {
      if (char === ' ') return ' '
      if (revealedIndices.has(index)) return char
      return availableCharacters[Math.floor(Math.random() * availableCharacters.length)] ?? char
    })
    .join('')
}

export default function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
  replayOnView = false,
  ...props
}) {
  const [displayText, setDisplayText] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== 'click')
  const [revealedIndices, setRevealedIndices] = useState(() => new Set())
  const [direction, setDirection] = useState('forward')
  const containerRef = useRef(null)
  const hasAnimatedRef = useRef(false)
  const inViewRef = useRef(false)
  const intervalRef = useRef(null)
  const iterationRef = useRef(0)
  const orderRef = useRef([])
  const pointerRef = useRef(0)
  const revealedRef = useRef(new Set())

  const availableCharacters = useMemo(
    () => createAvailableCharacters(text, useOriginalCharsOnly, characters),
    [characters, text, useOriginalCharsOnly],
  )

  const clearAnimation = useCallback(() => {
    window.clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  const syncRevealed = useCallback((nextRevealed) => {
    revealedRef.current = nextRevealed
    setRevealedIndices(nextRevealed)
  }, [])

  const triggerDecrypt = useCallback(() => {
    clearAnimation()
    iterationRef.current = 0
    orderRef.current = getRevealOrder(text.length, revealDirection)
    pointerRef.current = 0
    syncRevealed(new Set())
    setDisplayText(scrambleText(text, new Set(), availableCharacters))
    setDirection('forward')
    setIsDecrypted(false)
    setIsAnimating(true)
  }, [availableCharacters, clearAnimation, revealDirection, syncRevealed, text])

  const triggerReverse = useCallback(() => {
    clearAnimation()
    iterationRef.current = 0
    orderRef.current = getRevealOrder(text.length, revealDirection).reverse()
    pointerRef.current = 0
    const fullSet = new Set(Array.from({ length: text.length }, (_, index) => index))
    syncRevealed(fullSet)
    setDisplayText(text)
    setDirection('reverse')
    setIsAnimating(true)
  }, [clearAnimation, revealDirection, syncRevealed, text])

  const resetToPlainText = useCallback(() => {
    clearAnimation()
    syncRevealed(new Set())
    setDisplayText(text)
    setIsAnimating(false)
    setIsDecrypted(true)
    setDirection('forward')
  }, [clearAnimation, syncRevealed, text])

  const resetToEncryptedText = useCallback(() => {
    clearAnimation()
    const emptySet = new Set()
    syncRevealed(emptySet)
    setDisplayText(scrambleText(text, emptySet, availableCharacters))
    setIsAnimating(false)
    setIsDecrypted(false)
    setDirection('forward')
  }, [availableCharacters, clearAnimation, syncRevealed, text])

  useEffect(() => {
    if (replayOnView && (animateOn === 'view' || animateOn === 'inViewHover') && !inViewRef.current) {
      resetToEncryptedText()
    }
  }, [animateOn, replayOnView, resetToEncryptedText])

  useEffect(() => {
    if (!isAnimating) return undefined

    intervalRef.current = window.setInterval(() => {
      if (sequential) {
        const nextRevealed = new Set(revealedRef.current)
        const targetIndex = orderRef.current[pointerRef.current]

        if (direction === 'reverse') {
          if (targetIndex === undefined) {
            clearAnimation()
            syncRevealed(new Set())
            setDisplayText(scrambleText(text, new Set(), availableCharacters))
            setIsAnimating(false)
            setIsDecrypted(false)
            return
          }
          nextRevealed.delete(targetIndex)
        } else if (targetIndex !== undefined) {
          nextRevealed.add(targetIndex)
        }

        pointerRef.current += 1
        syncRevealed(nextRevealed)
        setDisplayText(scrambleText(text, nextRevealed, availableCharacters))

        if (nextRevealed.size === text.length || (direction === 'reverse' && nextRevealed.size === 0)) {
          clearAnimation()
          setDisplayText(direction === 'reverse' ? scrambleText(text, new Set(), availableCharacters) : text)
          setIsAnimating(false)
          setIsDecrypted(direction !== 'reverse')
        }
        return
      }

      iterationRef.current += 1
      if (iterationRef.current >= maxIterations) {
        clearAnimation()
        setDisplayText(direction === 'reverse' ? scrambleText(text, new Set(), availableCharacters) : text)
        setIsAnimating(false)
        setIsDecrypted(direction !== 'reverse')
        return
      }

      setDisplayText(scrambleText(text, revealedRef.current, availableCharacters))
    }, speed)

    return clearAnimation
  }, [
    availableCharacters,
    clearAnimation,
    direction,
    isAnimating,
    maxIterations,
    sequential,
    speed,
    syncRevealed,
    text,
  ])

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => {
          if (!entry.isIntersecting) return false
          return !replayOnView || entry.intersectionRatio >= 0.2
        })

        if (isIntersecting && !inViewRef.current) {
          inViewRef.current = true
          if (replayOnView || !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            triggerDecrypt()
          }
          return
        }

        if (!isIntersecting && inViewRef.current) {
          inViewRef.current = false
          if (replayOnView) {
            hasAnimatedRef.current = false
            resetToEncryptedText()
          }
        }
      },
      replayOnView ? { rootMargin: '-20% 0px -20% 0px', threshold: [0, 0.2, 0.45] } : { threshold: 0.2 },
    )

    const current = containerRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [animateOn, replayOnView, resetToEncryptedText, triggerDecrypt])

  useEffect(() => clearAnimation, [clearAnimation])

  const handleClick = () => {
    if (animateOn !== 'click') return
    if (clickMode === 'once' && isDecrypted) return
    if (clickMode === 'toggle' && isDecrypted) {
      triggerReverse()
      return
    }
    triggerDecrypt()
  }

  const motionProps =
    animateOn === 'hover' || animateOn === 'inViewHover'
      ? {
          onMouseEnter: triggerDecrypt,
          onMouseLeave: resetToPlainText,
        }
      : animateOn === 'click'
        ? { onClick: handleClick }
        : {}

  return (
    <motion.span className={parentClassName} ref={containerRef} style={{ display: 'inline-block' }} {...motionProps} {...props}>
      <span style={srOnly}>{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const revealed = revealedIndices.has(index) || (!isAnimating && isDecrypted)
          return (
            <span className={revealed ? className : encryptedClassName} key={`${char}-${index}`}>
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}
