import {
  ArrowRight,
  Beaker,
  FlaskConical,
  Leaf,
  Microscope,
  Scale,
  Sprout,
} from 'lucide-react'
import cultureSequence from '../assets/project-media/astragalus/culture-sequence.webp'
import fermentedDregsPairs from '../assets/project-media/astragalus/fermented-dregs-pairs.webp'
import fermentedFeedBags from '../assets/project-media/astragalus/fermented-feed-bags.webp'
import astragalosideChart from '../assets/project-media/astragalus/astragaloside-chart.webp'
import sugarChart from '../assets/project-media/astragalus/sugar-chart.webp'
import cellulaseChart from '../assets/project-media/astragalus/cellulase-chart.webp'
import liveCountChart from '../assets/project-media/astragalus/live-count-chart.webp'
import labBench from '../assets/project-media/astragalus/lab-bench.webp'
import './AstragalusAnalysis.css'
import { AssetImage } from './AssetImage'

const processSteps = [
  { icon: Leaf, number: '01', label: 'RESIDUE', detail: 'Astragalus dregs are dried, milled to 10–40 mesh, and adjusted to about 50% moisture.' },
  { icon: FlaskConical, number: '02', label: 'FUNGI', detail: 'Trametes versicolor or Cordyceps militaris ferments the residue for 12 days at 25°C.' },
  { icon: Beaker, number: '03', label: 'FEED', detail: 'The fermented dregs replace half of the bran in a corn–soybean meal–bran feed.' },
  { icon: Sprout, number: '04', label: 'STABILIZE', detail: 'Enterococcus faecium and Saccharomyces cerevisiae finish the feed fermentation for 6 days.' },
]

const dregsRows = [
  ['Astragaloside', '0.70', '0.89', '0.83', 'mg/g'],
  ['Reducing sugar', '27.97', '21.00', '20.77', 'mg/g'],
  ['Total flavonoids', '27.08', '31.01', '29.51', 'mg/g'],
  ['Cellulase activity', '—', '4.01', '3.20', 'U/g'],
]

const feedRows = [
  ['Crude protein', '21.08 → 21.18', '21.44 → 23.30', '20.16 → 22.04', '%'],
  ['Acid-soluble protein', '5.44 → 6.10', '4.99 → 6.14', '5.08 → 6.03', '%'],
  ['Neutral detergent fiber', '32.3 → 30.2', '30.0 → 24.9', '31.0 → 26.3', '%'],
  ['Acid detergent fiber', '5.5 → 5.4', '5.5 → 4.5', '5.8 → 5.3', '%'],
]

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

