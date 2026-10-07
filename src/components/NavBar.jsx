import { useState } from 'react'
import { Link } from 'react-router-dom'
import foco from "../assets/logo/Foco.jpg"
import { navbarStyles as style } from '../utils/style'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className=' border-b border-slate-100/50 py-2.5 px-4 md:px-2 sticky top-0 z-50'>
      <div className="max-w-6xl mx-auto flex items-center justify-between border px-2 py-1 rounded-2xl border-slate-200 bg-white/70">
        
        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center border-slate-500/20 shadow-red-200 overflow-hidden">
              <img src={foco} alt='Logo Focolary' className='' />
            </div>
            <span className='text-xl sm:text-2xl font-black bg-linear-to-r from-blue-500 to-amber-300 bg-clip-text text-transparent'>
              Focolary.mg
            </span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className={style.menuContainer}>
          <Link to="/">
            <div className={style.menuItem}>Accueil</div>
          </Link>
          <Link to="/">
            <div className={style.menuItem}>Mouvement</div>
          </Link>
          <Link to="/">
            <div className={style.menuItem}>Actualités</div>
          </Link>
          <Link to="/">
            <div className={style.menuItem}>Contact</div>
          </Link>
        </div>

        {/* Actions (Bouton Connexion + Bouton Hamburger animé) */}
        <div className="flex items-center gap-2">
            <button className={style.logButton}>Connexion</button>

          {/* Hamburger / X Button Animé */}
          <button 
            onClick={toggleMenu} 
            className='sm:hidden flex flex-col justify-center items-center w-10 h-10 rounded-xl focus:outline-none p-2 space-y-1.5 cursor-pointer'
            aria-label="Toggle Menu"
          >
            <span 
              className={`block h-0.5 w-6 bg-slate-700 rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`} 
            />
            <span 
              className={`block h-0.5 w-6 bg-slate-700 rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`} 
            />
            <span 
              className={`block h-0.5 w-6 bg-slate-700 rounded-full transition-all duration-300 ease-in-out ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Menu Mobile déroulant depuis le haut */}
      <div 
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="w-full bg-white/95 backdrop-blur-2xl border border-slate-200/80 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2.5 rounded-xl hover:bg-slate-100 font-medium text-slate-700 transition-colors"
          >
            Accueil
          </Link>
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2.5 rounded-xl hover:bg-slate-100 font-medium text-slate-700 transition-colors"
          >
            Mouvement
          </Link>
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2.5 rounded-xl hover:bg-slate-100 font-medium text-slate-700 transition-colors"
          >
            Actualités
          </Link>
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2.5 rounded-xl hover:bg-slate-100 font-medium text-slate-700 transition-colors"
          >
            Contact
          </Link>
          {/* <div className="pt-2 border-t border-slate-100 sm:hidden">
            <button className="w-full  py-2.5 bg-linear-to-r from-blue-500 to-amber-400 text-white font-semibold rounded-xl shadow-md active:scale-95 transition-transform cursor-pointer ">
              Connexion
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar