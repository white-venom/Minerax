"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MagneticButton from "@/components/ui/MagneticButton";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Info } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <CustomCursor />
      <Header />

      <main className="relative z-20 min-h-screen bg-industrial-dark text-white pt-32 pb-12">
        {/* Fine Engineering Grid */}
        <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />

        {/* Page Header */}
        <div className="container mx-auto px-6 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-left space-y-4"
          >
            <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block">
              Connect With Metallurgy Experts
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-white">
              Contact <span className="text-industrial-steel-light">MineraX</span>
            </h1>
            <p className="text-sm md:text-base text-industrial-steel-light leading-relaxed">
              Arrange turnkey foundry project consults, outline custom alloys, request detailed machinery specifications, or schedule inspections with our engineering crew.
            </p>
          </motion.div>
        </div>

        {/* Form and Contact Detail Split */}
        <section className="container mx-auto px-6 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 bg-industrial-graphite border border-industrial-steel-dark rounded-xl p-6 md:p-8 glass-panel text-left space-y-6"
            >
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-display font-extrabold text-lg uppercase text-white tracking-wider">
                  metallurgical inquiry form
                </h3>
                <span className="text-[10px] font-mono text-industrial-steel-light">
                  Required: specifications parameters / alloy type selection
                </span>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-5 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-white/40 uppercase tracking-widest block">[ Full Name ]</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      className="w-full bg-industrial-black/85 border border-industrial-steel-dark rounded px-3.5 py-3 text-white focus:outline-none focus:border-industrial-orange transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 uppercase tracking-widest block">[ Business Email ]</label>
                    <input
                      type="email"
                      placeholder="e.g. name@company.com"
                      className="w-full bg-industrial-black/85 border border-industrial-steel-dark rounded px-3.5 py-3 text-white focus:outline-none focus:border-industrial-orange transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-white/40 uppercase tracking-widest block">[ Company Name ]</label>
                    <input
                      type="text"
                      placeholder="e.g. Heavy Gears Ltd"
                      className="w-full bg-industrial-black/85 border border-industrial-steel-dark rounded px-3.5 py-3 text-white focus:outline-none focus:border-industrial-orange transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 uppercase tracking-widest block">[ Alloy Interest ]</label>
                    <select className="w-full bg-industrial-black/85 border border-industrial-steel-dark rounded px-3.5 py-3 text-white focus:outline-none focus:border-industrial-orange transition-colors">
                      <option value="steel">ASTM A216 Cast Steel</option>
                      <option value="iron">Ductile Graphite Iron</option>
                      <option value="bronze">Nickel-Aluminum Bronze</option>
                      <option value="other">Custom Forged Composites</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white/40 uppercase tracking-widest block">[ Technical Specifications Details ]</label>
                  <textarea
                    rows={5}
                    placeholder="Enter dimensional specifications, weight constraints, and expected volume yields..."
                    className="w-full bg-industrial-black/85 border border-industrial-steel-dark rounded px-3.5 py-3 text-white focus:outline-none focus:border-industrial-orange transition-colors"
                  />
                </div>

                <MagneticButton className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-industrial-orange text-white hover:bg-industrial-orange-glow font-display font-semibold uppercase tracking-wider text-xs transition-colors rounded shadow-[0_4px_25px_rgba(255,85,0,0.3)]"
                  >
                    Submit specs
                    <Send className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </form>
            </motion.div>

            {/* Right: Contact Details & Infrastructure Map */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 space-y-6 text-left"
            >
              {/* Detail block */}
              <div className="bg-industrial-graphite/40 border border-industrial-steel-dark rounded-xl p-6 glass-panel space-y-6">
                <span className="font-mono text-[9px] text-industrial-orange uppercase tracking-widest block border-b border-white/5 pb-2">
                  Primary coordinates
                </span>
                
                <ul className="space-y-5 text-xs text-industrial-steel-light">
                  <li className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded bg-industrial-graphite border border-industrial-steel-dark flex items-center justify-center text-industrial-orange flex-shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-white/40 font-mono text-[9px] block">FOUNDRY LOCATION</span>
                      <span className="text-white font-medium block mt-0.5">Heavy Casting Plant VII</span>
                      <span className="text-xs text-industrial-steel-light mt-0.5">84 Forge Road, Pittsburgh, PA 15201</span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded bg-industrial-graphite border border-industrial-steel-dark flex items-center justify-center text-industrial-orange flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-white/40 font-mono text-[9px] block">COMMUNICATIONS NODE</span>
                      <span className="text-white font-medium block mt-0.5">+1 (412) 555-0182</span>
                      <span className="text-xs text-industrial-steel-light mt-0.5">Foundry Admin Office Lines (Mon-Fri)</span>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-9 h-9 rounded bg-industrial-graphite border border-industrial-steel-dark flex items-center justify-center text-industrial-orange flex-shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-white/40 font-mono text-[9px] block">DIGITAL LINK</span>
                      <span className="text-white font-medium block mt-0.5">foundry@minerax.com</span>
                      <span className="text-xs text-industrial-steel-light mt-0.5">Technical & RFP Submissions</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Schematic Map layout */}
              <div className="bg-industrial-graphite/40 border border-industrial-steel-dark rounded-xl p-6 glass-panel relative overflow-hidden flex flex-col justify-center min-h-[220px]">
                <div className="absolute inset-0 engineering-grid-fine opacity-20" />
                
                <svg viewBox="0 0 1000 200" className="w-full h-full stroke-white/5 fill-none stroke-[0.8] absolute inset-0">
                  <path d="M100,50 Q130,20 180,60 T250,70 T300,40 Z" />
                  <path d="M450,80 Q500,40 550,70 T650,50 T750,90 Z" />
                  <circle cx="220" cy="65" r="40" stroke="rgba(255,85,0,0.15)" strokeWidth="0.5" strokeDasharray="3,3" />
                  <circle cx="220" cy="65" r="3" fill="#FF5500" className="animate-ping" />
                  <circle cx="220" cy="65" r="2" fill="#FF5500" />
                  <circle cx="560" cy="55" r="3" fill="#FF5500" className="animate-ping" />
                  <circle cx="560" cy="55" r="2" fill="#FF5500" />
                </svg>

                <div className="relative z-10 bg-industrial-black/90 p-4 border border-industrial-steel-dark rounded text-center space-y-2">
                  <div className="flex gap-2.5 items-center justify-center font-mono text-[10px] text-white">
                    <Info className="w-4 h-4 text-industrial-orange" />
                    <span>SCHEMATIC MAP ONLINE</span>
                  </div>
                  <p className="text-[10px] text-industrial-steel-light leading-relaxed">
                    Map telemetry synced with Primary Forge Node VII. All security checkpoints online.
                  </p>
                </div>
              </div>

            </motion.div>

          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
