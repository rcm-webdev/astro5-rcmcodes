import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Cal, { getCalApi } from "@calcom/embed-react";

interface CalEmbedProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalEmbed({ isOpen, onClose }: CalEmbedProps) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Initialize Cal.com
      (async function () {
        const cal = await getCalApi({ namespace: "30min" });
        cal("ui", {
          theme: "dark",
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      })();
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 99999,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0
      }}
    >
      <div 
        className="relative w-full max-w-4xl h-[80vh] mx-4 bg-neutral-900 rounded-lg border border-neutral-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ 
          position: 'relative', 
          zIndex: 100000,
          maxWidth: '1024px',
          height: '80vh'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white transition-colors bg-neutral-800/80 rounded-full backdrop-blur-sm"
          aria-label="Close calendar"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>

        {/* Cal.com Embed */}
        <div className="w-full h-full">
          <Cal 
            namespace="30min"
            calLink="rcmcodes/30min"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>
      </div>
    </div>
  );

  // Render modal directly to body using portal
  return createPortal(modalContent, document.body);
} 