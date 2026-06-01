"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/Header";
import ServicesShowcase from "@/components/ServicesShowcase";
import ManufacturingExcellence from "@/components/ManufacturingExcellence";

import QualityCertifications from "@/components/QualityCertifications";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CapabilitiesPage() {
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
              MineraX Manufacturing Capabilities
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-industrial-text">
              Foundry & <span className="text-industrial-steel-medium">Metallurgy</span>
            </h1>
            <p className="text-sm md:text-base text-industrial-text-secondary leading-relaxed">
              Explore our engineering capabilities: from heavy sand casting mold lines to robotic induction melting furnaces and advanced non-destructive microstructure validation.
            </p>
          </motion.div>
        </div>

        {/* 1. Services Showcase */}
        <ServicesShowcase />

        {/* 2. Manufacturing Excellence (SVG pulses) */}
        <ManufacturingExcellence />



        {/* 4. Quality Auditing details */}
        <QualityCertifications />

        {/* CTA */}
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
