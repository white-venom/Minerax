"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "hover" | "click" | "hidden">("default");
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive")
      ) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseDown = () => setCursorType("click");
    const handleMouseUp = () => setCursorType("hover");
    const handleMouseLeave = () => setCursorType("hidden");
    const handleMouseEnter = () => setCursorType("default");

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      width: 32,
      height: 32,
      border: "1px solid rgba(142, 142, 147, 0.4)",
      backgroundColor: "rgba(142, 142, 147, 0.05)",
    },
    hover: {
      width: 48,
      height: 48,
      border: "2px solid rgba(255, 85, 0, 0.8)",
      backgroundColor: "rgba(255, 85, 0, 0.1)",
    },
    click: {
      width: 24,
      height: 24,
      border: "2px solid rgba(255, 85, 0, 1)",
      backgroundColor: "rgba(255, 85, 0, 0.3)",
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={cursorType}
        variants={variants}
        transition={{ type: "tween", duration: 0.1 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-industrial-orange rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block"
        style={{
          x: useSpring(mouseX, { damping: 40, stiffness: 400 }),
          y: useSpring(mouseY, { damping: 40, stiffness: 400 }),
          transform: "translate(12px, 12px)",
        }}
        animate={{
          scale: cursorType === "hover" ? 2 : cursorType === "click" ? 0.5 : 1,
          backgroundColor: cursorType === "hover" ? "#FF6B00" : "#FF5500",
        }}
      />
    </>
  );
}
