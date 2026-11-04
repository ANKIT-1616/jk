import React, { useState } from "react";
import { Heart } from "lucide-react";
import { LetterConfig } from "../data/letterContent";
import { romanticAudio } from "../utils/audioSynth";

interface EnvelopeProps {
  config: LetterConfig;
  onOpenComplete: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ config, onOpenComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    romanticAudio.playSealPop();
    setIsOpen(true);
    // Allow the flap animation to complete before sliding the card up
    setTimeout(() => {
      setIsCardRevealed(true);
    }, 600);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      <div className="w-full max-w-md mx-auto text-center mb-6">
        <p className="font-handwriting text-xl sm:text-2xl text-[#641C2C] tracking-wide">
          To: {config.recipientName}
        </p>
        <p className="text-xs sm:text-sm text-[#292321]/60 font-sans-clean mt-1">
          {config.envelope.sublabel}
        </p>
      </div>

      {/* Main Envelope Scene */}
      <div className="relative w-full max-w-[380px] sm:max-w-[440px] h-[300px] sm:h-[330px] perspective-[1200px] flex items-center justify-center">
        {/* The Emerging Note Card (inside envelope, slides upward on open) */}
        <div
          className={`absolute w-[90%] sm:w-[92%] h-[260px] sm:h-[280px] bg-[#FFF9F0] double-pencil-border rounded-lg p-6 sm:p-7 flex flex-col justify-between text-center transition-all duration-700 ease-out z-20 ${
            isCardRevealed
              ? "-translate-y-24 sm:-translate-y-28 shadow-xl opacity-100 scale-100"
              : isOpen
              ? "-translate-y-10 opacity-80 scale-95"
              : "translate-y-4 opacity-0 pointer-events-none scale-90"
          }`}
        >
          {/* Decorative vintage corner flourish */}
          <div className="flex justify-between items-center text-[#D99AA5] text-xs">
            <span>❦</span>
            <span className="font-serif-title italic text-[11px] text-[#641C2C]/70">Handmade with care</span>
            <span>❦</span>
          </div>

          {/* Handwritten message */}
          <div className="my-auto py-2">
            <p className="font-handwriting text-2xl sm:text-3xl text-[#641C2C] leading-snug whitespace-pre-line">
              {config.envelope.cardMessage}
            </p>
            <p className="font-script text-lg text-[#B51F35] mt-3">
              {config.senderSignature}
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={onOpenComplete}
            className="w-full py-2.5 px-4 bg-[#B51F35] hover:bg-[#641C2C] text-[#FFF9F0] rounded-md font-sans-clean font-medium text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{config.envelope.buttonText}</span>
            <Heart className="w-4 h-4 text-[#FFF9F0] fill-current group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Envelope Back Body */}
        <div 
          onClick={handleOpenEnvelope}
          className={`relative w-full h-[240px] sm:h-[260px] bg-[#F5EBDD] pencil-border rounded-lg shadow-lg cursor-pointer transition-transform duration-300 ${
            !isOpen ? "hover:scale-[1.01] active:scale-[0.99]" : ""
          } z-10 overflow-hidden flex items-center justify-center`}
        >
          {/* Subtle paper diagonal shadow folds */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left triangle */}
            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[190px] sm:border-l-[220px] border-l-[#ebdcc9] border-t-[130px] border-t-transparent opacity-60" />
            {/* Right triangle */}
            <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[190px] sm:border-r-[220px] border-r-[#ebdcc9] border-t-[130px] border-t-transparent opacity-60" />
            {/* Bottom triangle */}
            <div className="absolute bottom-0 left-0 right-0 h-0 border-b-[120px] sm:border-b-[130px] border-b-[#f0e3d2] border-x-[190px] sm:border-x-[220px] border-x-transparent" />
          </div>

          {/* Envelope Front Typography / Stamp */}
          <div className={`relative z-10 text-center px-6 transition-opacity duration-300 ${isOpen ? "opacity-20" : "opacity-100"}`}>
            <span className="inline-block p-2 rounded-full bg-[#FFF9F0] border border-[#D99AA5] shadow-xs mb-3 text-[#B51F35]">
              <Heart className="w-5 h-5 fill-current" />
            </span>
            <h1 className="font-handwriting text-2xl sm:text-3xl text-[#641C2C] tracking-wide">
              "{config.envelope.label}"
            </h1>
            <p className="font-serif-title italic text-xs text-[#292321]/70 mt-2">
              Tap the seal to open
            </p>
          </div>
        </div>

        {/* Envelope Top Flap (3D Folding Lid) */}
        <div
          onClick={handleOpenEnvelope}
          style={{
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
          }}
          className={`absolute top-0 left-0 right-0 h-[130px] sm:h-[140px] transition-transform duration-700 ease-in-out cursor-pointer z-30 ${
            isOpen ? "-rotate-x-180 pointer-events-none" : "rotate-x-0"
          }`}
        >
          {/* The Flap Polygon */}
          <div className="w-full h-full relative">
            <svg
              viewBox="0 0 440 140"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-md"
            >
              <polygon
                points="0,0 440,0 220,135"
                fill="#F5EBDD"
                stroke="#D99AA5"
                strokeWidth="1.5"
              />
            </svg>

            {/* Red Wax Seal Button */}
            {!isOpen && (
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 z-40">
                <div 
                  className="w-12 h-12 rounded-full bg-[#B51F35] border-2 border-[#641C2C] shadow-md flex items-center justify-center text-[#FFF9F0] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer animate-hint-pulse"
                  title="Open envelope"
                >
                  <Heart className="w-6 h-6 fill-current text-[#FFF9F0]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Helper text under envelope */}
      {!isOpen && (
        <button
          onClick={handleOpenEnvelope}
          className="mt-8 text-xs font-serif-title italic text-[#641C2C]/80 hover:text-[#B51F35] underline underline-offset-4 cursor-pointer transition-colors"
        >
          Click to unseal with love
        </button>
      )}
    </div>
  );
};
