import React from "react";

interface PaperBackgroundProps {
  children: React.ReactNode;
}

export const PaperBackground: React.FC<PaperBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#FFF9F0] text-[#292321] overflow-x-hidden paper-texture">
      {/* Subtle organic paper grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-40 paper-grain mix-blend-multiply z-0" 
        aria-hidden="true" 
      />

      {/* Soft romantic vintage vignette */}
      <div 
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(217,154,165,0.12)_100%)] z-0" 
        aria-hidden="true" 
      />

      {/* Main content layer */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};
