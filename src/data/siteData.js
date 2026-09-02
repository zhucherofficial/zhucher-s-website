import automaticWateringCircuit from '../assets/club-media/automatic-watering-circuit.webp'
import automaticWateringRobot from '../assets/club-media/automatic-watering-robot.webp'
import groupCadWork from '../assets/club-media/group-cad-work.webp'
import meLecturing from '../assets/club-media/me-lecturing.webp'
import pictureOfMyself from '../assets/club-media/picture-of-myself.webp'
import robotFailureShowcase from '../assets/club-media/robot-failure-showcase.mp4'
import robotFailurePoster from '../assets/club-media/robot-failure-poster.webp'
import robotSuccessPoster from '../assets/club-media/robot-success-poster.webp'
import robotSuccessShowcase from '../assets/club-media/robot-success-showcase.mp4'
import viceLeaderCindy from '../assets/club-media/vice-leader-cindy.webp'
import astragalusCover from '../assets/project-media/fermented-astragalus-feed.webp'
import profilePhoto from '../assets/profile-media/profile-photo.webp'
import selfConceptHillside from '../assets/profile-media/self-concept-hillside.webp'
import selfConceptPark from '../assets/profile-media/self-concept-park.webp'
import watchingYouMeme from '../assets/profile-media/watching-you-meme.webp'
import ramanCover from '../assets/project-media/raman-spectra-data.webp'
import robotCover from '../assets/project-media/wheeled-legged-robot.webp'
import subatomicCover from '../assets/project-media/subatomic.webp'
import spaghettiBridgeCover from '../assets/project-media/spaghetti-bridge/ken-bridge-cover.webp'

export const profile = {
  name: 'Ken Zhang',
  shortName: 'Ken',
  location: 'Jiangsu, China',
  email: 'zcycycycy@gmail.com',
  socials: [
    {
      id: 'bilibili',
      label: 'Bilibili',
      handle: 'zhucher',
      href: 'https://b23.tv/thuW1PV',
    },
    {
      id: 'douyin',
      label: '抖音',
      handle: '64571711782',
      href: 'https://v.douyin.com/-nhFQB4W9_s/',
    },
    {
      id: 'youtube',
      label: 'YouTube Channel',
      handle: '@zhucher',
      href: 'https://www.youtube.com/@zhucher',
    },
  ],
  portrait: profilePhoto,
  selfConceptPhotos: [
    {
      src: profilePhoto,
      alt: 'Ken Zhang playing an electric guitar outdoors',
    },
    {
      src: selfConceptPark,
      alt: 'Ken Zhang seated in a grassy park',
    },
    {
      src: selfConceptHillside,
      alt: 'Ken Zhang relaxing on a grassy hillside',
    },
  ],
  watchingYouMeme: {
    src: watchingYouMeme,
    alt: 'Warning meme: a figure ominously watching you',
    warningZh: '我一直在看着你',
    warningEn: 'I have been watching you',
  },
  intro:
    'I build at the intersection of physics, engineering, data analysis, and science education. My work ranges from subatomic physics data processing and Raman spectroscopy to robotics, embedded systems, and public-facing physics learning resources.',
  statement:
    'This site is the first version of a personal and club portfolio. It turns competition, research, internship, music, robotics, and outreach experiences into a clearer public narrative for college applications and future collaborators.',
  metrics: [
    { value: '9+', label: 'research and engineering activities' },
    { value: '4', label: 'physics, robotics, data, outreach pillars' },
  ],
}

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Club', href: '/physics-club' },
  { label: 'Service', href: '/physics-education' },
]

export const honors = [
  'AMC 12 Distinction, Top 5% globally; AIME Qualifier; AIME score 11/15',
  'BMO Round 1 Distinction, Top 25%; qualified for BMO Round 2',
  'Hypatia Mathematics Contest Distinction, Top 5%',
  'Physics Bowl Bronze Award',
  'China Thinks Big Global Round Team Showcase 3rd Place; Individual Academic Challenge 2nd Place',
  'CNAD / China National Academic Decathlon Team National First Award',
]

