"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
}

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const embersRef = useRef<Ember[]>([]);
  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);
  const animIdRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect touch devices
    setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
  }, []);

  const spawnEmbers = useCallback((x: number, y: number, count: number, burst: boolean = false) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? (Math.random() * 4 + 2) : (Math.random() * 1.5 + 0.3);
      embersRef.current.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (burst ? 1 : 0.5),
        size: Math.random() * 2.5 + 0.8,
        life: 0,
        maxLife: Math.random() * 40 + 20,
        hue: Math.random() * 30, // 0-30 range: red-orange-yellow
      });
    }
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHoveringRef.current =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("button") ||
        !!target.closest("a") ||
        target.classList.contains("interactive");
    };

    const handleMouseDown = () => {
      isClickingRef.current = true;
      // Burst sparks on click
      spawnEmbers(mouseRef.current.x, mouseRef.current.y, 15, true);
    };
    const handleMouseUp = () => { isClickingRef.current = false; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Calculate velocity for trail density
      const dx = mx - prevMouseRef.current.x;
      const dy = my - prevMouseRef.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      // Spawn trail embers based on movement speed
      if (velocity > 1) {
        const count = Math.min(Math.floor(velocity / 4), 4);
        spawnEmbers(mx, my, count);
      }

      // Hovering over interactive elements? Spawn extra embers
      if (isHoveringRef.current && Math.random() < 0.4) {
        spawnEmbers(mx, my, 1);
      }

      // Draw & update embers
      embersRef.current.forEach((e) => {
        e.x += e.vx;
        e.y += e.vy;
        e.vy += 0.06; // gravity
        e.vx *= 0.98; // friction
        e.life++;

        const ageRatio = e.life / e.maxLife;
        const alpha = Math.max(0, 1 - ageRatio);
        const shrink = 1 - ageRatio * 0.6;

        // Color transitions: bright orange → deep red → dark (dying ember)
        const r = 255;
        const g = Math.round(150 - ageRatio * 120 + e.hue);
        const b = Math.round(20 - ageRatio * 20);

        // Glow ring
        const gradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * shrink * 3);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * shrink * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core ember dot
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * shrink, 0, Math.PI * 2);
        ctx.fill();
      });

      // Remove dead embers
      embersRef.current = embersRef.current.filter(
        (e) => e.life < e.maxLife && e.y < height + 20 && e.x > -20 && e.x < width + 20
      );

      // Main cursor — molten droplet core
      const coreSize = isHoveringRef.current ? 14 : isClickingRef.current ? 8 : 10;
      const coreAlpha = isClickingRef.current ? 0.9 : 0.7;

      // Outer heat glow
      const heatGlow = ctx.createRadialGradient(mx, my, 0, mx, my, coreSize * 3);
      heatGlow.addColorStop(0, `rgba(255, 85, 0, ${coreAlpha * 0.25})`);
      heatGlow.addColorStop(0.5, `rgba(255, 60, 0, ${coreAlpha * 0.08})`);
      heatGlow.addColorStop(1, "rgba(255, 50, 0, 0)");
      ctx.fillStyle = heatGlow;
      ctx.beginPath();
      ctx.arc(mx, my, coreSize * 3, 0, Math.PI * 2);
      ctx.fill();

      // Inner bright core (white-hot center)
      const coreGrad = ctx.createRadialGradient(mx, my, 0, mx, my, coreSize);
      coreGrad.addColorStop(0, `rgba(255, 240, 220, ${coreAlpha})`);
      coreGrad.addColorStop(0.3, `rgba(255, 120, 30, ${coreAlpha * 0.8})`);
      coreGrad.addColorStop(0.7, `rgba(255, 60, 0, ${coreAlpha * 0.4})`);
      coreGrad.addColorStop(1, "rgba(255, 40, 0, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(mx, my, coreSize, 0, Math.PI * 2);
      ctx.fill();

      prevMouseRef.current = { ...mouseRef.current };
      animIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMobile, spawnEmbers]);

  return null;
}
