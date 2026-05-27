import { useState } from "react";
import CalEmbed from "./CalEmbed";
import { CONTACT, HERO_CTA_CLASS } from "../data/contact";

function CoffeeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px] text-neutral-400 transition-colors group-hover:text-neutral-200"
      aria-hidden="true"
    >
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a4 4 0 0 1-8 0V6h8v2Z" />
      <path d="M6 8H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-2" />
      <path d="M6 14h12v4H6z" />
    </svg>
  );
}

export default function CalButton() {
  const [isCalOpen, setIsCalOpen] = useState(false);

  const openCal = () => setIsCalOpen(true);
  const closeCal = () => setIsCalOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={openCal}
        data-ccursor
        className={HERO_CTA_CLASS}
        aria-label={CONTACT.coffeeChatAriaLabel}
      >
        <CoffeeIcon />
        <span>{CONTACT.coffeeChatLabel}</span>
      </button>

      <CalEmbed isOpen={isCalOpen} onClose={closeCal} />
    </>
  );
}
