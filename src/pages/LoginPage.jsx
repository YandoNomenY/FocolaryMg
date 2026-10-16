import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, ShieldCheck, Users, Network, Hand, Lock } from 'lucide-react';

// Éléments du carrousel basés sur le document de cadrage d'UniGen
const unigenSlides = [
  {
    id: 1,
    title: "Bienvenue sur UniGen",
    subtitle: "Réseau Social de mise en relation & Partage d'Opportunités",
    description: "Une plateforme privée qui connecte les membres d'une organisation, structure leur réseau relationnel et fait circuler toute opportunité : informations, actualités, emplois, stages, activités, projets et collaborations.",
    icon: Hand
  },
  {
    id: 2,
    title: "Architecture des Rôles",
    subtitle: "Acteurs et Gouvernance du système",
    description: "Des membres actifs aux porteurs d'opportunités en passant par les administrateurs et modérateurs, chaque rôle est structuré pour garantir la sécurité, la modération et la fluidité des échanges au sein de la communauté.",
    icon: Users
  },
  {
    id: 3,
    title: "Fonctionnalités Principales",
    subtitle: "Se connecter, s'informer et saisir des opportunités",
    description: "Profitez d'un profil enrichi, d'une recherche multi-critères, d'un fil d'actualités interactif et d'un espace dédié au partage d'opportunités (stages, emplois, projets) avec ciblage d'audience précis.",
    icon: Network
  },
  {
    id: 4,
    title: "Confidentialité & Sécurité",
    subtitle: "Maîtrisez la visibilité de vos données",
    description: "Conçue selon le principe de 'privacy by design', la plateforme vous donne le contrôle fin de la visibilité de vos données personnelles et sécurise les échanges à travers des canaux adaptés.",
    icon: ShieldCheck
  }
];

export const LoginPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // Animation d'apparition globale de la page au montage
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Gestion du changement de slide avec fondu fluide
  const changeSlideString = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(newIndex);
      setIsAnimating(false);
    }, 300); // Durée de la transition de sortie
  };

  // Carrousel automatique (toutes les 5 secondes)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const nextIndex = currentSlide === unigenSlides.length - 1 ? 0 : currentSlide + 1;
      changeSlideString(nextIndex);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

  const handleNextSlide = () => {
    const nextIndex = currentSlide === unigenSlides.length - 1 ? 0 : currentSlide + 1;
    changeSlideString(nextIndex);
  };

  const handlePrevSlide = () => {
    const prevIndex = currentSlide === 0 ? unigenSlides.length - 1 : currentSlide - 1;
    changeSlideString(prevIndex);
  };

  const [credentials, setCredentials] = useState({ identifier: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion avec :", credentials);
  };

  const CurrentIcon = unigenSlides[currentSlide].icon;

  return (
    <div className={`relative w-full min-h-screen bg-slate-950 flex flex-col lg:flex-row overflow-hidden text-slate-100 transition-all duration-700 ease-out ${
      isPageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
    }`}>
      
      {/* Bouton de retour vers la page principale en haut à gauche */}
      <div className="absolute top-6 left-6 z-50">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md transition-all text-sm font-semibold shadow-lg active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </Link>
      </div>

      {/* 1ère SECTION : Présentation d'UniGen en Carrousel avec animation fluide */}
      <div 
        className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/85"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Éléments de design lumineux en arrière-plan */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="pt-12 lg:pt-0">
          <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-amber-300 bg-clip-text text-transparent">
            UniGen
          </span>
        </div>

        {/* Contenu du Carrousel avec classes de transition d'apparition/disparition */}
        <div className="my-auto py-8 relative">
          <div className={`transition-all duration-300 ease-in-out transform space-y-6 ${
            isAnimating ? 'opacity-0 translate-y-4 scale-98' : 'opacity-100 translate-y-0 scale-100'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
              <CurrentIcon className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                {unigenSlides[currentSlide].subtitle}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {unigenSlides[currentSlide].title}
              </h1>
            </div>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              {unigenSlides[currentSlide].description}
            </p>
          </div>

          {/* Contrôles du carrousel */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {unigenSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlideString(index)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    currentSlide === index ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Aller à la diapositive ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handlePrevSlide}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextSlide}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all shadow-md active:scale-95 cursor-pointer"
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Plateforme privée & sécurisée — Document de cadrage officiel[cite: 3]
        </div>
      </div>

      {/* 2ème SECTION : Formulaire de connexion */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen p-8 sm:p-12 lg:p-20 flex flex-col justify-center items-center bg-slate-950">
        <div className="max-w-md w-full mx-auto space-y-8">
          
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight text-white">Connexion à UniGen</h2>
            <p className="text-slate-400 text-sm">
              Entrez vos identifiants pour accéder à votre espace membre.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-300">
                Adresse e-mail ou Numéro de téléphone
              </label>
              <input 
                type="text"
                name="identifier"
                value={credentials.identifier}
                onChange={handleInputChange}
                required
                placeholder="exemple@domaine.mg ou +261..."
                className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-900/50 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-300">
                  Mot de passe
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs font-semibold text-blue-400 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <input 
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                required
                placeholder="••••••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-900/50 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 px-6 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Se connecter</span>
            </button>

          </form>

          <div className="pt-6 border-t border-slate-800/80 text-center">
            <p className="text-sm text-slate-400 mb-3">Nouveau sur la plateforme ?</p>
            <Link 
              to="/register"
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm border border-slate-800 bg-slate-900/80 text-slate-200 hover:bg-slate-800 hover:text-white transition-all block text-center shadow-md active:scale-95"
            >
              Je n'ai pas encore de compte
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LoginPage;