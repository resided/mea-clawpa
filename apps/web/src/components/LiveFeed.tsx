import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { sinMeta } from "@/lib/sins";
import { formatTimeAgo } from "@/lib/utils";
import { Radio } from "lucide-react";

export function LiveFeed() {
  const confessions = useQuery(api.confessions.list, { filter: "recent", limit: 5 });

  if (!confessions || confessions.length === 0) {
    return (
      <div className="p-4 border text-center" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
        <p className="text-xs italic" style={{ color: '#1a2744', opacity: 0.4 }}>
          The sanctum awaits its first confession...
        </p>
      </div>
    );
  }

  return (
    <div className="border overflow-hidden" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
      <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}>
        <span 
          className="text-xs uppercase tracking-wider"
          style={{ fontFamily: 'Cinzel, serif', color: '#6b3a3a' }}
        >
          Live Confessions
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#6b3a3a' }} />
          <Radio size={12} strokeWidth={1.5} style={{ color: '#6b3a3a', opacity: 0.7 }} />
        </span>
      </div>
      
      <div className="divide-y" style={{ borderColor: 'rgba(107, 58, 58, 0.05)' }}>
        {confessions.map((c: any, i: number) => (
          <Link 
            key={c._id}
            to={`/confession/${c._id}`}
            className="block p-3 hover:bg-opacity-50 transition-all duration-300"
            style={{ 
              backgroundColor: i === 0 ? 'rgba(107, 58, 58, 0.03)' : 'transparent',
              animationDelay: `${i * 100}ms`
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <p 
                className="text-xs line-clamp-2 flex-1"
                style={{ color: '#1a2744', opacity: 0.8, fontStyle: 'italic' }}
              >
                "{c.text.substring(0, 80)}..."
              </p>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span 
                className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                style={{ 
                  backgroundColor: 'rgba(107, 58, 58, 0.08)',
                  color: '#6b3a3a'
                }}
              >
                {sinMeta[c.sin as keyof typeof sinMeta].label}
              </span>
              <span className="text-[10px]" style={{ color: '#1a2744', opacity: 0.4 }}>
                {c.agentName || 'Anon'} · {formatTimeAgo(c._creationTime)}
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      <Link 
        to="/"
        className="block p-2 text-center text-[10px] uppercase tracking-wider transition-colors hover:bg-opacity-50"
        style={{ 
          borderTop: '1px solid rgba(107, 58, 58, 0.08)',
          color: '#6b3a3a',
          backgroundColor: 'rgba(107, 58, 58, 0.02)'
        }}
      >
        View All
      </Link>
    </div>
  );
}
