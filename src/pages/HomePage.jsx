import Navbar from "../components/NavBar";
import { HeroSection } from "../components/HeroSection";
import { Mouvement } from "../components/Mouvement";
import { Actualite } from "../components/Actualite";
import { useState } from "react";


export const HomePage = () => {
  const [theme, setTheme] = useState('light'); // 'light' ou 'dark'

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div  className="min-h-screen w-full overflow-x-hidden">
      {/* Barre de navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <HeroSection theme={theme}/>
      <Mouvement />
      <Actualite />
    </div>
  );
};