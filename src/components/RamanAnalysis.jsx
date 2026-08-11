import { Activity, ArrowRight, Beaker, Check, Filter, Gauge, ScanLine } from 'lucide-react'
import {
  ramanAssets,
  ramanCalibration,
  ramanClassOutcomes,
  ramanConcentrationModels,
  ramanConcentrationClassOutcomes,
  ramanDataset,
  ramanGlobalRegression,
  ramanHoldoutAccuracy,
  ramanMcrAccuracy,
  ramanMcrClassOutcomes,
  ramanModelBenchmark,
  ramanClassifierBenchmark,
  ramanJointPipeline,
  ramanPhysicsBenchmark,
  ramanRegression,
  ramanScanCoverage,
  ramanScanCoverageColumns,
  ramanSubclassOutcomes,
} from '../data/ramanData'
import './RamanAnalysis.css'
import { AssetImage } from './AssetImage'

// Lieflat selection audit: F8 Plumb Scatter is the closest honest template for
// five parameter records; L3 Barcode Lollipop needs a time series, while F9
// Rung Waterfall would imply additive quantities that the source image does not provide.
const stages = [
  {
    number: '01',
    label: 'SAMPLE',
    title: 'Collect 86 raw spectra across five source folders.',
    icon: Beaker,
  },
  {
    number: '02',
    label: 'ACQUIRE',
    title: 'Parse Raman shift and dark-subtracted intensity from each scan.',
    icon: ScanLine,
  },
  {
    number: '03',
    label: 'DENOISE',
    title: 'Despike, ALS-correct, then compare five Savitzky-Golay settings.',
    icon: Filter,
  },
  {
    number: '04',
    label: 'MONITOR',
    title: 'Use ROI plus first-derivative features in group-aware ML splits.',
    icon: Activity,
  },
]

const denoisers = [
  { label: 'SG (2, 5)', polynomial: 2, window: 5 },
  { label: 'SG (2, 9)', polynomial: 2, window: 9, selected: true },
  { label: 'SG (2, 15)', polynomial: 2, window: 15 },
  { label: 'SG (3, 7)', polynomial: 3, window: 7 },
  { label: 'SG (3, 11)', polynomial: 3, window: 11 },
]

const inputPanels = [
  ['A', 'RAW VS PROCESSED', 'The input panel keeps the unsmoothed trace visible beside the processed signal.'],
  ['B', 'ALL DENOISERS', 'Five candidate SG settings are compared on the same normalized scale.'],
  ['C', 'BEST SETTING', 'The supplied analysis marks SG (2, 9) as the working denoiser.'],
  ['D', 'FINAL SPECTRUM', 'The selected setting becomes the spectrum used for downstream interpretation.'],
]

function MethodChart() {
  const chartLeft = 118
  const chartRight = 510
  const chartTop = 52
  const chartBottom = 222
  const chartWidth = chartRight - chartLeft
  const chartHeight = chartBottom - chartTop
  const xForWindow = (windowSize) => chartLeft + ((windowSize - 3) / 14) * chartWidth
  const yForPolynomial = (polynomial) => chartBottom - ((polynomial - 1) / 2) * chartHeight

  return (
    <svg
      className="raman-analysis__method-chart"
      viewBox="0 0 560 286"
      role="img"
      aria-labelledby="raman-method-chart-title raman-method-chart-description"
    >
      <title id="raman-method-chart-title">Savitzky-Golay settings tested</title>
      <desc id="raman-method-chart-description">
        Five settings from the supplied analysis are plotted by smoothing window. SG (2, 9) is marked as the selected setting.
      </desc>
      <g className="raman-analysis__chart-grid">
        {[3, 5, 7, 9, 11, 13, 15, 17].map((tick) => {
          const x = xForWindow(tick)
          return (
            <g key={tick}>
              <line x1={x} x2={x} y1={chartTop} y2={chartBottom} />
              <text x={x} y="258" textAnchor="middle">{tick}</text>
            </g>
          )
        })}
        {[2, 3].map((tick) => {
          const y = yForPolynomial(tick)
          return (
            <g key={tick}>
              <line x1={chartLeft} x2={chartRight} y1={y} y2={y} />
              <text x="102" y={y + 4} textAnchor="end">{tick}</text>
            </g>
          )
        })}
        <line x1={chartLeft} x2={chartRight} y1={chartBottom} y2={chartBottom} className="raman-analysis__chart-axis" />
      </g>
      <text x="18" y="22" className="raman-analysis__chart-kicker">PLUMB SCATTER / F8</text>
      <text x="18" y="42" className="raman-analysis__chart-kicker">POLYNOMIAL ORDER</text>
      <text x="18" y="275" className="raman-analysis__chart-axis-label">SG window size</text>
      {denoisers.map((setting, index) => {
        const y = yForPolynomial(setting.polynomial) + (setting.polynomial === 2 ? (index === 1 ? -5 : index === 2 ? 5 : 0) : (index === 3 ? -5 : 5))
        const x = xForWindow(setting.window)
        return <g key={setting.label} className={setting.selected ? 'raman-analysis__method-row raman-analysis__method-row--selected' : 'raman-analysis__method-row'}>
          <line x1={x} x2={x} y1={chartBottom} y2={y} className="raman-analysis__method-plumb" />
          <circle cx={x} cy={y} r={setting.selected ? 8 : 5} className="raman-analysis__method-dot" />
          <text x={x + 9} y={y - 8} className="raman-analysis__method-label">{setting.label}</text>
          {setting.selected ? <text x={x + 12} y={y + 17} className="raman-analysis__selected-label">SELECTED</text> : null}
        </g>
      })}
    </svg>
  )
}

