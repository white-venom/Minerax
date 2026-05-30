"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import MagneticButton from "./MagneticButton";
import { Flame, Play, ShieldAlert, Cpu } from "lucide-react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [temp, setTemp] = useState(20);
  const [phase, setPhase] = useState("HEATING COILS");
  const [logoColor, setLogoColor] = useState("#2A2A2E");
  const [logoGlow, setLogoGlow] = useState("0px rgba(0,0,0,0)");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isFinishedLoading, setIsFinishedLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smelting simulation intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFinishedLoading(true);
          return 100;
        }
        // Random incremental steps
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + step, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  // Map progress to Temperature, Phase, and Logo glowing values
  useEffect(() => {
    if (progress < 35) {
      // 1. Heating Phase
      setPhase("HEATING COILS ACTIVE");
      const currentTemp = Math.round((progress / 35) * 1630 + 20);
      setTemp(currentTemp);

      // Interpolate color from dark charcoal (#2A2A2E) to molten orange-red (#FF3300)
      const ratio = progress / 35;
      const r = Math.round(42 + (255 - 42) * ratio);
      const g = Math.round(42 + (51 - 42) * ratio);
      const b = Math.round(46 - 46 * ratio);
      setLogoColor(`rgb(${r}, ${g}, ${b})`);
      setLogoGlow(`0 0 ${ratio * 20}px rgba(255, 51, 0, ${ratio * 0.8})`);
    } else if (progress >= 35 && progress < 75) {
      // 2. Pouring Phase
      setPhase("CRUCIBLE POURING IN PROGRESS");
      setTemp(1650 + Math.floor(Math.sin(progress) * 8)); // minor thermic fluctuations
      setLogoColor("#FFFFFF"); // Blinding white-hot
      setLogoGlow("0 0 35px rgba(255, 100, 0, 1), 0 0 15px rgba(255, 255, 255, 0.8)");
    } else if (progress >= 75 && progress < 100) {
      // 3. Cooling Phase
      setPhase("MOLD COOLING CYCLE");
      const coolRatio = (progress - 75) / 25; // 0 to 1
      const currentTemp = Math.round(1650 - coolRatio * 1170); // drops to 480C
      setTemp(currentTemp);

      // Interpolate from white-hot (#FFFFFF) down to solid metal steel-grey (#8A8A93)
      const r = Math.round(255 - (255 - 138) * coolRatio);
      const g = Math.round(255 - (255 - 138) * coolRatio);
      const b = Math.round(255 - (255 - 147) * coolRatio);
      
      // Let it pass through an orange-red phase in the middle of cooling
      if (coolRatio < 0.5) {
        setLogoColor(`rgb(255, ${Math.round(255 - coolRatio * 300)}, ${Math.round(255 - coolRatio * 500)})`);
        setLogoGlow(`0 0 ${25 - coolRatio * 30}px rgba(255, 85, 0, ${0.8 - coolRatio * 0.5})`);
      } else {
        setLogoColor(`rgb(${r}, ${g}, ${b})`);
        setLogoGlow("0 0 0px rgba(0,0,0,0)");
      }
    } else {
      // 4. Stabilized Phase
      setPhase("MATRIX STRUCTURE STABILIZED");
      setTemp(480);
      setLogoColor("#8A8A93");
      setLogoGlow("0 0 0px rgba(0,0,0,0)");
    }
  }, [progress]);

  // Particle Canvas for Spark eruptions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
    }

    let sparkList: Spark[] = [];

    const spawnSpark = () => {
      // Center of screen where logo sits
      const cx = width / 2;
      const cy = height / 2 - 20;

      // Spark count changes depending on phase
      let speedFactor = 1;
      let angle = Math.random() * Math.PI * 2;
      
      if (progress >= 35 && progress < 75) {
        // Active pouring eruption
        speedFactor = 5.5;
      } else if (progress < 35) {
        // Heating simmer
        speedFactor = 2;
      } else {
        // Cooling fizzle
        speedFactor = 0.5;
      }

      const velocity = (Math.random() * 2 + 1) * speedFactor;

      return {
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - (progress < 75 ? 1 : 0), // float upwards
        size: Math.random() * 2.5 + 0.5,
        life: 0,
        maxLife: Math.random() * 60 + 30,
      };
    };

    const drawLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Deciding spawn probability based on progress
      let pSpawn = 0.05;
      if (progress >= 35 && progress < 75) pSpawn = 0.85; // Heavy flow sparks
      else if (progress >= 75 && progress < 100) pSpawn = 0.15; // Slow down
      else if (progress === 100) pSpawn = 0.0; // Stabilized

      if (Math.random() < pSpawn) {
        sparkList.push(spawnSpark());
        if (progress >= 35 && progress < 75) {
          // Extra sparks during pouring
          sparkList.push(spawnSpark());
          sparkList.push(spawnSpark());
        }
      }

      sparkList.forEach((s, idx) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        s.vy += 0.04; // gravity pulling sparks down

        const ageRatio = s.life / s.maxLife;
        const alpha = Math.max(0, 1 - ageRatio);

        ctx.fillStyle = `rgba(255, ${Math.round(200 - ageRatio * 150)}, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Spawn smaller trail ash
        if (Math.random() < 0.15 && alpha > 0.3) {
          ctx.fillStyle = `rgba(255, 80, 0, ${alpha * 0.5})`;
          ctx.fillRect(s.x + (Math.random() - 0.5) * 4, s.y + (Math.random() - 0.5) * 4, 1, 1);
        }
      });

      sparkList = sparkList.filter((s) => s.life < s.maxLife && s.y < height && s.x > 0 && s.x < width);

      animId = requestAnimationFrame(drawLoop);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    drawLoop();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [progress]);

  const handleUnlock = () => {
    setIsUnlocked(true);
  };

  return (
    <AnimatePresence>
      {!isUnlocked && (
        <div className="fixed inset-0 w-full h-full z-[99999] overflow-hidden flex flex-col items-center justify-center">
          
          {/* Shutter Top half */}
          <motion.div
            initial={{ y: 0 }}
            animate={isUnlocked ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#0B0B0C] border-b border-industrial-steel-dark z-0 flex flex-col justify-end items-center overflow-hidden"
          >
            {/* Engineering blueprints grid lines */}
            <div className="absolute inset-0 engineering-grid opacity-[0.06] pointer-events-none" />
            <div className="absolute inset-0 engineering-grid-fine opacity-[0.03] pointer-events-none" />
          </motion.div>

          {/* Shutter Bottom half */}
          <motion.div
            initial={{ y: 0 }}
            animate={isUnlocked ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0B0B0C] border-t border-industrial-steel-dark z-0 flex flex-col justify-start items-center overflow-hidden"
          >
            {/* Engineering blueprints grid lines */}
            <div className="absolute inset-0 engineering-grid opacity-[0.06] pointer-events-none" />
            <div className="absolute inset-0 engineering-grid-fine opacity-[0.03] pointer-events-none" />
          </motion.div>

          {/* Spark Eruptions Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

          {/* Telemetry Heat Glow Background */}
          <div 
            className="absolute w-[350px] h-[350px] rounded-full blur-[100px] transition-all duration-300 pointer-events-none z-10"
            style={{
              background: progress < 75 ? "radial-gradient(circle, rgba(255,85,0,0.12) 0%, rgba(0,0,0,0) 70%)" : "radial-gradient(circle, rgba(138,138,147,0.02) 0%, rgba(0,0,0,0) 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />

          {/* Central Control Panel Elements */}
          <div className="relative z-20 flex flex-col items-center justify-center max-w-lg px-6 text-center select-none">
            
            {/* Live Status indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-industrial-graphite/80 border border-white/5 rounded-full mb-8 font-mono text-[8.5px] uppercase tracking-widest text-industrial-steel-light">
              <span className={`w-2 h-2 rounded-full ${progress < 100 ? "bg-industrial-orange animate-pulse" : "bg-green-400"}`} />
              {phase}
            </div>

            {/* Custom SVG Logo with Heat Reactive colors */}
            <div 
              className="mb-8 p-6 bg-industrial-graphite/40 border border-white/5 rounded-xl transition-all duration-300 relative group flex items-center justify-center"
              style={{ 
                color: logoColor,
                filter: `drop-shadow(${logoGlow})`
              }}
            >
              {/* Mold outline brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-industrial-steel-medium/30" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-industrial-steel-medium/30" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-industrial-steel-medium/30" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-industrial-steel-medium/30" />

              <Logo iconOnly size="lg" color={logoColor} />
            </div>

            {/* Sub-Brand Title */}
            <h1 className="font-display font-black text-xl md:text-2xl tracking-widest text-white mb-6 uppercase">
              MINERA<span className="text-industrial-orange">X</span> FORGE
            </h1>

            {/* Stats Dashboard Grid */}
            <div className="grid grid-cols-3 gap-6 font-mono text-[9px] text-industrial-steel-light border-y border-white/5 py-4 w-72 md:w-80 mb-8">
              <div>
                <span className="text-white/40 block mb-0.5">METRIC TEMP</span>
                <span className="text-white font-bold text-[11px] transition-all">
                  {temp}°C
                </span>
              </div>
              <div>
                <span className="text-white/40 block mb-0.5">YIELD CYCLE</span>
                <span className="text-industrial-orange font-bold text-[11px]">
                  {progress}%
                </span>
              </div>
              <div>
                <span className="text-white/40 block mb-0.5">UNIT NODE</span>
                <span className="text-white font-bold text-[11px]">
                  {progress < 100 ? "STAGE_0" + (progress < 35 ? "1" : progress < 75 ? "2" : "3") : "ONLINE"}
                </span>
              </div>
            </div>

            {/* Dynamic Interactive Action Trigger */}
            <div className="h-16 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isFinishedLoading ? (
                  /* Standard Loading bar */
                  <motion.div
                    key="loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-48 h-1 bg-industrial-graphite rounded-full overflow-hidden relative"
                  >
                    <div 
                      className="absolute top-0 left-0 h-full bg-industrial-orange transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </motion.div>
                ) : (
                  /* Interactive Ignition Trigger */
                  <motion.div
                    key="trigger"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <MagneticButton>
                      <button
                        onClick={handleUnlock}
                        className="relative w-14 h-14 rounded-full bg-industrial-orange hover:bg-industrial-orange-glow border border-white/10 flex items-center justify-center text-white transition-all shadow-[0_0_20px_rgba(255,85,0,0.4)] hover:shadow-[0_0_35px_rgba(255,85,0,0.6)] group"
                      >
                        {/* Outer pulse orbit */}
                        <div className="absolute inset-0 rounded-full border border-industrial-orange animate-ping opacity-60 pointer-events-none" />
                        <Play className="w-5 h-5 fill-white ml-0.5 group-hover:scale-110 transition-transform" />
                      </button>
                    </MagneticButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Bottom HUD Telemetry Details */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center font-mono text-[8px] text-industrial-steel-medium uppercase tracking-widest z-20">
            <div className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-industrial-orange" />
              <span>Edge Compute Node: F-07</span>
            </div>
            <div>
              System Registry: ISO 9001:2015 Approved
            </div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
}
