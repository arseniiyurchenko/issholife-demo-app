import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  items: string[];
  value: string | null;
  onChange: (v: string | null) => void;
  placeholder: string;
  icon: React.ReactNode;
}

export function SearchSelect({ items, value, onChange, placeholder, icon }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = items.filter((i) =>
    i.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div ref={ref} className="relative flex-1">
      <button
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center gap-2 rounded-lg border bg-card px-3 py-2 text-left text-xs ${
          open ? "border-[var(--il-accent)]" : "border-border"
        } ${value ? "text-foreground" : "text-muted-foreground"}`}
      >
        {icon}
        <span className="flex-1 truncate">{value || placeholder}</span>
        <ChevronDown
          className={`size-3 text-muted-foreground transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-60 flex max-h-60 flex-col overflow-hidden rounded-xl border bg-card shadow-lg">
          <div className="border-b p-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="w-full rounded-md border bg-muted px-2.5 py-2 text-xs outline-none"
            />
          </div>
          <div className="flex-1 overflow-auto">
            <button
              onClick={() => {
                onChange(null);
                setOpen(false);
                setSearch("");
              }}
              className={`w-full px-3 py-2.5 text-left text-xs ${
                !value
                  ? "bg-[var(--il-accent-bg)] font-semibold text-[var(--il-accent)]"
                  : "text-muted-foreground"
              }`}
            >
              All
            </button>
            {filtered.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full px-3 py-2.5 text-left text-xs ${
                  value === item
                    ? "bg-[var(--il-accent-bg)] font-semibold text-[var(--il-accent)]"
                    : "text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="p-3 text-center text-xs text-muted-foreground">
                No matches
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
