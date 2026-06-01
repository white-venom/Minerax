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
  { label: "Certification", href: "/certification" },
  { label: "Blogs", href: "/review-bulletin" },
  { label: "About Us", href: "/about" },
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
          ? "bg-white/90 backdrop-blur-md py-4 border-industrial-border shadow-sm"
          : "bg-white/40 backdrop-blur-sm py-5 border-industrial-border/40"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Technical branding logo */}
        <Link href="/" className="flex items-center group">
          <Logo size="md" iconOnly={true} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-mono text-xs text-industrial-steel-medium hover:text-industrial-orange uppercase tracking-wider transition-colors duration-200"
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
              className="inline-flex items-center gap-1.5 px-5 py-2.5 industrial-plate-btn text-xs font-mono rounded-none"
            >
              Get a Quote
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </MagneticButton>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 border border-industrial-border flex items-center justify-center text-industrial-text rounded hover:border-industrial-orange transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white/95 backdrop-blur-md border-b border-industrial-border py-6 px-6 shadow-lg flex flex-col gap-5 text-left transition-all">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-mono text-sm text-industrial-steel-medium hover:text-industrial-orange uppercase tracking-wider transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 industrial-plate-btn text-xs font-mono text-center rounded-none block"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
