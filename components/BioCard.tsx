"use client";

export default function BioCard({ text }: { text: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-full p-6 flex items-center transition-all duration-300 hover:bg-[#F3E8FF] hover:border-[#962FBF] group">
      <div className="text-[15px] text-gray-800 leading-relaxed font-medium">
        {text}
      </div>
    </div>
  );
}
