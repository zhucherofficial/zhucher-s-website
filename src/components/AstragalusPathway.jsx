import { ArrowDown, ArrowRight, Download } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { AssetImage } from './AssetImage'
import { EvidenceGallery } from './EvidenceGallery'
import rawResidue from '../assets/project-media/astragalus/pipeline/study-raw-residue.webp'
import trametesCulture from '../assets/project-media/astragalus/pipeline/study-trametes-culture.webp'
import cordycepsCulture from '../assets/project-media/astragalus/pipeline/study-cordyceps-culture.webp'
import treatedResidue from '../assets/project-media/astragalus/pipeline/study-treated-residue.webp'
import feedIngredients from '../assets/project-media/astragalus/pipeline/study-feed-ingredients.webp'
import plantarumCulture from '../assets/project-media/astragalus/pipeline/study-plantarum-culture.webp'
import faeciumCulture from '../assets/project-media/astragalus/pipeline/study-faecium-culture.webp'
import cerevisiaeCulture from '../assets/project-media/astragalus/pipeline/study-cerevisiae-culture.webp'
import feedMixing from '../assets/project-media/astragalus/pipeline/study-feed-mixing.webp'
import controlFeed from '../assets/project-media/astragalus/pipeline/study-control-feed.webp'
import cordycepsFeed from '../assets/project-media/astragalus/pipeline/study-cordyceps-feed.webp'
import trametesFeed from '../assets/project-media/astragalus/pipeline/study-trametes-feed.webp'
import originalSlide from '../assets/project-media/astragalus/pipeline/study-pipeline-original.webp'
import sourcePresentation from '../assets/documents/astragalus/ctb-study-pipeline.pptx?url'
import './AstragalusPathway.css'

// Photographs and experimental conditions: the supplied CTB pipeline, slide 1.
// These describe the comparison study, not the patent's preferred embodiment.
const fungalCultures = [
  { src: trametesCulture, genus: 'Trametes', species: 'versicolor' },
  { src: cordycepsCulture, genus: 'Cordyceps', species: 'militaris' },
]

const feedCultures = [
  { src: plantarumCulture, short: 'L. plantarum', name: 'Lactiplantibacillus plantarum' },
  { src: faeciumCulture, short: 'E. faecium', name: 'Enterococcus faecium' },
  { src: cerevisiaeCulture, short: 'S. cerevisiae', name: 'Saccharomyces cerevisiae' },
]

const feedGroups = [
  { src: controlFeed, name: 'Control' },
  { src: cordycepsFeed, name: 'Cordyceps' },
  { src: trametesFeed, name: 'Trametes' },
]

const pathwayViews = [
  { id: 'source', label: 'Original slide' },
  { id: 'workflow', label: 'English workflow' },
]

const sourceFigures = [{
  src: originalSlide,
  title: 'CTB experimental workflow',
  alt: 'Original Chinese slide: Astragalus residue is treated separately with Trametes and Cordyceps at 25 degrees Celsius for 12 days, then added at 10 percent to feed fermented with three microbial cultures at 35 degrees Celsius for 6 days and 50 percent moisture. Residue assays and feed-quality measurements are shown on the right.',
  caption: 'Fungal treatment and residue assays above; feed preparation, mixed-culture fermentation, and comparison of the control, Cordyceps, and Trametes groups below.',
  source: 'EZ / CTB study / Slide 1',
  type: 'image',
  kind: 'figure',
  layout: 'wide',
}]

