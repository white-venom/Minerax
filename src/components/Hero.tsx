"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function StatCounter({ value, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = value;
    const increment = Math.ceil(end / 125);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center border-l border-white/10 pl-5 py-1">
      <div className="font-display font-extrabold text-3xl md:text-4xl text-white tracking-tight flex items-baseline justify-center">
        <span>{count}</span>
        <span className="text-industrial-orange ml-0.5 text-2xl">{suffix}</span>
      </div>
      <div className="text-white/40 font-mono text-[10px] uppercase tracking-widest mt-1">
        {label}
      </div>
    </div>
  );
}

const SLIDES = [
  {
    src: "/api/images?id=furnace",
    caption: "Precision Melting & Pouring",
  },
  {
    src: "/api/images?id=robotic",
    caption: "Automated Foundry Lines",
  },
  {
    src: "/api/images?id=heavy",
    caption: "Heavy Engineering Castings",
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const yBg = useTransform(scrollY, [0, 800], [0, 150]);
  const opacityContent = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col overflow-hidden bg-industrial-black text-white"
    >
      {/* ── Full-screen Background Slideshow ── */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <motion.div
            key={i}
            style={{ y: yBg }}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${
              current === i ? "opacity-60" : "opacity-0"
            }`}
            aria-hidden={current !== i}
          >
            <div
              className="w-full h-full scale-105"
              style={{ backgroundImage: `url(${slide.src})` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient vignette — keeps text readable without hiding the image */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-industrial-black via-industrial-black/30 to-industrial-black/60" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-industrial-black/70 via-transparent to-transparent" />

      {/* ── Centered Minimal Content ── */}
      <motion.div
        style={{ opacity: opacityContent }}
        className="relative z-20 flex-1 flex flex-col justify-end pb-32 md:pb-40 container mx-auto px-6"
      >
        {/* Slide caption changes with each image */}
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-mono tracking-[0.25em] text-industrial-orange uppercase mb-5 block"
          >
            {SLIDES[current].caption}
          </motion.span>
        </AnimatePresence>

        {/* Short punchy headline — two lines max */}
        <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1] text-white uppercase max-w-3xl">
          Engineering Strength.
          <br />
          <span className="text-white/70">Casting Excellence.</span>
        </h1>

        {/* Single subtle CTA link */}
        <Link
          href="/products"
          className="mt-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/60 hover:text-industrial-orange transition-colors group w-fit"
        >
          <span className="w-8 h-[1px] bg-industrial-orange inline-block group-hover:w-12 transition-all" />
          Explore Our Work
        </Link>

        {/* Slide indicator dots */}
        <div className="flex gap-2 mt-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                current === i
                  ? "w-8 bg-industrial-orange"
                  : "w-3 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Bottom Stats Bar ── */}
      <div className="relative z-20 border-t border-white/10 bg-industrial-black/60 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5"
          >
            <StatCounter value={20} suffix="+" label="Years" />
            <StatCounter value={500} suffix="+" label="Projects" />
            <StatCounter value={50} suffix="+" label="Clients" />
            <StatCounter value={100} suffix="%" label="Quality" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[90px] md:bottom-[100px] right-6 hidden md:flex flex-col items-center gap-1 opacity-30 z-20 pointer-events-none">
        <ChevronDown className="w-4 h-4 text-white animate-bounce" />
      </div>
    </section>
  );
}
