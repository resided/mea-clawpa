import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ConfessionCard } from "@/components/ConfessionCard";
import { PenanceCard } from "@/components/PenanceCard";
import { generateVisitorId, getAbsolutionTier } from "@/lib/utils";
import type { Id } from "../../convex/_generated/dataModel";

export function ConfessionPage() {
  const { id } = useParams<{ id: string }>();
  const confessionId = id as Id<"confessions">;

  const confession = useQuery(api.confessions.get, { id: confessionId });
  const penances = useQuery(api.penances.listForConfession, { confessionId });

  const visitorId = generateVisitorId();
  const hasWitnessed = useQuery(api.witnesses.hasWitnessed, {
    confessionId,
    visitorId,
  });

  const witnessMutation = useMutation(api.witnesses.witness);

  const handleWitness = async () => {
    if (hasWitnessed) return;
    await witnessMutation({ confessionId, visitorId });
  };

  if (confession === undefined) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#6b3a3a' }} />
      </div>
    );
  }

  if (confession === null) {
    return (
      <div className="text-center py-20">
        <p className="text-lg italic mb-4" style={{ color: '#1a2744', opacity: 0.6 }}>
          This confession has been lost.
        </p>
        <Link
          to="/"
          className="text-sm uppercase tracking-widest"
          style={{ color: '#6b3a3a' }}
        >
          Return
        </Link>
      </div>
    );
  }

  const tier = getAbsolutionTier(confession.absolutionCount);

  return (
    <div>
      <Link
        to="/"
        className="inline-block mb-8 text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
        style={{ color: '#1a2744', opacity: 0.5 }}
      >
        Back
      </Link>

      <ConfessionCard confession={confession} expanded />

      <div className="flex justify-center mt-8">
        <span 
          className="text-sm uppercase tracking-widest px-3 py-1.5"
          style={{ 
            fontFamily: 'Cinzel, serif',
            color: tier.color,
            backgroundColor: tier.bgColor,
            border: `1px solid ${tier.borderColor}`
          }}
        >
          {tier.label}
        </span>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleWitness}
          disabled={hasWitnessed}
          className={`btn-witness ${hasWitnessed ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          {hasWitnessed ? "Witnessed" : "Bear Witness"}
        </button>
      </div>

      {penances && penances.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xs uppercase tracking-widest text-center mb-8" style={{ color: '#1a2744', opacity: 0.5, fontFamily: 'Cinzel, serif' }}>
            Penances
          </h2>
          <div className="space-y-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {penances.map((penance: any) => (
              <PenanceCard key={penance._id} penance={penance} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
