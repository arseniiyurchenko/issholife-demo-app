**IsshoLife**

Initial Research & Architecture Analysis

_Internal document - research phase_

_Last updated: Apr 4, 2026 - merged client meeting notes (Apr 2)_

# **1\. Objective**

Conduct initial research and analysis of the IsshoLife platform to understand its business requirements, system architecture, and key components. Identify how it relates to the existing Trust (onlyifyk) platform and define an architecture where both products can share a centralized offering layer.

# **2\. Core Product Goals**

- Destination-based community discovery - help people find, plan, and join activities around specific places
- Trust-gated participation - public teaser for discovery, magic link unlock for full access and actions
- Logistics-forward coordination - transport planning is built into every event, not an afterthought
- Accommodation bridge - connect IsshoLife activity discovery with Trust-powered accommodation (Stay tab)
- Partner monetization - paid experiences, Q&A rooms with AI, media distribution
- Growth engine - every event URL is a landing page, inline locks convert browsers to members

**_Updated after client meeting (Apr 2, 2026)_**

- **Time management platform** - client confirmed the core function of Trust is pivoting to become a time management platform, selling time-based services (house rentals, ski lessons, fitness classes, etc.) rather than just property
- **Marketplace hub connector** - IsshoLife acts as a marketplace hub connector for a community, currently focused on outdoor adventure sports (biking, hiking, snowboarding, skiing) but expected to broaden over time
- **Small business enablement** - goal is to support small, seasonal businesses that cannot afford massive SaaS systems
- **Avoid niche branding** - do not brand IsshoLife too heavily toward outdoor/adventure sports, as the community will broaden

# **3\. Primary Use Cases**

## **3.1 Event Discovery & Joining**

A user finds an event link, views a public teaser, hits a lock, signs up via magic link, and joins the event with transport selection. After joining, they access event chat and coordinate with other participants.

## **3.2 Ride Share Coordination**

Members going to the same destination coordinate shared rides. Cost-splitting only (strict anti-grey-taxi rules). Destination-based pools shared across all events in the same area.

## **3.3 Accommodation Discovery**

Members browse the Stay tab to find accommodation near their events. Properties are sourced from the Trust/onlyifyk network. Booking flows through the Trust platform.

## **3.4 Partner Experiences**

Business partners publish paid experiences/offers. Members can browse, join, and ask questions via Partner Q&A. Partners manage availability and respond to inquiries.

## **3.5 Community Organizing**

Members create meetups/activities for a destination. Other members join, coordinate transport, and communicate through event chat.

**_Updated after client meeting (Apr 2, 2026)_**

## **3.6 Time-Based Service Marketplace**

Beyond property rentals, the Trust engine supports any time-based service: ski lessons, fitness classes, guided tours, etc. IsshoLife surfaces these as Pro offerings alongside community events. Different business rules apply per service type, but the underlying booking/scheduling architecture is shared.

# **4\. Functional Requirements**

## **4.1 Feed & Discovery**

- Listings-only feed (no member requests in feed)
- Area-based browsing with filters (category, date, distance)
- Community vs Pro badge distinction with sub-labels
- Public teaser with inline locks on gated sections
- Stay tab (separate) with accommodation from Trust network
- Feed freshness algorithm with anti-gaming rules (v2)
- Stay injection experiment capped at 20% of feed (v2)

## **4.2 Auth & Identity**

- Magic link authentication (email-based, no passwords)
- Identity hidden until user commits (joins an event/ride)
- Abstracted pre-commit identity signals (v2): Verified member · Area · Language
- No global profiles, no cross-context identity linking

## **4.3 Join & Participation**

- Join Record as canonical backbone - created on every join action
- Transport status captured at join (organizer-provided or self-organized)
- Participation statuses: Going, Requested, Confirmed, Declined, Expired
- Join Record triggers: identity reveal, chat access, transport status, payment tracking

## **4.4 Transport**

- Two-layer model: organizer provides transport (yes/no) + system-level ride share always available
- Ride share: destination-based pools, cost-split only, anti-grey-taxi enforcement
- Transparent cost estimate: tolls + fuel, split includes driver, round down

## **4.5 Messaging**

- Contextual only - every thread attached to a parent (Listing, Partner, or Member Request)
- Event chat: Announcements (organizer-only) + Logistics (all attendees) - single channel for v1
- Partner Q&A: member-initiated threads, AI-first with escalation (simple threaded Q&A for v1)
- No DMs, no profile-to-profile messaging

## **4.6 Partner Model**

- Three levels: Starter, Growth, Pro
- Availability toggle On/Off (Off = fully hidden and unreachable)
- Pro listings: Experience vs Offer subtypes
- Q&A room with AI (paid feature, v2 for AI layer)
- Media system for content generation and distribution (v2)

## **4.7 Payments**

- Off-platform payments for v1 (members pay each other directly)
- Future priority: marketplace checkout (Pro partners) → membership fee → in-app group split

**_Updated after client meeting (Apr 2, 2026)_**

