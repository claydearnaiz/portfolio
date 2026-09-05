"use client";

import React, { useEffect, useRef, useState } from "react";
import { GameObject, PlayerState, GameStats } from "@/types/game";
import { initialObjects, MAP_WIDTH, MAP_HEIGHT } from "@/data/gameMap";
import { soundEngine } from "@/utils/soundEngine";
import { X, Play, RotateCcw, Volume2, VolumeX, Terminal, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { projectsData } from "@/data/projects";
import { personalInfo } from "@/data/personal";
import { skillsData } from "@/data/skills";
import { experienceData } from "@/data/experience";

const createPlayer = (): PlayerState => ({
  x: 780,
  y: 1100,
  size: 24,
  speed: 4,
  vx: 0,
  vy: 0,
  direction: "up",
});

export const SystemErrorGame: React.FC = () => {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // The canvas owns the per-frame player position. Keeping it in a ref avoids a
  // React render and game-loop effect teardown on every animation frame.
  const playerRef = useRef<PlayerState>(createPlayer());

  const [gameObjects, setGameObjects] = useState<GameObject[]>(initialObjects);
  const [activePanel, setActivePanel] = useState<GameObject | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [nearObject, setNearObject] = useState<GameObject | null>(null);

  const [stats, setStats] = useState<GameStats>({
    dataCollected: 0,
    totalData: 8,
    discoveredAreas: new Set(["Starting Point"]),
    objective: "Explore the environment and collect 8 DATA fragments.",
    isComplete: false,
    secretFound: false,
  });

  const keysPressed = useRef<{ [key: string]: boolean }>({});

  // Input Handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;

      if (e.key === "Escape") {
        setIsPaused((prev) => !prev);
      }

      if ((e.key === "e" || e.key === "E") && nearObject && !activePanel && !isPaused) {
        handleInteract(nearObject);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [nearObject, activePanel, isPaused]);

  // Interaction Logic
  const handleInteract = (obj: GameObject) => {
    if (soundEnabled) soundEngine.playInteract();

    if (obj.type === "collectible" && !obj.collected) {
      if (soundEnabled) soundEngine.playCollect();
      setGameObjects((prev) =>
        prev.map((o) => (o.id === obj.id ? { ...o, collected: true } : o))
      );
      setStats((prev) => {
        const count = prev.dataCollected + 1;
        return {
          ...prev,
          dataCollected: count,
          objective: count >= prev.totalData ? "All DATA recovered! Reach the SYSTEM CORE in the center." : `Collect remaining DATA fragments (${count}/${prev.totalData}).`,
        };
      });
      return;
    }

    if (obj.type === "core") {
      setStats((prev) => {
        if (prev.dataCollected < prev.totalData) {
          return { ...prev, objective: `SYSTEM CORE LOCKED — recover all fragments (${prev.dataCollected}/${prev.totalData}).` };
        }
        if (soundEnabled) soundEngine.playCoreComplete();
        return { ...prev, isComplete: true };
      });
      return;
    }

    if (obj.type === "secret_terminal") {
      setStats((prev) => ({ ...prev, secretFound: true }));
    }

    setActivePanel(obj);
  };

  // Main Canvas Game Loop (60 FPS)
  useEffect(() => {
    let animationFrameId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const loop = () => {
      let currentPlayer = playerRef.current;
      if (!isPaused && !stats.isComplete) {
        // Calculate Movement Velocities
        let dx = 0;
        let dy = 0;

        if (keysPressed.current["w"] || keysPressed.current["arrowup"]) dy -= 1;
        if (keysPressed.current["s"] || keysPressed.current["arrowdown"]) dy += 1;
        if (keysPressed.current["a"] || keysPressed.current["arrowleft"]) dx -= 1;
        if (keysPressed.current["d"] || keysPressed.current["arrowright"]) dx += 1;

        if (dx !== 0 && dy !== 0) {
          dx *= 0.7071;
          dy *= 0.7071;
        }

        let newX = currentPlayer.x + dx * currentPlayer.speed;
        let newY = currentPlayer.y + dy * currentPlayer.speed;

        let collidedX = false;
        let collidedY = false;

        for (const obj of gameObjects) {
          if (obj.type === "wall") {
            // AABB Collision
            if (
              newX - currentPlayer.size / 2 < obj.x + obj.width &&
              newX + currentPlayer.size / 2 > obj.x &&
              currentPlayer.y - currentPlayer.size / 2 < obj.y + obj.height &&
              currentPlayer.y + currentPlayer.size / 2 > obj.y
            ) {
              collidedX = true;
            }

            if (
              currentPlayer.x - currentPlayer.size / 2 < obj.x + obj.width &&
              currentPlayer.x + currentPlayer.size / 2 > obj.x &&
              newY - currentPlayer.size / 2 < obj.y + obj.height &&
              newY + currentPlayer.size / 2 > obj.y
            ) {
              collidedY = true;
            }
          }
        }

        if (collidedX) newX = currentPlayer.x;
        if (collidedY) newY = currentPlayer.y;

        currentPlayer = { ...currentPlayer, x: newX, y: newY };
        playerRef.current = currentPlayer;

        // Proximity Check for Interactions
        let closest: GameObject | null = null;
        let minDistance = 70;

        for (const obj of gameObjects) {
          if (obj.collected) continue;
          const centerX = obj.x + obj.width / 2;
          const centerY = obj.y + obj.height / 2;
          const dist = Math.hypot(newX - centerX, newY - centerY);

          if (dist < minDistance && obj.type !== "wall") {
            closest = obj;
            minDistance = dist;
          }
        }

        setNearObject(closest);
      }

      // Render Scene
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Camera Offset to Keep Player Centered
      const cameraX = Math.max(0, Math.min(currentPlayer.x - canvas.width / 2, MAP_WIDTH - canvas.width));
      const cameraY = Math.max(0, Math.min(currentPlayer.y - canvas.height / 2, MAP_HEIGHT - canvas.height));

      ctx.save();
      ctx.translate(-cameraX, -cameraY);

      // Draw Grid Lines
      ctx.strokeStyle = "#18181b";
      ctx.lineWidth = 1;
      for (let x = 0; x < MAP_WIDTH; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, MAP_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y < MAP_HEIGHT; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(MAP_WIDTH, y);
        ctx.stroke();
      }

      // Draw Game Objects
      gameObjects.forEach((obj) => {
        if (obj.type === "wall") {
          ctx.fillStyle = "#18181b";
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          ctx.strokeStyle = "#27272a";
          ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
        } else if (obj.type === "fake_wall") {
          ctx.fillStyle = "#18181b";
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          ctx.strokeStyle = "#3f3f46";
          ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);
        } else if (obj.type === "collectible" && !obj.collected) {
          ctx.fillStyle = "#34d399";
          ctx.shadowColor = "#34d399";
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(obj.x + obj.width / 2, obj.y + obj.height / 2, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (obj.type.startsWith("node_") || obj.type === "secret_terminal") {
          ctx.fillStyle = "#09090b";
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          ctx.strokeRect(obj.x, obj.y, obj.width, obj.height);

          ctx.fillStyle = "#ffffff";
          ctx.font = "10px monospace";
          ctx.textAlign = "center";
          ctx.fillText(obj.label || "", obj.x + obj.width / 2, obj.y - 8);
        } else if (obj.type === "core") {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 20;
          ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
          ctx.shadowBlur = 0;

          ctx.fillStyle = "#000000";
          ctx.font = "bold 10px monospace";
          ctx.textAlign = "center";
          ctx.fillText("CORE", obj.x + obj.width / 2, obj.y + obj.height / 2 + 3);
        }
      });

      // Draw Player Character
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "#ffffff";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(currentPlayer.x, currentPlayer.y, currentPlayer.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [gameObjects, isPaused, stats.isComplete]);

  const restartGame = () => {
    playerRef.current = createPlayer();
    setGameObjects(initialObjects);
    setStats({
      dataCollected: 0,
      totalData: 8,
      discoveredAreas: new Set(["Starting Point"]),
      objective: "Explore the environment and collect 8 DATA fragments.",
      isComplete: false,
      secretFound: false,
    });
    setIsPaused(false);
    setActivePanel(null);
  };

  const setTouchKey = (key: string, active: boolean) => {
    keysPressed.current[key] = active;
  };

  return (
    <div className="relative w-full h-screen bg-black text-white font-mono overflow-hidden select-none">
      {/* Top HUD Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="space-y-1 bg-neutral-950/80 border border-neutral-800 backdrop-blur-md p-3 rounded-xl pointer-events-auto">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            SYSTEM//ERROR — EXPLORATION MODE
          </div>
          <div className="text-[11px] text-neutral-400">
            OBJECTIVE: <span className="text-neutral-200">{stats.objective}</span>
          </div>
          <div className="text-[11px] text-neutral-400">
            DATA RECOVERED: <span className="text-emerald-400 font-bold">{stats.dataCollected} / {stats.totalData}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-white text-neutral-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setIsPaused(true)}
            className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-white text-neutral-300 hover:text-white transition-all cursor-pointer backdrop-blur-md"
            title="Pause Game"
          >
            <Play className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-3.5 py-2 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-all cursor-pointer flex items-center gap-1.5 text-xs shadow-lg"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> EXIT GAME
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        aria-label="SYSTEM ERROR exploration game. Use the direction controls to move and interact with nearby nodes."
      />

      {/* Touch controls make the exploratory route usable without a keyboard. */}
      <div className="md:hidden absolute bottom-5 left-4 z-20 grid grid-cols-3 gap-1.5 pointer-events-auto">
        <span />
        <button
          type="button"
          aria-label="Move up"
          onPointerDown={() => setTouchKey("arrowup", true)}
          onPointerUp={() => setTouchKey("arrowup", false)}
          onPointerLeave={() => setTouchKey("arrowup", false)}
          className="h-11 w-11 rounded-lg border border-neutral-700 bg-black/80 text-sm text-white backdrop-blur"
        >▲</button>
        <span />
        <button
          type="button"
          aria-label="Move left"
          onPointerDown={() => setTouchKey("arrowleft", true)}
          onPointerUp={() => setTouchKey("arrowleft", false)}
          onPointerLeave={() => setTouchKey("arrowleft", false)}
          className="h-11 w-11 rounded-lg border border-neutral-700 bg-black/80 text-sm text-white backdrop-blur"
        >◀</button>
        <button
          type="button"
          aria-label="Interact with nearby node"
          disabled={!nearObject || Boolean(activePanel) || isPaused}
          onClick={() => nearObject && handleInteract(nearObject)}
          className="h-11 w-11 rounded-lg border border-[#00d4ff]/60 bg-[#00d4ff] text-xs font-bold text-black disabled:border-neutral-700 disabled:bg-black/80 disabled:text-neutral-600"
        >USE</button>
        <button
          type="button"
          aria-label="Move right"
          onPointerDown={() => setTouchKey("arrowright", true)}
          onPointerUp={() => setTouchKey("arrowright", false)}
          onPointerLeave={() => setTouchKey("arrowright", false)}
          className="h-11 w-11 rounded-lg border border-neutral-700 bg-black/80 text-sm text-white backdrop-blur"
        >▶</button>
        <span />
        <button
          type="button"
          aria-label="Move down"
          onPointerDown={() => setTouchKey("arrowdown", true)}
          onPointerUp={() => setTouchKey("arrowdown", false)}
          onPointerLeave={() => setTouchKey("arrowdown", false)}
          className="h-11 w-11 rounded-lg border border-neutral-700 bg-black/80 text-sm text-white backdrop-blur"
        >▼</button>
      </div>

      {/* Proximity Interaction Prompt */}
      {nearObject && !activePanel && !isPaused && !stats.isComplete && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 bg-white text-black font-mono font-bold text-xs px-4 py-2 rounded-full shadow-2xl animate-bounce flex items-center gap-2">
          <span>PRESS [E] TO INTERACT WITH {nearObject.label?.toUpperCase() || nearObject.type.toUpperCase()}</span>
        </div>
      )}

      {/* Interactive Portfolio Data Panel Modal */}
      <AnimatePresence>
        {activePanel && (
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePanel(null)} className="fixed inset-0 bg-black/85 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl z-10 text-white p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400">// NODE DATA RECOVERED</span>
                <button type="button" onClick={() => setActivePanel(null)} className="p-1 rounded bg-neutral-900 text-neutral-400 hover:text-white"><X className="w-4 h-4" /></button>
              </div>

              {activePanel.type === "node_projects" && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white uppercase">{projectsData[0].title}</h2>
                  <p className="text-xs text-neutral-300">{projectsData[0].description}</p>
                  <p className="text-xs text-emerald-400 font-mono">{projectsData[0].problemSolved}</p>
                  <button type="button" onClick={() => router.push("/#projects")} className="mt-4 px-4 py-2 bg-white text-black font-bold rounded-lg text-xs">OPEN FULL PROJECTS SECTION</button>
                </div>
              )}

              {activePanel.type === "node_about" && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white uppercase">PROFILE: CLAYDE NHICOS ARNAIZ</h2>
                  <p className="text-xs text-neutral-300">{personalInfo.bio[0]}</p>
                  <button type="button" onClick={() => router.push("/#about")} className="mt-4 px-4 py-2 bg-white text-black font-bold rounded-lg text-xs">OPEN FULL ABOUT SECTION</button>
                </div>
              )}

              {activePanel.type === "node_skills" && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white uppercase">SKILLS DATABASE</h2>
                  <div className="flex flex-wrap gap-1.5">{skillsData.map((s) => (<span key={s.name} className="px-2 py-1 text-xs">{s.name}</span>))}</div>
                  <button type="button" onClick={() => router.push("/#skills")} className="mt-4 px-4 py-2 bg-white text-black font-bold rounded-lg text-xs">OPEN FULL SKILLS SECTION</button>
                </div>
              )}

              {activePanel.type === "node_experience" && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white uppercase">CAREER LOGS</h2>
                  {experienceData.map((exp) => (<div key={exp.id} className="text-xs border-l border-neutral-800 pl-2"><p className="text-white font-bold">{exp.title} @ {exp.organization}</p><p className="text-neutral-400">{exp.description}</p></div>))}
                </div>
              )}

              {activePanel.type === "node_contact" && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white uppercase">DIRECT CONTACT</h2>
                  <p className="text-xs text-neutral-300">Email: {personalInfo.email}</p>
                  <p className="text-xs text-neutral-300">Phone: {personalInfo.phone}</p>
                  <button type="button" onClick={() => router.push("/#contact")} className="mt-4 px-4 py-2 bg-white text-black font-bold rounded-lg text-xs">OPEN FULL CONTACT SECTION</button>
                </div>
              )}

              {activePanel.type === "secret_terminal" && (
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-emerald-400 uppercase">// SECRET DEVELOPER LOG</h2>
                  <p className="text-xs text-neutral-300 italic">&ldquo;You found the hidden developer terminal behind the matrix wall. Thank you for exploring!&rdquo;</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {stats.isComplete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/90 backdrop-blur-xl" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-2xl p-8 text-center space-y-6 z-10">
              <div className="w-12 h-12 rounded-full bg-emerald-400 text-black flex items-center justify-center mx-auto font-bold text-xl">✓</div>
              <h2 className="text-3xl font-black uppercase text-white tracking-tight">SYSTEM COMPLETE</h2>
              <div className="text-xs font-mono text-emerald-400">DATA RECOVERED: {stats.dataCollected} / {stats.totalData}</div>
              <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                {stats.dataCollected === stats.totalData ? "Outstanding exploration! You fully recovered all system fragments and uncovered the hidden developer room." : "Looks like you found your way through."}
              </p>
              <div className="flex items-center justify-center gap-3 pt-4">
                <button type="button" onClick={() => router.push("/")} className="px-5 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-all cursor-pointer">RETURN TO PORTFOLIO</button>
                <button type="button" onClick={restartGame} className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-bold text-xs hover:border-white transition-all cursor-pointer flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> PLAY AGAIN</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
