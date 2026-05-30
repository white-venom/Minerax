import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MineraX Industries | Premium Metal Casting & Foundry Solutions",
  description: "Global manufacturing leader specializing in sand molding systems, melting furnaces, foundry automation, custom casting, and heavy engineering components.",
  keywords: [
    "metal casting",
    "foundry systems",
    "induction furnaces",
    "sand molding",
    "heavy engineering",
    "foundry automation",
    "metallurgy",
  ],
  authors: [{ name: "MineraX Industries" }],
  openGraph: {
    title: "MineraX Industries | Premium Metal Casting & Foundry Solutions",
    description: "Engineering Strength. Casting Excellence. Global industrial foundry supplier.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
