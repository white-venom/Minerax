"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Train, Construction, Box, Zap, Mountain, HardHat, ShieldAlert } from "lucide-react";

interface IndustryItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  specText: string;
  svgWireframe: React.ReactNode;
}

const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "auto",
    name: "Automotive",
    desc: "Supplying high-volume casting components including engine cylinder blocks, suspension brackets, and transmission casings under high structural tolerances.",
    icon: Car,
    specText: "Alloy Steel / Nodular Iron Spec",
    svgWireframe: (
      <svg viewBox="0 0 100 80" className="w-full h-full stroke-industrial-orange/10 group-hover:stroke-industrial-orange/30 transition-all fill-none stroke-[0.8] duration-500">
        <circle cx="25" cy="55" r="10" />
        <circle cx="75" cy="55" r="10" />
        <path d="M10,50 L20,30 L65,30 L80,45 L90,50 L90,58 L85,58 M65,55 H35 M15,55 H10" />
        <line x1="20" y1="30" x2="25" y2="55" />
        <line x1="65" y1="30" x2="75" y2="55" />
      </svg>
    ),
  },
  {
    id: "rail",
    name: "Railways",
    desc: "Cast steel bolsters, side frames, wheel hubs, and railway frog points designed to withstand severe vibrations and heavy tonnage stresses.",
    icon: Train,
    specText: "EN 13674-1 Compliance",
    svgWireframe: (
      <svg viewBox="0 0 100 80" className="w-full h-full stroke-industrial-orange/10 group-hover:stroke-industrial-orange/30 transition-all fill-none stroke-[0.8] duration-500">
        <line x1="10" y1="60" x2="90" y2="60" strokeWidth="2" />
        <line x1="10" y1="68" x2="90" y2="68" strokeWidth="2" />
        {[20, 35, 50, 65, 80].map((x) => (
          <line key={x} x1={x} y1="58" x2={x} y2="70" />
        ))}
        <rect x="30" y="25" width="40" height="25" />
      </svg>
    ),
  },
  {
    id: "infra",
    name: "Infrastructure",
    desc: "Heavy structural joints, bridge nodes, nodes for structural grid shells, and pile caps facilitating massive architectural spans.",
    icon: Construction,
    specText: "AISC Steel Grade Standards",
    svgWireframe: (
      <svg viewBox="0 0 100 80" className="w-full h-full stroke-industrial-orange/10 group-hover:stroke-industrial-orange/30 transition-all fill-none stroke-[0.8] duration-500">
        <path d="M10,60 L50,15 L90,60" />
        <line x1="10" y1="60" x2="90" y2="60" />
        <line x1="30" y1="60" x2="30" y2="38" />
        <line x1="50" y1="60" x2="50" y2="15" />
        <line x1="70" y1="60" x2="70" y2="38" />
        <line x1="10" y1="60" x2="50" y2="60" strokeDasharray="2,2" />
      </svg>
    ),
  },
  {
    id: "machinery",
    name: "Heavy Machinery",
    desc: "Foundry castings for excavator frames, crane counterweights, hydraulic cylinders, and turbine casings operating under excessive pressures.",
    icon: Box,
    specText: "Heavy ISO Fatigue Standard",
    svgWireframe: (
      <svg viewBox="0 0 100 80" className="w-full h-full stroke-industrial-orange/10 group-hover:stroke-industrial-orange/30 transition-all fill-none stroke-[0.8] duration-500">
        <circle cx="35" cy="40" r="15" />
        <circle cx="65" cy="40" r="10" />
        <circle cx="35" cy="40" r="5" />
        <circle cx="65" cy="40" r="3" />
        <line x1="35" y1="20" x2="65" y2="28" />
        <line x1="35" y1="60" x2="65" y2="52" strokeDasharray="3,3" />
      </svg>
    ),
  },
  {
    id: "energy",
    name: "Energy",
    desc: "Wind turbine rotor hubs, generator casings, hydroelectric runner blades, and thermal steam pipe elbows built for longevity.",
    icon: Zap,
    specText: "Thermodynamic Stress Tolerant",
    svgWireframe: (
      <svg viewBox="0 0 100 80" className="w-full h-full stroke-industrial-orange/10 group-hover:stroke-industrial-orange/30 transition-all fill-none stroke-[0.8] duration-500">
        <line x1="50" y1="70" x2="50" y2="35" strokeWidth="2" />
        <circle cx="50" cy="35" r="4" />
        <path d="M50,35 L30,10 L32,8 Z" />
        <path d="M50,35 L75,25 L73,22 Z" />
        <path d="M50,35 L45,60 L40,58 Z" />
      </svg>
    ),
  },
  {
    id: "mining",
    name: "Mining",
    desc: "Crusher jaws, cone liners, ball mill heads, and scraper blades formulated with manganese alloys to minimize abrasive wear.",
    icon: Mountain,
    specText: "Abrasive Wear Resistant Alloy",
    svgWireframe: (
      <svg viewBox="0 0 100 80" className="w-full h-full stroke-industrial-orange/10 group-hover:stroke-industrial-orange/30 transition-all fill-none stroke-[0.8] duration-500">
        <path d="M10,65 L30,25 L50,55 L70,30 L90,65 Z" />
        <line x1="5" y1="65" x2="95" y2="65" />
        <rect x="25" y="20" width="10" height="6" strokeDasharray="1,1" />
      </svg>
    ),
  },
  {
    id: "construction",
    name: "Construction",
    desc: "Custom excavator couplings, structural connectors, and concrete mixer castings manufactured to handle dynamic onsite impact forces.",
    icon: HardHat,
    specText: "High-Tensile Steel",
    svgWireframe: (
      <svg viewBox="0 0 100 80" className="w-full h-full stroke-industrial-orange/10 group-hover:stroke-industrial-orange/30 transition-all fill-none stroke-[0.8] duration-500">
        <rect x="15" y="55" width="25" height="15" />
        <line x1="30" y1="55" x2="50" y2="25" />
        <line x1="50" y1="25" x2="80" y2="25" />
        <circle cx="20" cy="70" r="5" />
        <circle cx="35" cy="70" r="5" />
      </svg>
    ),
  },
  {
    id: "defense",
    name: "Defense",
    desc: "Armored hull segments, tank track shoes, artillery mounts, and tactical gear casings constructed under defense manufacturing compliances.",
    icon: ShieldAlert,
    specText: "MIL-SPEC Metallurgy Standard",
    svgWireframe: (
      <svg viewBox="0 0 100 80" className="w-full h-full stroke-industrial-orange/10 group-hover:stroke-industrial-orange/30 transition-all fill-none stroke-[0.8] duration-500">
        <path d="M50,15 L80,25 C80,50 50,70 50,70 C50,70 20,50 20,25 Z" />
        <circle cx="50" cy="40" r="10" strokeDasharray="3,3" />
        <line x1="50" y1="25" x2="50" y2="55" />
      </svg>
    ),
  },
];

