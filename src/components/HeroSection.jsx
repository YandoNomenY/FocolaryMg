import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import MountainLandscape from './MountainLandscape';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
}

// ----------------------------------------------------
// COMPOSANTS MODE SOMBRE (Nuit / Étoiles)
// ----------------------------------------------------
function RotatingStars() {
  const starsRef = useRef();

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.02;
      starsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <group ref={starsRef}>
      <Stars radius={150} depth={60} count={7000} factor={4} saturation={0} fade speed={1.5} />
      <Stars radius={80} depth={30} count={1500} factor={7} saturation={0.5} fade speed={2} />
    </group>
  );
}

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(256, 256, 10, 256, 256, 250);
  gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
  gradient.addColorStop(0.4, 'rgba(124, 58, 237, 0.2)');
  gradient.addColorStop(0.8, 'rgba(15, 23, 42, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);
  return canvas;
}

function CosmicGlow() {
  const [texture] = useState(() => new THREE.CanvasTexture(createGlowTexture()));
  return (
    <mesh position={[0, 0, -50]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} map={texture} />
    </mesh>
  );
}

const DarkHero = () => {
  return (
    <div className="relative w-full h-screen bg-[#020617] overflow-hidden touch-pan-y">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} autoRotate={false} />
        <CosmicGlow />
        <RotatingStars />
      </Canvas>

    {/* 1. Dégradé subtil en bas pour fondre la ligne d'horizon */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-[#020617] via-[#020617]/60 to-transparent pointer-events-none z-10" />

      {/* 2. Silhouette sombre de montagne/forêt */}
      <MountainLandscape />
    </div>
  );
};

// ----------------------------------------------------
// COMPOSANT MODE CLAIR (Ciel bleu / Nuages)
// ----------------------------------------------------
const LightHero = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const cloudsEffect = typeof CLOUDS === 'function' ? CLOUDS : (CLOUDS.default || window.VANTA?.CLOUDS);

      if (cloudsEffect) {
        setVantaEffect(
          cloudsEffect({
            el: vantaRef.current,
            THREE: THREE,
            skyColor: 0x1baaf1,
            cloudColor: 0xffffff,
            cloudShadowColor: 0x183550,
            sunGlareColor: 0xff6600,
            sunColor: 0xf1d35b,
            sunlightColor: 0xff9900,
            speed: 0.50,
            mouseEase: true
          })
        );
      }
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="relative w-full h-screen bg-linear-to-b from-[#1baaf1] via-[#fffdf0] to-[#f8fafc] overflow-hidden">
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(255, 253, 230, 0.9) 0%, rgba(255, 245, 204, 0.6) 35%, transparent 70%)'
        }}
      />
      <div 
        ref={vantaRef} 
        className="w-full h-full relative z-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 80%)'
        }}
      />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-linear-to-b from-transparent to-[#f8fafc] pointer-events-none z-20" />
    </div>
  );
};

// ----------------------------------------------------
// COMPOSANT PRINCIPAL HERO SECTION
// ----------------------------------------------------
export const HeroSection = ({ theme = 'light' }) => {
  return theme === 'light' ? <LightHero /> : <DarkHero />;
};

export default HeroSection;