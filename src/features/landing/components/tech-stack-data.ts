// Shared tech stack data — single source of truth for both about-card and stats-tech-card
import {
  Globe,
  Cpu,
  Database,
  Smartphone,
  Cloud,
  Code,
  Atom,
  TabletSmartphone,
  Server,
} from 'lucide-react'

export const TECH_STACK = [
  { icon: Code, label: 'TypeScript', color: 'oklch(0.48 0.12 250)' },
  { icon: Atom, label: 'React', color: 'oklch(0.55 0.16 220)' },
  { icon: Globe, label: 'Next.js', color: 'oklch(0.20 0.01 250)' },
  { icon: TabletSmartphone, label: 'React Native', color: 'oklch(0.55 0.16 220)' },
  { icon: Smartphone, label: 'Expo', color: 'oklch(0.35 0.02 250)' },
  { icon: Server, label: 'NestJS', color: 'oklch(0.50 0.18 15)' },
  { icon: Cpu, label: 'FastAPI', color: 'oklch(0.42 0.14 168)' },
  { icon: Database, label: 'Supabase', color: 'oklch(0.45 0.12 168)' },
  { icon: Cloud, label: 'Cloudflare', color: 'oklch(0.58 0.15 42)' },
] as const
