"use client";
 
import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF, AdaptiveDpr, AdaptiveEvents, Environment } from "@react-three/drei";
import * as THREE from "three";

// Animated heat glow lights that pulse orange/red across the model
function HeatGlowLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);
  const light3 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Pulsing orange heat glow from below
    if (light1.current) {
      light1.current.intensity = 1.5 + Math.sin(t * 1.2) * 1.0;
      light1.current.position.x = Math.sin(t * 0.4) * 2;
    }

    // Slow sweeping ember from the side
    if (light2.current) {
      light2.current.intensity = 0.8 + Math.sin(t * 0.8 + 1.5) * 0.6;
      light2.current.position.z = Math.cos(t * 0.3) * 3;
    }

    // Deep red core pulse
    if (light3.current) {
      light3.current.intensity = 0.5 + Math.sin(t * 2.0 + 3.0) * 0.4;
    }
  });

  return (
    <>
      {/* Main heat glow from below - molten orange */}
      <pointLight ref={light1} position={[0, -2, 0]} color="#FF4500" intensity={1.5} distance={8} decay={2} />
      
      {/* Side ember sweep - warm orange */}
      <pointLight ref={light2} position={[-2, 0, 2]} color="#FF6600" intensity={0.8} distance={6} decay={2} />
      
      {/* Deep red core glow */}
      <pointLight ref={light3} position={[0, 0, -1]} color="#CC2200" intensity={0.5} distance={5} decay={2} />
    </>
  );
}
 
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
      <div className="w-full h-[400px] flex items-center justify-center bg-white border border-transparent rounded-lg relative overflow-hidden">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-industrial-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-industrial-text-secondary font-display text-sm uppercase tracking-wider">Loading 3D Foundry Component...</p>
        </div>
      </div>
    );
  }
 
  return (
    <div ref={containerRef} className="w-full h-[400px] bg-white border-0 rounded-xl relative overflow-hidden">

 
      <div className="absolute bottom-4 right-4 z-20 flex gap-2 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/80 border border-industrial-border/30 rounded text-[10px] font-mono text-industrial-text-secondary">
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
        <color attach="background" args={["#FFFFFF"]} />
        <ambientLight intensity={2.0} />
        <pointLight position={[10, 10, 10]} intensity={2.5} />
        <directionalLight position={[-10, 10, -5]} intensity={2.5} />
        <directionalLight position={[5, 5, 10]} intensity={1.8} />
        
        {/* White rim light for edge definition against white background */}
        <pointLight position={[3, 3, -5]} intensity={2.0} color="#ffffff" />
        
        {/* Heat glow animated lights */}
        <HeatGlowLights />
        
        <Suspense fallback={null}>
          {/* Procedural environment map for premium metallic reflections (computed once) */}
          <Environment frames={1} resolution={256}>
            <ambientLight intensity={2.0} />
            <pointLight position={[10, 10, 10]} intensity={4.0} />
            <pointLight position={[-10, 5, -10]} intensity={3.0} />
            <pointLight position={[0, -5, 0]} intensity={2.0} color="#FF5500" />
          </Environment>

          <Stage
            intensity={1.5}
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
