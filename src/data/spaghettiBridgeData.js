export const tensionTrials = [
  { specimen: 1, group: 'Thin', diameterMm: 1.1, massG: 840, forceN: 16.4808, stressMpa: 17.3422 },
  { specimen: 2, group: 'Thin', diameterMm: 1.1, massG: 1155, forceN: 22.6611, stressMpa: 23.8455 },
  { specimen: 3, group: 'Thin', diameterMm: 1.1, massG: 997, forceN: 19.5611, stressMpa: 20.5835 },
  { specimen: 4, group: 'Thin', diameterMm: 1.1, massG: 1028, forceN: 20.1694, stressMpa: 21.2235 },
  { specimen: 5, group: 'Medium', diameterMm: 1.4, massG: 1628, forceN: 31.9414, stressMpa: 20.7495 },
  { specimen: 6, group: 'Medium', diameterMm: 1.4, massG: 1608, forceN: 31.5490, stressMpa: 20.4946 },
  { specimen: 7, group: 'Medium', diameterMm: 1.4, massG: 1647, forceN: 32.3141, stressMpa: 20.9917 },
  { specimen: 8, group: 'Medium', diameterMm: 1.3, massG: 1292, forceN: 25.3490, stressMpa: 19.0979 },
  { specimen: 9, group: 'Thick', diameterMm: 1.7, massG: 2572, forceN: 50.4626, stressMpa: 22.2322 },
  { specimen: 10, group: 'Thick', diameterMm: 1.7, massG: 2695, forceN: 52.8759, stressMpa: 23.2954 },
  { specimen: 11, group: 'Thick', diameterMm: 1.7, massG: 2509, forceN: 49.2266, stressMpa: 21.6876 },
  { specimen: 12, group: 'Thick', diameterMm: 1.7, massG: 2367, forceN: 46.4405, stressMpa: 20.4602 },
]

export const tensionGroups = [
  { label: 'Thin', diameterLabel: '1.1 mm', meanForceN: 19.7181, meanStressMpa: 20.75 },
  { label: 'Medium', diameterLabel: '1.3-1.4 mm', meanForceN: 30.2884, meanStressMpa: 20.33 },
  { label: 'Thick', diameterLabel: '1.7 mm', meanForceN: 49.7514, meanStressMpa: 21.92 },
]

export const bendingSeries = [
  {
    id: 'angel-82',
    label: 'Angel hair / 82 mm',
    shortLabel: '1.1 / 82',
    pasta: 'Angel hair',
    spanMm: 82,
    diameterMm: 1.1,
    slopeNPerMm: 0.01743965,
    rSquared: 0.97142249,
    modulusGpa: 2.7874,
    points: [[3, 7], [4, 10.85], [7, 16.35], [11, 21.85]],
  },
  {
    id: 'vermicelli-82',
    label: 'Vermicelli / 82 mm',
    shortLabel: '1.4 / 82',
    pasta: 'Vermicelli',
    spanMm: 82,
    diameterMm: 1.4,
    slopeNPerMm: 0.03814700,
    rSquared: 0.98783782,
    modulusGpa: 2.3237,
    points: [[1, 7], [3, 10.85], [4, 16.35], [5, 21.85], [6.5, 27.35], [8, 32.85], [9.5, 38.35]],
  },
  {
    id: 'spaghetti-82',
    label: 'Spaghetti / 82 mm',
    shortLabel: '1.7 / 82',
    pasta: 'Spaghetti',
    spanMm: 82,
    diameterMm: 1.7,
    slopeNPerMm: 0.10790794,
    rSquared: 0.99775613,
    modulusGpa: 3.0233,
    points: [[0.5, 7], [0.7, 10.85], [1, 16.35], [1.5, 21.85], [2, 27.35], [2.6, 32.85], [3, 38.35], [3.5, 42.85], [4, 48.35], [4.5, 53.35], [5, 58.85], [5.5, 64.35], [6, 69.85], [6.5, 75.35]],
  },
  {
    id: 'spaghetti-102',
    label: 'Spaghetti / 102 mm',
    shortLabel: '1.7 / 102',
    pasta: 'Spaghetti',
    spanMm: 102,
    diameterMm: 1.7,
    slopeNPerMm: 0.05264205,
    rSquared: 0.99932482,
    modulusGpa: 2.8387,
    points: [[0.5, 7], [1, 10.85], [2, 16.35], [3, 21.85], [4, 27.35], [5, 32.85], [6, 38.35], [7, 42.85], [8, 48.35], [9, 53.35], [10, 58.85], [11, 64.35]],
  },
  {
    id: 'spaghetti-122',
    label: 'Spaghetti / 122 mm',
    shortLabel: '1.7 / 122',
    pasta: 'Spaghetti',
    spanMm: 122,
    diameterMm: 1.7,
    slopeNPerMm: 0.03525864,
    rSquared: 0.99950634,
    modulusGpa: 3.2534,
    points: [[1, 7], [2, 10.85], [3.5, 16.35], [5, 21.85], [6.5, 27.35], [8, 32.85], [9.5, 38.35], [11, 42.85], [12.5, 48.35]],
  },
]