## **4.8 Internationalization (i18n)**

Client confirmed that a functional IsshoLife UI must be available in both English and Japanese within the next couple of weeks. This is required for Japanese immigration / business manager visa purposes - they need to show a working product as proof of what is being built.

- UI must support English and Japanese language switching
- This is a hard requirement with a tight timeline (weeks, not months)
- Content translation is secondary - UI chrome and navigation labels are the priority

## **4.9 Policy & Compliance Pages**

Client is meeting with lawyers to determine Japan-specific legal requirements. The platform needs:

- Terms and conditions acceptance flow (view + accept before proceeding)
- Privacy policy page
- Audit trail of acceptance - may be legally required in Japan (pending lawyer confirmation)
- Policy pages must exist as real URLs for SendGrid/Twilio platform validation
- **Note:** the Trust (onlyifyk) platform already has a T&C acceptance flow where users accept on first login and are re-prompted when a new version is published. This pattern can be reused.

# **5\. Non-Functional Requirements**

- Web-first, mobile-responsive - no native app for v1
- Performance: fast page loads for public teasers (these are landing pages / conversion funnels)
- Privacy: scoped identity exposure, no global identity graph, no cross-context linking
- Compliance: Japan-specific disclaimers (ride share, transport), anti-grey-taxi enforcement
- Scalability: single-region (Japan) for v1, multi-region architecture-ready
- SEO: event pages must be crawlable (public teaser content)

**_Updated after client meeting (Apr 2, 2026)_**

- **Bilingual UI** - English and Japanese required for v1 launch (immigration requirement)
- **Test automation** - client emphasized importance of repeatable automated testing (end-to-end, integration, unit)

# **6\. Platform Structure**

## **6.1 Frontend**

- Next.js + React + TypeScript
- Tailwind CSS for styling
- Vercel for hosting
- Server-side rendering for public teaser pages (SEO)

## **6.2 Backend**

- Next.js API Routes (serverless functions on Vercel)
- PostgreSQL + Prisma ORM
- NextAuth.js for magic link authentication

## **6.3 Key Difference from Trust/onlyifyk**

The Trust project uses NestJS (dedicated backend) + Supabase auth. IsshoLife uses Next.js API routes + NextAuth. Different stacks reinforce the separate-products approach but require a clear integration strategy for shared data (accommodation).

**_Updated after client meeting (Apr 2, 2026)_**

## **6.4 Confirmed: Single Platform, Multiple Front-Ends**

The meeting confirmed that the team should integrate everything into one platform (Trust) where different front-ends are used for various types of products, utilizing the base booking system. The confirmed approach:

- Trust backend serves as the core engine (booking, time management, pricing)
- IsshoLife is a separate front-end consuming Trust backend via API
- Future niche marketplaces (e.g., skiing in Japan, vacations in Thailand) follow the same pattern - new front-end, same backend
- _Client's words:_ "a single platform with a skin front-end that provides customized toolsets for different marketplaces"

The team confirmed the current Trust architecture already supports selling different product types beyond real estate (e.g., lessons). The easiest path for new products is: build a new front-end integrated with the existing backend.

# **7\. Architecture Analysis**

## **7.1 Previous State: Two Separate Products**

Before the meeting, onlyifyk and IsshoLife were conceived as potentially independent applications with different tech stacks, auth systems, and deployment pipelines.

**_Updated after client meeting (Apr 2, 2026)_**

## **7.2 Confirmed: Trust as a Time Management Platform**

The client confirmed a major architectural pivot: Trust is no longer just a property rental engine. It is becoming a time management platform that sells time-based services. Properties, ski lessons, fitness classes, guided tours - all share the same underlying architecture of selling blocks of time with availability, pricing, and booking logic.

This means:

- The booking engine is the core shared component - it handles scheduling, availability, and pricing for any time-based offering
- Business rules vary per service type (cancellation policies, capacity, transport) but the data model is unified
- IsshoLife and any future marketplace are consumers of this engine via API
- Each front-end adds its own domain-specific features (ride share for IsshoLife, trust levels for onlyifyk)

## **7.3 Integration Approach - Confirmed: API (Option B)**

|               | **Option A: Shared DB**            | **Option B: API (confirmed)**   | **Option C: Separate**        |
| ------------- | ---------------------------------- | ------------------------------- | ----------------------------- |
| **Coupling**  | Tight - same DB, shared migrations | Loose - API contract only       | None - fully independent      |
| **Deploy**    | Coordinated deploys                | Independent deploys             | Independent deploys           |
| **Data sync** | Real-time (same tables)            | On-demand via API calls         | Manual / no sync              |
| **Effort**    | Low initial, high maintenance      | Medium initial, low maintenance | Low initial, duplicate effort |
| **Risk**      | Schema changes break both          | API versioning needed           | Data drift, double management |

**Confirmed: Option B (API integration).** Trust exposes REST endpoints for property/service search, availability, and booking initiation. IsshoLife and future marketplaces consume these. Each front-end deploys independently.

