import { Atom, Binary, Boxes, Cpu, Database, ScanSearch } from 'lucide-react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import cnnPrediction from '../assets/project-media/subatomic/original-cnn-prediction-vs-truth.webp'
import residualHistogram from '../assets/project-media/subatomic/original-residuals-histogram.webp'
import resolutionOverlay from '../assets/project-media/subatomic/original-resolution-overlay.webp'
import unetSummary from '../assets/project-media/subatomic/original-unet-total-pt-summary.webp'
import eventMap from '../assets/project-media/subatomic/event-0-rapidity-phi.webp'
import unetEvent from '../assets/project-media/subatomic/unet-total-pt-event-0.png'
import './SubatomicAnalysis.css'
import { AssetImage } from './AssetImage'

const formulas = [
  {
    label: 'Area correction',
    tex: String.raw`p_T^{\mathrm{corr}}=p_T^{\mathrm{raw}}-\rho A_{\mathrm{jet}}`,
  },
  {
    label: 'Prediction residual',
    tex: String.raw`\Delta p_T=p_T^{\mathrm{pred}}-p_T^{\mathrm{true}}`,
  },
  {
    label: 'Resolution',
    tex: String.raw`\mathrm{resolution}=\sigma\!\left(\Delta p_T\right)`,
  },
].map((formula) => ({
  ...formula,
  html: katex.renderToString(formula.tex, { throwOnError: false, output: 'html' }),
}))

function Formula({ formula }) {
  return (
    <div className="subatomic-analysis__formula">
      <span>{formula.label}</span>
      <div aria-label={formula.label} dangerouslySetInnerHTML={{ __html: formula.html }} />
    </div>
  )
}

function OriginalResultFigure({ src, alt, title, description, source }) {
  return (
    <figure className="subatomic-result-figure">
      <div className="subatomic-result-figure__media">
        <AssetImage src={src} alt={alt} />
      </div>
      <figcaption>
        <strong>{title}</strong>
        <span>{description}</span>
        <small>{source}</small>
      </figcaption>
    </figure>
  )
}

