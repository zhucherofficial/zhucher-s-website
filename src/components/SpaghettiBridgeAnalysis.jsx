import { useEffect, useMemo, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import {
  ChartNoAxesCombined,
  FlaskConical,
  Network,
  RotateCcw,
  Trophy,
} from 'lucide-react'
import assembledBridge from '../assets/project-media/spaghetti-bridge/assembled-bridge.jpg'
import contestLeaderboard from '../assets/project-media/spaghetti-bridge/contest-leaderboard.jpg'
import ezTeamFinal from '../assets/project-media/spaghetti-bridge/ez-team-final.jpg'
import iteration05Model from '../assets/project-media/spaghetti-bridge/iteration-05-model.png'
import iteration07Model from '../assets/project-media/spaghetti-bridge/iteration-07-model.png'
import iteration07Response from '../assets/project-media/spaghetti-bridge/iteration-07-response.png'
import iteration07Stability from '../assets/project-media/spaghetti-bridge/iteration-07-stability.png'
import pairedSideTrusses from '../assets/project-media/spaghetti-bridge/paired-side-trusses.jpg'
import sideTrussLeft from '../assets/project-media/spaghetti-bridge/side-truss-left.jpg'
import sideTrussRight from '../assets/project-media/spaghetti-bridge/side-truss-right.jpg'
import {
  bendingSeries,
  bridgeIterations,
  bucklingFits,
  bucklingTrials,
  contestResult,
  tensionGroups,
  tensionTrials,
} from '../data/spaghettiBridgeData'
import './SpaghettiBridgeAnalysis.css'

const PAPER = '#F0EFEB'
const INK = '#1C1C1A'
const DARK_MID = '#55554F'
const MID = '#8F8E88'
const FAINT = '#C6C5BF'
const GRID = '#DEDDD6'
const SVG_NS = 'http://www.w3.org/2000/svg'

const formulas = [
  { label: 'Tension', tex: String.raw`\sigma = \frac{F}{A},\qquad A = \frac{\pi d^2}{4}` },
  { label: 'Bending', tex: String.raw`E = \frac{4L^3s}{3\pi d^4}` },
  { label: 'Buckling', tex: String.raw`P_{cr} = \frac{\pi^2EI}{(KL)^2},\qquad I = \frac{\pi d^4}{64}` },
]

const processSteps = [
  { icon: FlaskConical, label: 'Conduct', detail: '73 measurements' },
  { icon: ChartNoAxesCombined, label: 'Analyze', detail: 'strength and stiffness' },
  { icon: Network, label: 'Model', detail: 'truss and load paths' },
  { icon: RotateCcw, label: 'Assess', detail: '8 design iterations' },
  { icon: Trophy, label: 'Test', detail: '16.000 kg / rank 6' },
]

const chartDrawers = {
  tension: drawTensionRungs,
  bending: drawBendingHairlines,
  buckling: drawBucklingPlumbs,
  iterations: drawIterationTicks,
}

function svgElement(parent, tag, attrs) {
  const node = document.createElementNS(SVG_NS, tag)
  Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value))
  parent.appendChild(node)
  return node
}

function svgText(parent, attrs, value) {
  const node = svgElement(parent, 'text', attrs)
  node.textContent = value
  return node
}

function svgTip(node, value) {
  const title = document.createElementNS(SVG_NS, 'title')
  title.textContent = value
  node.appendChild(title)
}

function deterministicJitter(index, key) {
  return Math.abs(((index * 73856093) ^ (key * 19349663)) % 1000) / 1000
}

function useSvgChart(draw) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const render = () => {
      node.replaceChildren()
      draw(node)
    }
    const replayFromKeyboard = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      render()
    }

    node.addEventListener('click', render)
    node.addEventListener('keydown', replayFromKeyboard)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render()
      return () => {
        node.removeEventListener('click', render)
        node.removeEventListener('keydown', replayFromKeyboard)
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return
      render()
      observer.disconnect()
    }, { threshold: 0.24 })

    observer.observe(node)
    return () => {
      observer.disconnect()
      node.removeEventListener('click', render)
      node.removeEventListener('keydown', replayFromKeyboard)
    }
  }, [draw])

  return ref
}

