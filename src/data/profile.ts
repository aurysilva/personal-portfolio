export const profile = {
  name: 'Aury Silva',
  title: 'Full-stack Developer',
  location: 'Hull, United Kingdom',
  email: 'aurywork@gmail.com',
  phone: '07448269948',
  available: true,
  roles: [
    'Backend Developer',
    'Frontend Developer',
    'Email Developer',
    'Digital Designer',
  ],
  intro:
    "I don't mean to brag, but I'm a full-stack developer skilled in Node.js, .NET Core, and Ruby. I also work with Shopify and WordPress, and have strong expertise in email development and digital design. Oh wait... did I mention React TS/JS/native/expo?",
  about: `I am a Full-Stack Developer based in Hull, United Kingdom, with over 10 years of comprehensive web development experience, spanning both commercial roles and freelance ventures. Holding a BA in Digital Design, I possess strong creative and technical skills, utilizing tools like Figma and the Adobe Suite to drive user-focused UI/UX digital solutions.

My journey in tech seamlessly bridges both frontend and backend development. I engineer scalable applications using React (TypeScript and JavaScript), React Native, and Expo on the frontend, supported by robust backend architectures built with .NET Core and Node.js. I also work extensively across diverse CMS and e-commerce ecosystems, including WordPress and Shopify, while bringing specialised expertise in email development, SEO, and digital design.

I am passionate about crafting intuitive, visually engaging experiences and writing clean, reliable code that solves real problems. I thrive in remote and collaborative environments, consistently delivering high-quality work under tight deadlines and with minimal supervision.`,
  highlights: [
    '4+ years remote working',
    'Thrive working under pressure',
    'Great communicator',
    'Eagle eye for details',
  ],
  stats: [
    { value: '10+', label: 'Years Dev Experience' },
    { value: 'BA', label: 'Digital Design, Hull University' },
    { value: 'B2B & B2C', label: 'Agency Experience' },
    { value: 'Available', label: 'Open to opportunities' },
  ],
  skills: [
    { name: 'React TS / Components / Styled Components', level: 87 },
    { name: 'Email Marketing & HTML Email Development', level: 91 },
    { name: 'Storybook (Widgets & Components)', level: 89 },
    { name: 'Azure DevOps (Deployments, Clone etc.)', level: 89 },
    { name: 'HTML & CSS (SASS, Grid, Flexbox, Bootstrap)', level: 92 },
    { name: 'Email Development (HTML, CSS, MJML, CRMs)', level: 92 },
    { name: 'Page Builders (Instapage / Unbounce)', level: 95 },
    { name: 'CRM (Salesforce / Marketo / Adestra / Pardot)', level: 88 },
    { name: 'CMS (Kentico, Umbraco, WordPress, Shopify)', level: 85 },
    { name: 'Search Engine Optimization (SEO)', level: 86 },
    { name: 'Adobe Suite & Figma', level: 82 },
    { name: 'JavaScript (Vanilla JS, jQuery)', level: 80 },
    { name: 'GraphQL', level: 75 },
    { name: 'C# (.NET Core / ASP.NET)', level: 62 },
  ],
  process: [
    {
      step: '01',
      title: 'Communication',
      description:
        'Constant communication with work colleagues avoids sudden mistakes.',
    },
    {
      step: '02',
      title: 'Set Daily Goals',
      description:
        'One of the most important work-from-home rules for maximum productivity.',
    },
    {
      step: '03',
      title: 'Identify Productive Hours',
      description:
        'Working from home lets you make the most of your peak productivity hours.',
    },
  ],
  qualifications: [
    {
      org: 'University of Hull',
      title: 'BA Digital Design',
      period: 'September 2017 – May 2022',
    },
    {
      org: 'Udemy',
      title: 'Certified Web Developer',
      period: 'March 2014 – August 2014',
    },
    {
      org: 'Hull College',
      title: 'Pathway (Progression to Business)',
      period: 'September 2012 – May 2013',
    },
  ],
  experience: [
    {
      org: 'Really B2B',
      role: 'Front End Developer',
      period: 'September 2021 – Current',
    },
    {
      org: 'Teal & Mackrill',
      role: 'SEO Technician',
      period: 'May 2015 – July 2016',
    },
    {
      org: 'Avert',
      role: 'Front End Developer / Web Assistant',
      period: 'March 2014 – August 2015',
    },
  ],
  social: {
    github: 'https://github.com/aurysilva',
  },
} as const

export type Profile = typeof profile
