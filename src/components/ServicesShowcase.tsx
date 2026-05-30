"use client";

import { useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Layers, Flame, Hammer, Cpu, ShieldAlert, ArrowRight } from "lucide-react";

interface ServiceCardProps {
  index: number;
  title: string;
  desc: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  specifications: string[];
}

const SERVICES_DATA = [
  {
    title: "Sand Molding Systems",
    desc: "Advanced automated flaskless and manual sand molding solutions engineered for high productivity and superior casting surface quality.",
    tagline: "High-Speed Mold Cavity Processing",
    icon: Layers,
    specifications: ["Automated Flaskless Molding", "Co2/Cold Box Systems", "Green Sand Reclamation"],
  },
  {
    title: "Melting Furnaces",
    desc: "High-efficiency medium frequency induction furnaces and electric arc furnaces designed for rapid melting and strict temperature control.",
    tagline: "High Energy Yield Efficiency",
    icon: Flame,
    specifications: ["Medium-Frequency Induction", "Precise Thermal Control", "Hydraulic Tilting Chassis"],
  },
  {
    title: "Casting Components",
    desc: "Precision ferrous and non-ferrous casting solutions producing heavy-duty custom structures up to 25 metric tons for heavy engineering.",
    tagline: "High-Tolerance Metallurgical Output",
    icon: Hammer,
    specifications: ["Ductile & Gray Iron Castings", "Alloy Steel Castings", "Microstructural Integrity Verification"],
  },
  {
    title: "Foundry Automation",
    desc: "Smart manufacturing setups integrating robotics for automated pouring, shakeout systems, sand preparation, and conveyor routing.",
    tagline: "Industry 4.0 IoT Connected",
    icon: Cpu,
    specifications: ["Autonomous Ladle Pouring", "Robotic Shakeout Cells", "Cloud-Linked Telemetry Sensors"],
  },
  {
    title: "Maintenance & Support",
    desc: "Comprehensive lifecycle support including refractory relining, thermodynamic calibration, spare parts supply, and site upgrades.",
    tagline: "24/7 Global Field Operations",
    icon: ShieldAlert,
    specifications: ["Refractory Lining Rebuilds", "Diagnostic Thermography", "OEM Spare Parts Supply"],
  },
];

function ServiceCard({ index, title, desc, tagline, icon: Icon, specifications }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    // Set custom CSS variables for the radial hover gradient
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="radial-hover-card glass-panel group p-8 rounded-xl border border-industrial-steel-dark relative overflow-hidden transition-all duration-300 hover:border-industrial-orange/40 hover:-translate-y-1.5 flex flex-col justify-between min-h-[420px]"
    >
      {/* Background Subtle mesh */}
      <div className="absolute inset-0 engineering-grid opacity-[0.03] pointer-events-none" />
      
      {/* Glow highlight top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-industrial-orange/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Top Header */}
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="w-14 h-14 bg-industrial-graphite border border-industrial-steel-medium/40 rounded-lg flex items-center justify-center relative shadow-inner group-hover:border-industrial-orange/50 transition-colors duration-300">
            <div className="absolute inset-0.5 rounded bg-industrial-black opacity-40" />
            <Icon className="w-6 h-6 text-industrial-orange relative z-10 group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-mono text-xs text-industrial-steel-medium/80 font-bold group-hover:text-industrial-orange transition-colors">
            0{index + 1}
          </span>
        </div>

        <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase block mb-1">
          {tagline}
        </span>
        <h3 className="font-display font-extrabold text-xl md:text-2xl text-white tracking-tight uppercase mb-4">
          {title}
        </h3>
        <p className="text-xs text-industrial-steel-light leading-relaxed mb-6">
          {desc}
        </p>
      </div>

      {/* Specs list and action link */}
      <div className="space-y-6">
        <ul className="space-y-2 border-t border-industrial-steel-dark/50 pt-4 font-mono text-[10px] text-industrial-steel-light">
          {specifications.map((spec, sIdx) => (
            <li key={sIdx} className="flex items-center gap-2">
              <span className="w-1 h-1 bg-industrial-orange rounded-full" />
              {spec}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-industrial-orange group-hover:text-white transition-colors duration-300">
          LEARN SYSTEMS
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesShowcase() {
  return (
    <section id="capabilities" className="py-24 bg-industrial-black text-white relative overflow-hidden">
      {/* Background graphic elements */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-industrial-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-industrial-steel-dark/60 pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
              02 // Capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
              Operational <span className="text-industrial-steel-light">Foundry Systems</span>
            </h2>
          </div>
          <p className="text-industrial-steel-light text-sm max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
            Precision engineering solutions built to withstand extreme environments and maintain strict structural integrity specs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((srv, idx) => (
            <ServiceCard 
              key={idx}
              index={idx}
              title={srv.title}
              desc={srv.desc}
              tagline={srv.tagline}
              icon={srv.icon}
              specifications={srv.specifications}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
