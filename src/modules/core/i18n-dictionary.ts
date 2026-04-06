export type Lang = "en" | "ja" | "th";

type Entry = { en: string; ja: string; th: string };

export const dictionary: Record<string, Entry> = {
  // App
  "app.name": { en: "IsshoLife", ja: "IsshoLife", th: "IsshoLife" },
  "layout.productNav": {
    en: "Navigation",
    ja: "ナビゲーション",
    th: "การนำทาง",
  },
  "app.tagline": { en: "Discover. Join. Go together.", ja: "発見。参加。一緒に。", th: "ค้นหา เข้าร่วม ไปด้วยกัน" },

  // Auth
  "auth.signIn": { en: "Sign in", ja: "サインイン", th: "เข้าสู่ระบบ" },
  "auth.email": { en: "Email", ja: "メール", th: "อีเมล" },
  "auth.sendMagicLink": { en: "Send Magic Link", ja: "マジックリンク送信", th: "ส่งเมจิกลิงก์" },
  "auth.checkEmail": { en: "Check your email", ja: "メールをご確認ください", th: "ตรวจสอบอีเมลของคุณ" },
  "auth.magicLinkSent": { en: "Magic link sent. Click to sign in.", ja: "マジックリンクを送信しました。", th: "ส่งเมจิกลิงก์แล้ว กดเพื่อลงชื่อเข้าใช้" },
  "auth.simulateOpen": { en: "Simulate: Open Link", ja: "リンクを開く（シミュレーション）", th: "จำลอง: เปิดลิงก์" },
  "auth.expires": { en: "Expires in 10 min", ja: "10分で期限切れ", th: "หมดอายุใน 10 นาที" },
  "auth.inviteOnly": { en: "Invite-only platform. Use the email your invitation was sent to.", ja: "招待制プラットフォーム。招待メールのアドレスをご使用ください。", th: "แพลตฟอร์มสำหรับผู้ได้รับเชิญเท่านั้น กรุณาใช้อีเมลที่ได้รับคำเชิญ" },
  "auth.noPassword": { en: "Enter your email for a magic link. No password needed.", ja: "メールアドレスでマジックリンクを受信。パスワード不要。", th: "กรอกอีเมลเพื่อรับเมจิกลิงก์ ไม่ต้องใช้รหัสผ่าน" },
  "auth.agreeTerms": { en: "I agree to the", ja: "", th: "ฉันยอมรับ" },
  "auth.terms": { en: "Terms & Conditions", ja: "利用規約", th: "ข้อกำหนดและเงื่อนไข" },
  "auth.and": { en: "and", ja: "と", th: "และ" },
  "auth.privacy": { en: "Privacy Policy", ja: "プライバシーポリシー", th: "นโยบายความเป็นส่วนตัว" },
  "auth.agreeTermsSuffix": { en: "", ja: "に同意", th: "" },
  "auth.joinToSend": { en: "Join to send your question", ja: "質問を送信するにはログイン", th: "เข้าร่วมเพื่อส่งคำถามของคุณ" },

  // Feed & Discovery
  "feed.discover": { en: "Discover", ja: "発見", th: "ค้นพบ" },
  "feed.going": { en: "Going", ja: "参加予定", th: "กำลังไป" },
  "feed.stay": { en: "Stay", ja: "宿泊", th: "ที่พัก" },
  "feed.rides": { en: "Rides", ja: "ライド", th: "เดินทาง" },
  "feed.allAreas": { en: "All Areas", ja: "全エリア", th: "ทุกพื้นที่" },
  "feed.allActivities": { en: "All Activities", ja: "全カテゴリ", th: "ทุกกิจกรรม" },
  "feed.noMatches": { en: "No matches", ja: "該当なし", th: "ไม่พบรายการที่ตรงกัน" },
  "feed.noEventsYet": { en: "No events yet", ja: "まだイベントがありません", th: "ยังไม่มีอีเวนต์" },
  "feed.browseToJoin": { en: "Browse Discover and join an event!", ja: "発見タブからイベントに参加しましょう！", th: "ดูหน้า Discover แล้วเข้าร่วมอีเวนต์กัน!" },
  "feed.stayDescription": { en: "Accommodation from Trust network. Tap to book.", ja: "Trustネットワークの宿泊施設。タップで予約。", th: "ที่พักจากเครือข่าย Trust แตะเพื่อจอง" },

  // Listing
  "listing.about": { en: "About", ja: "概要", th: "เกี่ยวกับ" },
  "listing.transport": { en: "Transport", ja: "交通", th: "การเดินทาง" },
  "listing.organizer": { en: "Organizer", ja: "主催者", th: "ผู้จัด" },
  "listing.organizerProvides": { en: "Organizer provides transport", ja: "主催者が交通手段を提供", th: "ผู้จัดมีบริการเดินทาง" },
  "listing.selfOrganized": { en: "Self-organized", ja: "自己手配", th: "จัดการเอง" },
  "listing.verified": { en: "Verified", ja: "認証済", th: "ยืนยันแล้ว" },
  "listing.askPartner": { en: "Ask in Partner Q&A", ja: "パートナーQ&Aで質問", th: "ถามใน Q&A ของพาร์ทเนอร์" },

  // Join
  "join.joinEvent": { en: "Join This Event", ja: "このイベントに参加", th: "เข้าร่วมอีเวนต์นี้" },
  "join.unlockToJoin": { en: "Unlock to Join", ja: "アンロックして参加", th: "ปลดล็อกเพื่อเข้าร่วม" },
  "join.youreGoing": { en: "You're Going!", ja: "参加確定！", th: "คุณเข้าร่วมแล้ว!" },
  "join.howGettingThere": { en: "How are you getting there?", ja: "交通手段を選択", th: "คุณจะเดินทางอย่างไร?" },
  "join.confirm": { en: "Confirm — Going", ja: "確定", th: "ยืนยัน — ไป" },
  "join.identityReveal": { en: "Your identity will be revealed to other participants after joining", ja: "参加後に他の参加者にIDが公開されます", th: "หลังเข้าร่วม ตัวตนของคุณจะแสดงแก่ผู้เข้าร่วมคนอื่น" },
  "join.organizerTransport": { en: "Organizer transport", ja: "主催者の交通", th: "การเดินทางของผู้จัด" },
  "join.rideShare": { en: "Ride share", ja: "ライドシェア", th: "แชร์รถ" },
  "join.onMyOwn": { en: "On my own", ja: "自分で移動", th: "เดินทางเอง" },
  "join.goingCount": { en: "going", ja: "参加", th: "ไป" },

  // Ride Share
  "ride.pool": { en: "Ride Share Pool", ja: "ライドシェアプール", th: "กลุ่มแชร์รถ" },
  "ride.costSplitOnly": { en: "Cost-split only — no profit allowed", ja: "割り勘のみ — 営利目的禁止", th: "แชร์ค่าใช้จ่ายเท่านั้น — ห้ามแสวงหากำไร" },
  "ride.costSplit": { en: "cost-split", ja: "割り勘", th: "แชร์ค่าใช้จ่าย" },
  "ride.seats": { en: "seats", ja: "席", th: "ที่นั่ง" },
  "ride.rides": { en: "rides", ja: "台", th: "เที่ยวรถ" },
  "ride.createRide": { en: "Create Ride", ja: "ライドを作成", th: "สร้างเที่ยวรถ" },
  "ride.ridesAvailable": { en: "rides available", ja: "台利用可能", th: "เที่ยวรถที่พร้อมให้ใช้" },
  "ride.myRides": { en: "My Rides", ja: "マイライド", th: "เที่ยวรถของฉัน" },
  "ride.noRequestedRides": {
    en: "No requested rides yet. Send a request from the pool to see them here.",
    ja: "まだリクエストしたライドはありません。プールからリクエストするとここに表示されます。",
    th: "ยังไม่มีเที่ยวรถที่ขอเข้าร่วม ส่งคำขอจากรายการในพูลแล้วจะแสดงที่นี่",
  },
  "ride.requestToJoin": { en: "Request to Join", ja: "参加をリクエスト", th: "ส่งคำขอเข้าร่วม" },
  "ride.requestSent": { en: "Request Sent", ja: "リクエスト送信済み", th: "ส่งคำขอแล้ว" },
  "ride.statusNone": { en: "Not requested", ja: "未リクエスト", th: "ยังไม่ส่งคำขอ" },
  "ride.statusRequested": { en: "Requested", ja: "リクエスト済み", th: "ส่งคำขอแล้ว" },
  "ride.statusConfirmed": { en: "Confirmed", ja: "確定", th: "ยืนยันแล้ว" },
  "ride.chatWithDriver": { en: "Chat with driver", ja: "ドライバーとチャット", th: "แชทกับคนขับ" },

  // Chat
  "chat.eventChat": { en: "Event Chat", ja: "イベントチャット", th: "แชทอีเวนต์" },
  "chat.openChat": { en: "Event Chat", ja: "チャット", th: "แชทอีเวนต์" },
  "chat.closeChat": { en: "Close Chat", ja: "閉じる", th: "ปิดแชท" },
  "chat.noMessages": { en: "No messages yet", ja: "メッセージはまだありません", th: "ยังไม่มีข้อความ" },
  "chat.placeholder": { en: "Message...", ja: "メッセージ...", th: "ข้อความ..." },
  "chat.send": { en: "Send", ja: "送信", th: "ส่ง" },
  "chat.announcements": { en: "Announcements", ja: "お知らせ", th: "ประกาศ" },
  "chat.logistics": { en: "Logistics", ja: "連絡", th: "การจัดการ" },

  // Stay
  "stay.bookOnTrust": { en: "Book on Trust", ja: "Trustで予約", th: "จองบน Trust" },
  "stay.pricing": { en: "Pricing", ja: "料金", th: "ราคา" },
  "stay.rooms": { en: "rooms", ja: "部屋", th: "ห้อง" },
  "stay.nights": { en: "nights", ja: "泊", th: "คืน" },
  "stay.checkIn": { en: "Check-in", ja: "チェックイン", th: "เช็กอิน" },
  "stay.checkOut": { en: "Check-out", ja: "チェックアウト", th: "เช็กเอาต์" },
  "stay.total": { en: "Total", ja: "合計", th: "รวม" },
  "stay.requestBooking": { en: "Request Booking", ja: "予約リクエスト", th: "ส่งคำขอจอง" },
  "stay.connecting": { en: "Connecting to Trust...", ja: "Trustに接続中...", th: "กำลังเชื่อมต่อกับ Trust..." },
  "stay.settingUp": { en: "Setting up your account", ja: "アカウント設定中", th: "กำลังตั้งค่าบัญชีของคุณ" },
  "stay.linked": { en: "IsshoLife account linked. Booking as guest.", ja: "アカウントリンク済。ゲストとして予約。", th: "เชื่อมบัญชี IsshoLife แล้ว กำลังจองในฐานะแขก" },

  // Partner
  "partner.dashboard": { en: "Partner Dashboard", ja: "パートナーダッシュボード", th: "แดชบอร์ดพาร์ทเนอร์" },
  "partner.createListing": { en: "Create Listing", ja: "リスティングを作成", th: "สร้างรายการ" },
  "partner.qaInbox": { en: "Q&A Inbox", ja: "Q&A受信箱", th: "กล่องข้อความ Q&A" },
  "partner.incomingQuestions": { en: "Incoming Questions", ja: "受信した質問", th: "คำถามที่เข้ามา" },
  "partner.approveAI": { en: "Approve AI Answer", ja: "AI回答を承認", th: "อนุมัติคำตอบจาก AI" },
  "partner.reply": { en: "Reply", ja: "返信", th: "ตอบกลับ" },
  "partner.availability": { en: "Availability", ja: "利用可能状態", th: "สถานะพร้อมให้บริการ" },
  "partner.on": { en: "On", ja: "オン", th: "เปิด" },
  "partner.off": { en: "Off", ja: "オフ", th: "ปิด" },
  "partner.experience": { en: "Experience", ja: "体験", th: "ประสบการณ์" },
  "partner.offer": { en: "Offer", ja: "オファー", th: "ข้อเสนอ" },
  "partner.starter": { en: "Starter", ja: "スターター", th: "เริ่มต้น" },
  "partner.growth": { en: "Growth", ja: "グロース", th: "เติบโต" },
  "partner.pro": { en: "Pro", ja: "プロ", th: "โปร" },

  // Admin
  "admin.console": { en: "Admin Console", ja: "管理コンソール", th: "คอนโซลแอดมิน" },
  "admin.verification": { en: "Verification", ja: "認証管理", th: "การยืนยัน" },
  "admin.moderation": { en: "Moderation", ja: "モデレーション", th: "การดูแลเนื้อหา" },
  "admin.entitlements": { en: "Entitlements", ja: "権限管理", th: "สิทธิ์การใช้งาน" },
  "admin.featureToggles": { en: "Feature Toggles", ja: "機能トグル", th: "สวิตช์ฟีเจอร์" },
  "admin.taxonomy": { en: "Taxonomy", ja: "タクソノミー", th: "อนุกรมหมวดหมู่" },

  // Community Create
  "create.title": { en: "Create Listing", ja: "リスティングを作成", th: "สร้างรายการ" },
  "create.meetup": { en: "Meetup", ja: "ミートアップ", th: "มีตอัป" },
  "create.activity": { en: "Activity", ja: "アクティビティ", th: "กิจกรรม" },
  "create.recommendation": { en: "Recommendation", ja: "リコメンデーション", th: "คำแนะนำ" },

  // Following
  "following.title": { en: "Following", ja: "フォロー中", th: "กำลังติดตาม" },
  "following.areas": { en: "Areas", ja: "エリア", th: "พื้นที่" },
  "following.interests": { en: "Interests", ja: "興味", th: "ความสนใจ" },
  "following.partners": { en: "Partners", ja: "パートナー", th: "พาร์ทเนอร์" },

  // Policy
  "policy.terms": { en: "Terms & Conditions", ja: "利用規約", th: "ข้อกำหนดและเงื่อนไข" },
  "policy.privacy": { en: "Privacy Policy", ja: "プライバシーポリシー", th: "นโยบายความเป็นส่วนตัว" },
  "policy.accept": { en: "I Accept", ja: "同意する", th: "ฉันยอมรับ" },

  // Common
  "common.back": { en: "Back", ja: "戻る", th: "ย้อนกลับ" },
  "common.close": { en: "Close", ja: "閉じる", th: "ปิด" },
  "common.all": { en: "All", ja: "すべて", th: "ทั้งหมด" },
  "common.search": { en: "Search...", ja: "検索...", th: "ค้นหา..." },
  "common.public": { en: "Public", ja: "パブリック", th: "สาธารณะ" },
  "common.member": { en: "Member", ja: "メンバー", th: "สมาชิก" },
  "common.attendees": { en: "Attendees", ja: "参加者", th: "ผู้เข้าร่วม" },
  "common.messages": { en: "Messages", ja: "メッセージ", th: "ข้อความ" },
  "common.community": { en: "Community", ja: "コミュニティ", th: "ชุมชน" },
  "common.pro": { en: "Pro", ja: "プロ", th: "โปร" },
  "common.unlockFree": { en: "Unlock — Free", ja: "アンロック — 無料", th: "ปลดล็อก — ฟรี" },
  "common.signInViaMagicLink": { en: "Sign in via magic link", ja: "マジックリンクでサインイン", th: "ลงชื่อเข้าใช้ด้วยเมจิกลิงก์" },
};
