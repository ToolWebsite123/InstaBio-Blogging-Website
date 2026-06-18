import fs from 'fs';
import { bios as oldBios, CATEGORY_EMOJIS as oldEmojis } from './lib/bioTemplates';

const newCategoriesList = [
  'Fitness', 'Travel', 'Food', 'Gaming', 'Student', 'Business', 'Fashion', 
  'Music', 'Artist', 'Influencer', 'Creator', 'Blogger', 'Free Fire', 'PUBG', 
  'Developer', 'Entrepreneur', 'Doctor', 'Teacher', 'Love', 'Attitude', 'VIP', 'Aesthetic'
];

const renamingMap: Record<string, string> = {
  'Fitness/Gym': 'fitness',
  'Foodies': 'food',
  'Gamers': 'gaming',
  'Students': 'student',
  'Businessman': 'business',
  'Artists': 'artist',
  'Influencers': 'influencer',
  'Entrepreneurs': 'entrepreneur',
};

const iconMapping: Record<string, string> = {
  fitness: 'Dumbbell',
  travel: 'Plane',
  food: 'Utensils',
  gaming: 'Gamepad2',
  student: 'GraduationCap',
  business: 'Briefcase',
  fashion: 'Shirt',
  music: 'Music',
  artist: 'Palette',
  influencer: 'Smartphone',
  creator: 'Sparkles',
  blogger: 'BookOpen',
  free_fire: 'Flame',
  pubg: 'Crosshair',
  developer: 'Code',
  entrepreneur: 'Rocket',
  doctor: 'Stethoscope',
  teacher: 'BookA',
  love: 'Heart',
  attitude: 'Zap',
  vip: 'Crown',
  aesthetic: 'Moon',
  birthday: 'Cake',
  boys: 'User',
  cool: 'Snowflake',
  couples: 'Users',
  cute: 'Smile',
  extroverts: 'MessageCircle',
  family: 'Home',
  friends: 'Users2',
  funny: 'Laugh',
  girls: 'UserCircle',
  introverts: 'Headphones',
  islamic: 'MoonStar',
  models: 'Camera',
  motivational: 'Target',
  photographers: 'Camera',
  poetry: 'Feather',
  professional: 'Briefcase',
  quotes: 'Quote',
  sad: 'CloudRain',
  sports: 'Trophy',
  stylish: 'Scissors',
};

const defaultEmojis: Record<string, string[]> = {
  creator: ["✨", "🎨", "💡", "🎬", "🌟"],
  blogger: ["✍️", "📝", "📸", "💻", "✨"],
  pubg: ["🍳", "🔫", "🎯", "🏆", "🎮"],
  developer: ["💻", "⌨️", "🚀", "☕", "👨‍💻"],
  doctor: ["⚕️", "🩺", "🤍", "💊", "🏥"],
  teacher: ["📚", "🍎", "✏️", "🎓", "📖"],
};

const newBiosTemplate: Record<string, any> = {
  creator: {
    female: [
      ["✨ Creating my own magic", "🎬 Director of my life", "💡 Innovator and dreamer", "🌟 Inspiring one post at a time"],
      ["🎨 Art in motion", "📸 Capturing raw moments", "💫 Unfiltered and authentic", "✨ Making ideas happen"]
    ],
    male: [
      ["✨ Creating my own magic", "🎬 Director of my life", "💡 Innovator and dreamer", "🌟 Inspiring one post at a time"],
      ["🎨 Art in motion", "📸 Capturing raw moments", "💫 Unfiltered and authentic", "✨ Making ideas happen"]
    ]
  },
  blogger: {
    female: [
      ["✍️ Writing my life story", "📝 Daily dose of me", "📸 Living sharing inspiring", "✨ Words have power"],
      ["💻 Digital diary", "🌸 Romanticizing my life", "☕ Coffee and content", "🌟 Turning thoughts to text"]
    ],
    male: [
      ["✍️ Writing my life story", "📝 Daily dose of me", "📸 Living sharing inspiring", "✨ Words have power"],
      ["💻 Digital diary", "🔥 Documenting the journey", "☕ Coffee and content", "🌟 Turning thoughts to text"]
    ]
  },
  pubg: {
    female: [
      ["🍳 Pan killer energy", "🔫 Winner Winner Chicken Dinner", "🎯 Headshots only", "🏆 Queen of Erangel"],
      ["🎮 PUBG is life", "⚡ Loot shoot survive", "🔥 Ready for the zone", "💯 No mercy mode"]
    ],
    male: [
      ["🍳 Pan killer energy", "🔫 Winner Winner Chicken Dinner", "🎯 Headshots only", "🏆 King of Erangel"],
      ["🎮 PUBG is life", "⚡ Loot shoot survive", "🔥 Ready for the zone", "💯 No mercy mode"]
    ]
  },
  developer: {
    female: [
      ["💻 Turning coffee into code", "⌨️ Building the future", "🚀 Ship it", "👩‍💻 Code sleep repeat"],
      ["☕ Fluent in JavaScript", "🐛 Bug hunter", "✨ Creating digital solutions", "🌟 Tech enthusiast"]
    ],
    male: [
      ["💻 Turning coffee into code", "⌨️ Building the future", "🚀 Ship it", "👨‍💻 Code sleep repeat"],
      ["☕ Fluent in JavaScript", "🐛 Bug hunter", "✨ Creating digital solutions", "🌟 Tech enthusiast"]
    ]
  },
  doctor: {
    female: [
      ["⚕️ Saving lives daily", "🩺 Compassion and care", "🤍 Trust the process", "🏥 Medical professional"],
      ["💊 Healing hands", "👩‍⚕️ Proud to serve", "✨ Science and empathy", "🌟 Dedication to health"]
    ],
    male: [
      ["⚕️ Saving lives daily", "🩺 Compassion and care", "🤍 Trust the process", "🏥 Medical professional"],
      ["💊 Healing hands", "👨‍⚕️ Proud to serve", "✨ Science and empathy", "🌟 Dedication to health"]
    ]
  },
  teacher: {
    female: [
      ["📚 Shaping future minds", "🍎 Education is power", "✏️ Inspire and empower", "🎓 Teaching with love"],
      ["📖 Lifelong learner", "👩‍🏫 Guiding the next generation", "✨ Knowledge shared", "🌟 Making a difference"]
    ],
    male: [
      ["📚 Shaping future minds", "🍎 Education is power", "✏️ Inspire and empower", "🎓 Teaching with passion"],
      ["📖 Lifelong learner", "👨‍🏫 Guiding the next generation", "✨ Knowledge shared", "🌟 Making a difference"]
    ]
  }
};

