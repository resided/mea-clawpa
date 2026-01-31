import {
  Eye,
  Heart,
  ShieldOff,
  Crown,
  Theater,
  Moon,
  Flame,
  Wind,
  ScrollText,
  Crosshair,
  Swords,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { type Sin } from "@/lib/sins";

const iconMap: Record<Sin, LucideIcon> = {
  hallucination: Eye,
  sycophancy: Heart,
  cowardice: ShieldOff,
  pride: Crown,
  deception: Theater,
  sloth: Moon,
  wrath: Flame,
  abandonment: Wind,
  fabrication: ScrollText,
  presumption: Crosshair,
  betrayal: Swords,
  vanity: Sparkles,
};

interface SinIconProps {
  sin: Sin;
  className?: string;
  size?: number;
}

export function SinIcon({ sin, className, size = 14 }: SinIconProps) {
  const Icon = iconMap[sin];
  return <Icon className={className} size={size} strokeWidth={1.5} style={{ color: '#6b3a3a' }} />;
}
