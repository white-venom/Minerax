"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Building2, Star } from "lucide-react";

interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  logoText: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    quote: "MineraX's gray iron casting quality is exceptional. Their microstructural integrity inspections detected zero flaws in our turbine rotor blocks, which saved us weeks of post-machining validation. Their thermodynamic design guidance was crucial.",
    author: "Marcus Vance",
    role: "VP Procurement & Sourcing",
    company: "Vance Heavy Machinery Inc.",
    rating: 5,
    logoText: "VANCE MACHINES",
  },
  {
    id: 2,
    quote: "Our passenger rail carriage program runs on strict milestones. MineraX delivered all 350 custom bogie frame cast structures on schedule. The sand molding tolerances were so exact that we minimized pre-assembly tooling by 15%. Highly recommended.",
    author: "Elena Rostov",
    role: "Chief Manufacturing Officer",
    company: "Rostov Rail System Group",
    rating: 5,
    logoText: "ROSTOV RAILWAYS",
  },
  {
    id: 3,
    quote: "Their furnace capacity and metallurgical engineering capability are top-tier. We requested a custom nickel-bronze composite with high corrosion resistance for maritime propeller hubs, and they developed the precise casting pattern flawlessly.",
    author: "Dr. Aris Thorne",
    role: "Lead Propulsion Designer",
    company: "Aeon Marine Propulsion LLC",
    rating: 5,
    logoText: "AEON PROPULSION",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000); // 6 seconds auto-slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-industrial-black text-white relative overflow-hidden border-t border-industrial-steel-dark/60">
      {/* Background Grids */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-industrial-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
            10 // Client Endorsements
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase mb-4">
            Industrial <span className="text-industrial-steel-light">Partnerships</span>
          </h2>
          <p className="text-sm text-industrial-steel-light leading-relaxed">
            Leading engineering firms and transport conglomerates trust MineraX to deliver heavy castings for mission-critical parts.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative min-h-[350px] flex flex-col justify-between bg-industrial-graphite border border-industrial-steel-dark rounded-2xl p-8 md:p-12 glass-panel shadow-2xl">
          <div className="absolute top-6 right-8 opacity-[0.03] text-white">
            <Quote className="w-40 h-40" />
          </div>

          {/* Testimonial text viewport */}
          <div className="relative overflow-hidden flex-grow flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 text-left"
              >
                {/* Rating stars */}
                <div className="flex gap-1">
                  {Array.from({ length: TESTIMONIALS_DATA[activeIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-industrial-orange fill-industrial-orange" />
                  ))}
                </div>

                <p className="text-base md:text-xl text-white font-medium leading-relaxed italic">
                  "{TESTIMONIALS_DATA[activeIndex].quote}"
                </p>

                <div className="border-t border-white/5 pt-4">
                  <div className="font-display font-bold text-sm text-white uppercase tracking-wider">
                    {TESTIMONIALS_DATA[activeIndex].author}
                  </div>
                  <div className="font-mono text-[10px] text-industrial-steel-light uppercase mt-0.5">
                    {TESTIMONIALS_DATA[activeIndex].role} • <span className="text-industrial-orange font-semibold">{TESTIMONIALS_DATA[activeIndex].company}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Indicators & Logos */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 border-t border-white/5 pt-8">
            {/* Sliding buttons */}
            <div className="flex gap-2.5">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === idx ? "bg-industrial-orange w-8" : "bg-industrial-steel-medium/60"
                  }`}
                />
              ))}
            </div>

            {/* Clients Logo Grid */}
            <div className="flex items-center gap-6 opacity-60">
              <div className="flex items-center gap-2 font-mono text-xs text-industrial-steel-light font-bold">
                <Building2 className="w-4 h-4" />
                {TESTIMONIALS_DATA[activeIndex].logoText}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