function Formula({ formula }) {
  const markup = useMemo(() => ({
    __html: katex.renderToString(formula.tex, { throwOnError: false, output: 'html' }),
  }), [formula])

  return (
    <div className="spaghetti-analysis__formula">
      <span>{formula.label}</span>
      <div dangerouslySetInnerHTML={markup} />
    </div>
  )
}

function LieflatChart({ chart, title, subtitle, source, ariaLabel }) {
  const chartRef = useSvgChart(chartDrawers[chart])
  return (
    <figure className="spaghetti-chart">
      <figcaption>
        <h4>{title}</h4>
        <p>{subtitle}</p>
      </figcaption>
      <svg
        aria-label={ariaLabel}
        ref={chartRef}
        role="img"
        tabIndex="0"
        viewBox="0 0 400 320"
        preserveAspectRatio="xMidYMid meet"
      />
      <small>{source}</small>
    </figure>
  )
}

function DataDetails({ label, children }) {
  return (
    <details className="spaghetti-analysis__data-details">
      <summary>{label}</summary>
      <div className="spaghetti-analysis__table-wrap">{children}</div>
    </details>
  )
}

function SectionHeading({ number, title, children }) {
  return (
    <header className="spaghetti-analysis__section-heading">
      <p className="project-case__section-number">{number}</p>
      <div>
        <h3>{title}</h3>
        {children}
      </div>
    </header>
  )
}

function drawTensionRungs(svg) {
  const xAt = (index) => 92 + index * 108
  const base = 263
  const step = 3.8
  const shades = [MID, DARK_MID, INK]

  svgElement(svg, 'line', { x1: 35, y1: base + 4, x2: 365, y2: base + 4, stroke: GRID, 'stroke-width': 0.8, class: 'bridge-chart__fade' })

  tensionGroups.forEach((group, index) => {
    const x = xAt(index)
    const fullRungs = Math.floor(group.meanForceN)
    for (let rung = 1; rung <= fullRungs; rung += 1) {
      const y = base - rung * step
      const halfWidth = 18 + deterministicJitter(rung, index + 2) * 3
      svgElement(svg, 'line', {
        x1: x - halfWidth,
        y1: y,
        x2: x + halfWidth,
        y2: y,
        stroke: shades[index],
        'stroke-width': 1,
        opacity: 0.56 + deterministicJitter(rung + 2, index + 4) * 0.44,
        class: 'bridge-chart__fade',
        style: `animation-delay:${index * 0.08 + rung * 0.01}s`,
      })
      if (rung % 5 === 0) {
        svgElement(svg, 'circle', { cx: x + 25, cy: y, r: 0.9, fill: FAINT, class: 'bridge-chart__fade' })
      }
    }

    const exactTop = base - group.meanForceN * step
    const cap = svgElement(svg, 'line', {
      x1: x - 22,
      y1: exactTop,
      x2: x + 22,
      y2: exactTop,
      stroke: shades[index],
      'stroke-width': 1.7,
      class: 'bridge-chart__pop',
      style: `animation-delay:${0.45 + index * 0.08}s`,
    })
    svgTip(cap, `${group.label}: ${group.meanForceN.toFixed(2)} N mean failure force`)
    svgText(svg, {
      x,
      y: exactTop - 11,
      'font-size': 11,
      'font-weight': 800,
      fill: INK,
      'text-anchor': 'middle',
      class: 'bridge-chart__fade',
    }, group.meanForceN.toFixed(2))
    svgText(svg, {
      x,
      y: base + 19,
      'font-size': 7.5,
      'font-weight': 700,
      fill: MID,
      'text-anchor': 'middle',
      class: 'bridge-chart__fade',
    }, group.diameterLabel.toUpperCase())
  })

  svgText(svg, { x: 200, y: 306, 'font-size': 7, 'font-weight': 600, fill: FAINT, 'text-anchor': 'middle', class: 'bridge-chart__fade' }, 'ONE RUNG = 1 N MEAN FAILURE FORCE / DOT MARKS EVERY FIFTH')
}

