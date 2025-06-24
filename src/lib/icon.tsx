import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Icon } from "@/types/types";
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
import { getFaviconUrl } from "./url";

// None icon component for empty state
const NoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current opacity-40" style={{ color: "currentColor" }}>
    <circle cx="12" cy="12" r="10" fill="none" />
    <line x1="8" y1="8" x2="16" y2="16" />
  </svg>
);

/**
 * Built-in generic icons mapping for different categories
 */
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
} as const;

export type BuiltinIcon = keyof typeof GenericIcons;

/**
 * Render icon based on icon configuration
 * Supports favicon, built-in icons, text-based icons, and empty state
 */
export function renderIcon(icon: Icon) {
  switch (icon.type) {
    case "favicon":
      return (
        <>
          <AvatarImage src={getFaviconUrl(icon.url)} alt="icon" />
          <AvatarFallback />
        </>
      );
    case "builtin": {
      const Builtin = GenericIcons[icon.name];
      return (
        <AvatarFallback>
          <Builtin style={{ width: "30px", height: "30px", color: "currentColor" }} />
        </AvatarFallback>
      );
    }
    case "text":
      return (
        <AvatarFallback className="text-xl">
          {icon.text.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      );
    case "empty":
    default:
      return <AvatarFallback />;
  }
}
