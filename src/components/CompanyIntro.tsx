"use client";

import { motion } from "framer-motion";
import ThreeCasting from "./ui/ThreeCasting";
import { Hammer, Cog, Flame, Layers, Cpu } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const TIMELINE_EVENTS: TimelineItem[] = [
  {
    year: "2006",
    title: "Foundry Foundation",
    description: "MineraX was established as a high-capacity custom foundry producing sand castings.",
  },
  {
    year: "2013",
    title: "Induction Smelting Tech",
    description: "Upgraded furnaces to high-efficiency medium-frequency induction systems.",
  },
  {
    year: "2019",
    title: "Automation Patent",
    description: "Patented a smart mold distribution loop, significantly decreasing molding cycles.",
  },
  {
    year: "2025",
    title: "Next-Gen Foundry Automation",
    description: "Deployed IoT-connected casting lines and autonomous mechanical finish cells globally.",
  },
];

const SPECIALIZATION_TAGS = [
  { text: "Metal Casting", icon: Hammer },
  { text: "Foundry Equipment", icon: Cog },
  { text: "Melting Furnaces", icon: Flame },
  { text: "Sand Molding Systems", icon: Layers },
  { text: "Industrial Automation", icon: Cpu },
];

export default function CompanyIntro() {
  return (
    <section id="about" className="py-24 bg-white text-industrial-text relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 engineering-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-industrial-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Top row: Content + 3D Model side by side, vertically centered */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Company Overview */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <span className="text-xs font-display font-bold tracking-widest text-industrial-orange uppercase block mb-3">
                01 // Introduction
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-extrabold text-industrial-text tracking-tight uppercase mb-6">
                Shaping the Future of <br />
                <span className="text-industrial-steel-medium font-black">Industrial Metallurgy</span>
              </h2>
              <p className="text-industrial-text-secondary text-base md:text-lg leading-relaxed mb-6">
                MineraX Industries is an engineering-first manufacturing powerhouse specializing in turnkey foundry project executions, melting furnaces, and custom heavy steel-molding lines. We integrate robust traditional metallurgy with advanced IoT-driven robotics to output high-tolerance casting products.
              </p>
            </div>

            {/* Specialization Tags */}
            <div className="space-y-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-industrial-text-muted mb-2">Core Engineering Disciplines</h3>
              <div className="flex flex-wrap gap-3">
                {SPECIALIZATION_TAGS.map((spec, index) => {
                  const IconComp = spec.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-industrial-bg-alt border border-industrial-border rounded text-xs font-mono text-industrial-text hover:border-industrial-orange/40 transition-all duration-300 shadow-sm"
                    >
                      <IconComp className="w-3.5 h-3.5 text-industrial-orange" />
                      {spec.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 3D interactive viewport */}
          <div className="lg:col-span-6">
            <ThreeCasting />
          </div>

        </div>

        {/* Horizontal Timeline - Full Width Below */}
        <div className="mt-20 pt-10 border-t border-industrial-border">
          <h3 className="font-mono text-xs uppercase tracking-widest text-industrial-text-muted mb-10">Evolutionary Roadmap</h3>
          
          <div className="relative">
            {/* Horizontal connecting line */}
            <div className="absolute top-[5px] left-0 right-0 h-[1px] bg-industrial-border hidden md:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {TIMELINE_EVENTS.map((evt, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  key={idx} 
                  className="relative pt-6 md:pt-5"
                >
                  {/* Dot indicator on horizontal line */}
                  <div className="absolute top-0 left-0 w-2.5 h-2.5 rounded-full bg-white border-2 border-industrial-orange ring-4 ring-white" />
                  
                  <span className="font-display font-extrabold text-industrial-orange text-lg font-mono block mb-1">
                    {evt.year}
                  </span>
                  <h4 className="font-display font-semibold text-industrial-text text-sm mb-2">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-industrial-text-secondary leading-relaxed">
                    {evt.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
