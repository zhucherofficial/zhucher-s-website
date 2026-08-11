// Chunk loaders for the project detail route, shared by the route itself and by the
// guitar selector's hover prefetch. Keeping them in one module means the prefetch and
// the lazy() call resolve the exact same module request, so a hover-warmed chunk is
// already in the module cache by the time the click navigates.

export const loadProjectDetailPage = () => import('./ProjectDetailPage')
  .then((module) => ({ default: module.ProjectDetailPage }))

export const analysisLoaders = {
  'fermented-astragalus-feed': () => import('../components/AstragalusAnalysis')
    .then((module) => ({ default: module.AstragalusAnalysis })),
  'raman-spectroscopy': () => import('../components/RamanAnalysis')
    .then((module) => ({ default: module.RamanAnalysis })),
  'spaghetti-bridge': () => import('../components/SpaghettiBridgeAnalysis')
    .then((module) => ({ default: module.SpaghettiBridgeAnalysis })),
  'subatomic-physics': () => import('../components/SubatomicAnalysis')
    .then((module) => ({ default: module.SubatomicAnalysis })),
}

// Warm the route chunk, the project's analysis chunk, and the cover image that the
// entrance animation measures. Failures are swallowed: this is best-effort only.
export function prefetchProjectDetail(projectId, imageSrc) {
  loadProjectDetailPage().catch(() => undefined)
  analysisLoaders[projectId]?.().catch(() => undefined)

  if (imageSrc) {
    const image = new Image()
    image.decoding = 'async'
    image.src = imageSrc
  }
}
