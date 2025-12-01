import { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Industry {
  id: string;
  name: string;
  icon: LucideIcon;
}

export interface Project {
  id: string;
  title: string;
  category: 'saas' | 'ecommerce' | 'fintech' | 'enterprise';
  image: string;
  description: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  techStack?: string[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string;
}

export interface PricingCard {
  title: string;
  price?: string;
  subtitle?: string;
  features: string[];
  buttonText: string;
}

export interface PricingSection {
  id: string;
  title: string;
  highlightWord: string;
  cards: PricingCard[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}