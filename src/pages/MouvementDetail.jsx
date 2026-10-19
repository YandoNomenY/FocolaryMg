import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Award, Globe, Heart, History, Landmark, Users, BookOpen, Sun, Moon } from 'lucide-react';
import chiara from "../assets/photos/Chiara.jpg"

export const MouvementDetail = () => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [theme, setTheme] = useState('dark'); // 'dark' par défaut, ou 'light'

  // Animation d'apparition globale de la page au montage
  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsPageLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = theme === 'dark';

  return (
    <div className={`relative w-full min-h-screen transition-all duration-700 ease-out py-16 px-4 sm:px-6 lg:px-8 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    } ${isPageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'}`}>
      
      {/* Bouton de retour vers la page principale en haut à gauche */}
      <div className="absolute top-6 left-6 z-50">
        <Link 
          to="/"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md transition-all text-sm font-semibold shadow-lg active:scale-95 ${
            isDark 
              ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' 
              : 'bg-white/80 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </Link>
      </div>

      {/* Bouton Switch de Thème en haut à droite */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg backdrop-blur-md ${
            isDark 
              ? 'bg-slate-900/80 border-slate-800 text-amber-400 hover:bg-slate-800' 
              : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white'
          }`}
          aria-label="Changer le thème"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="max-w-5xl mx-auto space-y-20 pt-12">
        
        {/* En-tête de la page */}
        <div className="text-center space-y-4">
          
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-linear-to-r from-blue-500 via-indigo-400 to-amber-400 bg-clip-text text-transparent">
            Le Mouvement des Focolari et Sa Fondatrice
          </h1>
          <p className={`max-w-2xl mx-auto text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Découvrez les origines, la vision universelle et l'histoire de l'Œuvre de Marie à travers le monde et en France.
          </p>
        </div>

        {/* SECTION 1 : CHIARA LUBICH */}
        <section className={`border rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            
            {/* Photo et Statut */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl group">
                <img 
                  src={chiara}
                  alt="Chiara Lubich"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-amber-300">Servante de Dieu</span>
                </div>
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <p>1920 – 2008 (88 ans)</p>
                <p className="italic">Procès en béatification ouvert en 2015</p>
              </div>
            </div>

            {/* Biographie & Détails */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Fondatrice</span>
                <h2 className={`text-2xl sm:text-3xl font-black mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Chiara Lubich
                </h2>
              </div>
              
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Née le 22 janvier 1920 à Trente en Italie et décédée le 14 mars 2008 à Rocca di Papa, Chiara Lubich est une activiste catholique et la fondatrice du <strong>Mouvement des Focolari</strong> (Œuvre de Marie) né le 7 décembre 1943 en pleine Seconde Guerre mondiale.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className={`p-4 rounded-xl border space-y-1 ${
                  isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-blue-500 font-bold text-sm">
                    <Award className="w-4 h-4" />
                    <span>Distinctions majeures</span>
                  </div>
                  <ul className={`text-xs space-y-1 pl-6 list-disc ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <li>Prix Templeton (1977)</li>
                    <li>Prix UNESCO de l'éducation à la paix (1996)</li>
                    <li>Prix des droits de l'homme du Conseil de l'Europe (1998)</li>
                  </ul>
                </div>

                <div className={`p-4 rounded-xl border space-y-1 ${
                  isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Users className="w-4 h-4" />
                    <span>Succession & Direction</span>
                  </div>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Dirigée par Chiara Lubich (1944–2008), puis par Maria Voce (2008–2021), et Margaret Karram depuis 2021.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2 : HISTOIRE DU MOUVEMENT DANS LE MONDE */}
        <section className="space-y-8">
          <div className="border-l-4 border-blue-500 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Origine & Universalité</span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Le Mouvement des Focolari (Œuvre de Marie)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border space-y-3 shadow-md ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Portée Mondiale</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Présent dans plus de 180 pays avec plusieurs millions de membres et sympathisants à travers le globe.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 shadow-md ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Objectif Principal</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Promouvoir l'unité et la fraternité universelle, inspiré de la prière biblique « Que tous soient un » (Jn 17,21).
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 shadow-md ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Ouverture & Dialogue</h3>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Rassemble catholiques, chrétiens d'autres confessions, fidèles d'autres religions et personnes sans appartenance religieuse.
              </p>
            </div>
          </div>

          {/* Galerie d'images représentative */}
          <div className="space-y-4 pt-4">
            <h3 className={`text-lg font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              Galerie représentative
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 group shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
                  alt="Communauté et partage" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-end p-3">
                  <span className="text-xs font-semibold text-white">Rassemblements et partage fraternel</span>
                </div>
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 group shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80" 
                  alt="Mariapolis et rencontres" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-end p-3">
                  <span className="text-xs font-semibold text-white">Les Mariapolis d'été</span>
                </div>
              </div>

              <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800 group shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80" 
                  alt="Dialogue et formation" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex items-end p-3">
                  <span className="text-xs font-semibold text-white">Ateliers et engagement sociétal</span>
                </div>
              </div>
            </div>

            {/* Bouton "Voir plus" en dessous de la galerie d'images */}
            <div className="pt-4 text-center sm:text-left">
              <Link 
                to="/actualites" 
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 ${
                  isDark 
                    ? 'bg-slate-900 border border-slate-800 text-blue-400 hover:bg-slate-800' 
                    : 'bg-white border border-slate-200 text-blue-600 hover:bg-slate-100'
                }`}
              >
                <span>Voir plus d'actualités et galeries</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 3 : HISTOIRE DE L'INTÉGRATION EN FRANCE */}
        <section className={`border rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl ${
          isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="border-l-4 border-amber-400 pl-4 space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Implantation historique</span>
            <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Le Mouvement des Focolari en France
            </h2>
          </div>

          <div className={`space-y-4 text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <p>
              Le mouvement des Focolari s’est diffusé en France à compter de <strong>1953</strong> grâce à des prêtres de la mission catholique italienne d'abord à Chambéry, puis à Grenoble et Paris. Ayant découvert ce nouveau courant de vie évangélique en Italie, ils partagèrent leur expérience avec les membres de leur paroisse (ouvriers, commerçants ou employés immigrés italiens).
            </p>
            <p>
              Les premiers Français participèrent aux rencontres d'été des Focolari, les <strong>Mariapolis</strong>, dans les Dolomites (Italie du Nord) en 1955. Profondément marqués par cette expérience de foi et de fraternité, ils commencèrent à essaimer autour d'eux par la simplicité des liens d'amitié.
            </p>
            <p>
              Malgré un contexte initialement frileux face aux nouvelles spiritualités — dans un bouillonnement préconciliaire où émergeaient aussi Madeleine Delbrêl, Taizé et les Foyers de charité —, le mouvement s'étendit dès 1958 à Paris (milieu étudiant grâce au Père de Malmann, aumônier à HEC), à Montauban et en Alsace. En 1956 s'ouvrit le premier <em>focolare</em> à Grenoble, suivi de Paris, Toulouse, Lyon, Nice, Strasbourg et Nantes.
            </p>
            <p>
              Soutenu par des figures telles que <strong>Marthe Robin</strong> et le père Finet, ainsi que par plusieurs évêques (Mgr de Bazelaire, Mgr Riobé, Mgr Matagrin et Mgr Huyghes), le mouvement connut un succès croissant à travers les Mariapolis annuelles dès 1963. Aujourd'hui, il est pleinement intégré dans le groupe « Familles et Mouvements spirituels » de la <strong>Conférence des évêques de France</strong>.
            </p>
          </div>
        </section>

        {/* Bouton de bas de page pour retourner à l'accueil */}
        <div className="text-center pt-8">
          <Link 
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm tracking-wide bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-xl hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retourner à la page d'accueil</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default MouvementDetail;