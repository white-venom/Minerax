"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/Header";
import ProductsPreview from "@/components/ProductsPreview";
import FeaturedProjects from "@/components/FeaturedProjects";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Box } from "lucide-react";

export default function ProductsPage() {
  return (
    <>
      <CustomCursor />
      <Header />

      <main className="relative z-20 min-h-screen bg-industrial-dark text-white pt-32">
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
              MineraX Machinery & Equipment
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-white">
              Industrial <span className="text-industrial-steel-light">Casting Systems</span>
            </h1>
            <p className="text-sm md:text-base text-industrial-steel-light leading-relaxed">
              Explore our line of medium-frequency induction furnaces, high-pressure flaskless sand molding systems, and automated material charging arrays engineered for smart foundries.
            </p>
          </motion.div>
        </div>

        {/* 1. Core Products Spec Grid */}
        <ProductsPreview />

        {/* 2. Featured Projects portfolio using these products */}
        <FeaturedProjects />

        {/* Auxiliary spec indicators */}
        <section className="py-16 bg-industrial-black/40 border-t border-industrial-steel-dark/60">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded bg-industrial-graphite border border-industrial-steel-dark flex items-center justify-center text-industrial-orange flex-shrink-0">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider">PLC Automation Integration</h4>
                <p className="text-xs text-industrial-steel-light mt-1">All machines include Siemens S7-1500 controllers supporting Profinet diagnostics.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded bg-industrial-graphite border border-industrial-steel-dark flex items-center justify-center text-industrial-orange flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider">CE & ASME Certified</h4>
                <p className="text-xs text-industrial-steel-light mt-1">Pressure vessels and induction vats satisfy ASME Sec VIII Div 1 rules.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start text-left">
              <div className="w-10 h-10 rounded bg-industrial-graphite border border-industrial-steel-dark flex items-center justify-center text-industrial-orange flex-shrink-0">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm uppercase text-white tracking-wider">Custom Pattern Design</h4>
                <p className="text-xs text-industrial-steel-light mt-1">Our engineering department delivers 3D CAD patterns optimized for fluid solidification.</p>
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
