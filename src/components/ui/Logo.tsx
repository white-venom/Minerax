"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function Logo({ className = "", iconOnly = false, size = "md", color }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 48, text: "text-2xl" },
    lg: { icon: 80, text: "text-4xl" },
  };

  const pixelSize = sizes[size].icon;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/logo.jpg"
        alt="MineraX Logo"
        width={pixelSize}
        height={pixelSize}
        className="object-contain"
        priority
      />

      {!iconOnly && (
        <span
          className={`font-serif font-bold tracking-tight ${sizes[size].text}`}
          style={{ color: color || "#1A1A1A" }}
        >
          mineraX
        </span>
      )}
    </div>
  );
}
