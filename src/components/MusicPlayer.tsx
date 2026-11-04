import React, { useState, useEffect } from "react";
import { Play, Pause, Disc, ExternalLink, Heart, Music2, Sparkles } from "lucide-react";
import { LetterConfig } from "../data/letterContent";
import { romanticAudio } from "../utils/audioSynth";

interface MusicPlayerProps {
  config: LetterConfig;
  onNext: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ config, onNext }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioSource, setAudioSource] = useState<"synth" | "youtube">("synth");
  const [currentNoteIdx, setCurrentNoteIdx] = useState<number>(0);

  // Stop music when leaving component
  useEffect(() => {
    return () => {
      romanticAudio.stopMusicBox();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      romanticAudio.stopMusicBox();
      setIsPlaying(false);
    } else {
      if (audioSource === "synth") {
        romanticAudio.startMusicBox((idx) => {
          setCurrentNoteIdx(idx);
        });
      }
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 select-none">
      {/* Intro Heading */}
      <div className="w-full max-w-xl text-center mb-6">
        <h2 className="font-serif-title italic text-xl sm:text-3xl text-[#641C2C] leading-snug">
          "{config.music.quote}"
        </h2>
        <p className="font-handwriting text-base sm:text-xl text-[#B51F35] mt-1">
          A song that always makes me think of you
        </p>
      </div>

      {/* Vintage Vinyl Turntable Card */}
      <div className="w-full max-w-xl bg-[#FFF9F0] double-pencil-border rounded-xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col items-center">
        {/* Subtle decorative postmark top right */}
        <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-serif-title italic text-[#D99AA5]">
          <Music2 className="w-3.5 h-3.5" />
          <span>Special Recording · {config.music.year}</span>
        </div>

        {/* Vintage Turntable Deck Area */}
        <div className="relative w-full max-w-[320px] sm:max-w-[360px] h-[220px] sm:h-[240px] bg-[#F5EBDD] pencil-border rounded-xl p-4 flex items-center justify-center my-3 shadow-inner">
          {/* Vinyl Record */}
          <div
            className={`relative w-44 h-44 sm:w-48 sm:h-48 rounded-full bg-[#1A1817] shadow-xl border-4 border-[#292321] flex items-center justify-center transition-all duration-300 ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
          >
            {/* Vinyl Grooves concentric rings */}
            <div className="absolute inset-2 rounded-full border border-neutral-700/40 pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-neutral-700/30 pointer-events-none" />
            <div className="absolute inset-7 rounded-full border border-neutral-700/40 pointer-events-none" />
            <div className="absolute inset-10 rounded-full border border-neutral-700/25 pointer-events-none" />

            {/* Vintage Center Label */}
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#641C2C] border-2 border-[#D99AA5] flex flex-col items-center justify-center text-center p-1 text-[#FFF9F0] shadow-md z-10">
              <span className="text-[7px] uppercase tracking-widest font-sans-clean font-semibold text-[#D99AA5]">
                RCA Classic
              </span>
              <span className="text-[9px] font-serif-title font-bold leading-tight mt-0.5 line-clamp-1">
                {config.music.songTitle}
              </span>
              <span className="text-[8px] font-handwriting text-[#F3DCE0]">
                {config.music.artist}
              </span>
              {/* Spindle hole */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#1A1817] border border-[#D99AA5] mt-0.5" />
            </div>
          </div>

          {/* Turntable Tonearm */}
          <div
            style={{
              transformOrigin: "top right",
              transform: isPlaying ? "rotate(24deg)" : "rotate(0deg)",
            }}
            className="absolute top-4 right-5 w-20 sm:w-24 h-32 transition-transform duration-700 ease-in-out pointer-events-none z-20"
          >
            {/* Pivot base */}
            <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-[#D99AA5] border-2 border-[#641C2C] shadow-xs" />
            {/* Arm rod */}
            <div className="absolute top-3 right-2.5 w-1 h-24 bg-[#641C2C] rounded-full" />
            {/* Needle cartridge */}
            <div className="absolute bottom-2 right-1 w-4 h-6 bg-[#B51F35] rounded-xs transform -rotate-12 shadow-xs" />
          </div>

          {/* Floating musical note when playing */}
          {isPlaying && (
            <div className="absolute top-6 left-6 text-[#B51F35] animate-gentle-float text-lg">
              ♪
            </div>
          )}
        </div>

        {/* Song Info & Lyrics Snippet */}
        <div className="text-center mt-3">
          <h3 className="font-serif-title font-semibold text-lg sm:text-2xl text-[#641C2C]">
            {config.music.songTitle}
          </h3>
          <p className="font-sans-clean text-xs sm:text-sm text-[#292321]/70 font-medium">
            {config.music.artist} · {config.music.year}
          </p>

          <p className="font-handwriting text-lg sm:text-xl text-[#B51F35] mt-3 italic max-w-md mx-auto">
            "{config.music.lyricsSnippet}"
          </p>
        </div>

        {/* Audio Mode Selectors & Controls */}
        <div className="w-full mt-5 flex flex-col items-center gap-3">
          {/* Main Play / Pause Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="py-2.5 px-6 bg-[#B51F35] hover:bg-[#641C2C] text-[#FFF9F0] rounded-full font-sans-clean font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2 group"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Music</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>Play "Can't Help Falling in Love"</span>
                </>
              )}
            </button>
          </div>

          {/* Mode switch: Music Box vs YouTube Embed */}
          <div className="flex items-center gap-2 text-xs font-sans-clean text-[#292321]/70 mt-1">
            <button
              onClick={() => {
                if (isPlaying) romanticAudio.stopMusicBox();
                setIsPlaying(false);
                setAudioSource("synth");
              }}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                audioSource === "synth"
                  ? "bg-[#641C2C] text-[#FFF9F0] font-semibold"
                  : "bg-[#F5EBDD] hover:bg-[#F3DCE0]"
              }`}
            >
              Music Box Chimes
            </button>
            <button
              onClick={() => {
                if (isPlaying) romanticAudio.stopMusicBox();
                setIsPlaying(false);
                setAudioSource("youtube");
              }}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                audioSource === "youtube"
                  ? "bg-[#641C2C] text-[#FFF9F0] font-semibold"
                  : "bg-[#F5EBDD] hover:bg-[#F3DCE0]"
              }`}
            >
              Official YouTube Audio
            </button>
          </div>

          {/* YouTube Video Player Embed when selected */}
          {audioSource === "youtube" && (
            <div className="w-full max-w-sm mt-2 rounded-lg overflow-hidden border border-[#D99AA5] shadow-sm">
              <iframe
                width="100%"
                height="160"
                src={`https://www.youtube-nocookie.com/embed/${config.music.youtubeVideoId}?enablejsapi=1&rel=0`}
                title="Can't Help Falling in Love by Elvis Presley"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
              />
            </div>
          )}

          {/* External Links */}
          <div className="flex items-center gap-4 text-xs font-serif-title italic text-[#641C2C] mt-2">
            <a
              href={config.music.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#B51F35] underline underline-offset-2"
            >
              <span>Listen on Spotify</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>·</span>
            <a
              href={config.music.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#B51F35] underline underline-offset-2"
            >
              <span>Listen on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Transition Button to Personal Letter */}
        <div className="mt-8 pt-4 border-t border-[#F3DCE0] w-full flex justify-center">
          <button
            onClick={onNext}
            className="py-3 px-8 bg-[#641C2C] hover:bg-[#B51F35] text-[#FFF9F0] rounded-lg font-sans-clean font-medium text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group"
          >
            <span>{config.music.buttonText}</span>
            <Heart className="w-4 h-4 text-[#FFF9F0] group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