function drawBendingHairlines(svg) {
  const x0 = 35
  const x1 = 365
  const base = 262
  const mapX = (deflection) => x0 + (deflection / 13) * (x1 - x0)
  const mapY = (load) => base - (load / 0.8) * 198
  const shades = {
    'angel-82': '#B0AFA9',
    'vermicelli-82': MID,
    'spaghetti-82': INK,
    'spaghetti-102': DARK_MID,
    'spaghetti-122': '#6A6963',
  }

  for (let tick = 0; tick <= 13; tick += 1) {
    const x = mapX(tick)
    svgElement(svg, 'line', { x1: x, y1: base, x2: x, y2: base - (tick % 5 === 0 ? 8 : 4), stroke: '#CFCEC7', 'stroke-width': 0.6, class: 'bridge-chart__fade' })
  }
  ;[0.2, 0.4, 0.6, 0.8].forEach((load) => {
    const y = mapY(load)
    svgElement(svg, 'line', { x1: x0, y1: y, x2: x1, y2: y, stroke: GRID, 'stroke-width': 0.55, 'stroke-dasharray': '1 4', class: 'bridge-chart__fade' })
    svgText(svg, { x: x0 - 6, y: y + 2.5, 'font-size': 6.5, 'font-weight': 600, fill: FAINT, 'text-anchor': 'end', class: 'bridge-chart__fade' }, load.toFixed(1))
  })
  svgElement(svg, 'line', { x1: x0 - 5, y1: base, x2: x1 + 4, y2: base, stroke: GRID, 'stroke-width': 0.8, class: 'bridge-chart__fade' })

  const ordered = [...bendingSeries].sort((left, right) => left.points.length - right.points.length)
  ordered.forEach((series, seriesIndex) => {
    const points = series.points.map(([deflection, massG]) => ({
      deflection,
      massG,
      loadN: massG * 0.00981,
    }))
    const path = points.map((point, pointIndex) => `${pointIndex === 0 ? 'M' : 'L'}${mapX(point.deflection)} ${mapY(point.loadN)}`).join(' ')
    svgElement(svg, 'path', {
      d: path,
      fill: 'none',
      stroke: shades[series.id],
      'stroke-width': series.id === 'spaghetti-82' ? 1.4 : 0.9,
      pathLength: 1,
      class: 'bridge-chart__draw',
      style: `animation-delay:${seriesIndex * 0.08}s`,
    })

    points.forEach((point, pointIndex) => {
      const dot = svgElement(svg, 'circle', {
        cx: mapX(point.deflection),
        cy: mapY(point.loadN),
        r: pointIndex === points.length - 1 ? 3.2 : 1.8,
        fill: pointIndex === points.length - 1 ? shades[series.id] : PAPER,
        stroke: shades[series.id],
        'stroke-width': 0.9,
        class: 'bridge-chart__pop',
        style: `animation-delay:${0.18 + seriesIndex * 0.07 + pointIndex * 0.025}s`,
      })
      svgTip(dot, `${series.label}: ${point.deflection} mm at ${point.loadN.toFixed(3)} N`)
    })

    const last = points.at(-1)
    const labelAnchor = last.deflection > 11.8 ? 'end' : 'start'
    const labelX = mapX(last.deflection) + (labelAnchor === 'end' ? -5 : 5)
    svgText(svg, {
      x: labelX,
      y: mapY(last.loadN) - 7,
      'font-size': 6.8,
      'font-weight': 800,
      fill: shades[series.id],
      'text-anchor': labelAnchor,
      style: `paint-order:stroke;stroke:${PAPER};stroke-width:3px`,
      class: 'bridge-chart__fade',
    }, series.shortLabel)
  })

  svgText(svg, { x: 200, y: 286, 'font-size': 7, 'font-weight': 700, fill: MID, 'text-anchor': 'middle', class: 'bridge-chart__fade' }, 'CENTER DEFLECTION (MM)')
  svgText(svg, { x: 13, y: 160, 'font-size': 7, 'font-weight': 700, fill: MID, 'text-anchor': 'middle', transform: 'rotate(-90 13 160)', class: 'bridge-chart__fade' }, 'LOAD (N)')
  svgText(svg, { x: 200, y: 306, 'font-size': 7, 'font-weight': 600, fill: FAINT, 'text-anchor': 'middle', class: 'bridge-chart__fade' }, 'ONE DOT = ONE READING / FIVE SERIES / 46 TOTAL MEASUREMENTS')
}

