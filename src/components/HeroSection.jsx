import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';
import MountainLandscape from './MountainLandscape';
import { InfiniteMarquee } from './InfiniteMarquee';
import { Link } from 'react-router-dom';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
}

// ----------------------------------------------------
// CONTENU DU HERO (Texte, Boutons, Badges, etc.)
// ----------------------------------------------------
const HeroContent = ({ theme }) => {
  const isDark = theme === 'dark';

  const myGroups = [
    "Mitia mialoha",
    "Mijery an'i Jesoa ao amin'ny hafa",
    ""
  ]

  return (
    <div className="absolute space-y-20 inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-6 text-center pointer-events-none h-screen ">
      {/* 
        pointer-events-none sur le conteneur parent pour laisser passer le drag/interaction Three.js,
        et pointer-events-auto sur les boutons/liens pour qu'ils restent cliquables.
      */}
      <div className="max-w-4xl mx-auto space-y-6 pointer-events-auto mt-20 ">
        
        {/* Badge d'en-tête */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
          isDark 
            ? 'bg-slate-800/80 text-sky-300 border border-slate-700/60 backdrop-blur-md' 
            : 'bg-white/80 text-sky-700 border border-sky-100 backdrop-blur-md shadow-xs'
        }`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
          </span>
          Plateforme Focolary • Madagascar
        </div>

        {/* Titre principal */}
        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          ...Mba ho iray ihany anie{' '}
          <span className={
            isDark 
              ? 'bg-linear-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent'
              : 'bg-linear-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent'
          }>
            <br /> izy rehetra
          </span>
        </h1>

        {/* Paragraphe descriptif */}
        <p className={`max-w-2xl mx-auto text-base sm:text-lg md:text-xl ${
          isDark ? 'text-slate-300' : 'text-slate-700 font-medium'
        }`}>
          Tongasoa eeh ... Faly mandray anao !
        </p>

        {/* Call To Action (Boutons) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-lg active:scale-95 ${
            isDark 
              ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20' 
              : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/30'
          }`}>
            <Link to="/LoginPage">Se connecter à UniGen</Link>
          </button>

          <button className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm transition-all border backdrop-blur-md active:scale-95 ${
            isDark
              ? 'bg-slate-900/60 text-slate-200 border-slate-700 hover:bg-slate-800/80'
              : 'bg-white/70 text-slate-800 border-slate-200 hover:bg-white/90 shadow-xs'
          }`}>
            Connaitre le Mouvement
          </button>
        </div>
          
      </div>
      <InfiniteMarquee words={myGroups} speed="25s" direction="left" theme={theme}/>
    </div>
  );
};

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

      {/* Dégradé subtil en bas */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-linear-to-t from-[#020617] via-[#020617]/60 to-transparent pointer-events-none z-10" />

      {/* Silhouette sombre de montagne */}
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
  return (
    <div className="relative w-full h-screen">
      {/* 1. Arrière-plan dynamique (Vanta ou Three.js) */}
      {theme === 'light' ? <LightHero /> : <DarkHero />}

      {/* 2. Couche de contenu JSX au-dessus */}
      <HeroContent theme={theme} />
    </div>
  );
};

export default HeroSection;