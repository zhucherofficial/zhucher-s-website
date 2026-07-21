# Ken Zhang Portfolio Redesign Brief

This is the living source of truth for the redesign interview. Update it whenever a design decision is resolved.

## Identity

- Primary public name: **Ken Zhang**.
- Official-name references: **Chengyu (Ken) Zhang** appears only in the resume, contact details, and page metadata.
- Pronouns: **he/him**.

## Creative Direction

- Primary inspiration: the object-based, full-viewport interaction model of `bryantcodes.art`.
- The result must be original and personalized, not a copy of the reference site's code, assets, or exact choreography.
- The experience should present Ken as an experimentalist who builds playful things.
- Objects are deliberately abstract and hand drawn. They only need enough recognizable structure for visitors to identify them.
- Do not make the circuit board, OLED, guitar, folder, or other props photorealistic.
- The overall site must remain vivid and multicolored, while each large object keeps one clear dominant body color.
- Color fills, outlines, and marks should look spontaneous and irregular, as though drawn by hand rather than aligned mechanically.
- Working palette direction: white paper, cobalt blue, phosphor green, signal yellow, cyan, and small magenta accents.

## Illustration Construction

- Build the circuit board, guitar, and folder as inline SVG with independent `construction`, `paint`, `outline`, `details`, `labels`, and semantic `hit-regions` layers.
- Use thin authored construction paths and precise dark outlines to establish each object before color appears.
- Create color with several broad, round-ended brush paths behind the outlines rather than closed polygon fills.
- Leave selected corners white and let chosen brush strokes overshoot the silhouette by roughly 3-8% so the result feels hand painted rather than mechanically filled.
- Keep the irregularity authored and deterministic. Do not use continuously wobbling SVG filters or unseeded runtime geometry.
- The circuit board must include an OLED bezel, four mounting holes, orthogonal traces, vias, a 14-pin IC, an 8-pin header, a resistor, an LED, and a power connector. Do not use the large stacked cylindrical capacitor motif rejected in the July 19 review.
- The PCB body uses one pure phosphor-green paint color (`#B8FF2C`) across every broad body stroke. Reserve cobalt, cyan, yellow, and magenta for traces, pads, labels, and components so the board does not read as competing color bands.
- Base the guitar on Ken's real Tele-style instrument in `src/assets/profile-media/profile-photo.jpg`: a solid single-cutaway body with a smoothly rounded lower bout and bottom, expressive pickguard, exactly two simplified pickups, bridge, control plate, two knobs, frets, nut, six continuous strings, and a six-inline headstock with tuning pegs.
- The guitar body has no sound hole, f-hole, circular center cutout, or third pickup in any desktop, selector, mobile, or lab representation.

## Typography

- Use a readable monospaced type family for OLED copy, application windows, sidebar controls, formula rings, metadata, and project/detail-page narratives.
- Use irregular hand-drawn lettering only when the text belongs to an illustrated physical object, such as folder labels, guitar markings, or the amplifier/sound switch.
- Do not use hand-drawn display lettering for long body copy.
- Keep letter spacing at `0`; create energy through scale, color, rotation, and object motion rather than tightened tracking.

## Site Architecture

- The primary site is a full-screen, scene-based experience rather than a long scrolling homepage.
- Section changes use animated scene transitions.
- Project detail pages remain readable scrolling pages.
- Every project has its own independent URL and page. Project narratives must not be blended into one continuous page.
- Physics Education and Physics Club also have separate, deep-linkable detail pages.
- A separate Website 1-inspired pixel-world route lives at `/lab`.
- `/` owns one persistent scene reducer with `drawing`, `gate`, `powering`, `main`, `about-bio`, `about-more`, `guitar`, `folder`, and `routing` states.
- `drawing`, `gate`, and `main` are visually exclusive states on `/`; changing between them does not add browser-history entries.
- Canonical detail routes are `/projects/wheeled-legged-robot`, `/projects/subatomic-physics`, `/projects/raman-spectroscopy`, `/projects/fermented-astragalus-feed`, `/physics-education`, `/physics-club`, and `/lab`.
- Preserve redirects from existing legacy URLs, and provide a deliberate not-found route.

## Content Source Of Truth

