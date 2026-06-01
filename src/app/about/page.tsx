"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/Header";
import CompanyIntro from "@/components/CompanyIntro";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function AboutPage() {
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
              About MineraX Industries
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold uppercase tracking-tight text-industrial-text">
              Engineering <span className="text-industrial-steel-medium">Strength</span>
            </h1>
            <p className="text-sm md:text-base text-industrial-text-secondary leading-relaxed">
              Founded in 2006, MineraX has evolved from a local metal casting workshop into a global industrial engineering leader operating automated sand molding lines and high-capacity induction melting furnaces.
            </p>
          </motion.div>
        </div>

        {/* 1. Company Intro (Split Timeline + 3D Casting) */}
        <CompanyIntro />

        {/* 2. Feature highlights */}
        <WhyChooseUs />

        {/* 3. Partner Reviews */}
        <Testimonials />

        {/* CTA */}
        <CallToAction />
      </main>

      <Footer />
    </>
  );
}