# **8\. Key Modules**

| **Module**                   | **Description**                                                   | **Priority**                |
| ---------------------------- | ----------------------------------------------------------------- | --------------------------- |
| **Feed & Discovery**         | Area-based listing feed with filters, public teaser, inline locks | v1 - Core                   |
| **Auth & Identity**          | Magic link auth, identity gating, scoped visibility               | v1 - Core                   |
| **Join & Participation**     | Join Record, transport capture, status tracking                   | v1 - Core                   |
| **Transport / Ride Share**   | Destination pools, cost-split, anti-grey-taxi                     | v1 - Core                   |
| **Event Chat**               | Contextual messaging tied to listings                             | v1 - Core                   |
| **Stay (Trust integration)** | Accommodation tab consuming Trust API                             | v1 - Core                   |
| **Partner Q&A (simple)**     | Threaded Q&A, member-initiated, partner responds                  | v1 - Core                   |
| **Partner Dashboard**        | Listing CRUD, availability toggle, incoming questions             | v1 - Core                   |
| **i18n (EN/JP)**             | Bilingual UI - English and Japanese switching                     | v1 - Required (immigration) |
| **Policy & T&C Pages**       | Terms, privacy policy, acceptance flow, audit trail               | v1 - Required (legal)       |
| **AI Q&A Layer**             | Auto-answer, escalation, controlled learning                      | v2                          |
| **Feed Freshness**           | Ranking algorithm, anti-gaming, activity thresholds               | v2                          |
| **Member Requests**          | Demand signals, partner offers, listing creation                  | v2                          |
| **Premium Groups**           | Private groups, group-only events, money tracker                  | v3                          |
| **Media System**             | Video generation, distribution, credits                           | v3                          |
| **Payments**                 | Marketplace checkout, membership fees, group splits               | v2-v3                       |

# **9\. Third-Party Services & APIs**

- **Vercel** - hosting and serverless functions
- **PostgreSQL (managed)** - primary database
- **NextAuth.js** - magic link authentication
- **Prisma** - ORM and migrations
- **Trust/onlyifyk API** - booking engine, accommodation, time-based services (to be exposed)
- **Mapbox or similar** - area/destination mapping (TBD)
- **OpenAI** - AI Q&A layer for Partner Q&A rooms (v2)
- **SendGrid** - email delivery (setup confirmed, pending policy page URLs for validation)
- **Twilio** - SMS delivery (setup pending, requires compliant URLs)

# **10\. Business Context from Client Meeting**

**_Updated after client meeting (Apr 2, 2026)_**

## **10.1 Japan Physical Presence**

Client mentioned an unexpected development - potential purchase of a building in Japan for a physical "hub." This is relevant context for the product direction but does not directly affect the technical build.

## **10.2 Community Focus (Current)**

The initial community focus is outdoor adventure sports (biking, hiking, snowboarding, skiing) because that's where the available team and network are. However, the client explicitly stated not to brand IsshoLife too heavily in that direction - the platform should feel general enough to accommodate other interest communities as they form.

## **10.3 MVP Status**

Client confirmed the Trust (onlyifyk) platform is essentially MVP-ready after 4 weeks of development. The priority is getting the system live and addressing immediate feedback, not building new features.

## **10.4 Pricing Logic**

New pricing logic has been implemented in Trust. Client found the flexibility positive but noted the UX for setting it up through the chatbot needs improvement - more helpful prompting or tooltips needed. QA testing of pricing logic is in progress.

# **11\. Action Items**

## **From Client Meeting (Apr 2, 2026)**

| **Owner**    | **Action**                                                                          | **Status**  |
| ------------ | ----------------------------------------------------------------------------------- | ----------- |
| **Dev team** | Build bilingual IsshoLife UI prototype (EN/JP)                                      | In progress |
| **Dev team** | Create policy/T&C placeholder pages (real URLs needed for SendGrid/Twilio)          | Pending     |
| **Maksym**   | Send Alistair link for SendGrid single email creation steps                         | Pending     |
| **Alistair** | Meet lawyers - clarify Japan legal requirements for T&C acceptance and audit trails | Scheduled   |
| **Alistair** | Test new pricing logic and provide feedback                                         | Pending     |
| **Maksym**   | Check Ihor's Sentry access - resend invite if blocked                               | Pending     |
| **Ihor**     | Test pricing logic before deployment                                                | Pending     |

## **Architecture Decisions - Confirmed**

- **Single platform strategy:** Trust is the core engine, IsshoLife and future marketplaces are front-end consumers
- **API integration (Option B):** confirmed by client and team
- **Time management pivot:** Trust handles any time-based service, not just property

## **Architecture Decisions - Still Open**

- Auth strategy: shared user pool or separate accounts with on-demand linking?
- Trust level treatment for IsshoLife members (public tier? default lowest? none?)
- Which Trust API endpoints need to be built/exposed first?
- Japan compliance specifics (pending lawyer meeting)