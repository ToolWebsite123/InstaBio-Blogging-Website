"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Copy, RefreshCw, Sparkles } from "lucide-react";
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
      <div className="w-full min-w-0 rounded-2xl sm:rounded-[24px] md:rounded-[30px] bg-gradient-to-br from-[#e9d5ff]/40 via-[#fce7f3]/50 to-[#ffedd5]/40 p-[3px] shadow-[0_8px_40px_rgba(150,47,191,0.12)]">
        <div className="w-full min-w-0 rounded-xl sm:rounded-[24px] md:rounded-[28px] bg-white/95 backdrop-blur-sm border border-white/80 shadow-sm overflow-hidden">
          <div className="p-4 sm:p-6 md:p-8 overflow-visible relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 gap-6 lg:items-stretch">
              {/* Settings */}
              <div className="lg:col-span-4 flex flex-col space-y-5 rounded-2xl border border-[#f3e8ff]/80 bg-gradient-to-br from-[#faf7ff] to-white p-4 sm:p-5 lg:border-r-0 lg:rounded-2xl">
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
                  <CustomSelect
                    id="bio-category"
                    value={category}
                    options={BIO_CATEGORIES}
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
                  className={`w-full min-h-[44px] px-8 py-3 rounded-xl text-white font-bold text-sm shadow-md ${gradientBtn}`}
                >
                  Generate Bio
                </button>
              </div>

              {/* Preview */}
              <div className="lg:col-span-8 flex flex-col min-h-0">
                <div
                  className={`flex flex-col flex-1 rounded-2xl border border-gray-100/90 bg-gradient-to-br from-white via-[#fafafa] to-[#fff8fc] overflow-hidden shadow-inner ${
                    lines.length > 0 ? "ring-1 ring-[#962FBF]/15" : ""
                  }`}
                >
                  <div className="flex-1 px-4 sm:px-6 py-6 sm:py-8 min-h-[200px] lg:min-h-[240px] flex flex-col justify-center w-full bg-[radial-gradient(ellipse_at_top,rgba(150,47,191,0.04)_0%,transparent_55%)]">
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
                      <div className="flex flex-col items-center justify-center text-center gap-3 px-2">
                        <div className="w-12 h-12 rounded-full bg-[#f3e8ff] flex items-center justify-center">
                          <Sparkles
                            className="w-6 h-6 text-[#962FBF]/70"
                            aria-hidden
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-600">
                            Your bio will appear here
                          </p>
                          <p className="text-sm text-gray-500">
                            Choose options, then tap Generate Bio
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-200/80 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={handleCopy}
                        disabled={!outputText}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed ${gradientBtn}`}
                      >
                        <Copy className="w-4 h-4 shrink-0" />
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      <button
                        type="button"
                        onClick={generate}
                        disabled={lines.length === 0}
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#262626] font-semibold text-sm hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <RefreshCw className="w-4 h-4 shrink-0" />
                        Regenerate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
