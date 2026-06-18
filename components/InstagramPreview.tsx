import { X, CheckCircle, MoreHorizontal, ChevronDown, Lock } from "lucide-react";

export default function InstagramPreview({
  bioText,
  onClose,
}: {
  bioText: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-[375px] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200"
        style={{ height: '812px', maxHeight: '90vh' }}
      >
        {/* iOS Status Bar Mock */}
        <div className="h-12 flex items-end justify-between px-6 pb-2 text-[15px] font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-3 border border-black rounded-[2px] relative flex items-center justify-start p-[1px]">
              <div className="bg-black w-2/3 h-full rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* IG Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-1 cursor-pointer">
            <Lock className="w-3.5 h-3.5" />
            <h1 className="font-bold text-xl tracking-tight">your_username</h1>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-1.5">
              <span className="w-6 h-0.5 bg-black rounded-full" />
              <span className="w-6 h-0.5 bg-black rounded-full" />
              <span className="w-6 h-0.5 bg-black rounded-full" />
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Avatar */}
            <div className="relative">
              <div className="w-[86px] h-[86px] rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
                <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-gray-100">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-lg pb-0.5">
                +
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 pr-2">
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">0</span>
                <span className="text-sm text-gray-600">posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">1.2M</span>
                <span className="text-sm text-gray-600">followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">45</span>
                <span className="text-sm text-gray-600">following</span>
              </div>
            </div>
          </div>

          {/* Bio Text */}
          <div className="mt-4">
            <h2 className="font-semibold text-sm">Your Name Here</h2>
            <p className="text-gray-500 text-sm mb-1">Personal blog</p>
            <div className="text-[14px] leading-tight whitespace-pre-wrap font-sans">
              {bioText}
            </div>
            <div className="mt-1 flex items-center gap-1 text-[#00376b] font-medium text-sm">
              <span className="truncate">linktr.ee/your_link</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-4">
            <button className="flex-1 bg-gray-100 text-black font-semibold rounded-lg py-1.5 text-sm">
              Edit profile
            </button>
            <button className="flex-1 bg-gray-100 text-black font-semibold rounded-lg py-1.5 text-sm">
              Share profile
            </button>
            <button className="bg-gray-100 text-black font-semibold rounded-lg p-2 px-3">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Highlights Mock */}
          <div className="flex gap-4 mt-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="w-16 h-16 rounded-full border border-gray-300 p-0.5">
                  <div className="w-full h-full bg-gray-100 rounded-full" />
                </div>
                <span className="text-xs">Highlight</span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Mock */}
        <div className="mt-2 flex-1 border-t border-gray-200">
          <div className="flex justify-around py-3">
            <div className="w-6 h-6 border-2 border-black rounded-[2px] relative flex flex-wrap content-between justify-between p-0.5">
              <div className="w-2 h-2 bg-black" /><div className="w-2 h-2 bg-black" />
              <div className="w-2 h-2 bg-black" /><div className="w-2 h-2 bg-black" />
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
            <div className="w-6 h-6 rounded-[2px] border-2 border-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-0.5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-100" />
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
