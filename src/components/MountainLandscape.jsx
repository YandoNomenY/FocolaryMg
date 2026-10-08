import React from 'react';

export const MountainLandscape = () => {
  return (
    <div className="absolute bottom-0 inset-x-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
      <svg
        className="relative block w-full h-32 md:h-48 lg:h-64 text-[#000000]"
        viewBox="0 0 1200 200"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arrière-plan de montagnes (couleur sombre intermédiaire) */}
        <path
          fill="currentColor"
          fillOpacity="0.4"
          d="M0,140 L80,120 L180,150 L280,110 L390,145 L500,90 L620,130 L740,100 L860,135 L980,105 L1100,140 L1200,115 L1200,200 L0,200 Z"
        />

        {/* Avant-plan : Montagnes plus proches avec silhouettes d'arbres/sapins */}
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,160 
             L40,145 L50,152 L60,140 L70,155 L100,130 
             L110,138 L120,125 L130,142 L160,150 
             L200,120 L210,128 L220,115 L230,132 L270,145 
             L320,110 L330,120 L340,105 L350,125 L400,150 
             L450,125 L460,135 L470,118 L480,138 L520,155 
             L580,130 L590,140 L600,122 L610,142 L670,160 
             L730,115 L740,125 L750,110 L760,130 L810,150 
             L870,120 L880,130 L890,112 L900,132 L960,155 
             L1020,125 L1030,135 L1040,118 L1050,138 L1120,150 
             L1200,130 L1200,200 L0,200 Z"
        />
      </svg>
    </div>
  );
};

export default MountainLandscape;