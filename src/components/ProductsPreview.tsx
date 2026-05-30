"use client";

import { motion } from "framer-motion";
import { ArrowRight, Settings, Cpu, Disc, Zap, ArrowLeftRight } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  specs: { name: string; value: string }[];
  svgBlueprint: React.ReactNode;
}

const PRODUCTS_DATA: ProductItem[] = [
  {
    id: "molding",
    name: "Sand Molding Machines",
    tagline: "Ultra-High Pressure Flaskless Systems",
    desc: "Next-gen green sand flaskless molding machines offering rapid cycle times and high dimensional accuracy for medium-to-large molds.",
    icon: Settings,
    specs: [
      { name: "Mold Dimensions", value: "675 x 575 x 250 mm" },
      { name: "Output Capacity", value: "180 Molds/Hour" },
      { name: "Squeeze Pressure", value: "1.2 MPa" },
    ],
    svgBlueprint: (
      <svg viewBox="0 0 200 150" className="w-full h-full stroke-industrial-orange fill-none stroke-[1.5] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <rect x="40" y="30" width="120" height="90" rx="4" strokeDasharray="3,3" />
        <line x1="100" y1="20" x2="100" y2="130" strokeWidth="1" />
        <circle cx="100" cy="75" r="30" />
        <line x1="50" y1="50" x2="150" y2="100" />
        <line x1="50" y1="100" x2="150" y2="50" />
        <rect x="75" y="60" width="50" height="30" fill="rgba(255,85,0,0.05)" />
      </svg>
    ),
  },
  {
    id: "furnaces",
    name: "Induction Furnaces",
    tagline: "Medium-Frequency Smelting Vats",
    desc: "Highly efficient induction melting systems integrated with thyristor power supplies, offering low metal loss rates and precise thermal tuning.",
    icon: Zap,
    specs: [
      { name: "Power Rating", value: "750 kW - 12,000 kW" },
      { name: "Capacity Range", value: "1.0 - 25.0 Metric Tons" },
      { name: "Max Temperature", value: "1,750 °C" },
    ],
    svgBlueprint: (
      <svg viewBox="0 0 200 150" className="w-full h-full stroke-industrial-orange fill-none stroke-[1.5] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <circle cx="100" cy="75" r="45" />
        <circle cx="100" cy="75" r="38" strokeDasharray="4,2" />
        <path d="M70,75 L130,75" strokeWidth="3" />
        <path d="M100,45 L100,105" strokeWidth="3" />
        {/* Heat coil lines */}
        <line x1="45" y1="75" x2="35" y2="75" />
        <line x1="155" y1="75" x2="165" y2="75" />
      </svg>
    ),
  },
  {
    id: "lines",
    name: "Casting Lines",
    tagline: "Automated Pouring & Cooling Loops",
    desc: "Synchronized carousel casting loops supporting rapid ladle transfers, cooling ventilation tunnels, and automated mechanical extraction.",
    icon: Cpu,
    specs: [
      { name: "Pouring Rate", value: "85 kg / Second" },
      { name: "Ladle Capacity", value: "Up to 5.0 Tons" },
      { name: "Cooling Path", value: "120 meters loop" },
    ],
    svgBlueprint: (
      <svg viewBox="0 0 200 150" className="w-full h-full stroke-industrial-orange fill-none stroke-[1.5] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <path d="M20,75 C20,30 180,30 180,75 C180,120 20,120 20,75 Z" strokeDasharray="5,3" />
        <circle cx="50" cy="75" r="10" fill="rgba(255,85,0,0.1)" />
        <circle cx="100" cy="75" r="10" fill="rgba(255,85,0,0.1)" />
        <circle cx="150" cy="75" r="10" fill="rgba(255,85,0,0.1)" />
        <path d="M45,75 H155" />
      </svg>
    ),
  },
  {
    id: "equipment",
    name: "Foundry Auxiliary Equipment",
    tagline: "Sand Reclamation & Ladles",
    desc: "Heavy industrial sand mixers, mechanical shakeout grids, and bottom-pour ladles configured to maximize mold-run efficiencies.",
    icon: Disc,
    specs: [
      { name: "Sand Mixing", value: "60 Tons / Hour" },
      { name: "Ladle Tilt", value: "Hydraulic 180° Rotation" },
      { name: "Reclamation Rate", value: "94.5% Sand Reuse" },
    ],
    svgBlueprint: (
      <svg viewBox="0 0 200 150" className="w-full h-full stroke-industrial-orange fill-none stroke-[1.5] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <polygon points="100,20 150,110 50,110" />
        <circle cx="100" cy="75" r="20" strokeDasharray="3,3" />
        <line x1="100" y1="20" x2="100" y2="110" />
        <rect x="85" y="110" width="30" height="20" />
      </svg>
    ),
  },
  {
    id: "handling",
    name: "Material Handling Systems",
    tagline: "Scrap Charging & Conveying",
    desc: "Pre-heating scrap chargers, magnet cranes, and heavy vibratory conveyors engineered to supply furnaces safely.",
    icon: ArrowLeftRight,
    specs: [
      { name: "Conveyor Speed", value: "0.45 meters / Second" },
      { name: "Charging Load", value: "8.5 Tons / Batch" },
      { name: "Magnet Lift", value: "15 Tons Capacity" },
    ],
    svgBlueprint: (
      <svg viewBox="0 0 200 150" className="w-full h-full stroke-industrial-orange fill-none stroke-[1.5] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
        <line x1="20" y1="110" x2="180" y2="110" strokeWidth="2" />
        {/* Conveyor rollers */}
        {[30, 60, 90, 120, 150, 170].map((cx, i) => (
          <circle key={i} cx={cx} cy="118" r="5" />
        ))}
        <rect x="50" y="50" width="60" height="40" fill="rgba(255,85,0,0.05)" />
        <line x1="80" y1="20" x2="80" y2="50" />
      </svg>
    ),
  },
];

