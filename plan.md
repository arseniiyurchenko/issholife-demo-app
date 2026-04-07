# IsshoLife Demo — Client Feedback Action Plan



## Context



Client (Al) reviewed the demo app and flagged three critical issues stemming from Japan's transport regulations:

1. **Transport is leaking into event/listing UI** — must be completely invisible before and during joining

2. **Event/meetup creation path is buried** — no discoverable entry point in the UI

3. **Missing "Tour/Package" tier** — licensed partners need a distinct bundled-product mode



The core principle: IsshoLife sells **participation in activities** and enables **coordination**. It does NOT sell transport. Transport must never exist as a visible product, feature, or selectable option in event context.



---



## Action 1: Remove Transport from Listing & Join Screens



**Goal:** Transport must not exist in any form on listing detail or join flow. Users join an activity at a location. Transport coordination happens only AFTER joining, in separate tools.



### Files to modify:



**`src/modules/screens/issholife/public/ListingDetailPublicScreen.tsx`**

- Remove the locked "Transport" section entirely (lines showing Bus icon, organizer transport note)

- Keep: About, Organizer, Join CTA sections



**`src/modules/screens/issholife/member/ListingDetailMemberScreen.tsx`**

- Remove the Transport section (Bus icon, "Organizer provides transport", transport note display)

- Remove the embedded Ride Share Pool expansion within listing detail

- Remove RidePoolCard imports and usage

- Keep: About, Organizer, Join button, Event Chat



**`src/modules/screens/issholife/components/JoinSheet.tsx`**

- Remove transport selection step entirely (Bus/Car/PersonStanding options)

- Join flow becomes: tap "Join" → identity reveal notice → "Confirm — Going" → done

- After joining, user gets access to ride share and chat as separate navigation items

- Remove stay recommendation from join sheet (stays are browsed separately)



**`src/modules/screens/issholife/member/JoinFlowScreen.tsx`**

- Remove transport option selection (the three choices)

- Simplify to: activity confirmation + identity reveal notice + confirm button



**`src/modules/core/issholife-data.ts`**

- Remove `transport: TransportMode` and `transportNote` fields from Listing interface

- Remove `TransportMode` type

- Update LISTINGS mock data to remove transport fields



**`src/modules/screens/issholife/issholife-context.tsx`**

- Remove `JoinTransportKey` type

- Remove `transport` field from `ListingParticipation`

- Simplify `joinListing()` to not accept transport parameter



**`src/modules/core/i18n-dictionary.ts`**

- Remove/repurpose: `listing.transport`, `listing.organizerProvides`, `listing.selfOrganized`

- Remove: `join.howGettingThere`, `join.organizerTransport`

- Keep: `join.rideShare`, `join.onMyOwn` (may be useful elsewhere)



**`src/modules/screens/issholife/member/GoingTabScreen.tsx`**

- Remove transport note display from joined listing cards



### Ride Share remains but FULLY SEPARATE:

- `/screens/member/rideshare` — standalone, not embedded in listings

- `/screens/member/rideshare/:id` — standalone detail

- Accessible from bottom nav or Going tab, NEVER from listing detail

- Add prominent disclaimer: "Independent coordination tool. Not part of any event or service."



---



## Action 2: Make Event/Meetup Creation Prominent



**Goal:** Creating community events must be a primary, easily discoverable action.



### Files to modify:



**`src/modules/screens/issholife/components/IsshoLifeLayout.tsx`**

- Add a floating action button (FAB) in bottom-right corner: Plus icon

- FAB links to `/screens/member/create`

- Only visible when `!isPublic` (member view)



**`src/modules/screens/issholife/member/AreaFeedMemberScreen.tsx`**

- Add a "Create Event" CTA card at the top of the feed or as an empty-state prompt

- Could be: banner card saying "Organize something? Create a meetup or activity"



**`src/modules/screens/issholife/components/FeedTabs.tsx`** (or bottom nav)

- Consider adding Create as a 4th tab or prominent icon in the header

- Alternative: keep 3 tabs (Discover/Going/Stay) but add FAB overlay



**`src/modules/screens/issholife/member/CommunityCreateScreen.tsx`**

- Review and enhance the creation form

- Add clearer step-by-step flow

- Ensure location/meeting point is prominent (this is what users commit to)

- Add "Activity" type alongside Meetup (already there, verify prominence)



---



## Action 3: Add "Tour" Product Tier for Licensed Partners