function AccuracyGauge() {
  const ticks = Array.from({ length: 20 }, (_, index) => index)
  return (
    <div className="raman-analysis__gauge" role="img" aria-label="Demo outcome accuracy 93.2 percent">
      <div className="raman-analysis__gauge-value">93.2<span>%</span></div>
      <div className="raman-analysis__gauge-track" aria-hidden="true">
        {ticks.map((tick) => <i key={tick} className={tick < 19 ? 'is-filled' : ''} />)}
      </div>
      <div className="raman-analysis__gauge-meta">
        <span>DEMO OUTCOME ACCURACY</span>
        <Gauge aria-hidden="true" />
      </div>
    </div>
  )
}

function TickRowsChart({ data, valueKey, labelKey, max = 100, valueSuffix = '%' }) {
  const chartWidth = 620
  const rowHeight = 38
  const left = 174
  const right = 560
  const top = 36
  const height = top + data.length * rowHeight + 28
  const xForValue = (value) => left + (value / max) * (right - left)

  return (
    <svg
      className="raman-analysis__atlas-chart"
      viewBox={`0 0 ${chartWidth} ${height}`}
      role="img"
      aria-label="Ranked data comparison"
    >
      <g className="raman-analysis__chart-grid">
        {[0, 25, 50, 75, 100].map((tick) => {
          const x = xForValue(tick)
          return <g key={tick}><line x1={x} x2={x} y1={top - 12} y2={height - 24} /><text x={x} y={height - 8} textAnchor="middle">{tick}</text></g>
        })}
      </g>
      {data.map((item, index) => {
        const y = top + index * rowHeight
        const value = item[valueKey]
        const end = xForValue(value)
        const spread = item.spread
        const spreadStart = spread ? xForValue(Math.max(0, value - spread)) : end
        const spreadEnd = spread ? xForValue(Math.min(max, value + spread)) : end
        return (
          <g key={item[labelKey]} className={index === 0 ? 'raman-analysis__atlas-row is-featured' : 'raman-analysis__atlas-row'}>
            <text x={left - 12} y={y + 4} textAnchor="end" className="raman-analysis__atlas-label">{item[labelKey]}</text>
            <line x1={left} x2={right} y1={y} y2={y} className="raman-analysis__atlas-track" />
            <line x1={left} x2={end} y1={y} y2={y} className="raman-analysis__atlas-value" />
            {spread ? <line x1={spreadStart} x2={spreadEnd} y1={y} y2={y} className="raman-analysis__atlas-uncertainty" /> : null}
            <circle cx={end} cy={y} r={index === 0 ? 5 : 4} className="raman-analysis__atlas-dot" />
            <text x={Math.min(end + 10, right + 28)} y={y + 4} className="raman-analysis__atlas-number">{value.toFixed(1)}{valueSuffix}</text>
          </g>
        )
      })}
    </svg>
  )
}

function ConcentrationChart() {
  const chartWidth = 620
  const chartHeight = 230
  const left = 56
  const right = 570
  const top = 30
  const bottom = 182
  const xForIndex = (index) => left + (index / (ramanHoldoutAccuracy.length - 1)) * (right - left)
  const yForValue = (value) => bottom - (value / 100) * (bottom - top)
  const path = ramanHoldoutAccuracy.map((item, index) => `${index ? 'L' : 'M'} ${xForIndex(index)} ${yForValue(item.accuracy)}`).join(' ')
  return (
    <svg className="raman-analysis__atlas-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="Leave-one-concentration-out accuracy by concentration">
      <g className="raman-analysis__chart-grid">
        {[0, 25, 50, 75, 100].map((tick) => <g key={tick}><line x1={left} x2={right} y1={yForValue(tick)} y2={yForValue(tick)} /><text x={left - 10} y={yForValue(tick) + 4} textAnchor="end">{tick}</text></g>)}
      </g>
      <path d={path} className="raman-analysis__atlas-line" />
      {ramanHoldoutAccuracy.map((item, index) => <g key={item.concentration}><circle cx={xForIndex(index)} cy={yForValue(item.accuracy)} r="5" className="raman-analysis__atlas-dot" /><text x={xForIndex(index)} y={yForValue(item.accuracy) - 12} textAnchor="middle" className="raman-analysis__atlas-number">{item.accuracy.toFixed(1)}</text><text x={xForIndex(index)} y={bottom + 24} textAnchor="middle" className="raman-analysis__atlas-label">{item.concentration}</text></g>)}
      <text x={right} y={chartHeight - 3} textAnchor="end" className="raman-analysis__chart-axis-label">held-out concentration (g/L)</text>
    </svg>
  )
}

