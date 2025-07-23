import { useState } from "react";
import CalEmbed from "./CalEmbed";

export default function CalButton() {
  const [isCalOpen, setIsCalOpen] = useState(false);

  const openCal = () => setIsCalOpen(true);
  const closeCal = () => setIsCalOpen(false);

  return (
    <>
      <button
        onClick={openCal}
        data-ccursor
        className="inline-flex transition-all border-neutral-700 hover:border-opacity-0 border-opacity-50 shadow rounded-md border backdrop-blur-xl bg-neutral-400/10 px-3 py-2.5 items-center text-white font-semibold group p-2 text-sm gap-x-2"
      >
        <span>Get to know me</span>
        <span className="w-2 h-2 rounded-full bg-green-400 duration-1000 animate-pulse">
        </span>
      </button>
      
      <CalEmbed isOpen={isCalOpen} onClose={closeCal} />
    </>
  );
} 