export const experiences = [
  {
    year: '2026',
    title: 'Johns Hopkins Explore Engineering Innovation',
    meta: 'Grade 11 / Summer engineering program',
    description:
      'Participated in a foreign-exchange summer engineering experience through Johns Hopkins University, exploring practical engineering design and university-level problem solving.',
  },
  {
    year: '2025',
    title: 'Yingjia Power Technology Project Analyst Intern',
    meta: 'Wuxi, Jiangsu / 40 hours per week',
    description:
      'Applied classroom physics to mechanical engineering problems, electromagnetic value analysis, product feasibility, and physics simulation during a four-week internship.',
  },
  {
    year: '2024-2026',
    title: 'Physics Club Leader and Tutor',
    meta: 'Jiangsu Tianyi High School',
    description:
      'Built a space for physics discussion, problem solving, lectures, and peer support across the school year.',
  },
  {
    year: '2024-2026',
    title: 'Guitarist and Band Member',
    meta: 'The Dindepence / performances and content',
    description:
      'Practiced and performed guitar with a band, connecting musical discipline with curiosity about the physics of instruments and sound.',
  },
]

export const projects = [
  {
    id: 'wheeled-legged-robot',
    title: 'Wheeled-Legged Robot Engineering Project',
    eyebrow: 'Robotics / Embedded Systems',
    role: 'Student researcher / individual project developer',
    period: 'Grades 11-12',
    hours: '5-10 hours per week',
    image: robotCover,
    imagePosition: '50% 54%',
    summary:
      'An engineering project focused on following, control, and automatic obstacle avoidance for a wheeled-legged robot.',
    detail:
      'My long-term goal is to build a two-wheeled legged robot capable of balancing, carrying loads, and automatic following. The project spans mechanical engineering, embedded systems, and deep learning. I hope the project can eventually support public welfare by helping people in practical scenarios.',
    tags: ['Control', 'Embedded', 'Deep Learning', 'Mechanical Design'],
    outcomes: [
      'Defined a multi-domain robotics roadmap across following, control, balancing, load bearing, and obstacle avoidance.',
      'Connected robotics work to future public-welfare uses and hands-on engineering education.',
      'Collected early test footage that shows both a successful movement trial and a failure case for iteration.',
    ],
    media: [
      {
        type: 'video',
        src: robotSuccessShowcase,
        poster: robotSuccessPoster,
        title: 'Robot success showcase',
        caption: 'A movement test showing the robot completing a trial more successfully.',
      },
      {
        type: 'video',
        src: robotFailureShowcase,
        poster: robotFailurePoster,
        title: 'Robot failure showcase',
        caption: 'A failure case kept in the archive to show the debugging and iteration process.',
      },
      {
        type: 'image',
        src: pictureOfMyself,
        title: 'Builder portrait',
        caption: 'Project owner and engineering lead.',
        imagePosition: '50% 38%',
      },
    ],
  },
  {
    id: 'subatomic-physics',
    title: 'Jet pT Reconstruction in Heavy-Ion Collisions',
    eyebrow: 'Subatomic Physics / Machine Learning',
    role: 'Student researcher',
    period: 'Grade 11',
    hours: '5 hours per week, 12 weeks per year',
    image: subatomicCover,
    imagePosition: '50% 50%',
    summary:
      'Reconstructed true jet transverse momentum after simulated thermal-background contamination, comparing FastJet subtraction with feature and image-based learning.',
    detail:
      'The pipeline generated PYTHIA events, added a multi-species thermal bath with elliptic-flow modulation, clustered anti-kT jets at R = 0.4, and matched reconstructed jets back to truth. Shared held-out indices supported direct comparisons between an area-based correction, feature regressors, a 32 x 32 x 3 CNN regressor, and a separate U-Net image-denoising branch.',
    tags: ['Heavy-Ion Jets', 'FastJet', 'CNN', 'U-Net'],
    outcomes: [
      'Processed 10,000 configured PYTHIA events into matched truth and thermal-background jet records.',
      'Evaluated 2,414 held-out CNN predictions, reaching a current residual resolution of 4.623 GeV/c and R-squared of 0.973.',
      'Documented U-Net channel diagnostics and the need for uncertainty, detector-response, and independently generated validation studies.',
    ],
  },
  {
    id: 'fermented-astragalus-feed',
    title: 'Fermented Astragalus Feed Research',
    eyebrow: 'Traditional Chinese Medicine / Circular Bioengineering',
    role: 'Team leader',
    period: 'Grade 10',
    hours: '5 hours per week, 10 weeks per year',
    image: astragalusCover,
    imagePosition: '50% 46%',
    summary:
      'Led a two-stage bioprocess that recovers value from Astragalus medicine residue and converts it into fermented feed.',
    detail:
      'The archived patent describes a two-stage route. Trametes versicolor first ferments milled Astragalus extraction residue; the treated material is then blended with corn meal and soybean meal and fermented with Lactiplantibacillus plantarum, Enterococcus faecium, and Saccharomyces cerevisiae. The preferred embodiment raised soluble sugar, astragaloside IV, and total flavonoids before producing a more acidic feed with higher protein and lower detergent fiber than the untreated-residue control.',
    tags: ['Bioprocess', 'Circular Feed', 'Patent Research', 'Team Leadership'],
    outcomes: [
      "Earned China Thinks Big national conference Editors' Choice with Highest Distinction.",
      'Received Global Round Team Showcase 3rd Place and Individual Academic Challenge 2nd Place recognition.',
      'Turned waste-resource reuse into a testable environmental engineering proposal.',
    ],
  },
  {
    id: 'raman-spectroscopy',
    title: 'Raman Spectroscopy Fermentation Analysis',
    eyebrow: 'University Research Assistant',
    role: 'Research assistant',
    period: 'Grade 11',
    hours: '4 hours per week',
    image: ramanCover,
    imagePosition: '50% 44%',
    summary:
      'Assisted a Jiangnan University research group with fermentation-tank sampling, Raman spectroscopy data analysis, and ML-based outcome detection.',
    detail:
      'The work focused on processing liquid samples, examining spectral peaks and valleys, and using machine learning to support real-time component monitoring for fermentation technology.',
    tags: ['Raman', 'Spectroscopy', 'Fermentation', 'Machine Learning'],
    outcomes: [
      'Trained a small machine learning model on provided data.',
      'Reached a demo outcome accuracy of 93.2%.',
      'Connected lab data analysis with practical fermentation monitoring.',
    ],
  },
  {
    id: 'spaghetti-bridge',
    title: 'Spaghetti Bridge: From Tests to 6th Place',
    eyebrow: 'Structural Engineering / Team EZ',
    role: 'Team EZ / modeling, analysis, and fabrication',
    period: 'JHU Explore Engineering Innovation / Summer 2026',
    hours: '3 labs / 8 model iterations',
    image: spaghettiBridgeCover,
    imagePosition: '50% 50%',
    summary:
      'We tested pasta in tension, bending, and buckling, used the measurements to size a bowstring-Pratt truss, and built the final EZ bridge for a 72-team competition.',
    detail:
      'Our team began by measuring how pasta broke and bent. We converted those results into conservative material inputs, screened several truss families, and kept revising around mass, clearance, buckling, and what we could actually build. The final bridge held 16.000 kg and placed 6th out of 72 teams.',
    tags: ['Structural Testing', 'Truss Modeling', 'Fabrication', 'Team EZ'],
    outcomes: [
      'Recorded all 73 measurements from the tension, bending, and buckling labs, then carried conservative material values into the bridge model.',
      'Developed a four-panel bowstring-Pratt through truss through eight iterations, including an explicit stability audit of the as-built geometry.',
      'Team EZ held 16.000 kg in the final contest and ranked 6th among 72 teams.',
    ],
  },
]

