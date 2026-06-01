"use client";

import { motion } from "framer-motion";
import { HardHat, Compass, FileCheck2, Lightbulb, Workflow, Clock } from "lucide-react";

interface FeatureCardProps {
  index: number;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const WHY_CHOOSE_DATA = [
  {
    title: "Advanced Manufacturing",
    desc: "Deploying high-speed automated molding lines, induction melting vats, and autonomous robotic trimming cells.",
    icon: HardHat,
  },
  {
    title: "Precision Engineering",
    desc: "Rigorous thermal, fluid, and mechanical structural simulations to design optimized casting geometries.",
    icon: Compass,
  },
  {
    title: "Quality Assurance",
    desc: "Comprehensive QA including spectrometer metal analysis, X-ray scanning, and non-destructive load tests.",
    icon: FileCheck2,
  },
  {
    title: "Industry Expertise",
    desc: "20+ years supplying casting systems to global automotive, railway, marine, mining, and aerospace sectors.",
    icon: Lightbulb,
  },
  {
    title: "Customized Solutions",
    desc: "Agile pattern shop drafting customized dimensions, chemical composites, and thermal treatments for components.",
    icon: Workflow,
  },
  {
    title: "Timely Delivery",
    desc: "Strict logistics routing and dual-foundry scheduling to guarantee on-time turnkey deliveries worldwide.",
    icon: Clock,
  },
];

function FeatureCard({ index, title, desc, icon: Icon }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="p-6 bg-white border border-industrial-border chamfer-card-sm flex gap-4 hover:border-industrial-orange/30 transition-colors duration-300 relative group overflow-hidden shadow-sm"
    >
      {/* Corner mechanical detail */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-industrial-orange/5 rotate-45 translate-x-4 -translate-y-4 group-hover:bg-industrial-orange/10 transition-colors" />
      
      <div className="w-12 h-12 chamfer-card-sm bg-industrial-orange-light border border-industrial-orange/20 flex items-center justify-center flex-shrink-0 group-hover:border-industrial-orange/40 transition-colors">
        <Icon className="w-5 h-5 text-industrial-orange group-hover:scale-110 transition-transform duration-300" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display font-bold text-base text-industrial-text uppercase tracking-wider group-hover:text-industrial-orange transition-colors">
          {title}
        </h3>
        <p className="text-xs text-industrial-text-secondary leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-industrial-bg text-industrial-text relative overflow-hidden">
      {/* Schematic Background */}
      <div className="absolute inset-0 engineering-grid opacity-30 pointer-events-none" />
      <div className="absolute top-10 left-10 w-44 h-44 rounded-full border border-industrial-border border-dashed animate-spin pointer-events-none [animation-duration:20s]" />
      <div className="absolute bottom-1/4 right-5 w-[500px] h-[500px] bg-industrial-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-display font-bold tracking-widest text-industrial-orange uppercase block mb-3">
            04 // Why Choose <span className="normal-case">mineraX</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-industrial-text tracking-tight uppercase mb-4">
            Why Partner With <span className="text-industrial-steel-medium normal-case">mineraX</span>
          </h2>
          <p className="text-sm text-industrial-text-secondary leading-relaxed">
            Delivering the perfect synergy of metallurgical expertise, state-of-the-art foundry machinery, and absolute quality commitment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_DATA.map((feat, idx) => (
            <FeatureCard 
              key={idx}
              index={idx}
              title={feat.title}
              desc={feat.desc}
              icon={feat.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
