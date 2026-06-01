"use client";
 
import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";
import * as THREE from "three";
 
function MetalCastingMesh() {
  const { scene } = useGLTF("/model.glb");
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <primitive 
      ref={meshRef} 
      object={scene} 
    />
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
 
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} className="w-full h-full cursor-grab active:cursor-grabbing">
        <color attach="background" args={["#FAFAFA"]} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-10, 10, -5]} intensity={1.0} />
        
        {/* Soft glowing rim light to represent furnace background */}
        <pointLight position={[-3, -2, -3]} intensity={1.5} color="#FF5500" />
        
        <Suspense fallback={null}>
          <Stage
            intensity={0.5}
            environment="studio"
            shadows={false}
            adjustCamera={true}
          >
            <MetalCastingMesh />
          </Stage>
        </Suspense>
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
