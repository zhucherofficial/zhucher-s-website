export const projectStringManifest = [
  { id: 'wheeled-legged-robot', route: '/projects/wheeled-legged-robot', accent: '#ffd632', assigned: true },
  { id: 'subatomic-physics', route: '/projects/subatomic-physics', accent: '#2ce6e8', assigned: true },
  { id: 'raman-spectroscopy', route: '/projects/raman-spectroscopy', accent: '#ff4fa3', assigned: true },
  { id: 'fermented-astragalus-feed', route: '/projects/fermented-astragalus-feed', accent: '#b8ff2c', assigned: true },
  { id: null, route: null, accent: '#1546ff', assigned: false },
  { id: null, route: null, accent: '#ff4fa3', assigned: false },
]

export function getProjectManifestEntry(id) {
  return projectStringManifest.find((entry) => entry.id === id)
}
