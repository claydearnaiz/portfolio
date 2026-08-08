"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useMicrocosmStore,
  MicrocosmBiome,
  MicrocosmWeather,
  MicrocosmSpecies,
  MicrocosmObjectType,
  MicrocosmTool,
} from "../store/useMicrocosmStore";
import { microcosmAudio } from "../utils/microcosmAudio";

interface MicrocosmHUDProps {
  onExit: () => void;
}

const ALL_FISH_SPECIES: MicrocosmSpecies[] = [
  "Clownfish",
  "Blue Tang",
  "Yellow Tang",
  "Betta",
  "Anglerfish",
  "Lionfish",
  "Goldfish",
  "Koi",
  "Puffer",
  "Shark",
  "Swordfish",
  "Blobfish",
  "Mandarin Fish",
  "Piranha",
  "Moorish Idol",
  "Butterfly Fish",
  "Royal Gramma",
  "Tetra",
  "Sunfish",
  "Blue Goldfish",
  "Black Lion Fish",
  "Coral Grouper",
  "Cowfish",
  "Flatfish",
  "Flower Horn",
  "Goblin Shark",
  "Humphead",
  "Parrot Fish",
  "Red Snapper",
  "Tuna",
  "Turbot",
  "Zebra Clown Fish",
];

export const MicrocosmHUD: React.FC<MicrocosmHUDProps> = ({ onExit }) => {
  const activeTool = useMicrocosmStore((s) => s.activeTool);
  const setActiveTool = useMicrocosmStore((s) => s.setActiveTool);
  const selectedCreatureId = useMicrocosmStore((s) => s.selectedCreatureId);
  const creatures = useMicrocosmStore((s) => s.creatures);
  const setSelectedCreatureId = useMicrocosmStore((s) => s.setSelectedCreatureId);
  const discoveries = useMicrocosmStore((s) => s.discoveries);
  const isDay = useMicrocosmStore((s) => s.isDay);
  const timeOfDay = useMicrocosmStore((s) => s.timeOfDay);
  const dayCount = useMicrocosmStore((s) => s.dayCount);
  const stardust = useMicrocosmStore((s) => s.stardust);
  const buyShopItem = useMicrocosmStore((s) => s.buyShopItem);
  const spawnFish = useMicrocosmStore((s) => s.spawnFish);
  const spawnObject = useMicrocosmStore((s) => s.spawnObject);
  const biome = useMicrocosmStore((s) => s.biome);
  const setBiome = useMicrocosmStore((s) => s.setBiome);
  const weather = useMicrocosmStore((s) => s.weather);
  const triggerWeather = useMicrocosmStore((s) => s.triggerWeather);

  const [isMuted, setIsMuted] = useState(microcosmAudio.getMuted());
  const [showJournal, setShowJournal] = useState(false);
  const [showEventsMenu, setShowEventsMenu] = useState(false);
  const [showBiomeMenu, setShowBiomeMenu] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [shopTab, setShopTab] = useState<"dna" | "decor" | "potions">("dna");
  const [isIdle, setIsIdle] = useState(false);

  const selectedCreature = creatures.find((c) => c.id === selectedCreatureId);

  // Auto-dim HUD on idle (4s inactivity)
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 4000);
    };

    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("click", resetIdle);
    resetIdle();

    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("click", resetIdle);
      clearTimeout(idleTimer);
    };
  }, []);

  const tools: { id: MicrocosmTool; symbol: string; label: string; desc: string }[] = [
    { id: "move", symbol: "⦿", label: "OBSERVE", desc: "Rotate view & inspect" },
    { id: "laser", symbol: "✦", label: "BEACON", desc: "Guide creatures with light" },
    { id: "shockwave", symbol: "≋", label: "RIPPLE", desc: "Emit physical energy wave" },
    { id: "plant", symbol: "⎈", label: "SEAWEED", desc: "Plant flora on seabed" },
    { id: "rock", symbol: "⬡", label: "ROCK", desc: "Place rock on seabed" },
    { id: "fish", symbol: "Ͽ", label: "CREATURE", desc: "Spawn random GLB fish" },
    { id: "food", symbol: "◈", label: "NUTRIENT", desc: "Drop food particles" },
    { id: "elixir", symbol: "☣", label: "MUTAGEN", desc: "Induce rapid mutation" },
  ];

  const biomes: MicrocosmBiome[] = ["Deep Abyssal", "Cosmic Nebula", "Hydrothermal Vent", "Emerald Reef"];

  const handleToggleMute = () => {
    const muted = microcosmAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectTool = (tool: MicrocosmTool) => {
    setActiveTool(tool);
    microcosmAudio.playBubblePop();
  };

  const handleBuyDNA = (species: MicrocosmSpecies, cost: number) => {
    buyShopItem(cost, () => {
      spawnFish(undefined, species);
    });
  };

  const handleBuyDecor = (type: MicrocosmObjectType, cost: number) => {
    buyShopItem(cost, () => {
      const rx = (Math.random() - 0.5) * 2.2;
      const rz = (Math.random() - 0.5) * 2.2;
      spawnObject(type, [rx, -1.4, rz]);
    });
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none select-none z-20 transition-opacity duration-700 ${
        isIdle ? "opacity-35 hover:opacity-100" : "opacity-100"
      }`}
    >
      {/* ================= UNIFIED RESPONSIVE TOP BAR ================= */}
      <div className="absolute top-4 left-4 right-4 pointer-events-auto flex items-center justify-between gap-2 font-mono text-xs text-white">
        {/* Left Status Pill */}
        <div className="bg-[#030612]/90 border border-emerald-500/30 rounded-2xl px-3 py-2 shadow-2xl backdrop-blur-2xl flex items-center gap-2.5 min-h-[44px]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden">
            <span className="font-bold text-[11px]">DAY {dayCount.toString().padStart(2, "0")}</span>
            <span className="text-neutral-500 text-[10px]">•</span>
            <span className="text-amber-300 font-bold text-[10px]">✨ {Math.floor(stardust)}</span>
            <span className="text-neutral-500 text-[10px] hidden sm:inline">•</span>
            <span className="text-neutral-300 text-[10px] hidden sm:inline">{creatures.length} LIFEFORMS</span>
          </div>
        </div>

        {/* Right Utility Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          <button
            type="button"
            onClick={() => setShowShop(true)}
            className="px-3 py-2 rounded-xl bg-[#030612]/90 border border-amber-500/40 text-amber-300 hover:border-amber-400 transition-all cursor-pointer backdrop-blur-2xl font-bold min-h-[44px] shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            [ SHOP ]
          </button>

          {/* Biome Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowBiomeMenu(!showBiomeMenu)}
              className="px-2.5 py-2 rounded-xl bg-[#030612]/90 border border-neutral-800 text-neutral-300 hover:text-white hover:border-sky-400 transition-all cursor-pointer backdrop-blur-2xl min-h-[44px] focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              [ BIOME ]
            </button>
            <AnimatePresence>
              {showBiomeMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-[#030612]/95 border border-sky-500/40 rounded-2xl p-2 space-y-1 shadow-2xl backdrop-blur-2xl z-30"
                >
                  {biomes.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => {
                        setBiome(b);
                        setShowBiomeMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer min-h-[44px] flex items-center ${
                        biome === b
                          ? "bg-sky-500/20 text-sky-300 font-bold border border-sky-500/40"
                          : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Weather Events */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEventsMenu(!showEventsMenu)}
              className="px-2.5 py-2 rounded-xl bg-[#030612]/90 border border-neutral-800 text-neutral-300 hover:text-white hover:border-rose-400 transition-all cursor-pointer backdrop-blur-2xl min-h-[44px] focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              [ EVENTS ]
            </button>
            <AnimatePresence>
              {showEventsMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-44 bg-[#030612]/95 border border-rose-500/40 rounded-2xl p-2 space-y-1 shadow-2xl backdrop-blur-2xl z-30"
                >
                  {[
                    { id: "biostorm" as MicrocosmWeather, label: "⚡ BIOSTORM" },
                    { id: "eclipse" as MicrocosmWeather, label: "🌌 ECLIPSE" },
                    { id: "bloom" as MicrocosmWeather, label: "🌸 BLOOM" },
                    { id: "vortex" as MicrocosmWeather, label: "🌀 VORTEX" },
                  ].map((ev) => (
                    <button
                      key={ev.id}
                      type="button"
                      onClick={() => {
                        triggerWeather(ev.id);
                        setShowEventsMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-neutral-300 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer min-h-[44px] flex items-center"
                    >
                      {ev.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Codex */}
          <button
            type="button"
            onClick={() => setShowJournal(!showJournal)}
            className="px-2.5 py-2 rounded-xl bg-[#030612]/90 border border-neutral-800 text-emerald-400 hover:text-white hover:border-emerald-400 transition-all cursor-pointer backdrop-blur-2xl min-h-[44px] focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            [ CODEX ]
          </button>

          {/* Audio Toggle */}
          <button
            type="button"
            onClick={handleToggleMute}
            className="px-2.5 py-2 rounded-xl bg-[#030612]/90 border border-neutral-800 text-neutral-300 hover:text-white transition-all cursor-pointer backdrop-blur-2xl min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white"
          >
            {isMuted ? "[ MUTE: ON ]" : "[ MUTE: OFF ]"}
          </button>

          {/* Exit */}
          <button
            type="button"
            onClick={onExit}
            className="px-3.5 py-2 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-all cursor-pointer shadow-xl min-h-[44px] focus:outline-none focus:ring-2 focus:ring-white"
          >
            EXIT
          </button>
        </div>
      </div>

      {/* ================= RADAR MINI-MAP SCANNER ================= */}
      <div className="absolute bottom-6 left-6 pointer-events-auto hidden sm:flex flex-col items-center font-mono">
        <div className="relative w-24 h-24 rounded-full border border-emerald-500/30 bg-[#030612]/80 backdrop-blur-2xl shadow-xl flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 rounded-full border border-emerald-500/20" />
          <div className="absolute inset-0 border-t border-b border-emerald-500/20 my-auto h-0" />
          <div className="absolute inset-0 border-l border-r border-emerald-500/20 mx-auto w-0" />

          {/* Creature Radar Blips */}
          {creatures.map((c) => {
            const bx = ((c.position[0] + 1.8) / 3.6) * 100;
            const bz = ((c.position[2] + 1.8) / 3.6) * 100;
            return (
              <span
                key={c.id}
                className="absolute w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${Math.max(12, Math.min(88, bx))}%`,
                  top: `${Math.max(12, Math.min(88, bz))}%`,
                }}
              />
            );
          })}
        </div>
        <span className="text-[8px] text-emerald-400/80 font-bold uppercase tracking-widest mt-1">
          BIOLOGICAL RADAR
        </span>
      </div>

      {/* ================= BOTTOM TOOL ACTION DOCK ================= */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="bg-[#030612]/90 border border-emerald-500/30 backdrop-blur-2xl p-2 rounded-3xl shadow-2xl flex items-center gap-1.5 font-mono text-xs overflow-x-auto max-w-[95vw]">
          {tools.map((t) => {
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTool(t.id)}
                className={`min-w-[44px] min-h-[44px] px-3.5 py-2.5 rounded-2xl transition-all flex flex-col items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  isActive
                    ? "bg-white text-black font-bold shadow-lg scale-105"
                    : "text-neutral-300 hover:text-white hover:bg-neutral-900"
                }`}
                title={t.desc}
              >
                <span className="text-sm font-bold">{t.symbol}</span>
                <span className="text-[9px] uppercase tracking-wider">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= CREATURE INSPECTOR SCANNER PANEL ================= */}
      <AnimatePresence>
        {selectedCreature && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-6 right-6 pointer-events-auto w-64 bg-[#030612]/95 border border-emerald-500/40 backdrop-blur-2xl rounded-3xl p-4 space-y-3 shadow-2xl font-mono text-xs text-white"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <span className="font-bold uppercase">{selectedCreature.species}</span>
              <button
                type="button"
                onClick={() => setSelectedCreatureId(null)}
                className="p-1 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white cursor-pointer min-w-[32px] min-h-[32px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 text-[10px] text-neutral-400">
              <div className="flex justify-between">
                <span>AGE</span>
                <span className="text-white font-bold">{selectedCreature.age} CYCLES</span>
              </div>
              <div className="flex justify-between">
                <span>BEHAVIOR</span>
                <span className="text-emerald-400 font-bold">{selectedCreature.personality}</span>
              </div>
              <div className="flex justify-between">
                <span>ENERGY</span>
                <span className="text-white font-bold">{Math.floor(selectedCreature.energy)}%</span>
              </div>
              <div className="flex justify-between">
                <span>HAPPINESS</span>
                <span className="text-white font-bold">{Math.floor(selectedCreature.happiness)}%</span>
              </div>

              {selectedCreature.isMutated && (
                <div className="text-[9px] font-bold text-purple-400 uppercase tracking-widest pt-1">
                  ✦ MUTATED LIFEFORM
                </div>
              )}

              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full rounded-full bg-emerald-400 transition-all duration-300"
                  style={{ width: `${selectedCreature.energy}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= COSMIC LAB & SHOP MODAL ================= */}
      <AnimatePresence>
        {showShop && (
          <div className="fixed inset-0 pointer-events-auto z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowShop(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#030612]/95 border border-amber-500/40 rounded-3xl p-6 space-y-5 backdrop-blur-2xl shadow-2xl font-mono text-xs text-white"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-sm font-bold uppercase tracking-widest">
                  COSMIC LAB & GLB SHOP
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-amber-300 font-bold">✨ {Math.floor(stardust)} STARDUST</span>
                  <button
                    type="button"
                    onClick={() => setShowShop(false)}
                    className="p-1.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-neutral-900 pb-2">
                {[
                  { id: "dna", label: "🧬 GLB FISH (32)" },
                  { id: "decor", label: "🏛️ SUNKEN DECOR" },
                  { id: "potions", label: "🧪 ALCHEMY" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setShopTab(tab.id as typeof shopTab)}
                    className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer min-h-[44px] ${
                      shopTab === tab.id
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Shop Items Grid */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {shopTab === "dna" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {ALL_FISH_SPECIES.map((species, i) => {
                      const cost = 50 + (i % 8) * 35;
                      return (
                        <div key={species} className="p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-2">
                          <div className="space-y-0.5">
                            <span className="font-bold text-white block text-[11px] truncate">{species}</span>
                            <span className="text-[9px] text-neutral-400 block leading-tight">Low-poly 3D GLB</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleBuyDNA(species, cost)}
                            disabled={stardust < cost}
                            className={`w-full py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer min-h-[38px] ${
                              stardust >= cost
                                ? "bg-amber-400 text-black hover:bg-amber-300 shadow-md"
                                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                            }`}
                          >
                            ACQUIRE • ✨ {cost}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {shopTab === "decor" && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Sunken Shipwreck Boat", type: "coral" as MicrocosmObjectType, cost: 90, desc: "3D Low-poly wooden vessel hull" },
                      { name: "Sunken Pier Dock", type: "lava" as MicrocosmObjectType, cost: 130, desc: "3D Wooden dock platform" },
                      { name: "Fishing Rod Landmark", type: "mushroom" as MicrocosmObjectType, cost: 160, desc: "3D Cast fishing rod obelisk" },
                      { name: "Glowing Lure Crystal", type: "crystal" as MicrocosmObjectType, cost: 210, desc: "3D Shimmering fishing lure" },
                      { name: "Laney XR Seaweed", type: "plant" as MicrocosmObjectType, cost: 40, desc: "3D Flowing flora" },
                    ].map((item) => (
                      <div key={item.name} className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <span className="font-bold text-white block">{item.name}</span>
                          <span className="text-[10px] text-neutral-400 block leading-tight">{item.desc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleBuyDecor(item.type, item.cost)}
                          disabled={stardust < item.cost}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                            stardust >= item.cost
                              ? "bg-amber-400 text-black hover:bg-amber-300 shadow-md"
                              : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                          }`}
                        >
                          ACQUIRE • ✨ {item.cost}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {shopTab === "potions" && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Mutagen Elixir", type: "elixir" as MicrocosmObjectType, cost: 50, desc: "Causes fish to grow & mutate into rare species" },
                    ].map((item) => (
                      <div key={item.name} className="p-3.5 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <span className="font-bold text-white block">{item.name}</span>
                          <span className="text-[10px] text-neutral-400 block leading-tight">{item.desc}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleBuyDecor(item.type, item.cost)}
                          disabled={stardust < item.cost}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                            stardust >= item.cost
                              ? "bg-amber-400 text-black hover:bg-amber-300 shadow-md"
                              : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                          }`}
                        >
                          ACQUIRE • ✨ {item.cost}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= RESEARCH CODEX LOGBOOK MODAL ================= */}
      <AnimatePresence>
        {showJournal && (
          <div className="fixed inset-0 pointer-events-auto z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowJournal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#030612]/95 border border-emerald-500/40 rounded-3xl p-6 space-y-4 backdrop-blur-2xl shadow-2xl font-mono text-xs text-white"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <span className="font-bold uppercase tracking-widest">
                  RESEARCH CODEX LOGBOOK
                </span>
                <button
                  type="button"
                  onClick={() => setShowJournal(false)}
                  className="p-1.5 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                <div>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest mb-2 font-bold">
                    Discovered GLB Species ({discoveries.filter((d) => !d.startsWith("Event:")).length}/{ALL_FISH_SPECIES.length})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ALL_FISH_SPECIES.map((species) => {
                      const found = discoveries.includes(species);
                      return (
                        <div
                          key={species}
                          className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                            found
                              ? "bg-emerald-500/10 border-emerald-500/30 text-white"
                              : "bg-neutral-950/40 border-neutral-900 text-neutral-600"
                          }`}
                        >
                          <span className={found ? "text-emerald-400 font-bold" : "text-neutral-700"}>
                            {found ? "✓" : "?"}
                          </span>
                          <span className="text-[10px] truncate">{found ? species : "???"}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