export const bucklingTrials = [
  { group: 'Thin', diameterMm: 1.1, trial: 1, lengthMm: 58, massG: 114, loadN: 1.11834 },
  { group: 'Thin', diameterMm: 1.1, trial: 2, lengthMm: 60, massG: 104, loadN: 1.02024 },
  { group: 'Thin', diameterMm: 1.1, trial: 3, lengthMm: 94, massG: 37, loadN: 0.36297 },
  { group: 'Thin', diameterMm: 1.1, trial: 4, lengthMm: 112, massG: 24, loadN: 0.23544 },
  { group: 'Thin', diameterMm: 1.1, trial: 5, lengthMm: 260, massG: 4, loadN: 0.03924 },
  { group: 'Medium', diameterMm: 1.4, trial: 1, lengthMm: 49, massG: 384, loadN: 3.76704 },
  { group: 'Medium', diameterMm: 1.4, trial: 2, lengthMm: 68, massG: 194, loadN: 1.90314 },
  { group: 'Medium', diameterMm: 1.4, trial: 3, lengthMm: 82, massG: 137, loadN: 1.34397 },
  { group: 'Medium', diameterMm: 1.4, trial: 4, lengthMm: 121, massG: 64, loadN: 0.62784 },
  { group: 'Medium', diameterMm: 1.4, trial: 5, lengthMm: 254, massG: 16, loadN: 0.15696 },
  { group: 'Thick', diameterMm: 1.7, trial: 1, lengthMm: 53, massG: 679, loadN: 6.66099 },
  { group: 'Thick', diameterMm: 1.7, trial: 2, lengthMm: 82, massG: 312, loadN: 3.06072 },
  { group: 'Thick', diameterMm: 1.7, trial: 3, lengthMm: 99, massG: 210, loadN: 2.06010 },
  { group: 'Thick', diameterMm: 1.7, trial: 4, lengthMm: 129, massG: 129, loadN: 1.26549 },
  { group: 'Thick', diameterMm: 1.7, trial: 5, lengthMm: 253, massG: 33, loadN: 0.32373 },
]

export const bucklingFits = [
  { group: 'Thin', diameterMm: 1.1, slopeNm2: 0.0036573157, modulusGpa: 7.94, uncertaintyGpa: 1.46, rSquared: 0.9926 },
  { group: 'Medium', diameterMm: 1.4, slopeNm2: 0.0090015434, modulusGpa: 7.45, uncertaintyGpa: 1.06, rSquared: 0.9997 },
  { group: 'Thick', diameterMm: 1.7, slopeNm2: 0.0191136923, modulusGpa: 7.27, uncertaintyGpa: 0.87, rSquared: 0.9960 },
]

export const bridgeIterations = [
  { id: 'I00', title: 'King-post baseline', capacityKg: 65.3858, massG: 248.63, decision: 'Light system, but its 308 mm compression legs depended on splices.' },
  { id: 'I01', title: 'Multi-topology search', capacityKg: 65.7533, massG: 251.79, decision: 'A four-panel bowstring-Pratt removed the long compression path.' },
  { id: 'I02', title: 'Bowstring fine search', capacityKg: 66.7100, massG: 249.39, decision: 'A 168 mm rise improved capacity without primary-member splices.' },
  { id: 'I03', title: 'Width and strength', capacityKg: 68.7699, massG: 250.22, decision: 'The 72 mm spacing scored well but left only 0.3 mm total vehicle clearance.' },
  { id: 'I04', title: 'Tolerance-aware optimum', capacityKg: 68.7698, massG: 250.52, decision: 'A 2 mm clearance margin passed, but the conservative mass stayed above 250 g.' },
  { id: 'I05', title: 'Recommended build', capacityKg: 67.2084, massG: 248.68, decision: 'We gave up about 1 kg of model score to keep mass and clearance buildable.' },
]

export const contestResult = {
  team: 'EZ',
  loadKg: 16,
  rank: 6,
  fieldSize: 72,
}
