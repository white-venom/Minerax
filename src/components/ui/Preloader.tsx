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
  const [logoColor, setLogoColor] = useState("#E5E7EB");
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
        const step = Math.floor(Math.random() * 8) + 3;
        return Math.min(prev + step, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  // Map progress to Temperature, Phase, and Logo glowing values
  useEffect(() => {
    if (progress < 35) {
      setPhase("HEATING COILS ACTIVE");
      const currentTemp = Math.round((progress / 35) * 1630 + 20);
      setTemp(currentTemp);

      const ratio = progress / 35;
      const r = Math.round(229 + (255 - 229) * ratio);
      const g = Math.round(231 + (51 - 231) * ratio);
      const b = Math.round(235 - 235 * ratio);
      setLogoColor(`rgb(${r}, ${g}, ${b})`);
      setLogoGlow(`0 0 ${ratio * 20}px rgba(255, 51, 0, ${ratio * 0.8})`);
    } else if (progress >= 35 && progress < 75) {
      setPhase("CRUCIBLE POURING IN PROGRESS");
      setTemp(1650 + Math.floor(Math.sin(progress) * 8));
      setLogoColor("#FFFFFF");
      setLogoGlow("0 0 35px rgba(255, 100, 0, 1), 0 0 15px rgba(255, 255, 255, 0.8)");
    } else if (progress >= 75 && progress < 100) {
      setPhase("MOLD COOLING CYCLE");
      const coolRatio = (progress - 75) / 25;
      const currentTemp = Math.round(1650 - coolRatio * 1170);
      setTemp(currentTemp);

      if (coolRatio < 0.5) {
        setLogoColor(`rgb(255, ${Math.round(255 - coolRatio * 300)}, ${Math.round(255 - coolRatio * 500)})`);
        setLogoGlow(`0 0 ${25 - coolRatio * 30}px rgba(255, 85, 0, ${0.8 - coolRatio * 0.5})`);
      } else {
        const r = Math.round(255 - (255 - 26) * coolRatio);
        const g = Math.round(255 - (255 - 26) * coolRatio);
        const b = Math.round(255 - (255 - 26) * coolRatio);
        setLogoColor(`rgb(${r}, ${g}, ${b})`);
        setLogoGlow("0 0 0px rgba(0,0,0,0)");
      }
    } else {
      setPhase("MATRIX STRUCTURE STABILIZED");
      setTemp(480);
      setLogoColor("#1A1A1A");
      setLogoGlow("0 0 0px rgba(0,0,0,0)");
    }
  }, [progress]);

  // Auto-unlock when finished loading
  useEffect(() => {
    if (isFinishedLoading) {
      const timer = setTimeout(() => {
        setIsUnlocked(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isFinishedLoading]);

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
      const cx = width / 2;
      const cy = height / 2 - 20;

      let speedFactor = 1;
      let angle = Math.random() * Math.PI * 2;
      
      if (progress >= 35 && progress < 75) {
        speedFactor = 5.5;
      } else if (progress < 35) {
        speedFactor = 2;
      } else {
        speedFactor = 0.5;
      }

      const velocity = (Math.random() * 2 + 1) * speedFactor;

      return {
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - (progress < 75 ? 1 : 0),
        size: Math.random() * 2.5 + 0.5,
        life: 0,
        maxLife: Math.random() * 60 + 30,
      };
    };

    const drawLoop = () => {
      ctx.clearRect(0, 0, width, height);

      let pSpawn = 0.05;
      if (progress >= 35 && progress < 75) pSpawn = 0.85;
      else if (progress >= 75 && progress < 100) pSpawn = 0.15;
      else if (progress === 100) pSpawn = 0.0;

      if (Math.random() < pSpawn) {
        sparkList.push(spawnSpark());
        if (progress >= 35 && progress < 75) {
          sparkList.push(spawnSpark());
          sparkList.push(spawnSpark());
        }
      }

      sparkList.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        s.vy += 0.04;

        const ageRatio = s.life / s.maxLife;
        const alpha = Math.max(0, 1 - ageRatio);

        ctx.fillStyle = `rgba(255, ${Math.round(200 - ageRatio * 150)}, 0, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

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
          
          {/* Shutter Top half — light */}
          <motion.div
            initial={{ y: 0 }}
            animate={isUnlocked ? { y: "-100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white border-b border-industrial-border z-0 flex flex-col justify-end items-center overflow-hidden"
          >
            <div className="absolute inset-0 engineering-grid opacity-[0.15] pointer-events-none" />
            <div className="absolute inset-0 engineering-grid-fine opacity-[0.08] pointer-events-none" />
          </motion.div>

          {/* Shutter Bottom half — light */}
          <motion.div
            initial={{ y: 0 }}
            animate={isUnlocked ? { y: "100%" } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-white border-t border-industrial-border z-0 flex flex-col justify-start items-center overflow-hidden"
          >
            <div className="absolute inset-0 engineering-grid opacity-[0.15] pointer-events-none" />
            <div className="absolute inset-0 engineering-grid-fine opacity-[0.08] pointer-events-none" />
          </motion.div>

          {/* Spark Eruptions Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

          {/* Telemetry Heat Glow Background */}
          <div 
            className="absolute w-[350px] h-[350px] rounded-full blur-[100px] transition-all duration-300 pointer-events-none z-10"
            style={{
              background: progress < 75 ? "radial-gradient(circle, rgba(255,85,0,0.08) 0%, rgba(255,255,255,0) 70%)" : "radial-gradient(circle, rgba(26,26,26,0.02) 0%, rgba(255,255,255,0) 70%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)"
            }}
          />

          {/* Central Control Panel Elements */}
          <div className="relative z-20 flex flex-col items-center justify-center max-w-lg px-6 text-center select-none">
            
            {/* Live Status indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-industrial-bg-alt border border-industrial-border rounded-full mb-8 font-mono text-[8.5px] uppercase tracking-widest text-industrial-text-secondary">
              <span className={`w-2 h-2 rounded-full ${progress < 100 ? "bg-industrial-orange animate-pulse" : "bg-green-500"}`} />
              {phase}
            </div>

            {/* Logo with Heat Reactive colors */}
            <div 
              className="mb-8 p-6 bg-white/80 border border-industrial-border rounded-xl transition-all duration-300 relative group flex items-center justify-center shadow-lg"
              style={{ 
                color: logoColor,
                filter: `drop-shadow(${logoGlow})`
              }}
            >
              {/* Mold outline brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-industrial-text-muted/30" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-industrial-text-muted/30" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-industrial-text-muted/30" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-industrial-text-muted/30" />

              <Logo iconOnly size="lg" color={logoColor} />
            </div>

            {/* Sub-Brand Title */}
            <h1 className="font-serif font-bold text-2xl md:text-3xl tracking-tight text-industrial-text mb-8">
              minera<span className="text-industrial-orange">X</span> <span className="font-sans font-black uppercase tracking-widest text-lg md:text-xl ml-2">FORGE</span>
            </h1>

            {/* Progress Loader Bar */}
            <div className="h-16 flex items-center justify-center w-full">
              <div className="w-48 h-1 bg-industrial-border rounded-full overflow-hidden relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-industrial-orange transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

          </div>

          {/* Bottom HUD Telemetry Details */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center font-mono text-[8px] text-industrial-text-muted uppercase tracking-widest z-20">
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
