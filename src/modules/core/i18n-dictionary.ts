export type Lang = "en" | "ja";

type Entry = { en: string; ja: string };

export const dictionary: Record<string, Entry> = {
  // App
  "app.name": { en: "IsshoLife", ja: "IsshoLife" },
  "app.tagline": { en: "Discover. Join. Go together.", ja: "発見。参加。一緒に。" },

  // Auth
  "auth.signIn": { en: "Sign in", ja: "サインイン" },
  "auth.email": { en: "Email", ja: "メール" },
  "auth.sendMagicLink": { en: "Send Magic Link", ja: "マジックリンク送信" },
  "auth.checkEmail": { en: "Check your email", ja: "メールをご確認ください" },
  "auth.magicLinkSent": { en: "Magic link sent. Click to sign in.", ja: "マジックリンクを送信しました。" },
  "auth.simulateOpen": { en: "Simulate: Open Link", ja: "リンクを開く（シミュレーション）" },
  "auth.expires": { en: "Expires in 10 min", ja: "10分で期限切れ" },
  "auth.inviteOnly": { en: "Invite-only platform. Use the email your invitation was sent to.", ja: "招待制プラットフォーム。招待メールのアドレスをご使用ください。" },
  "auth.noPassword": { en: "Enter your email for a magic link. No password needed.", ja: "メールアドレスでマジックリンクを受信。パスワード不要。" },
  "auth.agreeTerms": { en: "I agree to the", ja: "" },
  "auth.terms": { en: "Terms & Conditions", ja: "利用規約" },
  "auth.and": { en: "and", ja: "と" },
  "auth.privacy": { en: "Privacy Policy", ja: "プライバシーポリシー" },
  "auth.agreeTermsSuffix": { en: "", ja: "に同意" },
  "auth.joinToSend": { en: "Join to send your question", ja: "質問を送信するにはログイン" },

  // Feed & Discovery
  "feed.discover": { en: "Discover", ja: "発見" },
  "feed.going": { en: "Going", ja: "参加予定" },
  "feed.stay": { en: "Stay", ja: "宿泊" },
  "feed.allAreas": { en: "All Areas", ja: "全エリア" },
  "feed.allActivities": { en: "All Activities", ja: "全カテゴリ" },
  "feed.noMatches": { en: "No matches", ja: "該当なし" },
  "feed.noEventsYet": { en: "No events yet", ja: "まだイベントがありません" },
  "feed.browseToJoin": { en: "Browse Discover and join an event!", ja: "発見タブからイベントに参加しましょう！" },
  "feed.stayDescription": { en: "Accommodation from Trust network. Tap to book.", ja: "Trustネットワークの宿泊施設。タップで予約。" },

  // Listing
  "listing.about": { en: "About", ja: "概要" },
  "listing.transport": { en: "Transport", ja: "交通" },
  "listing.organizer": { en: "Organizer", ja: "主催者" },
  "listing.organizerProvides": { en: "Organizer provides transport", ja: "主催者が交通手段を提供" },
  "listing.selfOrganized": { en: "Self-organized", ja: "自己手配" },
  "listing.verified": { en: "Verified", ja: "認証済" },
  "listing.askPartner": { en: "Ask in Partner Q&A", ja: "パートナーQ&Aで質問" },

  // Join
  "join.joinEvent": { en: "Join This Event", ja: "このイベントに参加" },
  "join.unlockToJoin": { en: "Unlock to Join", ja: "アンロックして参加" },
  "join.youreGoing": { en: "You're Going!", ja: "参加確定！" },
  "join.howGettingThere": { en: "How are you getting there?", ja: "交通手段を選択" },
  "join.confirm": { en: "Confirm — Going", ja: "確定" },
  "join.identityReveal": { en: "Your identity will be revealed to other participants after joining", ja: "参加後に他の参加者にIDが公開されます" },
  "join.organizerTransport": { en: "Organizer transport", ja: "主催者の交通" },
  "join.rideShare": { en: "Ride share", ja: "ライドシェア" },
  "join.onMyOwn": { en: "On my own", ja: "自分で移動" },
  "join.goingCount": { en: "going", ja: "参加" },

  // Ride Share
  "ride.pool": { en: "Ride Share Pool", ja: "ライドシェアプール" },
  "ride.costSplitOnly": { en: "Cost-split only — no profit allowed", ja: "割り勘のみ — 営利目的禁止" },
  "ride.costSplit": { en: "cost-split", ja: "割り勘" },
  "ride.seats": { en: "seats", ja: "席" },
  "ride.rides": { en: "rides", ja: "台" },
  "ride.createRide": { en: "Create Ride", ja: "ライドを作成" },
  "ride.ridesAvailable": { en: "rides available", ja: "台利用可能" },

  // Chat
  "chat.eventChat": { en: "Event Chat", ja: "イベントチャット" },
  "chat.openChat": { en: "Event Chat", ja: "チャット" },
  "chat.closeChat": { en: "Close Chat", ja: "閉じる" },
  "chat.noMessages": { en: "No messages yet", ja: "メッセージはまだありません" },
  "chat.placeholder": { en: "Message...", ja: "メッセージ..." },
  "chat.send": { en: "Send", ja: "送信" },
  "chat.announcements": { en: "Announcements", ja: "お知らせ" },
  "chat.logistics": { en: "Logistics", ja: "連絡" },

  // Stay
  "stay.bookOnTrust": { en: "Book on Trust", ja: "Trustで予約" },
  "stay.pricing": { en: "Pricing", ja: "料金" },
  "stay.rooms": { en: "rooms", ja: "部屋" },
  "stay.nights": { en: "nights", ja: "泊" },
  "stay.checkIn": { en: "Check-in", ja: "チェックイン" },
  "stay.checkOut": { en: "Check-out", ja: "チェックアウト" },
  "stay.total": { en: "Total", ja: "合計" },
  "stay.requestBooking": { en: "Request Booking", ja: "予約リクエスト" },
  "stay.connecting": { en: "Connecting to Trust...", ja: "Trustに接続中..." },
  "stay.settingUp": { en: "Setting up your account", ja: "アカウント設定中" },
  "stay.linked": { en: "IsshoLife account linked. Booking as guest.", ja: "アカウントリンク済。ゲストとして予約。" },

  // Partner
  "partner.dashboard": { en: "Partner Dashboard", ja: "パートナーダッシュボード" },
  "partner.createListing": { en: "Create Listing", ja: "リスティングを作成" },
  "partner.qaInbox": { en: "Q&A Inbox", ja: "Q&A受信箱" },
  "partner.incomingQuestions": { en: "Incoming Questions", ja: "受信した質問" },
  "partner.approveAI": { en: "Approve AI Answer", ja: "AI回答を承認" },
  "partner.reply": { en: "Reply", ja: "返信" },
  "partner.availability": { en: "Availability", ja: "利用可能状態" },
  "partner.on": { en: "On", ja: "オン" },
  "partner.off": { en: "Off", ja: "オフ" },
  "partner.experience": { en: "Experience", ja: "体験" },
  "partner.offer": { en: "Offer", ja: "オファー" },
  "partner.starter": { en: "Starter", ja: "スターター" },
  "partner.growth": { en: "Growth", ja: "グロース" },
  "partner.pro": { en: "Pro", ja: "プロ" },

  // Admin
  "admin.console": { en: "Admin Console", ja: "管理コンソール" },
  "admin.verification": { en: "Verification", ja: "認証管理" },
  "admin.moderation": { en: "Moderation", ja: "モデレーション" },
  "admin.entitlements": { en: "Entitlements", ja: "権限管理" },
  "admin.featureToggles": { en: "Feature Toggles", ja: "機能トグル" },
  "admin.taxonomy": { en: "Taxonomy", ja: "タクソノミー" },

  // Community Create
  "create.title": { en: "Create Listing", ja: "リスティングを作成" },
  "create.meetup": { en: "Meetup", ja: "ミートアップ" },
  "create.activity": { en: "Activity", ja: "アクティビティ" },
  "create.recommendation": { en: "Recommendation", ja: "リコメンデーション" },

  // Following
  "following.title": { en: "Following", ja: "フォロー中" },
  "following.areas": { en: "Areas", ja: "エリア" },
  "following.interests": { en: "Interests", ja: "興味" },
  "following.partners": { en: "Partners", ja: "パートナー" },

  // Policy
  "policy.terms": { en: "Terms & Conditions", ja: "利用規約" },
  "policy.privacy": { en: "Privacy Policy", ja: "プライバシーポリシー" },
  "policy.accept": { en: "I Accept", ja: "同意する" },

  // Common
  "common.back": { en: "Back", ja: "戻る" },
  "common.close": { en: "Close", ja: "閉じる" },
  "common.all": { en: "All", ja: "すべて" },
  "common.search": { en: "Search...", ja: "検索..." },
  "common.public": { en: "Public", ja: "パブリック" },
  "common.member": { en: "Member", ja: "メンバー" },
  "common.attendees": { en: "Attendees", ja: "参加者" },
  "common.messages": { en: "Messages", ja: "メッセージ" },
  "common.community": { en: "Community", ja: "コミュニティ" },
  "common.pro": { en: "Pro", ja: "プロ" },
  "common.unlockFree": { en: "Unlock — Free", ja: "アンロック — 無料" },
  "common.signInViaMagicLink": { en: "Sign in via magic link", ja: "マジックリンクでサインイン" },
};
