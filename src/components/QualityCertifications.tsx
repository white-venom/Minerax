"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Microscope, FileClock } from "lucide-react";

interface CertificateProps {
  index: number;
  title: string;
  subtitle: string;
  desc: string;
  regNo: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CERTIFICATES_DATA: CertificateProps[] = [
  {
    index: 0,
    title: "ISO Certification",
    subtitle: "ISO 9001 & ISO 14001",
    desc: "Certified Quality Management System and Environmental controls across all casting loops, furnace operations, and patterns.",
    regNo: "Reg No. FM 632890-QA",
    icon: Award,
  },
  {
    index: 1,
    title: "Quality Testing",
    subtitle: "ASNT Level II / III NDT",
    desc: "Full non-destructive testing capabilities, including ultrasonic testing (UT), magnetic particle (MT), and liquid penetrant (PT) tests.",
    regNo: "ASTM E1444 Compliance",
    icon: Microscope,
  },
  {
    index: 2,
    title: "Safety Standards",
    subtitle: "ISO 45001:2018 OHSMS",
    desc: "Strict occupational health and safety protocols governing molten metal transfers, heat protective gear, and chemical sand handlers.",
    regNo: "Safety Score: 99.8/100",
    icon: ShieldCheck,
  },
  {
    index: 3,
    title: "Manufacturing Compliance",
    subtitle: "PED 2014/68/EU & AD2000",
    desc: "Approved manufacturer of pressure containment casting components for power generation, petrochemicals, and boilers.",
    regNo: "EU Cert No. 0045/2026/PED",
    icon: FileClock,
  },
];

function CertificateCard({ index, title, subtitle, desc, regNo, icon: Icon }: CertificateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel border border-white/5 hover:border-industrial-orange/30 rounded-xl p-6 md:p-8 relative overflow-hidden group flex flex-col justify-between min-h-[300px] transition-all duration-300"
    >
      {/* Gloss reflection overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="w-12 h-12 rounded bg-industrial-graphite border border-industrial-steel-medium/30 flex items-center justify-center text-industrial-orange group-hover:border-industrial-orange/40 transition-colors">
            <Icon className="w-5 h-5 group-hover:scale-115 transition-transform" />
          </div>
          <span className="font-mono text-[9px] text-industrial-orange/70 font-semibold px-2.5 py-1 bg-industrial-orange/10 border border-industrial-orange/20 rounded-full">
            CERTIFIED
          </span>
        </div>

        <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block mb-1">
          {subtitle}
        </span>
        <h3 className="font-display font-extrabold text-lg text-white uppercase tracking-wider mb-3">
          {title}
        </h3>
        <p className="text-xs text-industrial-steel-light leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center font-mono text-[9px] text-industrial-steel-light">
        <span>Authority: TUV Rheinland / ASME</span>
        <span className="text-white font-semibold">{regNo}</span>
      </div>
    </motion.div>
  );
}

export default function QualityCertifications() {
  return (
    <section className="py-24 bg-industrial-dark text-white relative overflow-hidden">
      {/* Background Grids */}
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-industrial-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest text-industrial-orange uppercase block mb-3">
            09 // Compliance
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase mb-4">
            Quality & <span className="text-industrial-steel-light">Certifications</span>
          </h2>
          <p className="text-sm text-industrial-steel-light leading-relaxed">
            MineraX conforms to the most stringent international manufacturing criteria, guaranteeing reliability in critical operations.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTIFICATES_DATA.map((cert) => (
            <CertificateCard 
              key={cert.index}
              index={cert.index}
              title={cert.title}
              subtitle={cert.subtitle}
              desc={cert.desc}
              regNo={cert.regNo}
              icon={cert.icon}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
