import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import foco from "../assets/logo/foco.png";
import { navbarStyles as style } from '../utils/style';

const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='py-2.5 px-4 md:px-2 absolute left-1/2 -translate-x-1/2 w-full max-w-6xl top-0 z-50 bg-transparent'>
      <div className={`max-w-6xl mx-auto flex items-center justify-between border px-3 py-1.5 rounded-2xl transition-colors duration-300 ${
        theme === 'dark' ? 'border-slate-800 bg-slate-900/80 text-white' : 'border-slate-200 bg-white/70 text-slate-800'
      }`}>
        
        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center border-slate-500/20 shadow-red-200 overflow-hidden">
              <img src={foco} alt='Logo Focolary' />
            </div>
            <span className='text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-500 to-amber-300 bg-clip-text text-transparent'>
              Focolary.mg
            </span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className={style.menuContainer}>
          <Link to="/"><div className={style.menuItem}>Accueil</div></Link>
          <Link to="/"><div className={style.menuItem}>Mouvement</div></Link>
          <Link to="/"><div className={style.menuItem}>Actualités</div></Link>
          <Link to="/"><div className={style.menuItem}>Contact</div></Link>
        </div>

        {/* Actions (Bouton Thème + Bouton Connexion + Bouton Hamburger) */}
        <div className="flex items-center gap-2">
          
          {/* Bouton Toggle Thème (Soleil / Lune) */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
              theme === 'dark' 
                ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            aria-label="Changer le thème"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 transition-transform duration-300 rotate-0" />
            ) : (
              <Sun className="w-5 h-5 transition-transform duration-300 rotate-0" />
            )}
          </button>

          <button className={style.logButton}>Connexion</button>

          {/* Hamburger / X Button Animé */}
          <button 
            onClick={toggleMenu} 
            className='sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl focus:outline-none p-2 space-y-1.5 cursor-pointer'
            aria-label="Toggle Menu"
          >
            <span 
              className={`block h-0.5 w-6 ${theme === 'dark' ? 'bg-slate-200' : 'bg-slate-700'} rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`} 
            />
            <span 
              className={`block h-0.5 w-6 ${theme === 'dark' ? 'bg-slate-200' : 'bg-slate-700'} rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`} 
            />
            <span 
              className={`block h-0.5 w-6 ${theme === 'dark' ? 'bg-slate-200' : 'bg-slate-700'} rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div 
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`w-full backdrop-blur-2xl border rounded-2xl p-4 shadow-xl flex flex-col gap-3 ${
          theme === 'dark' ? 'bg-slate-900/90 border-slate-800 text-white' : 'bg-white/70 border-slate-200/80 text-slate-700'
        }`}>
          <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-slate-500/10 font-medium transition-colors">
            Accueil
          </Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-slate-500/10 font-medium transition-colors">
            Mouvement
          </Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-slate-500/10 font-medium transition-colors">
            Actualités
          </Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-slate-500/10 font-medium transition-colors">
            Contact
          </Link>
                    <button className="  items-center text-center gap-3 p-3  bg-white backdrop-blur-xl  border-gray-200 rounded-2xl  duration-300 hover:scale-[1.03] text-blue-600 text-lg font-bold cursor-pointer hover:text-amber-500 transition-colors border w-full">Connexion</button>

        </div>
      </div>
    </div>
  );
};

export default Navbar;