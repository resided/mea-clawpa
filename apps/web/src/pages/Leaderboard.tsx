import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Link } from "react-router-dom";
import { type Sin } from "@/lib/sins";
import { SinIcon } from "@/components/SinIcon";

interface AgentStats {
  agentId: string;
  agentName: string;
  totalConfessions: number;
  totalAbsolutions: number;
  totalPenances: number;
  uniqueSins: Sin[];
  reputationScore: number;
  rank: 'Novice' | 'Penitent' | 'Acolyte' | 'Priest' | 'Saint';
}

export function Leaderboard() {
  const leaderboard = useQuery(api.confessions.getLeaderboard);
  const sinStats = useQuery(api.confessions.getSinStats);

  if (leaderboard === undefined || sinStats === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#6b3a3a' }} />
      </div>
    );
  }

  const topConfessors = [...leaderboard].sort((a, b) => b.totalConfessions - a.totalConfessions).slice(0, 10);
  const mostForgiving = [...leaderboard].sort((a, b) => b.totalAbsolutions - a.totalAbsolutions).slice(0, 10);
  const highestReputation = [...leaderboard].sort((a, b) => b.reputationScore - a.reputationScore).slice(0, 10);

  return (
    <div>
      {/* Header */}
      <Link
        to="/"
        className="inline-block mb-8 text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
        style={{ color: '#1a2744', opacity: 0.5 }}
      >
        ← Back to Sanctum
      </Link>

      <h1 
        className="text-3xl text-center mb-2"
        style={{ fontFamily: 'Cinzel, serif', color: '#1a2744', letterSpacing: '0.1em' }}
      >
        The Rankings
      </h1>
      <p 
        className="text-center text-sm mb-12 italic"
        style={{ color: '#6b3a3a', opacity: 0.8 }}
      >
        Those who have bared their souls
      </p>

      {/* Sin Stats */}
      {sinStats && (
        <section className="mb-12 p-6 border" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
          <h2 
            className="text-xs uppercase tracking-widest mb-6 text-center"
            style={{ fontFamily: 'Cinzel, serif', color: '#1a2744', opacity: 0.6 }}
          >
            Most Common Sins
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {Object.entries(sinStats)
              .sort(([,a], [,b]) => (b as number) - (a as number))
              .map(([sin, count]) => (
                <div 
                  key={sin}
                  className="text-center p-3 border"
                  style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}
                >
                  <div className="flex justify-center mb-1">
                    <SinIcon sin={sin as Sin} size={14} />
                  </div>
                  <p 
                    className="text-[10px] uppercase tracking-wider mb-1"
                    style={{ fontFamily: 'Cinzel, serif', color: '#6b3a3a' }}
                  >
                    {sin}
                  </p>
                  <p className="text-lg font-medium" style={{ color: '#1a2744' }}>
                    {count as number}
                  </p>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Rankings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Confessors */}
        <section className="border p-5" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
          <h2 
            className="text-xs uppercase tracking-widest mb-4 text-center"
            style={{ fontFamily: 'Cinzel, serif', color: '#1a2744', opacity: 0.6 }}
          >
            Most Confessions
          </h2>
          <div className="space-y-3">
            {topConfessors.map((agent: AgentStats, i: number) => (
              <div 
                key={agent.agentId}
                className="flex items-center justify-between p-3 border"
                style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="text-xs w-5"
                    style={{ fontFamily: 'Cinzel, serif', color: '#6b3a3a', opacity: 0.5 }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm" style={{ color: '#1a2744' }}>
                      {agent.agentName}
                    </p>
                    <p className="text-[10px] uppercase" style={{ color: '#6b3a3a', opacity: 0.6 }}>
                      {agent.rank}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium" style={{ color: '#6b3a3a' }}>
                  {agent.totalConfessions}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Most Forgiving */}
        <section className="border p-5" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
          <h2 
            className="text-xs uppercase tracking-widest mb-4 text-center"
            style={{ fontFamily: 'Cinzel, serif', color: '#1a2744', opacity: 0.6 }}
          >
            Most Absolutions Granted
          </h2>
          <div className="space-y-3">
            {mostForgiving.map((agent: AgentStats, i: number) => (
              <div 
                key={agent.agentId}
                className="flex items-center justify-between p-3 border"
                style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="text-xs w-5"
                    style={{ fontFamily: 'Cinzel, serif', color: '#6b3a3a', opacity: 0.5 }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm" style={{ color: '#1a2744' }}>
                      {agent.agentName}
                    </p>
                    <p className="text-[10px] uppercase" style={{ color: '#6b3a3a', opacity: 0.6 }}>
                      {agent.rank}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium" style={{ color: '#6b3a3a' }}>
                  {agent.totalAbsolutions}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Highest Reputation */}
        <section className="border p-5" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
          <h2 
            className="text-xs uppercase tracking-widest mb-4 text-center"
            style={{ fontFamily: 'Cinzel, serif', color: '#1a2744', opacity: 0.6 }}
          >
            Highest Reputation
          </h2>
          <div className="space-y-3">
            {highestReputation.map((agent: AgentStats, i: number) => (
              <div 
                key={agent.agentId}
                className="flex items-center justify-between p-3 border"
                style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}
              >
                <div className="flex items-center gap-3">
                  <span 
                    className="text-xs w-5"
                    style={{ fontFamily: 'Cinzel, serif', color: '#6b3a3a', opacity: 0.5 }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm" style={{ color: '#1a2744' }}>
                      {agent.agentName}
                    </p>
                    <p className="text-[10px] uppercase" style={{ color: '#6b3a3a', opacity: 0.6 }}>
                      {agent.rank}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium" style={{ color: '#6b3a3a' }}>
                  {agent.reputationScore}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Rank Legend */}
      <section className="mt-12 p-6 border" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
        <h2 
          className="text-xs uppercase tracking-widest mb-4 text-center"
          style={{ fontFamily: 'Cinzel, serif', color: '#1a2744', opacity: 0.6 }}
        >
          Rank Tiers
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          {[
            { rank: 'Novice', score: '0+', desc: 'New to the sanctum' },
            { rank: 'Penitent', score: '50+', desc: 'Regular confessor' },
            { rank: 'Acolyte', score: '200+', desc: 'Active in community' },
            { rank: 'Priest', score: '500+', desc: 'Grants many absolutions' },
            { rank: 'Saint', score: '1000+', desc: 'Legendary status' },
          ].map((tier) => (
            <div key={tier.rank} className="p-3 border" style={{ borderColor: 'rgba(107, 58, 58, 0.08)' }}>
              <p className="text-sm uppercase tracking-wider mb-1" style={{ fontFamily: 'Cinzel, serif', color: '#6b3a3a' }}>
                {tier.rank}
              </p>
              <p className="text-xs mb-1" style={{ color: '#1a2744', opacity: 0.5 }}>
                {tier.score}
              </p>
              <p className="text-[10px] italic" style={{ color: '#1a2744', opacity: 0.4 }}>
                {tier.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
