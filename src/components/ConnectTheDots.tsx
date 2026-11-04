import React, { useState, useRef, useEffect } from "react";
import { RotateCcw, HelpCircle, Eye, Sparkles, Heart, CheckCircle2 } from "lucide-react";
import { DOT_PATTERN, DotPoint, createSmoothPath } from "../data/dotPattern";
import { LetterConfig } from "../data/letterContent";
import { romanticAudio } from "../utils/audioSynth";

interface ConnectTheDotsProps {
  config: LetterConfig;
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export const ConnectTheDots: React.FC<ConnectTheDotsProps> = ({ config, onComplete }) => {
  const [connectedCount, setConnectedCount] = useState<number>(1); // start at dot 1
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isAutoRevealingRef = useRef<boolean>(false);

  const totalDots = DOT_PATTERN.length;
  const currentTargetId = connectedCount < totalDots ? connectedCount + 1 : totalDots;
  const currentTargetDot = DOT_PATTERN.find((d) => d.id === currentTargetId);
  const lastConnectedDot = DOT_PATTERN[connectedCount - 1];

  // Connected points array
  const connectedPoints = DOT_PATTERN.slice(0, connectedCount);
  const smoothPathString = createSmoothPath(connectedPoints);

  // Trigger completion state
  useEffect(() => {
    if (connectedCount === totalDots && !isCompleted) {
      setIsCompleted(true);
      romanticAudio.playSuccessFanfare();
      // Burst celebratory particles at the heart
      const last = DOT_PATTERN[totalDots - 1];
      spawnParticles(last.x, last.y, 14);
    }
  }, [connectedCount, totalDots, isCompleted]);

  // Spawn visual feedback particles
  const spawnParticles = (x: number, y: number, count = 6) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const speed = 1.5 + Math.random() * 2.5;
      newParticles.push({
        id: Math.random() + Date.now(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 3 + Math.random() * 4,
        opacity: 1,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Particle physics loop
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.04,
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [particles.length]);

  // Handle dot interaction
  const handleDotClick = (dot: DotPoint) => {
    if (isCompleted || isAutoRevealingRef.current) return;

    if (dot.id === currentTargetId) {
      // Connect next point!
      romanticAudio.playDotChime(dot.id);
      spawnParticles(dot.x, dot.y);
      setConnectedCount(dot.id);
      setShowHint(false);
    } else if (dot.id <= connectedCount) {
      // Re-clicking already connected dot: small chime
      romanticAudio.playDotChime(dot.id);
    } else {
      // Tapped wrong dot: flash hint
      setShowHint(true);
      setTimeout(() => setShowHint(false), 2000);
    }
  };

  // Touch drag support
  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (isCompleted || isAutoRevealingRef.current || !svgRef.current) return;
    const touch = e.touches[0];
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 740 / rect.width;
    const scaleY = 380 / rect.height;
    const touchX = (touch.clientX - rect.left) * scaleX;
    const touchY = (touch.clientY - rect.top) * scaleY;

    if (currentTargetDot) {
      const dist = Math.hypot(touchX - currentTargetDot.x, touchY - currentTargetDot.y);
      if (dist < 32) {
        handleDotClick(currentTargetDot);
      }
    }
  };

  // Restart
  const handleRestart = () => {
    isAutoRevealingRef.current = false;
    setConnectedCount(1);
    setIsCompleted(false);
    setShowHint(false);
  };

  // Hint
  const handleToggleHint = () => {
    setShowHint((prev) => !prev);
  };

  // Auto Reveal
  const handleAutoReveal = () => {
    if (isCompleted || isAutoRevealingRef.current) return;
    isAutoRevealingRef.current = true;
    setShowHint(false);

    let nextCount = connectedCount;
    const interval = setInterval(() => {
      if (nextCount < totalDots) {
        nextCount += 1;
        setConnectedCount(nextCount);
        const current = DOT_PATTERN[nextCount - 1];
        romanticAudio.playDotChime(nextCount);
        spawnParticles(current.x, current.y, 4);
      } else {
        clearInterval(interval);
        isAutoRevealingRef.current = false;
      }
    }, 120);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 select-none">
      {/* Top Header & Instruction */}
      <div className="w-full max-w-3xl text-center mb-4 sm:mb-6">
        <h2 className="font-serif-title text-xl sm:text-3xl font-semibold text-[#641C2C] tracking-wide">
          {config.connectTheDots.heading}
        </h2>
        <p className="font-handwriting text-base sm:text-xl text-[#B51F35] mt-1">
          {config.connectTheDots.subheading}
        </p>
      </div>

      {/* Main Canvas Card */}
      <div className="w-full max-w-4xl bg-[#FFF9F0] double-pencil-border rounded-xl p-4 sm:p-6 md:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative postmark / stationery corner accent */}
        <div className="absolute top-3 right-4 text-[10px] sm:text-xs font-serif-title italic text-[#D99AA5] tracking-widest uppercase pointer-events-none">
          No. 01 — The Hidden Trace
        </div>

        {/* Surrounding Handwritten Words around the card */}
        <div className="absolute top-4 left-6 max-w-[140px] sm:max-w-[180px] pointer-events-none z-10">
          <p className="font-handwriting text-base sm:text-lg text-[#641C2C]/80 transform -rotate-3 leading-tight">
            "{config.connectTheDots.surroundingWords.topLeft}"
          </p>
        </div>

        <div className="absolute top-4 right-16 sm:right-24 max-w-[140px] sm:max-w-[180px] pointer-events-none z-10 text-right">
          <p className="font-handwriting text-base sm:text-lg text-[#641C2C]/80 transform rotate-2 leading-tight">
            "{config.connectTheDots.surroundingWords.topRight}"
          </p>
        </div>

        <div className="absolute bottom-4 left-6 max-w-[140px] sm:max-w-[180px] pointer-events-none z-10">
          <p className="font-handwriting text-base sm:text-lg text-[#641C2C]/80 transform rotate-1 leading-tight">
            "{config.connectTheDots.surroundingWords.bottomLeft}"
          </p>
        </div>

        <div className="absolute bottom-4 right-6 max-w-[140px] sm:max-w-[180px] pointer-events-none z-10 text-right">
          <p className="font-handwriting text-base sm:text-lg text-[#641C2C]/80 transform -rotate-2 leading-tight">
            "{config.connectTheDots.surroundingWords.bottomRight}"
          </p>
        </div>

        {/* SVG Connect The Dots Drawing Canvas */}
        <div className="w-full relative my-2 sm:my-4 flex items-center justify-center">
          <svg
            ref={svgRef}
            viewBox="0 0 740 380"
            className="w-full h-auto max-h-[420px] touch-none cursor-crosshair filter drop-shadow-xs"
            onTouchMove={handleTouchMove}
          >
            {/* Background subtle guide grid lines */}
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F3DCE0" strokeWidth="0.5" strokeDasharray="2,4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.4" />

            {/* Hint Guide Line from last connected dot to next target dot */}
            {showHint && lastConnectedDot && currentTargetDot && !isCompleted && (
              <line
                x1={lastConnectedDot.x}
                y1={lastConnectedDot.y}
                x2={currentTargetDot.x}
                y2={currentTargetDot.y}
                stroke="#D99AA5"
                strokeWidth="2"
                strokeDasharray="4,4"
                className="animate-pulse"
              />
            )}

            {/* The Connected Crimson Red Calligraphy Line */}
            {connectedPoints.length > 1 && (
              <path
                d={smoothPathString}
                fill="none"
                stroke="#B51F35"
                strokeWidth={isCompleted ? "4.5" : "3.5"}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isCompleted ? "transition-all duration-700 filter drop-shadow-[0_2px_4px_rgba(181,31,53,0.3)]" : ""}
              />
            )}

            {/* Burst Particles */}
            {particles.map((p) => (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.size}
                fill="#B51F35"
                opacity={p.opacity}
              />
            ))}

            {/* Render all dots */}
            {DOT_PATTERN.map((dot) => {
              const isConnected = dot.id <= connectedCount;
              const isNext = dot.id === currentTargetId && !isCompleted;

              return (
                <g
                  key={dot.id}
                  onClick={() => handleDotClick(dot)}
                  className="cursor-pointer group"
                >
                  {/* Invisible generous hit target for mobile fingers */}
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r="22"
                    fill="transparent"
                  />

                  {/* Pulsing ring around the current target dot */}
                  {isNext && (
                    <circle
                      cx={dot.x}
                      cy={dot.y}
                      r="14"
                      fill="none"
                      stroke="#B51F35"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                      className="animate-spin-slow opacity-80"
                    />
                  )}

                  {/* Dot circle */}
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r={isConnected ? (isCompleted ? "4.5" : "5") : isNext ? "6" : "4"}
                    fill={isConnected ? "#B51F35" : isNext ? "#641C2C" : "#292321"}
                    stroke="#FFF9F0"
                    strokeWidth="1.5"
                    className="transition-all duration-200"
                  />

                  {/* Dot Number Label (subtle, quiet) */}
                  {!isCompleted && (
                    <text
                      x={dot.x + 8}
                      y={dot.y - 6}
                      fontSize="10"
                      fontFamily="DM Sans, sans-serif"
                      fontWeight={isNext ? "bold" : "normal"}
                      fill={isNext ? "#B51F35" : "#292321"}
                      opacity={isNext ? 1 : 0.55}
                      pointerEvents="none"
                    >
                      {dot.id}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Lower Control Bar & Progress */}
        <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F3DCE0]">
          {/* Progress Indicator */}
          <div className="flex items-center gap-2 text-xs text-[#292321]/70 font-sans-clean">
            <span>Dot {connectedCount} of {totalDots}</span>
            <div className="w-24 sm:w-32 h-1.5 bg-[#F5EBDD] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B51F35] transition-all duration-300 rounded-full"
                style={{ width: `${(connectedCount / totalDots) * 100}%` }}
              />
            </div>
            {isCompleted && (
              <span className="flex items-center gap-1 text-[#B51F35] font-medium text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" /> Discovered
              </span>
            )}
          </div>

          {/* Interactive Utility Controls */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleToggleHint}
              disabled={isCompleted}
              className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors cursor-pointer ${
                showHint
                  ? "bg-[#B51F35] text-white"
                  : "bg-[#F5EBDD] hover:bg-[#F3DCE0] text-[#641C2C]"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
              title="Show guide to next dot"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Hint</span>
            </button>

            <button
              onClick={handleRestart}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#F5EBDD] hover:bg-[#F3DCE0] text-[#641C2C] rounded transition-colors cursor-pointer"
              title="Restart from dot 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>

            {!isCompleted && (
              <button
                onClick={handleAutoReveal}
                className="flex items-center gap-1 px-2.5 py-1 bg-[#F3DCE0] hover:bg-[#D99AA5] text-[#641C2C] rounded transition-colors cursor-pointer font-medium"
                title="Watch it connect automatically"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Reveal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Completion Banner & Next Step Button */}
      {isCompleted && (
        <div className="w-full max-w-xl mx-auto mt-6 text-center animate-fadeIn transition-all duration-500">
          <div className="p-4 bg-[#FFF9F0] border border-[#D99AA5] rounded-lg shadow-md mb-4 flex flex-col items-center">
            <Sparkles className="w-5 h-5 text-[#B51F35] mb-2 animate-bounce" />
            <p className="font-handwriting text-2xl sm:text-3xl text-[#641C2C] font-semibold leading-snug">
              "{config.connectTheDots.completionMessage}"
            </p>
            <p className="font-serif-title italic text-xs text-[#292321]/70 mt-1">
              The dots formed: I LOVE YOU ♡
            </p>
          </div>

          <button
            onClick={onComplete}
            className="py-3 px-8 bg-[#B51F35] hover:bg-[#641C2C] text-[#FFF9F0] rounded-lg font-sans-clean font-medium text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group"
          >
            <span>{config.connectTheDots.nextButtonText}</span>
            <Heart className="w-4 h-4 fill-current group-hover:scale-125 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
};