- Treat the existing `src/data/siteData.js` content and imported project/club/profile media as the factual source of truth.
- Preserve factual claims, dates, roles, hours, outcomes, awards, and current status unless Ken provides a correction.
- Editorial changes may improve grammar, hierarchy, concision, and narrative flow.
- Remove copy that describes the site as a "first version."
- Do not invent achievements, metrics, collaborators, recommendations, project outcomes, or future status.
- Continue to exclude the unconfirmed phone number.
- Do not include a downloadable resume, resume control, or resume placeholder in the first release.

## Pixel Lab Route

- `/lab` is a compact interactive Easter egg, not a duplicate portfolio or multi-area game.
- Build one richly animated top-down or lightly isometric pixel-art physics lab map with an original environment and sprite work.
- The first viewport must read as a real walkable room rather than a dashboard: reserve at least 75% of the viewport for the spatial playfield and clear circulation paths.
- Show recognizable walls, tiled floor, entrance/exit door, benches, cabinets, shelves, stools, cables, tools, and station-specific equipment.
- Visitors can move a Ken avatar, inspect a small number of experiment stations, and discover hidden notes.
- Walking is optional: provide an always-available collapsed semantic index for direct access to each station, but do not keep a large station sidebar or four boxed station cards open over the map.
- Provide a persistent exit back to the primary portfolio.
- Support keyboard and touch input, reduced motion, and a non-game navigation path.
- Lazy-load the entire route and its game assets so it does not delay the primary portfolio.
- Include exactly four primary interactive stations:
  - `ROBOT_BENCH`: a small robot movement/obstacle-avoidance interaction.
  - `RAMAN_LASER`: align a beam and reveal a spectrum.
  - `PARTICLE_SCREEN`: trigger and inspect stylized collision tracks.
  - `GUITAR_SCOPE`: pluck a string and view its waveform.
- Represent the fermented astragalus project as a strange hidden jar, note, or discovery rather than a fifth primary station.

## Main OLED Copy

Display these lines in the powered main scene:

```text
I'm Ken! (he/him)
I am an experimentalist
I build playful things_
```

- The trailing underscore is a flashing terminal cursor.
- The About control is labeled `ABOUT_KEN`.

## Entry Sequence

- Every fresh load of `/` replays the complete authored drawing sequence; intro completion is never persisted.
- Direct project, Physics, and `/lab` links bypass the home gate and load their requested route normally.
- At `0.05s`, the first seeded authored background scribble begins drawing; the second begins at `0.45s`.
- At `1.45s`, the OLED and PCB perimeter begin drawing. At `1.90s`, orthogonal traces, pins, IC, resistor, LED, vias, header, and connector draw in staggered groups. Each component group enters separately rather than appearing as one simultaneous batch.
- At `2.35s`, broad imperfect brush-color paths sweep behind the outlines.
- At `3.30s`, the OLED reveals `CLICK TO POWER ON`; at `3.45s`, the native power target becomes interactive.
- The drawing and completed gate contain only the circuit-board/OLED assembly and background scribbles. They contain no guitar, Physics folder, formula rings, or main-scene identity copy.
- Reduced motion skips directly to the completed gate, with the power target immediately available.
- Activating power changes the reducer to `powering` immediately without navigation. During the first `300ms`, the same board compresses to about 52%, tilts roughly 25 degrees, illuminates its traces, and flashes the OLED.
- The same board then springs into its large left-side main position over about `850ms`. Six formula rings enter at roughly `70ms` intervals, while the guitar and Physics folder draw and brush-fill as main-only objects.
- Type the three approved OLED lines after the board settles and enable main controls at about `1.6s`.

## About Scene