function drawBucklingPlumbs(svg) {
  const x0 = 48
  const x1 = 368
  const base = 260
  const mapX = (inverseLengthSquared) => x0 + (inverseLengthSquared / 430) * (x1 - x0)
  const mapY = (load) => base - (load / 7) * 202
  const shades = { Thin: MID, Medium: DARK_MID, Thick: INK }

  for (let tick = 0; tick <= 20; tick += 1) {
    const x = x0 + (tick / 20) * (x1 - x0)
    svgElement(svg, 'line', { x1: x, y1: base, x2: x, y2: base - (tick % 5 === 0 ? 8 : 4), stroke: '#CFCEC7', 'stroke-width': 0.6, class: 'bridge-chart__fade' })
  }
  svgElement(svg, 'line', { x1: x0 - 5, y1: base, x2: x1 + 5, y2: base, stroke: GRID, 'stroke-width': 0.8, class: 'bridge-chart__fade' })

  bucklingFits.forEach((fit, index) => {
    const maxX = Math.min(420, 6.8 / fit.slopeNm2)
    svgElement(svg, 'path', {
      d: `M${mapX(0)} ${mapY(0)} L${mapX(maxX)} ${mapY(fit.slopeNm2 * maxX)}`,
      fill: 'none',
      stroke: shades[fit.group],
      'stroke-width': index === 2 ? 1.2 : 0.8,
      'stroke-dasharray': index === 2 ? 'none' : '3 3',
      pathLength: 1,
      class: 'bridge-chart__draw',
      style: `animation-delay:${0.18 + index * 0.08}s`,
    })
  })

  bucklingTrials.forEach((trial, index) => {
    const inverseLengthSquared = 1 / ((trial.lengthMm / 1000) ** 2)
    const x = mapX(inverseLengthSquared)
    const y = mapY(trial.loadN)
    const isExtreme = trial.loadN === 6.66099 || trial.loadN === 0.03924
    svgElement(svg, 'line', { x1: x, y1: base, x2: x, y2: y, stroke: '#B0AFA9', 'stroke-width': 0.55, opacity: 0.62, class: 'bridge-chart__fade', style: `animation-delay:${0.16 + index * 0.03}s` })
    const dot = svgElement(svg, 'circle', {
      cx: x,
      cy: y,
      r: isExtreme ? 4.4 : 2.6,
      fill: isExtreme ? INK : shades[trial.group],
      class: 'bridge-chart__pop',
      style: `animation-delay:${0.22 + index * 0.035}s`,
    })
    svgTip(dot, `${trial.group} ${trial.diameterMm.toFixed(1)} mm: ${trial.lengthMm} mm long, ${trial.loadN.toFixed(3)} N`)
    if (isExtreme) {
      svgText(svg, {
        x,
        y: y - 10,
        'font-size': 7.5,
        'font-weight': 800,
        fill: INK,
        'text-anchor': 'middle',
        style: `paint-order:stroke;stroke:${PAPER};stroke-width:3px`,
        class: 'bridge-chart__fade',
      }, `${trial.loadN.toFixed(3)} N`)
    }
  })

  svgText(svg, { x: 200, y: 286, 'font-size': 7, 'font-weight': 700, fill: MID, 'text-anchor': 'middle', class: 'bridge-chart__fade' }, 'INVERSE LENGTH SQUARED (1/M^2)')
  svgText(svg, { x: 14, y: 160, 'font-size': 7, 'font-weight': 700, fill: MID, 'text-anchor': 'middle', transform: 'rotate(-90 14 160)', class: 'bridge-chart__fade' }, 'CRITICAL LOAD (N)')
  svgText(svg, { x: 200, y: 306, 'font-size': 7, 'font-weight': 600, fill: FAINT, 'text-anchor': 'middle', class: 'bridge-chart__fade' }, 'EVERY DOT HANGS A PLUMB LINE / FITS ARE CONSTRAINED THROUGH ZERO')
}

