import Navbar from "../components/NavBar";
import { HeroSection } from "../components/HeroSection";
import { Mouvement } from "../components/Mouvement";
import { Actualite } from "../components/Actualite";
import { useState } from "react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export const HomePage = () => {
  const [theme, setTheme] = useState("light"); // 'light' ou 'dark'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Barre de navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <section id="accueil">
        <HeroSection theme={theme} />
      </section>
      <Mouvement theme={theme} />
      <section id="actualite">
        <Actualite theme={theme} />
      </section>
      <section id="contact">
        <Contact theme={theme} />
      </section>
      <section >
        <Footer theme={theme} />
      </section>
    </div>
  );
};
