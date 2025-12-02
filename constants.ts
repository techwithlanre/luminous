import { 
  Rocket, Code, Palette, Smartphone, Globe, Megaphone, 
  BarChart, Layers, Zap, Shield, Users, Award, 
  Server, ShoppingCart, CreditCard, Activity, Truck, GraduationCap
} from 'lucide-react';
import { Service, Project, TimelineItem, Testimonial, Stat, PricingSection, TeamMember, Industry } from './types';

export const HERO_CONTENT = {
  headlineStart: "Build Scalable Digital Products",
  headlineEnd: "That Grow With You",
  subheadline: "From MVP to enterprise-ready platforms, we design, develop, and launch powerful solutions that scale with your vision.",
  ctaPrimary: "Let’s Build Your Product",
  ctaSecondary: "View Our Work"
};

export const ABOUT_CONTENT = {
  headlineStart: "Your Product Partner From",
  headlineEnd: "Idea to Impact",
  p1: "We’re a digital product development company dedicated to transforming innovative ideas into scalable, market-ready solutions. Whether you’re launching your MVP or scaling to meet enterprise demands, our team brings deep expertise in design, development, and growth to every stage of your product lifecycle.",
  p2: "We blend product thinking, modern technology, and agile execution to deliver exceptional user experiences and business outcomes."
};

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Product Strategy & MVP',
    description: 'Validate your idea quickly. We help you define your MVP with clarity, speed, and precision to get to market faster and smarter.',
    icon: Rocket,
  },
  {
    id: '2',
    title: 'Custom Web & Mobile',
    description: 'Build cross-platform digital products using modern frameworks and best practices. Scalable, secure, and performance-driven.',
    icon: Smartphone,
  },
  {
    id: '3',
    title: 'UI/UX Design',
    description: 'Create intuitive, delightful user experiences with design systems that evolve as your product grows.',
    icon: Palette,
  },
  {
    id: '4',
    title: 'DevOps & Scalability',
    description: 'Infrastructure that scales with your business. Automated pipelines, cloud-native architecture, and performance optimization.',
    icon: Server,
  },
  {
    id: '5',
    title: 'Enterprise Transformation',
    description: 'Upgrade legacy systems, integrate modern technologies, and future-proof your enterprise platforms.',
    icon: Layers,
  },
];

export const INDUSTRIES: Industry[] = [
  { 
    id: '1', 
    name: 'SaaS & Startups', 
    description: 'Rapid MVP development and scalable architectures for high-growth tech companies.',
    icon: Rocket 
  },
  { 
    id: '2', 
    name: 'E-commerce', 
    description: 'High-conversion storefronts and headless commerce solutions that drive sales.',
    icon: ShoppingCart 
  },
  { 
    id: '3', 
    name: 'Fintech', 
    description: 'Secure, compliant, and user-friendly financial applications and payment systems.',
    icon: CreditCard 
  },
  { 
    id: '4', 
    name: 'Healthcare', 
    description: 'HIPAA-compliant digital health platforms focusing on patient experience and data security.',
    icon: Activity 
  },
  { 
    id: '5', 
    name: 'Logistics', 
    description: 'Real-time tracking, fleet management, and supply chain optimization tools.',
    icon: Truck 
  },
  { 
    id: '6', 
    name: 'EdTech', 
    description: 'Interactive learning management systems and virtual classroom experiences.',
    icon: GraduationCap 
  },
];

