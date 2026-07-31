"use client";

import { useEffect, useRef } from "react";
import { Bookmark, Check, Copy, RefreshCw, Share2 } from "lucide-react";
import toast from "react-hot-toast";

export type GeneratedBio = {
  id: string;
  index: number;
  lines: string[];
  editedText: string | null;
  copied: boolean;
  saved: boolean;
};

export function calculateBioScore(text: string): { score: number; tip: string } {
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

  const lines = text.split("\n").length;
  if (lines > 5) {
    score -= 2;
    tip = "Too many line breaks.";
  } else if (lines === 1 && text.length > 80) {
    score -= 1;
    tip = "Add line breaks for readability.";
  }

  return { score: Math.max(1, score), tip };
}

export function BioCardItem({
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
  const outputText =
    variation.editedText !== null ? variation.editedText : variation.lines.join("\n");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Instagram Bio",
          text: outputText,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      toast.error("Sharing not supported on this device");
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
          onChange={(e) => onEdit(variation.id, e.currentTarget.value)}
          onFocus={(e) => onFocus(variation.id, e.currentTarget.selectionStart)}
          onSelect={(e) => onSelect(variation.id, e.currentTarget.selectionStart)}
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
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Score
            </span>
            <div className="flex items-center gap-1">
              <span
                className={`text-xs font-bold ${
                  bioScore.score >= 8
                    ? "text-green-600"
                    : bioScore.score >= 5
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
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

export function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 animate-pulse min-h-[160px] justify-between shadow-sm">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="h-8 bg-gray-200 rounded w-20"></div>
        <div className="h-8 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );
}