function RegressionChart() {
  const chartWidth = 620
  const rowHeight = 42
  const left = 196
  const right = 560
  const top = 30
  const height = top + ramanRegression.length * rowHeight + 34
  const xForValue = (value) => left + Math.max(0, value) * (right - left)
  return (
    <svg className="raman-analysis__atlas-chart" viewBox={`0 0 ${chartWidth} ${height}`} role="img" aria-label="Per-compound regression R squared comparison">
      <g className="raman-analysis__chart-grid">
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => { const x = xForValue(tick); return <g key={tick}><line x1={x} x2={x} y1={top - 12} y2={height - 28} /><text x={x} y={height - 9} textAnchor="middle">{tick.toFixed(2)}</text></g> })}
      </g>
      {ramanRegression.map((item, index) => { const y = top + index * rowHeight; const x = xForValue(item.r2); return <g key={item.compound}><text x={left - 12} y={y + 4} textAnchor="end" className="raman-analysis__atlas-label">{item.compound}</text><line x1={left} x2={right} y1={y} y2={y} className="raman-analysis__atlas-track" /><line x1={left} x2={x} y1={y} y2={y} className="raman-analysis__atlas-value" /><circle cx={x} cy={y} r="5" className="raman-analysis__atlas-dot" /><text x={Math.min(x + 10, right + 20)} y={y + 4} className="raman-analysis__atlas-number">R² {item.r2.toFixed(3)}</text></g> })}
    </svg>
  )
}

function McrChart() {
  const chartWidth = 620
  const chartHeight = 220
  const left = 56
  const right = 570
  const top = 26
  const bottom = 170
  const xForIndex = (index) => left + (index / (ramanMcrAccuracy.length - 1)) * (right - left)
  const yForValue = (value) => bottom - (value / 100) * (bottom - top)

  return (
    <svg className="raman-analysis__atlas-chart" viewBox={`0 0 ${chartWidth} ${chartHeight}`} role="img" aria-label="MCR hard-decision accuracy by physical concentration">
      <g className="raman-analysis__chart-grid">
        {[0, 25, 50, 75, 100].map((tick) => <g key={tick}><line x1={left} x2={right} y1={yForValue(tick)} y2={yForValue(tick)} /><text x={left - 10} y={yForValue(tick) + 4} textAnchor="end">{tick}</text></g>)}
      </g>
      {ramanMcrAccuracy.map((item, index) => {
        const x = xForIndex(index)
        const y = yForValue(item.accuracy)
        return <g key={item.concentration}><line x1={x} x2={x} y1={bottom} y2={y} className="raman-analysis__atlas-value" /><circle cx={x} cy={y} r="5" className="raman-analysis__atlas-dot" /><text x={x} y={y - 12} textAnchor="middle" className="raman-analysis__atlas-number">{item.accuracy.toFixed(1)}</text><text x={x} y={bottom + 22} textAnchor="middle" className="raman-analysis__atlas-label">{item.concentration}</text></g>
      })}
      <text x={right} y={chartHeight - 3} textAnchor="end" className="raman-analysis__chart-axis-label">physical concentration (g/L)</text>
    </svg>
  )
}

// L8 Dotty Matrix is the closest Lieflat template for a class x concentration
// grid; each bar preserves the real scan count instead of inventing a heat scale.
function ScanCoverageChart() {
  const columns = ramanScanCoverageColumns.slice(1)
  const columnWidth = 48
  const rowHeight = 34
  const left = 196
  const top = 34
  const width = left + columns.length * columnWidth + 44
  const height = top + ramanScanCoverage.length * rowHeight + 48
  const max = 9

  return (
    <svg className="raman-analysis__coverage-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-labelledby="raman-coverage-title raman-coverage-description">
      <title id="raman-coverage-title">Scan coverage by class and concentration</title>
      <desc id="raman-coverage-description">An exact count matrix of the 86 scans in the supplied processed index. Darker ticks indicate more scans in a class and concentration cell.</desc>
      <g className="raman-analysis__coverage-grid">
        {columns.map((column, columnIndex) => <text key={column} x={left + columnIndex * columnWidth + columnWidth / 2} y="16" textAnchor="middle">{column}</text>)}
        {ramanScanCoverage.map((row, rowIndex) => {
          const y = top + rowIndex * rowHeight
          return <g key={row.label}>
            <text x={left - 14} y={y + 4} textAnchor="end" className="raman-analysis__coverage-label">{row.label}</text>
            {row.values.slice(0, columns.length).map((value, columnIndex) => {
              const x = left + columnIndex * columnWidth + 6
              const barHeight = value ? Math.max(5, (value / max) * 22) : 0
              return <g key={`${row.label}-${columns[columnIndex]}`}>
                <line x1={x} x2={x + columnWidth - 12} y1={y + 23} y2={y + 23} className="raman-analysis__coverage-track" />
                {value ? <rect x={x} y={y + 23 - barHeight} width={columnWidth - 12} height={barHeight} className="raman-analysis__coverage-bar" /> : null}
                <text x={x + (columnWidth - 12) / 2} y={y + 38} textAnchor="middle" className="raman-analysis__coverage-value">{value || ''}</text>
              </g>
            })}
            <text x={width - 5} y={y + 4} textAnchor="end" className="raman-analysis__coverage-total">{row.total}</text>
          </g>
        })}
        <text x={width - 5} y="16" textAnchor="end">TOTAL</text>
      </g>
    </svg>
  )
}