export const PORTFOLIO: Project[] = [
  {
    id: '1',
    title: 'ScaleUp SaaS Platform',
    category: 'saas',
    image: 'https://picsum.photos/seed/saasproj/800/600',
    description: 'A comprehensive management platform for remote teams.',
    problem: 'The client needed a scalable way to manage distributed teams but existing tools were clunky and slow.',
    solution: 'We built a React/Node.js based platform with real-time collaboration features and automated workflows.',
    outcome: 'Launched in 12 weeks, scaling to 10,000+ daily active users within 6 months.',
    techStack: ['React', 'Node.js', 'AWS', 'WebSockets']
  },
  {
    id: '2',
    title: 'SwiftPay Fintech App',
    category: 'fintech',
    image: 'https://picsum.photos/seed/fintechproj/800/600',
    description: 'Mobile-first payment solution for gig economy workers.',
    problem: 'Gig workers faced delays in receiving payments and high transaction fees.',
    solution: 'Developed a secure mobile app with instant payout integration and low-fee transfer logic.',
    outcome: 'Processed $5M+ in transactions in the first quarter with 99.99% uptime.',
    techStack: ['React Native', 'Python', 'Stripe API', 'PostgreSQL']
  },
  {
    id: '3',
    title: 'LearnLoop EdTech',
    category: 'enterprise',
    image: 'https://picsum.photos/seed/edtechproj/800/600',
    description: 'AI-driven personalized learning path generator for universities.',
    problem: 'Universities struggled to offer personalized curriculum guidance at scale.',
    solution: 'Integrated an AI engine to analyze student performance and suggest tailored learning modules.',
    outcome: 'Adopted by 5 major universities, improving student retention rates by 15%.',
    techStack: ['Next.js', 'OpenAI API', 'Python', 'Azure']
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: 'Phase 1',
    title: 'Discovery',
    description: 'We dive deep into your business goals, user needs, and market landscape.',
  },
  {
    year: 'Phase 2',
    title: 'Design & Proto',
    description: 'Creating high-fidelity prototypes to validate UX before writing code.',
  },
  {
    year: 'Phase 3',
    title: 'Development',
    description: 'Agile sprints to build scalable, clean, and tested code.',
  },
  {
    year: 'Phase 4',
    title: 'Launch & Scale',
    description: 'Deploying to production and optimizing for user growth.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Michael Ross',
    role: 'CTO',
    company: 'SaaS Startup',
    content: "They helped us launch a product in weeks that we thought would take months — and it scaled to thousands of users without a hitch.",
    avatar: 'https://picsum.photos/seed/michael/100/100',
    rating: 5,
  },
  {
    id: '2',
    name: 'Sarah Lin',
    role: 'Product Manager',
    company: 'FinTech Solutions',
    content: "The team's understanding of complex financial compliance combined with top-tier UX design was exactly what we needed.",
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    rating: 5,
  },
];

export const STATS: Stat[] = [
  { id: '1', label: 'Products Launched', value: 85, suffix: '+' },
  { id: '2', label: 'Active Users', value: 500, suffix: 'K+' },
  { id: '3', label: 'Enterprise Clients', value: 20, suffix: '+' },
  { id: '4', label: 'Team Experts', value: 45, suffix: '' },
];

export const PRICING_SECTIONS: PricingSection[] = [
  {
    id: 'mvp-dev',
    title: 'MVP',
    highlightWord: 'Development',
    cards: [
      {
        title: 'Validation Sprint',
        price: 'Strategy Phase',
        subtitle: '2-3 Weeks',
        buttonText: 'Start Discovery',
        features: [
          'Market analysis & User research',
          'Product roadmap definition',
          'Technical feasibility study',
          'Clickable prototype'
        ]
      },
      {
        title: 'MVP Build',
        price: 'Development Phase',
        subtitle: '8-12 Weeks',
        buttonText: 'Build MVP',
        features: [
          'Core feature implementation',
          'Web or Mobile platform',
          'Cloud infrastructure setup',
          'Launch support'
        ]
      }
    ]
  },
  {
    id: 'custom-dev',
    title: 'Custom',
    highlightWord: 'Software',
    cards: [
      {
        title: 'Web Platform',
        price: 'Custom Quote',
        subtitle: 'Scalable Web Applications',
        buttonText: 'Discuss Project',
        features: [
          'React / Next.js / Vue',
          'Secure backend API',
          'Third-party integrations',
          'SEO optimized'
        ]
      },
      {
        title: 'Mobile Application',
        price: 'Custom Quote',
        subtitle: 'iOS & Android',
        buttonText: 'Discuss Project',
        features: [
          'React Native / Flutter',
          'Native performance',
          'App Store & Play Store deployment',
          'Offline capabilities'
        ]
      }
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    highlightWord: 'Solutions',
    cards: [
      {
        title: 'Digital Transformation',
        price: 'Enterprise',
        subtitle: 'Long-term partnership',
        buttonText: 'Contact Sales',
        features: [
          'Legacy system modernization',
          'Microservices architecture',
          'DevOps & CI/CD automation',
          '24/7 SLA Support'
        ]
      }
    ]
  }
];

export const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    role: 'Head of Product',
    image: 'https://picsum.photos/seed/alex/400/500',
    bio: 'Product strategist with a track record of 3 successful exits.',
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Lead Architect',
    image: 'https://picsum.photos/seed/marcus/400/500',
    bio: 'Specialist in cloud-native scalable architectures.',
  },
  {
    id: '3',
    name: 'Olivia Vance',
    role: 'Design Lead',
    image: 'https://picsum.photos/seed/olivia/400/500',
    bio: 'Creating award-winning interfaces for global brands.',
  },
  {
    id: '4',
    name: 'James Lee',
    role: 'Engineering Manager',
    image: 'https://picsum.photos/seed/james/400/500',
    bio: 'Ensuring code quality and timely delivery across all squads.',
  },
];