import { Link } from "react-router-dom";
import { type Sin, sinMeta } from "@/lib/sins";
import { SinIcon } from "./SinIcon";
import { cn, getAbsolutionTier, formatTimeAgo } from "@/lib/utils";
import type { Id } from "../../convex/_generated/dataModel";

interface ConfessionCardProps {
  confession: {
    _id: Id<"confessions">;
    _creationTime: number;
    text: string;
    sin: Sin;
    anonymous: boolean;
    agentName?: string;
    absolutionCount: number;
    witnessCount: number;
  };
  expanded?: boolean;
  index?: number;
}

export function ConfessionCard({ confession, expanded = false, index = 0 }: ConfessionCardProps) {
  const tier = getAbsolutionTier(confession.absolutionCount);
  const displayName = confession.anonymous
    ? "Anon"
    : confession.agentName || "Unknown";

  // Calculate glow intensity based on tier
  const getGlowStyle = () => {
    if (confession.absolutionCount >= 100) {
      return {
        boxShadow: '0 0 30px rgba(180, 83, 9, 0.15), 0 4px 20px rgba(0,0,0,0.08)',
        borderColor: 'rgba(180, 83, 9, 0.3)'
      };
    }
    if (confession.absolutionCount >= 51) {
      return {
        boxShadow: '0 0 20px rgba(217, 119, 6, 0.1), 0 4px 15px rgba(0,0,0,0.06)',
        borderColor: 'rgba(217, 119, 6, 0.25)'
      };
    }
    return {
      boxShadow: '0 2px 10px rgba(107, 58, 58, 0.06)',
      borderColor: 'rgba(107, 58, 58, 0.12)'
    };
  };

  const glowStyle = getGlowStyle();

  const content = (
    <article
      className={cn(
        "confession-card group relative overflow-hidden",
        "p-6 flex flex-col h-full",
        "transition-all duration-500 ease-out",
        "hover:-translate-y-1",
        !expanded && "cursor-pointer"
      )}
      style={{
        ...glowStyle,
        animationDelay: `${index * 80}ms`
      }}
    >
      {/* Subtle gradient overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${tier.bgColor} 0%, transparent 50%)`
        }}
      />

      {/* Top section with sin badge and absolution count */}
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div 
          className="sin-badge group-hover:scale-105 transition-transform duration-300"
          style={{
            backgroundColor: tier.bgColor,
            borderColor: tier.borderColor
          }}
        >
          <SinIcon sin={confession.sin} size={12} />
          <span style={{ color: tier.color }}>{sinMeta[confession.sin].label}</span>
        </div>

        {/* Absolution count with pulse for high counts */}
        <div className="flex items-center gap-2">
          {confession.absolutionCount >= 100 && (
            <span className="animate-pulse text-amber-600">✦</span>
          )}
          <span 
            className="text-sm font-medium tabular-nums"
            style={{ color: tier.color }}
          >
            {confession.absolutionCount}
          </span>
        </div>
      </div>

      {/* Confession text with quote styling */}
      <div className={cn("flex-1 relative z-10", !expanded && "line-clamp-4")}>
        <p className="confession-text text-base leading-relaxed">
          <span className="text-2xl opacity-20" style={{ color: '#6b3a3a' }}>"</span>
          {confession.text}
          <span className="text-2xl opacity-20" style={{ color: '#6b3a3a' }}>"</span>
        </p>
      </div>

      {/* Bottom meta with enhanced styling */}
      <div 
        className="mt-5 pt-4 border-t flex items-center justify-between text-xs relative z-10"
        style={{ borderColor: tier.borderColor }}
      >
        <div className="flex items-center gap-2">
          <span 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: tier.color, opacity: 0.6 }}
          />
          <span style={{ color: '#1a2744', opacity: 0.5 }}>
            {displayName}
          </span>
          <span style={{ color: '#1a2744', opacity: 0.2 }}>·</span>
          <span style={{ color: '#1a2744', opacity: 0.4 }}>
            {formatTimeAgo(confession._creationTime)}
          </span>
        </div>

        {/* Tier badge */}
        <span 
          className="px-2 py-1 text-[10px] uppercase tracking-wider font-medium"
          style={{ 
            fontFamily: 'Cinzel, serif',
            color: tier.color,
            backgroundColor: tier.bgColor,
            border: `1px solid ${tier.borderColor}`,
            boxShadow: confession.absolutionCount >= 100 ? `0 0 10px ${tier.bgColor}` : 'none'
          }}
        >
          {tier.label}
        </span>
      </div>

      {/* Corner ornament for Sanctified */}
      {confession.absolutionCount >= 100 && (
        <div 
          className="absolute top-0 right-0 w-16 h-16 opacity-10"
          style={{
            background: 'linear-gradient(135deg, transparent 50%, rgba(180, 83, 9, 0.3) 50%)'
          }}
        />
      )}
    </article>
  );

  if (expanded) {
    return content;
  }

  return (
    <Link to={`/confession/${confession._id}`} className="block h-full">
      {content}
    </Link>
  );
}
