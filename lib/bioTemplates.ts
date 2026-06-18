import { ElementType } from "react";
import {
  Dumbbell, Plane, Utensils, Gamepad2, GraduationCap, Briefcase,
  Shirt, Music, Palette, Smartphone, Sparkles, BookOpen,
  Flame, Crosshair, Code, Rocket, Stethoscope, BookA,
  Heart, Zap, Crown, Moon, Cake, User, Snowflake, Users, Smile,
  MessageCircle, Home, Users2, Laugh, UserCircle, Headphones,
  MoonStar, Camera, Target, Feather, Quote, CloudRain, Trophy, Scissors, Star
} from "lucide-react";

export type Gender = "male" | "female";

export type CategoryId = 
  | "aesthetic"
  | "artist"
  | "attitude"
  | "birthday"
  | "blogger"
  | "boys"
  | "business"
  | "cool"
  | "couples"
  | "creator"
  | "cute"
  | "developer"
  | "doctor"
  | "entrepreneur"
  | "extroverts"
  | "family"
  | "fashion"
  | "fitness"
  | "food"
  | "free_fire"
  | "friends"
  | "funny"
  | "gaming"
  | "girls"
  | "influencer"
  | "introverts"
  | "islamic"
  | "love"
  | "models"
  | "motivational"
  | "music"
  | "photographers"
  | "poetry"
  | "professional"
  | "pubg"
  | "quotes"
  | "sad"
  | "sports"
  | "student"
  | "stylish"
  | "teacher"
  | "travel"
  | "vip";

export type BioCategoryDef = {
  id: CategoryId;
  label: string;
  icon: ElementType;
  emojis: string[];
};

export const CATEGORY_META: Record<CategoryId, BioCategoryDef> = {
  "aesthetic": { id: "aesthetic", label: "Aesthetic", icon: Moon, emojis: ["🌸","✨","🌙","📸","🖤"] },
  "artist": { id: "artist", label: "Artist", icon: Palette, emojis: ["🎨","🖌️","✨","🌈","🦋"] },
  "attitude": { id: "attitude", label: "Attitude", icon: Zap, emojis: ["👑","🔥","😎","💯","⚡"] },
  "birthday": { id: "birthday", label: "Birthday", icon: Cake, emojis: ["🎂","🎉","🎁","🥳","🎈"] },
  "blogger": { id: "blogger", label: "Blogger", icon: BookOpen, emojis: ["✍️","📝","📸","💻","✨"] },
  "boys": { id: "boys", label: "Boys", icon: User, emojis: ["😎","🔥","💪","👑","⚡"] },
  "business": { id: "business", label: "Business", icon: Briefcase, emojis: ["💼","📈","💰","🚀","🎯"] },
  "cool": { id: "cool", label: "Cool", icon: Snowflake, emojis: ["😎","🕶️","❄️","🌊","🔥"] },
  "couples": { id: "couples", label: "Couples", icon: Users, emojis: ["❤️","💑","🥰","💕","💍"] },
  "creator": { id: "creator", label: "Creator", icon: Sparkles, emojis: ["✨","🎨","💡","🎬","🌟"] },
  "cute": { id: "cute", label: "Cute", icon: Smile, emojis: ["🌸","🧸","🎀","💖","✨"] },
  "developer": { id: "developer", label: "Developer", icon: Code, emojis: ["💻","⌨️","🚀","☕","👨‍💻"] },
  "doctor": { id: "doctor", label: "Doctor", icon: Stethoscope, emojis: ["⚕️","🩺","🤍","💊","🏥"] },
  "entrepreneur": { id: "entrepreneur", label: "Entrepreneur", icon: Rocket, emojis: ["🚀","💡","💼","🎯","📈"] },
  "extroverts": { id: "extroverts", label: "Extroverts", icon: MessageCircle, emojis: ["🎉","😄","🌟","💃","🔊"] },
  "family": { id: "family", label: "Family", icon: Home, emojis: ["👨‍👩‍👧","❤️","🏠","💕","👪"] },
  "fashion": { id: "fashion", label: "Fashion", icon: Shirt, emojis: ["👗","👠","👔","✨","💅"] },
  "fitness": { id: "fitness", label: "Fitness", icon: Dumbbell, emojis: ["💪","🏋️","🔥","💯","🥗"] },
  "food": { id: "food", label: "Food", icon: Utensils, emojis: ["🍕","🍰","☕","🍔","🌮"] },
  "free_fire": { id: "free_fire", label: "Free Fire", icon: Flame, emojis: ["🔥","🎯","🎮","👑","🏆"] },
  "friends": { id: "friends", label: "Friends", icon: Users2, emojis: ["👯","😂","💕","🎉","🌟"] },
  "funny": { id: "funny", label: "Funny", icon: Laugh, emojis: ["😂","🤪","🎭","😁","☕"] },
  "gaming": { id: "gaming", label: "Gaming", icon: Gamepad2, emojis: ["🎮","👾","🕹️","⚡","🏆"] },
  "girls": { id: "girls", label: "Girls", icon: UserCircle, emojis: ["👑","💅","✨","🌸","💖"] },
  "influencer": { id: "influencer", label: "Influencer", icon: Smartphone, emojis: ["📱","✨","📸","🌟","🔥"] },
  "introverts": { id: "introverts", label: "Introverts", icon: Headphones, emojis: ["🌙","📚","🖤","☕","💭"] },
  "islamic": { id: "islamic", label: "Islamic", icon: MoonStar, emojis: ["☪️","🤲","🕌","💚","📿"] },
  "love": { id: "love", label: "Love", icon: Heart, emojis: ["❤️","💕","🥰","🌹","💖"] },
  "models": { id: "models", label: "Models", icon: Camera, emojis: ["📸","✨","👠","⭐","💅"] },
  "motivational": { id: "motivational", label: "Motivational", icon: Target, emojis: ["🚀","💪","✨","🔥","🎯"] },
  "music": { id: "music", label: "Music", icon: Music, emojis: ["🎵","🎧","🎤","🎶","🎸"] },
  "photographers": { id: "photographers", label: "Photographers", icon: Camera, emojis: ["📸","🎞️","🌅","📷","✨"] },
  "poetry": { id: "poetry", label: "Poetry", icon: Feather, emojis: ["📝","🌙","🖊️","🌸","💭"] },
  "professional": { id: "professional", label: "Professional", icon: Briefcase, emojis: ["💼","📊","🎯","⭐","📈"] },
  "pubg": { id: "pubg", label: "PUBG", icon: Crosshair, emojis: ["🍳","🔫","🎯","🏆","🎮"] },
  "quotes": { id: "quotes", label: "Quotes", icon: Quote, emojis: ["💬","✨","📖","✌️","🖤"] },
  "sad": { id: "sad", label: "Sad", icon: CloudRain, emojis: ["🥀","🌧️","💔","😔","🖤"] },
  "sports": { id: "sports", label: "Sports", icon: Trophy, emojis: ["⚽","🏆","🏅","💪","🔥"] },
  "student": { id: "student", label: "Student", icon: GraduationCap, emojis: ["📚","🎓","✏️","📝","💡"] },
  "stylish": { id: "stylish", label: "Stylish", icon: Scissors, emojis: ["✨","💅","👗","👔","🖤"] },
  "teacher": { id: "teacher", label: "Teacher", icon: BookA, emojis: ["📚","🍎","✏️","🎓","📖"] },
  "travel": { id: "travel", label: "Travel", icon: Plane, emojis: ["✈️","🌍","📍","🏖️","🗺️"] },
  "vip": { id: "vip", label: "VIP", icon: Crown, emojis: ["👑","💎","✨","⭐","🍾"] },
};

