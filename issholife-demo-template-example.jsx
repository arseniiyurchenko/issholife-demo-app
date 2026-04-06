import { useState, useEffect, useRef } from "react";

const T = {
  bg: "#FAFAF7", surface: "#FFFFFF", muted: "#F3F1EC",
  border: "#E8E5DE", borderLight: "#F0EDE7",
  text: "#1A1A1A", textMid: "#555", textLight: "#999",
  community: "#2B7AE8", communityBg: "#EBF3FE",
  pro: "#7C3AED", proBg: "#F3EFFE",
  stay: "#0D9488", stayBg: "#E6F7F5",
  accent: "#E8723A", accentBg: "#FEF0E8",
  going: "#16A34A", goingBg: "#EDFCF2",
  trustDark: "#0B1220", trustGold: "#F2C46D",
};

const LISTINGS = [
  { id: 1, type: "community", sub: "Meetup", title: "Mt. Takao Sunrise Hike", area: "Tokyo", cat: "Hiking", date: "Apr 19", time: "5:30 AM", org: "Yuki M.", att: 8, max: 15, img: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80", desc: "Early morning hike up Mt. Takao for the sunrise. Trail 1, beginner-friendly. Bring headlamps and water.", transport: "organizer", transportNote: "Van from Shinjuku Station, 4:30 AM", tags: ["beginner", "sunrise", "group"], chat: [{ from: "Organizer", text: "📢 Meetup: Shinjuku South Exit, 4:30 AM. Green flag!", time: "2h ago", ann: true }, { from: "Kenji", text: "Konbini near the meetup point?", time: "1h ago", ann: false }, { from: "Organizer", text: "7-Eleven right at the exit.", time: "45m ago", ann: false }, { from: "Sara", text: "Bringing extra headlamps!", time: "30m ago", ann: false }] },
  { id: 2, type: "pro", sub: "Experience", title: "Hakone MTB Downhill", area: "Hakuba", cat: "Cycling", date: "Apr 26", time: "9:00 AM", org: "TrailBlaze JP", att: 4, max: 8, price: "¥12,000", img: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600&q=80", desc: "Full-day MTB through Hakone's forest trails. Includes bike, gear, lunch, and guide.", transport: "self", transportNote: null, tags: ["all-levels", "gear-included"], chat: [] },
  { id: 3, type: "community", sub: "Group Ride", title: "Tokyo Bay Cycling Loop", area: "Tokyo", cat: "Cycling", date: "Apr 20", time: "7:00 AM", org: "Kenji T.", att: 12, max: 20, img: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80", desc: "60km loop around Tokyo Bay. Road bikes recommended. Pace: 25-30km/h.", transport: "self", transportNote: null, tags: ["intermediate", "road-bike", "60km"], chat: [] },
  { id: 4, type: "pro", sub: "Offer", title: "Private Yoga + Forest Bath", area: "Kamakura", cat: "Yoga", date: "Apr 22", time: "10:00 AM", org: "Zen Garden Studio", att: 2, max: 6, price: "¥8,500", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80", desc: "90-min yoga in bamboo grove + guided forest bathing. Mats and tea included.", transport: "self", transportNote: null, tags: ["relaxation", "nature"], chat: [] },
  { id: 5, type: "community", sub: "Meetup", title: "Fuji Five Lakes Trail Run", area: "Fuji Five Lakes", cat: "Hiking", date: "May 3", time: "6:00 AM", org: "Masa R.", att: 6, max: 10, img: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&q=80", desc: "15km trail run around Lake Kawaguchi with Mt. Fuji views.", transport: "self", transportNote: null, tags: ["trail-run", "intermediate"], chat: [] },
];

const STAYS = [
  { id: 101, title: "Hakuba Mountain Lodge", area: "Hakuba", price: "¥9,800/night", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80", rating: 4.8, rooms: 3 },
  { id: 102, title: "Kamakura Beach House", area: "Kamakura", price: "¥12,500/night", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80", rating: 4.9, rooms: 2 },
  { id: 103, title: "Lake Kawaguchi Cabin", area: "Fuji Five Lakes", price: "¥8,200/night", img: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80", rating: 4.7, rooms: 4 },
];

const RIDES = [
  { id: 1, from: "Shinjuku", to: "Mt. Takao", seats: 3, taken: 1, cost: "¥350/person", time: "4:15 AM" },
  { id: 2, from: "Shibuya", to: "Mt. Takao", seats: 4, taken: 2, cost: "¥400/person", time: "4:00 AM" },
  { id: 3, from: "Tokyo Stn", to: "Mt. Takao", seats: 2, taken: 0, cost: "¥500/person", time: "4:30 AM" },
];

const AREAS = ["Tokyo", "Hakuba", "Niseko", "Fuji Five Lakes", "Kamakura", "Nagano", "Nozawa Onsen", "Myoko", "Karuizawa", "Shiga Kogen"];
const CATS = ["Hiking", "Cycling", "Skiing", "Snowboarding", "Surfing", "Yoga", "Food Tour", "Trail Run", "Climbing", "Kayaking"];

function Badge({ type, sub }) {
  const c = type === "pro" ? { bg: T.proBg, fg: T.pro } : type === "stay" ? { bg: T.stayBg, fg: T.stay } : { bg: T.communityBg, fg: T.community };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 6, fontSize: 10.5, fontWeight: 700, background: c.bg, color: c.fg, textTransform: "uppercase", letterSpacing: 0.5 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.fg }} />
      {type}{sub ? ` · ${sub}` : ""}
    </span>
  );
}

function Lock({ isPublic, onUnlock, label, children }) {
  if (!isPublic) return children;
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", minHeight: 56 }}>
      <div style={{ filter: "blur(8px)", opacity: 0.35, pointerEvents: "none", userSelect: "none" }}>{children}</div>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(250,250,247,0.88)", borderRadius: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.textMid, marginBottom: 8 }}>{label}</div>
        <button onClick={function (e) { e.stopPropagation(); onUnlock(); }} style={{ padding: "7px 22px", fontSize: 12.5, fontWeight: 700, background: T.accent, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", boxShadow: "0 2px 8px rgba(232,114,58,0.35)" }}>
          Unlock — Free
        </button>
        <div style={{ fontSize: 10, color: T.textLight, marginTop: 5 }}>Sign in via magic link</div>
      </div>
    </div>
  );
}

function SearchSelect({ items, value, onChange, placeholder, icon }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);

  useEffect(function () {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handler);
    return function () { document.removeEventListener("mousedown", handler); };
  }, []);

  const filtered = items.filter(function (i) { return i.toLowerCase().includes(search.toLowerCase()); });

  return (
    <div ref={ref} style={{ position: "relative", flex: 1 }}>
      <button onClick={function () { setOpen(!open); }} style={{ width: "100%", padding: "9px 14px", fontSize: 13, textAlign: "left", background: T.surface, border: "1.5px solid " + (open ? T.accent : T.border), borderRadius: 8, cursor: "pointer", color: value ? T.text : T.textLight, display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        <span style={{ flex: 1 }}>{value || placeholder}</span>
        <span style={{ fontSize: 10, color: T.textLight, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>▼</span>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0, zIndex: 60, background: T.surface, border: "1px solid " + T.border, borderRadius: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", maxHeight: 250, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "8px 10px", borderBottom: "1px solid " + T.borderLight }}>
            <input value={search} onChange={function (e) { setSearch(e.target.value); }} placeholder="Search..." autoFocus style={{ width: "100%", padding: "8px 10px", fontSize: 13, border: "1px solid " + T.border, borderRadius: 6, outline: "none", fontFamily: "inherit", background: T.muted }} />
          </div>
          <div style={{ overflow: "auto", flex: 1 }}>
            <button onClick={function () { onChange(null); setOpen(false); setSearch(""); }} style={{ width: "100%", padding: "10px 14px", fontSize: 13, textAlign: "left", background: !value ? T.accentBg : "transparent", border: "none", cursor: "pointer", color: !value ? T.accent : T.textMid, fontWeight: !value ? 600 : 400 }}>All</button>
            {filtered.map(function (item) {
              return (
                <button key={item} onClick={function () { onChange(item); setOpen(false); setSearch(""); }} style={{ width: "100%", padding: "10px 14px", fontSize: 13, textAlign: "left", background: value === item ? T.accentBg : "transparent", border: "none", cursor: "pointer", color: value === item ? T.accent : T.text, fontWeight: value === item ? 600 : 400 }}>{item}</button>
              );
            })}
            {filtered.length === 0 && <div style={{ padding: 14, fontSize: 12, color: T.textLight, textAlign: "center" }}>No matches</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function AuthPage({ onAuth, lang }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const en = lang === "en";

  if (sent) {
    return (
      <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 400, padding: "40px 36px", background: T.surface, borderRadius: 16, border: "1px solid " + T.border, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 800, color: T.text }}>{en ? "Check your email" : "メールをご確認ください"}</h2>
          <p style={{ fontSize: 14, color: T.textMid, lineHeight: 1.6, margin: "0 0 20px" }}>{en ? "Magic link sent to " + email + ". Click to sign in." : email + "にリンクを送信しました。"}</p>
          <button onClick={onAuth} style={{ padding: "12px 32px", fontSize: 14, fontWeight: 700, background: T.accent, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer" }}>{en ? "Simulate: Open Link" : "リンクを開く"}</button>
          <p style={{ fontSize: 11, color: T.textLight, marginTop: 16 }}>{en ? "Expires in 10 min" : "10分で期限切れ"}</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 420, padding: "40px 36px", background: T.surface, borderRadius: 16, border: "1px solid " + T.border, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span style={{ fontSize: 32 }}>🌏</span>
          <h1 style={{ margin: "8px 0 4px", fontSize: 24, fontWeight: 900, color: T.text }}>IsshoLife</h1>
          <p style={{ fontSize: 13, color: T.textLight, margin: 0 }}>{en ? "Discover. Join. Go together." : "発見。参加。一緒に。"}</p>
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, margin: "0 0 4px" }}>{en ? "Sign in" : "サインイン"}</h2>
        <p style={{ fontSize: 13, color: T.textMid, margin: "0 0 20px" }}>{en ? "Enter your email for a magic link. No password." : "メールでマジックリンクを受信。"}</p>
        <label style={{ fontSize: 11, fontWeight: 700, color: T.textMid, textTransform: "uppercase", letterSpacing: 1 }}>{en ? "Email" : "メール"}</label>
        <input value={email} onChange={function (e) { setEmail(e.target.value); }} placeholder="you@example.com" style={{ width: "100%", padding: "13px 16px", marginTop: 6, fontSize: 14, border: "1.5px solid " + T.border, borderRadius: 8, outline: "none", fontFamily: "inherit", background: T.muted }} />
        <label style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 16, cursor: "pointer" }}>
          <input type="checkbox" checked={accepted} onChange={function (e) { setAccepted(e.target.checked); }} style={{ marginTop: 3 }} />
          <span style={{ fontSize: 12, color: T.textMid, lineHeight: 1.5 }}>
            {en ? "I agree to the " : ""}
            <span style={{ color: T.accent, fontWeight: 600 }}>{en ? "Terms & Conditions" : "利用規約"}</span>
            {en ? " and " : " と "}
            <span style={{ color: T.accent, fontWeight: 600 }}>{en ? "Privacy Policy" : "プライバシーポリシー"}</span>
            {en ? "" : " に同意"}
          </span>
        </label>
        <button onClick={function () { if (email && accepted) setSent(true); }} style={{ width: "100%", padding: "14px 0", marginTop: 16, fontSize: 15, fontWeight: 800, background: email && accepted ? T.accent : T.muted, color: email && accepted ? "#fff" : T.textLight, border: "none", borderRadius: 10, cursor: email && accepted ? "pointer" : "default" }}>{en ? "Send Magic Link" : "マジックリンク送信"}</button>
        <div style={{ marginTop: 20, padding: "12px 16px", background: T.muted, borderRadius: 8, fontSize: 12, color: T.textMid, textAlign: "center", lineHeight: 1.6 }}>{en ? "Invite-only platform. Use the email your invitation was sent to." : "招待制。招待メールのアドレスをご使用ください。"}</div>
      </div>
    </div>
  );
}

function TrustRedirect({ stay, onBack, lang }) {
  const [phase, setPhase] = useState("loading");
  const en = lang === "en";

  useEffect(function () {
    var tm = setTimeout(function () { setPhase("ready"); }, 2000);
    return function () { clearTimeout(tm); };
  }, []);

  if (phase === "loading") {
    return (
      <div style={{ minHeight: "100vh", background: T.trustDark, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid rgba(242,196,109,0.3)", borderTopColor: T.trustGold, animation: "spin 1s linear infinite" }} />
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
        <div style={{ fontSize: 15, color: T.trustGold, fontWeight: 600 }}>{en ? "Connecting to Trust..." : "Trustに接続中..."}</div>
        <div style={{ fontSize: 12, color: "#71839A" }}>{en ? "Setting up your account" : "アカウント作成中"}</div>
      </div>
    );
  }

  var priceNum = parseInt(stay.price.replace(/[^0-9]/g, ""));

  return (
    <div style={{ minHeight: "100vh", background: T.trustDark }}>
      <div style={{ padding: "14px 24px", borderBottom: "1px solid rgba(242,196,109,0.12)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", border: "1.5px solid " + T.trustGold, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.trustGold }} />
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#F6F3EC", letterSpacing: 1 }}>Trust</span>
          <span style={{ fontSize: 10, color: "#71839A", padding: "2px 8px", background: "rgba(242,196,109,0.1)", borderRadius: 4 }}>via IsshoLife</span>
        </div>
        <button onClick={onBack} style={{ fontSize: 12, color: "#71839A", background: "transparent", border: "1px solid rgba(242,196,109,0.12)", borderRadius: 6, padding: "6px 14px", cursor: "pointer" }}>{"← " + (en ? "Back" : "戻る")}</button>
      </div>
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "24px 24px 40px" }}>
        <div style={{ padding: "12px 16px", background: "rgba(242,196,109,0.08)", border: "1px solid rgba(242,196,109,0.2)", borderRadius: 10, marginBottom: 20, fontSize: 12, color: T.trustGold }}>{"✓ " + (en ? "IsshoLife account linked. Booking as Level 6 guest." : "アカウントリンク済。レベル6で予約。")}</div>
        <div style={{ background: "rgba(22,49,79,0.45)", border: "1px solid rgba(242,196,109,0.12)", borderRadius: 14, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ height: 180, background: "url('" + stay.img + "') center/cover" }} />
          <div style={{ padding: "16px 20px" }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "#F6F3EC" }}>{stay.title}</h2>
            <div style={{ fontSize: 13, color: "#71839A" }}>{"📍 " + stay.area + " · ⭐ " + stay.rating + " · " + stay.rooms + " " + (en ? "rooms" : "部屋")}</div>
          </div>
        </div>
        <div style={{ background: "rgba(22,49,79,0.45)", border: "1px solid rgba(242,196,109,0.12)", borderRadius: 14, padding: "20px 22px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 14, fontWeight: 700, color: "#F6F3EC" }}>{en ? "Book Your Stay" : "予約"}</h3>
          <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 10, color: "#71839A", textTransform: "uppercase", letterSpacing: 1 }}>{en ? "Check-in" : "チェックイン"}</label>
              <div style={{ marginTop: 4, padding: "10px 14px", background: "rgba(11,18,32,0.6)", border: "1px solid rgba(113,131,154,0.3)", borderRadius: 8, fontSize: 14, color: "#F6F3EC" }}>Apr 19</div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 10, color: "#71839A", textTransform: "uppercase", letterSpacing: 1 }}>{en ? "Check-out" : "チェックアウト"}</label>
              <div style={{ marginTop: 4, padding: "10px 14px", background: "rgba(11,18,32,0.6)", border: "1px solid rgba(113,131,154,0.3)", borderRadius: 8, fontSize: 14, color: "#F6F3EC" }}>Apr 21</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#71839A", marginBottom: 8 }}>
            <span>{stay.price + " × 2 " + (en ? "nights" : "泊")}</span>
            <span style={{ color: "#F6F3EC" }}>{"¥" + (priceNum * 2).toLocaleString()}</span>
          </div>
          <div style={{ borderTop: "1px solid rgba(242,196,109,0.12)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#F6F3EC" }}>{en ? "Total" : "合計"}</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: T.trustGold }}>{"¥" + (priceNum * 2).toLocaleString()}</span>
          </div>
          <button style={{ width: "100%", padding: "14px 0", marginTop: 16, fontSize: 15, fontWeight: 700, background: "linear-gradient(135deg, " + T.trustGold + ", #E8A75C)", border: "none", borderRadius: 10, color: T.trustDark, cursor: "pointer" }}>{en ? "Request Booking" : "予約リクエスト"}</button>
        </div>
      </div>
    </div>
  );
}

function ListingCard({ l, onClick, en, isJoined }) {
  return (
    <div onClick={onClick} style={{ display: "flex", background: T.surface, borderRadius: 12, border: "1px solid " + T.border, overflow: "hidden", cursor: "pointer", marginBottom: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
      <div style={{ width: 110, minHeight: 110, background: "url('" + l.img + "') center/cover", flexShrink: 0 }} />
      <div style={{ padding: "12px 14px", flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
          <Badge type={l.type} sub={l.sub} />
          {l.price && <span style={{ fontSize: 13, fontWeight: 700, color: T.pro }}>{l.price}</span>}
        </div>
        <h3 style={{ margin: "0 0 5px", fontSize: 14, fontWeight: 700, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.title}</h3>
        <div style={{ fontSize: 11.5, color: T.textMid, marginBottom: 5 }}>{"📍" + l.area + " · 📅" + l.date + " · " + l.time}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11.5, color: T.textLight }}>{l.att + "/" + l.max + " " + (en ? "going" : "参加")}</span>
          {isJoined && <span style={{ fontSize: 10, fontWeight: 700, color: T.going, background: T.goingBg, padding: "2px 8px", borderRadius: 4 }}>{"✓ " + (en ? "Going" : "参加中")}</span>}
        </div>
      </div>
    </div>
  );
}

function Detail({ listing, isPublic, onUnlock, onBack, joined, onJoin, lang }) {
  var l = listing;
  var en = lang === "en";
  var [showJoin, setShowJoin] = useState(false);
  var [transport, setTransport] = useState(null);
  var [showChat, setShowChat] = useState(false);
  var [showRides, setShowRides] = useState(false);
  var [chatInput, setChatInput] = useState("");

  function handleJoin() { if (isPublic) { onUnlock(); return; } setShowJoin(true); }
  function confirmJoin() { onJoin(l.id); setShowJoin(false); }

  var transportOptions = [];
  if (l.transport === "organizer") transportOptions.push({ key: "org", label: en ? "Organizer transport" : "主催者の交通", sub: l.transportNote, icon: "🚐" });
  transportOptions.push({ key: "ride", label: en ? "Ride share" : "ライドシェア", sub: RIDES.length + " " + (en ? "rides" : "台"), icon: "🚗" });
  transportOptions.push({ key: "self", label: en ? "On my own" : "自分で", sub: en ? "Car, train, bike" : "車・電車", icon: "🚶" });

  return (
    <div style={{ background: T.bg }}>
      <div style={{ padding: "10px 16px", background: T.surface, borderBottom: "1px solid " + T.border, display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={onBack} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 13, color: T.textMid, padding: 0 }}>←</button>
        <span style={{ fontSize: 13, fontWeight: 600, color: T.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.title}</span>
      </div>

      <div style={{ height: 180, background: "url('" + l.img + "') center/cover", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.6))", padding: "20px 16px 12px" }}>
          <Badge type={l.type} sub={l.sub} />
          <h1 style={{ margin: "6px 0 0", fontSize: 20, fontWeight: 800, color: "#fff" }}>{l.title}</h1>
        </div>
      </div>

      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14, fontSize: 12.5, color: T.textMid }}>
          <span>{"📍 " + l.area}</span><span>{"📅 " + l.date}</span><span>{"⏰ " + l.time}</span><span>{"👥 " + l.att + "/" + l.max}</span>
          {l.price && <span style={{ fontWeight: 700, color: T.pro }}>{l.price}</span>}
        </div>

        <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
          {l.tags.map(function (tag) { return <span key={tag} style={{ padding: "3px 9px", fontSize: 11, borderRadius: 5, background: T.muted, color: T.textMid, border: "1px solid " + T.border }}>{"#" + tag}</span>; })}
        </div>

        <div style={{ padding: "14px 16px", background: T.surface, border: "1px solid " + T.border, borderRadius: 10, marginBottom: 12 }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, color: T.text, margin: "0 0 6px" }}>{en ? "About" : "概要"}</h3>
          <p style={{ fontSize: 13, color: T.textMid, lineHeight: 1.7, margin: 0 }}>{l.desc}</p>
        </div>

        <Lock isPublic={isPublic} onUnlock={onUnlock} label={en ? "Transport" : "交通"}>
          <div style={{ padding: "14px 16px", background: T.surface, border: "1px solid " + T.border, borderRadius: 10, marginBottom: 12 }}>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: T.text, margin: "0 0 8px" }}>{"🚗 " + (en ? "Transport" : "交通")}</h3>
            {l.transport === "organizer" ? (
              <div>
                <div style={{ padding: "8px 12px", background: T.goingBg, borderRadius: 6, fontSize: 12.5, color: T.going, marginBottom: 6 }}>{"✓ " + (en ? "Organizer provides" : "主催者提供")}</div>
                <div style={{ fontSize: 12, color: T.textMid }}>{l.transportNote}</div>
              </div>
            ) : (
              <div style={{ fontSize: 12.5, color: T.textMid }}>{en ? "Self-organized" : "自己手配"}</div>
            )}
            <button onClick={function () { setShowRides(!showRides); }} style={{ marginTop: 10, width: "100%", padding: "9px 0", fontSize: 12, fontWeight: 600, background: T.muted, border: "1px solid " + T.border, borderRadius: 8, cursor: "pointer", color: T.textMid }}>{(en ? "Ride Share Pool" : "ライドシェア") + " (" + RIDES.length + ")"}</button>
            {showRides && (
              <div style={{ marginTop: 10 }}>
                {RIDES.map(function (r) {
                  return (
                    <div key={r.id} style={{ padding: "10px 12px", marginBottom: 6, background: T.bg, borderRadius: 8, border: "1px solid " + T.border, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>{r.from + " → " + r.to}</div>
                        <div style={{ fontSize: 11, color: T.textLight, marginTop: 2 }}>{r.time + " · " + r.taken + "/" + r.seats}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: T.accent }}>{r.cost}</div>
                        <div style={{ fontSize: 9, color: T.textLight }}>{en ? "cost-split" : "割り勘"}</div>
                      </div>
                    </div>
                  );
                })}
                <div style={{ padding: "8px 10px", background: T.muted, borderRadius: 6, fontSize: 10.5, color: T.textLight, textAlign: "center" }}>{"⚠️ " + (en ? "Cost-split only — no profit" : "割り勘のみ")}</div>
              </div>
            )}
          </div>
        </Lock>

        <Lock isPublic={isPublic} onUnlock={onUnlock} label={en ? "Organizer" : "主催者"}>
          <div style={{ padding: "14px 16px", background: T.surface, border: "1px solid " + T.border, borderRadius: 10, marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: l.type === "pro" ? T.proBg : T.communityBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: l.type === "pro" ? T.pro : T.community }}>{l.org.charAt(0)}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{l.org}</div>
              <div style={{ fontSize: 11, color: T.textLight }}>{(en ? "Verified" : "認証済") + " · " + l.area}</div>
            </div>
          </div>
        </Lock>

        {l.type === "pro" && <div style={{ padding: "12px 16px", background: T.proBg, border: "1px solid rgba(124,58,237,0.1)", borderRadius: 10, marginBottom: 12, fontSize: 12.5, color: T.pro }}>{"💬 " + (en ? "Ask " + l.org + " in Partner Q&A" : "Q&Aで質問")}</div>}

        {!joined ? (
          <button onClick={handleJoin} style={{ width: "100%", padding: "14px 0", fontSize: 15, fontWeight: 800, background: T.accent, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", boxShadow: "0 3px 12px rgba(232,114,58,0.3)" }}>{isPublic ? "🔒 " + (en ? "Unlock to Join" : "アンロック") : (en ? "Join This Event" : "参加する")}</button>
        ) : (
          <div>
            <div style={{ width: "100%", padding: "14px 0", fontSize: 15, fontWeight: 800, background: T.goingBg, color: T.going, borderRadius: 10, textAlign: "center", border: "2px solid rgba(22,163,74,0.15)" }}>{"✅ " + (en ? "You're Going!" : "参加確定！")}</div>
            <button onClick={function () { setShowChat(!showChat); }} style={{ width: "100%", padding: "11px 0", marginTop: 10, fontSize: 13, fontWeight: 600, background: T.surface, border: "1px solid " + T.border, borderRadius: 8, cursor: "pointer", color: T.text }}>{"💬 " + (showChat ? (en ? "Close Chat" : "閉じる") : (en ? "Event Chat" : "チャット")) + (l.chat.length > 0 ? " (" + l.chat.length + ")" : "")}</button>
          </div>
        )}

        {showChat && joined && (
          <div style={{ marginTop: 10, background: T.surface, border: "1px solid " + T.border, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ padding: "10px 14px", background: T.muted, borderBottom: "1px solid " + T.border, fontSize: 12.5, fontWeight: 700, color: T.text }}>{(en ? "Event Chat" : "チャット") + " · " + (l.att + 1)}</div>
            <div style={{ padding: "10px 14px", maxHeight: 220, overflow: "auto" }}>
              {l.chat.length > 0 ? l.chat.map(function (m, i) {
                return (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: m.ann ? T.accent : T.community }}>{(m.ann ? "📢 " : "") + m.from}</span>
                      <span style={{ fontSize: 9.5, color: T.textLight }}>{m.time}</span>
                    </div>
                    <div style={{ fontSize: 12.5, color: T.textMid, lineHeight: 1.5, padding: "7px 11px", background: m.ann ? T.accentBg : T.bg, borderRadius: 7 }}>{m.text}</div>
                  </div>
                );
              }) : <div style={{ padding: 20, textAlign: "center", fontSize: 12, color: T.textLight }}>{en ? "No messages yet" : "メッセージなし"}</div>}
            </div>
            <div style={{ padding: "8px 10px", borderTop: "1px solid " + T.border, display: "flex", gap: 6 }}>
              <input value={chatInput} onChange={function (e) { setChatInput(e.target.value); }} placeholder={en ? "Message..." : "メッセージ..."} style={{ flex: 1, padding: "9px 12px", fontSize: 12.5, border: "1px solid " + T.border, borderRadius: 7, outline: "none", fontFamily: "inherit", background: T.bg }} />
              <button style={{ padding: "9px 16px", fontSize: 12, fontWeight: 600, background: T.accent, color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" }}>{en ? "Send" : "送信"}</button>
            </div>
          </div>
        )}

        {showJoin && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center", background: "rgba(0,0,0,0.4)" }}>
            <div style={{ width: "100%", maxWidth: 500, background: T.surface, borderRadius: "18px 18px 0 0", padding: "22px 22px 28px", boxShadow: "0 -8px 30px rgba(0,0,0,0.12)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: T.text }}>{en ? "Join Event" : "参加"}</h3>
                <button onClick={function () { setShowJoin(false); }} style={{ background: "transparent", border: "none", fontSize: 18, color: T.textLight, cursor: "pointer" }}>×</button>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text }}>{l.title}</div>
              <div style={{ fontSize: 12, color: T.textMid, marginBottom: 18 }}>{l.date + " · " + l.time + " · " + l.area}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: T.text, marginBottom: 8 }}>{en ? "How are you getting there?" : "交通手段"}</div>
              {transportOptions.map(function (opt) {
                return (
                  <button key={opt.key} onClick={function () { setTransport(opt.key); }} style={{ width: "100%", padding: "12px 14px", marginBottom: 6, textAlign: "left", background: transport === opt.key ? T.accentBg : T.bg, border: "2px solid " + (transport === opt.key ? T.accent : T.border), borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{opt.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{opt.label}</div>
                      <div style={{ fontSize: 11, color: T.textLight }}>{opt.sub}</div>
                    </div>
                  </button>
                );
              })}
              <button onClick={confirmJoin} disabled={!transport} style={{ width: "100%", padding: "13px 0", marginTop: 10, fontSize: 14, fontWeight: 800, background: transport ? T.accent : T.muted, color: transport ? "#fff" : T.textLight, border: "none", borderRadius: 8, cursor: transport ? "pointer" : "default" }}>{en ? "Confirm — Going ✓" : "確定 ✓"}</button>
              <div style={{ marginTop: 10, padding: "8px 12px", background: T.muted, borderRadius: 6, fontSize: 11, color: T.textLight, textAlign: "center" }}>{"🔐 " + (en ? "Identity revealed after joining" : "参加後にID公開")}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Feed({ isPublic, onUnlock, onSelect, onStay, lang, joinedIds }) {
  var [tab, setTab] = useState("discover");
  var [area, setArea] = useState(null);
  var [cat, setCat] = useState(null);
  var en = lang === "en";

  var tabs = [
    { key: "discover", label: en ? "Discover" : "発見", icon: "🧭" },
    { key: "going", label: en ? "Going" : "参加予定", icon: "✅", count: joinedIds.length },
    { key: "stay", label: en ? "Stay" : "宿泊", icon: "🏠" },
  ];

  var filtered = LISTINGS.filter(function (l) {
    if (area && l.area !== area) return false;
    if (cat && l.cat !== cat) return false;
    return true;
  });

  var joinedListings = LISTINGS.filter(function (l) { return joinedIds.includes(l.id); });

  return (
    <div>
      <div style={{ display: "flex", padding: "0 16px", borderBottom: "1px solid " + T.border, background: T.surface }}>
        {tabs.map(function (tb) {
          var active = tab === tb.key;
          return (
            <button key={tb.key} onClick={function () { setTab(tb.key); }} style={{ padding: "11px 18px", fontSize: 13, fontWeight: active ? 700 : 400, background: "transparent", border: "none", borderBottom: active ? "2.5px solid " + T.accent : "2.5px solid transparent", color: active ? T.text : T.textLight, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              {tb.icon + " " + tb.label}
              {tb.count > 0 && <span style={{ fontSize: 10, fontWeight: 700, background: T.goingBg, color: T.going, padding: "1px 6px", borderRadius: 8 }}>{tb.count}</span>}
            </button>
          );
        })}
      </div>

      {tab === "discover" && (
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <SearchSelect items={AREAS} value={area} onChange={setArea} placeholder={en ? "All Areas" : "全エリア"} icon="📍" />
            <SearchSelect items={CATS} value={cat} onChange={setCat} placeholder={en ? "All Activities" : "全カテゴリ"} icon="🏷" />
          </div>
          {filtered.map(function (l) {
            return <ListingCard key={l.id} l={l} onClick={function () { onSelect(l); }} en={en} isJoined={joinedIds.includes(l.id)} />;
          })}
          {filtered.length === 0 && <div style={{ padding: 40, textAlign: "center", fontSize: 13, color: T.textLight }}>{en ? "No matches" : "該当なし"}</div>}
        </div>
      )}

      {tab === "going" && (
        <div style={{ padding: 16 }}>
          {isPublic ? (
            <Lock isPublic={true} onUnlock={onUnlock} label={en ? "Your events" : "イベント"}>
              <div style={{ padding: 60, textAlign: "center" }}>Placeholder</div>
            </Lock>
          ) : joinedListings.length === 0 ? (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 6 }}>{en ? "No events yet" : "まだなし"}</div>
              <div style={{ fontSize: 13, color: T.textLight }}>{en ? "Browse Discover and join!" : "発見タブから参加！"}</div>
            </div>
          ) : (
            joinedListings.map(function (l) {
              return (
                <div key={l.id} onClick={function () { onSelect(l); }} style={{ background: T.surface, border: "1px solid " + T.border, borderRadius: 12, overflow: "hidden", marginBottom: 12, cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 10, background: "url('" + l.img + "') center/cover", flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.going }}>{l.title}</div>
                      <div style={{ fontSize: 12, color: T.textMid, marginTop: 2 }}>{"📅 " + l.date + " · " + l.time}</div>
                      {l.transport === "organizer" && <div style={{ fontSize: 11, color: T.community, marginTop: 3 }}>{"🚐 " + l.transportNote}</div>}
                    </div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.going, background: T.goingBg, padding: "4px 10px", borderRadius: 6 }}>✓</span>
                  </div>
                  <div style={{ display: "flex", borderTop: "1px solid " + T.borderLight }}>
                    <div style={{ flex: 1, padding: "10px 16px", textAlign: "center", borderRight: "1px solid " + T.borderLight }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{l.att + 1}</div>
                      <div style={{ fontSize: 10, color: T.textLight }}>{en ? "Attendees" : "参加者"}</div>
                    </div>
                    <div style={{ flex: 1, padding: "10px 16px", textAlign: "center", borderRight: "1px solid " + T.borderLight }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{l.chat.length}</div>
                      <div style={{ fontSize: 10, color: T.textLight }}>{en ? "Messages" : "MSG"}</div>
                    </div>
                    <div style={{ flex: 1, padding: "10px 16px", textAlign: "center" }}>
                      <div style={{ fontSize: 16, fontWeight: 800, color: T.text }}>{l.date.split(" ")[1]}</div>
                      <div style={{ fontSize: 10, color: T.textLight }}>{l.date.split(" ")[0]}</div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {tab === "stay" && (
        <div style={{ padding: 16 }}>
          <p style={{ fontSize: 13, color: T.textLight, marginBottom: 14 }}>{en ? "Accommodation from Trust network. Tap to book." : "Trust宿泊施設。タップで予約。"}</p>
          {STAYS.map(function (s) {
            return (
              <div key={s.id} onClick={function () { if (!isPublic) onStay(s); }} style={{ display: "flex", background: T.surface, border: "1px solid " + T.border, borderRadius: 12, overflow: "hidden", marginBottom: 12, cursor: isPublic ? "default" : "pointer" }}>
                <div style={{ width: 110, minHeight: 100, background: "url('" + s.img + "') center/cover", flexShrink: 0 }} />
                <div style={{ padding: "12px 14px", flex: 1 }}>
                  <Badge type="stay" sub="Trust" />
                  <h3 style={{ margin: "6px 0 4px", fontSize: 14, fontWeight: 700, color: T.text }}>{s.title}</h3>
                  <div style={{ fontSize: 12, color: T.textMid }}>{"📍 " + s.area + " · ⭐ " + s.rating}</div>
                  {isPublic ? (
                    <Lock isPublic={true} onUnlock={onUnlock} label={en ? "Pricing" : "料金"}>
                      <div style={{ padding: "8px 0" }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: T.stay }}>{s.price}</span>
                      </div>
                    </Lock>
                  ) : (
                    <div style={{ marginTop: 6, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: T.stay }}>{s.price}</span>
                      <span style={{ fontSize: 11, color: T.accent, fontWeight: 600 }}>{en ? "Book on Trust →" : "Trustで予約 →"}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function IsshoLifeApp() {
  var [authed, setAuthed] = useState(false);
  var [isPublic, setIsPublic] = useState(true);
  var [lang, setLang] = useState("en");
  var [selected, setSelected] = useState(null);
  var [trustRedirect, setTrustRedirect] = useState(null);
  var [joinedIds, setJoinedIds] = useState([]);

  function handleJoin(id) {
    setJoinedIds(function (prev) { return prev.includes(id) ? prev : prev.concat([id]); });
  }

  var en = lang === "en";

  if (!authed) {
    return (
      <div style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}>
        <style>{"@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } input::placeholder { color: " + T.textLight + "; } button:hover { filter: brightness(0.96); }"}</style>
        <AuthPage onAuth={function () { setAuthed(true); setIsPublic(false); }} lang={lang} />
      </div>
    );
  }

  if (trustRedirect) {
    return (
      <div style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}>
        <style>{"@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; }"}</style>
        <TrustRedirect stay={trustRedirect} onBack={function () { setTrustRedirect(null); }} lang={lang} />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Nunito', system-ui, sans-serif", background: T.bg, minHeight: "100vh", maxWidth: 520, margin: "0 auto", borderLeft: "1px solid " + T.border, borderRight: "1px solid " + T.border }}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } input::placeholder { color: " + T.textLight + "; } button:hover { filter: brightness(0.96); } button:active { transform: scale(0.98); }"}</style>

      <div style={{ padding: "10px 16px", background: T.surface, borderBottom: "1px solid " + T.border, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🌏</span>
          <span style={{ fontSize: 17, fontWeight: 900, color: T.text }}>IsshoLife</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={function () { setLang(lang === "en" ? "jp" : "en"); }} style={{ padding: "5px 10px", fontSize: 11, fontWeight: 600, background: T.muted, border: "1px solid " + T.border, borderRadius: 6, cursor: "pointer", color: T.textMid }}>{lang === "en" ? "JP 🇯🇵" : "EN 🇬🇧"}</button>
          <div style={{ display: "flex", background: T.muted, borderRadius: 8, padding: 2, border: "1px solid " + T.border }}>
            <button onClick={function () { setIsPublic(true); }} style={{ padding: "6px 14px", fontSize: 11.5, fontWeight: isPublic ? 700 : 400, background: isPublic ? T.surface : "transparent", border: "none", borderRadius: 6, cursor: "pointer", color: isPublic ? T.text : T.textLight, boxShadow: isPublic ? "0 1px 3px rgba(0,0,0,0.06)" : "none" }}>Public</button>
            <button onClick={function () { setIsPublic(false); }} style={{ padding: "6px 14px", fontSize: 11.5, fontWeight: !isPublic ? 700 : 400, background: !isPublic ? T.surface : "transparent", border: "none", borderRadius: 6, cursor: "pointer", color: !isPublic ? T.text : T.textLight, boxShadow: !isPublic ? "0 1px 3px rgba(0,0,0,0.06)" : "none" }}>Member</button>
          </div>
        </div>
      </div>

      {selected ? (
        <Detail listing={selected} isPublic={isPublic} onUnlock={function () { setIsPublic(false); }} onBack={function () { setSelected(null); }} joined={joinedIds.includes(selected.id)} onJoin={handleJoin} lang={lang} />
      ) : (
        <Feed isPublic={isPublic} onUnlock={function () { setIsPublic(false); }} onSelect={function (l) { setSelected(l); }} onStay={function (s) { setTrustRedirect(s); }} lang={lang} joinedIds={joinedIds} />
      )}
    </div>
  );
}