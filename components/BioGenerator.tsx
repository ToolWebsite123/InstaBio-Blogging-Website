"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Copy, RefreshCw, Sparkles, Bookmark, Check, Search, Share2, User } from "lucide-react";
import toast from "react-hot-toast";
import {
  BIO_CATEGORIES,
  type CategoryId,
  pickRandomBio,
  personalizeBioWithName,
  CATEGORY_META,
  bios,
  type BioCategoryDef
} from "@/lib/bioTemplates";
import InstagramPreview from "./InstagramPreview";
import {
  applyFontStyle,
  FONT_STYLES,
  getStyleLabel,
  getStyleShortLabel,
  type FontStyleId,
} from "@/lib/textStyles";

const gradientBtn =
  "bg-gradient-to-r from-[#FA7E1E] to-[#962FBF] hover:opacity-95 active:scale-[0.98] transition-all";

const fieldLabel =
  "block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2";

function CustomSelect<T extends string>({
  value,
  options,
  onChange,
  getTriggerLabel,
  getOptionLabel,
  className = "",
  id,
}: {
  value: T;
  options: readonly T[] | T[];
  onChange: (v: T) => void;
  getTriggerLabel?: (v: T) => string;
  getOptionLabel?: (v: T) => string;
  className?: string;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const triggerLabel = getTriggerLabel
    ? getTriggerLabel(value)
    : getOptionLabel
      ? getOptionLabel(value)
      : value;

  return (
    <div ref={ref} className={`relative min-w-0 w-full ${className}`}>
      <button
        id={id}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className={`w-full min-h-[44px] flex items-center justify-between gap-2 px-4 py-3 rounded-xl border bg-white text-sm text-[#262626] font-medium transition-all ${
          open
            ? "border-[#962FBF] ring-1 ring-[#962FBF]/30"
            : "border-gray-200 hover:border-[#962FBF]/50"
        }`}
      >
        <span className="truncate text-left">{triggerLabel}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-1 w-full max-w-[min(100vw-2rem,320px)] max-h-60 sm:max-h-80 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-lg py-1"
        >
          {options.map((opt) => (
            <li key={opt} role="option" aria-selected={opt === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                  opt === value
                    ? "bg-[#4F5BD5] text-white"
                    : "text-[#262626] hover:bg-[#4F5BD5] hover:text-white"
                }`}
              >
                {getOptionLabel ? getOptionLabel(opt) : opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SearchableCategorySelect({
  value,
  onChange,
  className = "",
  id,
}: {
  value: CategoryId;
  onChange: (v: CategoryId) => void;
  className?: string;
  id?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      setSearch("");
    }
  }, [open]);

  const selectedMeta = CATEGORY_META[value];
  const Icon = selectedMeta?.icon;

  const filteredCategories = BIO_CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={ref} className={`relative min-w-0 w-full ${className}`}>
      <button
        id={id}
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        className={`w-full min-h-[44px] flex items-center justify-between gap-2 px-4 py-3 rounded-xl border bg-white text-sm text-[#262626] font-medium transition-all ${
          open
            ? "border-[#962FBF] ring-1 ring-[#962FBF]/30"
            : "border-gray-200 hover:border-[#962FBF]/50"
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-4 h-4 text-gray-500" />}
          <span className="truncate text-left">{selectedMeta?.label || value}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full max-w-[min(100vw-2rem,320px)] rounded-xl border border-gray-100 bg-white shadow-lg flex flex-col overflow-hidden">
          <div className="p-2 border-b border-gray-100 flex items-center gap-2 sticky top-0 bg-white z-10">
             <Search className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
             <input 
               ref={inputRef}
               type="text" 
               className="w-full text-sm outline-none bg-transparent py-1" 
               placeholder="Search category..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               onClick={(e) => e.stopPropagation()}
             />
          </div>
          <ul
            role="listbox"
            className="w-full max-h-60 sm:max-h-80 overflow-y-auto py-1"
          >
            {filteredCategories.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-500 text-center">No categories found</li>
            ) : (
              filteredCategories.map((opt) => {
                const ItemIcon = opt.icon;
                return (
                  <li key={opt.id} role="option" aria-selected={opt.id === value}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(opt.id);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                        opt.id === value
                          ? "bg-[#4F5BD5]/10 text-[#4F5BD5] font-semibold"
                          : "text-[#262626] hover:bg-gray-50"
                      }`}
                    >
                      <ItemIcon className={`w-4 h-4 ${opt.id === value ? "text-[#4F5BD5]" : "text-gray-500"}`} />
                      {opt.label}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function calculateBioScore(text: string): { score: number; tip: string } {
  let score = 10;
  let tip = "Perfect bio!";
  
  if (text.length > 150) {
    score -= 3;
    tip = "Too long! Keep under 150 chars.";
  } else if (text.length < 50) {
    score -= 2;
    tip = "A bit short. Add more details.";
  }

  const emojis = text.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu);
  const emojiCount = emojis ? emojis.length : 0;
  if (emojiCount === 0) {
    score -= 2;
    tip = "Add some emojis to make it pop!";
  } else if (emojiCount > 5) {
    score -= 1;
    tip = "Too many emojis can look cluttered.";
  }

  const lines = text.split('\n').length;
  if (lines > 5) {
    score -= 2;
    tip = "Too many line breaks.";
  } else if (lines === 1 && text.length > 80) {
    score -= 1;
    tip = "Add line breaks for readability.";
  }

  return { score: Math.max(1, score), tip };
}

type GeneratedBio = {
  id: string;
  index: number;
  lines: string[];
  editedText: string | null;
  copied: boolean;
  saved: boolean;
};

function BioCard({
  variation,
  onEdit,
  onCopy,
  onRegenerate,
  onSave,
  onFocus,
  onSelect,
  onPreview,
}: {
  variation: GeneratedBio;
  onEdit: (id: string, text: string) => void;
  onCopy: (id: string, text: string) => void;
  onRegenerate: (id: string) => void;
  onSave: (id: string, text: string) => void;
  onFocus: (id: string, pos: number) => void;
  onSelect: (id: string, pos: number) => void;
  onPreview: (text: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const outputText = variation.editedText !== null ? variation.editedText : variation.lines.join("\n");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Instagram Bio',
          text: outputText,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      toast.error('Sharing not supported on this device');
    }
  };
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [outputText]);

  const charCount = outputText.length;
  const maxChars = 150;
  const remainingChars = maxChars - charCount;

  let stateColor = "bg-green-500";
  let textColor = "text-green-600";
  if (charCount > 100 && charCount <= 140) {
    stateColor = "bg-yellow-500";
    textColor = "text-yellow-600";
  } else if (charCount > 140) {
    stateColor = "bg-red-500";
    textColor = "text-red-600";
  }
  
  const progressPercent = Math.min((charCount / maxChars) * 100, 100);
  const bioScore = calculateBioScore(outputText);

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Text Area */}
      <div className="p-4 sm:p-5 bg-gradient-to-br from-white via-[#fafafa] to-[#fff8fc] flex-1">
        <textarea
          ref={textareaRef}
          value={outputText}
          onChange={(e) => onEdit(variation.id, e.target.value)}
          onFocus={(e) => onFocus(variation.id, e.target.selectionStart)}
          onSelect={(e) => onSelect(variation.id, e.target.selectionStart)}
          className="w-full bg-transparent text-center resize-none overflow-hidden text-base sm:text-lg text-[#262626] leading-relaxed focus:outline-none placeholder-gray-400"
          rows={1}
          spellCheck={false}
          placeholder="Your bio..."
        />
      </div>

      {/* Progress & Counter */}
      <div className="px-4 sm:px-5 pb-3 bg-white">
        <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold mb-1.5">
          <span className={textColor}>
            {charCount} / {maxChars}
          </span>
          <span className="text-gray-400">
            {Math.abs(remainingChars)} {remainingChars >= 0 ? "left" : "over"}
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${stateColor}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        {/* Quality Score */}
        <div className="mt-3 flex items-center justify-between border-t border-gray-50 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Score</span>
            <div className="flex items-center gap-1">
              <span className={`text-xs font-bold ${bioScore.score >= 8 ? "text-green-600" : bioScore.score >= 5 ? "text-yellow-600" : "text-red-600"}`}>
                {bioScore.score}/10
              </span>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 text-right truncate max-w-[60%] italic">
            {bioScore.tip}
          </p>
        </div>
      </div>

      {/* Action Row */}
      <div className="border-t border-gray-100 bg-gray-50/50 p-2 sm:p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onCopy(variation.id, outputText)}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              variation.copied 
                ? "bg-green-100 text-green-700 border border-green-200" 
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            {variation.copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {variation.copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={() => onRegenerate(variation.id)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 text-xs font-semibold transition-all"
            title="Generate new variation"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate</span>
          </button>
          <button
            onClick={() => onPreview(outputText)}
            className="flex items-center justify-center px-3 py-2 rounded-lg bg-[#4F5BD5]/10 text-[#4F5BD5] border border-[#4F5BD5]/20 hover:bg-[#4F5BD5]/20 hover:border-[#4F5BD5]/30 text-xs font-semibold transition-all"
          >
            Preview
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center px-3 py-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 text-xs font-semibold transition-all"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <button
          onClick={() => onSave(variation.id, outputText)}
          className={`p-2 rounded-lg transition-colors ${
            variation.saved 
              ? "text-[#D62976] bg-[#D62976]/10" 
              : "text-gray-400 hover:text-[#D62976] hover:bg-gray-100"
          }`}
          title="Save to favorites"
        >
          <Bookmark className={`w-4 h-4 ${variation.saved ? "fill-current" : ""}`} />
        </button>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200/80 bg-white overflow-hidden shadow-sm h-[250px] animate-pulse">
      <div className="p-4 sm:p-5 bg-gray-50 flex-1 flex flex-col items-center justify-center gap-3">
        <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
      </div>
      <div className="px-4 sm:px-5 pb-3 bg-white pt-2 border-t border-gray-100">
        <div className="w-full h-1.5 bg-gray-100 rounded-full"></div>
      </div>
      <div className="border-t border-gray-100 bg-gray-50/50 p-2 sm:p-3 flex items-center justify-between gap-2">
         <div className="flex gap-2">
           <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
           <div className="h-8 bg-gray-200 rounded-lg w-16"></div>
         </div>
         <div className="h-8 bg-gray-200 rounded-lg w-8"></div>
      </div>
    </div>
  );
}

type BioGeneratorProps = {
  className?: string;
};

export default function BioGenerator({ className = "" }: BioGeneratorProps) {
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState<Gender>("female");
  const [category, setCategory] = useState<CategoryId>("fitness");
  const [fontStyle, setFontStyle] = useState<FontStyleId>("fancy");
  const [variations, setVariations] = useState<GeneratedBio[]>([]);
  const [savedBios, setSavedBios] = useState<string[]>([]);
  const [lastFocusedBioId, setLastFocusedBioId] = useState<string | null>(null);
  const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
  const [copiedHashtags, setCopiedHashtags] = useState(false);
  const [previewBio, setPreviewBio] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);

  useEffect(() => {
    setUsedIndices([]);
  }, [category, gender]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("instabiogen_saved_bios");
      if (saved) {
        setSavedBios(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const saveToLocal = (newSaved: string[]) => {
    setSavedBios(newSaved);
    try {
      localStorage.setItem("instabiogen_saved_bios", JSON.stringify(newSaved));
    } catch (e) {}
  };

  const generate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let exclude = [...usedIndices];
      const poolSize = bios[category][gender].length;
      if (exclude.length >= poolSize) {
        // Keep the last shown index so it doesn't repeat immediately on shuffle
        exclude = variations.length > 0 ? [variations[0].index] : [];
      }

      const { lines: raw, index } = pickRandomBio(category, gender, exclude);
      setUsedIndices(current => {
        if (exclude.length === 0 || current.length >= poolSize) return [index];
        return [...current, index];
      });

      // Personalize with name if provided
      const personalizedLines = userName.trim()
        ? personalizeBioWithName(raw, userName, category)
        : raw;
      
      const styledLines = personalizedLines.map((line) => applyFontStyle(line, fontStyle));
      const bioText = styledLines.join("\n");
      const isSaved = savedBios.includes(bioText);

      setVariations([{
        id: `bio-${Date.now()}-0`,
        index,
        lines: styledLines,
        editedText: null,
        copied: false,
        saved: isSaved,
      }]);
      setIsGenerating(false);
    }, 500);
  };

  const regenerateSingle = (id: string) => {
    if (isFading) return;
    setIsFading(true);

    setTimeout(() => {
      setVariations((prev) => {
        let exclude = [...usedIndices];
        const poolSize = bios[category][gender].length;
        if (exclude.length >= poolSize) {
          // Keep the last shown index so it doesn't repeat immediately on shuffle
          exclude = [prev[0].index];
        }

        const { lines: raw, index } = pickRandomBio(category, gender, exclude);
        
        setUsedIndices(current => {
          if (exclude.length === 1 && current.length >= poolSize) return [exclude[0], index];
          return [...current, index];
        });

        // Personalize with name if provided
        const personalizedLines = userName.trim()
          ? personalizeBioWithName(raw, userName, category)
          : raw;

        const styledLines = personalizedLines.map((line) => applyFontStyle(line, fontStyle));
        const bioText = styledLines.join("\n");
        
        return prev.map((v) => {
          if (v.id === id) {
            return {
              ...v,
              index,
              lines: styledLines,
              editedText: null,
              copied: false,
              saved: savedBios.includes(bioText),
            };
          }
          return v;
        });
      });
      setIsFading(false);
    }, 300);
  };

  const handleEdit = (id: string, text: string) => {
    setVariations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, editedText: text } : v))
    );
  };

  const handleCopyBio = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Bio copied!");
    setVariations((prev) =>
      prev.map((v) => (v.id === id ? { ...v, copied: true } : v))
    );
    setTimeout(() => {
      setVariations((prev) =>
        prev.map((v) => (v.id === id ? { ...v, copied: false } : v))
      );
    }, 2000);
  };

  const handleSaveBio = (id: string, text: string) => {
    setVariations((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const isSaving = !v.saved;
          let newSaved = [...savedBios];
          if (isSaving && !newSaved.includes(text)) {
            newSaved.push(text);
            toast.success("Bio saved!");
          } else if (!isSaving) {
            newSaved = newSaved.filter((b) => b !== text);
            toast.success("Bio removed from saved!");
          } else {
            toast("Bio is already saved", { icon: "ℹ️" });
          }
          saveToLocal(newSaved);
          return { ...v, saved: isSaving };
        }
        return v;
      })
    );
  };

  const handleFocus = (id: string, pos: number) => {
    setLastFocusedBioId(id);
    setCursorPosition(pos);
  };

  const handleSelect = (id: string, pos: number) => {
    if (lastFocusedBioId === id) {
      setCursorPosition(pos);
    }
  };

  const handleInsertEmoji = async (emoji: string) => {
    if (lastFocusedBioId !== null) {
      setVariations((prev) =>
        prev.map((v) => {
          if (v.id === lastFocusedBioId) {
            const currentText = v.editedText !== null ? v.editedText : v.lines.join("\n");
            const pos = cursorPosition !== null ? cursorPosition : currentText.length;
            const newText = currentText.slice(0, pos) + emoji + currentText.slice(pos);
            setCursorPosition(pos + emoji.length);
            return { ...v, editedText: newText };
          }
          return v;
        })
      );
    } else {
      await navigator.clipboard.writeText(emoji);
      toast.success(`Copied ${emoji}`);
      setCopiedEmoji(emoji);
      setTimeout(() => setCopiedEmoji(null), 2000);
    }
  };

  return (
    <div className={`w-full ${className}`}>
    <div className={`w-full ${className}`}>
      <div className="w-full flex flex-col lg:flex-row">
        {/* Settings - Left Side */}
        <div className="w-full lg:w-5/12 flex flex-col space-y-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-white">
                {/* Name Input */}
                <div>
                  <label htmlFor="bio-user-name" className={fieldLabel}>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#962FBF]" />
                      Your Name
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="bio-user-name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Enter your name..."
                      maxLength={30}
                      className="w-full min-h-[44px] px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#262626] font-medium transition-all focus:border-[#962FBF] focus:ring-1 focus:ring-[#962FBF]/30 outline-none placeholder-gray-400"
                    />
                    {userName && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[#962FBF] bg-[#f3e8ff] px-2 py-0.5 rounded-full">
                        ✨ Personalized
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1.5 leading-relaxed">
                    Your bio will include your name for a personal touch
                  </p>
                </div>

                <div>
                  <span className={fieldLabel}>Gender</span>
                  <div
                    className="grid grid-cols-2 gap-2"
                    role="group"
                    aria-label="Gender"
                  >
                    {(["male", "female"] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all ${
                          gender === g
                            ? "bg-[#f3e8ff] border border-[#962FBF] text-[#962FBF]"
                            : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="bio-category" className={fieldLabel}>
                    Category
                  </label>
                  <SearchableCategorySelect
                    id="bio-category"
                    value={category}
                    onChange={setCategory}
                  />
                </div>

                <div>
                  <label htmlFor="bio-text-style" className={fieldLabel}>
                    Text style
                  </label>
                  <CustomSelect
                    id="bio-text-style"
                    value={fontStyle}
                    options={FONT_STYLES.map((s) => s.id)}
                    onChange={setFontStyle}
                    getTriggerLabel={(id) => getStyleShortLabel(id)}
                    getOptionLabel={(id) => getStyleLabel(id)}
                  />
                </div>

                <button
                  type="button"
                  onClick={generate}
                  className={`w-full min-h-[44px] mt-2 px-8 py-3 rounded-xl text-white font-bold text-sm shadow-md ${gradientBtn}`}
                >
                  Generate Bios
                </button>

                {/* Smart Emoji Panel */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#FA7E1E]" />
                      Smart Emojis
                    </span>
                    <button
                      onClick={async () => {
                        const emojis = CATEGORY_META[category].emojis.join(" ");
                        await navigator.clipboard.writeText(emojis);
                        toast.success("Emojis copied!");
                        setCopiedEmoji("ALL");
                        setTimeout(() => setCopiedEmoji(null), 2000);
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#FA7E1E] hover:text-[#962FBF] transition-colors"
                    >
                      {copiedEmoji === "ALL" ? "Copied" : "Copy All"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 relative">
                    {CATEGORY_META[category]?.emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          handleInsertEmoji(emoji);
                          if (!lastFocusedBioId) {
                            navigator.clipboard.writeText(emoji);
                            toast.success(`Copied ${emoji}`);
                          }
                        }}
                        className="relative group w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:border-[#962FBF]/30 hover:shadow-sm hover:-translate-y-0.5 transition-all text-xl"
                        title="Click to insert or copy"
                      >
                        {emoji}
                        {copiedEmoji === emoji && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap animate-in fade-in zoom-in duration-200">
                            Copied!
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
                    {lastFocusedBioId ? "Click an emoji to insert at cursor" : "Click an emoji to copy, or select a bio first to insert"}
                  </p>
                </div>

                {/* Hashtags Panel */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-[#962FBF]" />
                      Suggested Hashtags
                    </span>
                    <button
                      onClick={async () => {
                        const hashtags = CATEGORY_META[category]?.hashtags?.join(" ") || "";
                        await navigator.clipboard.writeText(hashtags);
                        toast.success("Hashtags copied!");
                        setCopiedHashtags(true);
                        setTimeout(() => setCopiedHashtags(false), 2000);
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#962FBF] hover:text-[#FA7E1E] transition-colors flex items-center gap-1"
                    >
                      {copiedHashtags ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copiedHashtags ? "Copied" : "Copy All"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar pr-2">
                    {CATEGORY_META[category]?.hashtags?.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-[#f3e8ff]/50 text-[#962FBF] text-xs font-medium border border-[#962FBF]/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview Area - Right Side */}
              <div className="w-full lg:w-7/12 flex flex-col min-h-0 bg-gray-50/30">
                <div className="flex-1 flex flex-col p-6 sm:p-8">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto">
                      <div className="w-full">
                        <SkeletonCard />
                      </div>
                    </div>
                  ) : variations.length > 0 ? (
                    <div className="flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto animate-in fade-in duration-500">
                      
                      <div className="text-[11px] font-bold tracking-wider uppercase text-[#962FBF] mb-3 text-center bg-[#f3e8ff]/50 border border-[#962FBF]/10 px-4 py-1.5 rounded-full">
                        Bio {Math.min(usedIndices.length, bios[category][gender].length)} of {bios[category][gender].length} available
                      </div>

                      <div className={`w-full transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                        {variations.map((v) => (
                          <BioCard
                            key={v.id}
                            variation={v}
                            onEdit={handleEdit}
                            onCopy={handleCopyBio}
                            onRegenerate={regenerateSingle}
                            onSave={handleSaveBio}
                            onFocus={handleFocus}
                            onSelect={handleSelect}
                            onPreview={setPreviewBio}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => regenerateSingle(variations[0].id)}
                        disabled={isFading}
                        className={`mt-5 w-full max-w-xs min-h-[44px] px-8 py-3 rounded-xl text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                          isFading ? "opacity-50 cursor-not-allowed" : gradientBtn
                        }`}
                      >
                        <RefreshCw className={`w-4 h-4 ${isFading ? "animate-spin" : ""}`} />
                        Regenerate Bio
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col flex-1 items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top,rgba(150,47,191,0.04)_0%,transparent_55%)]">
                      <div className="w-16 h-16 mb-4 rounded-full bg-[#f3e8ff] flex items-center justify-center shadow-sm">
                        <Sparkles
                          className="w-8 h-8 text-[#962FBF]/70"
                          aria-hidden
                        />
                      </div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">Ready to generate</h3>
                      <p className="text-sm text-gray-500 text-center max-w-[250px]">
                        Choose your settings on the left and click Generate Bios to see a unique variation instantly.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
      </div>

      {previewBio && (
        <InstagramPreview 
          bioText={previewBio} 
          onClose={() => setPreviewBio(null)} 
        />
      )}
    </div>
  );
}