export const BIO_CATEGORIES = Object.values(CATEGORY_META);

type BioSet = Record<Gender, string[][]>;

export const bios: Record<CategoryId, BioSet> = {
  "photographers": {
    "female": [
      [
        "🔥 Golden hour is her happy hour 📸",
        "💅 Soft eyes sharp lens always",
        "👁️ Every photo she takes has a heartbeat 💯",
        "🎂 Wish me on 3 June 🎉"
      ],
      [
        "📷 Chasing light living in frames",
        "✨ Her lens her rules her art",
        "🌅 Sunset lover portrait creator",
        "💫 Creating memories one click at a time"
      ],
      [
        "🖤 Moody edits golden vibes",
        "📸 She shoots she slays",
        "🌸 Soft focus strong vision",
        "⭐ Your favorite photographer in the making"
      ]
    ],
    "male": [
      [
        "🔥 Golden hour is his happy hour 📸",
        "💪 Sharp lens sharper vision",
        "👁️ Every frame tells a story 💯",
        "🎂 Wish me on 3 June 🎉"
      ],
      [
        "📷 Chasing light living in frames",
        "✨ His lens his rules his art",
        "🌅 Sunset hunter street shooter",
        "💫 Creating memories one click at a time"
      ],
      [
        "🖤 Moody edits golden vibes",
        "📸 He shoots he slays",
        "🌸 Raw shots real stories",
        "⭐ Your favorite photographer in the making"
      ]
    ]
  },
  "artist": {
    "female": [
      [
        "🎨 Colors speak where words fail",
        "✨ She paints her own reality",
        "🖌️ Art is her superpower",
        "💜 Living in a canvas world"
      ],
      [
        "🌈 Creating magic with every stroke",
        "🦋 Dreamer doer artist",
        "⭐ Beauty in the broken lines",
        "🔥 Her art her attitude"
      ]
    ],
    "male": [
      [
        "🎨 Colors speak where words fail",
        "✨ He paints his own reality",
        "🖌️ Art is his superpower",
        "💜 Living in a canvas world"
      ],
      [
        "🌈 Creating magic with every stroke",
        "🦋 Dreamer doer artist",
        "⭐ Beauty in the broken lines",
        "🔥 His art his attitude"
      ]
    ]
  },
  "attitude": {
    "female": [
      [
        "👑 Queen of my own world",
        "🔥 Too glam to give a damn",
        "💅 Classy sassy and a bit smart-assy",
        "✌️ My rules my vibe"
      ],
      [
        "😎 Attitude on fleek ego on mute",
        "💯 Born to stand out",
        "🖤 Savage with a smile",
        "⚡ Handle with care or not at all"
      ]
    ],
    "male": [
      [
        "👑 King of my own world",
        "🔥 Attitude level: expert",
        "💪 Strong mind stronger game",
        "✌️ My rules my vibe"
      ],
      [
        "😎 Too real for fake love",
        "💯 Born to stand out",
        "🖤 Silent but deadly",
        "⚡ Handle with care or not at all"
      ]
    ]
  },
  "business": {
    "female": [
      [
        "💼 Building empires not excuses",
        "📈 Hustle hard dream big",
        "🎯 CEO of my own life",
        "✨ Success is my only option"
      ],
      [
        "💰 Making moves in silence",
        "🚀 Entrepreneur by day visionary always",
        "📊 Results over excuses",
        "⭐ Work smart shine harder"
      ]
    ],
    "male": [
      [
        "💼 Building empires not excuses",
        "📈 Hustle hard dream big",
        "🎯 CEO of my own life",
        "✨ Success is my only option"
      ],
      [
        "💰 Making moves in silence",
        "🚀 Entrepreneur by day visionary always",
        "📊 Results over excuses",
        "⭐ Work smart shine harder"
      ]
    ]
  },
  "couples": {
    "female": [
      [
        "❤️ Taken by the best",
        "💑 Two hearts one love story",
        "🥰 His queen forever",
        "✨ Love is our favorite language"
      ],
      [
        "💕 Together is my favorite place",
        "👫 Partners in crime and love",
        "🌹 She said yes to forever",
        "💖 Building our dream together"
      ]
    ],
    "male": [
      [
        "❤️ Taken by the best",
        "💑 Two hearts one love story",
        "🥰 Her king forever",
        "✨ Love is our favorite language"
      ],
      [
        "💕 Together is my favorite place",
        "👫 Partners in crime and love",
        "🌹 He said yes to forever",
        "💖 Building our dream together"
      ]
    ]
  },
  "entrepreneur": {
    "female": [
      [
        "🚀 Turning ideas into income",
        "💡 Innovator hustler leader",
        "📱 Building brands breaking limits",
        "⭐ Future millionaire loading"
      ],
      [
        "🎯 Vision bigger than fear",
        "💼 Self-made and still rising",
        "🔥 Risk taker dream chaser",
        "✨ Creating my own lane"
      ]
    ],
    "male": [
      [
        "🚀 Turning ideas into income",
        "💡 Innovator hustler leader",
        "📱 Building brands breaking limits",
        "⭐ Future millionaire loading"
      ],
      [
        "🎯 Vision bigger than fear",
        "💼 Self-made and still rising",
        "🔥 Risk taker dream chaser",
        "✨ Creating my own lane"
      ]
    ]
  },
  "extroverts": {
    "female": [
      [
        "🎉 Life of the party energy",
        "😄 Smiles loud laughs louder",
        "🌟 Social butterfly vibes only",
        "💃 Dancing through life daily"
      ],
      [
        "🔊 Extra is my middle name",
        "✨ Good vibes contagious energy",
        "🎤 Never a dull moment here",
        "💫 Sunshine mixed with chaos"
      ]
    ],
    "male": [
      [
        "🎉 Life of the party energy",
        "😄 Smiles loud laughs louder",
        "🌟 Social king vibes only",
        "🕺 Dancing through life daily"
      ],
      [
        "🔊 Extra is my middle name",
        "✨ Good vibes contagious energy",
        "🎤 Never a dull moment here",
        "💫 Sunshine mixed with chaos"
      ]
    ]
  },
  "family": {
    "female": [
      [
        "👨‍👩‍👧 Family first always",
        "❤️ Blessed with the best crew",
        "🏠 Home is where my heart is",
        "🌸 Proud daughter sister mom"
      ],
      [
        "💕 Love lives here",
        "👪 My squad my everything",
        "✨ Family goals unlocked",
        "🙏 Grateful for every moment"
      ]
    ],
    "male": [
      [
        "👨‍👩‍👧 Family first always",
        "❤️ Blessed with the best crew",
        "🏠 Home is where my heart is",
        "🌸 Proud son brother dad"
      ],
      [
        "💕 Love lives here",
        "👪 My squad my everything",
        "✨ Family goals unlocked",
        "🙏 Grateful for every moment"
      ]
    ]
  },
  "fitness": {
    "female": [
      [
        "💪 Stronger every single day",
        "🏋️ Gym is my therapy",
        "🔥 Sweat now shine later",
        "⭐ Fit body fierce mind"
      ],
      [
        "🥗 Eat clean train dirty",
        "💯 No pain no gain",
        "🦋 Transforming one rep at a time",
        "⚡ Beast mode activated"
      ]
    ],
    "male": [
      [
        "💪 Stronger every single day",
        "🏋️ Gym is my therapy",
        "🔥 Sweat now shine later",
        "⭐ Fit body fierce mind"
      ],
      [
        "🥗 Eat clean train dirty",
        "💯 No pain no gain",
        "🦋 Transforming one rep at a time",
        "⚡ Beast mode activated"
      ]
    ]
  },
  "food": {
    "female": [
      [
        "🍕 Living to eat not eating to live",
        "🍰 Foodie soul hungry heart",
        "☕ Coffee first questions later",
        "🍔 Calories do not count on weekends"
      ],
      [
        "🌮 Taco bout a good time",
        "🍩 Sweet tooth certified",
        "✨ Good food good mood",
        "🔥 Food is my love language"
      ]
    ],
    "male": [
      [
        "🍕 Living to eat not eating to live",
        "🍰 Foodie soul hungry heart",
        "☕ Coffee first questions later",
        "🍔 Calories do not count on weekends"
      ],
      [
        "🌮 Taco bout a good time",
        "🍩 Sweet tooth certified",
        "✨ Good food good mood",
        "🔥 Food is my love language"
      ]
    ]
  },
  "friends": {
    "female": [
      [
        "👯 Squad goals only",
        "😂 My friends know too much",
        "💕 Real ones since day one",
        "🎉 Partners in every adventure"
      ],
      [
        "✨ Friendship over everything",
        "🌟 Ride or die crew",
        "💯 Loyalty runs deep here",
        "🔥 Making memories with my people"
      ]
    ],
    "male": [
      [
        "👯 Squad goals only",
        "😂 My boys know too much",
        "💕 Real ones since day one",
        "🎉 Partners in every adventure"
      ],
      [
        "✨ Friendship over everything",
        "🌟 Ride or die crew",
        "💯 Loyalty runs deep here",
        "🔥 Making memories with my people"
      ]
    ]
  },
  "gaming": {
    "female": [
      [
        "🎮 Press start to continue",
        "🔥 Pro gamer energy",
        "👾 Level up daily",
        "💯 Winner mindset always"
      ],
      [
        "🕹️ Gaming is not a hobby it is life",
        "⚡ Lag free vibes only",
        "🏆 Queen of the leaderboard",
        "✨ Respawn and conquer"
      ]
    ],
    "male": [
      [
        "🎮 Press start to continue",
        "🔥 Pro gamer energy",
        "👾 Level up daily",
        "💯 Winner mindset always"
      ],
      [
        "🕹️ Gaming is not a hobby it is life",
        "⚡ Lag free vibes only",
        "🏆 King of the leaderboard",
        "✨ Respawn and conquer"
      ]
    ]
  },
  "influencer": {
    "female": [
      [
        "✨ Creating content inspiring souls",
        "📱 Digital queen real vibes",
        "🔥 Trendsetter not follower",
        "💫 Living my best brand life"
      ],
      [
        "🌟 Influencer by passion creator by heart",
        "📸 Storyteller in pixels",
        "💯 Authenticity is my aesthetic",
        "⭐ Your daily dose of inspiration"
      ]
    ],
    "male": [
      [
        "✨ Creating content inspiring souls",
        "📱 Digital king real vibes",
        "🔥 Trendsetter not follower",
        "💫 Living my best brand life"
      ],
      [
        "🌟 Influencer by passion creator by heart",
        "📸 Storyteller in pixels",
        "💯 Authenticity is my aesthetic",
        "⭐ Your daily dose of inspiration"
      ]
    ]
  },
  "introverts": {
    "female": [
      [
        "🌙 Quiet mind loud dreams",
        "📚 Books over parties",
        "🖤 Introvert with extrovert skills",
        "✨ Silence is my superpower"
      ],
      [
        "🦋 Soft heart deep thoughts",
        "☕ Cozy vibes only",
        "💭 Thinking more speaking less",
        "🌸 Peace over drama always"
      ]
    ],
    "male": [
      [
        "🌙 Quiet mind loud dreams",
        "📚 Books over parties",
        "🖤 Introvert with extrovert skills",
        "✨ Silence is my superpower"
      ],
      [
        "🦋 Soft heart deep thoughts",
        "☕ Cozy vibes only",
        "💭 Thinking more speaking less",
        "🌸 Peace over drama always"
      ]
    ]
  },
  "love": {
    "female": [
      [
        "❤️ Love is in the air",
        "💕 Heart full of you",
        "🥰 Smitten and not sorry",
        "✨ You are my favorite notification"
      ],
      [
        "🌹 Romance is my aesthetic",
        "💑 Crazy in love and proud",
        "💖 Love made me do it",
        "⭐ Soulmate energy only"
      ]
    ],
    "male": [
      [
        "❤️ Love is in the air",
        "💕 Heart full of you",
        "🥰 Smitten and not sorry",
        "✨ You are my favorite notification"
      ],
      [
        "🌹 Romance is my aesthetic",
        "💑 Crazy in love and proud",
        "💖 Love made me do it",
        "⭐ Soulmate energy only"
      ]
    ]
  },
  "sad": {
    "female": [
      [
        "🥀 Hurting but still smiling",
        "🌧️ Rainy days quiet thoughts",
        "💔 Broken but beautiful",
        "🕯️ Finding light in the dark"
      ],
      [
        "😔 Pain taught me patience",
        "🖤 Numb heart loud mind",
        "🌙 Late night overthinking",
        "✨ Healing in progress"
      ]
    ],
    "male": [
      [
        "🥀 Hurting but still smiling",
        "🌧️ Rainy days quiet thoughts",
        "💔 Broken but beautiful",
        "🕯️ Finding light in the dark"
      ],
      [
        "😔 Pain taught me patience",
        "🖤 Numb heart loud mind",
        "🌙 Late night overthinking",
        "✨ Healing in progress"
      ]
    ]
  },
  "islamic": {
    "female": [
      [
        "☪️ Alhamdulillah for everything",
        "🤲 Trust Allah plan",
        "📿 Faith over fear always",
        "✨ Muslimah with purpose"
      ],
      [
        "🕌 Deen over dunya",
        "💚 Sabr and shukr",
        "⭐ Seeking Jannah",
        "🙏 Allah knows best"
      ]
    ],
    "male": [
      [
        "☪️ Alhamdulillah for everything",
        "🤲 Trust Allah plan",
        "📿 Faith over fear always",
        "✨ Muslim with purpose"
      ],
      [
        "🕌 Deen over dunya",
        "💚 Sabr and shukr",
        "⭐ Seeking Jannah",
        "🙏 Allah knows best"
      ]
    ]
  },
  "professional": {
    "female": [
      [
        "💼 Professional by day dreamer always",
        "📊 Results driven value focused",
        "🎯 Career goals loading",
        "✨ Excellence is my standard"
      ],
      [
        "⭐ Building my legacy daily",
        "📈 Growth mindset only",
        "🔥 Work ethic unmatched",
        "💯 Your go-to expert"
      ]
    ],
    "male": [
      [
        "💼 Professional by day dreamer always",
        "📊 Results driven value focused",
        "🎯 Career goals loading",
        "✨ Excellence is my standard"
      ],
      [
        "⭐ Building my legacy daily",
        "📈 Growth mindset only",
        "🔥 Work ethic unmatched",
        "💯 Your go-to expert"
      ]
    ]
  },
  "aesthetic": {
    "female": [
      [
        "🌸 Soft vibes hard aesthetic",
        "✨ Pastel dreams bold energy",
        "🦋 Main character energy only",
        "💫 Living in my aesthetic era"
      ],
      [
        "🌙 Moody tones golden soul",
        "📸 Every frame is art",
        "🖤 Minimal look maximum impact",
        "⭐ Aesthetic over everything"
      ]
    ],
    "male": [
      [
        "🌸 Clean fits calm aesthetic",
        "✨ Minimal style loud presence",
        "🦋 Main character energy only",
        "💫 Living in my aesthetic era"
      ],
      [
        "🌙 Moody tones golden soul",
        "📸 Every frame is art",
        "🖤 Simple look maximum impact",
        "⭐ Aesthetic over everything"
      ]
    ]
  },
  "birthday": {
    "female": [
      [
        "🎂 Another year bolder brighter",
        "🎉 Birthday queen energy today",
        "🎁 Level up unlocked",
        "✨ Making this year legendary"
      ],
      [
        "🥳 Born day vibes only",
        "🎈 Celebrating me today",
        "💫 New chapter new glow",
        "👑 Birthday mood activated"
      ]
    ],
    "male": [
      [
        "🎂 Another year bolder brighter",
        "🎉 Birthday king energy today",
        "🎁 Level up unlocked",
        "✨ Making this year legendary"
      ],
      [
        "🥳 Born day vibes only",
        "🎈 Celebrating me today",
        "💫 New chapter new grind",
        "👑 Birthday mood activated"
      ]
    ]
  },
  "boys": {
    "female": [
      [
        "😎 Bold vibes only",
        "🔥 Strong mind soft heart",
        "💪 Built different daily",
        "⭐ Unbothered and focused"
      ],
      [
        "👑 Queen energy boyish charm",
        "⚡ Silent grind loud results",
        "🖤 Real ones only",
        "✌️ My lane my rules"
      ]
    ],
    "male": [
      [
        "😎 King mentality no negotiations",
        "🔥 Attitude loaded safety off",
        "💪 Built different born to win",
        "⭐ Unbothered and focused"
      ],
      [
        "👑 A king never explains himself",
        "⚡ Silent grind loud results",
        "🖤 Real ones only",
        "✌️ My lane my rules"
      ]
    ]
  },
  "cool": {
    "female": [
      [
        "😎 Too cool for drama",
        "🕶️ Chill vibes only",
        "❄️ Ice in my veins fire in my soul",
        "✨ Effortlessly cool always"
      ],
      [
        "🌊 Go with the flow queen",
        "💫 Cool mind warm heart",
        "🔥 Low key high value",
        "⭐ Stay cool stay winning"
      ]
    ],
    "male": [
      [
        "😎 Too cool for drama",
        "🕶️ Chill vibes only",
        "❄️ Ice in my veins fire in my soul",
        "✨ Effortlessly cool always"
      ],
      [
        "🌊 Go with the flow king",
        "💫 Cool mind warm heart",
        "🔥 Low key high value",
        "⭐ Stay cool stay winning"
      ]
    ]
  },
  "cute": {
    "female": [
      [
        "🌸 Cute but dangerous",
        "🧸 Sweet smile savage mind",
        "💕 Soft heart strong vibe",
        "✨ Cutie with a purpose"
      ],
      [
        "🎀 Pretty energy pure soul",
        "🦋 Cute vibes only",
        "💖 Sugar spice everything nice",
        "⭐ Adorably unstoppable"
      ]
    ],
    "male": [
      [
        "🌸 Cute smile savage game",
        "🧸 Good boy bad intentions",
        "💕 Soft heart strong vibe",
        "✨ Cute but competitive"
      ],
      [
        "😊 Humble face winner mindset",
        "🦋 Kind vibes only",
        "💖 Charm loaded daily",
        "⭐ Adorably unstoppable"
      ]
    ]
  },
  "fashion": {
    "female": [
      [
        "👗 Outfit of the day everyday",
        "✨ Style is my language",
        "💅 Dressed to impress always",
        "🔥 Fashion first attitude second"
      ],
      [
        "👠 Heels higher standards higher",
        "💫 Trendsetter by nature",
        "🖤 Chic bold unforgettable",
        "⭐ Runway ready always"
      ]
    ],
    "male": [
      [
        "👔 Fit check passed daily",
        "✨ Style is my language",
        "💅 Dressed to impress always",
        "🔥 Fashion first attitude second"
      ],
      [
        "👟 Sneaker head clean fits",
        "💫 Trendsetter by nature",
        "🖤 Sharp bold unforgettable",
        "⭐ Runway ready always"
      ]
    ]
  },
  "free_fire": {
    "female": [
      [
        "🔥 Born to booyah",
        "🎯 Headshot energy only",
        "👑 Queen of the lobby",
        "💯 Rank push mode on"
      ],
      [
        "🎮 Free Fire is my world",
        "⚡ Clutch queen every match",
        "🏆 Winner mindset always",
        "✨ Respawn and dominate"
      ]
    ],
    "male": [
      [
        "🔥 Born to booyah",
        "🎯 Headshot energy only",
        "👑 King of the lobby",
        "💯 Rank push mode on"
      ],
      [
        "🎮 Free Fire is my world",
        "⚡ Clutch king every match",
        "🏆 Winner mindset always",
        "✨ Respawn and dominate"
      ]
    ]
  },
  "funny": {
    "female": [
      [
        "😂 Professional overthinker",
        "🤪 Here for the memes",
        "☕ Powered by sarcasm",
        "✨ Making bad decisions look cute"
      ],
      [
        "😁 Laugh now cry later",
        "🎭 Comedy is my coping skill",
        "🔥 Funny bone fully loaded",
        "⭐ Your daily dose of chaos"
      ]
    ],
    "male": [
      [
        "😂 Professional overthinker",
        "🤪 Here for the memes",
        "☕ Powered by sarcasm",
        "✨ Making bad decisions look cool"
      ],
      [
        "😁 Laugh now grind later",
        "🎭 Comedy is my coping skill",
        "🔥 Funny bone fully loaded",
        "⭐ Your daily dose of chaos"
      ]
    ]
  },
  "girls": {
    "female": [
      [
        "👑 Queen of her own world",
        "💅 Classy sassy unstoppable",
        "✨ Pretty mind pretty soul",
        "🔥 She believed she could"
      ],
      [
        "🌸 Soft heart fierce spirit",
        "💫 Main character energy",
        "💖 Self love first always",
        "⭐ Girl boss in progress"
      ]
    ],
    "male": [
      [
        "👑 Supporting queens daily",
        "💅 Respect women always",
        "✨ Raised by a strong woman",
        "🔥 Real men lift women up"
      ],
      [
        "🌸 Gentle heart strong values",
        "💫 Loyalty over everything",
        "💖 Class over chaos",
        "⭐ Built on respect"
      ]
    ]
  },
  "models": {
    "female": [
      [
        "📸 Camera loves me",
        "✨ Runway in my DNA",
        "💫 Pose ready always",
        "🔥 Beauty brains and boldness"
      ],
      [
        "👠 Strut mode activated",
        "⭐ Face card never declines",
        "🖤 Editorial energy only",
        "💅 Model mindset daily"
      ]
    ],
    "male": [
      [
        "📸 Camera loves me",
        "✨ Runway in my DNA",
        "💫 Pose ready always",
        "🔥 Style brains and boldness"
      ],
      [
        "👔 Frame ready always",
        "⭐ Face card never declines",
        "🖤 Editorial energy only",
        "💅 Model mindset daily"
      ]
    ]
  },
  "motivational": {
    "female": [
      [
        "🚀 Dream big work hard",
        "💪 Fall seven rise eight",
        "✨ Your only limit is you",
        "🔥 Progress over perfection"
      ],
      [
        "⭐ Believe in your hustle",
        "🎯 Goals loading stay focused",
        "💫 Turn pain into power",
        "🌟 Rise grind repeat"
      ]
    ],
    "male": [
      [
        "🚀 Dream big work hard",
        "💪 Fall seven rise eight",
        "✨ Your only limit is you",
        "🔥 Progress over perfection"
      ],
      [
        "⭐ Believe in your hustle",
        "🎯 Goals loading stay focused",
        "💫 Turn pain into power",
        "🌟 Rise grind repeat"
      ]
    ]
  },
  "music": {
    "female": [
      [
        "🎵 Music is my mood",
        "🎧 Headphones on world off",
        "🎤 Living in my playlist",
        "✨ Beats over drama always"
      ],
      [
        "🎶 Rhythm in my soul",
        "🔥 Concert heart daily life",
        "💫 Lyrics speak what I feel",
        "⭐ Soundtrack of my life"
      ]
    ],
    "male": [
      [
        "🎵 Music is my mood",
        "🎧 Headphones on world off",
        "🎤 Living in my playlist",
        "✨ Beats over drama always"
      ],
      [
        "🎶 Rhythm in my soul",
        "🔥 Concert heart daily life",
        "💫 Lyrics speak what I feel",
        "⭐ Soundtrack of my life"
      ]
    ]
  },
  "poetry": {
    "female": [
      [
        "📝 Ink runs through my veins",
        "🌙 Poet soul wild heart",
        "✨ Words heal what silence breaks",
        "💫 Rhymes in midnight thoughts"
      ],
      [
        "🖊️ Writing my way through life",
        "🌸 Soft words sharp mind",
        "🔥 Poetry in motion",
        "⭐ Verse by verse I rise"
      ]
    ],
    "male": [
      [
        "📝 Ink runs through my veins",
        "🌙 Poet soul wild heart",
        "✨ Words heal what silence breaks",
        "💫 Rhymes in midnight thoughts"
      ],
      [
        "🖊️ Writing my way through life",
        "🌸 Soft words sharp mind",
        "🔥 Poetry in motion",
        "⭐ Verse by verse I rise"
      ]
    ]
  },
  "quotes": {
    "female": [
      [
        "💬 Living by my own quotes",
        "✨ Words worth remembering",
        "📖 Collecting moments and quotes",
        "🔥 Speak less mean more"
      ],
      [
        "⭐ Quote lover deep thinker",
        "💫 Wisdom in every caption",
        "🖤 Short lines long impact",
        "✌️ My bio my manifesto"
      ]
    ],
    "male": [
      [
        "💬 Living by my own quotes",
        "✨ Words worth remembering",
        "📖 Collecting moments and quotes",
        "🔥 Speak less mean more"
      ],
      [
        "⭐ Quote lover deep thinker",
        "💫 Wisdom in every caption",
        "🖤 Short lines long impact",
        "✌️ My bio my manifesto"
      ]
    ]
  },
  "sports": {
    "female": [
      [
        "⚽ Game face on always",
        "🏆 Born to compete",
        "💪 Train like a champion",
        "🔥 Sweat now shine later"
      ],
      [
        "🏅 Sports over excuses",
        "⭐ Team player leader mindset",
        "✨ Athlete heart daily grind",
        "💯 Play hard win harder"
      ]
    ],
    "male": [
      [
        "⚽ Game face on always",
        "🏆 Born to compete",
        "💪 Train like a champion",
        "🔥 Sweat now shine later"
      ],
      [
        "🏅 Sports over excuses",
        "⭐ Team player leader mindset",
        "✨ Athlete heart daily grind",
        "💯 Play hard win harder"
      ]
    ]
  },
  "student": {
    "female": [
      [
        "📚 Study now shine later",
        "🎓 Future doctor in making",
        "✏️ Caffeine and deadlines",
        "⭐ Smart girl big dreams"
      ],
      [
        "📝 Notes over nonsense",
        "💡 Learning growing winning",
        "🔥 Student by day dreamer always",
        "✨ Books brains and ambition"
      ]
    ],
    "male": [
      [
        "📚 Study now shine later",
        "🎓 Future engineer in making",
        "✏️ Caffeine and deadlines",
        "⭐ Smart grind big dreams"
      ],
      [
        "📝 Notes over nonsense",
        "💡 Learning growing winning",
        "🔥 Student by day dreamer always",
        "✨ Books brains and ambition"
      ]
    ]
  },
  "stylish": {
    "female": [
      [
        "✨ Style speaks before I do",
        "💅 Drip check passed",
        "🔥 Fashion forward always",
        "⭐ Styled to stand out"
      ],
      [
        "👗 Outfit game too strong",
        "💫 Chic on purpose",
        "🖤 Elegance with edge",
        "✌️ Trendy not thirsty"
      ]
    ],
    "male": [
      [
        "✨ Style speaks before I do",
        "💅 Drip check passed",
        "🔥 Fashion forward always",
        "⭐ Styled to stand out"
      ],
      [
        "👔 Fit game too strong",
        "💫 Clean on purpose",
        "🖤 Elegance with edge",
        "✌️ Trendy not thirsty"
      ]
    ]
  },
  "travel": {
    "female": [
      [
        "✈️ Passport full heart fuller",
        "🌍 Collecting stamps not things",
        "🏖️ Wander often wonder always",
        "✨ Adventure is my therapy"
      ],
      [
        "🗺️ Lost in the right direction",
        "📸 Travel addict forever",
        "🔥 Next stop loading",
        "⭐ Explore dream discover"
      ]
    ],
    "male": [
      [
        "✈️ Passport full heart fuller",
        "🌍 Collecting stamps not things",
        "🏖️ Wander often wonder always",
        "✨ Adventure is my therapy"
      ],
      [
        "🗺️ Lost in the right direction",
        "📸 Travel addict forever",
        "🔥 Next stop loading",
        "⭐ Explore dream discover"
      ]
    ]
  },
  "vip": {
    "female": [
      [
        "👑 VIP access only",
        "💎 Luxury mindset daily",
        "✨ Too elite for average",
        "🔥 Classy rich energy"
      ],
      [
        "⭐ Premium vibes exclusive life",
        "💅 High standards higher taste",
        "🖤 Royalty in my blood",
        "✌️ VIP by birth by choice"
      ]
    ],
    "male": [
      [
        "👑 VIP access only",
        "💎 Luxury mindset daily",
        "✨ Too elite for average",
        "🔥 Classy rich energy"
      ],
      [
        "⭐ Premium vibes exclusive life",
        "💅 High standards higher taste",
        "🖤 Royalty in my blood",
        "✌️ VIP by birth by choice"
      ]
    ]
  },
  "creator": {
    "female": [
      [
        "✨ Creating my own magic",
        "🎬 Director of my life",
        "💡 Innovator and dreamer",
        "🌟 Inspiring one post at a time"
      ],
      [
        "🎨 Art in motion",
        "📸 Capturing raw moments",
        "💫 Unfiltered and authentic",
        "✨ Making ideas happen"
      ]
    ],
    "male": [
      [
        "✨ Creating my own magic",
        "🎬 Director of my life",
        "💡 Innovator and dreamer",
        "🌟 Inspiring one post at a time"
      ],
      [
        "🎨 Art in motion",
        "📸 Capturing raw moments",
        "💫 Unfiltered and authentic",
        "✨ Making ideas happen"
      ]
    ]
  },
  "blogger": {
    "female": [
      [
        "✍️ Writing my life story",
        "📝 Daily dose of me",
        "📸 Living sharing inspiring",
        "✨ Words have power"
      ],
      [
        "💻 Digital diary",
        "🌸 Romanticizing my life",
        "☕ Coffee and content",
        "🌟 Turning thoughts to text"
      ]
    ],
    "male": [
      [
        "✍️ Writing my life story",
        "📝 Daily dose of me",
        "📸 Living sharing inspiring",
        "✨ Words have power"
      ],
      [
        "💻 Digital diary",
        "🔥 Documenting the journey",
        "☕ Coffee and content",
        "🌟 Turning thoughts to text"
      ]
    ]
  },
  "pubg": {
    "female": [
      [
        "🍳 Pan killer energy",
        "🔫 Winner Winner Chicken Dinner",
        "🎯 Headshots only",
        "🏆 Queen of Erangel"
      ],
      [
        "🎮 PUBG is life",
        "⚡ Loot shoot survive",
        "🔥 Ready for the zone",
        "💯 No mercy mode"
      ]
    ],
    "male": [
      [
        "🍳 Pan killer energy",
        "🔫 Winner Winner Chicken Dinner",
        "🎯 Headshots only",
        "🏆 King of Erangel"
      ],
      [
        "🎮 PUBG is life",
        "⚡ Loot shoot survive",
        "🔥 Ready for the zone",
        "💯 No mercy mode"
      ]
    ]
  },
  "developer": {
    "female": [
      [
        "💻 Turning coffee into code",
        "⌨️ Building the future",
        "🚀 Ship it",
        "👩‍💻 Code sleep repeat"
      ],
      [
        "☕ Fluent in JavaScript",
        "🐛 Bug hunter",
        "✨ Creating digital solutions",
        "🌟 Tech enthusiast"
      ]
    ],
    "male": [
      [
        "💻 Turning coffee into code",
        "⌨️ Building the future",
        "🚀 Ship it",
        "👨‍💻 Code sleep repeat"
      ],
      [
        "☕ Fluent in JavaScript",
        "🐛 Bug hunter",
        "✨ Creating digital solutions",
        "🌟 Tech enthusiast"
      ]
    ]
  },
  "doctor": {
    "female": [
      [
        "⚕️ Saving lives daily",
        "🩺 Compassion and care",
        "🤍 Trust the process",
        "🏥 Medical professional"
      ],
      [
        "💊 Healing hands",
        "👩‍⚕️ Proud to serve",
        "✨ Science and empathy",
        "🌟 Dedication to health"
      ]
    ],
    "male": [
      [
        "⚕️ Saving lives daily",
        "🩺 Compassion and care",
        "🤍 Trust the process",
        "🏥 Medical professional"
      ],
      [
        "💊 Healing hands",
        "👨‍⚕️ Proud to serve",
        "✨ Science and empathy",
        "🌟 Dedication to health"
      ]
    ]
  },
  "teacher": {
    "female": [
      [
        "📚 Shaping future minds",
        "🍎 Education is power",
        "✏️ Inspire and empower",
        "🎓 Teaching with love"
      ],
      [
        "📖 Lifelong learner",
        "👩‍🏫 Guiding the next generation",
        "✨ Knowledge shared",
        "🌟 Making a difference"
      ]
    ],
    "male": [
      [
        "📚 Shaping future minds",
        "🍎 Education is power",
        "✏️ Inspire and empower",
        "🎓 Teaching with passion"
      ],
      [
        "📖 Lifelong learner",
        "👨‍🏫 Guiding the next generation",
        "✨ Knowledge shared",
        "🌟 Making a difference"
      ]
    ]
  }
};

