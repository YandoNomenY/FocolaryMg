import React from 'react';
import { MapPin, Mail, Phone, Heart, ArrowUp } from 'lucide-react';
import foco from "../assets/logo/foco.png";

export const Footer = ({ theme = "light" }) => {
  const isDark = theme === "dark";

  // Fonction pour remonter tout en haut de la page en douceur
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={`relative w-full border-t transition-colors duration-300 ${
      isDark 
        ? 'bg-[#020617] border-slate-800 text-slate-300' 
        : 'bg-slate-100 border-slate-200 text-slate-700'
    }`}>
      
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Colonne 1 : Logo & Présentation */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
              <img src={foco} alt='Logo Focolary' />
            </div>
            <span className='text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-500 to-amber-300 bg-clip-text text-transparent'>
              Focolary.mg
            </span>
          </div>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Une plateforme moderne et un mouvement engagé pour partager les valeurs de fraternité, d'unité et de développement à Madagascar.
          </p>
        </div>

        {/* Colonne 2 : Navigation rapide (Ancres) */}
        <div className="space-y-4">
          <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Navigation
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#accueil" className="hover:text-blue-500 transition-colors">Accueil</a>
            </li>
            <li>
              <a href="#mouvement" className="hover:text-blue-500 transition-colors">Le Mouvement</a>
            </li>
            <li>
              <a href="#actualites" className="hover:text-blue-500 transition-colors">Actualités</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Colonne 3 : Nos Antennes principales */}
        <div className="space-y-4">
          <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Nos Antennes
          </h4>
          <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <li>Focolary Antananarivo</li>
            <li>Focolary Ambatondrazaka</li>
            <li>Focolary Antsirabe</li>
            <li>Focolary Toamasina</li>
          </ul>
        </div>

        {/* Colonne 4 : Contact rapide */}
        <div className="space-y-4">
          <h4 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Restons connectés
          </h4>
          <div className={`space-y-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>contact@focolary.mg</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>+261 34 00 000 00</span>
            </div>
          </div>
        </div>

      </div>

      {/* Ligne de bas de footer : Copyright & Bouton Retour en haut */}
      <div className={`max-w-7xl mx-auto px-6 py-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
        isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-500'
      }`}>
        <p className="flex items-center gap-1">
          © {new Date().getFullYear()} Tout droit réservé à Focolary.mg 
        </p>

        <button 
          onClick={scrollToTop}
          className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
            isDark 
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800' 
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs'
          }`}
          aria-label="Retour en haut"
        >
          <span>Remonter</span>
          <ArrowUp className="w-4 h-4 text-blue-500" />
        </button>
      </div>

    </footer>
  );
};

export default Footer;