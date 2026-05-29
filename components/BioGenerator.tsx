"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Copy, RefreshCw } from "lucide-react";
import {
  BIO_CATEGORIES,
  type BioCategory,
  type Gender,
  pickRandomBio,
} from "@/lib/bioTemplates";
import {
  applyFontStyle,
  FONT_STYLES,
  getStyleLabel,
  getStyleShortLabel,
  type FontStyleId,
} from "@/lib/textStyles";

const gradientBtn =
  "bg-gradient-to-r from-[#FA7E1E] to-[#962FBF] hover:opacity-95 active:scale-[0.98] transition-all";

function CustomSelect<T extends string>({
  value,
  options,
  onChange,
  getTriggerLabel,
  getOptionLabel,
  className = "",
}: {
  value: T;
  options: readonly T[] | T[];
  onChange: (v: T) => void;
  getTriggerLabel?: (v: T) => string;
  getOptionLabel?: (v: T) => string;
  className?: string;
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
    <div
      ref={ref}
      className={`relative min-w-0 w-full md:w-auto md:min-w-[160px] lg:min-w-[180px] ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border bg-white text-sm text-[#262626] font-medium transition-all ${
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
        <ul className="absolute z-50 mt-1 w-full max-w-[min(100vw-2rem,320px)] max-h-60 sm:max-h-80 overflow-y-auto rounded-xl border border-gray-100 bg-white shadow-lg py-1">
          {options.map((opt) => (
            <li key={opt}>
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

type BioGeneratorProps = {
  className?: string;
};

export default function BioGenerator({ className = "" }: BioGeneratorProps) {
  const [gender, setGender] = useState<Gender>("female");
  const [category, setCategory] = useState<BioCategory>("Photographers");
  const [fontStyle, setFontStyle] = useState<FontStyleId>("fancy");
  const [lines, setLines] = useState<string[]>([]);
  const [lastIndex, setLastIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const exclude = lastIndex !== null ? [lastIndex] : [];
    const { lines: raw, index } = pickRandomBio(category, gender, exclude);
    setLastIndex(index);
    setLines(raw.map((line) => applyFontStyle(line, fontStyle)));
  };

  const outputText = lines.join("\n");

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full min-w-0 rounded-2xl sm:rounded-[24px] md:rounded-[30px] bg-gradient-to-br from-[#fdf8ff] to-[#fff5f8] p-1 shadow-[0_8px_32px_rgba(150,47,191,0.15)]">
        <div className="w-full min-w-0 rounded-xl sm:rounded-[24px] md:rounded-[28px] bg-white border border-gray-100/80">
          <div className="p-4 sm:p-6 md:p-8 overflow-visible relative z-20">
            <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap lg:items-center lg:justify-between gap-3 w-full">
              <div className="flex justify-center md:justify-start gap-2 shrink-0 w-full sm:w-auto">
                {(["male", "female"] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                      gender === g
                        ? "bg-[#f3e8ff] border border-[#962FBF] text-[#962FBF]"
                        : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row md:flex-wrap lg:flex-nowrap lg:items-center gap-3 w-full lg:flex-1 lg:justify-end lg:max-w-none">
                <CustomSelect
                  value={category}
                  options={BIO_CATEGORIES}
                  onChange={setCategory}
                  className="sm:flex-1 lg:max-w-none"
                />
                <CustomSelect
                  value={fontStyle}
                  options={FONT_STYLES.map((s) => s.id)}
                  onChange={setFontStyle}
                  getTriggerLabel={(id) => getStyleShortLabel(id)}
                  getOptionLabel={(id) => getStyleLabel(id)}
                  className="sm:flex-1 lg:max-w-none"
                />
                <button
                  type="button"
                  onClick={generate}
                  className={`w-full sm:w-auto shrink-0 px-8 py-3 rounded-xl text-white font-bold text-sm whitespace-nowrap shadow-md ${gradientBtn}`}
                >
                  Generate Bio
                </button>
              </div>
            </div>
          </div>

          <div className="w-full border-t border-gray-200 bg-[#fafafa] overflow-hidden rounded-b-[24px] md:rounded-b-[28px]">
            <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 min-h-[140px] sm:min-h-[160px] flex flex-col justify-center w-full">
              {lines.length > 0 ? (
                <div className="space-y-3 text-center w-full">
                  {lines.map((line, i) => (
                    <p
                      key={i}
                      className="text-base sm:text-lg md:text-xl text-[#262626] leading-relaxed break-words"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center w-full">
                  Select options and tap Generate Bio
                </p>
              )}
            </div>

            <div className="border-t border-gray-200" />

            <div className="flex flex-col sm:flex-row gap-3 p-4 sm:px-6 md:px-8 md:pb-6 md:pt-5 w-full">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!outputText}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-sm disabled:opacity-50 ${gradientBtn}`}
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
              <button
                type="button"
                onClick={generate}
                disabled={lines.length === 0}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white text-[#262626] font-semibold text-sm hover:bg-gray-50 transition-all sm:shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
