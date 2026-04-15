export type ListingType = "community" | "pro" | "tour";
export type ListingSub = "Meetup" | "Experience" | "Group Ride" | "Offer" | "Activity" | "Tour";
export type JoinStatus = "going" | "requested" | "confirmed" | "declined" | "expired";
export type PartnerLevel = "starter" | "growth" | "pro";

export interface SubTag {
  id: string;
  label: string;
  labelJa: string;
}

export interface CategoryDefinition {
  id: string;
  label: string;
  labelJa: string;
  subTags: SubTag[];
}

export interface Listing {
  id: number;
  type: ListingType;
  sub: ListingSub;
  title: string;
  titleJa: string;
  area: string;
  categoryId: string;
  subTagIds: string[];
  date: string;
  time: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  description: string;
  descriptionJa: string;
  tags: string[];
  price?: string;
  messagingPlatform: "whatsapp" | "line";
  messagingLink: string;
  intention?: "exploration" | "skill-building" | "just-doing-it";
  skillLevel?: "beginner" | "intermediate" | "advanced" | "all-levels";
  costSplit?: {
    total: number;
    minPeople: number;
  };
  safetyRequirements?: string[];
}

export interface Stay {
  id: number;
  title: string;
  area: string;
  price: string;
  image: string;
  rating: number;
  rooms: number;
}

export interface RidePool {
  id: number;
  from: string;
  to: string;
  seats: number;
  taken: number;
  cost: string;
  time: string;
}

export const AREAS = [
  "Tokyo",
  "Hakuba",
  "Niseko",
  "Fuji Five Lakes",
  "Kamakura",
  "Nagano",
  "Nozawa Onsen",
  "Myoko",
  "Karuizawa",
  "Shiga Kogen",
];

export const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    id: "On Snow",
    label: "On Snow",
    labelJa: "雪上",
    subTags: [
      { id: "resort", label: "Resort", labelJa: "リゾート" },
      { id: "backcountry", label: "Backcountry", labelJa: "バックカントリー" },
      { id: "cross-country", label: "Cross-country", labelJa: "クロスカントリー" },
      { id: "ski-touring", label: "Ski touring", labelJa: "スキーツーリング" },
      { id: "freestyle", label: "Freestyle", labelJa: "フリースタイル" },
    ],
  },
  {
    id: "On Water",
    label: "On Water",
    labelJa: "水上",
    subTags: [
      { id: "surfing", label: "Surfing", labelJa: "サーフィン" },
      { id: "kayaking", label: "Kayaking", labelJa: "カヤック" },
      { id: "sup", label: "SUP", labelJa: "SUP" },
      { id: "diving", label: "Diving", labelJa: "ダイビング" },
      { id: "sailing", label: "Sailing", labelJa: "セーリング" },
    ],
  },
  {
    id: "On Trail",
    label: "On Trail",
    labelJa: "トレイル",
    subTags: [
      { id: "hiking", label: "Hiking", labelJa: "ハイキング" },
      { id: "trail-running", label: "Trail running", labelJa: "トレイルランニング" },
      { id: "climbing", label: "Climbing", labelJa: "クライミング" },
      { id: "bouldering", label: "Bouldering", labelJa: "ボルダリング" },
    ],
  },
  {
    id: "On Wheels",
    label: "On Wheels",
    labelJa: "車輪",
    subTags: [
      { id: "road-cycling", label: "Road cycling", labelJa: "ロードサイクリング" },
      { id: "mtb", label: "MTB", labelJa: "MTB" },
      { id: "gravel", label: "Gravel", labelJa: "グラベル" },
      { id: "skateboarding", label: "Skateboarding", labelJa: "スケートボード" },
    ],
  },
  {
    id: "Wellness",
    label: "Wellness",
    labelJa: "ウェルネス",
    subTags: [
      { id: "yoga", label: "Yoga", labelJa: "ヨガ" },
      { id: "meditation", label: "Meditation", labelJa: "瞑想" },
      { id: "forest-bathing", label: "Forest bathing", labelJa: "森林浴" },
      { id: "fitness", label: "Fitness", labelJa: "フィットネス" },
      { id: "onsen", label: "Onsen", labelJa: "温泉" },
    ],
  },
  {
    id: "Food and Drink",
    label: "Food and Drink",
    labelJa: "食と飲み物",
    subTags: [
      { id: "dining-out", label: "Dining out", labelJa: "外食" },
      { id: "cooking-class", label: "Cooking class", labelJa: "料理教室" },
      { id: "izakaya-hop", label: "Izakaya hop", labelJa: "居酒屋巡り" },
      { id: "cafe-tour", label: "Cafe tour", labelJa: "カフェ巡り" },
      { id: "sake-tasting", label: "Sake tasting", labelJa: "日本酒テイスティング" },
    ],
  },
  {
    id: "Culture",
    label: "Culture",
    labelJa: "文化",
    subTags: [
      { id: "temple-visit", label: "Temple visit", labelJa: "寺院巡り" },
      { id: "art-gallery", label: "Art gallery", labelJa: "美術館" },
      { id: "workshop", label: "Workshop", labelJa: "ワークショップ" },
      { id: "festival", label: "Festival", labelJa: "祭り" },
      { id: "language-exchange", label: "Language exchange", labelJa: "言語交換" },
    ],
  },
  {
    id: "Gear and Transport",
    label: "Gear and Transport",
    labelJa: "ギアと移動",
    subTags: [
      { id: "gear-swap", label: "Gear swap", labelJa: "ギア交換" },
      { id: "equipment-rental", label: "Equipment rental", labelJa: "機材レンタル" },
      { id: "group-transport", label: "Group transport", labelJa: "グループ移動" },
      { id: "gear-workshop", label: "Gear workshop", labelJa: "ギア整備" },
    ],
  },
  {
    id: "Social",
    label: "Social",
    labelJa: "ソーシャル",
    subTags: [
      { id: "meetup", label: "Meetup", labelJa: "交流会" },
      { id: "party", label: "Party", labelJa: "パーティー" },
      { id: "watch-party", label: "Watch party", labelJa: "観戦会" },
      { id: "game-night", label: "Game night", labelJa: "ゲームナイト" },
      { id: "networking", label: "Networking", labelJa: "ネットワーキング" },
    ],
  },
];

