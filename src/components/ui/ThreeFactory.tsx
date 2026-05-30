"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

interface Hotspot {
  id: string;
  name: string;
  position: [number, number, number];
  color: string;
  temperature?: string;
  status: string;
  efficiency: string;
  desc: string;
}

const FACTORY_HOTSPOTS: Hotspot[] = [
  {
    id: "furnace",
    name: "Furnace Area",
    position: [-2.2, 0.8, -1.2],
    color: "#FF5500",
    temperature: "1,650°C",
    status: "Active - Melting Phase",
    efficiency: "96.4%",
    desc: "Twin induction melting furnaces running high-capacity smelting for heavy casting processes.",
  },
  {
    id: "casting",
    name: "Casting Line",
    position: [-0.3, 0.6, 0.5],
    color: "#FF9900",
    temperature: "1,380°C",
    status: "Active - Pouring Cycle",
    efficiency: "98.1%",
    desc: "Automated molten metal distribution system supplying high-precision molding carousels.",
  },
  {
    id: "quality",
    name: "Quality Testing Lab",
    position: [2.0, 0.5, -1.5],
    color: "#00E5FF",
    status: "Active - Ultrasonic Scan",
    efficiency: "99.9%",
    desc: "X-ray, ultrasonic, and mechanical stress testers verifying physical integrity against global QA standards.",
  },
  {
    id: "assembly",
    name: "Finishing & Assembly",
    position: [1.8, 0.5, 1.8],
    color: "#39FF14",
    status: "Active - CNC Machining",
    efficiency: "94.2%",
    desc: "Robotic finishing cells performing high-precision deburring, milling, and coating.",
  },
];

