import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

if (typeof window !== 'undefined') {
  window.THREE = THREE;
}

export const HeroSection = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect && vantaRef.current) {
      const cloudsEffect = typeof CLOUDS === 'function' 
        ? CLOUDS 
        : (CLOUDS.default || window.VANTA?.CLOUDS);

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
    /* Conteneur parent : Arrière-plan dégradé du ciel bleu vers la lumière étincelante (jaune/blanc), puis une nuance neutre en bas */
    <div className="relative w-full h-screen bg-linear-to-b from-[#1baaf1] via-[#fffdf0] to-[#f8fafc] overflow-hidden">
      
      {/* Halo étincelant concentré au centre (sous les nuages) */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle at 50% 60%, rgba(255, 253, 230, 0.9) 0%, rgba(255, 245, 204, 0.6) 35%, transparent 70%)'
        }}
      />

      {/* Vanta avec masque CSS : Les nuages s'estompent pour laisser place à la lumière jaune/blanche */}
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