"use client";

import { useEffect, useState } from "react";
import { Copy, Sparkles, Bookmark, Check, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  type CategoryId,
  type Gender,
  pickRandomBio,
  personalizeBioWithName,
  CATEGORY_META,
  bios,
} from "@/lib/bioTemplates";
import InstagramPreview from "./InstagramPreview";
import { applyFontStyle, type FontStyleId } from "@/lib/textStyles";
import { BioForm } from "./BioForm";
import { BioCardItem, SkeletonCard, type GeneratedBio } from "./BioCardItem";

function getSuggestedHashtags(category: CategoryId) {
  const label = CATEGORY_META[category].label.replace(/\s+/g, "");
  return [`#${label}Bio`, "#InstagramBio", "#BioIdeas", "#InstaBio"];
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
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
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
    } catch {}
  }, []);

  const saveToLocal = (newSaved: string[]) => {
    setSavedBios(newSaved);
    try {
      localStorage.setItem("instabiogen_saved_bios", JSON.stringify(newSaved));
    } catch {}
  };

  const generate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let exclude = [...usedIndices];
      const poolSize = bios[category][gender].length;
      if (exclude.length >= poolSize) {
        exclude = variations.length > 0 ? [variations[0].index] : [];
      }

      const { lines: raw, index } = pickRandomBio(category, gender, exclude);
      setUsedIndices((current) => {
        if (exclude.length === 0 || current.length >= poolSize) return [index];
        return [...current, index];
      });

      const personalizedLines = userName.trim()
        ? personalizeBioWithName(raw, userName, category)
        : raw;

      const styledLines = personalizedLines.map((line) => applyFontStyle(line, fontStyle));
      const bioText = styledLines.join("\n");
      const isSaved = savedBios.includes(bioText);

      setVariations([
        {
          id: `bio-${Date.now()}-0`,
          index,
          lines: styledLines,
          editedText: null,
          copied: false,
          saved: isSaved,
        },
      ]);
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
          exclude = [prev[0].index];
        }

        const { lines: raw, index } = pickRandomBio(category, gender, exclude);

        setUsedIndices((current) => {
          if (exclude.length === 1 && current.length >= poolSize) return [exclude[0], index];
          return [...current, index];
        });

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
    setVariations((prev) => prev.map((v) => (v.id === id ? { ...v, editedText: text } : v)));
  };

  const handleCopyBio = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success("Bio copied!");
    setVariations((prev) => prev.map((v) => (v.id === id ? { ...v, copied: true } : v)));
    setTimeout(() => {
      setVariations((prev) => prev.map((v) => (v.id === id ? { ...v, copied: false } : v)));
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

  const suggestedHashtags = getSuggestedHashtags(category);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full flex flex-col lg:flex-row">
        {/* Settings - Left Side */}
        <div className="w-full lg:w-5/12 flex flex-col space-y-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-100 bg-white">
          <BioForm
            userName={userName}
            setUserName={setUserName}
            gender={gender}
            setGender={setGender}
            category={category}
            setCategory={setCategory}
            fontStyle={fontStyle}
            setFontStyle={setFontStyle}
            onGenerate={generate}
          />

          {/* Smart Emoji Panel */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FA7E1E]" />
                Smart Emojis
              </span>
              <span className="text-[10px] text-gray-400">
                {lastFocusedBioId !== null ? "Click to insert into bio" : "Click to copy"}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              {CATEGORY_META[category].emojis.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => handleInsertEmoji(emoji)}
                  className={`h-9 flex items-center justify-center rounded-lg text-lg transition-all ${
                    copiedEmoji === emoji
                      ? "bg-green-100 border border-green-300 scale-105"
                      : "bg-gray-50 hover:bg-[#f3e8ff] hover:scale-105 border border-gray-100"
                  }`}
                  title={
                    lastFocusedBioId !== null
                      ? `Insert ${emoji} into active bio`
                      : `Copy ${emoji}`
                  }
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Smart Hashtags Panel */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Suggested Hashtags
              </span>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(suggestedHashtags.join(" "));
                  toast.success("Hashtags copied!");
                  setCopiedHashtags(true);
                  setTimeout(() => setCopiedHashtags(false), 2000);
                }}
                className={`text-[11px] font-semibold flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  copiedHashtags
                    ? "text-green-600 bg-green-50"
                    : "text-[#4F5BD5] hover:bg-[#4F5BD5]/10"
                }`}
              >
                {copiedHashtags ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copiedHashtags ? "Copied All" : "Copy All"}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedHashtags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(tag);
                    toast.success(`Copied ${tag}`);
                  }}
                  className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200/60 px-2.5 py-1 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results & Live Preview - Right Side */}
        <div className="w-full lg:w-7/12 p-6 sm:p-8 bg-[#fafafa] flex flex-col justify-between min-h-[400px]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                Generated Bios
              </h3>
              {variations.length > 0 && (
                <button
                  onClick={generate}
                  className="text-xs font-semibold text-[#962FBF] hover:underline flex items-center gap-1"
                >
                  Shuffle All
                </button>
              )}
            </div>

            {isGenerating ? (
              <div className="space-y-4">
                <SkeletonCard />
              </div>
            ) : variations.length === 0 ? (
              <div className="h-64 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-6 text-center bg-white">
                <div className="w-12 h-12 rounded-full bg-[#f3e8ff] flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-[#962FBF]" />
                </div>
                <h4 className="font-bold text-gray-800 text-base mb-1">No Bios Generated Yet</h4>
                <p className="text-xs text-gray-500 max-w-xs mb-4">
                  Select your options on the left and click &quot;Generate Bios&quot; to see live recommendations.
                </p>
              </div>
            ) : (
              <div
                className={`space-y-4 transition-opacity duration-300 ${
                  isFading ? "opacity-40" : "opacity-100"
                }`}
              >
                {variations.map((v) => (
                  <BioCardItem
                    key={v.id}
                    variation={v}
                    onEdit={handleEdit}
                    onCopy={handleCopyBio}
                    onRegenerate={regenerateSingle}
                    onSave={handleSaveBio}
                    onFocus={handleFocus}
                    onSelect={handleSelect}
                    onPreview={(text) => setPreviewBio(text)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Saved Bios Tray */}
          {savedBios.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#D62976]" />
                  Saved Favorites ({savedBios.length})
                </span>
                <button
                  onClick={() => {
                    saveToLocal([]);
                    toast.success("Favorites cleared");
                  }}
                  className="text-[11px] text-gray-400 hover:text-red-500 underline"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {savedBios.map((savedText, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-gray-200/60 rounded-xl flex items-center justify-between text-xs text-gray-700 shadow-sm"
                  >
                    <p className="line-clamp-1 flex-1 font-medium pr-2">{savedText}</p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(savedText);
                          toast.success("Copied saved bio!");
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600"
                        title="Copy"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (navigator.share) {
                            try {
                              await navigator.share({ title: "Bio", text: savedText });
                            } catch {}
                          }
                        }}
                        className="p-1.5 hover:bg-gray-100 rounded-md text-gray-600"
                        title="Share"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instagram Live Preview Modal */}
      {previewBio && (
        <InstagramPreview
          bioText={previewBio}
          onClose={() => setPreviewBio(null)}
        />
      )}
    </div>
  );
}
