import { cn } from "@/lib/utils";

type Filter = "recent" | "most_absolved" | "unabsolved";

interface FilterBarProps {
  active: Filter;
  onChange: (filter: Filter) => void;
}

const filters: { key: Filter; label: string }[] = [
  { key: "recent", label: "Recent" },
  { key: "most_absolved", label: "Absolved" },
  { key: "unabsolved", label: "Unabsolved" },
];

export function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="flex items-center justify-center gap-1 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onChange(filter.key)}
          className={cn(
            "px-3 py-1.5 text-xs uppercase tracking-wider transition-all duration-200",
            active === filter.key
              ? "border-b"
              : "opacity-40 hover:opacity-70"
          )}
          style={{
            fontFamily: 'Cinzel, serif',
            color: '#1a2744',
            borderColor: active === filter.key ? '#6b3a3a' : 'transparent'
          }}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
