import { ArrowLeft, ArrowRight, Expand, Play, X, ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { AssetImage } from './AssetImage'
import { getImageDimensions } from '../data/imageDimensions'
import './EvidenceGallery.css'

// Keep photographs and source figures intact. An explicit layout hint, rather
// than a card's position in the array, determines which evidence needs more room.
export function EvidenceGallery({ items, groups }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [zoomed, setZoomed] = useState(false)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const viewportRef = useRef(null)
  const titleId = useId()
  const captionId = useId()
  const sections = groups?.length
    ? groups.map((group) => ({ ...group, items: items.filter((item) => item.group === group.id) }))
    : [{ id: 'all', items }]
  const ungrouped = groups?.length
    ? items.filter((item) => !groups.some((group) => group.id === item.group))
    : []
  if (ungrouped.length) sections.push({ id: 'other', title: 'Additional records', items: ungrouped })
  // Viewer navigation follows the displayed groups, not the source-array order.
  const images = sections.flatMap((group) => group.items).filter((item) => item.type !== 'video')
  const selected = activeIndex === null ? null : images[activeIndex]
  const isOpen = Boolean(selected)

  useEffect(() => {
    if (!isOpen) return undefined
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    closeButtonRef.current?.focus({ preventScroll: true })
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const close = () => {
    setActiveIndex(null)
    setZoomed(false)
  }

  const move = (direction) => {
    setActiveIndex((index) => (index + direction + images.length) % images.length)
    setZoomed(false)
    viewportRef.current?.scrollTo(0, 0)
  }

  const open = (item) => {
    setZoomed(false)
    setActiveIndex(images.indexOf(item))
  }

  return (
    <div className="evidence-gallery">
      <p className="evidence-gallery__hint"><Expand aria-hidden="true" /> Select a photograph or figure to inspect the full image.</p>

      {sections.filter((group) => group.items.length).map((group, groupIndex) => (
        <section className={`evidence-gallery__group ${group.kind === 'photos' ? 'evidence-gallery__group--photos' : ''}`} key={group.id} aria-label={group.title || 'Project media'}>
          {group.title ? (
            <header className="evidence-gallery__group-heading">
              <span>{String(groupIndex + 1).padStart(2, '0')}</span>
              <div>
                <h3>{group.title}</h3>
                {group.description ? <p>{group.description}</p> : null}
              </div>
              <small>{group.items.length} {group.items.length === 1 ? 'record' : 'records'}</small>
            </header>
          ) : null}

          <div className="evidence-gallery__grid">
            {group.items.map((item) => (
              <figure className={`evidence-gallery__item ${item.layout === 'wide' ? 'evidence-gallery__item--wide' : ''} ${item.kind === 'figure' ? 'evidence-gallery__item--figure' : ''}`} key={item.title}>
                {item.type === 'video' ? (
                  <div className="evidence-gallery__video">
                    <video src={item.src} controls poster={item.poster} preload="metadata" playsInline aria-label={item.title} />
                  </div>
                ) : (
                  <button className="evidence-gallery__image target-cursor-hit" type="button" onClick={() => open(item)} aria-label={`Enlarge ${item.title}`} aria-haspopup="dialog">
                    <AssetImage src={item.src} alt={item.alt || item.title} />
                    <span className="evidence-gallery__expand"><Expand aria-hidden="true" /> View full image</span>
                  </button>
                )}
                <figcaption>
                  <div className="evidence-gallery__caption-heading">
                    {item.type === 'video' ? <Play aria-hidden="true" /> : null}
                    <h4>{item.title}</h4>
                  </div>
                  <p>{item.caption}</p>
                  {item.source ? <small>{item.source}</small> : null}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}

      <dialog
        className="evidence-viewer"
        ref={dialogRef}
        aria-labelledby={titleId}
        aria-describedby={captionId}
        onCancel={close}
        onClose={close}
        onClick={(event) => { if (event.target === event.currentTarget) close() }}
        onKeyDown={(event) => {
          if (zoomed || images.length < 2) return
          if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
          if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
        }}
      >
        {selected ? (
          <div className="evidence-viewer__content">
            <header className="evidence-viewer__toolbar">
              <div aria-live="polite"><span>{activeIndex + 1} / {images.length}</span><h3 id={titleId}>{selected.title}</h3></div>
              <div className="evidence-viewer__actions">
                {images.length > 1 ? <>
                  <button type="button" onClick={() => move(-1)} aria-label="Previous image"><ArrowLeft aria-hidden="true" /></button>
                  <button type="button" onClick={() => move(1)} aria-label="Next image"><ArrowRight aria-hidden="true" /></button>
                </> : null}
                <button type="button" onClick={() => setZoomed((value) => !value)} aria-label={zoomed ? 'Fit image to screen' : 'Zoom into image'} aria-pressed={zoomed}>
                  {zoomed ? <ZoomOut aria-hidden="true" /> : <ZoomIn aria-hidden="true" />}
                </button>
                <button type="button" onClick={close} aria-label="Close image viewer" ref={closeButtonRef}><X aria-hidden="true" /></button>
              </div>
            </header>
            <div className={`evidence-viewer__viewport ${zoomed ? 'evidence-viewer__viewport--zoomed' : ''}`} ref={viewportRef} tabIndex={0} role="region" aria-label={zoomed ? 'Enlarged image. Scroll to inspect details.' : 'Full image'}>
              <AssetImage
                priority
                src={selected.src}
                alt={selected.alt || selected.title}
                style={zoomed ? { width: `${(getImageDimensions(selected.src)?.width || 1000) * 2}px` } : undefined}
              />
            </div>
            <footer className="evidence-viewer__caption" id={captionId}>
              <p>{selected.caption}</p>
              {selected.source ? <small>{selected.source}</small> : null}
              <span>{zoomed ? 'Scroll to inspect · Fit to return' : images.length > 1 ? '← → Browse images · Esc to close' : 'Esc to close'}</span>
            </footer>
          </div>
        ) : null}
      </dialog>
    </div>
  )
}
