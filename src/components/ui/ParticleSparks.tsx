"use client";

import { useEffect, useRef } from "react";

interface ParticleSparksProps {
  intensity?: "low" | "medium" | "high";
  color?: "orange" | "mixed";
}

export default function ParticleSparks({ intensity = "medium", color = "orange" }: ParticleSparksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const maxParticles = intensity === "low" ? 40 : intensity === "medium" ? 80 : 150;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      decay: number;
      color: string;
      glow: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 1.5;
        // Upward movement
        this.speedY = -(Math.random() * 2 + 1);
        this.alpha = Math.random() * 0.8 + 0.2;
        this.decay = Math.random() * 0.005 + 0.002;
        
        // Randomly assign spark orange or metallic white/grey
        const isOrange = color === "orange" || Math.random() > 0.3;
        if (isOrange) {
          const hue = Math.random() > 0.5 ? 25 : 15; // Orange to Red-Orange
          this.color = `hsla(${hue}, 100%, ${50 + Math.random() * 20}%,`;
          this.glow = Math.random() > 0.4;
        } else {
          // Metallic white/grey sparks
          this.color = `rgba(220, 220, 230,`;
          this.glow = false;
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;

        // Reset particle if it goes off screen or fades out
        if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.x = Math.random() * width;
          this.y = height + Math.random() * 50;
          this.size = Math.random() * 2.5 + 0.5;
          this.speedX = (Math.random() - 0.5) * 1.5;
          this.speedY = -(Math.random() * 2 + 1);
          this.alpha = Math.random() * 0.8 + 0.2;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        if (this.glow) {
          c.shadowBlur = this.size * 4;
          c.shadowColor = "rgba(255, 85, 0, 0.8)";
        }
        c.fillStyle = this.color + this.alpha + ")";
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const init = () => {
      for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
        // Stagger initial Y heights so they don't all rise at once from the bottom
        particles[i].y = Math.random() * height;
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [intensity, color]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}
