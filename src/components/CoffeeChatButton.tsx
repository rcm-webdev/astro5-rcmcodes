import { useState } from "react";
import CalEmbed from "./CalEmbed";

export default function CoffeeChatButton() {
  const [isCalOpen, setIsCalOpen] = useState(false);

  const openCal = () => setIsCalOpen(true);
  const closeCal = () => setIsCalOpen(false);

  return (
    <>
      <button
        onClick={openCal}
        className="flex items-center w-full p-4 bg-[#292929] hover:bg-[#292929]/80 rounded-xl transition-colors duration-200"
      >
        <div className="w-6 h-6 mr-4 flex-shrink-0 text-white">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="w-full h-full object-contain"
          >
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
        </div>
        <span className="text-white font-medium">30 min Coffee Chat</span>
      </button>
      
      <CalEmbed isOpen={isCalOpen} onClose={closeCal} />
    </>
  );
} 