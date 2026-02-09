import type { ServiceDetail } from "@/types";

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "branding",
    title: "Branding",
    tagline: "Forging identities that leave a mark.",
    description:
      "Reputation best captures the essence of a brand. We help you create an emotional attachment with your consumers while also focusing on the totality of the customer experience. From logo design to full brand systems, we build identities that stand the test of time.",
    features: [
      { name: "Brand Strategy", description: "Market research, positioning, and strategic planning to define your brand's unique space in the market." },
      { name: "Visual Identity", description: "Logo design, color palettes, typography, and visual systems that communicate your brand essence." },
      { name: "Brand Guidelines", description: "Comprehensive brand books ensuring consistency across every touchpoint and medium." },
      { name: "Rebranding", description: "Strategic brand evolution for businesses ready to level up their identity and market position." },
      { name: "Brand Messaging", description: "Tone of voice, taglines, and messaging frameworks that resonate with your audience." },
      { name: "Brand Audit", description: "In-depth analysis of current brand performance with actionable improvement roadmaps." },
    ],
    process: [
      { step: 1, title: "DISCOVERY", description: "Deep-dive research into your market, competitors, and target audience." },
      { step: 2, title: "STRATEGY", description: "Define brand positioning, personality, and core messaging architecture." },
      { step: 3, title: "DESIGN", description: "Create visual identity concepts, refine, and develop the full brand system." },
      { step: 4, title: "DELIVERY", description: "Produce brand guidelines, asset packages, and rollout support." },
    ],
    faq: [
      { question: "How long does a full branding project take?", answer: "Typically 6-10 weeks from kickoff to final delivery, depending on scope." },
      { question: "Do you work with startups?", answer: "Absolutely. We've launched brands from zero and love the energy of new ventures." },
      { question: "What's included in brand guidelines?", answer: "Logo usage, color specs, typography, imagery style, tone of voice, and application examples." },
    ],
    gradient: "from-[#2CACE2] to-[#0077B6]",
    iconSvg: "/bluedge/Branding.svg",
    asciiArt: `
 ____  ____   _    _  _ ____  _  _  _  ____
(  _ \\(  _ \\ / )  ( \\( (  _ \\( \\( )( )(  _ \\
 ) _ < )   //__\\  )  ( )(_) ))  (  )(  )  /
(____/(_)\\_(__)(__)(_)\\_)(____/(_)\\_)(__)(_)_)`,
  },
  {
    slug: "web-design",
    title: "Web Design & Development",
    tagline: "Pixels with purpose. Code with craft.",
    description:
      "Building custom websites from the ground up or uplifting existing sites. We focus on your unique brand story while meeting expectations and driving engagement. Every line of code serves a purpose.",
    features: [
      { name: "Custom Websites", description: "Bespoke web experiences built from scratch, tailored to your exact requirements and brand." },
      { name: "E-commerce", description: "High-converting online stores with seamless checkout flows and inventory management." },
      { name: "CMS Solutions", description: "Content management systems that make updates easy — WordPress, headless CMS, or custom." },
      { name: "Website Redesign", description: "Modernize your existing site with improved UX, performance, and visual impact." },
      { name: "Landing Pages", description: "Conversion-focused pages for campaigns, product launches, and lead generation." },
      { name: "Web Applications", description: "Complex interactive platforms, dashboards, and SaaS interfaces with cutting-edge tech." },
    ],
    process: [
      { step: 1, title: "WIREFRAME", description: "Map user journeys, create sitemaps, and prototype key interactions." },
      { step: 2, title: "DESIGN", description: "High-fidelity mockups with responsive layouts and micro-interaction specs." },
      { step: 3, title: "DEVELOP", description: "Clean, performant code built with modern frameworks and best practices." },
      { step: 4, title: "LAUNCH", description: "Testing, optimization, deployment, and post-launch monitoring." },
    ],
    faq: [
      { question: "What tech stack do you use?", answer: "React/Next.js, TypeScript, Tailwind — plus WordPress or Shopify when appropriate." },
      { question: "Do you handle hosting?", answer: "We can set up and manage hosting on Vercel, AWS, or your preferred platform." },
      { question: "Will the site be SEO-friendly?", answer: "Yes. Every build includes semantic HTML, meta tags, structured data, and Core Web Vitals optimization." },
    ],
    gradient: "from-[#2CACE2] to-[#023E8A]",
    iconSvg: "/bluedge/Web-icon.svg",
    asciiArt: `
 _    _ _____ ____
( \\  / (  ___| _  \\
 \\ \\/ / | |__ | _  /
  \\  /  |  __|| |  \\
  /  \\  | |___| |_) )
 (__/\\__\\_____|____/`,
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    tagline: "Experiences that fit in your pocket.",
    description:
      "Development using the latest technologies with our technical, customer-oriented and creative team. From concept to launch, we create mobile experiences that drive engagement and keep users coming back.",
    features: [
      { name: "iOS Development", description: "Native Swift apps optimized for iPhone and iPad with Apple design guidelines." },
      { name: "Android Development", description: "Native Kotlin apps that perform beautifully across the Android ecosystem." },
      { name: "Cross-Platform", description: "React Native and Flutter apps that share code across platforms without sacrificing quality." },
      { name: "App Strategy", description: "Market analysis, feature prioritization, and go-to-market planning for app success." },
      { name: "UI/UX Design", description: "Mobile-first interface design with gesture-based interactions and fluid animations." },
      { name: "App Maintenance", description: "Ongoing updates, bug fixes, and performance monitoring to keep your app thriving." },
    ],
    process: [
      { step: 1, title: "CONCEPT", description: "Define app purpose, user personas, and core feature set." },
      { step: 2, title: "PROTOTYPE", description: "Interactive prototypes for user testing and stakeholder alignment." },
      { step: 3, title: "BUILD", description: "Agile development sprints with regular demos and feedback cycles." },
      { step: 4, title: "DEPLOY", description: "App store submission, launch marketing, and performance analytics setup." },
    ],
    faq: [
      { question: "iOS, Android, or both?", answer: "We recommend cross-platform for most projects, but go native when performance demands it." },
      { question: "How do you handle app updates?", answer: "We offer maintenance packages with regular updates, monitoring, and feature enhancements." },
      { question: "Can you integrate with existing systems?", answer: "Yes — we build APIs and connect to any existing backend, CRM, or third-party service." },
    ],
    gradient: "from-[#0077B6] to-[#2CACE2]",
    iconSvg: "/bluedge/Mobile.svg",
    asciiArt: `
 __  __  ___  ____  _  _    ___
(  \\/  )/  \\(  _ \\( )( )  (  _)
 )    (( () )) _ < )(  )(__ ) _)
(_/\\/\\_)\\__/(____/(__)(____|___)`,
  },
  {
    slug: "project-development",
    title: "Project Development",
    tagline: "From vision to reality, orchestrated.",
    description:
      "End-to-end project management and development services. From ideation to execution, we bring your vision to life with strategic planning and expert implementation across digital and traditional channels.",
    features: [
      { name: "Project Strategy", description: "Comprehensive planning, resource allocation, and timeline management for complex projects." },
      { name: "Execution Planning", description: "Detailed roadmaps with milestones, dependencies, and risk mitigation strategies." },
      { name: "Resource Management", description: "Assembling the right team of specialists for each project phase and deliverable." },
      { name: "Delivery & QA", description: "Rigorous quality assurance, user acceptance testing, and polished final delivery." },
      { name: "Digital Transformation", description: "Modernize business processes with custom digital solutions and automation." },
      { name: "Consulting", description: "Strategic advice on technology choices, market approach, and growth planning." },
    ],
    process: [
      { step: 1, title: "SCOPE", description: "Define objectives, constraints, and success metrics for the project." },
      { step: 2, title: "PLAN", description: "Create detailed project plan with sprints, deliverables, and checkpoints." },
      { step: 3, title: "EXECUTE", description: "Agile delivery with daily standups, weekly demos, and continuous integration." },
      { step: 4, title: "SHIP", description: "Final delivery, documentation, training, and knowledge transfer." },
    ],
    faq: [
      { question: "What size projects do you handle?", answer: "From 2-week sprints to 12-month enterprise initiatives — we scale our process to fit." },
      { question: "Do you use Agile methodology?", answer: "Yes, with a pragmatic approach — Scrum for product development, Kanban for ongoing work." },
      { question: "Can you work with our existing team?", answer: "Absolutely. We integrate seamlessly as an extension of your team." },
    ],
    gradient: "from-[#2CACE2] to-[#5D5D5D]",
    iconSvg: "/bluedge/Project-Development.svg",
    asciiArt: `
 ____  ____  ___    _ _____ ____ _____
(  _ \\(  _ \\/  \\  / (  ___(  _(/_   _)
 ) __/ )   ( () )/ / | |__  ) _)  | |
(__)  (_)\\_)\\__/(__/  \\____|(____)  \\_/`,
  },
  {
    slug: "traditional-media",
    title: "Traditional Media",
    tagline: "Classic channels, modern impact.",
    description:
      "Impactful traditional advertising that complements your digital presence. Print, broadcast, direct mail, outdoor advertising, newspapers, and radio campaigns that reach audiences where they live.",
    features: [
      { name: "TV Commercials", description: "Broadcast-quality video production from concept and scripting to post-production and airing." },
      { name: "Radio Spots", description: "Engaging audio advertisements with professional voiceover and sound design." },
      { name: "Print Advertising", description: "Magazine ads, newspaper placements, and direct mail campaigns with stunning visuals." },
      { name: "Outdoor/Billboard", description: "High-impact out-of-home advertising — billboards, transit, and environmental graphics." },
      { name: "Event Production", description: "Corporate events, product launches, and experiential marketing from concept to execution." },
      { name: "Media Planning", description: "Strategic media buying and placement to maximize reach and ROI across traditional channels." },
    ],
    process: [
      { step: 1, title: "BRIEF", description: "Understand campaign objectives, target demographics, and budget parameters." },
      { step: 2, title: "CREATE", description: "Develop creative concepts, scripts, storyboards, and design layouts." },
      { step: 3, title: "PRODUCE", description: "Professional production — filming, recording, printing, and fabrication." },
      { step: 4, title: "PLACE", description: "Strategic media buying, scheduling, and campaign performance tracking." },
    ],
    faq: [
      { question: "Is traditional media still effective?", answer: "Absolutely — especially when integrated with digital. It builds trust and broad awareness." },
      { question: "Do you handle media buying?", answer: "Yes, we negotiate and place media across TV, radio, print, and outdoor channels." },
      { question: "Can you produce a TV commercial?", answer: "End-to-end — concept, scripting, filming, editing, and broadcast delivery." },
    ],
    gradient: "from-[#023E8A] to-[#2CACE2]",
    iconSvg: "/bluedge/Traditional-Media.svg",
    asciiArt: `
 _____  ____   _    ____
(_   _)(  _ \\ / )  (  _ \\
  | |   )   //__\\   )(_) )
  | |  (_)\\_(__)(__)(___ /
  (_)            MEDIA`,
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return serviceDetails.find((s) => s.slug === slug);
}

export const serviceSlugs = serviceDetails.map((s) => s.slug);
