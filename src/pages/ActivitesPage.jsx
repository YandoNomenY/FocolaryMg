import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Sun, Moon, Calendar, ArrowUpRight, 
  Sparkles, Filter, Inbox, ChevronRight 
} from 'lucide-react';
import activitesData from '../data/activitesData.json';

export const ActivitesPage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [selectedFilter, setSelectedFilter] = useState('mariapoly');
  const [selectedYear, setSelectedYear] = useState('ALL');

  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // 1. Filtrage des activités par catégorie
  const currentCategoryData = activitesData.categories[selectedFilter] || {
    title: "Activités",
    description: "Découvrez nos événements passés et à venir."
  };

  const categoryActivities = useMemo(() => {
    return activitesData.activities.filter(act => act.category === selectedFilter);
  }, [selectedFilter]);

  // 2. Recherche de l'activité à venir / la plus proche
  const upcomingActivity = useMemo(() => {
    return categoryActivities.find(act => act.isUpcoming) || null;
  }, [categoryActivities]);

  // 3. Liste des activités passées
  const pastActivities = useMemo(() => {
    return categoryActivities.filter(act => !act.isUpcoming);
  }, [categoryActivities]);

  // 4. Liste dynamique des années disponibles pour le filtre secondaire
  const availableYears = useMemo(() => {
    const years = pastActivities.map(act => act.year);
    return ['ALL', ...Array.from(new Set(years)).sort((a, b) => b - a)];
  }, [pastActivities]);

  // 5. Filtrage des activités passées par année
  const filteredPastActivities = useMemo(() => {
    if (selectedYear === 'ALL') return pastActivities;
    return pastActivities.filter(act => act.year === Number(selectedYear));
  }, [pastActivities, selectedYear]);

  // Options du filtre principal
  const filterTabs = [
    { id: 'mariapoly', label: 'Mariapolis' },
    { id: 'congres', label: 'Congrès' },
    { id: 'casagen', label: 'Casa Gen' },
    { id: 'projet_cim', label: 'Projet CIM' }
  ];

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* SECTION I : HEADER FIXE & NAVIGATION */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark ? 'bg-slate-950/80 border-slate-800/80' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Bouton Retour (Extrémité gauche) */}
          <Link
            to="/"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-xs ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Retour à l'accueil</span>
          </Link>

          <span className="text-sm font-black bg-gradient-to-r from-blue-500 to-amber-400 bg-clip-text text-transparent">
            Focolary.mg — Événements
          </span>

          {/* Switch de Thème (Extrémité droite) */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer shadow-xs active:scale-95 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            aria-label="Changer le thème"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Barre de Filtres Principale en bas du Header */}
        <div className={`border-t px-4 sm:px-6 py-2 overflow-x-auto scrollbar-none ${
          isDark ? 'border-slate-800/60 bg-slate-900/40' : 'border-slate-200/60 bg-slate-100/50'
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2 min-w-max">
            {filterTabs.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedFilter(tab.id);
                    setSelectedYear('ALL'); // Réinitialiser le filtre année
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 ${
                    isActive
                      ? isDark
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                        : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : isDark
                        ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* SECTION II : CONTENU DE LA PAGE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* En-tête dynamique selon le filtre sélectionné */}
        <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
        

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-linear-to-r  pb-3 from-blue-500 via-indigo-400 to-amber-400 bg-clip-text text-transparent">
            {currentCategoryData.title}
          </h1>

          <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {currentCategoryData.description}
          </p>
        </div>

        {/* 1. ACTIVITÉ EN COURS / LA PLUS PROCHE */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Événement à venir | en cours
          </h2>

          {upcomingActivity ? (
            <div 
              onClick={() => navigate(upcomingActivity.redirectUrl)}
              className={`group relative rounded-3xl border overflow-hidden transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1 ${
                isDark 
                  ? 'bg-slate-900/90 border-slate-800 hover:border-blue-500/50' 
                  : 'bg-white border-slate-200 hover:border-blue-500/50'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 h-64 sm:h-80 overflow-hidden relative">
                  <img 
                    src={upcomingActivity.imageUrl} 
                    alt={upcomingActivity.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md">
                    Prochainement
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-lg border ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}>
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>{upcomingActivity.date}</span>
                    </div>

                    <h3 className={`text-2xl font-black group-hover:text-blue-500 transition-colors ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {upcomingActivity.title}
                    </h3>

                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {upcomingActivity.theme}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-between border-t border-slate-800/40">
                    <span className="text-xs font-bold text-blue-500 group-hover:underline flex items-center gap-1">
                      En savoir plus & s'inscrire
                    </span>
                    <div className="p-2.5 rounded-xl bg-blue-600 text-white group-hover:bg-blue-500 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Message si aucune activité n'est programmée */
            <div className={`p-10 rounded-3xl border text-center space-y-3 ${
              isDark ? 'bg-slate-900/40 border-slate-800/80 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
            }`}>
              <Inbox className="w-10 h-10 mx-auto text-slate-500 opacity-60" />
              <h3 className="text-lg font-bold">Aucune activité programmée pour le moment</h3>
              <p className="text-xs max-w-md mx-auto">
                Revenez très bientôt pour découvrir les prochaines dates des événements {currentCategoryData.title}.
              </p>
            </div>
          )}
        </section>

        {/* 2. LISTE DES ACTIVITÉS PASSÉES + FILTRE PAR ANNÉE */}
        <section className="space-y-6 pt-6 border-t border-slate-800/50">
          
          {/* En-tête de section avec filtre d'année */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Historique des activités passées
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Retrouvez les éditions précédentes et leurs thématiques.
              </p>
            </div>

            {/* Filtre par année */}
            {availableYears.length > 1 && (
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <Filter className="w-4 h-4 text-slate-500" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer transition-colors ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-white focus:border-blue-500' 
                      : 'bg-white border-slate-200 text-slate-900 focus:border-blue-500'
                  }`}
                >
                  <option value="ALL">Toutes les années</option>
                  {availableYears.filter(y => y !== 'ALL').map((year) => (
                    <option key={year} value={year}>Année {year}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Grille des cartes passées */}
          {filteredPastActivities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPastActivities.map((act) => (
                <div
                  key={act.id}
                  onClick={() => navigate(act.redirectUrl)}
                  className={`group rounded-2xl border overflow-hidden transition-all duration-300 cursor-pointer shadow-md hover:-translate-y-1 flex flex-col justify-between ${
                    isDark 
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700' 
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={act.imageUrl} 
                        alt={act.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white font-mono text-xs">
                        {act.year}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-500">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{act.date}</span>
                      </div>

                      <h3 className={`text-lg font-bold group-hover:text-blue-500 transition-colors ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {act.title}
                      </h3>

                      <p className={`text-xs leading-relaxed line-clamp-2 ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {act.theme}
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 border-t px-5 flex items-center justify-between text-xs font-bold ${
                    isDark ? 'border-slate-800/80 text-blue-400' : 'border-slate-100 text-blue-600'
                  }`}>
                    <span>Voir le récapitulatif</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`p-8 rounded-2xl border text-center text-xs ${
              isDark ? 'bg-slate-900/30 border-slate-800 text-slate-500' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              Aucun événement passé trouvé pour cette sélection.
            </div>
          )}

        </section>

      </main>
    </div>
  );
};

export default ActivitesPage;