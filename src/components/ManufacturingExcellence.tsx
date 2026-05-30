"use client";

import { motion } from "framer-motion";
import { Package, Flame, Layers, Drill, ClipboardCheck, Truck, Hammer } from "lucide-react";

interface ProcessStep {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Raw Material",
    desc: "Careful vetting and selection of premium scrap steel, pig iron, and alloying elements.",
    icon: Package,
  },
  {
    title: "Melting",
    desc: "Rapid heating inside medium-frequency induction furnaces to reach precise pouring heats.",
    icon: Flame,
  },
  {
    title: "Molding",
    desc: "Preparation of sand molds using high-pressure flaskless green sand modeling systems.",
    icon: Layers,
  },
  {
    title: "Casting",
    desc: "Controlled automatic pouring of molten steel into pre-formed cavity sand molds.",
    icon: Hammer,
  },
  {
    title: "Finishing",
    desc: "Shakeout, mechanical sorting, robotic deburring, and customized thermal treatments.",
    icon: Drill,
  },
  {
    title: "Quality Control",
    desc: "Ultrasonic scans, physical stress loads, and spectrometer chemical checkoffs.",
    icon: ClipboardCheck,
  },
  {
    title: "Delivery",
    desc: "Final surface protective coatings, packaging, and global logistics dispatch.",
    icon: Truck,
  },
];

export default function ManufacturingExcellence() {
  return (
    <section className="py-24 bg-industrial-black text-white relative overflow-hidden border-y border-industrial-steel-dark/40">
      {/* Background technical layout */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-industrial-steel-dark/40 z-0 hidden lg:block -translate-y-12" />

      {/* SVG Animated Glowing line background for desktop */}
      <div className="absolute top-1/2 left-[8%] right-[8%] h-4 -translate-y-14 z-0 hidden lg:block overflow-hidden pointer-events-none">
        <svg className="w-full h-full" fill="none" viewBox="0 0 1000 10" preserveAspectRatio="none">
          <path 
            d="M0,5 H1000" 
            stroke="#2A2A2E" 
            strokeWidth="3" 
          />
          <path 
            d="M0,5 H1000" 
            stroke="#FF5500" 
            strokeWidth="3" 
            strokeDasharray="20, 40"
            className="animate-[pulseLine_12s_linear_infinite]"
          />
        </svg>
        <style jsx global>{`
          @keyframes pulseLine {
            0% { stroke-dashoffset: 0; }
            100% { stroke-dashoffset: -300; }
          }
        `}</style>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
            06 // Assembly Flow
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase mb-4">
            Manufacturing <span className="text-industrial-steel-light">Excellence</span>
          </h2>
          <p className="text-sm text-industrial-steel-light leading-relaxed">
            A highly integrated, data-driven casting loop ensuring absolute metallurgical consistency from scrap inputs to final shipments.
          </p>
        </div>

        {/* Process chain layout */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 relative z-10">
          {PROCESS_STEPS.map((step, idx) => {
            const IconComp = step.icon;
            
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                key={idx}
                className="flex flex-col items-center text-center group relative"
              >
                {/* Visual Node */}
                <div className="w-16 h-16 rounded-full bg-industrial-graphite border border-industrial-steel-medium/60 flex items-center justify-center relative z-10 mb-5 group-hover:border-industrial-orange transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_20px_rgba(255,85,0,0.15)]">
                  <div className="absolute inset-1 rounded-full bg-industrial-black opacity-60" />
                  
                  {/* Step counter tag */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-industrial-orange border border-industrial-black text-[9px] font-mono font-bold flex items-center justify-center text-white">
                    0{idx + 1}
                  </div>
                  
                  <IconComp className="w-6 h-6 text-industrial-orange group-hover:scale-110 transition-transform duration-300 relative z-10" />
                </div>

                {/* Vertical connecting line for mobile screens */}
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="w-[1.5px] h-10 bg-gradient-to-b from-industrial-orange to-industrial-steel-dark z-0 lg:hidden mb-4" />
                )}

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider group-hover:text-industrial-orange transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-industrial-steel-light leading-relaxed max-w-[180px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
