// GENERATED FILE - do not edit by hand.
// Regenerate with: python3 scripts/generate-image-dimensions.py
//
// Maps each asset's file name to its intrinsic pixel size so <img> tags can
// carry width/height and reserve layout space before the bytes arrive.

export const imageDimensions = {
  'assembled-bridge.webp': { width: 1600, height: 1201 },
  'astragaloside-chart.webp': { width: 466, height: 451 },
  'automatic-watering-circuit.webp': { width: 1600, height: 886 },
  'automatic-watering-robot.webp': { width: 1600, height: 1200 },
  'cellulase-chart.webp': { width: 445, height: 398 },
  'classification-benchmark.webp': { width: 1176, height: 1535 },
  'classification-confusion.webp': { width: 1600, height: 1411 },
  'concentration-classification.webp': { width: 1600, height: 1060 },
  'concentration-confusion.webp': { width: 1600, height: 1400 },
  'concentration-loc-cv.webp': { width: 1567, height: 969 },
  'contest-leaderboard.webp': { width: 1600, height: 1200 },
  'culture-sequence.webp': { width: 859, height: 834 },
  'event-0-rapidity-phi.webp': { width: 709, height: 701 },
  'ez-team-final.webp': { width: 1600, height: 1200 },
  'fermented-astragalus-feed.webp': { width: 1200, height: 1600 },
  'fermented-dregs-pairs.webp': { width: 1600, height: 1200 },
  'fermented-feed-bags.webp': { width: 1280, height: 960 },
  'group-cad-work.webp': { width: 1600, height: 1195 },
  'iteration-05-model.png': { width: 1828, height: 1304 },
  'iteration-07-model.webp': { width: 1414, height: 1497 },
  'iteration-07-response.webp': { width: 1600, height: 1169 },
  'iteration-07-stability.webp': { width: 1600, height: 685 },
  'joint-pipeline-scatter.webp': { width: 1600, height: 738 },
  'ken-bridge-cover.webp': { width: 1200, height: 1600 },
  'lab-bench.webp': { width: 1600, height: 1200 },
  'live-count-chart.webp': { width: 1275, height: 487 },
  'mcr-resolved-spectra.webp': { width: 884, height: 1600 },
  'me-lecturing.webp': { width: 1600, height: 1185 },
  'mean-spectra.webp': { width: 1334, height: 1600 },
  'model-benchmark-cv.webp': { width: 1476, height: 1178 },
  'original-cnn-prediction-vs-truth.webp': { width: 1170, height: 900 },
  'original-residuals-histogram.webp': { width: 1016, height: 823 },
  'original-resolution-overlay.webp': { width: 1032, height: 859 },
  'original-unet-total-pt-summary.webp': { width: 1404, height: 1260 },
  'paired-side-trusses.webp': { width: 1202, height: 1600 },
  'patent-dregs-before-after.webp': { width: 1500, height: 796 },
  'patent-primary-compounds.webp': { width: 1600, height: 704 },
  'patent-trametes-culture.webp': { width: 900, height: 900 },
  'peak-vs-concentration.webp': { width: 1600, height: 1113 },
  'physics-confusion-knn.webp': { width: 1600, height: 1411 },
  'physics-confusion-logistic-legacy.webp': { width: 1600, height: 1400 },
  'physics-confusion-logistic.webp': { width: 1600, height: 1400 },
  'physics-confusion-random-forest-legacy.webp': { width: 1600, height: 1400 },
  'physics-confusion-random-forest.webp': { width: 1600, height: 1400 },
  'physics-confusion-svm-rbf.webp': { width: 1600, height: 1400 },
  'physics-lab-map.webp': { width: 1440, height: 900 },
  'physics-scaled-spectra.webp': { width: 1600, height: 590 },
  'picture-of-myself.webp': { width: 896, height: 1600 },
  'profile-photo.webp': { width: 972, height: 1080 },
  'raman-spectra-data.webp': { width: 1600, height: 992 },
  'regression-benchmark.webp': { width: 1600, height: 1114 },
  'regression-per-compound.webp': { width: 1600, height: 950 },
  'regression-scatter.webp': { width: 1573, height: 1267 },
  'robot-failure-poster.webp': { width: 900, height: 506 },
  'robot-success-poster.webp': { width: 506, height: 900 },
  'self-concept-hillside.webp': { width: 1200, height: 1600 },
  'self-concept-park.webp': { width: 1199, height: 1600 },
  'side-truss-left.webp': { width: 1202, height: 1600 },
  'side-truss-right.webp': { width: 1202, height: 1600 },
  'spectra-by-concentration.webp': { width: 1600, height: 389 },
  'subatomic.webp': { width: 1000, height: 669 },
  'sugar-chart.webp': { width: 710, height: 341 },
  'unet-total-pt-event-0.png': { width: 2520, height: 612 },
  'vice-leader-cindy.webp': { width: 515, height: 643 },
  'watching-you-meme.webp': { width: 162, height: 162 },
  'wheeled-legged-robot.webp': { width: 960, height: 1280 },
}

// Bundled asset URLs keep the original file name plus a content hash, so the
// last path segment up to the hash is enough to find the entry.
export function getImageDimensions(src) {
  if (typeof src !== 'string') return null
  const fileName = src.split('/').pop()?.split('?')[0]
  if (!fileName) return null
  if (imageDimensions[fileName]) return imageDimensions[fileName]

  const match = /^(.*)-[A-Za-z0-9_-]{8,}(\.[a-z]+)$/.exec(fileName)
  if (match) return imageDimensions[`${match[1]}${match[2]}`] ?? null
  return null
}