export const CATEGORIES = CATEGORY_DEFINITIONS.map((category) => category.label);

export const LISTINGS: Listing[] = [
  {
    id: 1,
    type: "community",
    sub: "Meetup",
    title: "Mt. Takao Sunrise Hike",
    titleJa: "高尾山 日の出ハイキング",
    area: "Tokyo",
    categoryId: "On Trail",
    subTagIds: ["hiking"],
    date: "Apr 19",
    time: "5:30 AM",
    organizer: "Yuki M.",
    attendees: 8,
    maxAttendees: 15,
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    description:
      "Early morning hike up Mt. Takao for the sunrise. Trail 1, beginner-friendly. Bring headlamps and water.",
    descriptionJa:
      "高尾山の日の出ハイク。1号路、初心者向け。ヘッドランプと水をお持ちください。",
    tags: ["beginner", "sunrise", "group"],
    messagingPlatform: "line",
    messagingLink: "https://line.me/R/ti/g/issholife-takao-sunrise",
    intention: "exploration",
    skillLevel: "beginner",
    safetyRequirements: ["Bring headlamp", "Carry 1L water", "Stay with group"],
  },
  {
    id: 2,
    type: "pro",
    sub: "Experience",
    title: "Hakone MTB Downhill",
    titleJa: "箱根 MTB ダウンヒル",
    area: "Hakuba",
    categoryId: "On Wheels",
    subTagIds: ["mtb"],
    date: "Apr 26",
    time: "9:00 AM",
    organizer: "TrailBlaze JP",
    attendees: 4,
    maxAttendees: 8,
    image: "https://images.unsplash.com/photo-1544191696-102dbdaeeaa0?w=600&q=80",
    description:
      "Full-day MTB through Hakone's forest trails. Includes bike, gear, lunch, and guide.",
    descriptionJa:
      "箱根の森林トレイルを走るMTB。バイク、ギア、ランチ、ガイド付き。",
    tags: ["all-levels", "gear-included"],
    price: "\u00a512,000",
    messagingPlatform: "whatsapp",
    messagingLink: "https://chat.whatsapp.com/issholife-hakone-mtb",
    intention: "skill-building",
    skillLevel: "all-levels",
    costSplit: {
      total: 12000,
      minPeople: 4,
    },
  },
  {
    id: 3,
    type: "community",
    sub: "Group Ride",
    title: "Tokyo Bay Cycling Loop",
    titleJa: "東京湾 サイクリングループ",
    area: "Tokyo",
    categoryId: "On Wheels",
    subTagIds: ["road-cycling"],
    date: "Apr 20",
    time: "7:00 AM",
    organizer: "Kenji T.",
    attendees: 12,
    maxAttendees: 20,
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=80",
    description:
      "60km loop around Tokyo Bay. Road bikes recommended. Pace: 25-30km/h.",
    descriptionJa:
      "東京湾一周60km。ロードバイク推奨。ペース：25-30km/h。",
    tags: ["intermediate", "road-bike", "60km"],
    messagingPlatform: "line",
    messagingLink: "https://line.me/R/ti/g/issholife-tokyobay-loop",
    intention: "just-doing-it",
    skillLevel: "intermediate",
    safetyRequirements: ["Helmet required", "Front and rear lights"],
  },
  {
    id: 4,
    type: "pro",
    sub: "Offer",
    title: "Private Yoga + Forest Bath",
    titleJa: "プライベートヨガ + 森林浴",
    area: "Kamakura",
    categoryId: "Wellness",
    subTagIds: ["yoga", "forest-bathing"],
    date: "Apr 22",
    time: "10:00 AM",
    organizer: "Zen Garden Studio",
    attendees: 2,
    maxAttendees: 6,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    description:
      "90-min yoga in bamboo grove + guided forest bathing. Mats and tea included.",
    descriptionJa:
      "竹林でのヨガ90分 + 森林浴ガイド。マットとお茶付き。",
    tags: ["relaxation", "nature"],
    price: "\u00a58,500",
    messagingPlatform: "whatsapp",
    messagingLink: "https://chat.whatsapp.com/issholife-kamakura-wellness",
    intention: "exploration",
    skillLevel: "all-levels",
  },
  {
    id: 5,
    type: "community",
    sub: "Meetup",
    title: "Fuji Five Lakes Trail Run",
    titleJa: "富士五湖 トレイルラン",
    area: "Fuji Five Lakes",
    categoryId: "On Trail",
    subTagIds: ["trail-running"],
    date: "May 3",
    time: "6:00 AM",
    organizer: "Masa R.",
    attendees: 6,
    maxAttendees: 10,
    image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&q=80",
    description:
      "15km trail run around Lake Kawaguchi with Mt. Fuji views.",
    descriptionJa:
      "河口湖周辺の15kmトレイルラン。富士山の景色。",
    tags: ["trail-run", "intermediate"],
    messagingPlatform: "line",
    messagingLink: "https://line.me/R/ti/g/issholife-fuji-trailrun",
    intention: "skill-building",
    skillLevel: "intermediate",
    costSplit: {
      total: 3000,
      minPeople: 5,
    },
    safetyRequirements: ["Trail shoes", "Weather-ready layer", "Emergency contact shared"],
  },
  {
    id: 6,
    type: "tour",
    sub: "Tour",
    title: "Niseko Snow Weekend Tour",
    titleJa: "ニセコ 雪山ウィークエンドツアー",
    area: "Niseko",
    categoryId: "On Snow",
    subTagIds: ["resort", "freestyle"],
    date: "May 10",
    time: "8:00 AM",
    organizer: "North Peak Tours",
    attendees: 9,
    maxAttendees: 14,
    image: "https://images.unsplash.com/photo-1489447068241-b3490214e879?w=600&q=80",
    description:
      "Licensed bundled tour with guide, shuttle transfer between pickup points, and partner accommodation coordination.",
    descriptionJa:
      "ガイド、送迎シャトル、提携宿泊手配を含む、認可済みのバンドルツアーです。",
    tags: ["licensed-tour", "bundle", "weekend"],
    price: "¥48,000",
    messagingPlatform: "whatsapp",
    messagingLink: "https://chat.whatsapp.com/issholife-niseko-weekend",
    intention: "just-doing-it",
    skillLevel: "advanced",
    safetyRequirements: ["Helmet required", "Avalanche briefing mandatory"],
  },
];

export const STAYS: Stay[] = [
  {
    id: 101,
    title: "Hakuba Mountain Lodge",
    area: "Hakuba",
    price: "\u00a59,800/night",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&q=80",
    rating: 4.8,
    rooms: 3,
  },
  {
    id: 102,
    title: "Kamakura Beach House",
    area: "Kamakura",
    price: "\u00a512,500/night",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80",
    rating: 4.9,
    rooms: 2,
  },
  {
    id: 103,
    title: "Lake Kawaguchi Cabin",
    area: "Fuji Five Lakes",
    price: "\u00a58,200/night",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80",
    rating: 4.7,
    rooms: 4,
  },
];

export const RIDES: RidePool[] = [
  { id: 1, from: "Shinjuku", to: "Mt. Takao", seats: 3, taken: 1, cost: "\u00a5350/person", time: "4:15 AM" },
  { id: 2, from: "Shibuya", to: "Mt. Takao", seats: 4, taken: 2, cost: "\u00a5400/person", time: "4:00 AM" },
  { id: 3, from: "Tokyo Stn", to: "Mt. Takao", seats: 2, taken: 0, cost: "\u00a5500/person", time: "4:30 AM" },
];
