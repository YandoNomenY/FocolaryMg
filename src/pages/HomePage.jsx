import Navbar from "../components/NavBar";
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import CLOUDS from 'vanta/dist/vanta.clouds.min';

// Rendre THREE accessible globalement pour Vanta
if (typeof window !== 'undefined') {
  window.THREE = THREE;
}

export const HomePage = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    // Vérification que le ref est bien disponible
    if (!vantaEffect && vantaRef.current) {
      // Si CLOUDS n'est pas directement une fonction, on utilise .default ou window.VANTA
      const cloudsEffect = typeof CLOUDS === 'function' 
        ? CLOUDS 
        : (CLOUDS.default || window.VANTA?.CLOUDS);

      if (cloudsEffect) {
        setVantaEffect(
          cloudsEffect({
            el: vantaRef.current,
            THREE: THREE,
            skyColor: 0x1baaf1,    // Couleur du ciel
            cloudColor: 0xffffff,  // Couleur des nuages
            cloudShadowColor: 0x183550,
            sunGlareColor: 0xff6600,     // Couleur de l'éblouissement solaire
            sunColor: 0xf1d35b,
            sunlightColor: 0xff9900,    // Couleur de la lumière diffusée
            speed: 0.50,            // Vitesse de déplacement des nuages
            mouseEase: true             // Interaction avec la souris
          })
        );
      }
    }

    // Nettoyage lors du démontage du composant
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} className="min-h-screen w-full relative">
      {/* Barre de navigation */}
      <Navbar />
    </div>
  );
};