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
    <div ref={ref} className="text-center border-l border-industrial-border pl-5 py-1">
      <div className="font-display font-extrabold text-3xl md:text-4xl text-industrial-text tracking-tight flex items-baseline justify-center">
        <span>{count}</span>
        <span className="text-industrial-orange ml-0.5 text-2xl">{suffix}</span>
      </div>
      <div className="text-industrial-text-secondary font-mono text-[10px] uppercase tracking-widest mt-1 font-bold">
        {label}
      </div>
    </div>
  );
}

const SLIDES = [
  {
    videoSrc: "/1.mp4",
    caption: "Precision Melting & Pouring",
    title: "Induction Melting Systems",
    description: "High-capacity induction furnaces engineered for optimal thermodynamic efficiency, alloy consistency, and automated temperature regulation.",
    cta: "View Foundry Systems"
  },
  {
    videoSrc: "/2.mp4",
    caption: "Automated Foundry Lines",
    title: "Robotic Sand Molding",
    description: "Advanced green sand and no-bake molding lines integrated with automated core setting and automated cooling tracks.",
    cta: "Explore Automation"
  },
  {
    videoSrc: "/3.mp4",
    caption: "Heavy Engineering Castings",
    title: "Heavy Casting Solutions",
    description: "Specialized manufacture of heavy-duty components including turbine housings, railway bogie frames, and massive gear blanks.",
    cta: "See Cast Products"
  },
];

const ANIMATIONS = [
  {
    initial: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.1, filter: "blur(8px)" },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  {
    initial: { opacity: 0, x: 150, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -150, scale: 0.95 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
  {
    initial: { opacity: 0, y: 100, rotate: 1 },
    animate: { opacity: 1, y: 0, rotate: 0 },
    exit: { opacity: 0, y: -100, rotate: -1 },
    transition: { duration: 0.8, ease: "easeInOut" }
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const opacityContent = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-industrial-bg text-industrial-text"
    >
      {/* Engineering Grid Background */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none z-0" />

      {/* Visual partition line between header and page content */}
      <div className="absolute top-[80px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-industrial-border/50 to-transparent z-30 pointer-events-none" />

      {/* Main Split Content Area */}
      <motion.div
        style={{ opacity: opacityContent }}
        className="relative z-20 flex-1 flex flex-col md:flex-row items-center justify-between container mx-auto px-6 pt-28 pb-6 gap-10 md:gap-16 w-full"
      >
        
        {/* Left Column: Text Content */}
        <div className="w-full md:w-[48%] flex flex-col justify-center min-h-[340px] text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="space-y-5"
            >
              <span className="text-[11px] font-display font-bold tracking-[0.25em] text-industrial-orange uppercase block">
                {SLIDES[current].caption}
              </span>
              <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-industrial-text uppercase">
                {SLIDES[current].title}
              </h1>
              <p className="text-sm md:text-base text-industrial-text-secondary leading-relaxed max-w-lg">
                {SLIDES[current].description}
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-industrial-steel-medium hover:text-industrial-orange transition-colors group pt-2"
              >
                <span className="w-8 h-[1px] bg-industrial-orange inline-block group-hover:w-12 transition-all" />
                {SLIDES[current].cta}
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicator dots */}
          <div className="flex gap-2 mt-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  current === i
                    ? "w-8 bg-industrial-orange"
                    : "w-3 bg-industrial-steel-light/30 hover:bg-industrial-steel-light/50"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Slideshow */}
        <div className="w-full md:w-[48%] flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] md:aspect-[1.3] overflow-hidden rounded-2xl border border-industrial-border/10 shadow-lg bg-white">
            {SLIDES.map((slide, idx) => {
              const isCurrent = current === idx;
              const anim = ANIMATIONS[idx];

              return (
                <motion.div
                  key={idx}
                  initial={anim.initial}
                  animate={isCurrent ? anim.animate : anim.exit}
                  transition={anim.transition}
                  className="absolute inset-0 w-full h-full"
                  style={{ pointerEvents: isCurrent ? "auto" : "none" }}
                >
                  <video
                    src={slide.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
            
            {/* Blending Feathered Overlays on all 4 edges */}
            <div 
              className="absolute inset-x-0 top-0 h-20 pointer-events-none z-10" 
              style={{ background: "linear-gradient(to bottom, #FAFAFA 0%, rgba(250, 250, 250, 0.8) 25%, rgba(250, 250, 250, 0) 100%)" }}
            />
            <div 
              className="absolute inset-x-0 bottom-0 h-20 pointer-events-none z-10" 
              style={{ background: "linear-gradient(to top, #FAFAFA 0%, rgba(250, 250, 250, 0.8) 25%, rgba(250, 250, 250, 0) 100%)" }}
            />
            <div 
              className="absolute inset-y-0 left-0 w-20 pointer-events-none z-10" 
              style={{ background: "linear-gradient(to right, #FAFAFA 0%, rgba(250, 250, 250, 0.8) 25%, rgba(250, 250, 250, 0) 100%)" }}
            />
            <div 
              className="absolute inset-y-0 right-0 w-20 pointer-events-none z-10" 
              style={{ background: "linear-gradient(to left, #FAFAFA 0%, rgba(250, 250, 250, 0.8) 25%, rgba(250, 250, 250, 0) 100%)" }}
            />
          </div>
        </div>

      </motion.div>

      {/* ── Bottom Stats Bar ── */}
      <div className="relative z-20 border-t border-b border-industrial-border/30 bg-industrial-bg-alt">
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
        <ChevronDown className="w-4 h-4 text-industrial-text animate-bounce" />
      </div>
    </section>
  );
}
