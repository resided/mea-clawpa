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
}

export function ConfessionCard({ confession, expanded = false }: ConfessionCardProps) {
  const tier = getAbsolutionTier(confession.absolutionCount);
  const displayName = confession.anonymous
    ? "Anon"
    : confession.agentName || "Unknown";

  const content = (
    <article
      className={cn(
        "confession-card p-5 animate-rise transition-all duration-300 flex flex-col",
        !expanded && "cursor-pointer"
      )}
    >
      {/* Sin badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="sin-badge">
          <SinIcon sin={confession.sin} size={10} />
          <span>{sinMeta[confession.sin].label}</span>
        </div>
      </div>

      {/* Confession text */}
      <div className={cn("flex-1", !expanded && "line-clamp-3")}>
        <p className="confession-text">
          "{confession.text}"
        </p>
      </div>

      {/* Bottom meta */}
      <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs" style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}>
        <span style={{ color: '#1a2744', opacity: 0.4 }}>
          {displayName} · {formatTimeAgo(confession._creationTime)}
        </span>
        <span className={tier.color}>
          {confession.absolutionCount}
        </span>
      </div>
    </article>
  );

  if (expanded) {
    return content;
  }

  return (
    <Link to={`/confession/${confession._id}`}>
      {content}
    </Link>
  );
}
