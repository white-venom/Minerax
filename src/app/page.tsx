"use client";

import { useEffect, useState } from "react";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CompanyIntro from "@/components/CompanyIntro";
import ServicesShowcase from "@/components/ServicesShowcase";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductsPreview from "@/components/ProductsPreview";
import ManufacturingExcellence from "@/components/ManufacturingExcellence";

import FeaturedProjects from "@/components/FeaturedProjects";
import QualityCertifications from "@/components/QualityCertifications";
import Testimonials from "@/components/Testimonials";
import LatestInsights from "@/components/LatestInsights";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  const [scrollWidth, setScrollWidth] = useState("0%");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        setScrollWidth(`${scrolled}%`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Premium Loading Preloader */}
      <Preloader />

      {/* Custom Industrial Laser Cursor */}
      <CustomCursor />

      {/* Top scroll progress hud bar */}
      <div 
        className="scroll-progress" 
        style={{ width: scrollWidth }}
      />

      {/* Sticky Header Navigation */}
      <Header />

      {/* 14 Core Home Page Sections */}
      <main className="relative z-20 min-h-screen">
        {/* 1. Premium Hero Section */}
        <Hero />

        {/* 2. Interactive Company Introduction */}
        <CompanyIntro />

        {/* 3. Services Showcase */}
        <ServicesShowcase />

        {/* 4. Why Choose MineraX */}
        <WhyChooseUs />

        {/* 5. Products Preview Section */}
        <ProductsPreview />

        {/* 7. Manufacturing Excellence Section */}
        <ManufacturingExcellence />



        {/* 9. Featured Projects */}
        <FeaturedProjects />

        {/* 10. Quality & Certifications */}
        <QualityCertifications />

        {/* 11. Testimonials */}
        <Testimonials />

        {/* 12. Latest Insights Section */}
        <LatestInsights />

        {/* 13. Call To Action Section */}
        <CallToAction />
      </main>

      {/* 14. Premium Footer with location blueprint map */}
      <Footer />
    </>
  );
}
