export const projectStringManifest = [
  { id: 'wheeled-legged-robot', route: '/projects/wheeled-legged-robot', stringNumber: 6, note: 'E2', frequency: 82.41, accent: '#ff4fa3', assigned: true },
  { id: 'subatomic-physics', route: '/projects/subatomic-physics', stringNumber: 5, note: 'A2', frequency: 110, accent: '#ffd632', assigned: true },
  { id: 'raman-spectroscopy', route: '/projects/raman-spectroscopy', stringNumber: 4, note: 'D3', frequency: 146.83, accent: '#2ce6e8', assigned: true },
  { id: 'fermented-astragalus-feed', route: '/projects/fermented-astragalus-feed', stringNumber: 3, note: 'G3', frequency: 196, accent: '#b8ff2c', assigned: true },
  { id: 'spaghetti-bridge', route: '/projects/spaghetti-bridge', stringNumber: 2, note: 'B3', frequency: 246.94, accent: '#1546ff', assigned: true },
  { id: null, route: null, stringNumber: 1, note: 'E4', frequency: 329.63, accent: '#ff4fa3', assigned: false },
]

export function getProjectManifestEntry(id) {
  return projectStringManifest.find((entry) => entry.id === id)
}
