import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Leaf,
  Microscope,
  Recycle,
  Sprout,
} from 'lucide-react'
import patentDregs from '../assets/project-media/astragalus/patent-dregs-before-after.webp'
import patentPrimaryCompounds from '../assets/project-media/astragalus/patent-primary-compounds.webp'
import patentTrametesCulture from '../assets/project-media/astragalus/patent-trametes-culture.webp'
import './AstragalusAnalysis.css'
import { AssetImage } from './AssetImage'

const preferredProcess = [
  {
    number: '01',
    label: 'PREPARE',
    detail: 'Dry residue below 10% moisture, mill to 10-40 mesh, then restore it to 60% moisture.',
  },
  {
    number: '02',
    label: 'INOCULATE',
    detail: 'Add a 1% Trametes versicolor seed culture to the prepared Astragalus residue.',
  },
  {
    number: '03',
    label: 'FERMENT I',
    detail: 'Hold at 25°C for 5 days under a breathable seal, then sterilise the treated residue.',
  },
  {
    number: '04',
    label: 'BLEND',
    detail: 'Combine treated residue, corn meal, and soybean meal at a 2:5:3 mass ratio.',
  },
  {
    number: '05',
    label: 'FERMENT II',
    detail: 'Add the three-species culture at 1%, seal, and ferment at 25°C for 7 days.',
  },
]

const primaryResults = [
  {
    label: 'Soluble total sugar',
    before: '4.29%',
    after: '11.35%',
    beforeWidth: '38%',
    note: 'Day 0 -> day-5 peak',
  },
  {
    label: 'Astragaloside IV',
    before: '0.10 mg/g',
    after: '~0.52 mg/g*',
    beforeWidth: '19%',
    note: 'Figure 3 / day-5 peak',
  },
  {
    label: 'Total flavonoids',
    before: '1.0x',
    after: '2.9x',
    beforeWidth: '34%',
    note: 'Day 0 -> day 5',
  },
]

const feedRows = [
  ['Total protein', '25.90', '27.96', '+2.06 pp'],
  ['Acid-soluble protein', '2.72', '4.22', '+1.50 pp'],
  ['Neutral detergent fiber', '27.75', '26.08', '-1.67 pp'],
  ['Acid detergent fiber', '19.43', '17.02', '-2.41 pp'],
]

function SectionHeading({ number, title, children }) {
  return (
    <header className="astragalus-analysis__section-heading">
      <p className="project-case__section-number">{number}</p>
      <div>
        <h3>{title}</h3>
        {children}
      </div>
    </header>
  )
}

function SourceFigure({ src, alt, label, children, className = '' }) {
  return (
    <figure className={`astragalus-analysis__figure ${className}`}>
      <div className="astragalus-analysis__figure-media">
        <AssetImage src={src} alt={alt} />
      </div>
      <figcaption>
        <strong>{label}</strong>
        <span>{children}</span>
      </figcaption>
    </figure>
  )
}

