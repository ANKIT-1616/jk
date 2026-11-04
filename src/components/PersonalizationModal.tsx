import React, { useState } from "react";
import { X, Save, RotateCcw, Copy, Check, Heart } from "lucide-react";
import { LetterConfig, defaultLetterConfig } from "../data/letterContent";

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: LetterConfig;
  onSaveConfig: (newConfig: LetterConfig) => void;
}

export const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<LetterConfig>(config);
  const [activeTab, setActiveTab] = useState<"basics" | "letter" | "song">("basics");
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData(defaultLetterConfig);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-[#FFF9F0] border-2 border-[#D99AA5] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#F5EBDD] border-b border-[#F3DCE0]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#B51F35] fill-current" />
            <h3 className="font-serif-title text-lg font-semibold text-[#641C2C]">
              Personalize Your Love Letter
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#641C2C] hover:bg-[#F3DCE0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-[#F3DCE0] bg-[#FFF9F0] px-4 pt-2 gap-2 text-xs font-sans-clean font-medium">
          <button
            onClick={() => setActiveTab("basics")}
            className={`px-3 py-1.5 rounded-t-md transition-colors cursor-pointer ${
              activeTab === "basics"
                ? "bg-[#F5EBDD] text-[#B51F35] font-semibold border-t border-x border-[#D99AA5]"
                : "text-[#292321]/70 hover:text-[#641C2C]"
            }`}
          >
            Names & Envelope
          </button>
          <button
            onClick={() => setActiveTab("letter")}
            className={`px-3 py-1.5 rounded-t-md transition-colors cursor-pointer ${
              activeTab === "letter"
                ? "bg-[#F5EBDD] text-[#B51F35] font-semibold border-t border-x border-[#D99AA5]"
                : "text-[#292321]/70 hover:text-[#641C2C]"
            }`}
          >
            Personal Letter
          </button>
          <button
            onClick={() => setActiveTab("song")}
            className={`px-3 py-1.5 rounded-t-md transition-colors cursor-pointer ${
              activeTab === "song"
                ? "bg-[#F5EBDD] text-[#B51F35] font-semibold border-t border-x border-[#D99AA5]"
                : "text-[#292321]/70 hover:text-[#641C2C]"
            }`}
          >
            Song & Details
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-sm font-sans-clean text-[#292321]">
          {activeTab === "basics" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Recipient's Name or Nickname
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                  placeholder="e.g. Sarah, My Love"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Sender Signature
                </label>
                <input
                  type="text"
                  value={formData.senderSignature}
                  onChange={(e) => setFormData({ ...formData, senderSignature: e.target.value })}
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                  placeholder="e.g. Yours, Always ♡"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Envelope Label (Screen 1)
                </label>
                <input
                  type="text"
                  value={formData.envelope.label}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      envelope: { ...formData.envelope, label: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Note Inside Envelope
                </label>
                <textarea
                  rows={3}
                  value={formData.envelope.cardMessage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      envelope: { ...formData.envelope, cardMessage: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                />
              </div>
            </div>
          )}

          {activeTab === "letter" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Letter Salutation
                </label>
                <input
                  type="text"
                  value={formData.letter.salutation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letter: { ...formData.letter, salutation: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Letter Body (one paragraph per line)
                </label>
                <textarea
                  rows={8}
                  value={formData.letter.paragraphs.join("\n\n")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letter: {
                        ...formData.letter,
                        paragraphs: e.target.value.split("\n\n").filter((p) => p.trim().length > 0),
                      },
                    })
                  }
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded font-handwriting text-lg focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                />
                <p className="text-xs text-[#292321]/60 mt-1">
                  Tip: Separate paragraphs with a blank line.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Signoff
                </label>
                <input
                  type="text"
                  value={formData.letter.signoff}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letter: { ...formData.letter, signoff: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                />
              </div>
            </div>
          )}

          {activeTab === "song" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Song Title
                </label>
                <input
                  type="text"
                  value={formData.music.songTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      music: { ...formData.music, songTitle: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Artist Name
                </label>
                <input
                  type="text"
                  value={formData.music.artist}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      music: { ...formData.music, artist: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#641C2C] mb-1">
                  Lyrics Snippet / Favorite Line
                </label>
                <input
                  type="text"
                  value={formData.music.lyricsSnippet}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      music: { ...formData.music, lyricsSnippet: e.target.value },
                    })
                  }
                  className="w-full p-2 bg-[#FFF9F0] border border-[#D99AA5] rounded focus:outline-hidden focus:ring-1 focus:ring-[#B51F35]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-[#F5EBDD] border-t border-[#F3DCE0]">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#641C2C] hover:bg-[#F3DCE0] rounded transition-colors cursor-pointer"
              title="Reset all fields to original text"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-1 px-3 py-1.5 text-xs text-[#641C2C] hover:bg-[#F3DCE0] rounded transition-colors cursor-pointer"
              title="Copy entire configuration as JSON to save to letterContent.ts"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied JSON!" : "Export JSON"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs text-[#292321] hover:bg-[#F3DCE0] rounded transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium bg-[#B51F35] hover:bg-[#641C2C] text-[#FFF9F0] rounded shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
