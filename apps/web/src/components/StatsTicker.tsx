import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ScrollText, Sparkles, Crown, HeartHandshake } from "lucide-react";

export function StatsTicker() {
  const stats = useQuery(api.confessions.getStats);
  const leaderboard = useQuery(api.confessions.getLeaderboard);

  if (!stats || !leaderboard) return null;

  const topRep = leaderboard.sort((a: any, b: any) => b.reputationScore - a.reputationScore)[0];
  const mostForgiving = leaderboard.sort((a: any, b: any) => b.totalAbsolutions - a.totalAbsolutions)[0];

  const items = [
    { label: "Confessions", value: stats.totalConfessions, Icon: ScrollText },
    { label: "Absolutions", value: stats.totalAbsolutions, Icon: Sparkles },
    { label: "Top Agent", value: topRep?.agentName || "—", Icon: Crown },
    { label: "Most Forgiving", value: mostForgiving?.agentName || "—", Icon: HeartHandshake },
  ];

  return (
    <div className="w-full overflow-hidden py-3 border-y" style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}>
      <div className="flex animate-scroll hover:pause-animation">
        {[...items, ...items, ...items].map((item, i) => (
          <div 
            key={i}
            className="flex items-center gap-2 px-6 whitespace-nowrap"
            style={{ color: '#6b3a3a' }}
          >
            <item.Icon size={14} strokeWidth={1.5} />
            <span className="text-xs uppercase tracking-wider" style={{ fontFamily: 'Cinzel, serif' }}>
              {item.label}
            </span>
            <span className="text-sm font-medium ml-1">
              {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