function PatentPathway() {
  return (
    <div className="astragalus-analysis__patent-map" aria-label="Preferred two-stage fermentation route described in the patent">
      <header className="astragalus-analysis__patent-map-header">
        <div>
          <span>ARCHIVED PATENT / PREFERRED EMBODIMENT</span>
          <strong>RESIDUE TO FUNCTIONAL FEED</strong>
        </div>
        <p>Two biological conversions. One recovered material stream.</p>
      </header>

      <div className="astragalus-analysis__map-stage">
        <header>
          <span>STAGE 01</span>
          <strong>Unlock residual compounds</strong>
        </header>
        <div className="astragalus-analysis__map-nodes">
          <div className="astragalus-analysis__map-node astragalus-analysis__map-node--residue">
            <div className="astragalus-analysis__residue-mark" aria-hidden="true"><i /><i /><i /><i /><i /></div>
            <strong>Astragalus residue</strong>
            <span>10-40 mesh / 60% H2O</span>
          </div>
          <ArrowRight className="astragalus-analysis__map-arrow" aria-hidden="true" />
          <div className="astragalus-analysis__map-node astragalus-analysis__map-node--culture">
            <AssetImage src={patentTrametesCulture} alt="Trametes versicolor culture shown in Figure 1 of the patent" />
            <strong>Trametes seed</strong>
            <span>1% inoculation</span>
          </div>
          <ArrowRight className="astragalus-analysis__map-arrow" aria-hidden="true" />
          <div className="astragalus-analysis__reactor">
            <span>PRIMARY</span>
            <strong>25°C</strong>
            <b>5 DAYS</b>
            <i aria-hidden="true" />
          </div>
          <ArrowRight className="astragalus-analysis__map-arrow" aria-hidden="true" />
          <div className="astragalus-analysis__map-output">
            <Leaf aria-hidden="true" />
            <strong>Treated residue</strong>
            <span>Sterilise before blending</span>
          </div>
        </div>
      </div>

      <div className="astragalus-analysis__stage-coupler" aria-hidden="true">
        <span />
        <b>COUPLED PROCESS</b>
        <ArrowRight />
      </div>

      <div className="astragalus-analysis__map-stage astragalus-analysis__map-stage--secondary">
        <header>
          <span>STAGE 02</span>
          <strong>Build and stabilise the feed</strong>
        </header>
        <div className="astragalus-analysis__map-nodes">
          <div className="astragalus-analysis__blend">
            <div className="astragalus-analysis__blend-bar" aria-label="Feed blend: 20 percent treated residue, 50 percent corn meal, 30 percent soybean meal">
              <i className="astragalus-analysis__blend-residue" />
              <i className="astragalus-analysis__blend-corn" />
              <i className="astragalus-analysis__blend-soy" />
            </div>
            <strong>2 : 5 : 3</strong>
            <span>Residue / corn / soy</span>
          </div>
          <span className="astragalus-analysis__plus" aria-hidden="true">+</span>
          <div className="astragalus-analysis__consortium">
            <div aria-hidden="true"><i>LP</i><i>EF</i><i>SC</i></div>
            <strong>1 : 1 : 1</strong>
            <span>Three-species culture / 1%</span>
          </div>
          <ArrowRight className="astragalus-analysis__map-arrow" aria-hidden="true" />
          <div className="astragalus-analysis__reactor">
            <span>SECONDARY</span>
            <strong>25°C</strong>
            <b>7 DAYS</b>
            <i aria-hidden="true" />
          </div>
          <ArrowRight className="astragalus-analysis__map-arrow" aria-hidden="true" />
          <div className="astragalus-analysis__map-output astragalus-analysis__map-output--feed">
            <Sprout aria-hidden="true" />
            <strong>Fermented feed</strong>
            <span>pH 4.13 / 10.62 g/kg acid</span>
          </div>
        </div>
      </div>

      <footer className="astragalus-analysis__patent-window">
        <span>DISCLOSED WORKING WINDOWS</span>
        <p><b>PRIMARY</b> 0.5-3% inoculum / 20-30°C / 40-80% moisture / 1-7 d</p>
        <p><b>SECONDARY</b> 0.5-3% inoculum / 20-30°C / 30-70% moisture / 5-7 d / finish at pH 3-5</p>
      </footer>
    </div>
  )
}

function PrimaryResult({ label, before, after, beforeWidth, note }) {
  return (
    <div className="astragalus-analysis__result">
      <div>
        <strong>{label}</strong>
        <span>{note}</span>
      </div>
      <div className="astragalus-analysis__result-track" aria-hidden="true">
        <i style={{ width: beforeWidth }} />
        <b />
      </div>
      <div className="astragalus-analysis__result-values">
        <span>{before}</span>
        <ArrowRight aria-hidden="true" />
        <strong>{after}</strong>
      </div>
    </div>
  )
}

