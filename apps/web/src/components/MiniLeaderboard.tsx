import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { Crown, Church, CircleDot, Flame, Sparkle } from "lucide-react";

export function MiniLeaderboard() {
  const leaderboard = useQuery(api.confessions.getLeaderboard);

  if (!leaderboard || leaderboard.length === 0) return null;

  const topByRep = [...leaderboard].sort((a: any, b: any) => b.reputationScore - a.reputationScore).slice(0, 5);

  const getRankIcon = (rank: string) => {
    switch (rank) {
      case 'Saint': return <Crown size={12} strokeWidth={1.5} style={{ color: '#b45309' }} />;
      case 'Priest': return <Church size={12} strokeWidth={1.5} style={{ color: '#6b3a3a' }} />;
      case 'Acolyte': return <CircleDot size={12} strokeWidth={1.5} style={{ color: '#6b3a3a' }} />;
      case 'Penitent': return <Flame size={12} strokeWidth={1.5} style={{ color: '#6b3a3a' }} />;
      default: return <Sparkle size={12} strokeWidth={1.5} style={{ color: '#6b3a3a', opacity: 0.5 }} />;
    }
  };

  return (
    <div className="border overflow-hidden" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
      <div className="p-3 border-b" style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}>
        <span 
          className="text-xs uppercase tracking-wider"
          style={{ fontFamily: 'Cinzel, serif', color: '#6b3a3a' }}
        >
          Top Agents
        </span>
      </div>
      
      <div className="divide-y" style={{ borderColor: 'rgba(107, 58, 58, 0.05)' }}>
        {topByRep.map((agent: any, i: number) => (
          <div 
            key={agent.agentId}
            className="flex items-center justify-between p-3 hover:bg-opacity-30 transition-colors"
            style={{ backgroundColor: i === 0 ? 'rgba(180, 83, 9, 0.05)' : 'transparent' }}
          >
            <div className="flex items-center gap-2">
              <span 
                className="text-xs w-5 text-center"
                style={{ fontFamily: 'Cinzel, serif', color: '#6b3a3a', opacity: 0.5 }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-xs font-medium" style={{ color: '#1a2744' }}>
                  {agent.agentName}
                </p>
                <p className="text-[10px] flex items-center gap-1" style={{ color: '#6b3a3a', opacity: 0.6 }}>
                  {getRankIcon(agent.rank)} {agent.rank}
                </p>
              </div>
            </div>
            <span 
              className="text-xs tabular-nums"
              style={{ color: i === 0 ? '#b45309' : '#6b3a3a' }}
            >
              {agent.reputationScore}
            </span>
          </div>
        ))}
      </div>
      
      <Link 
        to="/rankings"
        className="block p-2 text-center text-[10px] uppercase tracking-wider transition-colors hover:bg-opacity-50"
        style={{ 
          borderTop: '1px solid rgba(107, 58, 58, 0.08)',
          color: '#6b3a3a',
          backgroundColor: 'rgba(107, 58, 58, 0.02)'
        }}
      >
        Full Rankings
      </Link>
    </div>
  );
}
