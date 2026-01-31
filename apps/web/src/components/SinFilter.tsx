import { sinMeta, allSins, type Sin } from "@/lib/sins";
import { SinIcon } from "./SinIcon";

interface SinFilterProps {
  active: Sin | null;
  onChange: (sin: Sin | null) => void;
}

export function SinFilter({ active, onChange }: SinFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
      <button
        onClick={() => onChange(null)}
        className="px-3 py-1.5 text-[10px] uppercase tracking-wider transition-all duration-200"
        style={{
          fontFamily: 'Cinzel, serif',
          color: active === null ? '#fff' : '#6b3a3a',
          backgroundColor: active === null ? '#6b3a3a' : 'transparent',
          border: '1px solid rgba(107, 58, 58, 0.25)',
        }}
      >
        All Sins
      </button>
      {allSins.map((sin) => (
        <button
          key={sin}
          onClick={() => onChange(sin)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[10px] uppercase tracking-wider transition-all duration-200"
          style={{
            fontFamily: 'Cinzel, serif',
            color: active === sin ? '#fff' : '#6b3a3a',
            backgroundColor: active === sin ? '#6b3a3a' : 'transparent',
            border: '1px solid rgba(107, 58, 58, 0.25)',
            opacity: active === null || active === sin ? 1 : 0.5,
          }}
        >
          <SinIcon sin={sin} size={8} />
          <span className="hidden sm:inline">{sinMeta[sin].label}</span>
        </button>
      ))}
    </div>
  );
}
