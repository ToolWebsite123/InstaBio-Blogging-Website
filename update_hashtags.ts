import fs from 'fs';

const fileContent = fs.readFileSync('lib/bioTemplates.ts', 'utf8');

const hashtagsMap: Record<string, string[]> = {
  fitness: ['#fitness', '#gym', '#workout', '#fitfam', '#health', '#bodybuilding', '#training', '#fit', '#lifestyle', '#motivation', '#muscle', '#fitnessmotivation', '#gymlife', '#healthy', '#exercise'],
  travel: ['#travel', '#wanderlust', '#explore', '#adventure', '#travelgram', '#vacation', '#photography', '#nature', '#travelphotography', '#instatravel', '#trip', '#traveling', '#beautiful', '#holiday', '#tourism'],
  food: ['#food', '#foodie', '#foodporn', '#instafood', '#delicious', '#yummy', '#foodphotography', '#foodblogger', '#foodlover', '#dinner', '#tasty', '#lunch', '#healthyfood', '#restaurant', '#cooking'],
  gaming: ['#gaming', '#gamer', '#videogames', '#ps', '#playstation', '#xbox', '#twitch', '#esports', '#pcgaming', '#games', '#gamers', '#game', '#streamer', '#xboxone', '#nintendo'],
  student: ['#student', '#studentlife', '#study', '#university', '#college', '#school', '#studygram', '#education', '#students', '#motivation', '#learning', '#collegelife', '#studying', '#notes', '#campus'],
  business: ['#business', '#entrepreneur', '#success', '#motivation', '#startup', '#marketing', '#money', '#hustle', '#businessowner', '#entrepreneurship', '#mindset', '#leadership', '#wealth', '#investing', '#finance'],
  fashion: ['#fashion', '#style', '#ootd', '#fashionblogger', '#outfit', '#model', '#beauty', '#instafashion', '#shopping', '#streetstyle', '#lifestyle', '#fashionista', '#design', '#stylish', '#clothes'],
  music: ['#music', '#musician', '#artist', '#singer', '#rap', '#hiphop', '#newmusic', '#producer', '#dj', '#livemusic', '#song', '#guitar', '#beats', '#studio', '#concert'],
  artist: ['#art', '#artist', '#artwork', '#drawing', '#painting', '#illustration', '#creative', '#sketch', '#digitalart', '#design', '#photography', '#artistsoninstagram', '#contemporaryart', '#instaart', '#arte'],
  influencer: ['#influencer', '#contentcreator', '#lifestyle', '#collab', '#creator', '#blogger', '#instagram', '#youtube', '#brandambassador', '#fashion', '#viral', '#trending', '#explorepage', '#socialmedia', '#influencerstyle'],
  creator: ['#creator', '#youtube', '#content', '#digitalcreator', '#create', '#art', '#video', '#design', '#inspiration', '#creative', '#artist', '#photography', '#vlog', '#media', '#maker'],
  blogger: ['#blogger', '#blog', '#writing', '#lifestyleblogger', '#bloggerlife', '#wordpress', '#writer', '#post', '#lifestyle', '#fashionblogger', '#travelblogger', '#foodblogger', '#blogging', '#newpost', '#vlogger'],
  free_fire: ['#freefire', '#freefirebrasil', '#garenafreefire', '#booyah', '#ff', '#freefireindonesia', '#garena', '#freefiregame', '#freefirememe', '#freefirestudio', '#loud', '#freefirevideo', '#freefirebgid', '#nobrutv', '#gamer'],
  pubg: ['#pubg', '#pubgmobile', '#gamer', '#pubgclips', '#chicken', '#pubgfunny', '#pubgindia', '#pubgmemes', '#bgmi', '#pubglover', '#pubgvideos', '#pubghighlights', '#gaming', '#pubgindonesia', '#pubgmobileindonesia'],
  developer: ['#developer', '#coding', '#programmer', '#tech', '#software', '#javascript', '#programming', '#coder', '#webdeveloper', '#code', '#python', '#html', '#css', '#technology', '#computerscience'],
  entrepreneur: ['#entrepreneur', '#hustle', '#businessowner', '#mindset', '#grind', '#success', '#business', '#motivation', '#startup', '#wealth', '#entrepreneurship', '#goals', '#leadership', '#invest', '#money'],
  doctor: ['#doctor', '#medical', '#medicine', '#healthcare', '#medstudent', '#hospital', '#health', '#nurse', '#medschool', '#surgeon', '#surgery', '#medicalstudent', '#nursing', '#doctors', '#clinic'],
  teacher: ['#teacher', '#education', '#teaching', '#school', '#teacherlife', '#students', '#learning', '#classroom', '#teachers', '#teachersofinstagram', '#learn', '#student', '#english', '#science', '#math'],
  love: ['#love', '#couplegoals', '#relationship', '#romance', '#loveyou', '#cute', '#beautiful', '#happy', '#couple', '#kiss', '#forever', '#together', '#heart', '#soulmate', '#bae'],
  attitude: ['#attitude', '#quotes', '#status', '#lifestyle', '#swag', '#boys', '#style', '#motivation', '#instagram', '#model', '#photography', '#fashion', '#viral', '#trending', '#cool'],
  vip: ['#vip', '#luxury', '#exclusive', '#premium', '#lifestyle', '#rich', '#millionaire', '#wealth', '#success', '#money', '#boss', '#elite', '#luxurylifestyle', '#class', '#highlife'],
  aesthetic: ['#aesthetic', '#vibes', '#mood', '#photography', '#art', '#vintage', '#tumblr', '#grunge', '#retro', '#cute', '#edit', '#anime', '#love', '#beauty', '#pastel']
};

let newContent = fileContent.replace(/export type BioCategoryDef = \\{[\\s\\S]*?\\};\\n\\n/, `export type BioCategoryDef = {
  id: CategoryId;
  label: string;
  icon: ElementType;
  emojis: string[];
  hashtags: string[];
};\n\n`);

newContent = newContent.replace(/emojis: (\\[.*?\\]) \\},/g, (match, emojisStr, offset, string) => {
  const lineStart = string.lastIndexOf('\n', offset);
  const line = string.substring(lineStart, offset + match.length);
  const idMatch = line.match(/"([^"]+)"\\s*:\\s*\\{\\s*id:/);
  if (idMatch) {
    const id = idMatch[1];
    const tags = hashtagsMap[id] || [];
    return "emojis: " + emojisStr + ", hashtags: " + JSON.stringify(tags) + " },";
  }
  return match;
});

fs.writeFileSync('lib/bioTemplates.ts', newContent);
console.log('Successfully updated bioTemplates.ts with hashtags!');
