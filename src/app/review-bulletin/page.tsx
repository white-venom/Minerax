"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/Header";
import LatestInsights from "@/components/LatestInsights";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function ReviewBulletinPage() {
  return (
    <>
      <CustomCursor />
      <Header />

      <main className="relative z-20 min-h-screen bg-industrial-bg text-industrial-text pt-32">
        {/* Fine Engineering Grid */}
        <div className="absolute inset-0 engineering-grid opacity-20 pointer-events-none" />

        {/* Page Header */}
        <div className="container mx-auto px-6 py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-left space-y-4"
          >
            <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block">
              Foundry Intelligence & Reports
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-industrial-text">
              Review <span className="text-industrial-steel-medium">Bulletin</span>
            </h1>
            <p className="text-sm md:text-base text-industrial-text-secondary leading-relaxed">
              Stay up to date with metallurgical engineering breakthroughs, whitepapers, automated casting diagnostics, and recent project case reviews published by the MineraX research team.
            </p>
          </motion.div>
        </div>

        {/* Core Insights Component */}
        <div className="-mt-12">
          <LatestInsights />
        </div>

        {/* Engineering Archives Section */}
        <section className="py-24 bg-white border-t border-industrial-border relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-4xl text-left space-y-12">
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-center">
              Technical Archive & Press Releases
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-industrial-border pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-industrial-orange uppercase tracking-wider block">BULLETIN #084 // Q2 2026</span>
                  <h3 className="text-lg font-bold uppercase mt-1">MineraX Expands High-Chromium Casting Capabilities</h3>
                  <p className="text-xs text-industrial-text-secondary mt-1">Details on our new induction furnace calibration supporting custom high-alloy chrome pours for abrasive mining environments.</p>
                </div>
                <span className="text-[10px] font-mono bg-industrial-bg px-3 py-1.5 border border-industrial-border rounded flex-shrink-0 text-industrial-steel-medium">PDF [2.4 MB]</span>
              </div>

              <div className="border-b border-industrial-border pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-mono text-industrial-orange uppercase tracking-wider block">REPORT #081 // Q1 2026</span>
                  <h3 className="text-lg font-bold uppercase mt-1">Annual Metallurgical Defect Analysis & Reduction Study</h3>
                  <p className="text-xs text-industrial-text-secondary mt-1">A review of simulated solidification kinetics showing how revised runner structures cut gas porosity by 9.4%.</p>
                </div>
                <span className="text-[10px] font-mono bg-industrial-bg px-3 py-1.5 border border-industrial-border rounded flex-shrink-0 text-industrial-steel-medium">PDF [4.8 MB]</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
