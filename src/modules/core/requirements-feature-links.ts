export interface ScreenRequirement {
  featureName: string;
  content: string;
  source: "brd" | "prototype";
}

const SCREEN_REQUIREMENTS: Record<string, ScreenRequirement> = {
  "Sign In": {
    featureName: "Auth & Identity (Magic Link)",
    source: "brd",
    content: `Magic link authentication (email-based, no passwords). Identity hidden until user commits (joins an event/ride). Abstracted pre-commit identity signals (v2): Verified member, Area, Language. No global profiles, no cross-context identity linking.

T&C acceptance flow: users must view and accept Terms & Conditions before proceeding. Privacy policy page required. Audit trail of acceptance may be legally required in Japan (pending lawyer confirmation). Policy pages must exist as real URLs for SendGrid/Twilio platform validation.

i18n: UI must support English and Japanese language switching. Required for Japanese immigration / business manager visa purposes.`,
  },
  "Magic Link Verify": {
    featureName: "Auth & Identity (Magic Link)",
    source: "brd",
    content: `Magic link entry flow (from email/SMS/deep link). Verifies token and signs in or creates account. Auto-joins target (community/event/request/ride) when applicable (creates Join Record when a join occurs). Handles expired/invalid links with resend option. Post-join confirmation and routing to the intended destination. Supports returning user to the originating Q&A thread after join (deep link back to thread view).`,
  },
  "Join Gate": {
    featureName: "Join Gate (Q&A)",
    source: "brd",
    content: `Modal/panel invoked when a public user attempts to submit a question. Copy: "Join to send your question." Join/sign-in options (magic link, email/SMS). After successful join: returns user to the intended Q&A thread view and completes submission if pending. Handles cancel/close (keeps draft in composer).`,
  },
  "Area Feed (Public)": {
    featureName: "Area Feed & Discovery",
    source: "brd",
    content: `Area-based landing with filters: All/Community/Pro, Time, Interest. Feed cards show teaser info plus partner/community branding and sub-labels. Only Listings appear in the feed (Member Requests do not). Public users can open details in teaser mode with inline locks on gated sections and CTA "Unlock."

Stay tab (separate) with accommodation from Trust network. Stay injection experiment capped at 20% of feed (v2). Feed freshness algorithm with anti-gaming rules (v2): qualifying freshness bump coalesced to at most once per 12-hour window per item.`,
  },
  "Listing Detail (Public)": {
    featureName: "Listing Details (Public Teaser)",
    source: "brd",
    content: `Single unified details page for any Listing subtype (event/meetup/activity/community/partner offer/experience). Public teaser view with inline locks on members-only sections (chat, offers, pricing, contact). Transportation section always shows organizer contribution status and Ride Share tool entry. Partner Q&A entry point: opens partner Q&A; public can read threads and start composing a question (submit triggers Join Gate).`,
  },
  "Stay Browse (Public)": {
    featureName: "Accommodation (Trust-powered Stay Tab)",
    source: "brd",
    content: `Separate Stay tab for accommodation content. Accommodation from Trust/onlyifyk network. Booking flows through the Trust platform. Accommodation pricing visibility follows the same lock model: public cannot see accommodation prices; members can. Stay injection cap: AI optimizes injection rate within 0-20% and must never exceed 20% of feed cards.`,
  },
  "Ride Share (Public)": {
    featureName: "Ride Share Tool (Public View)",
    source: "brd",
    content: `System-level transport capability: always available for every event. Destination-based ride pools. Public view-only is default ON; member-only interaction (posting/joining/messaging). Public sees teaser only: entry + aggregated count like "3 rides available" + CTA to join. Public does not see individual ride posts, routes/timing, or participant info.`,
  },
  "Area Feed (Member)": {
    featureName: "Area Feed & Discovery (Member View)",
    source: "brd",
    content: `Full unlocked feed with all listing details visible. Join CTAs on all listings. Community vs Pro badge distinction with sub-labels (Meetup, Activity, Experience, Offer). Area-based browsing with filters (category, date, distance). Daily return / Feed Freshness: freshness only updates on meaningful state changes.`,
  },
  "Listing Detail (Member)": {
    featureName: "Listing Details + Join & Participation",
    source: "brd",
    content: `Full details view for members (unlocked sections, full CTA access). Join Record as canonical backbone -- created on every join action. Transport status captured at join (organizer-provided or self-organized). Participation statuses: Going, Requested, Confirmed, Declined, Expired.

Join Record triggers: identity reveal, chat access, transport status, payment tracking. Event Chat access granted automatically after Join. Partner Q&A entry point available.`,
  },
  "Join Flow": {
    featureName: "Unified Join UX + Transportation",
    source: "brd",
    content: `Single primary CTA "Join" everywhere across listing types. CTA/status naming: CTA is "Join"; status is "Going"; avoid "Booked/Reserved/Attending." Join creates Join Record with transport status.

Two-layer transport model: (1) Organizer provides transport or doesn't (only organizer-controlled stance), and (2) System-level ride share always available. If organizer transport provided: defaults to included with opt-out; if capacity full, fallback to self-organized + ride share surfaced. If no organizer transport: self-organized default, ride share surfaced immediately.

Identity revealed after joining. Strict anti-grey-taxi enforcement for ride share.`,
  },
  "Event Chat": {
    featureName: "Messaging (Contextual Only)",
    source: "brd",
    content: `Contextual, thread-based messaging (not DM/chat-first). Every thread attaches to exactly one parent object (Listing, Partner, or Member Request). No orphan threads. Event chat focused on announcements and logistics. Event Chat access granted automatically after Join.

No DMs, no profile-to-profile messaging. Identity is revealed only in committed contexts; pre-commit identity remains abstracted. Group chat noise controls: logistics-only prompts/nudges.`,
  },
  "Going Tab": {
    featureName: "Going Tab (Joined Events)",
    source: "brd",
    content: `List of joined/reserved listings (event subtype and other joinable listings). Canonical status indicators only (e.g., confirmed, pending, canceled). Quick access to listing details and manage participation.`,
  },
  "Stay (Member)": {
    featureName: "Accommodation (Member View)",
    source: "brd",
    content: `Members can see accommodation prices (unlocked). Browse/search stays by area/date/guests/price. Deep links to stay details/booking flow through Trust platform. IsshoLife acts as a front-end consuming Trust backend via API for accommodation. Booking as a guest through Trust.`,
  },
  "Ride Share Pool (Member)": {
    featureName: "Ride Share Tool (Member View)",
    source: "brd",
    content: `Members view: shows Ride Share Posts list (browse upcoming rides by destination/date). Filters (date/time, seats, cost, pickup area, driver/rider). Create ride post entry point (members only). Branded ride cards with key details (route, time, seats, cost split).

Modes: car share, taxi share, travel together. Strict anti-grey-taxi enforcement: structured inputs only; cost sharing only (no profit). Transparent cost estimate: includes tolls + fuel; split includes driver; always round down.`,
  },
  "Ride Share Detail": {
    featureName: "Ride Share Post Detail",
    source: "brd",
    content: `Full ride post details (route, time, pickup/dropoff, seats, rules). Request-to-join action for riders/passengers. Owner/driver actions to accept/decline join requests. Ride group details shown when group is formed. Participants list and roles (driver/rider). Cost split details and per-person estimate.

Identity exposure trigger: identity becomes visible only when ride share join is accepted (driver/riders confirmed).`,
  },
  "Partner Q&A Thread": {
    featureName: "Partner Q&A (Partner Room)",
    source: "brd",
    content: `Single Q&A room per Partner (attached to Partner profile/entity), not per listing/topic. Thread list view with search/sort/filter. Threads are member-initiated only; partner cannot start a new thread. Any member can ask questions without needing to join/purchase a specific Pro item (membership is sufficient).

AI-first assistance for drafting questions/answers and summarizing threads (v2). Thread lifecycle: statuses Active/Escalated/Resolved/Closed; auto-resolve after 24-48h. Thread retention: 30-day soft retention for closed threads. Anti-spam: max 1 active draft question per session (pre-join); rate limits post-join.`,
  },
  "Ask Question": {
    featureName: "Ask a Question (Composer)",
    source: "brd",
    content: `Question composer available to public (non-joined users can type a question). Context-aware (associated with a Partner Q&A room). On submit: triggers Join Gate modal ("Join to send your question"). For joined users: submits question to the partner Q&A room and routes to the created thread view. Draft persistence if user is interrupted by join flow.`,
  },
  "Following": {
    featureName: "Subscriptions / Following Experience",
    source: "brd",
    content: `Follow Areas, Interests, and Partners. Following feed switch available anytime: All/Community/Pro. Controls for follow/unfollow and notification preferences. Feed personalization preview (what you'll see in Area Feed/Explore). Entry points to Organizer/Partner profiles and area pages.`,
  },
  "Community Create": {
    featureName: "Community Creation + Recommendation",
    source: "brd",
    content: `Create entry screen to choose what to create: Community Listing or Recommendation Request. Community listing creation form with AI-built sections (suggested structure, copy, tags). First step includes subtype choice: Meetup vs Activity.

Recommendation: Chat-based request flow with optional inspirational chips/tags; free text allowed. Member Request exists outside the feed; acceptance creates a Listing. Partners can respond with offers; acceptance creates a community-owned listing.`,
  },
  "Partner Dashboard": {
    featureName: "Partner Model & Availability",
    source: "brd",
    content: `Three partner levels: Starter, Growth, Pro. Availability toggle On/Off (Off = fully hidden and unreachable). Pro listings: Experience vs Offer subtypes. Q&A room with AI (paid feature, v2 for AI layer). Media system for content generation and distribution (v2).

Partner-facing terminology: dashboard uses "Incoming questions" and actions "Approve AI answer" or "Reply." Partner escalation cap: max 20 active needs-attention/escalated threads per partner.`,
  },
  "Create Pro Listing": {
    featureName: "Partner Pro Listing Create/Edit",
    source: "brd",
    content: `Create/edit flow for Partner Pro listings. Choose listing type: Experience vs Offer. Core fields (title, description, location/area, media, pricing). Availability toggle On/Off (controls visibility/bookability). Save draft, publish, and validation/moderation checks. Partner Q&A is attached to the Partner; listings can link into that partner Q&A contextually.`,
  },
  "Q&A Inbox": {
    featureName: "Partner Q&A Inbox",
    source: "brd",
    content: `Partner inbox labeled "Incoming questions" with actions "Approve AI answer" and "Reply." Thread escalations: mark/escalate to partner/pro, assign/triage, status (open/answered/escalated/closed). AI-first assistance for drafting answers (v2). Partner protection: escalate only when confidence is low; partner load controls (max active escalated threads, queue oldest-first).`,
  },
  "Admin Console": {
    featureName: "Admin Console",
    source: "brd",
    content: `Admin hub for platform operations. Entitlements management (roles, access levels, paid access). Feature toggles/configuration management. Taxonomy moderation (categories, tags, areas). Verification review access and status oversight.

Experiments: toggle social proof, Stay badge injection. AI-controlled Stay injection experiment with injection cap. Freshness rules and thresholds configuration. Anti-grey-taxi enforcement. Listings-only feed enforcement.`,
  },
  "Admin Verification": {
    featureName: "Admin Verification",
    source: "brd",
    content: `List of organizer/host verification submissions. Submission detail access (documents/links/notes). Admin actions to verify/deny/request more info. Status tracking for each submission.

Verification scope: applies to BOTH partners and organizers with separate workflows/outcomes. Partner badge is members-only visible; Organizer trust is internal-only (not displayed).`,
  },
  "Admin Moderation": {
    featureName: "Admin Moderation",
    source: "brd",
    content: `Content safety and profanity enforcement. Block on violation. User message shown when blocked. Moderation tools: report, block content. Admin review. Repeat offenders throttle/ban (future).

Off-platform deal detection: detect "cash deal", "message me outside", "cheaper"; warn user; flag repeat offenders. Abuse & safety: profanity/hate/sexual/unsafe content blocked; report action on every message.`,
  },
  "Terms & Conditions": {
    featureName: "Policy & Compliance Pages",
    source: "brd",
    content: `Terms and conditions acceptance flow (view + accept before proceeding). Audit trail of acceptance -- may be legally required in Japan (pending lawyer confirmation). Policy pages must exist as real URLs for SendGrid/Twilio platform validation.

The Trust (onlyifyk) platform already has a T&C acceptance flow where users accept on first login and are re-prompted when a new version is published. This pattern can be reused for IsshoLife.`,
  },
  "Privacy Policy": {
    featureName: "Policy & Compliance Pages",
    source: "brd",
    content: `Privacy policy page required for platform compliance. Must exist as a real URL for SendGrid/Twilio platform validation. Japan-specific legal requirements pending (lawyer meeting with Alistair scheduled).`,
  },
  "Trust Redirect": {
    featureName: "Trust Integration (Stay Booking)",
    source: "prototype",
    content: `Demonstrates the cross-platform booking flow: when a member selects accommodation from the Stay tab, they are redirected to the Trust platform for booking. The Trust platform handles scheduling, availability, and pricing. IsshoLife account is linked to Trust for seamless booking.

Note: This flow is shown in the prototype but not explicitly described as a standalone screen in the BRD. The BRD confirms that Trust is the core booking engine and IsshoLife consumes it via API (Option B: API integration confirmed).`,
  },
};

export function getScreenRequirements(
  screenTitle: string,
): ScreenRequirement | null {
  return SCREEN_REQUIREMENTS[screenTitle] ?? null;
}