**Goal:** Licensed travel agency partners can create bundled packages (activity + transport + accommodation) as a visually distinct product type.



### Files to modify:



**`src/index.css`**

- Add Tour color variables:

  ```

  --il-tour: oklch(0.55 0.15 35);

  --il-tour-bg: oklch(0.95 0.04 35);

  ```



**`src/modules/core/issholife-data.ts`**

- Add `"tour"` to `ListingType`: `"community" | "pro" | "tour"`

- Add `"Package"` to `ListingSub`

- Add tour-specific fields to Listing interface:

  - `includesTransport?: boolean`

  - `includesAccommodation?: boolean`

  - `tourPrice?: string` (single bundled price)

  - `tourDuration?: string` (e.g., "3 days / 2 nights")

  - `licensedBy?: string` (agency name)

- Add 1-2 sample tour listings to LISTINGS array (e.g., "3-Day Powder Experience")



**`src/modules/screens/issholife/components/Badge.tsx`**

- Add `"tour"` type with warm gold/orange styling

- Sub-label: "Licensed Package" or "Tour"



**`src/modules/screens/issholife/components/ListingCard.tsx`**

- Tour cards show bundled indicators: "Includes transport", "Includes stay"

- Display single bundled price

- Tour badge is visually distinct (different from community/pro)



### New screens to create:



**`src/modules/screens/issholife/member/TourDetailScreen.tsx`**

- New route: `/screens/member/tour/:id`

- Shows: full itinerary, bundled inclusions (transport, accommodation, meals, guide)

- Single price, single "Book" CTA (not "Join")

- Licensed partner badge with agency name

- Clear visual differentiation from community/pro listings

- This is the ONLY place where transport can be explicitly shown and described



**`src/modules/screens/issholife/public/TourDetailPublicScreen.tsx`**

- Public teaser version with locked booking

- Can show transport/accommodation as included (this is legal for licensed tours)



**`src/modules/screens/issholife/partner/PartnerTourCreateScreen.tsx`**

- Tour creation form for licensed partners

- Fields: title, itinerary, duration, inclusions (transport, accommodation, meals, guide)

- License verification section

- Single bundled price

- Route: `/screens/partner/create-tour`



### Files to update:



**`src/modules/screens/issholife/partner/PartnerDashboardScreen.tsx`**

- Add Tour listings section or tab alongside existing pro listings

- Show license status badge



**`src/modules/screens/issholife/partner/PartnerListingCreateScreen.tsx`**

- Add third option: "Tour Package" alongside Experience and Offer

- When selected, redirect to PartnerTourCreateScreen or expand form



**`src/modules/screens/issholife/member/AreaFeedMemberScreen.tsx`**

- Tour listings appear in the Discover feed with distinct Tour badge

- Visually separated or clearly distinguished



**`src/App.tsx`**

- Add routes: `/screens/member/tour/:id`, `/screens/public/tour/:id`, `/screens/partner/create-tour`



**`src/modules/core/components/ScreensIndexPage.tsx`**

- Add tour screens to the index



---



## Action 4: Update Wording Throughout



**Goal:** Ensure no UI text implies transport-as-product anywhere except Tour listings.



### Key wording rules:

- Never: "transport included", "we take you", "transport is provided"

- For community/pro: "Meet at [location]", "Join the activity"

- For organizer logistics (guide driving to trailhead): not shown in UI at all

- Ride share: "Independent coordination between members. Cost-split only."

- Tour listings ONLY: "Includes transport" is allowed because licensed entity is responsible



### Files to review:

- All i18n dictionary entries related to transport

- Listing detail screens

- Join flow wording

- Ride share disclaimers (strengthen anti-grey-taxi language)



---



## Action 5: Update BRD Popup Content



**`src/modules/core/requirements-feature-links.ts`**

- Add entries for new Tour screens

- Update existing entries to reflect transport separation

- Note regulatory context in relevant BRD popup text



---



## Verification



1. `tsc --noEmit` — zero errors

2. `vite build` — clean production build

3. **Listing detail screens** (public + member): zero transport mentions

4. **Join flow**: no transport selection step — just "Join" → confirm

5. **Ride share**: fully separate navigation, not embedded in listings

6. **Create event**: accessible via FAB or prominent CTA from feed

7. **Tour listings**: visibly distinct badge/card, show bundled inclusions including transport

8. **All 30+ screens** render without errors (27 existing + 3 new tour screens)

9. **Language toggle** works on new/modified screens

10. **Public/Member toggle** correctly gates content

