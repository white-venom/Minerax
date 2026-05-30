"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Send, Mail, MapPin, Phone, Linkedin, Twitter, Youtube, Facebook } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import Logo from "./ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-industrial-black text-white pt-20 pb-8 border-t border-industrial-steel-dark relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 engineering-grid opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-industrial-steel-dark/60">
          
          {/* Column 1: Company Logo & Info */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="flex items-center">
              <Logo size="md" />
            </div>

            <p className="text-xs text-industrial-steel-light leading-relaxed max-w-sm">
              MineraX Industries is a premier heavy metallurgy manufacturing firm supplying custom castings, molding lines, and automatic melting furnaces globally.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, url: "#" },
                { icon: Twitter, url: "#" },
                { icon: Youtube, url: "#" },
                { icon: Facebook, url: "#" },
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.url}
                  className="w-8 h-8 rounded border border-industrial-steel-medium/40 flex items-center justify-center text-industrial-steel-light hover:border-industrial-orange hover:text-industrial-orange transition-colors"
                >
                  <soc.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="font-mono text-xs uppercase tracking-widest text-industrial-orange font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono text-industrial-steel-light">
              <li>
                <Link href="/" className="hover:text-white transition-colors">[ Home ]</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">[ Products ]</Link>
              </li>
              <li>
                <Link href="/capabilities" className="hover:text-white transition-colors">[ Capabilities ]</Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-white transition-colors">[ Sectors Served ]</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">[ About Us ]</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">[ Contact Us ]</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="font-mono text-xs uppercase tracking-widest text-industrial-orange font-bold">
              Foundry Locations
            </h4>
            <ul className="space-y-3.5 text-xs text-industrial-steel-light">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-industrial-orange flex-shrink-0 mt-0.5" />
                <span>
                  Heavy Casting Plant VII,<br />
                  84 Forge Road, Industrial Hub,<br />
                  Pittsburgh, PA 15201
                </span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-industrial-orange flex-shrink-0" />
                <span className="font-mono">+1 (412) 555-0182</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-industrial-orange flex-shrink-0" />
                <span className="font-mono">foundry@minerax.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="font-mono text-xs uppercase tracking-widest text-industrial-orange font-bold">
              Technical Bulletins
            </h4>
            <p className="text-[11px] text-industrial-steel-light leading-relaxed">
              Subscribe to receive updates on metallurgical specifications and upcoming product lines.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-industrial-graphite/60 border border-industrial-steel-dark rounded px-3 py-2 text-xs font-mono text-white placeholder-industrial-steel-light/50 focus:outline-none focus:border-industrial-orange transition-colors"
                />
              </div>

              <MagneticButton className="w-full">
                <button
                  type="submit"
                  className="w-full py-2 bg-industrial-orange hover:bg-industrial-orange-glow text-white text-xs font-mono uppercase font-semibold transition-colors rounded flex items-center justify-center gap-1.5"
                >
                  SUBSCRIBE
                  <Send className="w-3.5 h-3.5" />
                </button>
              </MagneticButton>
            </form>
          </div>

        </div>

        {/* Global Locations Map Placeholder (Styled Blueprint Map) */}
        <div className="mt-12 mb-10 text-left">
          <span className="font-mono text-[9px] text-industrial-orange uppercase tracking-widest block mb-3">
            Global Infrastructure Map
          </span>
          <div className="w-full h-48 bg-industrial-graphite/40 border border-industrial-steel-dark rounded-xl relative overflow-hidden glass-panel flex items-center justify-center">
            {/* Fine grids */}
            <div className="absolute inset-0 engineering-grid-fine opacity-25" />
            <div className="absolute inset-0 engineering-grid opacity-10" />
            
            {/* SVG schematic blueprint map */}
            <svg viewBox="0 0 1000 200" className="w-full h-full stroke-white/5 fill-none stroke-[0.8] absolute inset-0">
              {/* Abstract continents wireframe outlines */}
              <path d="M100,50 Q130,20 180,60 T250,70 T300,40 T350,90 Z" />
              <path d="M450,80 Q500,40 550,70 T650,50 T750,90 Z" />
              <path d="M150,110 Q200,160 250,120 T300,130 Z" />
              
              {/* Radar sweeps */}
              <circle cx="220" cy="65" r="40" stroke="rgba(255,85,0,0.15)" strokeWidth="0.5" strokeDasharray="3,3" />
              <circle cx="560" cy="55" r="30" stroke="rgba(255,85,0,0.15)" strokeWidth="0.5" strokeDasharray="3,3" />

              {/* Connected routes */}
              <path d="M220,65 Q390,30 560,55" stroke="rgba(255,85,0,0.25)" strokeDasharray="4,4" />
              <path d="M220,65 Q300,100 250,120" stroke="rgba(255,85,0,0.25)" strokeDasharray="4,4" />

              {/* Active locations pins (Glows) */}
              <circle cx="220" cy="65" r="3" fill="#FF5500" className="animate-ping" />
              <circle cx="220" cy="65" r="2" fill="#FF5500" />
              
              <circle cx="560" cy="55" r="3" fill="#FF5500" className="animate-ping" />
              <circle cx="560" cy="55" r="2" fill="#FF5500" />
              
              <circle cx="250" cy="120" r="3" fill="#FF5500" className="animate-ping" />
              <circle cx="250" cy="120" r="2" fill="#FF5500" />
            </svg>

            <div className="absolute z-10 flex flex-col items-center bg-industrial-black/90 px-4 py-2 border border-industrial-steel-dark rounded font-mono text-[9px] tracking-wide text-industrial-steel-light uppercase">
              <span>Map Overlay: Primary Foundry & Warehouse Nodes</span>
              <span className="text-industrial-orange font-bold mt-0.5">3 Active Stations Online</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-industrial-steel-light">
          <div>
            © {currentYear} MineraX Industries. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">ISO Registry</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
