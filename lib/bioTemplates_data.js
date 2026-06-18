

const BIO_CATEGORIES = [
  "Artists",
  "Attitude",
  "Aesthetic",
  "Birthday",
  "Boys",
  "Businessman",
  "Cool",
  "Couples",
  "Cute",
  "Entrepreneurs",
  "Extroverts",
  "Family",
  "Fashion",
  "Fitness/Gym",
  "Foodies",
  "Free Fire",
  "Friends",
  "Funny",
  "Gamers",
  "Girls",
  "Influencers",
  "Introverts",
  "Islamic",
  "Love",
  "Models",
  "Motivational",
  "Music",
  "Photographers",
  "Poetry",
  "Professional",
  "Quotes",
  "Sad",
  "Sports",
  "Students",
  "Stylish",
  "Travel",
  "VIP",
];





const bios: Record<BioCategory, BioSet> = {
  Photographers: {
    female: [
      ["🔥 Golden hour is her happy hour 📸", "💅 Soft eyes sharp lens always", "👁️ Every photo she takes has a heartbeat 💯", "🎂 Wish me on 3 June 🎉"],
      ["📷 Chasing light living in frames", "✨ Her lens her rules her art", "🌅 Sunset lover portrait creator", "💫 Creating memories one click at a time"],
      ["🖤 Moody edits golden vibes", "📸 She shoots she slays", "🌸 Soft focus strong vision", "⭐ Your favorite photographer in the making"],
    ],
    male: [
      ["🔥 Golden hour is his happy hour 📸", "💪 Sharp lens sharper vision", "👁️ Every frame tells a story 💯", "🎂 Wish me on 3 June 🎉"],
      ["📷 Chasing light living in frames", "✨ His lens his rules his art", "🌅 Sunset hunter street shooter", "💫 Creating memories one click at a time"],
      ["🖤 Moody edits golden vibes", "📸 He shoots he slays", "🌸 Raw shots real stories", "⭐ Your favorite photographer in the making"],
    ],
  },
  Artists: {
    female: [
      ["🎨 Colors speak where words fail", "✨ She paints her own reality", "🖌️ Art is her superpower", "💜 Living in a canvas world"],
      ["🌈 Creating magic with every stroke", "🦋 Dreamer doer artist", "⭐ Beauty in the broken lines", "🔥 Her art her attitude"],
    ],
    male: [
      ["🎨 Colors speak where words fail", "✨ He paints his own reality", "🖌️ Art is his superpower", "💜 Living in a canvas world"],
      ["🌈 Creating magic with every stroke", "🦋 Dreamer doer artist", "⭐ Beauty in the broken lines", "🔥 His art his attitude"],
    ],
  },
  Attitude: {
    female: [
      ["👑 Queen of my own world", "🔥 Too glam to give a damn", "💅 Classy sassy and a bit smart-assy", "✌️ My rules my vibe"],
      ["😎 Attitude on fleek ego on mute", "💯 Born to stand out", "🖤 Savage with a smile", "⚡ Handle with care or not at all"],
    ],
    male: [
      ["👑 King of my own world", "🔥 Attitude level: expert", "💪 Strong mind stronger game", "✌️ My rules my vibe"],
      ["😎 Too real for fake love", "💯 Born to stand out", "🖤 Silent but deadly", "⚡ Handle with care or not at all"],
    ],
  },
  Businessman: {
    female: [
      ["💼 Building empires not excuses", "📈 Hustle hard dream big", "🎯 CEO of my own life", "✨ Success is my only option"],
      ["💰 Making moves in silence", "🚀 Entrepreneur by day visionary always", "📊 Results over excuses", "⭐ Work smart shine harder"],
    ],
    male: [
      ["💼 Building empires not excuses", "📈 Hustle hard dream big", "🎯 CEO of my own life", "✨ Success is my only option"],
      ["💰 Making moves in silence", "🚀 Entrepreneur by day visionary always", "📊 Results over excuses", "⭐ Work smart shine harder"],
    ],
  },
  Couples: {
    female: [
      ["❤️ Taken by the best", "💑 Two hearts one love story", "🥰 His queen forever", "✨ Love is our favorite language"],
      ["💕 Together is my favorite place", "👫 Partners in crime and love", "🌹 She said yes to forever", "💖 Building our dream together"],
    ],
    male: [
      ["❤️ Taken by the best", "💑 Two hearts one love story", "🥰 Her king forever", "✨ Love is our favorite language"],
      ["💕 Together is my favorite place", "👫 Partners in crime and love", "🌹 He said yes to forever", "💖 Building our dream together"],
    ],
  },
  Entrepreneurs: {
    female: [
      ["🚀 Turning ideas into income", "💡 Innovator hustler leader", "📱 Building brands breaking limits", "⭐ Future millionaire loading"],
      ["🎯 Vision bigger than fear", "💼 Self-made and still rising", "🔥 Risk taker dream chaser", "✨ Creating my own lane"],
    ],
    male: [
      ["🚀 Turning ideas into income", "💡 Innovator hustler leader", "📱 Building brands breaking limits", "⭐ Future millionaire loading"],
      ["🎯 Vision bigger than fear", "💼 Self-made and still rising", "🔥 Risk taker dream chaser", "✨ Creating my own lane"],
    ],
  },
  Extroverts: {
    female: [
      ["🎉 Life of the party energy", "😄 Smiles loud laughs louder", "🌟 Social butterfly vibes only", "💃 Dancing through life daily"],
      ["🔊 Extra is my middle name", "✨ Good vibes contagious energy", "🎤 Never a dull moment here", "💫 Sunshine mixed with chaos"],
    ],
    male: [
      ["🎉 Life of the party energy", "😄 Smiles loud laughs louder", "🌟 Social king vibes only", "🕺 Dancing through life daily"],
      ["🔊 Extra is my middle name", "✨ Good vibes contagious energy", "🎤 Never a dull moment here", "💫 Sunshine mixed with chaos"],
    ],
  },
  Family: {
    female: [
      ["👨‍👩‍👧 Family first always", "❤️ Blessed with the best crew", "🏠 Home is where my heart is", "🌸 Proud daughter sister mom"],
      ["💕 Love lives here", "👪 My squad my everything", "✨ Family goals unlocked", "🙏 Grateful for every moment"],
    ],
    male: [
      ["👨‍👩‍👧 Family first always", "❤️ Blessed with the best crew", "🏠 Home is where my heart is", "🌸 Proud son brother dad"],
      ["💕 Love lives here", "👪 My squad my everything", "✨ Family goals unlocked", "🙏 Grateful for every moment"],
    ],
  },
  "Fitness/Gym": {
    female: [
      ["💪 Stronger every single day", "🏋️ Gym is my therapy", "🔥 Sweat now shine later", "⭐ Fit body fierce mind"],
      ["🥗 Eat clean train dirty", "💯 No pain no gain", "🦋 Transforming one rep at a time", "⚡ Beast mode activated"],
    ],
    male: [
      ["💪 Stronger every single day", "🏋️ Gym is my therapy", "🔥 Sweat now shine later", "⭐ Fit body fierce mind"],
      ["🥗 Eat clean train dirty", "💯 No pain no gain", "🦋 Transforming one rep at a time", "⚡ Beast mode activated"],
    ],
  },
  Foodies: {
    female: [
      ["🍕 Living to eat not eating to live", "🍰 Foodie soul hungry heart", "☕ Coffee first questions later", "🍔 Calories do not count on weekends"],
      ["🌮 Taco bout a good time", "🍩 Sweet tooth certified", "✨ Good food good mood", "🔥 Food is my love language"],
    ],
    male: [
      ["🍕 Living to eat not eating to live", "🍰 Foodie soul hungry heart", "☕ Coffee first questions later", "🍔 Calories do not count on weekends"],
      ["🌮 Taco bout a good time", "🍩 Sweet tooth certified", "✨ Good food good mood", "🔥 Food is my love language"],
    ],
  },
  Friends: {
    female: [
      ["👯 Squad goals only", "😂 My friends know too much", "💕 Real ones since day one", "🎉 Partners in every adventure"],
      ["✨ Friendship over everything", "🌟 Ride or die crew", "💯 Loyalty runs deep here", "🔥 Making memories with my people"],
    ],
    male: [
      ["👯 Squad goals only", "😂 My boys know too much", "💕 Real ones since day one", "🎉 Partners in every adventure"],
      ["✨ Friendship over everything", "🌟 Ride or die crew", "💯 Loyalty runs deep here", "🔥 Making memories with my people"],
    ],
  },
  Gamers: {
    female: [
      ["🎮 Press start to continue", "🔥 Pro gamer energy", "👾 Level up daily", "💯 Winner mindset always"],
      ["🕹️ Gaming is not a hobby it is life", "⚡ Lag free vibes only", "🏆 Queen of the leaderboard", "✨ Respawn and conquer"],
    ],
    male: [
      ["🎮 Press start to continue", "🔥 Pro gamer energy", "👾 Level up daily", "💯 Winner mindset always"],
      ["🕹️ Gaming is not a hobby it is life", "⚡ Lag free vibes only", "🏆 King of the leaderboard", "✨ Respawn and conquer"],
    ],
  },
  Influencers: {
    female: [
      ["✨ Creating content inspiring souls", "📱 Digital queen real vibes", "🔥 Trendsetter not follower", "💫 Living my best brand life"],
      ["🌟 Influencer by passion creator by heart", "📸 Storyteller in pixels", "💯 Authenticity is my aesthetic", "⭐ Your daily dose of inspiration"],
    ],
    male: [
      ["✨ Creating content inspiring souls", "📱 Digital king real vibes", "🔥 Trendsetter not follower", "💫 Living my best brand life"],
      ["🌟 Influencer by passion creator by heart", "📸 Storyteller in pixels", "💯 Authenticity is my aesthetic", "⭐ Your daily dose of inspiration"],
    ],
  },
  Introverts: {
    female: [
      ["🌙 Quiet mind loud dreams", "📚 Books over parties", "🖤 Introvert with extrovert skills", "✨ Silence is my superpower"],
      ["🦋 Soft heart deep thoughts", "☕ Cozy vibes only", "💭 Thinking more speaking less", "🌸 Peace over drama always"],
    ],
    male: [
      ["🌙 Quiet mind loud dreams", "📚 Books over parties", "🖤 Introvert with extrovert skills", "✨ Silence is my superpower"],
      ["🦋 Soft heart deep thoughts", "☕ Cozy vibes only", "💭 Thinking more speaking less", "🌸 Peace over drama always"],
    ],
  },
  Love: {
    female: [
      ["❤️ Love is in the air", "💕 Heart full of you", "🥰 Smitten and not sorry", "✨ You are my favorite notification"],
      ["🌹 Romance is my aesthetic", "💑 Crazy in love and proud", "💖 Love made me do it", "⭐ Soulmate energy only"],
    ],
    male: [
      ["❤️ Love is in the air", "💕 Heart full of you", "🥰 Smitten and not sorry", "✨ You are my favorite notification"],
      ["🌹 Romance is my aesthetic", "💑 Crazy in love and proud", "💖 Love made me do it", "⭐ Soulmate energy only"],
    ],
  },
  Sad: {
    female: [
      ["🥀 Hurting but still smiling", "🌧️ Rainy days quiet thoughts", "💔 Broken but beautiful", "🕯️ Finding light in the dark"],
      ["😔 Pain taught me patience", "🖤 Numb heart loud mind", "🌙 Late night overthinking", "✨ Healing in progress"],
    ],
    male: [
      ["🥀 Hurting but still smiling", "🌧️ Rainy days quiet thoughts", "💔 Broken but beautiful", "🕯️ Finding light in the dark"],
      ["😔 Pain taught me patience", "🖤 Numb heart loud mind", "🌙 Late night overthinking", "✨ Healing in progress"],
    ],
  },
  Islamic: {
    female: [
      ["☪️ Alhamdulillah for everything", "🤲 Trust Allah plan", "📿 Faith over fear always", "✨ Muslimah with purpose"],
      ["🕌 Deen over dunya", "💚 Sabr and shukr", "⭐ Seeking Jannah", "🙏 Allah knows best"],
    ],
    male: [
      ["☪️ Alhamdulillah for everything", "🤲 Trust Allah plan", "📿 Faith over fear always", "✨ Muslim with purpose"],
      ["🕌 Deen over dunya", "💚 Sabr and shukr", "⭐ Seeking Jannah", "🙏 Allah knows best"],
    ],
  },
  Professional: {
    female: [
      ["💼 Professional by day dreamer always", "📊 Results driven value focused", "🎯 Career goals loading", "✨ Excellence is my standard"],
      ["⭐ Building my legacy daily", "📈 Growth mindset only", "🔥 Work ethic unmatched", "💯 Your go-to expert"],
    ],
    male: [
      ["💼 Professional by day dreamer always", "📊 Results driven value focused", "🎯 Career goals loading", "✨ Excellence is my standard"],
      ["⭐ Building my legacy daily", "📈 Growth mindset only", "🔥 Work ethic unmatched", "💯 Your go-to expert"],
    ],
  },
  Aesthetic: {
    female: [
      ["🌸 Soft vibes hard aesthetic", "✨ Pastel dreams bold energy", "🦋 Main character energy only", "💫 Living in my aesthetic era"],
      ["🌙 Moody tones golden soul", "📸 Every frame is art", "🖤 Minimal look maximum impact", "⭐ Aesthetic over everything"],
    ],
    male: [
      ["🌸 Clean fits calm aesthetic", "✨ Minimal style loud presence", "🦋 Main character energy only", "💫 Living in my aesthetic era"],
      ["🌙 Moody tones golden soul", "📸 Every frame is art", "🖤 Simple look maximum impact", "⭐ Aesthetic over everything"],
    ],
  },
  Birthday: {
    female: [
      ["🎂 Another year bolder brighter", "🎉 Birthday queen energy today", "🎁 Level up unlocked", "✨ Making this year legendary"],
      ["🥳 Born day vibes only", "🎈 Celebrating me today", "💫 New chapter new glow", "👑 Birthday mood activated"],
    ],
    male: [
      ["🎂 Another year bolder brighter", "🎉 Birthday king energy today", "🎁 Level up unlocked", "✨ Making this year legendary"],
      ["🥳 Born day vibes only", "🎈 Celebrating me today", "💫 New chapter new grind", "👑 Birthday mood activated"],
    ],
  },
  Boys: {
    female: [
      ["😎 Bold vibes only", "🔥 Strong mind soft heart", "💪 Built different daily", "⭐ Unbothered and focused"],
      ["👑 Queen energy boyish charm", "⚡ Silent grind loud results", "🖤 Real ones only", "✌️ My lane my rules"],
    ],
    male: [
      ["😎 King mentality no negotiations", "🔥 Attitude loaded safety off", "💪 Built different born to win", "⭐ Unbothered and focused"],
      ["👑 A king never explains himself", "⚡ Silent grind loud results", "🖤 Real ones only", "✌️ My lane my rules"],
    ],
  },
  Cool: {
    female: [
      ["😎 Too cool for drama", "🕶️ Chill vibes only", "❄️ Ice in my veins fire in my soul", "✨ Effortlessly cool always"],
      ["🌊 Go with the flow queen", "💫 Cool mind warm heart", "🔥 Low key high value", "⭐ Stay cool stay winning"],
    ],
    male: [
      ["😎 Too cool for drama", "🕶️ Chill vibes only", "❄️ Ice in my veins fire in my soul", "✨ Effortlessly cool always"],
      ["🌊 Go with the flow king", "💫 Cool mind warm heart", "🔥 Low key high value", "⭐ Stay cool stay winning"],
    ],
  },
  Cute: {
    female: [
      ["🌸 Cute but dangerous", "🧸 Sweet smile savage mind", "💕 Soft heart strong vibe", "✨ Cutie with a purpose"],
      ["🎀 Pretty energy pure soul", "🦋 Cute vibes only", "💖 Sugar spice everything nice", "⭐ Adorably unstoppable"],
    ],
    male: [
      ["🌸 Cute smile savage game", "🧸 Good boy bad intentions", "💕 Soft heart strong vibe", "✨ Cute but competitive"],
      ["😊 Humble face winner mindset", "🦋 Kind vibes only", "💖 Charm loaded daily", "⭐ Adorably unstoppable"],
    ],
  },
  Fashion: {
    female: [
      ["👗 Outfit of the day everyday", "✨ Style is my language", "💅 Dressed to impress always", "🔥 Fashion first attitude second"],
      ["👠 Heels higher standards higher", "💫 Trendsetter by nature", "🖤 Chic bold unforgettable", "⭐ Runway ready always"],
    ],
    male: [
      ["👔 Fit check passed daily", "✨ Style is my language", "💅 Dressed to impress always", "🔥 Fashion first attitude second"],
      ["👟 Sneaker head clean fits", "💫 Trendsetter by nature", "🖤 Sharp bold unforgettable", "⭐ Runway ready always"],
    ],
  },
  "Free Fire": {
    female: [
      ["🔥 Born to booyah", "🎯 Headshot energy only", "👑 Queen of the lobby", "💯 Rank push mode on"],
      ["🎮 Free Fire is my world", "⚡ Clutch queen every match", "🏆 Winner mindset always", "✨ Respawn and dominate"],
    ],
    male: [
      ["🔥 Born to booyah", "🎯 Headshot energy only", "👑 King of the lobby", "💯 Rank push mode on"],
      ["🎮 Free Fire is my world", "⚡ Clutch king every match", "🏆 Winner mindset always", "✨ Respawn and dominate"],
    ],
  },
  Funny: {
    female: [
      ["😂 Professional overthinker", "🤪 Here for the memes", "☕ Powered by sarcasm", "✨ Making bad decisions look cute"],
      ["😁 Laugh now cry later", "🎭 Comedy is my coping skill", "🔥 Funny bone fully loaded", "⭐ Your daily dose of chaos"],
    ],
    male: [
      ["😂 Professional overthinker", "🤪 Here for the memes", "☕ Powered by sarcasm", "✨ Making bad decisions look cool"],
      ["😁 Laugh now grind later", "🎭 Comedy is my coping skill", "🔥 Funny bone fully loaded", "⭐ Your daily dose of chaos"],
    ],
  },
  Girls: {
    female: [
      ["👑 Queen of her own world", "💅 Classy sassy unstoppable", "✨ Pretty mind pretty soul", "🔥 She believed she could"],
      ["🌸 Soft heart fierce spirit", "💫 Main character energy", "💖 Self love first always", "⭐ Girl boss in progress"],
    ],
    male: [
      ["👑 Supporting queens daily", "💅 Respect women always", "✨ Raised by a strong woman", "🔥 Real men lift women up"],
      ["🌸 Gentle heart strong values", "💫 Loyalty over everything", "💖 Class over chaos", "⭐ Built on respect"],
    ],
  },
  Models: {
    female: [
      ["📸 Camera loves me", "✨ Runway in my DNA", "💫 Pose ready always", "🔥 Beauty brains and boldness"],
      ["👠 Strut mode activated", "⭐ Face card never declines", "🖤 Editorial energy only", "💅 Model mindset daily"],
    ],
    male: [
      ["📸 Camera loves me", "✨ Runway in my DNA", "💫 Pose ready always", "🔥 Style brains and boldness"],
      ["👔 Frame ready always", "⭐ Face card never declines", "🖤 Editorial energy only", "💅 Model mindset daily"],
    ],
  },
  Motivational: {
    female: [
      ["🚀 Dream big work hard", "💪 Fall seven rise eight", "✨ Your only limit is you", "🔥 Progress over perfection"],
      ["⭐ Believe in your hustle", "🎯 Goals loading stay focused", "💫 Turn pain into power", "🌟 Rise grind repeat"],
    ],
    male: [
      ["🚀 Dream big work hard", "💪 Fall seven rise eight", "✨ Your only limit is you", "🔥 Progress over perfection"],
      ["⭐ Believe in your hustle", "🎯 Goals loading stay focused", "💫 Turn pain into power", "🌟 Rise grind repeat"],
    ],
  },
  Music: {
    female: [
      ["🎵 Music is my mood", "🎧 Headphones on world off", "🎤 Living in my playlist", "✨ Beats over drama always"],
      ["🎶 Rhythm in my soul", "🔥 Concert heart daily life", "💫 Lyrics speak what I feel", "⭐ Soundtrack of my life"],
    ],
    male: [
      ["🎵 Music is my mood", "🎧 Headphones on world off", "🎤 Living in my playlist", "✨ Beats over drama always"],
      ["🎶 Rhythm in my soul", "🔥 Concert heart daily life", "💫 Lyrics speak what I feel", "⭐ Soundtrack of my life"],
    ],
  },
  Poetry: {
    female: [
      ["📝 Ink runs through my veins", "🌙 Poet soul wild heart", "✨ Words heal what silence breaks", "💫 Rhymes in midnight thoughts"],
      ["🖊️ Writing my way through life", "🌸 Soft words sharp mind", "🔥 Poetry in motion", "⭐ Verse by verse I rise"],
    ],
    male: [
      ["📝 Ink runs through my veins", "🌙 Poet soul wild heart", "✨ Words heal what silence breaks", "💫 Rhymes in midnight thoughts"],
      ["🖊️ Writing my way through life", "🌸 Soft words sharp mind", "🔥 Poetry in motion", "⭐ Verse by verse I rise"],
    ],
  },
  Quotes: {
    female: [
      ["💬 Living by my own quotes", "✨ Words worth remembering", "📖 Collecting moments and quotes", "🔥 Speak less mean more"],
      ["⭐ Quote lover deep thinker", "💫 Wisdom in every caption", "🖤 Short lines long impact", "✌️ My bio my manifesto"],
    ],
    male: [
      ["💬 Living by my own quotes", "✨ Words worth remembering", "📖 Collecting moments and quotes", "🔥 Speak less mean more"],
      ["⭐ Quote lover deep thinker", "💫 Wisdom in every caption", "🖤 Short lines long impact", "✌️ My bio my manifesto"],
    ],
  },
  Sports: {
    female: [
      ["⚽ Game face on always", "🏆 Born to compete", "💪 Train like a champion", "🔥 Sweat now shine later"],
      ["🏅 Sports over excuses", "⭐ Team player leader mindset", "✨ Athlete heart daily grind", "💯 Play hard win harder"],
    ],
    male: [
      ["⚽ Game face on always", "🏆 Born to compete", "💪 Train like a champion", "🔥 Sweat now shine later"],
      ["🏅 Sports over excuses", "⭐ Team player leader mindset", "✨ Athlete heart daily grind", "💯 Play hard win harder"],
    ],
  },
  Students: {
    female: [
      ["📚 Study now shine later", "🎓 Future doctor in making", "✏️ Caffeine and deadlines", "⭐ Smart girl big dreams"],
      ["📝 Notes over nonsense", "💡 Learning growing winning", "🔥 Student by day dreamer always", "✨ Books brains and ambition"],
    ],
    male: [
      ["📚 Study now shine later", "🎓 Future engineer in making", "✏️ Caffeine and deadlines", "⭐ Smart grind big dreams"],
      ["📝 Notes over nonsense", "💡 Learning growing winning", "🔥 Student by day dreamer always", "✨ Books brains and ambition"],
    ],
  },
  Stylish: {
    female: [
      ["✨ Style speaks before I do", "💅 Drip check passed", "🔥 Fashion forward always", "⭐ Styled to stand out"],
      ["👗 Outfit game too strong", "💫 Chic on purpose", "🖤 Elegance with edge", "✌️ Trendy not thirsty"],
    ],
    male: [
      ["✨ Style speaks before I do", "💅 Drip check passed", "🔥 Fashion forward always", "⭐ Styled to stand out"],
      ["👔 Fit game too strong", "💫 Clean on purpose", "🖤 Elegance with edge", "✌️ Trendy not thirsty"],
    ],
  },
  Travel: {
    female: [
      ["✈️ Passport full heart fuller", "🌍 Collecting stamps not things", "🏖️ Wander often wonder always", "✨ Adventure is my therapy"],
      ["🗺️ Lost in the right direction", "📸 Travel addict forever", "🔥 Next stop loading", "⭐ Explore dream discover"],
    ],
    male: [
      ["✈️ Passport full heart fuller", "🌍 Collecting stamps not things", "🏖️ Wander often wonder always", "✨ Adventure is my therapy"],
      ["🗺️ Lost in the right direction", "📸 Travel addict forever", "🔥 Next stop loading", "⭐ Explore dream discover"],
    ],
  },
  VIP: {
    female: [
      ["👑 VIP access only", "💎 Luxury mindset daily", "✨ Too elite for average", "🔥 Classy rich energy"],
      ["⭐ Premium vibes exclusive life", "💅 High standards higher taste", "🖤 Royalty in my blood", "✌️ VIP by birth by choice"],
    ],
    male: [
      ["👑 VIP access only", "💎 Luxury mindset daily", "✨ Too elite for average", "🔥 Classy rich energy"],
      ["⭐ Premium vibes exclusive life", "💅 High standards higher taste", "🖤 Royalty in my blood", "✌️ VIP by birth by choice"],
    ],
  },
};

