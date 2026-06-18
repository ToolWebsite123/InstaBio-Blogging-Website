export type FontStyleId =
  | "normal"
  | "stylish"
  | "bold"
  | "fancy"
  | "aesthetic"
  | "cursive"
  | "boldCursive"
  | "boldItalic"
  | "italicSans"
  | "boldItalicSans"
  | "sansSerif"
  | "boldFraktur"
  | "doubleStruck"
  | "monospace"
  | "circled"
  | "squared"
  | "negativeCircled"
  | "parenthesized"
  | "smallCaps"
  | "bubble"
  | "strikethrough"
  | "underline";

export const FONT_STYLES: { id: FontStyleId; label: string; preview?: string }[] = [
  { id: "normal", label: "Normal" },
  { id: "stylish", label: "Stylish", preview: "𝘚𝘵𝘺𝘭𝘪𝘴𝘩" },
  { id: "bold", label: "Bold", preview: "𝐁𝐨𝐥𝐝" },
  { id: "fancy", label: "Fancy", preview: "𝔉𝔞𝔫𝔠𝔶" },
  { id: "aesthetic", label: "Aesthetic", preview: "𝐴𝑒𝑠𝑡ℎ𝑒𝑡𝑖𝑐" },
  { id: "cursive", label: "Cursive", preview: "𝒞𝓊𝓇𝓈𝒾𝓋𝑒" },
  { id: "boldCursive", label: "Bold Cursive", preview: "𝓑𝓸𝓵𝓭" },
  { id: "boldItalic", label: "Bold Italic", preview: "𝑩𝒐𝒍𝒅" },
  { id: "italicSans", label: "Italic Sans", preview: "𝘐𝘵𝘢𝘭𝘪𝘤" },
  { id: "boldItalicSans", label: "Bold Italic Sans", preview: "𝙄𝙩𝙖𝙡𝙞𝙘" },
  { id: "sansSerif", label: "Sans Serif", preview: "𝖲𝖺𝗇𝗌" },
  { id: "boldFraktur", label: "Bold Fraktur", preview: "𝕱𝖆𝖓𝖈𝖞" },
  { id: "doubleStruck", label: "Double Struck", preview: "𝕃𝕚𝕗𝕖" },
  { id: "monospace", label: "Monospace", preview: "𝙶𝚛𝚘𝚠𝚒𝚗𝚐" },
  { id: "circled", label: "Circled", preview: "ⓒⓘⓡⓒⓛⓔⓓ" },
  { id: "squared", label: "Squared", preview: "🅂🅀🅄🄰🅁🄴" },
  { id: "negativeCircled", label: "Negative Circled", preview: "🅛🅘🅥🅘🅝🅖" },
  { id: "parenthesized", label: "Parenthesized", preview: "⒫⒜⒭⒠⒩" },
  { id: "smallCaps", label: "Small Caps", preview: "ꜱᴍᴀʟʟ" },
  { id: "bubble", label: "Bubble", preview: "ⓑⓤⓑⓑⓛⓔ" },
  { id: "strikethrough", label: "Strike-through", preview: "S̶t̶r̶i̶k̶e̶" },
  { id: "underline", label: "Underline", preview: "U̲n̲d̲e̲r̲l̲i̲n̲e̲" },
];

type CharMap = { upper: number; lower: number };

const MAPS: Record<Exclude<FontStyleId, "normal" | "smallCaps" | "strikethrough" | "underline" | "bubble">, CharMap> = {
  stylish: { upper: 0x1d5d4, lower: 0x1d5ee },
  bold: { upper: 0x1d400, lower: 0x1d41a },
  fancy: { upper: 0x1d504, lower: 0x1d51e },
  aesthetic: { upper: 0x1d434, lower: 0x1d44e },
  cursive: { upper: 0x1d49c, lower: 0x1d4b6 },
  boldCursive: { upper: 0x1d4d0, lower: 0x1d4ea },
  boldItalic: { upper: 0x1d468, lower: 0x1d482 },
  italicSans: { upper: 0x1d608, lower: 0x1d622 },
  boldItalicSans: { upper: 0x1d63c, lower: 0x1d656 },
  sansSerif: { upper: 0x1d5a0, lower: 0x1d5ba },
  boldFraktur: { upper: 0x1d56c, lower: 0x1d586 },
  doubleStruck: { upper: 0x1d538, lower: 0x1d552 },
  monospace: { upper: 0x1d670, lower: 0x1d68a },
  circled: { upper: 0x24b6, lower: 0x24d0 },
  squared: { upper: 0x1f130, lower: 0x1f150 },
  negativeCircled: { upper: 0x1f170, lower: 0x1f150 },
  parenthesized: { upper: 0x1f110, lower: 0x249c },
};

const SMALL_CAPS: Record<string, string> = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ғ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "s",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
};

function transformChar(char: string, map: CharMap): string {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) return String.fromCodePoint(map.upper + (code - 65));
  if (code >= 97 && code <= 122) return String.fromCodePoint(map.lower + (code - 97));
  return char;
}

export function applyFontStyle(text: string, style: FontStyleId): string {
  if (style === "normal") return text;

  if (style === "smallCaps") {
    return [...text]
      .map((c) => SMALL_CAPS[c.toLowerCase()] ?? c)
      .join("");
  }

  if (style === "strikethrough") {
    return [...text].map(c => c + '\u0336').join("");
  }

  if (style === "underline") {
    return [...text].map(c => c + '\u0332').join("");
  }

  if (style === "bubble") {
    const map = MAPS["circled"];
    return [...text].map((c) => transformChar(c, map)).join("");
  }

  const map = MAPS[style];
  return [...text].map((c) => transformChar(c, map)).join("");
}

export function getStyleShortLabel(style: FontStyleId): string {
  const found = FONT_STYLES.find((s) => s.id === style);
  return found?.label ?? style;
}

export function getStyleLabel(style: FontStyleId): string {
  const found = FONT_STYLES.find((s) => s.id === style);
  if (!found) return style;
  if (found.preview) return `${found.label} (${found.preview})`;
  return found.label;
}