function drawIterationTicks(svg) {
  const x0 = 110
  const maxUnits = 35
  const pixelsPerUnit = 6.7
  const rowY = (index) => 45 + index * 42
  const targetX = x0 + 25 * pixelsPerUnit

  svgElement(svg, 'line', { x1: targetX, y1: 25, x2: targetX, y2: 267, stroke: MID, 'stroke-width': 0.7, 'stroke-dasharray': '2 4', class: 'bridge-chart__fade' })
  svgText(svg, { x: targetX, y: 17, 'font-size': 7, 'font-weight': 700, fill: MID, 'text-anchor': 'middle', class: 'bridge-chart__fade' }, '50 KG TARGET')

  bridgeIterations.forEach((iteration, index) => {
    const y = rowY(index)
    const units = iteration.capacityKg / 2
    const fullTicks = Math.floor(units)
    svgText(svg, { x: x0 - 12, y: y + 3, 'font-size': 8, 'font-weight': 700, fill: '#6A6963', 'text-anchor': 'end', class: 'bridge-chart__fade' }, iteration.id)
    svgElement(svg, 'line', { x1: x0, y1: y + 9, x2: x0 + maxUnits * pixelsPerUnit, y2: y + 9, stroke: GRID, 'stroke-width': 0.6, class: 'bridge-chart__fade' })
    for (let tick = 0; tick < fullTicks; tick += 1) {
      const x = x0 + tick * pixelsPerUnit + pixelsPerUnit / 2
      const height = 8 + deterministicJitter(tick + 1, index + 2) * 6
      svgElement(svg, 'line', {
        x1: x,
        y1: y + 9,
        x2: x,
        y2: y + 9 - height,
        stroke: index === bridgeIterations.length - 1 ? INK : DARK_MID,
        'stroke-width': 0.9,
        opacity: 0.58 + deterministicJitter(tick + 3, index + 5) * 0.42,
        class: 'bridge-chart__fade',
        style: `animation-delay:${index * 0.07 + tick * 0.008}s`,
      })
      if ((tick + 1) % 5 === 0) svgElement(svg, 'circle', { cx: x, cy: y + 13, r: 0.8, fill: FAINT, class: 'bridge-chart__fade' })
    }
    const exactX = x0 + units * pixelsPerUnit
    const cap = svgElement(svg, 'line', { x1: exactX, y1: y - 7, x2: exactX, y2: y + 9, stroke: INK, 'stroke-width': 1.4, class: 'bridge-chart__pop' })
    svgTip(cap, `${iteration.id}: ${iteration.capacityKg.toFixed(2)} kg modeled capacity, ${iteration.massG.toFixed(2)} g estimated mass`)
    svgText(svg, { x: exactX + 7, y: y + 3, 'font-size': 8.5, 'font-weight': 800, fill: INK, class: 'bridge-chart__fade' }, iteration.capacityKg.toFixed(2))
  })

  svgText(svg, { x: 200, y: 306, 'font-size': 7, 'font-weight': 600, fill: FAINT, 'text-anchor': 'middle', class: 'bridge-chart__fade' }, 'ONE TICK = 2 KG MODELED CAPACITY / EXACT VALUE MARKS EACH ROW END')
}

