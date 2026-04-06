import { Link } from "react-router";
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Globe,
  Monitor,
  Terminal,
} from "lucide-react";

const HINTS = [
  {
    icon: CircleHelp,
    label: "Question icon",
    text: "Available on every screen in the bottom-right corner. Opens a description of the page: what it does and which scenarios it demonstrates.",
  },
  {
    icon: Terminal,
    label: "Terminal icon",
    text: "Backend Log. Shows what would happen on the backend in production. Helps understand processes and business logic.",
  },
  {
    icon: BookOpen,
    label: "Book icon",
    text: "Opens the related business requirements section for the current screen.",
  },
];

export function HomePage() {
  return (
    <div className="min-h-svh bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-linear-to-b from-primary/4 to-transparent" />

      <div className="relative mx-auto max-w-5xl px-6 py-20">
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            UI Prototype
          </div>
          <div className="mb-3 flex items-center justify-center gap-2">
            <Globe className="size-8 text-primary" />
            <h1 className="text-5xl font-bold tracking-tight">IsshoLife</h1>
          </div>
          <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground">
            Discover. Join. Go together.<br />
            Community-first, destination-based discovery and coordination for outdoor activities in Japan.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            to="/screens"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-linear-to-br from-primary/10 via-primary/5 to-card p-6 shadow-sm transition-all hover:shadow-lg md:min-h-[200px]"
          >
            <div>
              <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                <Monitor className="size-6" />
              </div>
              <h2 className="text-lg font-semibold text-foreground">
                All demo screens
              </h2>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Browse every screen in the prototype — auth, public discovery,
                member flows, partner tools, admin console, and policies.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary">
              Open
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          <div className="flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm">
            <div>
              <h2 className="mb-2 text-lg font-semibold text-foreground">About this demo</h2>
              <p className="text-sm text-muted-foreground">
                27 interactive screens covering the full IsshoLife platform: area-based event discovery,
                join and coordination flows, ride sharing, stay booking via Trust integration,
                partner dashboards, and admin operations.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Discovery", "Join Flow", "Ride Share", "Stay / Trust", "Partner", "Admin"].map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {HINTS.map((hint) => (
            <div
              key={hint.label}
              className="flex gap-4 rounded-2xl border bg-card p-5 shadow-sm"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <hint.icon className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  {hint.label}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {hint.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
