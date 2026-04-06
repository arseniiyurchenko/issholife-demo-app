import { useI18n } from "@/modules/core/i18n";
import { ScreenHint } from "@/modules/core/components/ScreenHint";
import { BackendHintButton } from "@/modules/core/components/BackendHintButton";
import { IsshoLifeLayout } from "../components/IsshoLifeLayout";

const SECTIONS = [
  { title: "1. Information We Collect", body: "We collect your email address for authentication, profile information you provide (name, interests, area preferences), event participation data, and ride share coordination details. We do not collect passwords as we use magic-link authentication." },
  { title: "2. How We Use Your Information", body: "Your data is used to personalize your feed, coordinate event logistics, facilitate ride sharing, enable partner Q&A, and improve platform features. We use aggregated, anonymized data for analytics and feed ranking." },
  { title: "3. Identity & Participation", body: "Your identity is revealed to other participants only after you join an event. Public profile information is limited to your display name. Organizers see participant details for logistics purposes. Partners see anonymized question data unless you choose to identify yourself." },
  { title: "4. Data Sharing", body: "We share necessary booking data with Trust platform for accommodation requests. Partner businesses receive relevant participant information for confirmed bookings. We do not sell personal data to third parties." },
  { title: "5. Data Retention", body: "Account data is retained while your account is active. Event participation history is kept for 24 months. Chat messages are retained for the duration of the event plus 30 days. You may request data export or deletion at any time." },
  { title: "6. Cookies & Local Storage", body: "We use essential cookies for authentication session management. Local storage is used for language preferences and UI state. We do not use third-party tracking cookies." },
  { title: "7. Your Rights", body: "You may access, correct, or delete your personal data. You may opt out of non-essential communications. You may request a copy of your data in portable format. Contact privacy@issholife.jp for any privacy-related requests." },
  { title: "8. Security", body: "We use industry-standard encryption for data in transit and at rest. Magic-link authentication eliminates password-related vulnerabilities. Access to personal data is restricted to authorized personnel only." },
];

export function PrivacyPolicyScreen() {
  const { t } = useI18n();

  return (
    <IsshoLifeLayout>
      <div className="p-6">
        <h1 className="mb-1 text-xl font-bold text-foreground">{t("policy.privacy")}</h1>
        <p className="mb-6 text-sm text-muted-foreground">Last updated: April 2025</p>

        <div className="space-y-5">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="mb-1.5 text-sm font-bold text-foreground">{s.title}</h2>
              <p className="text-xs leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
      <ScreenHint title="Privacy Policy" description="Privacy policy covering data collection, identity reveal rules, Trust integration data sharing, and user rights." />
    </IsshoLifeLayout>
  );
}
