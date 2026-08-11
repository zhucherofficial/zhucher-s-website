import { getImageDimensions } from '../data/imageDimensions'

/**
 * An <img> that always carries its intrinsic width/height so the browser can
 * reserve layout space before the bytes land. Without those attributes the page
 * reflows as each picture decodes, and any layout measured during mount (such as
 * the project entrance animation's hero rect) is taken against a collapsed box.
 *
 * Defaults to lazy loading and async decoding, since almost every image on the
 * case-study pages sits well below the fold. Pass `priority` for the one image
 * that is visible immediately.
 */
export function AssetImage({ src, alt, priority = false, ...rest }) {
  const dimensions = getImageDimensions(src)

  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      width={dimensions?.width}
      height={dimensions?.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
    />
  )
}
