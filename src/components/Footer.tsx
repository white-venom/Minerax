"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Send, Mail, MapPin, Phone, Linkedin, Twitter, Youtube, Facebook } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import Logo from "./ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-20 pb-8 border-t border-gray-800 relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 engineering-grid opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-gray-800">
          
          {/* Column 1: Company Logo & Info */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="flex items-center">
              <Logo size="md" color="#FFFFFF" />
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
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
                  className="w-8 h-8 rounded border border-gray-700 flex items-center justify-center text-gray-400 hover:border-industrial-orange hover:text-industrial-orange transition-colors"
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
            <ul className="space-y-2 text-xs font-mono text-gray-400">
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
            <ul className="space-y-3.5 text-xs text-gray-400">
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
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Subscribe to receive updates on metallurgical specifications and upcoming product lines.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-industrial-orange transition-colors"
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

        {/* Global Locations Map Placeholder */}
        <div className="mt-12 mb-10 text-left">
          <span className="font-mono text-[9px] text-industrial-orange uppercase tracking-widest block mb-3">
            Global Infrastructure Map
          </span>
          <div className="w-full h-48 bg-gray-900/60 border border-gray-800 rounded-xl relative overflow-hidden flex items-center justify-center">
            {/* Fine grids */}
            <div className="absolute inset-0 engineering-grid-fine opacity-15" />
            <div className="absolute inset-0 engineering-grid opacity-5" />
            
            {/* SVG schematic blueprint map */}
            <svg viewBox="0 0 1000 200" className="w-full h-full stroke-gray-800 fill-none stroke-[0.8] absolute inset-0">
              <path d="M100,50 Q130,20 180,60 T250,70 T300,40 T350,90 Z" />
              <path d="M450,80 Q500,40 550,70 T650,50 T750,90 Z" />
              <path d="M150,110 Q200,160 250,120 T300,130 Z" />
              
              <circle cx="220" cy="65" r="40" stroke="rgba(255,85,0,0.15)" strokeWidth="0.5" strokeDasharray="3,3" />
              <circle cx="560" cy="55" r="30" stroke="rgba(255,85,0,0.15)" strokeWidth="0.5" strokeDasharray="3,3" />

              <path d="M220,65 Q390,30 560,55" stroke="rgba(255,85,0,0.25)" strokeDasharray="4,4" />
              <path d="M220,65 Q300,100 250,120" stroke="rgba(255,85,0,0.25)" strokeDasharray="4,4" />

              <circle cx="220" cy="65" r="3" fill="#FF5500" className="animate-ping" />
              <circle cx="220" cy="65" r="2" fill="#FF5500" />
              
              <circle cx="560" cy="55" r="3" fill="#FF5500" className="animate-ping" />
              <circle cx="560" cy="55" r="2" fill="#FF5500" />
              
              <circle cx="250" cy="120" r="3" fill="#FF5500" className="animate-ping" />
              <circle cx="250" cy="120" r="2" fill="#FF5500" />
            </svg>

            <div className="absolute z-10 flex flex-col items-center bg-[#1A1A1A]/90 px-4 py-2 border border-gray-800 rounded font-mono text-[9px] tracking-wide text-gray-400 uppercase">
              <span>Map Overlay: Primary Foundry & Warehouse Nodes</span>
              <span className="text-industrial-orange font-bold mt-0.5">3 Active Stations Online</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-500">
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
