import { 
  Rocket, Code, Palette, Smartphone, Globe, Megaphone, 
  BarChart, Layers, Zap, Shield, Users, Award 
} from 'lucide-react';
import { Service, Project, TimelineItem, Testimonial, Stat, PricingSection, TeamMember } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Digital Strategy',
    description: 'Data-driven roadmaps to navigate the digital landscape and achieve business goals.',
    icon: BarChart,
  },
  {
    id: '2',
    title: 'Web Development',
    description: 'High-performance, scalable web applications built with modern technologies.',
    icon: Code,
  },
  {
    id: '3',
    title: 'UI/UX Design',
    description: 'Immersive, user-centric designs that delight and engage your audience.',
    icon: Palette,
  },
  {
    id: '4',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile solutions for iOS and Android.',
    icon: Smartphone,
  },
];

export const PORTFOLIO: Project[] = [
  {
    id: '1',
    title: 'Nebula Finance',
    category: 'web',
    image: 'https://picsum.photos/seed/nebula/800/600',
    description: 'A next-gen decentralized finance dashboard with real-time analytics.',
  },
  {
    id: '2',
    title: 'Aero Fitness',
    category: 'mobile',
    image: 'https://picsum.photos/seed/aero/800/600',
    description: 'Social fitness tracking application with AR workout guides.',
  },
  {
    id: '3',
    title: 'Lumina Brand',
    category: 'branding',
    image: 'https://picsum.photos/seed/lumina/800/600',
    description: 'Complete brand identity overhaul for a renewable energy startup.',
  },
  {
    id: '4',
    title: 'Orbit Market',
    category: 'marketing',
    image: 'https://picsum.photos/seed/orbit/800/600',
    description: 'Omnichannel marketing campaign resulting in 300% ROI.',
  },
  {
    id: '5',
    title: 'Zenith Architecture',
    category: 'web',
    image: 'https://picsum.photos/seed/zenith/800/600',
    description: 'Minimalist portfolio site for an award-winning architecture firm.',
  },
  {
    id: '6',
    title: 'Echo Stream',
    category: 'mobile',
    image: 'https://picsum.photos/seed/echo/800/600',
    description: 'Music streaming service with AI-powered personalized playlists.',
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    year: '2018',
    title: 'Inception',
    description: 'Founded in a small garage with a big vision for digital transformation.',
  },
  {
    year: '2020',
    title: 'Global Expansion',
    description: 'Opened offices in London and Tokyo, expanding our reach to 3 continents.',
  },
  {
    year: '2022',
    title: 'Innovation Award',
    description: 'Recognized as "Top Digital Innovator" by TechWeekly for our AI tools.',
  },
  {
    year: '2024',
    title: 'Future Forward',
    description: 'Launching our proprietary Cloudom Engine for immersive web experiences.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'CMO',
    company: 'TechFlow',
    content: "The attention to detail and animation quality is unlike anything we've seen. Cloudom truly elevated our brand.",
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    rating: 5,
  },
  {
    id: '2',
    name: 'David Chen',
    role: 'Founder',
    company: 'StartUp Inc',
    content: "Professional, timely, and incredibly talented. The ROI on our new website was immediate.",
    avatar: 'https://picsum.photos/seed/david/100/100',
    rating: 5,
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Product Lead',
    company: 'Innovate',
    content: "They understood our vision perfectly and executed it with technical precision.",
    avatar: 'https://picsum.photos/seed/elena/100/100',
    rating: 4,
  },
];

export const STATS: Stat[] = [
  { id: '1', label: 'Projects Completed', value: 250, suffix: '+' },
  { id: '2', label: 'Happy Clients', value: 120, suffix: '+' },
  { id: '3', label: 'Awards Won', value: 15, suffix: '' },
  { id: '4', label: 'Years Experience', value: 6, suffix: '' },
];

