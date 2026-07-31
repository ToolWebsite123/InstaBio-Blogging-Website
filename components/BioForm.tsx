"use client";

import { User } from "lucide-react";
import { type CategoryId, type Gender } from "@/lib/bioTemplates";
import { FONT_STYLES, getStyleLabel, getStyleShortLabel, type FontStyleId } from "@/lib/textStyles";
import { CustomSelect, SearchableCategorySelect } from "./StylePicker";

const fieldLabel = "block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2";
const gradientBtn =
  "bg-gradient-to-r from-[#FA7E1E] to-[#962FBF] hover:opacity-95 active:scale-[0.98] transition-all";

export function BioForm({
  userName,
  setUserName,
  gender,
  setGender,
  category,
  setCategory,
  fontStyle,
  setFontStyle,
  onGenerate,
}: {
  userName: string;
  setUserName: (val: string) => void;
  gender: Gender;
  setGender: (g: Gender) => void;
  category: CategoryId;
  setCategory: (c: CategoryId) => void;
  fontStyle: FontStyleId;
  setFontStyle: (fs: FontStyleId) => void;
  onGenerate: () => void;
}) {
  return (
    <div className="w-full flex flex-col space-y-5">
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
        <div className="grid grid-cols-2 gap-2" role="group" aria-label="Gender">
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
        <SearchableCategorySelect id="bio-category" value={category} onChange={setCategory} />
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
        onClick={onGenerate}
        className={`w-full min-h-[44px] mt-2 px-8 py-3 rounded-xl text-white font-bold text-sm shadow-md ${gradientBtn}`}
      >
        Generate Bios
      </button>
    </div>
  );
}
