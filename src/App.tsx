import { useState, useEffect } from "react";
import { PaperBackground } from "./components/PaperBackground";
import { JourneyHeader } from "./components/JourneyHeader";
import { Envelope } from "./components/Envelope";
import { ConnectTheDots } from "./components/ConnectTheDots";
import { LoveMessage } from "./components/LoveMessage";
import { MusicPlayer } from "./components/MusicPlayer";
import { LoveLetter } from "./components/LoveLetter";
import { FinalSurprise } from "./components/FinalSurprise";
import { PersonalizationModal } from "./components/PersonalizationModal";
import { LetterConfig, defaultLetterConfig } from "./data/letterContent";

const STORAGE_KEY = "romantic_love_letter_config_v1";

export default function App() {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [highestStageReached, setHighestStageReached] = useState<number>(1);
  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState<boolean>(false);
  const [config, setConfig] = useState<LetterConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return defaultLetterConfig;
  });

  // Track highest stage reached to unlock breadcrumb navigation
  const advanceToStage = (stage: number) => {
    setCurrentStage(stage);
    if (stage > highestStageReached) {
      setHighestStageReached(stage);
    }
    // Smooth scroll to top of screen on stage change
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveConfig = (newConfig: LetterConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // ignore
    }
  };

  const handleRestartAll = () => {
    setCurrentStage(1);
    setHighestStageReached(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PaperBackground>
      {/* Top Navigation & Journey Bar */}
      <JourneyHeader
        currentStage={currentStage}
        highestStageReached={highestStageReached}
        onSelectStage={(stage) => setCurrentStage(stage)}
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
        onRestartAll={handleRestartAll}
      />

      {/* Dynamic Screen Stage */}
      <main className="w-full flex-1 flex flex-col items-center justify-center py-6 sm:py-8 px-3 sm:px-6">
        {currentStage === 1 && (
          <Envelope
            config={config}
            onOpenComplete={() => advanceToStage(2)}
          />
        )}

        {currentStage === 2 && (
          <ConnectTheDots
            config={config}
            onComplete={() => advanceToStage(3)}
          />
        )}

        {currentStage === 3 && (
          <LoveMessage
            config={config}
            onNext={() => advanceToStage(4)}
          />
        )}

        {currentStage === 4 && (
          <MusicPlayer
            config={config}
            onNext={() => advanceToStage(5)}
          />
        )}

        {currentStage === 5 && (
          <LoveLetter
            config={config}
            onNext={() => advanceToStage(6)}
          />
        )}

        {currentStage === 6 && (
          <FinalSurprise
            config={config}
            onGoToDots={() => advanceToStage(2)}
            onGoToLetter={() => advanceToStage(5)}
            onGoToMusic={() => advanceToStage(4)}
          />
        )}
      </main>

      {/* Quiet Vintage Footer */}
      <footer className="w-full py-4 px-6 text-center text-xs font-serif-title italic text-[#641C2C]/70 border-t border-[#F3DCE0]/60">
        <p>"{config.centralMotto}"</p>
        <p className="font-handwriting text-[#B51F35] text-sm mt-0.5">
          Handcrafted with genuine affection · {config.recipientName} & You
        </p>
      </footer>

      {/* Personalization Modal */}
      <PersonalizationModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />
    </PaperBackground>
  );
}
