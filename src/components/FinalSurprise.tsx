import React, { useState, useEffect } from "react";
import { Heart, Sparkles, RotateCcw, BookOpen, Music, Share2, Check } from "lucide-react";
import { DOT_PATTERN, createSmoothPath } from "../data/dotPattern";
import { LetterConfig } from "../data/letterContent";

interface FinalSurpriseProps {
  config: LetterConfig;
  onGoToDots: () => void;
  onGoToLetter: () => void;
  onGoToMusic: () => void;
}

interface FloatingPetal {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  rotation: number;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({
  config,
  onGoToDots,
  onGoToLetter,
  onGoToMusic,
}) => {
  const [petals, setPetals] = useState<FloatingPetal[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate full completed path
  const completedPath = createSmoothPath(DOT_PATTERN);

  // Gentle ambient floating rose petals
  useEffect(() => {
    const initialPetals: FloatingPetal[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 10 + Math.random() * 14,
      opacity: 0.2 + Math.random() * 0.35,
      speed: 0.15 + Math.random() * 0.3,
      rotation: Math.random() * 360,
    }));
    setPetals(initialPetals);

    const interval = setInterval(() => {
      setPetals((prev) =>
        prev.map((p) => {
          let nextY = p.y + p.speed;
          if (nextY > 105) nextY = -5;
          return {
            ...p,
            y: nextY,
            rotation: p.rotation + 0.3,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    const textToCopy = `"${config.finalSurprise.headline} ${config.finalSurprise.subheadline}" — ${config.finalSurprise.signature}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-10 select-none overflow-hidden">
      {/* Ambient Floating Soft Rose Petals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            style={{
              left: `${petal.x}%`,
              top: `${petal.y}%`,
              opacity: petal.opacity,
              transform: `rotate(${petal.rotation}deg)`,
            }}
            className="absolute transition-transform duration-100 ease-linear pointer-events-none text-[#D99AA5]"
          >
            <Heart style={{ width: petal.size, height: petal.size }} className="fill-current" />
          </div>
        ))}
      </div>

      {/* Main Keepsake Frame Card */}
      <div className="relative z-10 w-full max-w-2xl bg-[#FFF9F0] double-pencil-border rounded-2xl p-6 sm:p-10 shadow-2xl text-center">
        {/* Decorative Header ribbon */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5EBDD] border border-[#D99AA5]/60 rounded-full text-xs font-serif-title italic text-[#641C2C] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#B51F35]" />
          <span>{config.finalSurprise.keepsakeTitle}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#B51F35]" />
        </div>

        {/* The Completed "I LOVE YOU" Artwork Keepsake */}
        <div className="w-full bg-[#FFF9F0] pencil-border rounded-xl p-3 sm:p-4 my-4 shadow-sm relative">
          <div className="text-[10px] font-mono tracking-widest text-[#D99AA5] uppercase mb-1">
            Connected Trace · Handcrafted
          </div>

          <svg
            viewBox="0 0 740 380"
            className="w-full h-auto max-h-[220px] sm:max-h-[260px] filter drop-shadow-[0_2px_8px_rgba(181,31,53,0.35)]"
          >
            {/* The completed red calligraphy stroke */}
            <path
              d={completedPath}
              fill="none"
              stroke="#B51F35"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Glowing dot pins */}
            {DOT_PATTERN.map((d) => (
              <circle
                key={d.id}
                cx={d.x}
                cy={d.y}
                r="3.5"
                fill="#641C2C"
                stroke="#FFF9F0"
                strokeWidth="1.5"
              />
            ))}
          </svg>

          {/* Hand-drawn red heart seal in corner */}
          <div className="absolute bottom-3 right-4 flex items-center gap-1 text-xs font-handwriting text-[#B51F35]">
            <Heart className="w-4 h-4 fill-current inline" />
            <span>Forever</span>
          </div>
        </div>

        {/* The Heartfelt Final Message */}
        <div className="my-6 space-y-2">
          <h2 className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-[#641C2C] leading-snug">
            "{config.finalSurprise.headline}"
          </h2>
          <p className="font-script text-2xl sm:text-3xl text-[#B51F35] font-semibold">
            "{config.finalSurprise.subheadline}"
          </p>
        </div>

        {/* Handwritten Closing Signature */}
        <div className="pt-4 border-t border-[#F3DCE0] flex flex-col items-center">
          <p className="font-handwriting text-xl sm:text-2xl text-[#292321]">
            {config.finalSurprise.signature}
          </p>
          <p className="font-script text-lg text-[#641C2C] mt-0.5">
            {config.senderSignature}
          </p>
        </div>

        {/* Action Buttons to Revisit Journey */}
        <div className="mt-8 pt-6 border-t border-[#F3DCE0]/80 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={onGoToDots}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F5EBDD] hover:bg-[#F3DCE0] text-[#641C2C] rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Revisit Dots</span>
          </button>

          <button
            onClick={onGoToLetter}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F5EBDD] hover:bg-[#F3DCE0] text-[#641C2C] rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Letter Again</span>
          </button>

          <button
            onClick={onGoToMusic}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F5EBDD] hover:bg-[#F3DCE0] text-[#641C2C] rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            <Music className="w-3.5 h-3.5" />
            <span>Play Song</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#B51F35] hover:bg-[#641C2C] text-[#FFF9F0] rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied to Clipboard!" : "Copy Keepsake"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
