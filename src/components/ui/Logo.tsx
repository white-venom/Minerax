"use client";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  color?: string; // Optional override for dynamic effects (e.g. preloader heat)
}

export default function Logo({ className = "", iconOnly = false, size = "md", color }: LogoProps) {
  const sizes = {
    sm: { icon: "w-8 h-8", text: "text-lg" },
    md: { icon: "w-12 h-12", text: "text-2xl" },
    lg: { icon: "w-20 h-20", text: "text-4xl" },
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dynamic SVG Concentric-Arches Logo — design unchanged */}
      <svg
        viewBox="0 0 110 90"
        className={`${sizes[size].icon} fill-none`}
        stroke={color || "white"}
        strokeWidth="7"
        strokeLinecap="butt"
      >
        {/* Left Concentric Arches */}
        <path d="M12,80 L12,45 A25,25 0 0,1 37,20 L50,20" />
        <path d="M22,80 L22,45 A15,15 0 0,1 37,30 L50,30" />
        <path d="M32,80 L32,45 A5,5 0 0,1 37,40 L50,40" />

        {/* Right Concentric Arches */}
        <path d="M57,80 L57,55 A22,22 0 0,1 79,33 L90,33" />
        <path d="M67,80 L67,55 A12,12 0 0,1 79,43 L90,43" />
        <path d="M77,80 L77,55 A2,2 0 0,1 79,53 L90,53" />
      </svg>

      {!iconOnly && (
        <span
          className={`font-serif lowercase font-bold tracking-tight ${sizes[size].text}`}
          style={{ color: color || "white" }}
        >
          mineraX
        </span>
      )}
    </div>
  );
}
