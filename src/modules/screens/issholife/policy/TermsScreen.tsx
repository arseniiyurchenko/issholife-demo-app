import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { useBackendHints } from "@/modules/core/backend-hints";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";

const SECTIONS = [
  { title: "1. Acceptance of Terms", body: "By accessing or using the IsshoLife platform, you agree to be bound by these Terms & Conditions. If you do not agree, you may not use the service. IsshoLife reserves the right to update these terms at any time with notice to users." },
  { title: "2. Account & Authentication", body: "Accounts are created via magic-link email authentication. You are responsible for maintaining access to your registered email. Each account is personal and non-transferable. IsshoLife operates on an invite-only basis during early access." },
  { title: "3. Community Guidelines", body: "Members must act respectfully, honestly, and in good faith. Off-platform transactions, spam, harassment, and misrepresentation are prohibited. Organizers must provide accurate event information. Partners must hold valid business credentials." },
  { title: "4. Ride Share Policy", body: "Ride share is strictly cost-split only. Commercial transport services are prohibited. Drivers must hold valid insurance and licenses. IsshoLife is not a transportation provider and bears no liability for ride share arrangements between members." },
  { title: "5. Content & Intellectual Property", body: "Users retain ownership of content they post. By posting, you grant IsshoLife a non-exclusive license to display and distribute content within the platform. IsshoLife may remove content that violates community guidelines." },
  { title: "6. Partner Terms", body: "Partners operating at Starter, Growth, or Pro levels agree to IsshoLife's commission structure and quality standards. Partner verification requires valid business documentation. Listings must accurately represent services offered." },
  { title: "7. Trust Integration", body: "Accommodation bookings are processed through the Trust platform via API integration. IsshoLife facilitates discovery; booking terms are governed by Trust's separate terms of service." },
  { title: "8. Limitation of Liability", body: "IsshoLife provides a coordination platform and does not guarantee the quality, safety, or legality of listed events, services, or accommodations. Users participate at their own risk." },
];

export function TermsScreen() {
  const { t } = useI18n();
  const hints = useBackendHints();

  return (
    <IsshoLifeLayout>
      <div className="p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">{t("policy.terms")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">Last updated: April 2025</p>

        <div className="space-y-5">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="mb-1.5 text-sm font-bold text-foreground">{s.title}</h2>
              <p className="text-xs leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => hints.push("Terms accepted. Preference stored in user profile.")}
          className="mt-8 w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground"
        >
          {t("policy.accept")}
        </button>
      </div>
      <ScreenHint title="Terms & Conditions" description="Platform terms covering community guidelines, ride share policy, partner terms, and Trust integration terms." />
      <BackendHintButton />
    </IsshoLifeLayout>
  );
}