export const clubs = [
  {
    id: 'physics-club',
    name: 'Physics Club',
    school: 'Jiangsu Tianyi High School',
    role: 'Club leader and physics tutor',
    period: '2024-2026',
    // Position inside the home-scene PHYSICS_ARCHIVE folder (01 = PHYSICS_EDU).
    sheet: '02',
    sheetCount: '02',
    eyebrow: 'Physics Archive / Sheet 02',
    logoText: 'PC',
    summary:
      'A student-led physics community for lectures, problem solving, AP support, and hands-on engineering projects.',
    detail:
      'The club creates a regular space where students interested in physics can discuss ideas, work through difficult problems, build confidence, and turn engineering concepts into real prototypes. As leader, I delivered lectures on interesting physics topics and helped classmates with problems they encountered.',
    heroImage: meLecturing,
    heroImagePosition: '50% 44%',
    heroCaption:
      'Lecture in progress. The screen shows the project archive from this site: the wheeled-legged robot, subatomic physics data analysis, fermented astragalus feed, and Raman spectroscopy projects.',
    cardImage: groupCadWork,
    signals: [
      'AP and school physics support',
      'Advanced topic lectures',
      'CAD and circuit prototyping',
      'Robot test archive',
    ],
    tracks: [
      {
        id: 'concepts',
        title: 'Concepts',
        copy: 'Turn mechanics, electromagnetism, waves, and modern physics into discussable models.',
      },
      {
        id: 'practice',
        title: 'Practice',
        copy: 'Work through hard problems in a shared room where methods are explained, not hidden.',
      },
      {
        id: 'build',
        title: 'Build',
        copy: 'Turn physics ideas into circuits, CAD models, irrigation devices, and robot test footage.',
      },
    ],
    gallery: [
      {
        src: meLecturing,
        title: 'Lecture session',
        caption: 'Explaining physics ideas and problem-solving methods to club members.',
      },
      {
        src: groupCadWork,
        title: 'CAD work',
        caption: 'Club members doing CAD work as part of the engineering build process.',
      },
      {
        src: automaticWateringRobot,
        title: 'Automatic watering robot',
        caption: "Cindy's prototype for soil-moisture-based irrigation.",
      },
      {
        src: automaticWateringCircuit,
        title: 'Watering robot circuit',
        caption: 'Main circuit board for the automatic watering robot.',
      },
      {
        src: viceLeaderCindy,
        title: 'Vice leader Cindy',
        caption: 'Cindy, vice leader of the club and project owner of the watering robot.',
        imagePosition: '50% 32%',
      },
      {
        src: pictureOfMyself,
        title: 'Club leader',
        caption: 'Physics club leader and robotics project developer.',
        imagePosition: '50% 35%',
      },
    ],
    studentProjects: [
      {
        id: 'automatic-watering-robot',
        title: "Cindy's Automatic Watering Robot",
        eyebrow: 'Irrigation Automation / Embedded Sensing',
        owner: 'Cindy',
        role: 'Physics club vice leader / student engineer',
        summary:
          'A soil-moisture sensing system that waters plants only when underground humidity falls below a normal threshold.',
        detail:
          'The project helps people take care of plants while away from home, reduces the difficulty of manual watering for older adults, and brings water-saving automation into everyday irrigation.',
        tags: ['Soil Moisture', 'Irrigation', 'Circuit Build', 'Field Test'],
        process: ['Built the main circuit', 'Field testing and experiments'],
        metrics: [
          { value: '30%', label: 'target reduction in total water use compared with manual watering' },
          { value: '1x / week', label: 'maximum expected manual adjustment during normal operation' },
        ],
        images: [
          {
            src: automaticWateringRobot,
            alt: "Cindy's automatic watering robot prototype",
            title: 'Prototype',
            caption: 'The assembled watering robot before a field test.',
            imagePosition: '50% 50%',
          },
          {
            src: automaticWateringCircuit,
            alt: 'Circuit board of the automatic watering robot',
            title: 'Main circuit',
            caption: 'The sensing and switching board Cindy built for the prototype.',
            imagePosition: '50% 50%',
          },
        ],
      },
      {
        id: 'wheeled-legged-robot',
        // Title, eyebrow, role, tags, outcomes, and test footage come from this
        // project entry so the club page never drifts from the case study.
        projectId: 'wheeled-legged-robot',
        owner: 'Ken Zhang',
        role: 'Club leader / individual project developer',
        process: ['Mechanical and control roadmap', 'Embedded test footage', 'Deep-learning direction'],
        metrics: [
          { value: '3', label: 'main technical areas: mechanical engineering, embedded systems, deep learning' },
          { value: '2', label: 'early robot test videos in the club archive' },
        ],
      },
    ],
    actions: [
      'Delivered topic lectures and peer tutoring sessions.',
      'Supported members in strengthening school physics performance.',
      'Documented member engineering work through photos, circuits, CAD sessions, and test videos.',
    ],
  },
]

