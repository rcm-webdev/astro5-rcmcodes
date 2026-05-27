import { useState } from "react";
import CalEmbed from "./CalEmbed";
import { CoffeeIcon } from "./icons/coffee";
import { CONTACT, HERO_CTA_CLASS } from "../data/contact";

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