export function SubatomicAnalysis() {
  return (
    <section className="subatomic-analysis" aria-labelledby="subatomic-analysis-title">
      <div className="subatomic-analysis__heading">
        <p className="project-case__section-number">03 / RESEARCH SYSTEM</p>
        <div>
          <h2 id="subatomic-analysis-title">Recover the jet after the thermal bath hides it.</h2>
          <p>The project compares an interpretable FastJet correction with feature regressors, a jet-image CNN, and an auxiliary U-Net denoiser. All scalar models share the same held-out indices so the residual-width comparison stays aligned.</p>
        </div>
      </div>

      <div className="subatomic-analysis__metrics" aria-label="Project scale and current test results">
        <div><strong>10,000</strong><span>configured PYTHIA events</span></div>
        <div><strong>2,414</strong><span>held-out matched jets</span></div>
        <div><strong>32 x 32 x 3</strong><span>jet-image tensor</span></div>
        <div><strong>4.623</strong><span>CNN sigma, GeV/c</span></div>
      </div>

      <div className="subatomic-analysis__formula-strip" aria-label="Core analysis formulas">
        {formulas.map((formula) => <Formula formula={formula} key={formula.label} />)}
      </div>

      <ol className="subatomic-analysis__pipeline" aria-label="Subatomic physics analysis workflow">
        <li><Database aria-hidden="true" /><span>01</span><strong>Generate</strong><p>PYTHIA 8.3 signal events</p></li>
        <li><Atom aria-hidden="true" /><span>02</span><strong>Overlay</strong><p>multi-species thermal bath + v2</p></li>
        <li><ScanSearch aria-hidden="true" /><span>03</span><strong>Cluster</strong><p>anti-kT, R = 0.4, active area</p></li>
        <li><Binary aria-hidden="true" /><span>04</span><strong>Match</strong><p>truth and reconstructed jets</p></li>
        <li><Cpu aria-hidden="true" /><span>05</span><strong>Learn</strong><p>features, CNN, and U-Net</p></li>
        <li><Boxes aria-hidden="true" /><span>06</span><strong>Compare</strong><p>shared residual diagnostics</p></li>
      </ol>

      <section className="subatomic-analysis__evidence" aria-labelledby="subatomic-evidence-title">
        <div className="subatomic-analysis__section-heading">
          <p className="project-case__section-number">04 / EVENT EVIDENCE</p>
          <div>
            <h3 id="subatomic-evidence-title">The project keeps both the event geometry and the failed pixels inspectable.</h3>
            <p>The scalar CNN predicts one jet momentum. The U-Net solves a separate image-to-image task, so its residual map is shown as a diagnostic rather than folded into the scalar score.</p>
          </div>
        </div>

        <div className="subatomic-analysis__evidence-grid">
          <figure>
            <AssetImage src={eventMap} alt="Signal-only Pythia event in rapidity and azimuth, weighted by transverse momentum" />
            <figcaption><strong>EVENT 0 / SIGNAL GEOMETRY</strong><span>Rapidity x azimuth map before the thermal overlay. The concentrated deposits define the structure the reconstruction must preserve.</span></figcaption>
          </figure>
          <figure className="subatomic-analysis__evidence-wide">
            <AssetImage src={unetEvent} alt="U-Net total transverse momentum channel showing input, prediction, truth, and residual" />
            <figcaption><strong>U-NET / TOTAL pT CHANNEL</strong><span>Input, prediction, truth, and residual remain side by side. Total pT is the strongest image channel; multiplicity and charged pT remain harder.</span></figcaption>
          </figure>
        </div>
      </section>

      <section className="subatomic-analysis__charts" aria-labelledby="subatomic-charts-title">
        <div className="subatomic-analysis__section-heading">
          <p className="project-case__section-number">05 / ORIGINAL RESULTS</p>
          <div>
            <h3 id="subatomic-charts-title">Original model outputs, preserved as generated.</h3>
            <p>These are the project&apos;s exported figures with their original colors, axes, legends, and labels. The presentation frame adds context without redrawing or re-encoding the results.</p>
          </div>
        </div>

        <div className="subatomic-analysis__chart-grid">
          <OriginalResultFigure
            src={residualHistogram}
            alt="Original residual histogram comparing area-based, gradient-boosted, and CNN jet momentum predictions"
            title="Overall jet pT residuals"
            description="The saved histogram shows the CNN residual concentrated around zero, with the original legend reporting sigma = 4.62 GeV/c."
            source="ORIGINAL EXPORT / ASSET/ML_BENCHMARK/RESIDUALS_HISTOGRAM.PNG"
          />
          <OriginalResultFigure
            src={resolutionOverlay}
            alt="Original jet energy resolution plot across true transverse momentum bins"
            title="Jet energy resolution by true pT"
            description="The original per-bin overlay compares the area baseline, GBR regressor, and CNN regressor without changing the project&apos;s visual encoding."
            source="ORIGINAL EXPORT / ASSET/ML_BENCHMARK/RESOLUTION_OVERLAY.PNG"
          />
          <OriginalResultFigure
            src={cnnPrediction}
            alt="Original CNN prediction versus truth scatter plot"
            title="CNN prediction versus truth"
            description="All held-out predictions remain visible against the original dashed agreement line, including the sparse high-pT records and larger misses."
            source="ORIGINAL EXPORT / REPORT/PRED_VS_TRUE_CNN.PNG"
          />
          <OriginalResultFigure
            src={unetSummary}
            alt="Original U-Net total transverse momentum summary grid for three events"
            title="U-Net total pT reconstruction summary"
            description="Three events retain the original input, prediction, and truth arrangement so the image-reconstruction branch can be inspected directly."
            source="ORIGINAL EXPORT / REPORT/SUMMARY_GRID_CH0.PNG"
          />
        </div>
      </section>

      <section className="subatomic-analysis__conclusion">
        <p className="project-case__section-number">06 / INTERPRETATION</p>
        <div>
          <span>COURSE-SCALE SIMULATION / NOT DETECTOR VALIDATION</span>
          <h3>Spatial learning is the strongest result, not the end of the physics argument.</h3>
          <p>The synchronized simulation shows a much narrower CNN residual distribution than the area-based baseline and the current gradient-boosted regressor. The next defensible step is uncertainty estimation, detector-response studies, and evaluation on independently generated event conditions before treating the method as experimentally general.</p>
        </div>
      </section>
    </section>
  )
}