function DataTable({ label, columns, rows, rowKey }) {
  return (
    <div className="raman-analysis__table-wrap">
      <table className="raman-analysis__table">
        <caption>{label}</caption>
        <thead><tr>{columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={rowKey ? rowKey(row) : index}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(row) : row[column.key]}</td>)}</tr>)}</tbody>
      </table>
    </div>
  )
}

const percent = (value) => `${value.toFixed(1)}%`
const signed = (value) => value.toFixed(3)

function AtlasFigure({ src, alt, caption, className = '' }) {
  return <figure className={`raman-analysis__atlas-figure ${className}`}><AssetImage src={src} alt={alt} /><figcaption>{caption}</figcaption></figure>
}

export function RamanAnalysis({ sourceImage }) {
  return (
    <section className="raman-analysis" aria-labelledby="raman-analysis-title">
      <div className="raman-analysis__section-heading">
        <p className="project-case__section-number">03 / OVERALL ABSTRACTION</p>
        <h2 id="raman-analysis-title">Turn a liquid sample into a monitoring signal.</h2>
        <p>
          This project is best understood as a lab-to-decision pipeline: a fermentation sample becomes a Raman signature,
          the signature is cleaned without hiding its structure, and a small model turns the cleaned signal into a monitoring readout.
        </p>
      </div>

      <ol className="raman-analysis__procedure" aria-label="Raman fermentation analysis procedure">
        {stages.map((stage, index) => {
          const Icon = stage.icon
          return (
            <li key={stage.number}>
              <div className="raman-analysis__procedure-top">
                <span>{stage.number}</span>
                <Icon aria-hidden="true" />
              </div>
              <strong>{stage.label}</strong>
              <p>{stage.title}</p>
              {index < stages.length - 1 ? <ArrowRight aria-hidden="true" className="raman-analysis__procedure-arrow" /> : null}
            </li>
          )
        })}
      </ol>

      <div className="raman-analysis__evidence">
        <div className="raman-analysis__evidence-copy">
          <p className="project-case__section-number">04 / SOURCE DATA</p>
          <h3>Every panel answers a different question.</h3>
          <p>
            The supplied figure is the authoritative record for the spectral work. It moves from the input trace, through denoiser selection,
            to the final spectrum used for interpretation.
          </p>
          <ul>
            {inputPanels.map(([letter, label, description]) => (
              <li key={letter}>
                <span>{letter}</span>
                <div>
                  <strong>{label}</strong>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <figure className="raman-analysis__source-figure">
          <AssetImage src={sourceImage} alt="Four-panel Raman denoising analysis showing raw, processed, candidate denoisers, best setting, and final spectrum" />
          <figcaption>Supplied four-panel analysis · Raman shift range shown in the source image: approximately 200-2600 cm^-1</figcaption>
        </figure>
      </div>

      <div className="raman-analysis__method">
        <div className="raman-analysis__method-copy">
          <p className="project-case__section-number">05 / DENOISER CHOICE</p>
          <h3>SG (2, 9) is the working compromise.</h3>
          <p>
            The legend in the supplied comparison panel lists five Savitzky-Golay candidates. The selected window sits between the shortest and
            longest tested windows, preserving a useful middle ground for the final spectrum.
          </p>
          <div className="raman-analysis__method-note">
            <Check aria-hidden="true" />
            <span>Selected in the source analysis: <strong>SG (2, 9)</strong> on the original scale.</span>
          </div>
        </div>
        <div className="raman-analysis__chart-wrap">
          <MethodChart />
          <p className="raman-analysis__chart-caption">F8 PLUMB SCATTER ADAPTATION · parameter map only; the supplied image does not expose per-method error scores.</p>
        </div>
      </div>

      <div className="raman-analysis__conclusion">
        <div>
          <p className="project-case__section-number">06 / FINAL OUTCOME</p>
          <h3>A promising prototype for real-time fermentation monitoring.</h3>
          <p>
            The reported demo outcome accuracy is 93.2%, connecting spectral preprocessing to a practical fermentation-monitoring use case.
            This is evidence of a working prototype, not a claim of generalization: the supplied record does not include the validation-set size,
            class balance, or error bars needed to make a broader performance claim.
          </p>
        </div>
        <AccuracyGauge />
      </div>

      <section className="raman-analysis__atlas" aria-labelledby="raman-atlas-title">
        <div className="raman-analysis__atlas-heading">
          <p className="project-case__section-number">07 / EVIDENCE ATLAS</p>
          <h3 id="raman-atlas-title">The complete readout, in one pass.</h3>
          <p>These panels keep the project honest: what separates the classes, which model is stable across folds, where concentration holdout is weak, and which compound is actually quantifiable.</p>
        </div>

        <div className="raman-analysis__data-strip" aria-label="Dataset scope">
          <div><strong>{ramanDataset.rawSpectra}</strong><span>raw spectra</span></div>
          <div><strong>{ramanDataset.processedSpectra}</strong><span>processed CSVs</span></div>
          <div><strong>{ramanDataset.denoisedSpectra}</strong><span>denoised CSVs</span></div>
          <div><strong>{ramanDataset.analysisCsvOutputs}</strong><span>analysis CSVs</span></div>
          <div><strong>{ramanDataset.sourceClasses}</strong><span>source classes</span></div>
          <div><strong>{ramanDataset.roi}</strong><span>model ROI</span></div>
        </div>

        <article className="raman-analysis__coverage-card">
          <div className="raman-analysis__coverage-copy">
            <p className="project-case__section-number">S / SCAN COVERAGE</p>
            <h4>The archive is broad, but not evenly balanced.</h4>
            <p>Each bar is a real scan from the processed index. The nine Lactobacillus scans are reported at 0.06 g/L, while the three Pure Water scans are stored under the Jujuboside-A folder. The matrix makes those special conditions visible beside the four concentration series.</p>
          </div>
          <div className="raman-analysis__coverage-wrap">
            <ScanCoverageChart />
            <p className="raman-analysis__chart-caption">L8 DOTTY MATRIX ADAPTATION · one bar = one scan · counts transcribed from processed_index.csv</p>
          </div>
        </article>

        <div className="raman-analysis__atlas-grid">
          <article className="raman-analysis__atlas-card raman-analysis__atlas-card--wide">
            <div className="raman-analysis__atlas-card-head"><div><p className="project-case__section-number">A / CLASSIFICATION</p><h4>Random Forest leads the 5-fold benchmark.</h4></div><strong>82.7 ± 5.3%</strong></div>
            <p>Cross-validated accuracy is the stable comparison. The separate tuned test report reaches 93.3% on 15 held-out spectra, with Water-Spinosin providing the only visible miss.</p>
            <TickRowsChart data={ramanModelBenchmark} valueKey="accuracy" labelKey="model" />
          </article>
          <AtlasFigure src={ramanAssets.benchmark} alt="Source cross-validated model benchmark chart" caption="SOURCE FIGURE · model_benchmark_cv.png · 5-fold accuracy ± standard deviation" className="raman-analysis__atlas-card" />

          <AtlasFigure src={ramanAssets.classificationBenchmark} alt="Source non-cross-validated classifier benchmark chart" caption="SOURCE FIGURE · model_benchmark.png · diagnostic benchmark sweep" className="raman-analysis__atlas-card" />

          <AtlasFigure src={ramanAssets.meanSpectra} alt="Source mean spectra chart for six Raman classes" caption="SOURCE FIGURE · mean_spectra.png · class-separated mean spectra" className="raman-analysis__atlas-card raman-analysis__atlas-card--wide" />
          <AtlasFigure src={ramanAssets.confusion} alt="Source confusion matrix for tuned Random Forest classification" caption="SOURCE FIGURE · confusion_matrix.png · tuned Random Forest, 93.3% test accuracy" className="raman-analysis__atlas-card" />

          <article className="raman-analysis__atlas-card">
            <div className="raman-analysis__atlas-card-head"><div><p className="project-case__section-number">B / CONCENTRATION</p><h4>Holdout performance peaks at 0.06 g/L.</h4></div><strong>60.7%</strong></div>
            <p>Leave-one-concentration-out validation exposes a narrow operating window: accuracy falls to 40% at 0.10 g/L. This is the right test for deployment confidence.</p>
            <ConcentrationChart />
          </article>
          <AtlasFigure src={ramanAssets.holdout} alt="Source leave-one-concentration-out accuracy chart" caption="SOURCE FIGURE · loc_cv_accuracy.png · mean 60.7%" className="raman-analysis__atlas-card" />

          <article className="raman-analysis__atlas-card">
            <div className="raman-analysis__atlas-card-head"><div><p className="project-case__section-number">C / QUANTIFICATION</p><h4>Only the mixed standard is comfortably regressed.</h4></div><strong>R² 0.747</strong></div>
            <p>Per-compound Random Forest regression is uneven: Water-Mixed Std is usable, while the three single-compound results remain close to zero.</p>
            <RegressionChart />
          </article>
          <AtlasFigure src={ramanAssets.regression} alt="Source per-compound concentration regression chart" caption="SOURCE FIGURE · regression_per_compound.png · R² by compound" className="raman-analysis__atlas-card" />

          <AtlasFigure src={ramanAssets.concentration} alt="Source spectrum-only versus spectrum-plus-concentration classification comparison" caption="SOURCE FIGURE · classification_comparison.png · concentration feature does not lift the top three models" className="raman-analysis__atlas-card" />
          <AtlasFigure src={ramanAssets.physicsScaled} alt="Source comparison of unscaled and physics-scaled Raman spectra" caption="SOURCE FIGURE · physics_scaled_spectra_comparison.png · physics-scaled preprocessing check" className="raman-analysis__atlas-card raman-analysis__atlas-card--wide" />
          <article className="raman-analysis__atlas-card">
            <div className="raman-analysis__atlas-card-head"><div><p className="project-case__section-number">D / MCR-ALS</p><h4>Unsupervised unmixing is exploratory, not deployment evidence.</h4></div><strong>31.9%</strong></div>
            <p>MCR-ALS resolves the full physical batch mathematically and makes a hard label from the highest concentration factor. The 0.36 g/L slice reaches 100%, but the overall report remains a 31.9% result without a train/test split.</p>
            <McrChart />
          </article>
          <AtlasFigure src={ramanAssets.mcr} alt="Source MCR resolved pure spectra figure" caption="SOURCE FIGURE · mcr_resolved_pure_spectra.png · MCR-ALS exploratory decomposition" className="raman-analysis__atlas-card raman-analysis__atlas-card--wide" />
        </div>

        <section className="raman-analysis__secondary-evidence" aria-labelledby="raman-secondary-title">
          <div className="raman-analysis__secondary-heading">
            <p className="project-case__section-number">07B / SECONDARY EVIDENCE</p>
            <h3 id="raman-secondary-title">The reports keep their edge cases visible.</h3>
            <p>The source folder contains detailed slices that would disappear inside a headline score. These compact tables preserve those slices while keeping the main atlas readable.</p>
          </div>
          <div className="raman-analysis__secondary-grid">
            <article className="raman-analysis__ledger-card">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">A / SUBCLASS TESTS</p><h4>Five concentration-specific slices</h4></div><strong>3 / slice</strong></div>
              <DataTable
                label="Detailed subclass classification slices"
                columns={[
                  { key: 'label', label: 'Slice' },
                  { key: 'accuracy', label: 'Acc.', render: (row) => percent(row.accuracy) },
                  { key: 'support', label: 'n' },
                ]}
                rows={ramanSubclassOutcomes}
                rowKey={(row) => row.label}
              />
            </article>
            <article className="raman-analysis__ledger-card">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">A2 / CLASSIFIER SWEEP</p><h4>Eight models tie at the top of the diagnostic run</h4></div><strong>86.7%</strong></div>
              <DataTable
                label="Non-cross-validated classifier benchmark"
                columns={[
                  { key: 'model', label: 'Model' },
                  { key: 'accuracy', label: 'Acc.', render: (row) => percent(row.accuracy) },
                  { key: 'balanced', label: 'Bal.', render: (row) => percent(row.balanced) },
                  { key: 'f1', label: 'F1', render: (row) => percent(row.f1) },
                ]}
                rows={ramanClassifierBenchmark}
                rowKey={(row) => row.model}
              />
              <p className="raman-analysis__ledger-note">This is the source benchmark_results.csv sweep; the grouped cross-validated result remains the stronger generalization check.</p>
            </article>
            <article className="raman-analysis__ledger-card">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">B / JOINT PIPELINE</p><h4>Classification does not rescue regression</h4></div><strong>R² &lt; 0</strong></div>
              <DataTable
                label="Joint two-stage pipeline report"
                columns={[
                  { key: 'stage', label: 'Stage' },
                  { key: 'metric', label: 'Metric' },
                  { key: 'value', label: 'Value' },
                ]}
                rows={ramanJointPipeline}
                rowKey={(row) => row.stage}
              />
            </article>
            <article className="raman-analysis__ledger-card">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">C / COMPOUND REPORT</p><h4>The concentration-aware errors are asymmetric.</h4></div><strong>60.0%</strong></div>
              <DataTable
                label="Concentration-aware compound classification report"
                columns={[
                  { key: 'label', label: 'Class' },
                  { key: 'precision', label: 'Prec.', render: (row) => percent(row.precision * 100) },
                  { key: 'recall', label: 'Recall', render: (row) => percent(row.recall * 100) },
                  { key: 'f1', label: 'F1', render: (row) => percent(row.f1 * 100) },
                  { key: 'support', label: 'n' },
                ]}
                rows={[...ramanConcentrationClassOutcomes, { label: 'Macro avg', precision: 0.53, recall: 0.50, f1: 0.46, support: 15 }, { label: 'Weighted avg', precision: 0.54, recall: 0.60, f1: 0.51, support: 15 }]}
                rowKey={(row) => row.label}
              />
            </article>
            <article className="raman-analysis__ledger-card">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">D / MCR REPORT</p><h4>Unmixing favors the dominant physical factor.</h4></div><strong>31.9%</strong></div>
              <DataTable
                label="MCR hard-decision classification report"
                columns={[
                  { key: 'label', label: 'Class' },
                  { key: 'precision', label: 'Prec.', render: (row) => percent(row.precision * 100) },
                  { key: 'recall', label: 'Recall', render: (row) => percent(row.recall * 100) },
                  { key: 'f1', label: 'F1', render: (row) => percent(row.f1 * 100) },
                  { key: 'support', label: 'n' },
                ]}
                rows={[...ramanMcrClassOutcomes, { label: 'Macro avg', precision: 0.21, recall: 0.31, f1: 0.22, support: 72 }, { label: 'Weighted avg', precision: 0.17, recall: 0.32, f1: 0.20, support: 72 }]}
                rowKey={(row) => row.label}
              />
            </article>
          </div>
        </section>

        <section className="raman-analysis__ledger" aria-labelledby="raman-ledger-title">
          <div className="raman-analysis__ledger-heading">
            <p className="project-case__section-number">08 / DATA LEDGER</p>
            <h3 id="raman-ledger-title">The numbers behind the panels.</h3>
            <p>Each table is transcribed from the supplied CSV or text report. Rounded values stay visibly labeled so the page distinguishes a benchmark, a held-out test slice, and an exploratory decomposition.</p>
          </div>

          <div className="raman-analysis__ledger-grid">
            <article className="raman-analysis__ledger-card">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">A / CLASS REPORT</p><h4>Held-out class metrics</h4></div><strong>93.3%</strong></div>
              <DataTable
                label="Tuned Random Forest classification report"
                columns={[
                  { key: 'label', label: 'Class' },
                  { key: 'precision', label: 'Prec.', render: (row) => percent(row.precision * 100) },
                  { key: 'recall', label: 'Recall', render: (row) => percent(row.recall * 100) },
                  { key: 'f1', label: 'F1', render: (row) => percent(row.f1 * 100) },
                  { key: 'support', label: 'n' },
                ]}
                rows={[...ramanClassOutcomes, { label: 'Macro avg', precision: 0.79, recall: 0.78, f1: 0.78, support: 15 }, { label: 'Weighted avg', precision: 0.95, recall: 0.93, f1: 0.93, support: 15 }]}
                rowKey={(row) => row.label}
              />
              <p className="raman-analysis__ledger-note">Pure Water is retained as a source class but has zero support in this held-out test slice.</p>
            </article>

            <article className="raman-analysis__ledger-card">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">B / CONCENTRATION MODELS</p><h4>Adding concentration did not lift the leaders.</h4></div><strong>73.3%</strong></div>
              <DataTable
                label="Spectrum-only versus spectrum-plus-concentration classification"
                columns={[
                  { key: 'model', label: 'Model' },
                  { key: 'spectrumOnly', label: 'Spectrum', render: (row) => percent(row.spectrumOnly) },
                  { key: 'spectrumPlus', label: '+ conc.', render: (row) => percent(row.spectrumPlus) },
                  { key: 'delta', label: 'Δ', render: (row) => `${row.spectrumPlus - row.spectrumOnly > 0 ? '+' : ''}${(row.spectrumPlus - row.spectrumOnly).toFixed(1)}` },
                ]}
                rows={ramanConcentrationModels}
                rowKey={(row) => row.model}
              />
              <p className="raman-analysis__ledger-note">The separate Random Forest joint report is lower at 60.0% test accuracy and −1.678 predicted R².</p>
            </article>

            <article className="raman-analysis__ledger-card">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">C / GLOBAL REGRESSION</p><h4>No global model beats the baseline.</h4></div><strong>R² &lt; 0</strong></div>
              <DataTable
                label="Global concentration regression results"
                columns={[
                  { key: 'model', label: 'Model' },
                  { key: 'r2', label: 'R²', render: (row) => signed(row.r2) },
                  { key: 'rmse', label: 'RMSE', render: (row) => row.rmse.toFixed(4) },
                  { key: 'mae', label: 'MAE', render: (row) => row.mae.toFixed(4) },
                ]}
                rows={ramanGlobalRegression}
                rowKey={(row) => row.model}
              />
              <p className="raman-analysis__ledger-note">Per-compound regression is more informative: the mixed standard reaches R² 0.747, while the three single-compound rows remain near zero.</p>
            </article>

            <article className="raman-analysis__ledger-card">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">D / PHYSICS SCALE</p><h4>Physics scaling has a strong but inconsistent ceiling.</h4></div><strong>80.0%</strong></div>
              <DataTable
                label="Physics-scaled benchmark results"
                columns={[
                  { key: 'model', label: 'Model' },
                  { key: 'accuracy', label: 'Acc.', render: (row) => percent(row.accuracy) },
                  { key: 'balanced', label: 'Bal.', render: (row) => percent(row.balanced) },
                  { key: 'f1', label: 'F1', render: (row) => percent(row.f1) },
                ]}
                rows={ramanPhysicsBenchmark}
                rowKey={(row) => row.model}
              />
              <p className="raman-analysis__ledger-note">All 11 rows from benchmark_results_physics.csv are shown here; the adjacent source shelf keeps the corresponding confusion matrices inspectable.</p>
            </article>

            <article className="raman-analysis__ledger-card raman-analysis__ledger-card--wide">
              <div className="raman-analysis__ledger-card-head"><div><p className="project-case__section-number">E / PEAK CALIBRATION</p><h4>Calibration is compound-specific by design.</h4></div><strong>5 markers</strong></div>
              <DataTable
                label="Per-compound physics calibration"
                columns={[
                  { key: 'compound', label: 'Compound' },
                  { key: 'peak', label: 'Peak (cm^-1)' },
                  { key: 'method', label: 'Method' },
                  { key: 'slope', label: 'Slope', render: (row) => row.slope === null ? '—' : row.slope.toFixed(3) },
                  { key: 'intercept', label: 'Intercept', render: (row) => row.intercept === null ? '—' : row.intercept.toFixed(3) },
                ]}
                rows={ramanCalibration}
                rowKey={(row) => row.compound}
              />
              <p className="raman-analysis__ledger-note">Pure Water has no marker peak in the source calibration file and therefore uses max-norm scaling.</p>
            </article>
          </div>

          <div className="raman-analysis__source-shelf">
            <div className="raman-analysis__source-shelf-heading"><span>SUPPLIED AGGREGATE OUTPUTS</span><p>The main atlas and this shelf together display all {ramanDataset.aggregateFigures} aggregate PNG outputs from the provided folder, including the full regression, concentration, and physics diagnostics.</p></div>
            <div className="raman-analysis__source-shelf-grid">
              <AtlasFigure src={ramanAssets.regressionBenchmark} alt="Source global regression benchmark chart" caption="regression_benchmark.png · global R² comparison" />
              <AtlasFigure src={ramanAssets.regressionScatter} alt="Source global regression scatter plot" caption="regression_scatter.png · measured versus predicted concentration" />
              <AtlasFigure src={ramanAssets.jointPipelineScatter} alt="Source joint pipeline scatter plot" caption="joint_pipeline_scatter.png · predicted and oracle concentration" />
              <AtlasFigure src={ramanAssets.peakVsConcentration} alt="Source peak intensity versus concentration plot" caption="peak_vs_concentration.png · marker calibration relationship" />
              <AtlasFigure src={ramanAssets.spectraByConcentration} alt="Source spectra grouped by concentration" caption="spectra_by_concentration.png · concentration series" />
              <AtlasFigure src={ramanAssets.concentrationConfusion} alt="Source concentration-aware classification confusion matrix" caption="classification_confusion_matrix.png · concentration-aware model" />
              <AtlasFigure src={ramanAssets.physicsConfusionKnn} alt="Source physics-scaled KNN confusion matrix" caption="physics_confusion_matrix_KNN_k=5.png · physics-scaled KNN" />
              <AtlasFigure src={ramanAssets.physicsConfusionLogistic} alt="Source physics-scaled logistic regression confusion matrix" caption="physics_confusion_matrix_LogisticRegression.png · aggregate logistic regression" />
              <AtlasFigure src={ramanAssets.physicsConfusionLogisticPerCompound} alt="Source physics-scaled per-compound logistic regression confusion matrix" caption="physics_confusion_matrix_Logistic_Regression.png · per-compound logistic regression" />
              <AtlasFigure src={ramanAssets.physicsConfusionRandomForest} alt="Source physics-scaled random forest confusion matrix" caption="physics_confusion_matrix_RandomForestClassifier.png · aggregate random forest" />
              <AtlasFigure src={ramanAssets.physicsConfusionRandomForestPerCompound} alt="Source physics-scaled per-compound random forest confusion matrix" caption="physics_confusion_matrix_Random_Forest.png · per-compound random forest" />
              <AtlasFigure src={ramanAssets.physicsConfusionSvmRbf} alt="Source physics-scaled SVM confusion matrix" caption="physics_confusion_matrix_SVM_RBF.png · physics-scaled SVM" />
            </div>
          </div>

          <div className="raman-analysis__inventory" aria-label="Source archive inventory">
            <div className="raman-analysis__inventory-heading"><span>SOURCE ARCHIVE</span><p>Counts are from the provided Raman folder; the scan-coverage matrix preserves individual record counts, while the aggregate figures preserve the report outputs.</p></div>
            <div className="raman-analysis__inventory-list">
              <span><strong>{ramanDataset.rawFiles}</strong> raw TXT/CSV scans</span>
              <span><strong>{ramanDataset.rawTxtFiles}</strong> raw TXT files</span>
              <span><strong>{ramanDataset.rawCsvFiles}</strong> raw CSV scans</span>
              <span><strong>{ramanDataset.processedIndexFiles}</strong> processed index file</span>
              <span><strong>{ramanDataset.uniqueRawStems}</strong> unique scan stems</span>
              <span><strong>{ramanDataset.processedSpectra}</strong> processed CSVs</span>
              <span><strong>{ramanDataset.denoisedSpectra}</strong> denoised CSVs</span>
              <span><strong>{ramanDataset.scanPngFiles}</strong> scan PNGs</span>
              <span><strong>{ramanDataset.aggregateFigures}</strong> aggregate figures</span>
              <span><strong>{ramanDataset.archiveCsvFiles}</strong> archive CSV files</span>
              <span><strong>{ramanDataset.reportFiles}</strong> text reports</span>
              <span><strong>{ramanDataset.scriptFiles}</strong> analysis scripts</span>
              <span><strong>{ramanDataset.sourceFolders}</strong> source folders / <strong>{ramanDataset.sourceClasses}</strong> labels</span>
            </div>
          </div>
        </section>

        <div className="raman-analysis__atlas-footnote"><span>METHOD NOTE</span><p>Pipeline recorded in the supplied scripts: Whitaker-Hayes despiking → ALS baseline correction → Savitzky-Golay smoothing (window 9, order 2) → ROI and first derivative features → group-aware splits. MCR-ALS is exploratory only; the comparative report records 31.9% translated accuracy without a train/test split.</p></div>

        <div className="raman-analysis__atlas-conclusion">
          <p className="project-case__section-number">09 / PROJECT CONCLUSION</p>
          <div>
            <h4>Strong class separation; concentration generalization still needs proof.</h4>
            <p>The work already demonstrates a coherent lab-to-model workflow: denoising preserves class structure, Random Forest is the strongest cross-validated classifier, and the tuned test slice is promising. The next defensible step is a larger, balanced, concentration-held-out validation set before calling the system production-ready.</p>
          </div>
        </div>
      </section>
    </section>
  )
}