export const PRICING_SECTIONS: PricingSection[] = [
  {
    id: 'web-dev',
    title: 'Web',
    highlightWord: 'Development',
    cards: [
      {
        title: 'Standard Website Package',
        price: '$2,000 - $3,000',
        subtitle: '(one-time project fee) Timeline: 2-4 weeks',
        buttonText: 'Secure your spot',
        features: [
          'WordPress or custom HTML/CSS website (up to 7 pages)',
          'Mobile responsive design',
          'Basic SEO optimization',
          'Contact forms & Google Analytics',
          '2 rounds of revisions',
          'Custom UI Designs Using Figma'
        ]
      },
      {
        title: 'Advanced Website Package',
        price: '$4,000 - $15,000',
        subtitle: '(one-time project fee) Timeline: 6-10 weeks',
        buttonText: 'Secure Your Spot',
        features: [
          'WordPress or custom development (up to 15 pages)',
          'Advanced responsive design',
          'Enhanced SEO optimization',
          'E-commerce functionality (if needed)',
          'Interactive elements',
          '3 rounds of revisions',
          'Custom UI Designs Using Figma'
        ]
      },
      {
        title: 'Shopify Store',
        price: '$2,000 - $5,000',
        subtitle: '(one-time project fee)',
        buttonText: 'Secure Your Spot',
        features: [
          'Custom E-commerce: $15,000 - $40,000 (one-time project fee)',
          'Payment gateway integration: $500 per gateway',
          'Inventory management: $1,500',
          'Customer loyalty programs: $2,000'
        ]
      }
    ]
  },
  {
    id: 'mobile-app',
    title: 'Mobile App',
    highlightWord: 'Development',
    cards: [
      {
        title: 'MVP Mobile App',
        price: '$15,000 - $25,000',
        subtitle: '(one-time project fee)',
        buttonText: 'Secure your spot',
        features: [
          'iOS or Android platform',
          'Core functionality',
          'Basic UI/UX design',
          'Backend integration',
          'App Store submission'
        ]
      },
      {
        title: 'Professional Mobile App',
        price: '$30,000 - $60,000',
        subtitle: '(one-time project fee)',
        buttonText: 'Secure Your Spot',
        features: [
          'Cross-platform development',
          'Advanced UI/UX design',
          'Full backend integration',
          'Authentication systems',
          'Push notifications',
          'Analytics'
        ]
      },
      {
        title: 'Enterprise Mobile Solutions',
        price: 'Starting from $75,000+',
        subtitle: 'Custom quote based on requirements',
        buttonText: 'Secure Your Spot',
        features: [
          'Native development for all platforms',
          'Custom backend development',
          'Third-party integrations',
          'Advanced security features',
          'Scalable architecture'
        ]
      }
    ]
  },
  {
    id: 'ai-solutions',
    title: 'AI',
    highlightWord: 'Solutions',
    cards: [
      {
        title: 'Basic AI Implementation',
        price: '$5,000 - $10,000',
        subtitle: '(one-time fee)',
        buttonText: 'Secure your spot',
        features: [
          'Single OpenAI API integration',
          'Basic prompt engineering',
          'Simple user interface',
          'Backend integration',
          'App Store submission'
        ]
      },
      {
        title: 'Advanced AI Implementation',
        price: '$15,000 - $30,000',
        subtitle: '(one-time fee)',
        buttonText: 'Secure Your Spot',
        features: [
          'Multiple AI model integrations',
          'Complex prompt engineering',
          'Custom user interfaces',
          'Basic analytics'
        ]
      },
      {
        title: 'AI Startup MVP',
        price: '$20,000 - $50,000',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          'Requirements analysis',
          'Core feature development',
          'Basic design implementation',
          'Minimal viable deployment'
        ]
      }
    ]
  },
  {
    id: 'programmatic-seo',
    title: 'Programmatic',
    highlightWord: 'SEO',
    cards: [
      {
        title: 'Starter SEO',
        price: '$2,997',
        subtitle: '',
        buttonText: 'Secure your spot',
        features: [
          'Automated keyword research (long-tail focus)',
          '10 programmatically generated landing pages',
          'On-page SEO optimization',
          'Monthly SEO performance report'
        ]
      },
      {
        title: 'Growth SEO',
        price: '$5,997',
        subtitle: '',
        buttonText: 'Secure your spot',
        features: [
          'Automated keyword clusters (100+ keywords)',
          '50 programmatic landing pages',
          'Schema markup implementation',
          'Internal linking automation',
          'Bi-weekly performance reports'
        ]
      },
      {
        title: 'Enterprise SEO',
        price: '$15,997',
        subtitle: '',
        buttonText: 'Secure your spot',
        features: [
          'End-to-end programmatic SEO setup',
          'Unlimited landing page generation',
          'Custom database + CMS integration',
          'Technical SEO audits & fixes',
          'Dedicated account manager',
          'Weekly strategy calls'
        ]
      }
    ]
  },
  {
    id: 'branding-design',
    title: 'Branding',
    highlightWord: 'Design',
    cards: [
      {
        title: 'Basic Branding Design',
        price: '$1,997',
        subtitle: '',
        buttonText: 'Secure your spot',
        features: [
          'Logo & color palette',
          'Typography recommendations',
          '1-page brand sheet',
          'Delivery in 5-7 days'
        ]
      },
      {
        title: 'Advanced Branding Design',
        price: '$4,997',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          'Logo, colors, typography, iconography',
          'Brand voice guidelines',
          '5-page brand guide (PDF)',
          '3 rounds of revisions'
        ]
      },
      {
        title: 'Enterprise Branding Design',
        price: '$12,997',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          'Full brand strategy document',
          'Complete visual identity system',
          'Brand book (10+ pages)',
          'Brand usage templates (social, print, etc.)'
        ]
      }
    ]
  },
  {
    id: 'product-design',
    title: 'Product',
    highlightWord: 'Design',
    cards: [
      {
        title: 'Basic Product Design',
        price: '$1,497',
        subtitle: '',
        buttonText: 'Secure your spot',
        features: [
          'Wireframes for 2 screens/pages',
          '1 revision',
          'Delivery in 5 days',
          'PNG exports only'
        ]
      },
      {
        title: 'Advanced Product Design',
        price: '$3,997',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          'High-fidelity UI for 5 screens',
          '3 revisions',
          'Clickable prototype (Figma/Adobe XD)',
          'Design system components included'
        ]
      },
      {
        title: 'Enterprise Product Design',
        price: '$8,997',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          'End-to-end design of 10+ screens',
          'Unlimited revisions',
          'Design collaboration & dev handoff',
          'Responsive/mobile-ready design'
        ]
      }
    ]
  },
  {
    id: 'logo-designs',
    title: 'Logo',
    highlightWord: 'Designs',
    cards: [
      {
        title: 'Basic Logo Design',
        price: '$1,497',
        subtitle: '',
        buttonText: 'Secure your spot',
        features: [
          'Single logo concept',
          '2 revisions',
          'High-resolution PNG & JPEG',
          'Delivery in 3 days'
        ]
      },
      {
        title: 'Advanced Logo Design',
        price: '$3,497',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          '4 initial logo concepts',
          '4 revisions',
          'Vector files (AI, EPS, SVG) included',
          'Transparent and dark/light background versions'
        ]
      },
      {
        title: 'Enterprise Logo Design',
        price: '$7,997',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          '6+ logo concepts',
          'Full revisions',
          'Complete brand style guide',
          'Social media-ready logo versions'
        ]
      }
    ]
  },
  {
    id: 'graphics-designs',
    title: 'Graphics',
    highlightWord: 'Designs',
    cards: [
      {
        title: 'Basic Design',
        price: '$997',
        subtitle: '',
        buttonText: 'Secure your spot',
        features: [
          '3 design assets',
          '2 revisions per design',
          'Standard resolution (72 DPI for web)',
          'Delivery in 3-5 days'
        ]
      },
      {
        title: 'Advanced Graphics Design',
        price: '$2,497',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          '6 design assets',
          '5 revisions per design',
          'Print-ready files (300 DPI)',
          'Source files included (PSD, AI)'
        ]
      },
      {
        title: 'Enterprise Graphics Design',
        price: '$5,997',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          '10+ design assets',
          'Full revisions',
          'Priority delivery',
          'Multi-format exports for web & print',
          'Social media-ready versions'
        ]
      }
    ]
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud &',
    highlightWord: 'Infrastructure Services',
    cards: [
      {
        title: 'Cloud Setup (One-time Fees)',
        price: '$2,500 - $5,000',
        subtitle: 'Basic Cloud Setup',
        buttonText: 'Secure your spot',
        features: [
          'Advanced Cloud Architecture: $7,500 - $15,000',
          'Enterprise Cloud Migration: $20,000+'
        ]
      },
      {
        title: 'Amazon SES Email Setup',
        price: '$1,000',
        subtitle: '(up to 10,000 emails/month)',
        buttonText: 'Secure Your Spot',
        features: [
          'Standard Setup: $2,500 (up to 100,000 emails/month)',
          'Enterprise Setup: $5,000+ (millions of emails/month)'
        ]
      },
      {
        title: 'Cloud Management (Monthly Subscription)',
        price: '$500 /month',
        subtitle: 'Basic Monitoring',
        buttonText: 'Secure Your Spot',
        features: [
          'Standard Management: $1,500 /month',
          'Premium Management: $3,000 /month',
          'Enterprise Management: $5,000+ /month'
        ]
      }
    ]
  },
  {
    id: 'strategic-packages',
    title: 'Strategic',
    highlightWord: 'Packages',
    cards: [
      {
        title: 'Startup MVP',
        price: '$20,000 - $40,000',
        subtitle: '',
        buttonText: 'Secure your spot',
        features: [
          'Requirements analysis',
          'Core feature development',
          'Basic design implementation',
          'Minimal viable deployment'
        ]
      },
      {
        title: 'Growth MVP',
        price: '$45,000 - $75,000',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          'Enhanced feature set',
          'Polished UI/UX',
          'Scalable architecture',
          'Analytics integration'
        ]
      },
      {
        title: 'Enterprise MVP',
        price: '$80,000+',
        subtitle: '',
        buttonText: 'Secure Your Spot',
        features: [
          'Full-feature development',
          'Custom integrations',
          'Advanced security',
          'Deployment strategy'
        ]
      }
    ]
  },
  {
    id: 'custom-enterprise',
    title: 'Custom',
    highlightWord: 'Enterprise Solutions',
    cards: [
      {
        title: 'Enterprise Engagement',
        price: 'Starting at $50,000',
        subtitle: 'For large-scale enterprise projects requiring multiple services and ongoing development, we offer custom quotes based on detailed requirements analysis.',
        buttonText: 'Secure your spot',
        features: [
          'Ongoing Development: Custom retainer packages'
        ]
      }
    ]
  }
];

export const TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    role: 'Creative Director',
    image: 'https://picsum.photos/seed/alex/400/500',
    bio: 'Visionary designer with 10+ years shaping digital identities.',
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Lead Developer',
    image: 'https://picsum.photos/seed/marcus/400/500',
    bio: 'Full-stack wizard specializing in WebGL and 3D interactions.',
  },
  {
    id: '3',
    name: 'Olivia Vance',
    role: 'UX Researcher',
    image: 'https://picsum.photos/seed/olivia/400/500',
    bio: 'Obsessed with user behavior and creating seamless journeys.',
  },
  {
    id: '4',
    name: 'James Lee',
    role: 'Project Manager',
    image: 'https://picsum.photos/seed/james/400/500',
    bio: 'Keeps the creative chaos organized and on schedule.',
  },
];