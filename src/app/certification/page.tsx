"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/Header";
import QualityCertifications from "@/components/QualityCertifications";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CertificationPage() {
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
              Quality Assurance & Compliance
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-industrial-text">
              Standards & <span className="text-industrial-steel-medium">Certifications</span>
            </h1>
            <p className="text-sm md:text-base text-industrial-text-secondary leading-relaxed">
              MineraX Forge maintains the highest international standards in heavy metallurgy. Our processes, facilities, and products are verified by leading global quality bodies.
            </p>
          </motion.div>
        </div>

        {/* Core Certifications Component */}
        <div className="-mt-12">
          <QualityCertifications />
        </div>

        {/* NDT Lab details */}
        <section className="py-24 bg-white border-t border-industrial-border relative overflow-hidden">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tight mb-12 text-center">
              Testing & Metallurgical Validation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4 text-left">
                <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase block">Destructive Testing</span>
                <h3 className="text-xl font-bold uppercase">Mechanical & Chemical Analysis</h3>
                <p className="text-sm text-industrial-text-secondary leading-relaxed">
                  Our internal laboratory performs continuous chemical analysis using optical emission spectrometry. Mechanical testing verifies yield strength, tensile limits, elongation, and charpy impact energy down to -40°C.
                </p>
              </div>
              <div className="space-y-4 text-left">
                <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase block">Non-Destructive Testing</span>
                <h3 className="text-xl font-bold uppercase">Volumetric Integrity Verification</h3>
                <p className="text-sm text-industrial-text-secondary leading-relaxed">
                  We deploy Level II certified inspectors to perform Ultrasonic Testing (UT), Magnetic Particle Testing (MT), and Dye Penetrant Testing (PT) to ensure all delivered castings are free from internal flaws or surface anomalies.
                </p>
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