export function SpaghettiBridgeAnalysis() {
  const bendingRows = bendingSeries.flatMap((series) => series.points.map(([deflectionMm, massG], index) => ({
    id: `${series.id}-${index}`,
    condition: series.label,
    deflectionMm,
    massG,
    loadN: massG * 0.00981,
  })))

  return (
    <section className="spaghetti-analysis">
      <SectionHeading number="03 / THE EVIDENCE CHAIN" title="The bridge started with broken pasta.">
        <p>We ran tension, bending, and buckling tests before sizing a member. Bending returned 2.85 GPa, while buckling returned 7.55 GPa under the assumed end factor. We treated that spread as uncertainty and designed with 2.50 GPa, the lowest measured tensile strength of 17.34 MPa, and a 30.0 MPa flexural limit.</p>
      </SectionHeading>

      <ol className="spaghetti-analysis__process" aria-label="Bridge project process">
        {processSteps.map(({ icon: Icon, label, detail }, index) => (
          <li key={label}>
            <Icon aria-hidden="true" />
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{label}</strong>
            <p>{detail}</p>
          </li>
        ))}
      </ol>

      <div className="spaghetti-analysis__metrics" aria-label="Project result summary">
        <div><strong>73</strong><span>material readings</span></div>
        <div><strong>8</strong><span>model iterations</span></div>
        <div><strong>16.000 kg</strong><span>contest load</span></div>
        <div><strong>6 / 72</strong><span>EZ final rank</span></div>
      </div>

      <div className="spaghetti-analysis__formula-strip" aria-label="Core material formulas">
        {formulas.map((formula) => <Formula formula={formula} key={formula.label} />)}
      </div>

      <section className="spaghetti-analysis__labs" aria-labelledby="spaghetti-labs-title">
        <SectionHeading number="04 / MATERIAL EXPERIMENTS" title="Three tests, three parts of the load path.">
          <p id="spaghetti-labs-title">Tension sized the ties. Bending set a lower stiffness and a flexural limit. Buckling showed why compression members had to be short, thick, and restrained.</p>
        </SectionHeading>

        <article className="spaghetti-analysis__lab">
          <div className="spaghetti-analysis__lab-copy">
            <span>TENSION LAB / 12 BREAKS</span>
            <h4>Area changed the force. Stress stayed near 21 MPa.</h4>
            <p>The 15.0 cm bucket arm and 7.5 cm specimen arm doubled the bucket weight at the pasta. Failure force followed <i>F</i> = 15.70<i>d</i><sup>2.147</sup> with R-squared = 0.962. The overall tensile strength was 21.00 +/- 1.74 MPa, but the bridge model used the measured minimum of 17.34 MPa.</p>
          </div>
          <LieflatChart
            chart="tension"
            title="Diameter raised failure force, not failure stress."
            subtitle="12 tensile breaks / one rung = 1 N of group mean force / exact mean at the cap"
            source="F1 RUNG BARS / MONO-BASIC / TENSION LAB WORKBOOK"
            ariaLabel="Mean tensile failure force for thin, medium, and thick pasta groups"
          />
          <DataDetails label="All 12 tension trials">
            <table>
              <thead><tr><th>Specimen</th><th>Group</th><th>Diameter</th><th>Failure mass</th><th>Force</th><th>Stress</th></tr></thead>
              <tbody>
                {tensionTrials.map((trial) => (
                  <tr key={trial.specimen}>
                    <td>{trial.specimen}</td><td>{trial.group}</td><td>{trial.diameterMm.toFixed(1)} mm</td><td>{trial.massG} g</td><td>{trial.forceN.toFixed(2)} N</td><td>{trial.stressMpa.toFixed(2)} MPa</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataDetails>
        </article>

        <article className="spaghetti-analysis__lab">
          <div className="spaghetti-analysis__lab-copy">
            <span>BENDING LAB / 46 READINGS</span>
            <h4>Shorter spans and larger diameters resisted bending.</h4>
            <p>Five load-deflection series gave a mean Young's modulus of 2.85 +/- 0.34 GPa. For 1.7 mm spaghetti, extending the span from 82 to 122 mm reduced the last recorded load by 35.8%. At 82 mm, the thick sample carried 3.45 times the load of angel hair.</p>
          </div>
          <LieflatChart
            chart="bending"
            title="Longer spans traded load for deflection."
            subtitle="five conditions / every dot is one measured pair / label = diameter in mm and span in mm"
            source="F2 HAIRLINE LINE / MONO-BASIC / BENDING LAB WORKBOOK"
            ariaLabel="Bending load versus center deflection for five pasta and span conditions"
          />
          <DataDetails label="All 46 bending readings">
            <table>
              <thead><tr><th>Condition</th><th>Deflection</th><th>Total mass</th><th>Load</th></tr></thead>
              <tbody>
                {bendingRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.condition}</td><td>{row.deflectionMm} mm</td><td>{row.massG} g</td><td>{row.loadN.toFixed(3)} N</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataDetails>
        </article>

        <article className="spaghetti-analysis__lab">
          <div className="spaghetti-analysis__lab-copy">
            <span>BUCKLING LAB / 15 TRIALS</span>
            <h4>Euler's geometry terms survived a rough hand-held test.</h4>
            <p>The measured exponents were 4.23 +/- 0.13 for diameter and -2.030 +/- 0.048 for length, close to Euler's fourth-power and inverse-square terms. With the assumed end factor <i>K</i> = 0.7, the modulus was 7.55 +/- 0.35 GPa. Because <i>K</i> was estimated rather than measured, the bridge model kept the lower 2.50 GPa value.</p>
          </div>
          <LieflatChart
            chart="buckling"
            title="Critical load became linear against inverse length squared."
            subtitle="15 compression trials / plumb line = one record / shades separate 1.1, 1.4, and 1.7 mm pasta"
            source="F8 PLUMB SCATTER / MONO-BASIC / BUCKLING LAB WORKBOOK"
            ariaLabel="Critical buckling load plotted against inverse length squared for all 15 trials"
          />
          <DataDetails label="All 15 buckling trials">
            <table>
              <thead><tr><th>Group</th><th>Trial</th><th>Diameter</th><th>Length</th><th>Scale mass</th><th>Critical load</th></tr></thead>
              <tbody>
                {bucklingTrials.map((trial) => (
                  <tr key={`${trial.group}-${trial.trial}`}>
                    <td>{trial.group}</td><td>{trial.trial}</td><td>{trial.diameterMm.toFixed(1)} mm</td><td>{trial.lengthMm} mm</td><td>{trial.massG} g</td><td>{trial.loadN.toFixed(3)} N</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataDetails>
        </article>
      </section>

      <section className="spaghetti-analysis__model" aria-labelledby="spaghetti-model-title">
        <SectionHeading number="05 / RAISING THE MODEL" title="Mass and clearance decided which load path we could build.">
          <p id="spaghetti-model-title">We screened Pratt, Warren, king-post, and bowstring-Pratt forms. The four-panel bowstring shortened the compression path enough to avoid primary-member splices, then the later iterations traded a little predicted capacity for mass and vehicle clearance.</p>
        </SectionHeading>

        <LieflatChart
          chart="iterations"
          title="Iteration 05 traded 1.56 kg of capacity for a buildable mass."
          subtitle="iterations 00 to 05 / one tick = 2 kg modeled capacity / exact value marks the row end"
          source="F5 TICK ROWS / MONO-BASIC / ITERATION SUMMARY JSON"
          ariaLabel="Modeled conservative capacity across bridge design iterations zero through five"
        />

        <ol className="spaghetti-analysis__iterations">
          {bridgeIterations.map((iteration) => (
            <li key={iteration.id}>
              <span>{iteration.id}</span>
              <div><strong>{iteration.title}</strong><p>{iteration.decision}</p></div>
              <dl><div><dt>Capacity</dt><dd>{iteration.capacityKg.toFixed(2)} kg</dd></div><div><dt>Mass</dt><dd>{iteration.massG.toFixed(2)} g</dd></div></dl>
            </li>
          ))}
        </ol>

        <div className="spaghetti-analysis__model-figures">
          <figure>
            <img src={iteration05Model} alt="Iteration 05 three-dimensional bowstring-Pratt bridge model at the 50 kg load case" />
            <figcaption><strong>ITERATION 05 / RECOMMENDED BUILD</strong><span>67.21 kg conservative modeled capacity, 248.68 g estimated mass, 3.48 mm predicted deflection at 50 kg.</span></figcaption>
          </figure>
          <figure>
            <img src={iteration07Model} alt="Iteration 07 revised three-dimensional bridge model with load rails and full-span ties" />
            <figcaption><strong>ITERATION 07 / AS-BUILT GEOMETRY</strong><span>We removed 15 bracing members, then added two 10-strand loading rails and two 3-strand full-span bottom ties.</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="spaghetti-analysis__assessment" aria-labelledby="spaghetti-assessment-title">
        <SectionHeading number="06 / ASSESS AND ITERATE" title="The as-built bridge exposed a lateral stability problem.">
          <p id="spaghetti-assessment-title">Removing the top and deck-plane triangulation left seven zero-energy lateral mechanisms in the unrestricted 3-D truss model. Under explicit planar restraint, the revised bridge reached a 65.48 kg proxy capacity and 3.09 mm deflection at 50 kg. That proxy diagnoses the vertical load path; it does not verify the unbraced physical bridge.</p>
        </SectionHeading>

        <div className="spaghetti-analysis__assessment-grid">
          <figure>
            <img src={iteration07Stability} alt="Stability diagnostic showing a representative zero-energy lateral mechanism and rank deficiency of seven" />
            <figcaption><strong>UNRESTRAINED MODEL / FAIL</strong><span>52 free degrees of freedom, stiffness rank 45, rank deficiency 7.</span></figcaption>
          </figure>
          <figure>
            <img src={iteration07Response} alt="Planar-restraint proxy response under a 50 kg asymmetric center load" />
            <figcaption><strong>PLANAR PROXY / CONDITIONAL</strong><span>65.48 kg capacity only with lateral restraint and full intermediate bonds on the bottom ties.</span></figcaption>
          </figure>
        </div>

        <div className="spaghetti-analysis__decision-note">
          <strong>What changed after the assessment</strong>
          <p>The continuous bottom ties had to bond into stations 01, 02, and 03. Endpoint-only bonds reduced the proxy capacity to 58.40 kg. The loading rails also had to connect at station 02; without that transfer point, the optimistic two-rail bending estimate was only 1.49 kg.</p>
        </div>
      </section>

      <section className="spaghetti-analysis__build" aria-labelledby="spaghetti-build-title">
        <SectionHeading number="07 / BUILD ARCHIVE" title="Two flat side trusses became one 249 g bridge.">
          <p id="spaghetti-build-title">We built each side on a full-size layout, cured the bundled chords before assembly, joined the sides around the road deck, and kept the center platform load path clear. The photos show the actual joints and members, including the places where fabrication did not match a clean numerical model.</p>
        </SectionHeading>

        <div className="spaghetti-analysis__build-grid">
          <figure><img src={sideTrussLeft} alt="First pasta side truss curing on a paper-covered workbench" /><figcaption><strong>SIDE A</strong><span>Bundled top chord, thin bottom tie, verticals, and diagonals laid flat.</span></figcaption></figure>
          <figure><img src={sideTrussRight} alt="Second pasta side truss beside a ruler and scissors during fabrication" /><figcaption><strong>SIDE B</strong><span>The ruler kept station spacing visible while joints cured.</span></figcaption></figure>
          <figure><img src={pairedSideTrusses} alt="Two completed pasta side trusses placed together before final assembly" /><figcaption><strong>PAIRING</strong><span>Both load paths were checked together before the deck joined them.</span></figcaption></figure>
          <figure className="spaghetti-analysis__build-wide"><img src={assembledBridge} alt="Assembled yellow pasta bridge on the team workbench" /><figcaption><strong>ASSEMBLY</strong><span>The bowstring-Pratt form, center platform, road deck, and paired side planes are visible in the final workbench build.</span></figcaption></figure>
        </div>
      </section>

      <section className="spaghetti-analysis__contest" aria-labelledby="spaghetti-contest-title">
        <SectionHeading number="08 / FINAL OUTCOME" title="EZ carried 16.000 kg and finished 6th of 72 teams.">
          <p id="spaghetti-contest-title">The physical bridge held 16.000 kg against the model's 50 kg design target and still placed in the top 8.3% of the field. The result measured what the axial model could not: joint behavior, lateral restraint, fabrication damage, and load introduction.</p>
        </SectionHeading>

        <div className="spaghetti-analysis__contest-grid">
          <figure className="spaghetti-analysis__team-photo">
            <img src={ezTeamFinal} alt="Four members of team EZ holding their completed pasta bridge after the contest" />
            <figcaption><strong>TEAM EZ / FINAL BRIDGE</strong><span>Four builders, one bridge, and a result earned on the competition floor.</span></figcaption>
          </figure>
          <figure className="spaghetti-analysis__leaderboard">
            <img src={contestLeaderboard} alt="Competition leaderboard showing team EZ with a score of 16.000" />
            <figcaption>
              <div><strong>{contestResult.loadKg.toFixed(3)} kg</strong><span>supported load</span></div>
              <div><strong>{contestResult.rank} / {contestResult.fieldSize}</strong><span>final rank</span></div>
            </figcaption>
          </figure>
        </div>
      </section>
    </section>
  )
}