function FactoryScene({ activeId, setActiveId }: { activeId: string | null; setActiveId: (id: string | null) => void }) {
  const sceneRef = useRef<THREE.Group>(null);

  // Slow ambient rotation of the entire factory grid when no hotspot is open
  useFrame((state) => {
    if (sceneRef.current && !activeId) {
      sceneRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.15;
    }
  });

  return (
    <group ref={sceneRef}>
      {/* Factory Base Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#16161A"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Structural Columns / Factory Outlines (Schematic styling) */}
      <gridHelper args={[10, 20, "#FF5500", "#2A2A2E"]} position={[0, 0.01, 0]} />

      {/* Furnace Area Mesh (Smelting Vats) */}
      <group position={[-2.2, 0.4, -1.2]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.9, 0.8, 16]} />
          <meshStandardMaterial color="#2E2E35" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.41, 0]}>
          <cylinderGeometry args={[0.7, 0.7, 0.05, 16]} />
          {/* Molten metal top glow */}
          <meshStandardMaterial color="#FF3300" emissive="#FF3300" emissiveIntensity={3} />
        </mesh>
      </group>

      {/* Casting Line (Conveyor + Molds) */}
      <group position={[-0.3, 0.2, 0.5]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.4, 2.5]} />
          <meshStandardMaterial color="#1C1C1F" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* Conveyor track runners */}
        <mesh position={[0, 0.21, 0]} castShadow>
          <boxGeometry args={[0.5, 0.05, 2.3]} />
          <meshStandardMaterial color="#FF8800" emissive="#FF5500" emissiveIntensity={0.5} />
        </mesh>
        {/* Casting Molds */}
        {[-0.8, 0, 0.8].map((z, idx) => (
          <mesh key={idx} position={[0, 0.35, z]} castShadow>
            <boxGeometry args={[0.4, 0.2, 0.4]} />
            <meshStandardMaterial color="#3E3E42" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Quality Testing Lab (Frosted Glass Cube) */}
      <group position={[2.0, 0.4, -1.5]}>
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.8, 1.2]} />
          <meshStandardMaterial
            color="#00E5FF"
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, -0.39, 0]}>
          <boxGeometry args={[1.6, 0.02, 1.3]} />
          <meshStandardMaterial color="#2E2E35" />
        </mesh>
        {/* Laser scanner effect */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.3, 0.02, 0.02]} />
          <meshStandardMaterial color="#00E5FF" emissive="#00E5FF" emissiveIntensity={4} />
        </mesh>
      </group>

      {/* Assembly Area (Robotic Arms and CNC platforms) */}
      <group position={[1.8, 0.3, 1.8]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.9, 0.6, 8]} />
          <meshStandardMaterial color="#2A2A2E" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Stand for robotic arms */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.2, 0.5, 0.2]} />
          <meshStandardMaterial color="#3E3E42" />
        </mesh>
        {/* Jointed arm */}
        <mesh position={[0.15, 0.6, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[0.1, 0.4, 0.1]} />
          <meshStandardMaterial color="#FF5500" />
        </mesh>
      </group>

      {/* Interactive Hotspot Spheres */}
      {FACTORY_HOTSPOTS.map((hotspot) => {
        const isActive = activeId === hotspot.id;
        return (
          <group key={hotspot.id} position={hotspot.position}>
            {/* Glowing outer aura for the hotspot */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(isActive ? null : hotspot.id);
              }}
              className="cursor-pointer"
            >
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshBasicMaterial
                color={hotspot.color}
                transparent
                opacity={0.4}
              />
            </mesh>
            {/* Core pulsator */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(isActive ? null : hotspot.id);
              }}
              className="cursor-pointer"
            >
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={hotspot.color} />
            </mesh>

            {/* Display status HTML card floating over the node when clicked */}
            {isActive && (
              <Html distanceFactor={6} position={[0, 0.6, 0]} zIndexRange={[100, 1000]}>
                <div className="w-[260px] bg-industrial-graphite border border-industrial-steel-medium rounded-lg p-3.5 shadow-2xl glass-panel text-left pointer-events-auto">
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="font-display font-semibold text-white text-sm">{hotspot.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveId(null);
                      }}
                      className="text-industrial-steel-light hover:text-industrial-orange transition-colors text-xs font-mono px-1"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-1 text-[11px] font-mono mb-2">
                    <div className="flex justify-between border-b border-white/5 py-0.5">
                      <span className="text-industrial-steel-light">Status:</span>
                      <span style={{ color: hotspot.color }} className="font-semibold">{hotspot.status}</span>
                    </div>
                    {hotspot.temperature && (
                      <div className="flex justify-between border-b border-white/5 py-0.5">
                        <span className="text-industrial-steel-light">Temp:</span>
                        <span className="text-white">{hotspot.temperature}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-0.5">
                      <span className="text-industrial-steel-light">Efficiency:</span>
                      <span className="text-white">{hotspot.efficiency}</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-industrial-steel-light leading-relaxed border-t border-white/5 pt-2">
                    {hotspot.desc}
                  </p>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function ThreeFactory() {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>("furnace"); // Default open

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-industrial-graphite/40 border border-industrial-steel-dark rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-30" />
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-industrial-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-industrial-steel-light font-display text-sm uppercase tracking-wider">Initializing Virtual Factory Scene...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[550px] bg-industrial-black border border-industrial-steel-dark/60 rounded-xl relative overflow-hidden shadow-2xl">
      {/* Schematic Background overlays */}
      <div className="absolute inset-0 engineering-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 engineering-grid-fine opacity-20 pointer-events-none" />

      {/* Section HUD Header */}
      <div className="absolute top-5 left-5 z-20 flex flex-col pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase">Telemetry Mesh View</span>
        <span className="text-base font-bold text-white tracking-wider font-display uppercase">FOUNDRY AUTOMATION GRID V2.8</span>
      </div>

      {/* Control overlay instruction */}
      <div className="absolute bottom-5 left-5 z-20 pointer-events-none text-left">
        <p className="text-[10px] font-mono text-industrial-steel-light uppercase tracking-wider">
          💡 Click a glowing node to inspect telemetry. Drag to orbit, scroll to zoom.
        </p>
      </div>

      {/* Dynamic Info Panel */}
      <div className="absolute top-5 right-5 z-20 w-64 hidden lg:block pointer-events-none">
        <div className="bg-industrial-graphite/90 border border-industrial-steel-dark rounded-lg p-4 glass-panel text-left">
          <span className="text-[9px] font-mono text-industrial-orange uppercase tracking-widest block mb-1">Sector Telemetry</span>
          <h4 className="text-white font-display font-semibold text-sm mb-2">Operational Overview</h4>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center text-industrial-steel-light border-b border-white/5 pb-1">
              <span>Main Smelter Status</span>
              <span className="text-green-400 font-mono font-semibold">ONLINE</span>
            </div>
            <div className="flex justify-between items-center text-industrial-steel-light border-b border-white/5 pb-1">
              <span>Oxygen Flow Rates</span>
              <span className="text-white font-mono">1,450 m³/h</span>
            </div>
            <div className="flex justify-between items-center text-industrial-steel-light border-b border-white/5 pb-1">
              <span>Emergency Shutoffs</span>
              <span className="text-green-400 font-mono">0 ACTIVE</span>
            </div>
            <div className="flex justify-between items-center text-industrial-steel-light">
              <span>Active Batch Load</span>
              <span className="text-white font-mono">24.5 Tons</span>
            </div>
          </div>
        </div>
      </div>

      <Canvas shadows camera={{ position: [5, 5, 5], fov: 45 }} className="w-full h-full cursor-grab active:cursor-grabbing">
        <color attach="background" args={["#0C0C0E"]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 15, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-8, 12, -8]} intensity={1} />
        
        {/* Internal ambient glow of melting fire */}
        <pointLight position={[-2.2, 0.6, -1.2]} intensity={3} color="#FF4400" />
        <pointLight position={[-0.3, 0.4, 0.5]} intensity={2} color="#FF8800" />

        <FactoryScene activeId={activeId} setActiveId={setActiveId} />

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 2.1} // Do not let user look below ground
          minDistance={3}
          maxDistance={12}
        />
      </Canvas>
    </div>
  );
}
