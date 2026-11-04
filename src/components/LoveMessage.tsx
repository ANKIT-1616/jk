import React, { useState, useEffect } from "react";
import { Heart, Music, Sparkles } from "lucide-react";
import { LetterConfig } from "../data/letterContent";

interface LoveMessageProps {
  config: LetterConfig;
  onNext: () => void;
}

export const LoveMessage: React.FC<LoveMessageProps> = ({ config, onNext }) => {
  const [showSecondPart, setShowSecondPart] = useState<boolean>(false);

  useEffect(() => {
    // Elegant brief pause before revealing the main romantic thought
    const timer = setTimeout(() => {
      setShowSecondPart(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      <div className="w-full max-w-xl bg-[#FFF9F0] double-pencil-border rounded-xl p-6 sm:p-10 md:p-12 shadow-xl text-center relative overflow-hidden transition-all duration-700">
        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 text-[#D99AA5] text-sm">
          <span>❦</span>
        </div>
        <div className="absolute top-4 right-4 text-[#D99AA5] text-sm">
          <span>❦</span>
        </div>

        {/* Small floating hearts decoration */}
        <div className="flex justify-center items-center gap-3 mb-6 text-[#D99AA5]">
          <Sparkles className="w-4 h-4 opacity-70" />
          <Heart className="w-5 h-5 fill-[#F3DCE0] text-[#B51F35]" />
          <Sparkles className="w-4 h-4 opacity-70" />
        </div>

        {/* First thought */}
        <p className="font-serif-title italic text-lg sm:text-2xl text-[#641C2C]/80 leading-relaxed transition-all duration-700">
          "{config.littleMessage.heading}"
        </p>

        {/* Second thought reveal with handwritten typography */}
        <div
          className={`mt-6 sm:mt-8 transition-all duration-1000 transform ${
            showSecondPart
              ? "opacity-100 translate-y-0 filter blur-0"
              : "opacity-0 translate-y-4 filter blur-xs"
          }`}
        >
          <div className="py-2 px-4 sm:px-6 border-y border-[#F3DCE0] my-4 inline-block">
            <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#B51F35] font-semibold leading-relaxed">
              {config.littleMessage.revealedText}
            </p>
          </div>

          {/* Sincere romantic quote */}
          <p className="font-script text-lg sm:text-xl text-[#641C2C] mt-4">
            Forever & truly, {config.recipientName}
          </p>
        </div>

        {/* Button to proceed to the song */}
        <div
          className={`mt-8 sm:mt-10 transition-all duration-700 ${
            showSecondPart ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <button
            onClick={onNext}
            className="py-3 px-8 bg-[#B51F35] hover:bg-[#641C2C] text-[#FFF9F0] rounded-lg font-sans-clean font-medium text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group"
          >
            <span>{config.littleMessage.buttonText}</span>
            <Music className="w-4 h-4 text-[#FFF9F0] group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Bottom flourish */}
        <div className="absolute bottom-3 left-0 right-0 text-center text-[#D99AA5] text-xs font-serif-title italic">
          Chapter Two · Words from the heart
        </div>
      </div>
    </div>
  );
};
