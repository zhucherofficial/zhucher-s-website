import automaticWateringCircuit from '../assets/club-media/automatic-watering-circuit.jpg'
import automaticWateringRobot from '../assets/club-media/automatic-watering-robot.jpg'
import groupCadWork from '../assets/club-media/group-cad-work.jpg'
import meLecturing from '../assets/club-media/me-lecturing.jpg'
import pictureOfMyself from '../assets/club-media/picture-of-myself.jpg'
import robotFailureShowcase from '../assets/club-media/robot-failure-showcase.mp4'
import robotFailurePoster from '../assets/club-media/robot-failure-poster.png'
import robotSuccessPoster from '../assets/club-media/robot-success-poster.png'
import robotSuccessShowcase from '../assets/club-media/robot-success-showcase.mp4'
import viceLeaderCindy from '../assets/club-media/vice-leader-cindy.jpg'
import astragalusCover from '../assets/project-media/fermented-astragalus-feed.jpg'
import profilePhoto from '../assets/profile-media/profile-photo.jpg'
import ramanCover from '../assets/project-media/raman-spectra-data.png'
import robotCover from '../assets/project-media/wheeled-legged-robot.jpg'
import subatomicCover from '../assets/project-media/subatomic.webp'

export const profile = {
  name: 'Physics & Engineering Student',
  shortName: 'Zhu',
  location: 'Jiangsu, China',
  email: 'zcycycycy@gmail.com',
  phone: 'Phone to be confirmed',
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
  { label: 'Club', href: '/club/physics-club' },
  { label: 'Service', href: '/service/physics-education' },
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
    title: 'Experimental Subatomic Physics Data Analysis',
    eyebrow: 'Physics / Machine Learning',
    role: 'Student researcher',
    period: 'Grade 11',
    hours: '5 hours per week, 12 weeks per year',
    image: subatomicCover,
    imagePosition: '50% 50%',
    summary:
      'Analyzed subatomic experiment data to identify jet resolution under thermal background in single-event hadron collisions.',
    detail:
      'The research compared convolutional neural network methods with mathematical algorithms and decision-tree-based machine learning models. A second paper draft has been submitted and is awaiting feedback; final paper title is still to be confirmed.',
    tags: ['Particle Physics', 'CNN', 'Data Processing', 'Research Draft'],
    outcomes: [
      'Explored optimal data-processing solutions for experimental physics data.',
      'Compared ML-assisted resolution with mathematical and decision-tree-based baselines.',
      'Prepared work for a draft paper and future academic refinement.',
    ],
  },
  {
    id: 'fermented-astragalus-feed',
    title: 'Fermented Astragalus Feed Research',
    eyebrow: 'China Thinks Big / Environmental Engineering',
    role: 'Team leader',
    period: 'Grade 10',
    hours: '5 hours per week, 10 weeks per year',
    image: astragalusCover,
    imagePosition: '50% 46%',
    summary:
      'Led an interdisciplinary project transforming herbal waste into fermented astragalus feed for more efficient livestock feeding.',
    detail:
      'The project combined biology and environmental engineering. Third-party assessment supported the effectiveness of the product, and the result showed lower feed conversion ratio compared with normal feed.',
    tags: ['Bioengineering', 'Sustainability', 'Team Leadership', 'CTB'],
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
]

export const clubs = [
  {
    id: 'physics-club',
    name: 'Physics Club',
    school: 'Jiangsu Tianyi High School',
    role: 'Club leader and physics tutor',
    logoText: 'PC',
    summary:
      'A student-led physics community for lectures, problem solving, AP support, and hands-on engineering projects.',
    detail:
      'The club creates a regular space where students interested in physics can discuss ideas, work through difficult problems, build confidence, and turn engineering concepts into real prototypes. As leader, I delivered lectures on interesting physics topics and helped classmates with problems they encountered.',
    heroImage: meLecturing,
    cardImage: groupCadWork,
    featureImage: meLecturing,
    featureCaption: 'Club lecture session led for members interested in physics and engineering.',
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
        owner: 'Vice leader Cindy',
        role: 'Physics club vice leader / student engineer',
        summary:
          'A soil-moisture sensing system that waters plants only when underground humidity falls below a normal threshold.',
        purpose:
          'The project helps people take care of plants while away from home, reduces the difficulty of manual watering for older adults, and brings water-saving automation into everyday irrigation.',
        process: ['Built the main circuit', 'Field testing and experiments'],
        metrics: [
          { value: '30%', label: 'target reduction in total water use compared with manual watering' },
          { value: '1x / week', label: 'maximum expected manual adjustment during normal operation' },
        ],
        images: [
          {
            src: automaticWateringRobot,
            alt: "Cindy's automatic watering robot prototype",
            imagePosition: '50% 50%',
          },
          {
            src: automaticWateringCircuit,
            alt: 'Circuit board of the automatic watering robot',
            imagePosition: '50% 50%',
          },
          {
            src: viceLeaderCindy,
            alt: 'Vice leader Cindy',
            imagePosition: '50% 32%',
          },
        ],
      },
      {
        id: 'wheeled-legged-robot',
        title: 'Wheeled-Legged Robot',
        owner: 'Zhu',
        role: 'Club leader / individual project developer',
        summary:
          'A robotics project involving following, control, and automatic obstacle avoidance for a wheeled-legged robot.',
        purpose:
          'The long-term goal is to build a two-wheeled legged robot capable of balancing, carrying loads, and automatic following, with future public-welfare applications in practical scenarios.',
        process: ['Mechanical and control roadmap', 'Embedded test footage', 'Deep-learning direction'],
        metrics: [
          { value: '3', label: 'main technical areas: mechanical engineering, embedded systems, deep learning' },
          { value: '2', label: 'early robot test videos in the club archive' },
        ],
        videos: [
          {
            src: robotSuccessShowcase,
            poster: robotSuccessPoster,
            title: 'Success showcase',
          },
          {
            src: robotFailureShowcase,
            poster: robotFailurePoster,
            title: 'Failure showcase',
          },
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