- The About object is an abstract hand-drawn OLED screen powered by a recognizable hand-drawn circuit board.
- `about-bio` and `about-more` are sequential, visually separate full-screen states. They are never presented as a split-screen comparison in the actual experience.
- Maintain separate approval artboards for these states: `02a-about-bio` and `02b-more-about`.
- Opening About reveals a window titled `Ken_Zhang.app`.
- The initial `Ken_Zhang.app` view contains only the approved biography copy.
- Beside the biography, show a smaller overlapping window titled `SELF_CONCEPT.jpg`.
- Create an original vivid hand-drawn portrait from Ken's existing profile photograph, preserving a recognizable likeness without using a photorealistic treatment.
- Do not show Experience or Honors immediately when the biography opens.
- Provide a deliberate `MORE_ABOUT_ME` action after the biography.
- `MORE_ABOUT_ME` contains Ken's existing Experience and Honors content.
- Activating `MORE_ABOUT_ME` must not replace or erase the biography window.
- Instead, the biography window shifts partially to the side and remains visible as part of an overlapping hand-drawn desktop.
- In `about-more`, the shifted biography is only retained background context behind the new center window; it is not a second side-by-side page.
- One new large `MORE_ABOUT_KEN.app` window enters and occupies the center, following the layered-window composition of the supplied reference screenshot.
- The new window contains a persistent sidebar with exactly two content choices: `HONORS` and `FIELD_NOTES`.
- `HONORS` displays Ken's awards and competition distinctions in the main panel.
- `FIELD_NOTES` displays Ken's Experience timeline in the same main panel.
- Selecting a sidebar choice swaps only the main-panel content; it does not create another window.
- On desktop, the earlier biography window remains partially visible behind or beside the centered `MORE_ABOUT_KEN.app` window.
- On mobile, preserve both content choices in a full-screen window without squeezing the overlapping desktop composition into the viewport.
- Do not include peer recommendations or testimonial content.
- Approved About copy:

> I'm a high school student who dreams of building awesome engineering projects and shipping them into the world.
>
> Together, let's create something that sparks - something that impresses your friends, your family, and maybe even society, and leaves people saying, "woah."

## Projects Scene

- The Projects object is an abstract hand-drawn six-string electric guitar.
- Match the recognizable Tele-style anatomy of Ken's real guitar while keeping the line work loose and abstract.
- Include the classic landmarks listed in Illustration Construction, but omit tiny screws and other hardware that do not improve recognition or interaction.
- Keep the lower bout visibly round, the center solid, and exactly two pickups readable at every size.
- Selecting Projects reveals one project per guitar string.
- From the visually highest string to the lowest, use this fixed order:
  1. Wheeled-Legged Robot Engineering Project
  2. Experimental Subatomic Physics Data Analysis
  3. Raman Spectroscopy Fermentation Analysis
  4. Fermented Astragalus Feed Research
  5. Unassigned future slot
  6. Unassigned future slot
- Selecting an occupied string opens that project's independent detail page.
- Strings 5-6 remain available for future projects.
- Empty strings are unlabeled at rest.
- Hovering, focusing, or plucking an empty string shows:

```text
UNASSIGNED_
awaiting the next experiment
```

- Empty strings do not navigate.

## Project Detail Pages

- Use a shared case-study UI inspired by Website 2 while keeping all implementation, assets, copy, and choreography original.
- Each project remains an independent route and page.
- Use a full-viewport dark editorial stage with an approximately 30/70 composition:
  - A narrow left narrative rail for the title, one-line positioning, role/period/hours metadata, summary, outcomes, and longer story.
  - An oversized right media surface for project imagery, video, diagrams, and data.
- Give the right media surface a subtle perspective tilt, clipped corners, and tactile depth rather than presenting ordinary flat cards.
- The narrative and media advance through one synchronized vertical scroll so the story and evidence remain paired.
- Keep a large, persistent close/back control available throughout the case study.
- Use monospaced display headings and restrained readable body typography on the dark stage.
- Add subtle grain/texture, but keep the case-study UI calmer than the main menu.
- Give each project its own vivid accent color, opening motion, diagrams, and media rhythm while retaining the shared structure.
- Keep photographs, videos, spectra, data images, and robot footage real and unfiltered so visitors can inspect the actual work.
- Apply the hand-drawn treatment to surrounding frames, annotations, arrows, diagrams, and transitions rather than obscuring the evidence itself.
- Entry motion: the selected guitar string/project preview expands or morphs into the tilted media surface while the background crossfades dark and narrative text fades in.
- Exit motion should visually collapse the media surface back toward the guitar selector rather than cutting abruptly.

## Physics Folder

- Replace the reference site's Blog object with an abstract hand-drawn folder.
- Opening the folder reveals exactly two options:
  - `PHYSICS_EDU`
  - `PHYSICS_CLUB`
- Each option opens its own separate detail page.
- Both detail pages reuse the dark 30/70 editorial case-study shell used by project pages.
- Adapt the right media surface to resemble an opened paper dossier emerging from the folder, distinguishing community/education work from guitar-selected projects without changing the navigation model.

