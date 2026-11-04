import React from "react";
import { Heart, Sparkles, Send } from "lucide-react";
import { LetterConfig } from "../data/letterContent";

interface LoveLetterProps {
  config: LetterConfig;
  onNext: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ config, onNext }) => {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-3 sm:p-6 md:p-10 select-none">
      {/* Stationery Paper Card */}
      <article className="w-full max-w-2xl bg-[#FFF9F0] double-pencil-border rounded-xl p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden my-4">
        {/* Top Header with Vintage Postage Stamp & Postmark */}
        <div className="flex justify-between items-start border-b border-[#F3DCE0] pb-4 mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-serif-title italic uppercase tracking-widest text-[#D99AA5] block">
              Personal Correspondence
            </span>
            <span className="text-xs sm:text-sm font-handwriting text-[#641C2C]/70">
              {config.dateText || "A quiet moment for you"}
            </span>
          </div>

          {/* Vintage Stamp Graphic */}
          <div className="flex items-center gap-2">
            {/* Postal cancellation wave lines */}
            <div className="hidden xs:flex flex-col gap-1 opacity-40">
              <div className="w-10 h-0.5 bg-[#641C2C]" />
              <div className="w-12 h-0.5 bg-[#641C2C]" />
              <div className="w-10 h-0.5 bg-[#641C2C]" />
            </div>

            {/* Stamp box */}
            <div className="w-12 h-14 sm:w-14 sm:h-16 bg-[#F5EBDD] border-2 border-dashed border-[#D99AA5] rounded-xs p-1 flex flex-col items-center justify-between shadow-xs">
              <span className="text-[7px] uppercase font-sans-clean text-[#641C2C] font-bold">AIR MAIL</span>
              <Heart className="w-5 h-5 text-[#B51F35] fill-current" />
              <span className="text-[7px] text-[#641C2C]/70 font-mono">0.00¢</span>
            </div>
          </div>
        </div>

        {/* Salutation */}
        <div className="mb-6">
          <h2 className="font-handwriting text-3xl sm:text-4xl text-[#641C2C] font-semibold tracking-wide">
            {config.letter.salutation}
          </h2>
        </div>

        {/* Letter Body Paragraphs */}
        <div className="space-y-4 sm:space-y-5">
          {config.letter.paragraphs.map((para, index) => (
            <p
              key={index}
              className={`font-handwriting text-xl sm:text-2xl md:text-[26px] text-[#292321] leading-relaxed tracking-wide ${
                para.trim().toLowerCase() === "i love you."
                  ? "text-[#B51F35] font-bold text-2xl sm:text-3xl my-3"
                  : ""
              }`}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Signoff */}
        <div className="mt-8 sm:mt-10 pt-4 border-t border-[#F3DCE0]/60 flex flex-col items-end">
          <p className="font-script text-2xl sm:text-3xl text-[#641C2C]">
            {config.letter.signoff}
          </p>
          <p className="font-handwriting text-lg sm:text-xl text-[#B51F35] mt-1">
            {config.senderSignature}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8 sm:mt-10 pt-4 flex justify-center">
          <button
            onClick={onNext}
            className="py-3 px-8 bg-[#B51F35] hover:bg-[#641C2C] text-[#FFF9F0] rounded-lg font-sans-clean font-medium text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group"
          >
            <span>{config.letter.buttonText}</span>
            <Heart className="w-4 h-4 fill-current group-hover:scale-125 transition-transform" />
          </button>
        </div>

        {/* Bottom subtle watermark quotation */}
        <div className="mt-6 text-center">
          <p className="font-serif-title italic text-[11px] text-[#D99AA5]">
            "{config.centralMotto}"
          </p>
        </div>
      </article>
    </div>
  );
};