function DataTable({ rows, caption, className = '' }) {
  return (
    <div className={`astragalus-analysis__table-wrap ${className}`}>
      <table className="astragalus-analysis__table">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Measure</th>
            <th scope="col">Control</th>
            <th scope="col">Trametes</th>
            <th scope="col">Cordyceps</th>
            <th scope="col">Unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
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

export function AstragalusAnalysis() {
  return (
    <section className="astragalus-analysis">
      <SectionHeading number="03 / RESEARCH SYSTEM" title="Turn herbal residue into a measurable feed ingredient.">
        <p>
          The supplied CTB presentation and paper describe a two-stage fermentation system: edible fungi first
          open up astragalus residue, then lactic acid bacteria and yeast stabilize it inside a mixed feed.
        </p>
      </SectionHeading>

      <ol className="astragalus-analysis__process">
        {processSteps.map(({ icon: Icon, number, label, detail }, index) => (
          <li key={label}>
            <Icon aria-hidden="true" />
            <span>{number}</span>
            <strong>{label}</strong>
            <p>{detail}</p>
            {index < processSteps.length - 1 ? <ArrowRight className="astragalus-analysis__process-arrow" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>

      <div className="astragalus-analysis__metrics" aria-label="Fermentation system parameters">
        <div><strong>12 d</strong><span>fungal dregs stage</span></div>
        <div><strong>6 d</strong><span>feed fermentation stage</span></div>
        <div><strong>50%</strong><span>working moisture</span></div>
        <div><strong>1%</strong><span>mixed culture inoculation</span></div>
      </div>

      <section className="astragalus-analysis__phase">
        <div className="astragalus-analysis__phase-copy">
          <span className="astragalus-analysis__kicker">STAGE 01 / DREGS</span>
          <h4>Make the residue biologically available.</h4>
          <p>
            Trametes versicolor (云芝) and Cordyceps militaris (蛹虫草) were inoculated at 1:100 into milled
            astragalus dregs. Sealed aerated bags were held at 25°C, with samples collected on days 0, 4, 8, and 12.
          </p>
          <dl className="astragalus-analysis__specs">
            <div><dt>SUBSTRATE</dt><dd>10–40 mesh residue</dd></div>
            <div><dt>MOISTURE</dt><dd>about 50%</dd></div>
            <div><dt>SAMPLING</dt><dd>0 / 4 / 8 / 12 d</dd></div>
          </dl>
        </div>
        <SourceFigure src={cultureSequence} alt="Culture and fermented astragalus residue sequence from the supplied presentation" label="CULTURE SEQUENCE">
          The supplied presentation documents the progression from fungal culture to fermented dregs.
        </SourceFigure>
      </section>

      <section className="astragalus-analysis__phase astragalus-analysis__phase--reverse">
        <SourceFigure src={fermentedDregsPairs} alt="Paired bags of fungal-fermented astragalus dregs" label="FERMENTED DREGS">
          Two treatment groups are kept visible as physical samples, not abstract inputs.
        </SourceFigure>
        <div className="astragalus-analysis__phase-copy">
          <span className="astragalus-analysis__kicker">STAGE 02 / FEED</span>
          <h4>Carry the converted material into feed.</h4>
          <p>
            A 5:3:2 corn, soybean meal, and bran base was prepared at 1 kg per system. Treatment groups replaced
            50% of the bran with fungal-fermented dregs, then received Enterococcus faecium and Saccharomyces
            cerevisiae at a viable-cell ratio of 10:10:1.
          </p>
          <dl className="astragalus-analysis__specs">
            <div><dt>TEMPERATURE</dt><dd>35°C</dd></div>
            <div><dt>FERMENTATION</dt><dd>6 days</dd></div>
            <div><dt>INOCULATION</dt><dd>1% total culture</dd></div>
          </dl>
        </div>
      </section>

      <section className="astragalus-analysis__evidence">
        <SectionHeading number="04 / DREG EVIDENCE" title="Trametes gives the stronger residue signal.">
          <p>
            Relative to the unfermented control, both fungi increased astragaloside and total flavonoids while
            consuming reducing sugar. Trametes led on the headline compound and cellulase activity.
          </p>
        </SectionHeading>

        <div className="astragalus-analysis__evidence-grid">
          <DataTable rows={dregsRows} caption="Day-12 dregs assay values reported in the supplied paper" />
          <div className="astragalus-analysis__evidence-copy">
            <div className="astragalus-analysis__callout">
              <Microscope aria-hidden="true" />
              <div><strong>0.89 mg/g</strong><span>Trametes astragaloside at day 12</span></div>
            </div>
            <p>
              The pattern supports a useful division of labor: fungal growth changes the residue matrix, while
              the downstream feed stage turns that material into a more acidic, protein-dense ration.
            </p>
          </div>
        </div>

        <div className="astragalus-analysis__source-grid">
          <SourceFigure src={astragalosideChart} alt="Astragaloside comparison chart" label="ASTRAGALOSIDE">
            Control 0.70; Trametes 0.89; Cordyceps 0.83 mg/g.
          </SourceFigure>
          <SourceFigure src={sugarChart} alt="Reducing sugar and total flavonoids chart" label="SUGAR + FLAVONOIDS">
            Reducing sugar falls as total flavonoids rise across the treatment groups.
          </SourceFigure>
          <SourceFigure src={cellulaseChart} alt="Cellulase activity comparison chart" label="CELLULASE ACTIVITY">
            Trametes 4.01 U/g; Cordyceps 3.20 U/g.
          </SourceFigure>
        </div>
      </section>

      <section className="astragalus-analysis__feed-quality">
        <SectionHeading number="05 / FEED QUALITY" title="Acidification and fiber loss make the final feed easier to read.">
          <p>
            In the final feed fermentation, total acid reached 17.05 g/kg in the Trametes group and 16.07 g/kg in
            the Cordyceps group, compared with 12.67 g/kg for the control. The corresponding pH values were 4.98,
            5.12, and 5.38.
          </p>
        </SectionHeading>

        <div className="astragalus-analysis__quality-grid">
          <div className="astragalus-analysis__quality-note">
            <div className="astragalus-analysis__quality-stat"><strong>+1.86</strong><span>percentage-point crude protein gain / Trametes</span></div>
            <div className="astragalus-analysis__quality-stat"><strong>−5.1</strong><span>percentage-point NDF change / Trametes</span></div>
            <p>
              Arrows in the table show day 0 → day 6. The treatment groups finish with more crude protein and less
              neutral or acid detergent fiber than their starting feed.
            </p>
          </div>
          <DataTable rows={feedRows} caption="Feed quality before and after six days of fermentation" />
        </div>

        <div className="astragalus-analysis__source-grid astragalus-analysis__source-grid--two">
          <SourceFigure src={liveCountChart} alt="Lactic acid bacteria and yeast live-count trends" label="VIABLE COUNTS">
            Lactic acid bacteria peak around day 2; yeast trends downward as the feed acidifies.
          </SourceFigure>
          <SourceFigure src={fermentedFeedBags} alt="Fermented feed bags on a laboratory table" label="FINAL FEED">
            The final material is shown as a feed system ready for quality comparison.
          </SourceFigure>
        </div>
      </section>

      <section className="astragalus-analysis__limits">
        <SectionHeading number="06 / LIMITS + NEXT" title="A promising lab result still needs a production pathway.">
          <p>
            This work is laboratory-scale. The supplied resources support a fermentation and composition result, not
            a completed animal-feeding trial or a proven feed-conversion advantage.
          </p>
        </SectionHeading>

        <div className="astragalus-analysis__limits-grid">
          <div>
            <Scale aria-hidden="true" />
            <strong>WHAT IS SHOWN</strong>
            <p>Fungal pretreatment, mixed-culture feed fermentation, and measurable changes in compounds, acidity, protein, and fiber.</p>
          </div>
          <div>
            <ArrowRight aria-hidden="true" />
            <strong>WHAT COMES NEXT</strong>
            <p>Optimize strains and cost, scale the process, and test nutrition, animal performance, immunity, and other Chinese-medicine residues.</p>
          </div>
        </div>

        <SourceFigure src={labBench} alt="Laboratory bench used for the fermentation work" label="SOURCE RECORD">
          Figures and values are transcribed from the supplied CTB presentation and CTB paper.
        </SourceFigure>
      </section>
    </section>
  )
}

