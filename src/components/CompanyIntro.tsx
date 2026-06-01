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
    <section id="about" className="py-24 bg-industrial-bg-alt text-industrial-text relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute inset-0 engineering-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-industrial-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Company Overview & Timeline */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
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
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-industrial-border rounded text-xs font-mono text-industrial-text hover:border-industrial-orange/40 transition-all duration-300 shadow-sm"
                    >
                      <IconComp className="w-3.5 h-3.5 text-industrial-orange" />
                      {spec.text}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Animated Timeline */}
            <div className="pt-6 border-t border-industrial-border">
              <h3 className="font-mono text-xs uppercase tracking-widest text-industrial-text-muted mb-6">Evolutionary Roadmap</h3>
              
              <div className="relative pl-6 border-l border-industrial-border space-y-8">
                {TIMELINE_EVENTS.map((evt, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    key={idx} 
                    className="relative"
                  >
                    {/* Ring indicator on left vertical line */}
                    <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-industrial-orange ring-4 ring-industrial-bg-alt" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
                      <span className="font-display font-extrabold text-industrial-orange text-lg font-mono">
                        {evt.year}
                      </span>
                      <h4 className="font-display font-semibold text-industrial-text text-sm">
                        {evt.title}
                      </h4>
                    </div>
                    
                    <p className="text-xs text-industrial-text-secondary leading-relaxed">
                      {evt.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 3D interactive viewport */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <div className="space-y-6">
              <ThreeCasting />
              
              {/* Technical Specifications Blueprint Overlay */}
              <div className="bg-white border border-industrial-border rounded-xl p-6 glass-panel font-mono text-[11px] text-industrial-text-secondary relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-20 h-20 engineering-grid opacity-30" />
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div>
                    <span className="text-industrial-text-muted block uppercase">Product Line</span>
                    <span className="text-industrial-text font-semibold">MINERAX-HEAVY-CAST</span>
                  </div>
                  <div>
                    <span className="text-industrial-text-muted block uppercase">Standard Grade</span>
                    <span className="text-industrial-text font-semibold">ASTM A216 WCB Steel</span>
                  </div>
                  <div>
                    <span className="text-industrial-text-muted block uppercase">Smelting Temp</span>
                    <span className="text-industrial-text font-semibold">1680°C Max</span>
                  </div>
                  <div>
                    <span className="text-industrial-text-muted block uppercase">Tolerance Spec</span>
                    <span className="text-industrial-text font-semibold">ISO 8062 SF03</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
