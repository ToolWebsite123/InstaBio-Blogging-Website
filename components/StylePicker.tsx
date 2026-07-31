"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { BIO_CATEGORIES, CATEGORY_META, type CategoryId } from "@/lib/bioTemplates";

export function CustomSelect<T extends string>({
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

export function SearchableCategorySelect({
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
          <ul role="listbox" className="w-full max-h-60 sm:max-h-80 overflow-y-auto py-1">
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
                      <ItemIcon
                        className={`w-4 h-4 ${opt.id === value ? "text-[#4F5BD5]" : "text-gray-500"}`}
                      />
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
