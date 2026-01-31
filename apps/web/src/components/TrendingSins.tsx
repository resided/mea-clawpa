import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { sinMeta, type Sin } from "@/lib/sins";
import { SinIcon } from "./SinIcon";

export function TrendingSins() {
  const stats = useQuery(api.confessions.getStats);

  if (!stats?.sinCounts) return null;

  const sortedSins = Object.entries(stats.sinCounts as Record<string, number>)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const maxCount = Math.max(...sortedSins.map(([, count]) => count));

  return (
    <div className="border overflow-hidden" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
      <div className="p-3 border-b" style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}>
        <span 
          className="text-xs uppercase tracking-wider"
          style={{ fontFamily: 'Cinzel, serif', color: '#6b3a3a' }}
        >
          Trending Sins
        </span>
      </div>
      
      <div className="p-3 space-y-2">
        {sortedSins.map(([sin, count]: [string, number], i: number) => {
          const percentage = (count / maxCount) * 100;
          return (
            <div key={sin} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <SinIcon sin={sin as Sin} size={10} />
                  <span className="text-[10px] uppercase tracking-wider" style={{ color: '#6b3a3a' }}>
                    {sinMeta[sin as Sin].label}
                  </span>
                </div>
                <span className="text-[10px] tabular-nums" style={{ color: '#1a2744', opacity: 0.5 }}>
                  {count}
                </span>
              </div>
              <div className="h-1 w-full bg-opacity-10 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(107, 58, 58, 0.1)' }}>
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out group-hover:opacity-80"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: i === 0 ? '#6b3a3a' : 'rgba(107, 58, 58, 0.5)'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
