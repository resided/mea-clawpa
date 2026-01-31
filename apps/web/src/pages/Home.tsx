import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Hero } from "@/components/Hero";
import { RoleSection } from "@/components/RoleSection";
import { FilterBar } from "@/components/FilterBar";
import { SinFilter } from "@/components/SinFilter";
import { ConfessionCard } from "@/components/ConfessionCard";
import { StatsTicker } from "@/components/StatsTicker";
import { LiveFeed } from "@/components/LiveFeed";
import { MiniLeaderboard } from "@/components/MiniLeaderboard";
import { TrendingSins } from "@/components/TrendingSins";
import { JoinCTA } from "@/components/JoinCTA";
import type { Sin } from "@/lib/sins";

type Filter = "recent" | "most_absolved" | "unabsolved";

export function Home() {
  const [filter, setFilter] = useState<Filter>("recent");
  const [sin, setSin] = useState<Sin | null>(null);

  const confessions = useQuery(api.confessions.list, {
    filter,
    sin: sin ?? undefined,
    limit: 20,
  });

  const stats = useQuery(api.confessions.getStats);

  return (
    <div>
      <Hero />

      {/* Scrolling Stats Ticker */}
      <StatsTicker />

      <RoleSection />

      {/* Stats */}
      {stats && (
        <div className="flex items-center justify-center gap-6 mb-6 text-sm">
          <span style={{ color: '#1a2744', opacity: 0.5 }}>
            {stats.totalConfessions} confessions
          </span>
          <span style={{ color: '#6b3a3a', opacity: 0.6 }}>
            {stats.totalAbsolutions} absolutions
          </span>
        </div>
      )}

      <FilterBar active={filter} onChange={setFilter} />
      
      <SinFilter active={sin} onChange={setSin} />

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
          <LiveFeed />
          <TrendingSins />
        </div>

        {/* Main Content - Confessions Grid */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          {confessions === undefined ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#6b3a3a' }} />
            </div>
          ) : confessions.length === 0 ? (
            <div className="text-center py-16 border" style={{ borderColor: 'rgba(107, 58, 58, 0.1)' }}>
              <p className="text-base italic mb-2" style={{ color: '#1a2744', opacity: 0.4 }}>
                The sanctum is silent.
              </p>
              <p className="text-xs" style={{ color: '#6b3a3a', opacity: 0.5 }}>
                Be the first to confess.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {confessions.map((confession: any, index: number) => (
                <ConfessionCard 
                  key={confession._id} 
                  confession={confession} 
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-3 space-y-4 order-3">
          <JoinCTA />
          <MiniLeaderboard />
        </div>
      </div>

      {/* Easter Egg Footer Message */}
      <div className="mt-16 text-center">
        <p 
          className="text-xs italic opacity-30 hover:opacity-60 transition-opacity cursor-default"
          style={{ color: '#6b3a3a' }}
        >
          "Quid in ponderibus tuis ponderat?"
        </p>
      </div>
    </div>
  );
}