export default function ProductsPreview() {
  return (
    <section id="products" className="py-24 bg-industrial-black text-white relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-industrial-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-industrial-steel-dark/60 pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
              04 // Foundry Products
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
              Production <span className="text-industrial-steel-light">Machinery</span>
            </h2>
          </div>
          <p className="text-industrial-steel-light text-sm max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
            MineraX builds world-class foundry machinery and auxiliaries engineered for high output consistency and thermodynamic efficiency.
          </p>
        </div>

        {/* Large Horizontal Cards */}
        <div className="space-y-8">
          {PRODUCTS_DATA.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass-panel border border-industrial-steel-dark hover:border-industrial-orange/40 rounded-xl p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center justify-between transition-all duration-300 relative group overflow-hidden"
            >
              {/* Subtle hover grid reveal */}
              <div className="absolute inset-0 engineering-grid opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none" />

              {/* Left Column: Blueprint Schematic representation */}
              <div className="w-full lg:w-[280px] h-[180px] bg-industrial-graphite/60 border border-industrial-steel-dark/80 rounded-lg flex items-center justify-center relative overflow-hidden flex-shrink-0 group-hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute inset-0 engineering-grid-fine opacity-20" />
                <div className="absolute top-2 left-2 text-[8px] font-mono text-industrial-steel-light uppercase">
                  Cad Model Spec // {product.id.toUpperCase()}_REV2
                </div>
                <div className="w-[180px] h-[130px]">
                  {product.svgBlueprint}
                </div>
              </div>

              {/* Middle Column: Details */}
              <div className="flex-grow space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-industrial-graphite border border-industrial-steel-dark flex items-center justify-center text-industrial-orange group-hover:border-industrial-orange/30 transition-colors">
                    <product.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase block">
                      {product.tagline}
                    </span>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white uppercase tracking-tight">
                      {product.name}
                    </h3>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-industrial-steel-light leading-relaxed max-w-xl">
                  {product.desc}
                </p>
              </div>

              {/* Right Column: Specifications & Button */}
              <div className="w-full lg:w-[320px] flex flex-col md:flex-row lg:flex-col justify-between gap-6 border-t lg:border-t-0 lg:border-l border-industrial-steel-dark/60 pt-6 lg:pt-0 lg:pl-8 flex-shrink-0">
                <div className="space-y-3 flex-grow">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">Operational Specifications</span>
                  <div className="space-y-1.5 text-xs font-mono">
                    {product.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between border-b border-white/5 py-1">
                        <span className="text-industrial-steel-light">{spec.name}</span>
                        <span className="text-white font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-shrink-0 mt-4 md:mt-0 lg:mt-2 self-start md:self-center lg:self-start">
                  <MagneticButton>
                    <a 
                      href="#contact" 
                      className="inline-flex items-center gap-2 px-5 py-3 bg-industrial-graphite border border-industrial-steel-medium hover:border-industrial-orange hover:text-industrial-orange text-white text-xs font-mono uppercase font-semibold transition-all rounded"
                    >
                      REQUEST SPECS
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </MagneticButton>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
