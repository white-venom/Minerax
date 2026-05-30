"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";
import Logo from "./ui/Logo";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "Industries Served", href: "/industries" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-industrial-black/85 backdrop-blur-md py-4 border-industrial-steel-dark"
          : "bg-transparent py-6 border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Technical branding logo */}
        <Link href="/" className="flex items-center group">
          <Logo size="sm" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-mono text-xs text-industrial-steel-light hover:text-white uppercase tracking-wider transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:block">
          <MagneticButton>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-industrial-orange hover:bg-industrial-orange-glow text-white text-xs font-mono uppercase font-semibold transition-colors rounded shadow-[0_2px_10px_rgba(255,85,0,0.2)]"
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 border border-industrial-steel-medium/30 flex items-center justify-center text-white rounded hover:border-industrial-orange transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-industrial-black/95 border-b border-industrial-steel-dark py-6 px-6 shadow-2xl flex flex-col gap-5 text-left transition-all">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-mono text-sm text-industrial-steel-light hover:text-white uppercase tracking-wider transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-industrial-orange hover:bg-industrial-orange-glow text-white text-xs font-mono uppercase font-semibold text-center rounded transition-colors"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
