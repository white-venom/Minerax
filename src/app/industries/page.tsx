"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/Header";
import IndustriesServed from "@/components/IndustriesServed";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { HardHat, Anchor, Train } from "lucide-react";

export default function IndustriesPage() {
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
              MineraX Sectors Served
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-industrial-text">
              Heavy Industrial <span className="text-industrial-steel-medium">Applications</span>
            </h1>
            <p className="text-sm md:text-base text-industrial-text-secondary leading-relaxed">
              We design and cast custom critical parts satisfying rigorous regulatory standards for global infrastructure, maritime shipping, transit networks, and renewable power.
            </p>
          </motion.div>
        </div>

        {/* Industries Grid */}
        <IndustriesServed />

        {/* Structural indicators */}
        <section className="py-16 bg-white border-t border-industrial-border">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded bg-industrial-orange-light border border-industrial-orange/20 flex items-center justify-center text-industrial-orange flex-shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm uppercase text-industrial-text tracking-wider">Railways & Transit</h4>
                <p className="text-xs text-industrial-text-secondary mt-1">Casting heavy locomotive bogies, couplers, and wheel hubs with 100% micro-integrity tracking.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded bg-industrial-orange-light border border-industrial-orange/20 flex items-center justify-center text-industrial-orange flex-shrink-0">
                <Anchor className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm uppercase text-industrial-text tracking-wider">Maritime Engineering</h4>
                <p className="text-xs text-industrial-text-secondary mt-1">Supplying marine propeller shaft sleeves, rudder horns, and custom wear bushings in bronze-nickel alloys.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded bg-industrial-orange-light border border-industrial-orange/20 flex items-center justify-center text-industrial-orange flex-shrink-0">
                <HardHat className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm uppercase text-industrial-text tracking-wider">Mining & Earthmoving</h4>
                <p className="text-xs text-industrial-text-secondary mt-1">Ductile spheroidal iron castings for massive excavator dragline links, rock crushers, and chassis booms.</p>
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
