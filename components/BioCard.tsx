"use client";

export default function BioCard({ text }: { text: string }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm h-full p-4 sm:p-6 flex items-center transition-all duration-300 hover:bg-[#F3E8FF] hover:border-[#962FBF] group">
      <div className="text-sm sm:text-[15px] text-gray-800 leading-relaxed font-medium break-words w-full">
        {text}
      </div>
    </div>
  );
}
