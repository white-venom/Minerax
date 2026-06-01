"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import * as THREE from "three";

function MetalCastingMesh() {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central heavy cylindrical core */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 2.5, 32]} />
        <meshStandardMaterial
          color="#3A3D40"
          roughness={0.25}
          metalness={0.9}
        />
      </mesh>

      {/* Flanged collar top */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
        <meshStandardMaterial
          color="#2C2F31"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Flanged collar bottom */}
      <mesh castShadow receiveShadow position={[0, -1.1, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.3, 32]} />
        <meshStandardMaterial
          color="#2C2F31"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Cross-bore reinforcements */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 3.2, 24]} />
        <meshStandardMaterial
          color="#424549"
          roughness={0.2}
          metalness={0.95}
        />
      </mesh>

      {/* Outer cooling fins (ring discs) */}
      {[ -0.6, -0.2, 0.2, 0.6 ].map((yPos, i) => (
        <mesh key={i} castShadow receiveShadow position={[0, yPos, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.08, 32]} />
          <meshStandardMaterial
            color="#FF5500"
            emissive="#FF2200"
            emissiveIntensity={0.15}
            roughness={0.4}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* Bolting holes/projections on the flange */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const radius = 1.35;
        const x = Math.cos(rad) * radius;
        const z = Math.sin(rad) * radius;
        return (
          <group key={i} position={[x, 1.1, z]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.08, 0.08, 0.35, 8]} />
              <meshStandardMaterial
                color="#8E8E93"
                metalness={1}
                roughness={0.1}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function ThreeCasting() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-industrial-bg-alt border border-industrial-border rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-30" />
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-industrial-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-industrial-text-secondary font-display text-sm uppercase tracking-wider">Loading 3D Foundry Component...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] bg-white border border-industrial-border rounded-xl relative overflow-hidden shadow-md">
      <div className="absolute inset-0 engineering-grid opacity-20 pointer-events-none" />
      <div className="absolute top-4 left-4 z-20 flex flex-col pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase">Active Viewport</span>
        <span className="text-xs font-semibold text-industrial-text tracking-wider font-display">MINERAX-CAST_V4.STP</span>
      </div>

      <div className="absolute bottom-4 right-4 z-20 flex gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/90 border border-industrial-border rounded text-[10px] font-mono text-industrial-text-secondary">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          INTERACTIVE 3D
        </div>
      </div>

      <Canvas shadows camera={{ position: [0, 0, 4], fov: 50 }} className="w-full h-full cursor-grab active:cursor-grabbing">
        <color attach="background" args={["#FAFAFA"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
        <directionalLight position={[-10, 10, -5]} intensity={1.2} />
        
        {/* Soft glowing rim light to represent furnace background */}
        <pointLight position={[-3, -2, -3]} intensity={3} color="#FF5500" />
        
        <Stage
          intensity={0.6}
          environment="studio"
          shadows={{ type: "contact", opacity: 0.6, blur: 2 }}
          adjustCamera={true}
        >
          <MetalCastingMesh />
        </Stage>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
          minDistance={1.5}
          maxDistance={6}
        />
      </Canvas>
    </div>
  );
}