export function pickRandomBio(
  category: BioCategory,
  gender: Gender,
  excludeIndices: number[] = []
): { lines: string[]; index: number } {
  const pool = bios[category][gender];
  const available = pool
    .map((_, i) => i)
    .filter((i) => !excludeIndices.includes(i));

  const indices = available.length > 0 ? available : pool.map((_, i) => i);
  const index = indices[Math.floor(Math.random() * indices.length)];

  return { lines: [...pool[index]], index };
}

const CATEGORY_EMOJIS: Record<BioCategory, string[]> = {
  Artists: ["🎨", "🖌️", "✨", "🌈", "🦋"],
  Attitude: ["👑", "🔥", "😎", "💯", "⚡"],
  Aesthetic: ["🌸", "✨", "🌙", "📸", "🖤"],
  Birthday: ["🎂", "🎉", "🎁", "🥳", "🎈"],
  Boys: ["😎", "🔥", "💪", "👑", "⚡"],
  Businessman: ["💼", "📈", "💰", "🚀", "🎯"],
  Cool: ["😎", "🕶️", "❄️", "🌊", "🔥"],
  Couples: ["❤️", "💑", "🥰", "💕", "💍"],
  Cute: ["🌸", "🧸", "🎀", "💖", "✨"],
  Entrepreneurs: ["🚀", "💡", "💼", "🎯", "📈"],
  Extroverts: ["🎉", "😄", "🌟", "💃", "🔊"],
  Family: ["👨‍👩‍👧", "❤️", "🏠", "💕", "👪"],
  Fashion: ["👗", "👠", "👔", "✨", "💅"],
  "Fitness/Gym": ["💪", "🏋️", "🔥", "💯", "🥗"],
  Foodies: ["🍕", "🍰", "☕", "🍔", "🌮"],
  "Free Fire": ["🔥", "🎯", "🎮", "👑", "🏆"],
  Friends: ["👯", "😂", "💕", "🎉", "🌟"],
  Funny: ["😂", "🤪", "🎭", "😁", "☕"],
  Gamers: ["🎮", "👾", "🕹️", "⚡", "🏆"],
  Girls: ["👑", "💅", "✨", "🌸", "💖"],
  Influencers: ["📱", "✨", "📸", "🌟", "🔥"],
  Introverts: ["🌙", "📚", "🖤", "☕", "💭"],
  Islamic: ["☪️", "🤲", "🕌", "💚", "📿"],
  Love: ["❤️", "💕", "🥰", "🌹", "💖"],
  Models: ["📸", "✨", "👠", "⭐", "💅"],
  Motivational: ["🚀", "💪", "✨", "🔥", "🎯"],
  Music: ["🎵", "🎧", "🎤", "🎶", "🎸"],
  Photographers: ["📸", "🎞️", "🌅", "📷", "✨"],
  Poetry: ["📝", "🌙", "🖊️", "🌸", "💭"],
  Professional: ["💼", "📊", "🎯", "⭐", "📈"],
  Quotes: ["💬", "✨", "📖", "✌️", "🖤"],
  Sad: ["🥀", "🌧️", "💔", "😔", "🖤"],
  Sports: ["⚽", "🏆", "🏅", "💪", "🔥"],
  Students: ["📚", "🎓", "✏️", "📝", "💡"],
  Stylish: ["✨", "💅", "👗", "👔", "🖤"],
  Travel: ["✈️", "🌍", "📍", "🏖️", "🗺️"],
  VIP: ["👑", "💎", "✨", "⭐", "🍾"]
};

module.exports = { bios, CATEGORY_EMOJIS };