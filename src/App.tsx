import { Route, Routes } from "react-router";
import { HomePage } from "@/modules/core/components/HomePage";
import { ScreensIndexPage } from "@/modules/core/components/ScreensIndexPage";

// Auth
import { SignInScreen } from "@/modules/screens/issholife/auth/SignInScreen";
import { MagicLinkVerifyScreen } from "@/modules/screens/issholife/auth/MagicLinkVerifyScreen";
import { JoinGateScreen } from "@/modules/screens/issholife/auth/JoinGateScreen";

// Public
import { AreaFeedPublicScreen } from "@/modules/screens/issholife/public/AreaFeedPublicScreen";
import { ListingDetailPublicScreen } from "@/modules/screens/issholife/public/ListingDetailPublicScreen";
import { StayBrowsePublicScreen } from "@/modules/screens/issholife/public/StayBrowsePublicScreen";
import { RideSharePublicScreen } from "@/modules/screens/issholife/public/RideSharePublicScreen";
import { GoingPublicScreen } from "@/modules/screens/issholife/public/GoingPublicScreen";
import { TourDetailPublicScreen } from "@/modules/screens/issholife/public/TourDetailPublicScreen";

// Member
import { AreaFeedMemberScreen } from "@/modules/screens/issholife/member/AreaFeedMemberScreen";
import { ListingDetailMemberScreen } from "@/modules/screens/issholife/member/ListingDetailMemberScreen";
import { JoinFlowScreen } from "@/modules/screens/issholife/member/JoinFlowScreen";
import { GoingTabScreen } from "@/modules/screens/issholife/member/GoingTabScreen";
import { StayMemberScreen } from "@/modules/screens/issholife/member/StayMemberScreen";
import { RideSharePoolScreen } from "@/modules/screens/issholife/member/RideSharePoolScreen";
import { RideShareDetailScreen } from "@/modules/screens/issholife/member/RideShareDetailScreen";
import { RideShareCreateScreen } from "@/modules/screens/issholife/member/RideShareCreateScreen";
import { PartnerQAThreadScreen } from "@/modules/screens/issholife/member/PartnerQAThreadScreen";
import { AskQuestionScreen } from "@/modules/screens/issholife/member/AskQuestionScreen";
import { FollowingScreen } from "@/modules/screens/issholife/member/FollowingScreen";
import { CommunityCreateScreen } from "@/modules/screens/issholife/member/CommunityCreateScreen";
import { TourDetailScreen } from "@/modules/screens/issholife/member/TourDetailScreen";
import { RequireAuth } from "@/modules/screens/issholife/components/RequireAuth";

// Partner
import { PartnerDashboardScreen } from "@/modules/screens/issholife/partner/PartnerDashboardScreen";
import { PartnerListingCreateScreen } from "@/modules/screens/issholife/partner/PartnerListingCreateScreen";
import { PartnerQAInboxScreen } from "@/modules/screens/issholife/partner/PartnerQAInboxScreen";
import { PartnerTourCreateScreen } from "@/modules/screens/issholife/partner/PartnerTourCreateScreen";

// Admin
import { AdminConsoleScreen } from "@/modules/screens/issholife/admin/AdminConsoleScreen";
import { AdminVerificationScreen } from "@/modules/screens/issholife/admin/AdminVerificationScreen";
import { AdminModerationScreen } from "@/modules/screens/issholife/admin/AdminModerationScreen";

// Policy
import { TermsScreen } from "@/modules/screens/issholife/policy/TermsScreen";
import { PrivacyPolicyScreen } from "@/modules/screens/issholife/policy/PrivacyPolicyScreen";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/screens" element={<ScreensIndexPage />} />

      {/* Auth */}
      <Route path="/screens/auth/sign-in" element={<SignInScreen />} />
      <Route path="/screens/auth/magic" element={<MagicLinkVerifyScreen />} />
      <Route path="/screens/auth/join-gate" element={<JoinGateScreen />} />

      {/* Public / Discovery */}
      <Route path="/screens/public/feed" element={<AreaFeedPublicScreen />} />
      <Route path="/screens/public/going" element={<GoingPublicScreen />} />
      <Route path="/screens/public/listing/:id" element={<ListingDetailPublicScreen />} />
      <Route path="/screens/public/tour/:id" element={<TourDetailPublicScreen />} />
      <Route path="/screens/public/stay" element={<StayBrowsePublicScreen />} />
      <Route path="/screens/public/rideshare" element={<RideSharePublicScreen />} />

      {/* Member */}
      <Route element={<RequireAuth />}>
        <Route path="/screens/member/feed" element={<AreaFeedMemberScreen />} />
        <Route path="/screens/member/listing/:id" element={<ListingDetailMemberScreen />} />
        <Route path="/screens/member/tour/:id" element={<TourDetailScreen />} />
        <Route path="/screens/member/join/:id" element={<JoinFlowScreen />} />
        <Route path="/screens/member/going" element={<GoingTabScreen />} />
        <Route path="/screens/member/stay" element={<StayMemberScreen />} />
        <Route path="/screens/member/rideshare" element={<RideSharePoolScreen />} />
        <Route path="/screens/member/rideshare/create" element={<RideShareCreateScreen />} />
        <Route path="/screens/member/rideshare/:id" element={<RideShareDetailScreen />} />
        <Route path="/screens/member/qa/:partnerId" element={<PartnerQAThreadScreen />} />
        <Route path="/screens/member/qa/ask" element={<AskQuestionScreen />} />
        <Route path="/screens/member/following" element={<FollowingScreen />} />
        <Route path="/screens/member/create" element={<CommunityCreateScreen />} />
      </Route>

      {/* Partner */}
      <Route path="/screens/partner" element={<PartnerDashboardScreen />} />
      <Route path="/screens/partner/create" element={<PartnerListingCreateScreen />} />
      <Route path="/screens/partner/create-tour" element={<PartnerTourCreateScreen />} />
      <Route path="/screens/partner/qa" element={<PartnerQAInboxScreen />} />

      {/* Admin */}
      <Route path="/screens/admin" element={<AdminConsoleScreen />} />
      <Route path="/screens/admin/verification" element={<AdminVerificationScreen />} />
      <Route path="/screens/admin/moderation" element={<AdminModerationScreen />} />

      {/* Policy */}
      <Route path="/screens/policy/terms" element={<TermsScreen />} />
      <Route path="/screens/policy/privacy" element={<PrivacyPolicyScreen />} />
    </Routes>
  );
}
