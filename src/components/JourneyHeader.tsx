import React from "react";
import { Volume2, VolumeX, Edit3, RotateCcw } from "lucide-react";
import { romanticAudio } from "../utils/audioSynth";

interface JourneyHeaderProps {
  currentStage: number;
  highestStageReached: number;
  onSelectStage: (stage: number) => void;
  onOpenPersonalize: () => void;
  onRestartAll: () => void;
}

const STAGES = [
  { id: 1, label: "The Envelope" },
  { id: 2, label: "The Dots" },
  { id: 3, label: "A Little Thought" },
  { id: 4, label: "The Song" },
  { id: 5, label: "The Letter" },
  { id: 6, label: "Keepsake" },
];

export const JourneyHeader: React.FC<JourneyHeaderProps> = ({
  currentStage,
  highestStageReached,
  onSelectStage,
  onOpenPersonalize,
  onRestartAll,
}) => {
  const [muted, setMuted] = React.useState(romanticAudio.getMuted());

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    romanticAudio.setMuted(next);
  };

  return (
    <header className="w-full pt-4 pb-2 px-4 md:px-8 border-b border-[#F3DCE0]/80 bg-[#FFF9F0]/80 backdrop-blur-xs sticky top-0 z-40 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand title */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectStage(1)}
            className="text-left group cursor-pointer focus-visible:outline-hidden"
            title="Return to envelope"
          >
            <span className="font-serif-title text-base sm:text-lg font-semibold tracking-wide text-[#641C2C] group-hover:text-[#B51F35] transition-colors">
              Something I Made For You
            </span>
            <span className="block text-[11px] font-handwriting text-[#D99AA5] -mt-1">
              a handwritten digital letter
            </span>
          </button>
        </div>

        {/* Center: Stage dots */}
        <nav 
          aria-label="Story stages" 
          className="hidden sm:flex items-center gap-1.5 md:gap-3"
        >
          {STAGES.map((stage) => {
            const isCurrent = currentStage === stage.id;
            const isUnlocked = stage.id <= highestStageReached;

            return (
              <button
                key={stage.id}
                disabled={!isUnlocked}
                onClick={() => onSelectStage(stage.id)}
                className={`text-xs px-2 py-1 rounded transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? "text-[#B51F35] font-semibold bg-[#F3DCE0]/60 underline underline-offset-4 decoration-[#D99AA5]"
                    : isUnlocked
                    ? "text-[#292321]/70 hover:text-[#641C2C] hover:bg-[#F3DCE0]/30"
                    : "text-[#292321]/30 cursor-not-allowed"
                }`}
                title={isUnlocked ? `Go to ${stage.label}` : "Complete earlier steps to unlock"}
              >
                <span className="font-sans-clean">{stage.id}. {stage.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right actions: Audio toggle, Personalize, Restart */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleMute}
            className="p-1.5 sm:p-2 rounded-full text-[#641C2C] hover:bg-[#F3DCE0] hover:text-[#B51F35] transition-colors cursor-pointer"
            title={muted ? "Unmute sounds" : "Mute sounds"}
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
          >
            {muted ? <VolumeX className="w-4 h-4 text-[#D99AA5]" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onRestartAll}
            className="p-1.5 sm:p-2 rounded-full text-[#641C2C] hover:bg-[#F3DCE0] hover:text-[#B51F35] transition-colors cursor-pointer"
            title="Start from beginning"
            aria-label="Start from beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenPersonalize}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#641C2C] bg-[#F5EBDD] hover:bg-[#F3DCE0] border border-[#D99AA5]/60 rounded-md transition-colors cursor-pointer"
            title="Personalize text and name"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#B51F35]" />
            <span className="hidden xs:inline">Edit Letter</span>
          </button>
        </div>
      </div>
    </header>
  );
};
