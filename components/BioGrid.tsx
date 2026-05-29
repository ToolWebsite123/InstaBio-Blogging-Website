"use client";

export default function BioGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6 sm:my-10">
      {children}
    </div>
  );
}
