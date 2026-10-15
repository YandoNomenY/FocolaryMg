import { Origami } from 'lucide-react';
import React from 'react';

export const InfiniteMarquee = ({ words = [], speed = "30s", direction = "left", theme }) => {
  return (
    <div className="relative max-w-6xl overflow-hidden bg-transparent py-6 mt-10">
      
      {/* Masques de fondu sur les côtés (optionnel pour un effet esthétique) */}
      <div className="absolute left-0 inset-y-0 w-24 bg-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-transparent z-10 pointer-events-none" />

      {/* Conteneur du ruban */}
      <div className="flex w-max">
        {/* Première liste de mots */}
        <div 
          className={`flex items-center gap-8 shrink-0 ${
            direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
          }`}
          style={{ animationDuration: speed }}
        >
          {words.map((group, index) => (
            <div key={`group-1-${index}`} className={`flex items-center gap-8 text-sm md:text-xl font-bold tracking-wider 
                ${theme==='light' ? "text-slate-900 " : "text-white drop-shadow-xl "}
            `}>
              <span className='border-y border-slate-800 py-2'>{group}</span>
              <span className="text-sky-400 text-sm mx-5"><Origami color={"blue"} size={15}/></span> {/* Séparateur */}
            </div>
          ))}
        </div>

        {/* Deuxième liste identique pour assurer la boucle infinie sans saccade */}
        <div 
          aria-hidden="true"
          className={`flex items-center gap-8 shrink-0 ${
            direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
          }`}
          style={{ animationDuration: speed }}
        >
          {words.map((group, index) => (
            <div key={`group-2-${index}`} className={`flex items-center gap-8 text-sm md:text-xl font-bold tracking-wider 
                ${theme==='light' ? "text-slate-900 " : "text-white drop-shadow-xl "}
            `}>
              <span className='border-y border-slate-800 py-2'>{group}</span>
              <span className="text-sky-400 text-sm"><Origami color={"blue"} size={15}/></span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};