## Background Motion

- Replace the reference site's rotating background code with physics formulas and short physicist quotations.
- The text follows several concentric circular paths behind the main objects.
- Use six concentric text rings on desktop and four on mobile.
- Formula rings are a powered-main and section-state system. They do not appear during `drawing` or `gate`.
- Rings rotate slowly, with neighboring rings moving in alternating directions.
- Keep each formula or quotation stable relative to its circular path; animate the rings as coherent units rather than making individual words drift or wobble.
- Add restrained perspective/scale pulses, texture masking, and occasional pixel-like interruptions inspired by the reference so the stable text still feels kinetic and visibly spinning.
- Text is lower contrast than the foreground objects, similar to the gray/blue background text in the reference.
- Formula and quotation content connects to Ken's interests across mechanics, electromagnetism, circuits, waves/optics, quantum/particle physics, thermodynamics, fluid mechanics, Raman spectroscopy, and control systems.
- Approved formula bank:
  - `F = ma`
  - `p = mv`
  - `tau = r x F`
  - `E_k = 1/2 mv^2`
  - `L = T - V`
  - `d/dt(partial L / partial qdot) - partial L / partial q = 0`
  - `div E = rho / epsilon_0`
  - `div B = 0`
  - `curl E = -partial B / partial t`
  - `curl B = mu_0 J + mu_0 epsilon_0 partial E / partial t`
  - `F = q(E + v x B)`
  - `V = IR`
  - `P = VI`
  - `omega_0 = 1 / sqrt(LC)`
  - `i hbar partial psi / partial t = Hhat psi`
  - `Delta x Delta p >= hbar / 2`
  - `E = hf`
  - `p = h / lambda`
  - `E^2 = p^2 c^2 + m^2 c^4`
  - `partial^2 u / partial t^2 = c^2 nabla^2 u`
  - `c = f lambda`
  - `n_1 sin theta_1 = n_2 sin theta_2`
  - `d sin theta = m lambda`
  - `F(k) = integral f(x)e^(-ikx) dx`
  - `PV = nRT`
  - `dU = delta Q - delta W`
  - `S = k_B ln Omega`
  - `P + 1/2 rho v^2 + rho gh = constant`
  - `Delta nu = nu_0 - nu_s`
  - `E_v = (v + 1/2) hbar omega`
  - `I_R proportional to |partial alpha / partial Q|^2`
  - `xdot = Ax + Bu`
  - `u = -Kx`
  - `u(t) = K_p e + K_i integral e dt + K_d de/dt`
- Render formulas with proper mathematical symbols in the interface even though this brief keeps an ASCII source representation.
- Approved quotation bank:
  - `What I cannot create I do not understand. - Richard Feynman`
  - `Nothing in life is to be feared; it is only to be understood. - Marie Curie`
  - `Nothing is too wonderful to be true, if it be consistent with the laws of nature. - Michael Faraday`
  - `The important thing is not to stop questioning. - Albert Einstein`
- Use quotations occasionally as separators within the formula-heavy rings.
- Keep the rings legible as texture without letting them overpower the interactive objects.
- Render the formulas to canvas textures wrapped around open tapered cylinders. Keep the cylinder geometry stationary and animate texture offsets in alternating directions so the words move around stable ellipses, matching the reference mechanism without copying its code or text.

## Confirmed Interaction Principles

- The main scene contains exactly three primary foreground objects: the OLED/circuit board, the guitar, and the Physics folder.
- On desktop, the About circuit board is the largest object on the left, the Tele-style guitar occupies the right, and the smaller Physics folder sits above the guitar.
- Main-scene objects act as section selectors.
- Detailed content uses semantic HTML and remains readable after theatrical transitions.
- The visual composition must be purpose-built for mobile rather than shrinking the desktop scene.
- Reduced-motion behavior must preserve all navigation and content.

## Mobile Main Scene

- Keep all three primary objects visible in one fixed, full-viewport mobile composition rather than using a carousel.
- Place the OLED/circuit-board object across the upper half.
- Place the Physics folder and guitar in the lower region with distinct, stable tap areas.
- Do not scale the entire desktop canvas down to fit; redraw/reposition each object for the mobile composition.
- Selecting the folder or guitar expands that object into a dedicated full-screen interaction state.
- Use generous invisible hit regions around thin guitar strings while preserving their hand-drawn appearance.
- Do not require a custom cursor, hover, or precision pointing on touch devices.

