"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import { Send, PhoneCall } from "lucide-react";

export default function CallToAction() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Multi-layer lava wave variables
    let phase = 0;
    const waves = [
      { amplitude: 35, speed: 0.008, frequency: 0.005, color: "rgba(255, 85, 0, 0.08)" },
      { amplitude: 20, speed: 0.015, frequency: 0.01, color: "rgba(255, 30, 0, 0.12)" },
      { amplitude: 15, speed: 0.005, frequency: 0.003, color: "rgba(255, 107, 0, 0.05)" },
    ];

    // Sparks variables inside CTA
    const sparks: { x: number; y: number; size: number; speedY: number; speedX: number; alpha: number; decay: number }[] = [];
    const maxSparks = 30;

    for (let i = 0; i < maxSparks; i++) {
      sparks.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 1 + 0.5),
        speedX: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        decay: Math.random() * 0.004 + 0.002,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background gradients
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#0B0B0C");
      bgGrad.addColorStop(0.5, "#121214");
      bgGrad.addColorStop(1, "#1C0800"); // Reddish furnace bottom glow
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render flowing molten metal waves
      phase += 0.5;
      waves.forEach((w) => {
        ctx.fillStyle = w.color;
        ctx.beginPath();
        ctx.moveTo(0, height);
        
        for (let x = 0; x <= width; x += 10) {
          const y = height - 120 + Math.sin(x * w.frequency + phase * w.speed) * w.amplitude;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fill();
      });

      // Render embers
      sparks.forEach((s) => {
        s.y += s.speedY;
        s.x += s.speedX;
        s.alpha -= s.decay;

        if (s.alpha <= 0 || s.y < 0) {
          s.x = Math.random() * width;
          s.y = height + 10;
          s.alpha = Math.random() * 0.6 + 0.2;
        }

        ctx.fillStyle = `rgba(255, 85, 0, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    animate();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="contact" className="relative py-28 overflow-hidden text-center text-white min-h-[480px] flex items-center">
      {/* Canvas Flowing Lava background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      
      {/* Blueprint Grid line overlay */}
      <div className="absolute inset-0 engineering-grid opacity-15 z-10 pointer-events-none" />

      {/* Subtle bottom orange ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-industrial-orange/15 rounded-full blur-[100px] z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-20 max-w-4xl space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block">
            Partner With Industry Leaders
          </span>
          
          <h2 className="text-3xl md:text-6xl font-display font-extrabold uppercase tracking-tight leading-none text-white">
            Let's Build the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-industrial-steel-light to-industrial-orange font-black">
              Manufacturing Together.
            </span>
          </h2>
          
          <p className="text-sm md:text-base text-industrial-steel-light max-w-2xl mx-auto leading-relaxed pt-2">
            Connect with our lead metallurgical engineers today to outline custom alloy specs, mold dimensions, or arrange turnkey foundry installations.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-industrial-orange text-white hover:bg-industrial-orange-glow font-display font-semibold uppercase tracking-wider text-xs transition-colors rounded shadow-[0_4px_25px_rgba(255,85,0,0.4)] group"
            >
              Get a Quote
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-transparent border border-industrial-steel-medium text-white hover:border-industrial-orange hover:text-industrial-orange font-display font-semibold uppercase tracking-wider text-xs transition-all rounded"
            >
              Contact Experts
              <PhoneCall className="w-4 h-4" />
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