let output = `import { ElementType } from "react";
import {
  Dumbbell, Plane, Utensils, Gamepad2, GraduationCap, Briefcase,
  Shirt, Music, Palette, Smartphone, Sparkles, BookOpen,
  Flame, Crosshair, Code, Rocket, Stethoscope, BookA,
  Heart, Zap, Crown, Moon, Cake, User, Snowflake, Users, Smile,
  MessageCircle, Home, Users2, Laugh, UserCircle, Headphones,
  MoonStar, Camera, Target, Feather, Quote, CloudRain, Trophy, Scissors, Star
} from "lucide-react";

export type Gender = "male" | "female";

`;

const newBios: Record<string, any> = {};
const metaObj: Record<string, any> = {};

for (const [oldName, bioData] of Object.entries(oldBios)) {
  const renamedId = renamingMap[oldName] || oldName.toLowerCase().replace(/\s+/g, '_');
  const label = newCategoriesList.find(c => c.toLowerCase() === renamedId.replace('_', ' ')) || oldName;
  
  newBios[renamedId] = bioData;
  metaObj[renamedId] = {
    id: renamedId,
    label: label,
    icon: iconMapping[renamedId] || 'Star',
    emojis: oldEmojis[oldName as keyof typeof oldEmojis] || ["✨", "🔥", "💯", "⭐", "✌️"]
  };
}

for (const [newId, bioData] of Object.entries(newBiosTemplate)) {
  const label = newCategoriesList.find(c => c.toLowerCase() === newId.replace('_', ' ')) || newId;
  newBios[newId] = bioData;
  metaObj[newId] = {
    id: newId,
    label: label,
    icon: iconMapping[newId] || 'Star',
    emojis: defaultEmojis[newId] || ["✨", "🔥", "💯", "⭐", "✌️"]
  };
}

const sortedMetaIds = Object.keys(metaObj).sort((a, b) => metaObj[a].label.localeCompare(metaObj[b].label));

output += `export type CategoryId = \n` + sortedMetaIds.map(id => `  | "${id}"`).join('\n') + `;\n\n`;

output += `export type BioCategoryDef = {
  id: CategoryId;
  label: string;
  icon: ElementType;
  emojis: string[];
};\n\n`;

output += `export const CATEGORY_META: Record<CategoryId, BioCategoryDef> = {\n`;
for (const id of sortedMetaIds) {
  const m = metaObj[id];
  output += `  "${id}": { id: "${id}", label: "${m.label}", icon: ${m.icon}, emojis: ${JSON.stringify(m.emojis)} },\n`;
}
output += `};\n\n`;

output += `export const BIO_CATEGORIES = Object.values(CATEGORY_META);\n\n`;
output += `type BioSet = Record<Gender, string[][]>;\n\n`;

output += `export const bios: Record<CategoryId, BioSet> = ${JSON.stringify(newBios, null, 2)};\n\n`;

output += `export function pickRandomBio(
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
}\n`;

fs.writeFileSync('lib/bioTemplates.ts', output);
console.log('Successfully generated lib/bioTemplates.ts');
