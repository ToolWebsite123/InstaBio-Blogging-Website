"use client";

export default function BioGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
      {children}
    </div>
  );
}
