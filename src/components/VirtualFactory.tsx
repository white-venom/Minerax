"use client";

import { motion } from "framer-motion";
import ThreeFactory from "./ui/ThreeFactory";

export default function VirtualFactory() {
  return (
    <section className="py-24 bg-industrial-dark text-white relative overflow-hidden">
      {/* Background gridded overlay */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-industrial-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16 pb-8 border-b border-industrial-steel-dark/60">
          <div className="lg:col-span-7">
            <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
              07 // Live Visualizer
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
              Virtual Factory <span className="text-industrial-steel-light">Experience</span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-sm text-industrial-steel-light leading-relaxed">
              Explore our connected foundry facility. Get real-time analytics, thermal indicators, and operational metrics by clicking the telemetry hotspots in our 3D grid.
            </p>
          </div>
        </div>

        {/* 3D Scene Viewport */}
        <div className="w-full">
          <ThreeFactory />
        </div>

        {/* Technical spec indicators underneath */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 font-mono text-[10px] text-industrial-steel-light border-t border-industrial-steel-dark/60 pt-8">
          <div>
            <span className="text-white/40 block mb-1">Foundry Interface</span>
            <span className="text-white font-semibold block">RESTful WebSocket API</span>
            <span className="text-[9px] text-industrial-steel-medium">Port: 8443 (SSL Secure)</span>
          </div>
          <div>
            <span className="text-white/40 block mb-1">IoT Node Count</span>
            <span className="text-white font-semibold block">142 Actuators / Sensors</span>
            <span className="text-[9px] text-industrial-steel-medium">Modbus / EtherNet IP protocols</span>
          </div>
          <div>
            <span className="text-white/40 block mb-1">Sync Latency</span>
            <span className="text-white font-semibold block">Less than 50ms</span>
            <span className="text-[9px] text-industrial-steel-medium">Edge Compute Cluster Active</span>
          </div>
          <div>
            <span className="text-white/40 block mb-1">Safety Override</span>
            <span className="text-green-400 font-semibold block">Triple Redundant SIL3</span>
            <span className="text-[9px] text-industrial-steel-medium">Automatic Vent Interlocks</span>
          </div>
        </div>

      </div>
    </section>
  );
}
