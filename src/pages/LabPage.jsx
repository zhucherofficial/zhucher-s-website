import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, FlaskConical, List, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import labMap from '../assets/physics-lab-map.png'
import './LabPage.css'

const STATIONS = [
  { id: 'robot', code: '01', label: 'ROBOT_BENCH', position: { left: '17%', top: '48%' }, text: 'Drive, balance, and clear the obstacle course. This bench connects control code to moving hardware.' },
  { id: 'raman', code: '02', label: 'RAMAN_LASER', position: { left: '49%', top: '35%' }, text: 'Align the 532 nm beam, scan a sample, and inspect the Raman spectrum used in fermentation analysis.' },
  { id: 'particle', code: '03', label: 'PARTICLE_SCREEN', position: { left: '82%', top: '34%' }, text: 'Trigger a stylized collision event and trace the particle paths back to the interaction point.' },
  { id: 'guitar', code: '04', label: 'GUITAR_SCOPE', position: { left: '78%', top: '75%' }, text: 'Pluck a string and compare its waveform, frequency, and harmonic shape on the oscilloscope.' },
]

function sendMove(direction, active) {
  window.dispatchEvent(new CustomEvent('ken-lab-move', { detail: { active, direction } }))
}

export function LabPage() {
  const gameRootRef = useRef(null)
  const [activeStation, setActiveStation] = useState(null)
  const [indexOpen, setIndexOpen] = useState(false)
  const [jarFound, setJarFound] = useState(false)

  useEffect(() => {
    let game
    let disposed = false

    const start = async () => {
      const Phaser = (await import('phaser')).default
      if (disposed || !gameRootRef.current) return

      class KenLabScene extends Phaser.Scene {
        create() {
          this.movement = { up: false, down: false, left: false, right: false }
          this.keys = this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT')
          this.avatar = this.add.container(this.scale.width * 0.515, this.scale.height * 0.66)
          const shadow = this.add.ellipse(0, 17, 31, 12, 0x090b12, 0.36)
          const body = this.add.rectangle(0, 0, 22, 31, 0x2455ff).setStrokeStyle(3, 0x090b12)
          const head = this.add.rectangle(0, -22, 19, 18, 0xffd43a).setStrokeStyle(3, 0x090b12)
          const badge = this.add.rectangle(0, 2, 8, 8, 0xb7ff35)
          this.avatar.add([shadow, body, head, badge]).setDepth(5)

          this.moveHandler = (event) => { this.movement[event.detail.direction] = event.detail.active }
          window.addEventListener('ken-lab-move', this.moveHandler)
        }

        update(_, delta) {
          if (!this.avatar) return
          const speed = Math.min(12, delta / 9)
          const left = this.keys.A.isDown || this.keys.LEFT.isDown || this.movement.left
          const right = this.keys.D.isDown || this.keys.RIGHT.isDown || this.movement.right
          const up = this.keys.W.isDown || this.keys.UP.isDown || this.movement.up
          const down = this.keys.S.isDown || this.keys.DOWN.isDown || this.movement.down
          this.avatar.x = Phaser.Math.Clamp(this.avatar.x + (right - left) * speed, 34, this.scale.width - 34)
          this.avatar.y = Phaser.Math.Clamp(this.avatar.y + (down - up) * speed, 85, this.scale.height - 34)
        }

        shutdown() {
          window.removeEventListener('ken-lab-move', this.moveHandler)
        }
      }

      game = new Phaser.Game({
        type: Phaser.CANVAS,
        parent: gameRootRef.current,
        transparent: true,
        width: gameRootRef.current.clientWidth,
        height: gameRootRef.current.clientHeight,
        scene: KenLabScene,
        render: { antialias: false, pixelArt: true },
        scale: { mode: Phaser.Scale.RESIZE, autoCenter: Phaser.Scale.CENTER_BOTH },
        banner: false,
      })
    }

    start()
    return () => {
      disposed = true
      game?.destroy(true)
    }
  }, [])

  return (
    <main className="lab-page">
      <div className="lab-page__hud">
        <button type="button" onClick={() => setIndexOpen((value) => !value)} aria-expanded={indexOpen} aria-controls="lab-index"><List aria-hidden="true" />LAB_INDEX [04]</button>
        <span>KEN'S PHYSICS LAB</span>
        <Link to="/"><ArrowLeft aria-hidden="true" />EXIT</Link>
      </div>

      <div className="lab-page__scroll">
        <div className="lab-map">
          <img src={labMap} alt="A pixel-art physics laboratory map with experiment benches, tiled floors, tools, cabinets, an entrance, and four equipment stations" />
          <div className="lab-map__game" ref={gameRootRef} aria-hidden="true" />
          {STATIONS.map((station) => (
            <button className="lab-map__station" key={station.id} style={station.position} type="button" onClick={() => setActiveStation(station)} aria-label={`Inspect ${station.label}`}><span>{station.code}</span></button>
          ))}
          <button className="lab-map__jar" type="button" onClick={() => setJarFound(true)} aria-label="Inspect the hidden fermentation jar">?</button>
        </div>
      </div>

      <nav className={`lab-index ${indexOpen ? 'lab-index--open' : ''}`} id="lab-index" aria-label="Physics lab stations">
        <header><FlaskConical aria-hidden="true" /><strong>STATION INDEX</strong><button type="button" onClick={() => setIndexOpen(false)} aria-label="Close station index"><X aria-hidden="true" /></button></header>
        {STATIONS.map((station) => <button key={station.id} type="button" onClick={() => { setActiveStation(station); setIndexOpen(false) }}><span>{station.code}</span>{station.label}</button>)}
      </nav>

      <div className="lab-controls" aria-label="Move Ken around the lab">
        <button type="button" aria-label="Move up" onPointerDown={() => sendMove('up', true)} onPointerUp={() => sendMove('up', false)} onPointerLeave={() => sendMove('up', false)}><ChevronUp /></button>
        <button type="button" aria-label="Move left" onPointerDown={() => sendMove('left', true)} onPointerUp={() => sendMove('left', false)} onPointerLeave={() => sendMove('left', false)}><ChevronLeft /></button>
        <button type="button" aria-label="Move down" onPointerDown={() => sendMove('down', true)} onPointerUp={() => sendMove('down', false)} onPointerLeave={() => sendMove('down', false)}><ChevronDown /></button>
        <button type="button" aria-label="Move right" onPointerDown={() => sendMove('right', true)} onPointerUp={() => sendMove('right', false)} onPointerLeave={() => sendMove('right', false)}><ChevronRight /></button>
      </div>

      {activeStation ? (
        <section className="lab-readout" aria-live="polite" aria-labelledby="lab-readout-title">
          <button type="button" onClick={() => setActiveStation(null)} aria-label="Close station readout"><X aria-hidden="true" /></button>
          <span>STATION_{activeStation.code}</span><h1 id="lab-readout-title">{activeStation.label}</h1><p>{activeStation.text}</p>
        </section>
      ) : null}

      {jarFound ? (
        <section className="lab-readout lab-readout--jar" aria-live="polite"><button type="button" onClick={() => setJarFound(false)} aria-label="Close hidden note"><X /></button><span>HIDDEN_NOTE</span><h1>F.A. / FERMENTATION JAR</h1><p>A strange sample from the fermented astragalus feed project. It is a discovery, not a fifth lab station.</p></section>
      ) : null}
    </main>
  )
}
