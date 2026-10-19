import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import foco from "../assets/logo/foco.png";
import { navbarStyles as style } from "../utils/style";

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");

  // 1. Gestion du style au scroll (Navbar fixe vs absolute) et détection de la section active
  useEffect(() => {
    const handleScroll = () => {
      // Gestion du fond flouté de la navbar
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Détection de la section active selon la position de défilement
      const sections = [
        "accueil",
        "mouvement",
        "actualite",
        "activites",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200; // Décalage pour anticiper le changement

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fonction utilitaire pour appliquer le style actif dynamiquement
  const getLinkClass = (sectionId) => {
    const isActive = activeSection === sectionId;
    const baseStyle =
      style.menuItem ||
      "px-4 py-2 rounded-xl transition-colors cursor-pointer font-medium";

    if (isActive) {
      return `${baseStyle} ${
        theme === "dark"
          ? "text-sky-400 bg-slate-800/60 font-bold"
          : "text-blue-600 bg-blue-50 font-bold shadow-xs"
      }`;
    }
    return `${baseStyle} ${
      theme === "dark"
        ? "text-slate-300 hover:text-white"
        : "text-slate-600 hover:text-slate-900"
    }`;
  };

  return (
    <div
      className={`py-2.5 px-4 md:px-2 left-1/2 -translate-x-1/2 w-full max-w-7xl top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "fixed backdrop-blur-md shadow-lg border-b border-slate-500/20"
          : "absolute bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between border px-3 py-1.5 rounded-2xl transition-colors duration-300 ${
          theme === "dark"
            ? "border-slate-800 bg-slate-900/80 text-white"
            : "border-slate-200 bg-white/70 text-slate-800"
        }`}
      >
        {/* Logo */}
        <a href="#accueil" className="flex items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center border-slate-500/20 overflow-hidden">
              <img src={foco} alt="Logo Focolary" />
            </div>
            <span className="text-xl sm:text-2xl font-black bg-linear-to-r from-blue-500 to-amber-300 bg-clip-text text-transparent">
              Focolary.mg
            </span>
          </div>
        </a>

        {/* Menu Desktop avec distinction de la section active */}
        <div className={style.menuContainer || "flex items-center gap-1"}>
          <a href="#accueil">
            <div className={getLinkClass("accueil")}>Accueil</div>
          </a>
          <a href="#mouvement">
            <div className={getLinkClass("mouvement")}>Mouvement</div>
          </a>
          <a href="#actualite">
            <div className={getLinkClass("actualite")}>Actualités</div>
          </a>
          <Link to="/activites">
            <div className={getLinkClass("activites")}>Nos activités</div>
          </Link>
          <a href="#contact">
            <div className={getLinkClass("contact")}>Contact</div>
          </a>
        </div>

        {/* Actions (Bouton Thème + Connexion + Hamburger) */}
        <div className="flex items-center gap-2">
          {/* Bouton Toggle Thème */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
                : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
            }`}
            aria-label="Changer le thème"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 transition-transform duration-300" />
            ) : (
              <Sun className="w-5 h-5 transition-transform duration-300" />
            )}
          </button>

          <button
            className={
              style.logButton ||
              "px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold"
            }
          >
            <Link to="/LoginPage">Se Connecter</Link>
          </button>

          {/* Hamburger / X Button Animé */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl focus:outline-none p-2 space-y-1.5 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span
              className={`block h-0.5 w-6 ${
                theme === "dark" ? "bg-slate-200" : "bg-slate-700"
              } rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 ${
                theme === "dark" ? "bg-slate-200" : "bg-slate-700"
              } rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-6 ${
                theme === "dark" ? "bg-slate-200" : "bg-slate-700"
              } rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`w-full backdrop-blur-2xl border rounded-2xl p-4 shadow-xl flex flex-col gap-2 ${
            theme === "dark"
              ? "bg-slate-900/90 border-slate-800 text-white"
              : "bg-white/90 border-slate-200/80 text-slate-700"
          }`}
        >
          <a
            href="#accueil"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
              activeSection === "accueil"
                ? "bg-blue-500/10 text-blue-500 font-bold"
                : ""
            }`}
          >
            Accueil
          </a>
          <a
            href="#mouvement"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
              activeSection === "mouvement"
                ? "bg-blue-500/10 text-blue-500 font-bold"
                : ""
            }`}
          >
            Mouvement
          </a>
          <a
            href="#actualite"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
              activeSection === "actualite"
                ? "bg-blue-500/10 text-blue-500 font-bold"
                : ""
            }`}
          >
            Actualités
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2.5 rounded-xl font-medium transition-colors ${
              activeSection === "contact"
                ? "bg-blue-500/10 text-blue-500 font-bold"
                : ""
            }`}
          >
            Contact
          </a>
          <button className="mt-2 w-full p-3 bg-blue-600 text-white rounded-xl text-center font-bold shadow-md">
            <Link to="/LoginPage">Se Connecter</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