export function AstragalusPathway() {
  const [activeView, setActiveView] = useState('source')
  const id = useId()
  const tabRefs = useRef([])

  const handleTabKey = (event, index) => {
    let nextIndex
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % pathwayViews.length
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + pathwayViews.length) % pathwayViews.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = pathwayViews.length - 1
    else return
    event.preventDefault()
    setActiveView(pathwayViews[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="astragalus-presentation">
      <div className="astragalus-presentation__toolbar">
        <div className="astragalus-presentation__tabs" role="tablist" aria-label="Study pipeline view">
          {pathwayViews.map((view, index) => (
            <button
              key={view.id}
              id={`${id}-${view.id}-tab`}
              ref={(element) => { tabRefs.current[index] = element }}
              type="button"
              role="tab"
              aria-selected={activeView === view.id}
              aria-controls={`${id}-${view.id}-panel`}
              tabIndex={activeView === view.id ? 0 : -1}
              onClick={() => setActiveView(view.id)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >{view.label}</button>
          ))}
        </div>
        <a
          className="astragalus-presentation__download"
          href={sourcePresentation}
          download="EZ-CTB-study-pipeline.pptx"
          aria-label="Download original PowerPoint"
          title="Download original PowerPoint"
        ><Download aria-hidden="true" /></a>
      </div>

      {pathwayViews.map((view) => (
        <div
          key={view.id}
          id={`${id}-${view.id}-panel`}
          className={`astragalus-presentation__panel astragalus-presentation__panel--${view.id}`}
          role="tabpanel"
          aria-labelledby={`${id}-${view.id}-tab`}
          hidden={activeView !== view.id}
          tabIndex={0}
        >
          {view.id === 'source' ? <EvidenceGallery items={sourceFigures} /> : <EnglishPathway />}
        </div>
      ))}
    </div>
  )
}

function Step({ number, title, children }) {
  return (
    <li className="astragalus-pathway__step">
      <h6><span>{number}</span>{title}</h6>
      <div className="astragalus-pathway__step-content">
        {children}
        <ArrowRight className="astragalus-pathway__flow-arrow" aria-hidden="true" />
      </div>
    </li>
  )
}

function ProcessPhoto({ src, alt, children, className = '' }) {
  return (
    <div className={`astragalus-pathway__photo ${className}`}>
      <AssetImage src={src} alt={alt} />
      {children ? <p>{children}</p> : null}
    </div>
  )
}

function Conditions({ temperature, duration, moisture }) {
  return (
    <dl className="astragalus-pathway__conditions">
      <div><dt>Temperature</dt><dd>{temperature}°C</dd></div>
      <div><dt>Duration</dt><dd>{duration} days</dd></div>
      {moisture ? <div><dt>Moisture</dt><dd>{moisture}%</dd></div> : null}
    </dl>
  )
}

function Readouts({ title, items }) {
  return (
    <div className="astragalus-pathway__readouts">
      <span><ArrowDown aria-hidden="true" />{title}</span>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  )
}

function EnglishPathway() {
  return (
    <figure className="astragalus-pathway" aria-labelledby="astragalus-pathway-title" aria-describedby="astragalus-pathway-caption">
      <header className="astragalus-pathway__heading">
        <span>EXPERIMENTAL WORKFLOW / CTB STUDY</span>
        <h4 id="astragalus-pathway-title">Two-stage fermentation of Astragalus residue</h4>
        <p>EZ / China Thinks Big study</p>
      </header>

      <section className="astragalus-pathway__stage" aria-labelledby="astragalus-stage-one">
        <header>
          <div className="astragalus-pathway__stage-title"><span>I</span><h5 id="astragalus-stage-one">Fungal treatment of the residue</h5></div>
          <Conditions temperature={25} duration={12} />
        </header>

        <ol className="astragalus-pathway__flow" aria-label="Primary fermentation workflow">
          <Step number="01" title="Astragalus residue">
            <ProcessPhoto src={rawResidue} alt="Unfermented Astragalus extraction residue on weighing paper">Starting material</ProcessPhoto>
          </Step>
          <Step number="02" title="Separate fungal treatments">
            <ul className="astragalus-pathway__fungi">
              {fungalCultures.map((culture) => (
                <li key={culture.genus}>
                  <AssetImage src={culture.src} alt={`${culture.genus} ${culture.species} culture plate from the project presentation`} />
                  <i>{culture.genus}<br />{culture.species}</i>
                </li>
              ))}
            </ul>
            <p className="astragalus-pathway__treatment-note">One fungus per treatment.<br />Ferment the samples separately.</p>
          </Step>
          <Step number="03" title="Fermented residue">
            <ProcessPhoto src={treatedResidue} alt="Fungal-treated Astragalus residue shown in the original pipeline">Treatments remain separate</ProcessPhoto>
          </Step>
        </ol>

        <Readouts title="Residue assays" items={['Astragaloside IV', 'Total and reducing sugars', 'Total flavonoids', 'Cellulase activity']} />
      </section>

      <div className="astragalus-pathway__transfer">
        <ArrowDown aria-hidden="true" />
        <div><strong>10% residue addition</strong><p>Each treated residue enters its own feed mixture.</p></div>
      </div>

      <section className="astragalus-pathway__stage" aria-labelledby="astragalus-stage-two">
        <header>
          <div className="astragalus-pathway__stage-title"><span>II</span><h5 id="astragalus-stage-two">Mixed-culture feed fermentation</h5></div>
          <Conditions temperature={35} duration={6} moisture={50} />
        </header>

        <ol className="astragalus-pathway__flow astragalus-pathway__flow--feed" start={4} aria-label="Feed fermentation workflow">
          <Step number="04" title="Prepare the feed mixtures">
            <ProcessPhoto src={feedIngredients} alt="Three bags of layered feed ingredients before mixing">Feed ingredients before mixing</ProcessPhoto>
          </Step>
          <Step number="05" title="Inoculate and ferment">
            <div className="astragalus-pathway__inoculum">
              <span>Mixed inoculum</span>
              <ul>
                {feedCultures.map((culture) => (
                  <li key={culture.name}>
                    <AssetImage src={culture.src} alt={`${culture.name} culture plate`} />
                    <i><abbr title={culture.name}>{culture.short}</abbr></i>
                  </li>
                ))}
              </ul>
              <ArrowDown aria-hidden="true" />
            </div>
            <ProcessPhoto src={feedMixing} alt="Gloved hands mixing feed ingredients in the laboratory" className="astragalus-pathway__photo--mixing" />
          </Step>
          <Step number="06" title="Compare fermented feeds">
            <ul className="astragalus-pathway__feed-groups">
              {feedGroups.map((group) => (
                <li key={group.name}>
                  <AssetImage src={group.src} alt={`${group.name} group fermented feed sample from the pipeline presentation`} />
                  <span>{group.name}<small>group</small></span>
                </li>
              ))}
            </ul>
          </Step>
        </ol>

        <Readouts title="Feed evaluation" items={['Viable microbial counts', 'Total acid and pH', 'Crude and acid-soluble protein', 'Cellulose content']} />
      </section>

      <figcaption id="astragalus-pathway-caption">
        <strong>Adapted from the original CTB project pipeline, slide 1.</strong>
        <p><i>L. plantarum</i> = <i>Lactiplantibacillus plantarum</i>; <i>E. faecium</i> = <i>Enterococcus faecium</i>; <i>S. cerevisiae</i> = <i>Saccharomyces cerevisiae</i>.</p>
        <p className="astragalus-pathway__source-boundary">Study conditions: 12-day fungal treatment and 6-day feed fermentation. The patent experiments below use a different schedule and formulation.</p>
      </figcaption>
    </figure>
  )
}
