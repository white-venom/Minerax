"use client";
 
import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, AdaptiveDpr, AdaptiveEvents, Environment } from "@react-three/drei";
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
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    const timer = setTimeout(() => {
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
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
    <div ref={containerRef} className="w-full h-[400px] bg-[#d0d0d0] border border-industrial-border/30 rounded-xl relative overflow-hidden shadow-md">
      <div className="absolute inset-0 engineering-grid opacity-10 pointer-events-none" />
      <div className="absolute top-4 left-4 z-20 flex flex-col pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-industrial-orange uppercase">Active Viewport</span>
        <span className="text-xs font-semibold text-industrial-text tracking-wider font-display">MINERAX-CAST_V4.STP</span>
      </div>
 
      <div className="absolute bottom-4 right-4 z-20 flex gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/70 border border-industrial-border rounded text-[10px] font-mono text-industrial-text-secondary">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          INTERACTIVE 3D
        </div>
      </div>
 
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 50 }} 
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        frameloop={isInView ? "always" : "never"}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={["#d0d0d0"]} />
        <ambientLight intensity={1.8} />
        <pointLight position={[10, 10, 10]} intensity={2.0} />
        <directionalLight position={[-10, 10, -5]} intensity={2.0} />
        <directionalLight position={[5, 5, 10]} intensity={1.5} />
        
        {/* Rim lights for edge definition against grey background */}
        <pointLight position={[-3, -2, -3]} intensity={2.5} color="#FF5500" />
        <pointLight position={[3, 3, -5]} intensity={1.5} color="#ffffff" />
        
        <Suspense fallback={null}>
          {/* Procedural environment map for premium metallic reflections (computed once) */}
          <Environment frames={1} resolution={256}>
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={3.0} />
            <pointLight position={[-10, 5, -10]} intensity={2.0} />
            <pointLight position={[0, -10, 0]} intensity={1.5} color="#FF5500" />
          </Environment>

          <Stage
            intensity={1.2}
            environment={null}
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
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