export default function IndustriesServed() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="industries" className="py-24 bg-industrial-dark text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-industrial-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-industrial-steel-dark/60 pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
              05 // Sectors Supplied
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
              Industries <span className="text-industrial-steel-light">We Serve</span>
            </h2>
          </div>
          <p className="text-industrial-steel-light text-sm max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
            Delivering mission-critical metal casting parts engineered specifically for heavy industrial applications globally.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES_DATA.map((ind) => {
            const IconComp = ind.icon;
            const isHovered = hoveredId === ind.id;
            
            return (
              <div
                key={ind.id}
                onMouseEnter={() => setHoveredId(ind.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="bg-industrial-graphite/40 border border-industrial-steel-dark hover:border-industrial-orange/30 rounded-xl p-6 relative overflow-hidden group min-h-[250px] flex flex-col justify-between transition-all duration-300"
              >
                {/* Background Wireframe schematic */}
                <div className="absolute bottom-2 right-2 w-32 h-24 pointer-events-none">
                  {ind.svgWireframe}
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 space-y-3 text-left">
                  <div className="w-10 h-10 rounded bg-industrial-graphite border border-industrial-steel-dark flex items-center justify-center text-industrial-orange group-hover:border-industrial-orange/40 transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider group-hover:text-industrial-orange transition-colors">
                    {ind.name}
                  </h3>
                </div>

                <div className="relative z-10 mt-6">
                  {/* Custom animated expansion on hover */}
                  <div className="h-16 relative overflow-hidden">
                    <AnimatePresence initial={false}>
                      {!isHovered ? (
                        <motion.div
                          key="meta"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-0 left-0 font-mono text-[10px] text-industrial-steel-light uppercase"
                        >
                          <span className="text-white/40 block">Design Spec:</span>
                          {ind.specText}
                        </motion.div>
                      ) : (
                        <motion.p
                          key="desc"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-0 left-0 text-[11px] text-industrial-steel-light leading-normal"
                        >
                          {ind.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Corner details */}
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-industrial-steel-medium group-hover:bg-industrial-orange transition-colors" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
