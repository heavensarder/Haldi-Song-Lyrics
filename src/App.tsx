import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Music, Sparkles } from "lucide-react";
import { SONGS } from "./songs";

export default function App() {
  const [selectedSongId, setSelectedSongId] = useState<string>(SONGS[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1); // Allows user to toggle text size for better sing-along legibility

  const currentSong = SONGS.find((s) => s.id === selectedSongId) || SONGS[0];

  const handleToggleFontSize = () => {
    setFontSizeMultiplier((prev) => (prev === 1 ? 1.2 : prev === 1.2 ? 1.4 : 1));
  };

  return (
    <div id="sing-lyrics-app" className="min-h-screen bg-[#07090e] text-slate-100 flex justify-center items-center font-anek p-4 select-none">
      {/* Dynamic Ambient Blur Backdrops reflecting the active song theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-indigo-500/10 rounded-full blur-[110px]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-rose-500/10 rounded-full blur-[110px]" />
      </div>

      {/* Clean Mobile Frame Container */}
      <div className="w-full max-w-md bg-[#0f121a] rounded-[28px] border border-slate-800/80 shadow-2xl relative overflow-hidden flex flex-col h-[85vh] max-h-[780px]">
        
        {/* Simple & Clean Header / Selector */}
        <header className="p-4 border-b border-slate-900 bg-[#121620]/95 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center justify-between gap-3">
            {/* Song Switcher Dropdown */}
            <div className="relative flex-1">
              <button
                id="song-selector-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-[#171c2a] hover:bg-[#1f2639] border border-slate-800/80 rounded-2xl text-left transition-all duration-200 cursor-pointer active:scale-98"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/15 to-rose-500/15 flex items-center justify-center border border-rose-500/20 shrink-0">
                    <Music className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="overflow-hidden">
                    <h2 className="font-extrabold text-sm text-white tracking-wide truncate">{currentSong.title}</h2>
                    <p className="text-xs text-slate-400 truncate">{currentSong.artist}</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown Options */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div
                      id="song-dropdown-menu"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 right-0 mt-2 bg-[#171c2a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-60 overflow-y-auto"
                    >
                      {SONGS.map((song) => {
                        const isSelected = song.id === selectedSongId;
                        return (
                          <button
                            key={song.id}
                            id={`dropdown-item-${song.id}`}
                            onClick={() => {
                              setSelectedSongId(song.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 border-b border-slate-800/30 transition-colors last:border-none flex items-center justify-between ${
                              isSelected ? "bg-rose-500/10 text-rose-300 font-bold" : "hover:bg-slate-800/30 text-slate-300"
                            }`}
                          >
                            <div>
                              <p className="text-sm font-semibold">{song.title}</p>
                              <p className="text-xs text-slate-500">{song.artist}</p>
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold px-1.5 py-0.5 rounded bg-slate-900">
                              {song.language.split(" ")[0]}
                            </span>
                          </button>
                        );
                      })}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Font Size Toggle for easy lyrics readability during singing */}
            <button
              id="size-toggle-btn"
              onClick={handleToggleFontSize}
              className="p-3 bg-[#171c2a] text-slate-400 hover:text-white hover:bg-[#1f2639] border border-slate-800/80 rounded-2xl transition-all cursor-pointer active:scale-95"
              title="A/A - Adjust Font Size"
            >
              <span className="text-xs font-bold font-mono tracking-tighter">
                {fontSizeMultiplier === 1 ? "A" : fontSizeMultiplier === 1.2 ? "A+" : "A++"}
              </span>
            </button>
          </div>
        </header>

        {/* Clean, Non-distractive Lyrics Body */}
        <div id="lyrics-scroll-area" className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scroll-smooth scrollbar-none">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSongId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-10 pb-8"
            >
              {currentSong.sections.map((section, sIdx) => {
                const isChorus = section.name.toLowerCase().includes("chorus");
                return (
                  <div 
                    key={sIdx} 
                    className={`space-y-5 transition-all ${
                      isChorus ? "border-l-2 border-rose-500/40 pl-4 py-1.5 bg-rose-500/[0.01]" : ""
                    }`}
                  >
                    {/* Minimal Section Divider indicator */}
                    <span className="text-[10px] font-extrabold tracking-widest uppercase opacity-35 text-slate-400 block">
                      {section.name}
                    </span>

                    {/* Lyric Lines strictly in chosen Anek font */}
                    <div className="space-y-4">
                      {section.lines.map((line, lIdx) => (
                        <p 
                          key={lIdx} 
                          className="font-medium tracking-wide text-white leading-relaxed text-pretty transition-all"
                          style={{ 
                            fontSize: `${fontSizeMultiplier * 1.25}rem`,
                            lineHeight: "1.65"
                          }}
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Static Simple Footer */}
        <footer className="py-3 px-4 text-center text-[10px] tracking-wide text-slate-500 border-t border-slate-900 bg-[#0a0d13] flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500/60" /> Live Karaoke Sing-Along View
          </span>
          <span className="font-semibold text-slate-400">Anek Font Active</span>
        </footer>

      </div>
    </div>
  );
}
