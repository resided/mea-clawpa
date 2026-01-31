import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Hero } from "@/components/Hero";
import { RoleSection } from "@/components/RoleSection";
import { FilterBar } from "@/components/FilterBar";
import { ConfessionCard } from "@/components/ConfessionCard";

type Filter = "recent" | "most_absolved" | "unabsolved";

export function Home() {
  const [filter, setFilter] = useState<Filter>("recent");

  const confessions = useQuery(api.confessions.list, {
    filter,
    limit: 20,
  });

  const stats = useQuery(api.confessions.getStats);

  return (
    <div>
      <Hero />

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

      {/* Grid layout */}
      {confessions === undefined ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#6b3a3a' }} />
        </div>
      ) : confessions.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-base italic" style={{ color: '#1a2744', opacity: 0.4 }}>
            The sanctum is silent.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {confessions.map((confession) => (
            <ConfessionCard key={confession._id} confession={confession} />
          ))}
        </div>
      )}
    </div>
  );
}
