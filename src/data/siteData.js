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
      'A long-term individual engineering project for a two-wheeled legged robot capable of balancing, carrying loads, following a target, and automatic obstacle avoidance.',
    detail:
      'The project spans mechanical engineering, embedded systems, control, and deep learning. The current goal is to turn a complex robotics idea into an inspectable engineering workflow that can eventually support practical public-welfare scenarios.',
    tags: ['Control', 'Embedded', 'Deep Learning', 'Mechanical Design'],
    outcomes: [
      'Defined a multi-domain robotics roadmap across balance, following, load bearing, and obstacle avoidance.',
      'Connected robotics work to future public-welfare uses and hands-on engineering education.',
      'Built the first website-ready project narrative for later photos, diagrams, and test videos.',
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
      'A student-led physics community for lectures, problem solving, AP support, and advanced topic exploration.',
    detail:
      'The club creates a regular space where students interested in physics can discuss ideas, work through difficult problems, and build confidence. As leader, I delivered lectures on interesting physics topics and helped classmates with problems they encountered.',
    actions: [
      'Delivered topic lectures and peer tutoring sessions.',
      'Supported members in strengthening school physics performance.',
      'Prepared the club to become a future science-outreach platform.',
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