export const serviceProjects = [
  {
    id: 'physics-education',
    title: 'Physics Education for Under-Resourced Children',
    role: 'Volunteer / project initiator',
    period: 'Grades 11-12 / conducting stage',
    summary:
      'A planned public-welfare project to provide physics-learning resources for children with limited educational access.',
    detail:
      'The project aims to build a website with physics knowledge points, vivid demonstrations, possible social-organization collaboration, and social-media promotion. Future versions will add partner organization, launch date, and a public website link.',
    commitment: 'Planned commitment: 2 hours per week, 10 weeks per year',
    outcomes: [
      'Create accessible online physics courses and learning content.',
      'Connect instruments and physical phenomena to make abstract concepts more vivid.',
      'Invite more contributors to reduce barriers to education.',
    ],
  },
  {
    id: 'math-tutoring',
    title: 'Elementary-School Math Tutoring',
    role: 'Volunteer tutor',
    period: 'Grades 10-11 / school break',
    summary:
      'Community tutoring for younger students, using math support as a way to encourage scientific curiosity.',
    detail:
      'The activity took place through a community service site where volunteers supported elementary-school students with mathematics over approximately two to three weeks.',
    commitment: '5 hours per week, 5 weeks per year',
    outcomes: [
      'Helped children in the community with mathematics study.',
      'Shared personal interest in science with younger students.',
      'Built a service foundation for broader physics education work.',
    ],
  },
]

export const getProjectById = (id) => projects.find((project) => project.id === id)
export const getClubById = (id) => clubs.find((club) => club.id === id)
export const getServiceById = (id) => serviceProjects.find((service) => service.id === id)
