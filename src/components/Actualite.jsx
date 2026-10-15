import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Calendar, ChevronLeft, MapPin } from 'lucide-react';

// Données fictives d'actualités (à remplacer par vos données ou une prop/API)
const newsData = [
  {
    id: 1,
    title: "Lancement officiel de la nouvelle plateforme Focolary",
    date: "15 Oct 2026",
    lieu: "En ligne",
    description: "Découvrez toutes les fonctionnalités conçues pour faciliter votre parcours et renforcer les liens au sein de notre communauté.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Journée de rassemblement et de partage à Antsirabe",
    date: "08 Oct 2026",
    lieu: "Antsirabe",
    description: "Retour en images sur notre dernière rencontre placée sous le signe de la convivialité, de l'échange et de l'engagement fraternel.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Atelier de formation sur le développement personnel",
    date: "28 Sep 2026",
    lieu: "Antananarivo",
    description: "Un séminaire enrichissant animé par des membres passionnés pour stimuler l'apprentissage, la créativité et le leadership.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Projet solidaire : Action humanitaire dans la région",
    date: "14 Sep 2026",
    lieu: "Région Itasy",
    description: "Nos équipes se sont mobilisées pour venir en aide aux populations locales à travers une distribution de kits essentiels.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Conférence-débat sur l'innovation technologique",
    date: "02 Sep 2026",
    lieu: "Antananarivo",
    description: "Comment les jeunes développeurs peuvent impacter positivement leur environnement grâce aux outils modernes du numérique.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
  }
];

const GAP = 24; // espace entre les cartes (px)

// Nombre de cartes visibles selon la largeur de l'écran
const getItemsPerView = () => {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

export const Actualite = ({ theme = "light" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(getItemsPerView);

  // Dernier index possible : la dernière carte est toujours entièrement visible
  const maxIndex = Math.max(0, newsData.length - itemsPerView);

  // Mise à jour du nombre de cartes visibles au redimensionnement
  useEffect(() => {
    const onResize = () => setItemsPerView(getItemsPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Recale l'index si le nombre de cartes visibles change
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Défilement automatique toutes les 5 secondes
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [isPaused, handleNext, maxIndex]);

  // Largeur d'une carte et décalage par carte (en tenant compte de l'espacement)
  const cardWidth = `calc((100% - ${(itemsPerView - 1) * GAP}px) / ${itemsPerView})`;
  const stepOffset = `calc((100% - ${(itemsPerView - 1) * GAP}px) / ${itemsPerView} + ${GAP}px)`;

  const themeClasses = theme === "light"
    ? "w-full min-h-[600px] bg-blue-500 py-16 px-4 text-slate-900"
    : "w-full min-h-[600px] bg-[#020617] py-16 px-4 text-white";

  const arrowClasses = `absolute top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full transition-all shadow-lg backdrop-blur-md active:scale-95 flex items-center justify-center ${
    theme === 'light'
      ? 'bg-white/80 text-blue-600 hover:bg-white shadow-blue-900/20'
      : 'bg-slate-900/80 text-sky-400 hover:bg-slate-900 border border-slate-800'
  }`;

  return (
    <div className={`${themeClasses} flex flex-col items-center justify-between overflow-hidden relative pt-25`}>

      {/* En-tête de la section */}
      <div className="max-w-7xl w-full mx-auto text-center mb-10" >
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-sm">
          Actualités & Événements
        </h2>
        <p className="mt-2 text-white/80 text-sm md:text-base font-medium">
          Restez informés de nos dernières actualités et ne manquez aucun de nos rendez-vous.
        </p>
      </div>

      {/* Conteneur principal du carrousel avec flèches */}
      <div
        className="max-w-7xl w-full mx-auto relative px-10 md:px-14"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button onClick={handlePrev} className={`${arrowClasses} left-0`} aria-label="Actualité précédente">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        <button onClick={handleNext} className={`${arrowClasses} right-0`} aria-label="Actualité suivante">
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Fenêtre visible : masque le reste, marge verticale pour le survol/ombres */}
        <div className="overflow-hidden pt-3 pb-6">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(calc(-${currentIndex} * ${stepOffset}))`
            }}
          >
            {newsData.map((item) => (
              <div
                key={item.id}
                className="shrink-0"
                style={{ width: cardWidth }}
              >
                <Link
                  to={`/actualites/${item.id}`}
                  className={`group flex flex-col h-full rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${
                    theme === 'light'
                      ? 'bg-white/90 border-blue-300/40 shadow-lg'
                      : 'bg-slate-900/80 border-slate-800 shadow-xl'
                  } backdrop-blur-md`}
                >
                  {/* Photo + date + lieu */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 left-3 flex flex-col items-end gap-1.5">
                      {item.date && (
                        <div className="px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          {item.date}
                        </div>
                      )}
                      {item.lieu && (
                        <div className="max-w-full px-3 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                          <span className="truncate">{item.lieu}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className={`text-lg font-bold line-clamp-2 transition-colors ${
                        theme === 'light' ? 'text-slate-900 group-hover:text-blue-600' : 'text-slate-100 group-hover:text-sky-400'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm line-clamp-3 ${
                        theme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-semibold text-blue-500 group-hover:underline pt-2">
                      <span>Lire la suite</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Indicateurs de position */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Aller à la position ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'w-6 bg-white'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bouton "Voir plus" en bas */}
      <div className="mt-12">
        <Link
          to="/actualites"
          className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-95 ${
            theme === 'light'
              ? 'bg-white text-blue-600 hover:bg-slate-100 shadow-blue-900/10'
              : 'bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-sky-500/20'
          }`}
        >
          <span>Voir toutes les actualités</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default Actualite;
