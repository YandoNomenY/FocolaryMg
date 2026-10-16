import React from "react";
import { Link } from "react-router-dom";
import {
  Heart,
  Globe,
  Users,
  ArrowRight,
  History,
  Sparkles,
  Landmark,
} from "lucide-react";

export const Mouvement = ({ theme = "light" }) => {
  const isDark = theme === "dark";

  // Styles dynamiques selon le thème
  const containerClasses = isDark
    ? "w-full min-h-screen bg-[#020617] py-20 px-4 md:px-8 text-white"
    : "w-full min-h-screen bg-slate-50 py-20 px-4 md:px-8 text-slate-900";

  return (
    <div
      id="mouvement"
      className={`${containerClasses} flex flex-col items-center justify-center relative overflow-hidden`}
    >
      {/* En-tête de section */}
      <div className="max-w-4xl w-full mx-auto text-center mb-16 space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
            isDark
              ? "bg-slate-900 text-sky-300 border border-slate-800"
              : "bg-blue-100 text-blue-700 border border-blue-200"
          }`}
        >
          <Landmark className="w-4 h-4 text-amber-400" />
          <span>Histoire & Spiritualité</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-black tracking-tight bg-linear-to-r from-blue-500 via-indigo-400 to-amber-400 bg-clip-text text-transparent">
          Le Mouvement des Focolari
        </h2>
        <p
          className={`text-base md:text-lg font-medium max-w-2xl mx-auto ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          « Afin que tous soient un » (Jn 17, 21) — Coopérer à la construction
          d’un monde plus uni dans le respect et la valorisation des diversités.
        </p>
      </div>

      {/* Grille de présentation principale (Objectif & Universalité) */}
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-5 ">
        {/* Carte Objectif */}
        <div
          className={`p-8 rounded-3xl border transition-all duration-300 shadow-xl flex flex-col justify-between ${
            isDark
              ? "bg-slate-900/80 border-slate-800"
              : "bg-white border-slate-200"
          } backdrop-blur-md`}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Globe className="w-6 h-6" />
            </div>
            <h3
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Notre Objectif Fondamental
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Né dans le contexte de l’Église catholique, le Mouvement rassemble
              des chrétiens de diverses Églises et communautés chrétiennes, tout
              en collaborant activement avec des fidèles d’autres religions et
              des personnes de convictions non religieuses.
            </p>
          </div>
        </div>

        {/* Carte Implantation en France */}
        <div
          className={`p-8 rounded-3xl border transition-all duration-300 shadow-xl flex flex-col justify-between ${
            isDark
              ? "bg-slate-900/80 border-slate-800"
              : "bg-white border-slate-200"
          } backdrop-blur-md`}
        >
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <History className="w-6 h-6" />
            </div>
            <h3
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              L'Implantation en France (Dès 1953)
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Diffusé à l'origine grâce à des prêtres de la mission catholique
              italienne (à Chambéry, Grenoble puis Paris), le mouvement s'est
              étendu par la simplicité des liens d’amitié, marquant profondément
              le paysage spirituel et social français dès les années 1950-1960.
            </p>
          </div>
        </div>
      </div>

      {/* Section Histoire détaillée & Développement */}
      <div
        className={`max-w-5xl w-full mx-auto p-8 md:p-12 rounded-3xl border shadow-2xl mb-12 ${
          isDark
            ? "bg-slate-900/90 border-slate-800 text-slate-300"
            : "bg-white border-slate-200 text-slate-700"
        }`}
      >
        <h3
          className={`text-2xl font-bold mb-6 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          De la genèse aux Mariapolis
        </h3>

        <div className="space-y-4 text-sm md:text-base leading-relaxed">
          <p>
            En 1956, le premier <em>focolare</em> (communauté de vie de
            personnes consacrées) s’ouvre à Grenoble, suivi par Paris, Toulouse,
            Lyon, Nice, Strasbourg et Nantes. Malgré un contexte ecclésial
            initialement réservé face aux nouvelles spiritualités, de grandes
            figures comme Marthe Robin et plusieurs évêques (Mgr de Bazelaire,
            Mgr Riobé, Mgr Matagrin, Mgr Huyghes) ont soutenu et encouragé le
            mouvement naissant.
          </p>
          <p>
            À partir de 1963, les <strong>Mariapolis</strong> (rencontres d'été
            annuelles) connaissent un succès croissant à travers la France,
            rassemblant jusqu'à 2 000 participants (jeunes, familles, religieux)
            engagés dans la société (santé, éducation, politique, art, travail).
          </p>
          <p
            className={`pt-2 text-xs font-semibold ${
              isDark ? "text-amber-400" : "text-blue-600"
            }`}
          >
            Aujourd'hui, le mouvement des Focolari est pleinement intégré dans
            le groupe “Familles et Mouvements spirituels” de la Conférence des
            évêques de France.
          </p>
        </div>
      </div>

      {/* Bouton "En savoir plus" */}
      <div>
        <Link
          to="/mouvement/details"
          className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-xl active:scale-95 ${
            isDark
              ? "bg-sky-500 text-slate-950 hover:bg-sky-400 shadow-sky-500/20"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30"
          }`}
        >
          <span>En savoir plus sur notre histoire</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default Mouvement;
