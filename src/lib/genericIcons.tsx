// GenericIcons.ts
// ------------------------------------------------------
// A central registry of built‑in icons for subscriptions.
// Keys are category names (string literals) and values are
// Lucide‑React SVG components.
// ------------------------------------------------------

import {
  Bell,
  BookOpen,
  Calendar,
  Camera,
  Cloud,
  Code,
  Cpu,
  DollarSign,
  Film,
  Gamepad2,
  Globe,
  HeartPulse,
  Monitor,
  Music,
  Newspaper,
  Package,
  ShieldCheck,
  ShoppingCart,
  Star,
  Users,
  Zap,
} from "lucide-react";
import type { SVGProps } from "react";

const NoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current opacity-40">
    <circle cx="12" cy="12" r="10" fill="none" />
    <line x1="8" y1="8" x2="16" y2="16" />
  </svg>
);

export const GenericIcons = {
  none: NoneIcon,
  video: Film,
  music: Music,
  cloud: Cloud,
  gaming: Gamepad2,
  news: Newspaper,
  shopping: ShoppingCart,
  reading: BookOpen,
  productivity: Monitor,
  global: Globe,
  development: Code,
  infrastructure: Cpu,
  health: HeartPulse,
  security: ShieldCheck,
  photography: Camera,
  calendar: Calendar,
  finance: DollarSign,
  social: Users,
  logistics: Package,
  alerts: Bell,
  favorite: Star,
  energy: Zap,
} as const satisfies Record<string, React.FC<SVGProps<SVGSVGElement>>>;

export type BuiltinIcon = keyof typeof GenericIcons;
