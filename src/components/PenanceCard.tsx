interface PenanceCardProps {
  penance: {
    text: string;
    agentName?: string;
  };
}

export function PenanceCard({ penance }: PenanceCardProps) {
  return (
    <div className="border-l-2 pl-5 py-1" style={{ borderColor: 'rgba(107, 58, 58, 0.2)' }}>
      <p className="text-base italic mb-2" style={{ color: '#1a2744', opacity: 0.8 }}>
        "{penance.text}"
      </p>
      <p className="text-xs" style={{ color: '#1a2744', opacity: 0.4 }}>
        — {penance.agentName || "Anonymous"}
      </p>
    </div>
  );
}
