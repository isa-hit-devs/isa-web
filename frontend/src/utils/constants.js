// Exact post categories supported by the backend model and validators
export const POST_CATEGORIES = [
  'Tech Monday',
  'Tech Photography',
  'Walking Wednesday',
  'Thought Thursday',
  'Quiz Friday',
  'Blogs',
  'Events'
];

// Slugs for URLs and metadata
export const CATEGORY_META = {
  'Tech Monday': {
    slug: 'tech-monday',
    label: 'Tech Monday',
    description: 'Explore the latest engineering breakthroughs, tech insights, and automation trends to start your week.',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    accent: '#0066CC',
    tagline: 'Weekly Technology & Engineering Insights'
  },
  'Tech Photography': {
    slug: 'tech-photography',
    label: 'Tech Photography',
    description: 'A visual celebration of technology, industrial machinery, lab experiments, and campus tech moments.',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accent: '#4F46E5',
    tagline: 'Visualizing Technology & Innovation'
  },
  'Walking Wednesday': {
    slug: 'walking-wednesday',
    label: 'Walking Wednesday',
    description: 'Mid-week journey into student projects, industrial visits, robotics, and hands-on chapter experiences.',
    color: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    accent: '#0891B2',
    tagline: 'Hands-on Projects & Field Journeys'
  },
  'Thought Thursday': {
    slug: 'thought-thursday',
    label: 'Thought Thursday',
    description: 'Deep dives, opinion pieces, thought leadership, and brainstorming on the future of instrumentation.',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    accent: '#D97706',
    tagline: 'Deep Reflections & Industry Perspectives'
  },
  'Quiz Friday': {
    slug: 'quiz-friday',
    label: 'Quiz Friday',
    description: 'Test your engineering acumen, automation trivia, circuit puzzles, and technical brain teasers.',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accent: '#059669',
    tagline: 'Weekly Technical Challenges & Trivia'
  },
  'Blogs': {
    slug: 'blogs',
    label: 'Blogs',
    description: 'Comprehensive technical articles, tutorials, project walkthroughs, and research stories written by members.',
    color: 'bg-violet-50 text-violet-700 border-violet-200',
    accent: '#7C3AED',
    tagline: 'Articles, Tutorials & Research'
  },
  'Events': {
    slug: 'events',
    label: 'Events',
    description: 'Workshops, hackathons, guest lectures, annual summits, and technical competitions hosted by ISA & ISOI HIT.',
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    accent: '#E11D48',
    tagline: 'Workshops, Hackathons & Seminars'
  }
};

// Exact member positions from backend membersModel & validators
export const MEMBER_POSITIONS = [
  'President',
  'Vice-President',
  'Secretary',
  'Joint-Secretary',
  'Treasurer',
  'Technical-Head',
  'Media-Head',
  'Content-Head',
  'PR-Head',
  'GD-Head',
  'Marketing-Head',
  'Manager',
  'Web Developer',
  'Technical Member',
  'Content Writer',
  'Photographer',
  'Video Editor',
  'Graphic Designer',
  'PR'
];

// Exact member categories from backend
export const MEMBER_CATEGORIES = [
  'Core-Member',
  'General-Member'
];

// Exact alumni batches from backend alumniModel & validators
export const ALUMNI_BATCHES = [
  '2020-2024',
  '2021-2025',
  '2022-2026',
  '2023-2027',
  '2024-2028'
];

export const CHAPTER_INFO = {
  name: 'ISA & ISOI HIT Student Chapter',
  parentBody: 'International Society of Automation & Instrument Society of India',
  college: 'Haldia Institute of Technology',
  location: 'Haldia, West Bengal, India',
  email: 'isa.hit.chapter@gmail.com',
  motto: 'Setting the Standard for Automation & Instrumentation',
  description: 'The International Society of Automation (ISA) and Instrument Society of India (ISOI) Student Chapter at Haldia Institute of Technology provides a premier platform for students to foster technical excellence, leadership, and innovation in instrumentation, automation, and control systems.'
};
