import { useState } from "react";
import CalEmbed from "./CalEmbed";
import { CoffeeIcon } from "./icons/coffee";
import { CONTACT, LINK_ICON_CLASS, LINK_ROW_CLASS } from "../data/contact";

export default function CoffeeChatButton() {
  const [isCalOpen, setIsCalOpen] = useState(false);

  const openCal = () => setIsCalOpen(true);
  const closeCal = () => setIsCalOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={openCal}
        className={LINK_ROW_CLASS}
        aria-label={CONTACT.coffeeChatAriaLabel}
      >
        <span className={LINK_ICON_CLASS}>
          <CoffeeIcon />
        </span>
        <span>{CONTACT.coffeeChatLabel}</span>
      </button>

      <CalEmbed isOpen={isCalOpen} onClose={closeCal} />
    </>
  );
}