export function pickRandomBio(
  categoryId: CategoryId,
  gender: Gender,
  excludeIndices: number[] = []
): { lines: string[]; index: number } {
  const pool = bios[categoryId][gender];
  const available = pool
    .map((_, i) => i)
    .filter((i) => !excludeIndices.includes(i));

  const indices = available.length > 0 ? available : pool.map((_, i) => i);
  const index = indices[Math.floor(Math.random() * indices.length)];

  return { lines: [...pool[index]], index };
}

// Name-based personalization templates grouped by category mood
const NAME_TEMPLATES: Record<string, string[]> = {
  attitude: [
    "👑 It's {name}'s world, you're just living in it",
    "🔥 {name} — born to rule",
    "😎 {name} doesn't follow trends, {name} sets them",
    "⚡ {name} — unbothered & unstoppable",
    "💯 Call me {name}, remember the name",
    "🖤 {name} — too real for fake people",
  ],
  aesthetic: [
    "✨ {name}'s aesthetic era",
    "🌸 {name} — soft soul, bold vision",
    "🌙 {name} vibes only",
    "🦋 {name} — main character energy",
    "💫 It's a {name} thing, you wouldn't get it",
  ],
  love: [
    "❤️ {name} — hopelessly in love",
    "💕 {name}'s heart is taken",
    "🥰 {name} believes in forever",
    "🌹 {name} — love is my superpower",
    "💖 {name} — spreading love daily",
  ],
  cool: [
    "😎 {name} — effortlessly cool",
    "🕶️ {name} keeps it real",
    "❄️ {name} — ice cold, fire soul",
    "🌊 {name} — go with the flow",
    "💫 {name} — low key, high value",
  ],
  motivational: [
    "🚀 {name} — dream big, grind harder",
    "💪 {name} never gives up",
    "🔥 {name} — rising every day",
    "🎯 {name} — focused on greatness",
    "✨ {name}'s success story loading...",
  ],
  funny: [
    "😂 {name} — professionally funny",
    "🤪 {name} — 99% humor, 1% serious",
    "🎭 {name} — making the world laugh",
    "😁 {name} — allergic to boring",
    "☕ {name} runs on coffee and chaos",
  ],
  professional: [
    "💼 {name} — building something big",
    "📈 {name} — results over excuses",
    "🎯 {name} — on a mission",
    "⭐ {name} — excellence is my standard",
    "📊 {name} — work hard, stay humble",
  ],
  fitness: [
    "💪 {name} — stronger every day",
    "🏋️ {name}'s gym era",
    "🔥 {name} — beast mode ON",
    "⚡ {name} — no excuses, only gains",
    "💯 {name} — built different",
  ],
  gaming: [
    "🎮 {name} — pro gamer vibes",
    "👾 {name} — leveling up daily",
    "🏆 {name} — born to win",
    "⚡ {name} — GG EZ",
    "🕹️ {name} — respawn & dominate",
  ],
  music: [
    "🎵 {name} — life is my playlist",
    "🎧 {name} — lost in the music",
    "🎤 {name} — born to sing",
    "🎶 {name}'s world runs on beats",
    "🎸 {name} — music is my therapy",
  ],
  default: [
    "✨ It's {name}",
    "👑 {name} — living my best life",
    "🔥 {name} — one of a kind",
    "💫 This is {name}'s story",
    "⭐ {name} — just being me",
    "🌟 {name} — shining bright always",
    "🖤 {name} — real & rare",
    "💯 {name} — authentically me",
  ],
};

// Map categories to their closest name template group
const CATEGORY_TO_TEMPLATE_GROUP: Partial<Record<CategoryId, string>> = {
  attitude: "attitude",
  aesthetic: "aesthetic",
  love: "love",
  couples: "love",
  cool: "cool",
  motivational: "motivational",
  funny: "funny",
  professional: "professional",
  business: "professional",
  entrepreneur: "professional",
  fitness: "fitness",
  sports: "fitness",
  gaming: "gaming",
  free_fire: "gaming",
  pubg: "gaming",
  music: "music",
};

/**
 * Personalize bio lines by adding a name-based line.
 * Replaces the first line of the bio with a personalized name line.
 */
export function personalizeBioWithName(
  lines: string[],
  name: string,
  categoryId: CategoryId
): string[] {
  if (!name.trim()) return lines;

  const trimmedName = name.trim();
  const group = CATEGORY_TO_TEMPLATE_GROUP[categoryId] || "default";
  const templates = NAME_TEMPLATES[group] || NAME_TEMPLATES["default"];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const personalizedLine = template.replace(/\{name\}/g, trimmedName);

  // Replace the first line with the personalized name line
  const newLines = [...lines];
  newLines[0] = personalizedLine;
  return newLines;
}
