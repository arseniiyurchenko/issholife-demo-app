import { Link } from "react-router";
import {
  ArrowLeft,
  Calendar,
  Car,
  CheckCircle,
  Compass,
  FileText,
  Flag,
  Globe,
  Heart,
  Home,
  KeyRound,
  LayoutDashboard,
  Link2,
  Lock,
  MapPin,
  MessageCircle,
  MessageSquarePlus,
  Plus,
  Search,
  Settings,
  Shield,
  ShieldCheck,
  Store,
} from "lucide-react";

interface ScreenLink {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
}

function getDemoHref(href: string): string {
  if (!href.startsWith("/screens/member/")) {
    return href;
  }

  return `${href}?demo-auth=1`;
}

const GROUPS: { title: string; screens: ScreenLink[] }[] = [
  {
    title: "Auth",
    screens: [
      { title: "Sign In", href: "/screens/auth/sign-in", description: "Magic link authentication flow", icon: KeyRound },
      { title: "Magic Link Verify", href: "/screens/auth/magic", description: "Verification after clicking magic link", icon: Link2 },
      { title: "Join Gate", href: "/screens/auth/join-gate", description: "Gate for unauthenticated Q&A submissions", icon: Lock },
    ],
  },
  {
    title: "Public / Discovery",
    screens: [
      { title: "Area Feed (Public)", href: "/screens/public/feed", description: "Teaser feed with locked sections", icon: Compass },
      { title: "Listing Detail (Public)", href: "/screens/public/listing/1", description: "Listing preview with gated content", icon: MapPin },
      { title: "Tour Detail (Public)", href: "/screens/public/tour/6", description: "Licensed tour teaser with unlock CTA", icon: MapPin },
      { title: "Rides (Public Tab)", href: "/screens/public/rideshare", description: "Bottom-tab destination for public rides", icon: Car },
      { title: "Stay Browse (Public)", href: "/screens/public/stay", description: "Accommodation cards with locked pricing", icon: Home },
    ],
  },
  {
    title: "Member",
    screens: [
      { title: "Area Feed", href: "/screens/member/feed", description: "Unlocked discovery feed with join CTAs", icon: Compass },
      { title: "Going", href: "/screens/member/going", description: "Joined events with attendance stats", icon: Calendar },
      { title: "Stay (Member)", href: "/screens/member/stay", description: "Unlocked pricing, book on Trust", icon: Home },
      { title: "Rides (Member Tab)", href: "/screens/member/rideshare", description: "Ride pool with mocked requests, My Rides state, and quick chat actions", icon: Car },
      { title: "Create Ride", href: "/screens/member/rideshare/create", description: "Create a new rideshare listing", icon: Plus },
      { title: "Listing Detail", href: "/screens/member/listing/1", description: "Full detail with join and contextual chat", icon: MapPin },
      { title: "Tour Detail", href: "/screens/member/tour/6", description: "Licensed tier details with bundled inclusions", icon: MapPin },
      { title: "Join Flow", href: "/screens/member/join/1", description: "Join confirmation and participation status", icon: CheckCircle },
      { title: "Ride Detail (Request + Driver Chat)", href: "/screens/member/rideshare/1", description: "Mocked ride request state with request-sent CTA and driver chat entry point", icon: Car },
      { title: "Event Chat (Contextual)", href: "/screens/member/chat/1", description: "Event-level chat screen reachable from listing/going actions", icon: MessageCircle },
      { title: "Partner Q&A Thread", href: "/screens/member/qa/1", description: "Q&A with AI-assisted answers", icon: MessageSquarePlus },
      { title: "Ask Question", href: "/screens/member/qa/ask", description: "Question composer with suggestions", icon: Search },
      { title: "Following", href: "/screens/member/following", description: "Manage areas, interests, partners", icon: Heart },
      { title: "Community Create", href: "/screens/member/create", description: "Create a meetup or activity", icon: Plus },
    ],
  },
  {
    title: "Partner",
    screens: [
      { title: "Dashboard", href: "/screens/partner", description: "Listings, availability, stats overview", icon: LayoutDashboard },
      { title: "Create Listing", href: "/screens/partner/create", description: "Experience vs Offer listing creation", icon: Store },
      { title: "Create Tour Listing", href: "/screens/partner/create-tour", description: "Licensed bundled tour creation flow", icon: Store },
      { title: "Q&A Inbox", href: "/screens/partner/qa", description: "Incoming questions with AI drafts", icon: MessageCircle },
    ],
  },
  {
    title: "Admin",
    screens: [
      { title: "Console", href: "/screens/admin", description: "Feature toggles, taxonomy, operations", icon: Settings },
      { title: "Verification", href: "/screens/admin/verification", description: "Organizer and partner verification queue", icon: ShieldCheck },
      { title: "Moderation", href: "/screens/admin/moderation", description: "Content safety and abuse reports", icon: Flag },
    ],
  },
  {
    title: "Policy",
    screens: [
      { title: "Terms & Conditions", href: "/screens/policy/terms", description: "Platform terms and community guidelines", icon: FileText },
      { title: "Privacy Policy", href: "/screens/policy/privacy", description: "Data collection and user rights", icon: Shield },
    ],
  },
];

export function ScreensIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="mb-10">
          <Link
            to="/"
            className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3" />
            Home
          </Link>
          <div className="flex items-center gap-2">
            <Globe className="size-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">IsshoLife Demo Screens</h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            31 interactive screens. Click to open in a new tab.
          </p>
        </div>

        <div className="space-y-10">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                {group.title}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.screens.map((screen) => (
                  <a
                    key={screen.href}
                    href={getDemoHref(screen.href)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <screen.icon className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        {screen.title}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {screen.description}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground/50">
                        {screen.href}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
