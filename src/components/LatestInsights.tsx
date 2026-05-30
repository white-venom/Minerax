"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

interface InsightPost {
  title: string;
  category: string;
  desc: string;
  date: string;
  readTime: string;
}

const INSIGHTS_DATA: InsightPost[] = [
  {
    title: "The Future of Metal Casting: Hybrid Additive Sand Molds",
    category: "Metallurgy Tech",
    desc: "How integration of binder jet 3D printing with traditional silica sand molding yields complex structural shapes with zero draft angles.",
    date: "May 28, 2026",
    readTime: "6 Min Read",
  },
  {
    title: "Smart Foundries: IoT Sensor Nodes in Smelting Run Cycles",
    category: "Foundry IoT",
    desc: "Deploying high-temperature thermocouple sensors and edge-compute modules to monitor structural ladle wear and pouring speeds.",
    date: "May 22, 2026",
    readTime: "5 Min Read",
  },
  {
    title: "Next-Gen Induction Furnaces: Optimizing Energy Usage",
    category: "Furnace Engineering",
    desc: "Evaluating thyristor inverter control loops that minimize idle energy drain and maintain exact melting heats at peak rates.",
    date: "May 15, 2026",
    readTime: "8 Min Read",
  },
  {
    title: "Robotic Deburring & Trimming in Finishing Sectors",
    category: "Industrial Automation",
    desc: "Standardizing 6-axis robotic arms equipped with force-feedback sensors to perform high-precision gating removal and coating.",
    date: "May 08, 2026",
    readTime: "4 Min Read",
  },
];

export default function LatestInsights() {
  return (
    <section className="py-24 bg-industrial-dark text-white relative overflow-hidden border-t border-industrial-steel-dark/60">
      {/* Background */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-industrial-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-industrial-steel-dark/60">
          <div>
            <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
              11 // Knowledge Center
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
              Latest <span className="text-industrial-steel-light">Insights</span>
            </h2>
          </div>
          <p className="text-industrial-steel-light text-sm max-w-md mt-4 md:mt-0 leading-relaxed font-normal">
            Stay up to date with the latest advancements in steel smelting technologies, industrial casting, and smart factory integrations.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSIGHTS_DATA.map((post, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              key={idx}
              className="bg-industrial-graphite/40 border border-industrial-steel-dark hover:border-industrial-orange/30 rounded-xl p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Card visual accent */}
              <div className="absolute top-0 left-0 w-[3px] h-0 bg-industrial-orange group-hover:h-full transition-all duration-300" />

              <div className="space-y-4 text-left">
                {/* Meta details */}
                <div className="flex justify-between items-center text-[10px] font-mono text-industrial-steel-light">
                  <span className="text-industrial-orange font-semibold tracking-wider uppercase">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-base text-white uppercase tracking-tight leading-tight group-hover:text-industrial-orange transition-colors duration-300 line-clamp-3">
                  {post.title}
                </h3>

                {/* Blurb */}
                <p className="text-xs text-industrial-steel-light leading-relaxed line-clamp-4">
                  {post.desc}
                </p>
              </div>

              {/* Footer link */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-industrial-steel-light group-hover:text-white transition-colors">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </div>
                
                <div className="flex items-center gap-0.5 font-bold text-industrial-orange">
                  READ POST
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
