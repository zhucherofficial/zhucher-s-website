import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  Microscope,
  Recycle,
} from 'lucide-react'
import patentDregs from '../assets/project-media/astragalus/patent-dregs-before-after.webp'
import patentPrimaryCompounds from '../assets/project-media/astragalus/patent-primary-compounds.webp'
import ezTeamPhoto from '../assets/project-media/astragalus/ez-ctb-team.webp'
import './AstragalusAnalysis.css'
import { AstragalusPathway } from './AstragalusPathway'
import { EvidenceGallery } from './EvidenceGallery'

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

const teamPhotos = [{
  src: ezTeamPhoto,
  title: 'EZ at China Thinks Big',
  alt: 'The five members of team EZ standing together in front of their Astragalus residue research poster at China Thinks Big.',
  caption: 'Our team, EZ, with the Astragalus residue research poster at China Thinks Big.',
  source: 'EZ / Team photograph',
  type: 'image',
  layout: 'wide',
}]

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
    <div className={`astragalus-analysis__source-figure ${className}`}>
      <EvidenceGallery items={[{ src, alt, title: label, caption: children, type: 'image', kind: 'figure', layout: 'wide' }]} />
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
      <section className="astragalus-analysis__team" aria-labelledby="astragalus-team-title">
        <header>
          <p className="project-case__section-number">THE TEAM / CHINA THINKS BIG</p>
          <div><h3 id="astragalus-team-title">EZ</h3><p>Ken Zhang / Team leader</p></div>
        </header>
        <EvidenceGallery items={teamPhotos} />
      </section>

      <SectionHeading number="03 / STUDY PIPELINE" title="The experiment, from residue to fermented feed">
        <p>
          The CTB study tested two fungal treatments of Astragalus extraction residue, then used the treated
          material in a second fermentation. This workflow follows the original project presentation,
          with the cultures, conditions, comparison groups, and measurements shown at each stage.
        </p>
      </SectionHeading>

      <AstragalusPathway />

      <section className="astragalus-analysis__primary-evidence">
        <SectionHeading number="04 / PATENT EVIDENCE" title="Primary fermentation: compound measurements">
          <p>
            A separate patent experiment followed Trametes fermentation over 7 days, with day 5 identified as
            the preferred operating point. These results belong to that experiment, not the 12-day CTB study above.
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
        <SectionHeading number="05 / PATENT EVIDENCE" title="Secondary fermentation: feed quality">
          <p>
            The patent compared feed containing Trametes-treated residue with the same formulation using
            untreated residue. Its residue, corn meal, and soybean meal ratio was 2:5:3, with a 7-day secondary
            fermentation. The treated route acidified faster and finished with more protein and less detergent fiber.
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
