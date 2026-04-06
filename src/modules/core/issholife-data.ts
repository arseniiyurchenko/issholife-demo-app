export type ListingType = "community" | "pro";
export type ListingSub = "Meetup" | "Experience" | "Group Ride" | "Offer" | "Activity";
export type JoinStatus = "going" | "requested" | "confirmed" | "declined" | "expired";
export type PartnerLevel = "starter" | "growth" | "pro";
export type TransportMode = "organizer" | "self";

export interface ChatMessage {
  from: string;
  text: string;
  time: string;
  isAnnouncement: boolean;
}

export interface Listing {
  id: number;
  type: ListingType;
  sub: ListingSub;
  title: string;
  titleJa: string;
  area: string;
  category: string;
  date: string;
  time: string;
  organizer: string;
  attendees: number;
  maxAttendees: number;
  image: string;
  description: string;
  descriptionJa: string;
  transport: TransportMode;
  transportNote: string | null;
  tags: string[];
  price?: string;
  chat: ChatMessage[];
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

export const CATEGORIES = [
  "Hiking",
  "Cycling",
  "Skiing",
  "Snowboarding",
  "Surfing",
  "Yoga",
  "Food Tour",
  "Trail Run",
  "Climbing",
  "Kayaking",
];

export const LISTINGS: Listing[] = [
  {
    id: 1,
    type: "community",
    sub: "Meetup",
    title: "Mt. Takao Sunrise Hike",
    titleJa: "高尾山 日の出ハイキング",
    area: "Tokyo",
    category: "Hiking",
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
    transport: "organizer",
    transportNote: "Van from Shinjuku Station, 4:30 AM",
    tags: ["beginner", "sunrise", "group"],
    chat: [
      {
        from: "Organizer",
        text: "Meetup: Shinjuku South Exit, 4:30 AM. Green flag!",
        time: "2h ago",
        isAnnouncement: true,
      },
      {
        from: "Kenji",
        text: "Konbini near the meetup point?",
        time: "1h ago",
        isAnnouncement: false,
      },
      {
        from: "Organizer",
        text: "7-Eleven right at the exit.",
        time: "45m ago",
        isAnnouncement: false,
      },
      {
        from: "Sara",
        text: "Bringing extra headlamps!",
        time: "30m ago",
        isAnnouncement: false,
      },
    ],
  },
  {
    id: 2,
    type: "pro",
    sub: "Experience",
    title: "Hakone MTB Downhill",
    titleJa: "箱根 MTB ダウンヒル",
    area: "Hakuba",
    category: "Cycling",
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
    transport: "self",
    transportNote: null,
    tags: ["all-levels", "gear-included"],
    price: "\u00a512,000",
    chat: [],
  },
  {
    id: 3,
    type: "community",
    sub: "Group Ride",
    title: "Tokyo Bay Cycling Loop",
    titleJa: "東京湾 サイクリングループ",
    area: "Tokyo",
    category: "Cycling",
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
    transport: "self",
    transportNote: null,
    tags: ["intermediate", "road-bike", "60km"],
    chat: [],
  },
  {
    id: 4,
    type: "pro",
    sub: "Offer",
    title: "Private Yoga + Forest Bath",
    titleJa: "プライベートヨガ + 森林浴",
    area: "Kamakura",
    category: "Yoga",
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
    transport: "self",
    transportNote: null,
    tags: ["relaxation", "nature"],
    price: "\u00a58,500",
    chat: [],
  },
  {
    id: 5,
    type: "community",
    sub: "Meetup",
    title: "Fuji Five Lakes Trail Run",
    titleJa: "富士五湖 トレイルラン",
    area: "Fuji Five Lakes",
    category: "Hiking",
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
    transport: "self",
    transportNote: null,
    tags: ["trail-run", "intermediate"],
    chat: [],
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
