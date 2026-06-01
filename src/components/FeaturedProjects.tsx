"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Hammer, Layers, ShieldCheck, ChevronRight } from "lucide-react";

interface ProjectItem {
  title: string;
  client: string;
  capacity: string;
  weight: string;
  material: string;
  dimensions: string;
  desc: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    title: "High-Speed Train Bogie Frames",
    client: "Global Rail Transit Corp",
    capacity: "350 Units / Year",
    weight: "2.8 Metric Tons / Part",
    material: "ASTM A216 Cast Steel",
    dimensions: "3200 x 2100 x 850 mm",
    desc: "Precision casting of main structural bogie frames for next-generation passenger rail vehicles, verified by 100% radiographic inspection.",
  },
  {
    title: "Hydroelectric Turbine Runners",
    client: "Alpine Energy Systems",
    capacity: "12 Units / Year",
    weight: "18.5 Metric Tons / Part",
    material: "Grade 410 Stainless Steel",
    dimensions: "Ø 4200 mm, H 1500 mm",
    desc: "Single-pour heavy casting of massive hydro-power impeller blades with complex aerodynamic curvatures and high cavitation resistance.",
  },
  {
    title: "Heavy Excavator Chassis Booms",
    client: "Apex Mining Equipment",
    capacity: "500 Units / Year",
    weight: "6.2 Metric Tons / Part",
    material: "Spheroidal Graphite Iron 700/2",
    dimensions: "5800 x 1200 x 1400 mm",
    desc: "High-impact ductile iron boom sections cast for heavy hydraulic excavators running in abrasive gold mining sites.",
  },
  {
    title: "Marine Propeller Hubs",
    client: "Transatlantic Shipbuilders",
    capacity: "45 Units / Year",
    weight: "12.0 Metric Tons / Part",
    material: "Nickel-Aluminum Bronze",
    dimensions: "Ø 2800 mm, H 1800 mm",
    desc: "Corrosion-resistant heavy propeller shaft sleeves and hubs cast for container ships, satisfying DNV-GL classification requirements.",
  },
];

export default function FeaturedProjects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-white text-industrial-text relative overflow-hidden border-t border-industrial-border">
      {/* Background elements */}
      <div className="absolute inset-0 engineering-grid opacity-[0.15] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-industrial-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-industrial-border">
          <div>
            <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
              08 // Portfolio
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-industrial-text tracking-tight uppercase">
              Featured <span className="text-industrial-steel-medium">Projects</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <span className="text-xs font-mono text-industrial-text-secondary hidden md:inline">
              [ Drag cards to explore or scroll right ]
            </span>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded border border-industrial-border flex items-center justify-center hover:border-industrial-orange hover:text-industrial-orange transition-colors group"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Horizontal Drag Carousel */}
        <motion.div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-none cursor-grab active:cursor-grabbing snap-x select-none"
          whileTap={{ cursor: "grabbing" }}
        >
          {PROJECTS_DATA.map((proj, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[310px] md:w-[420px] bg-industrial-bg-alt border border-industrial-border rounded-xl p-6 md:p-8 flex flex-col justify-between snap-start relative group shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Corner mechanical visual */}
              <div className="absolute top-0 right-0 w-12 h-12 bg-industrial-border border-b border-l border-industrial-border rounded-bl-lg flex items-center justify-center font-mono text-[10px] text-industrial-text-muted">
                P-0{idx + 1}
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase block mb-2">
                  {proj.client}
                </span>
                <h3 className="font-display font-extrabold text-lg md:text-xl text-industrial-text uppercase tracking-tight mb-4 pr-10">
                  {proj.title}
                </h3>
                <p className="text-xs text-industrial-text-secondary leading-relaxed mb-6">
                  {proj.desc}
                </p>
              </div>

              {/* Specs Table */}
              <div className="space-y-4 border-t border-industrial-border pt-6">
                <div className="grid grid-cols-2 gap-y-3 font-mono text-[10px]">
                  <div>
                    <span className="text-industrial-text-muted block">Component Weight</span>
                    <span className="text-industrial-text font-semibold">{proj.weight}</span>
                  </div>
                  <div>
                    <span className="text-industrial-text-muted block">Material Grade</span>
                    <span className="text-industrial-text font-semibold">{proj.material}</span>
                  </div>
                  <div>
                    <span className="text-industrial-text-muted block">Dimensions</span>
                    <span className="text-industrial-text font-semibold">{proj.dimensions}</span>
                  </div>
                  <div>
                    <span className="text-industrial-text-muted block">Casting Yield</span>
                    <span className="text-industrial-orange font-semibold">{proj.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-mono font-semibold text-industrial-orange mt-2">
                  VERIFY BLUEPRINT
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