function FeedTable() {
  return (
    <div className="astragalus-analysis__table-wrap">
      <table className="astragalus-analysis__table">
        <caption>Patent Table 1 / day-7 feed composition (%)</caption>
        <thead>
          <tr>
            <th scope="col">Measure</th>
            <th scope="col">Control</th>
            <th scope="col">Patent route</th>
            <th scope="col">Difference</th>
          </tr>
        </thead>
        <tbody>
          {feedRows.map((row) => (
            <tr key={row[0]}>
              <th scope="row">{row[0]}</th>
              {row.slice(1).map((value, index) => <td key={`${row[0]}-${index}`}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function AstragalusAnalysis() {
  return (
    <section className="astragalus-analysis">
      <SectionHeading number="03 / PATENT PATHWAY" title="Two biological stages make the waste stream useful again.">
        <p>
          The archived patent defines a specific route: Trametes versicolor first releases value from Astragalus
          extraction residue; a bacterial-yeast consortium then turns that treated material into fermented feed.
          The diagram marks the preferred embodiment and keeps the wider disclosed process windows separate.
        </p>
      </SectionHeading>

      <PatentPathway />

      <ol className="astragalus-analysis__process-notes" aria-label="Preferred process steps">
        {preferredProcess.map((step, index) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <strong>{step.label}</strong>
            <p>{step.detail}</p>
            {index < preferredProcess.length - 1 ? <ArrowRight aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>

      <section className="astragalus-analysis__primary-evidence">
        <SectionHeading number="04 / PRIMARY EVIDENCE" title="Day five is the compound-release sweet spot.">
          <p>
            In the patent embodiment, all three target measurements rose sharply during Trametes fermentation.
            Soluble sugar and astragaloside IV peaked on day 5; total flavonoids reached 2.9 times the day-0 level.
          </p>
        </SectionHeading>

        <div className="astragalus-analysis__primary-grid">
          <SourceFigure
            src={patentDregs}
            alt="Astragalus residue before and after Trametes fermentation, reproduced from patent Figure 2"
            label="PATENT FIGURE 2 / MATERIAL CHANGE"
          >
            Before (left) and after (right) Trametes fermentation. The image makes the conversion visible before the assays quantify it.
          </SourceFigure>

          <div className="astragalus-analysis__result-list">
            {primaryResults.map((result) => <PrimaryResult key={result.label} {...result} />)}
          </div>
        </div>

        <p className="astragalus-analysis__discrepancy-note">
          <b>* Source discrepancy:</b> Figure 3 plots the day-5 astragaloside IV result at about 0.52 mg/g, while
          the description states 5.2 mg/g. The plotted value is used above; the original laboratory record should
          be checked before this number is cited outside the project archive.
        </p>

        <SourceFigure
          className="astragalus-analysis__figure--wide"
          src={patentPrimaryCompounds}
          alt="Patent Figure 3 showing soluble sugar, astragaloside IV, and total flavonoid changes over seven days"
          label="PATENT FIGURE 3 / TIME SERIES"
        >
          Original day 0, 1, 3, 5, and 7 assay plots. The day-5 operating point balances the three reported compound responses.
        </SourceFigure>
      </section>

      <section className="astragalus-analysis__secondary-evidence">
        <SectionHeading number="05 / SECONDARY EVIDENCE" title="The treated residue changes how the feed ferments.">
          <p>
            The experiment compared feed made with Trametes-treated residue against the same formulation using
            untreated residue. The treated route acidified faster, supported more viable lactic-acid bacteria, and
            finished with more protein and less detergent fiber.
          </p>
        </SectionHeading>

        <div className="astragalus-analysis__feed-dashboard">
          <div className="astragalus-analysis__fermentation-readout">
            <div>
              <span>FINAL pH</span>
              <strong>4.13</strong>
              <p>Patent route</p>
              <small>Control 4.57</small>
            </div>
            <div>
              <span>TOTAL ACID</span>
              <strong>10.62</strong>
              <p>g/kg / patent route</p>
              <small>Control 8.95 g/kg</small>
            </div>
          </div>

          <div className="astragalus-analysis__consortium-detail">
            <FlaskConical aria-hidden="true" />
            <span>THE FINISHING CULTURE</span>
            <strong>L. plantarum + E. faecium + S. cerevisiae</strong>
            <p>
              Equal-volume seed cultures, 1% total inoculation. Lactic-acid bacteria peaked on day 5; yeast peaked on day 3.
            </p>
          </div>

          <FeedTable />
        </div>
      </section>

      <section className="astragalus-analysis__scope">
        <SectionHeading number="06 / SCOPE + BOUNDARY" title="Strong process evidence, with a clear next validation step.">
          <p>
            The archive supports the fermentation method, composition changes, acidity, and viable-count results.
            It does not yet support claims about animal performance or commercial-scale economics.
          </p>
        </SectionHeading>

        <div className="astragalus-analysis__scope-grid">
          <div>
            <CheckCircle2 aria-hidden="true" />
            <span>PATENT APPLICATION</span>
            <strong>A claimed coupled conversion route</strong>
            <p>Trametes-treated Astragalus residue, its use in feed, and a three-species secondary fermentation.</p>
          </div>
          <div>
            <Microscope aria-hidden="true" />
            <span>MEASURED HERE</span>
            <strong>Chemistry and feed quality</strong>
            <p>Active compounds, protein, detergent fiber, pH, total acid, and viable microbial counts.</p>
          </div>
          <div>
            <Recycle aria-hidden="true" />
            <span>NEXT EVIDENCE</span>
            <strong>Performance beyond the bench</strong>
            <p>Scale-up, shelf stability, cost, safety, digestibility, and controlled animal-feeding trials.</p>
          </div>
        </div>

        <p className="astragalus-analysis__source-note">
          Source: archived Chinese patent specification, application record 2024115609586. Values shown above are
          transcribed from the preferred embodiments and Table 1; "patent route" is the experimental group using
          Trametes-fermented residue.
        </p>
      </section>
    </section>
  )
}