## Sound

- Sound effects are supported but muted by default.
- Provide a persistent hand-drawn amplifier/sound switch and remember the visitor's choice.
- When sound is enabled, use short object-specific effects such as an OLED power click/beep, distinct guitar-string notes, and a folder-paper rustle.
- Do not use continuous background music.
- Every sound-backed interaction must retain equally clear visual feedback when muted.
- Persist only the sound preference under `ken-site:sound:v1`; do not persist intro completion or home-scene state.

## Engineering Direction

- Implement finite choreography with GSAP and inline SVG `pathLength="1"` dash reveals; reserve CSS animation for subtle idle drift and the OLED cursor.
- Scene changes begin by springing the selected physical object forward while the other objects recede, then spring the destination scene in. Reverse transitions animate the destination away before rebuilding the main object arrangement.
- Main-scene pointer motion uses one inertial compositor transform for the scene stage. Disable it for coarse pointers, reduced motion, hidden scenes, and transitions.
- Choose once per fresh home load from a small seeded bank of authored scribble variants so the opening feels spontaneous without unstable geometry or React Strict Mode flicker.
- Keep native buttons and links over decorative SVG hit regions, make inactive scenes inert, restore focus after reverse transitions, and disable parallax for coarse pointers.
- Route-split detail pages and `/lab`; stop GSAP timelines, requestAnimationFrame work, and Web Audio activity when a scene is hidden or unmounted.
- Lazy-load Phaser for `/lab`. Remove Three.js, React Three Fiber, Drei, Maath, and Motion after their final consumers are removed.
- Project transition context uses `{ sourceRect, mediaSrc, accent, origin, itemId }`; the project manifest records string order, route, accent, preview media, and assigned/unassigned state.
- Use only processed repository media in production. Never ship raw `source-media/` files, and convert the HEVC robot footage to browser-compatible H.264 and WebM derivatives before release.

## Reference Motion Study

- Animation quality is a primary requirement, not final-stage decoration.
- Before concepting and implementation, revisit both supplied reference sites and capture their important motion sequences for analysis.
- Record transition order, duration, easing, camera movement, hover/focus response, object entrances, section changes, and return-to-menu behavior.
- Translate the interaction principles into original Ken-specific choreography; do not copy reference assets, source code, or exact animation sequences.
- Compare the implemented motion against the recorded observations during browser QA.
- Initial power-on observation: the reference uses a three-stage object motion, moving from close-up to a sudden recoil/shrink and then returning at menu scale while background text appears.
- About observation: the primary object zooms to fill the stage; content windows arrive sequentially; requesting more content moves the biography aside before the new center window arrives.
- Sidebar observation: sidebar selection changes only the main content panel inside a stable window, avoiding repeated page or window transitions.
- Projects observation: the selector object clears the scene, a new material surface grows in, project selectors appear from it, and the chosen selector expands into the case-study media surface.
- Case-study observation: the dark stage, narrow text rail, and tilted media surface scroll together as one continuous narrative.

## Motion Hierarchy

- Avoid making every layer move aggressively at the same time.
- At idle, keep the concentric text rings rotating and give foreground objects only subtle, irregular hand-drawn drift, tilt, or breathing motion.
- Reserve the largest animation for deliberate visitor interactions.
- About transition: circuit traces power up and the scene moves into the OLED/window environment.
- Physics folder transition: the folder opens and its two option papers unfold or slide into view.
- Projects transition: the guitar swings or moves forward, then its six strings become the project selector and visibly vibrate when plucked.
- Return transitions should visibly reverse or resolve the object action instead of abruptly resetting the scene.

## Contact And Socials

- A small persistent hand-drawn envelope in the top-left opens email contact.
- A small persistent hand-drawn signal/antenna control in the bottom-right opens YouTube, Bilibili, and Douyin.
- Remove the phone number everywhere; do not display a placeholder or unconfirmed number.

## Interview Status

- The design interview is complete. IBM Plex Mono, the vivid palette, and per-object color ownership are selected.
- The approval set must show separate drawing, completed gate, powered main, About, and More About artboards; the Telecaster and real-room lab map must be consistent across desktop and mobile concepts.
- Production `src/` implementation begins only after this revised approval set is explicitly accepted.
