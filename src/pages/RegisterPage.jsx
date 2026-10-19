import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, UserCheck, CheckCircle2, ChevronRight, User, Calendar, Mail, Phone, MapPin, Briefcase, Building } from 'lucide-react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [success, setSuccess] = useState(false);

  // Données du formulaire d'inscription
  const [formData, setFormData] = useState({
    // Étape 1
    fullName: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: '',
    // Étape 2
    category: '',
    centerLocation: '',
    // Étape 3
    currentStatus: '',
    customStatus: '',
    structure: '',
    profileDetails: ''
  });

  // Animation d'apparition globale de la page au montage
  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation des champs obligatoires par étape
  const validateStep = () => {
    if (step === 1) {
      return (
        formData.fullName.trim() !== '' &&
        formData.birthDate !== '' &&
        formData.gender !== '' &&
        formData.email.trim() !== '' &&
        formData.phone.trim() !== ''
      );
    }
    if (step === 2) {
      return (
        formData.category !== '' &&
        formData.centerLocation !== ''
      );
    }
    if (step === 3) {
      const isStatusValid = formData.currentStatus !== '' && (formData.currentStatus !== 'Autre' || formData.customStatus.trim() !== '');
      return (
        isStatusValid &&
        formData.structure.trim() !== '' &&
        formData.profileDetails.trim() !== ''
      );
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) {
      alert("Veuillez remplir tous les champs obligatoires de cette étape avant de continuer.");
      return;
    }
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => prev + 1);
      setIsAnimating(false);
    }, 300);
  };

  const handlePrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prev) => prev - 1);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    setSuccess(true);
    console.log("Données d'inscription finales :", formData);
  };

  return (
    <div className={`relative w-full min-h-screen bg-slate-950 flex flex-col justify-center items-center py-16 px-4 sm:px-6 text-slate-100 transition-all duration-700 ease-out ${
      isPageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
    }`}>
      
      {/* Bouton de retour vers la page de connexion (même position que sur la page login) */}
      <div className="absolute top-6 left-6 z-50">
        <Link 
          to="/LoginPage"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md transition-all text-sm font-semibold shadow-lg active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la connexion</span>
        </Link>
      </div>

      {/* Carte Principale du Formulaire */}
      <div className="max-w-2xl w-full bg-slate-900/90 border border-slate-800 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden mt-8">
        
        {/* Éléments décoratifs lumineux */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {success ? (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-fade-in">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-bounce" />
            <h2 className="text-3xl font-black text-white">Inscription réussie !</h2>
            <p className="text-slate-400 max-w-md text-sm">
               Votre compte est en attente de vérification par un administrateur.
               Vous allez recevoir un message de validation par Email prochainement.
            </p>
            <button 
              onClick={() => navigate('/login')}
              className="mt-6 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Link to="/LoginPage">Aller à la connexion</Link>
            </button>
          </div>
        ) : (
          <div>
            {/* Indicateur d'étapes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Étape {step} sur 3
                </span>
                <span className="text-xs font-medium text-slate-400">
                  {step === 1 && "Informations de base"}
                  {step === 2 && "Statut de Membre"}
                  {step === 3 && "Statut Professionnel"}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-blue-500 to-amber-400 transition-all duration-500 ease-out"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {step === 1 && "Informations personnelles"}
                {step === 2 && "Appartenance au Mouvement"}
                {step === 3 && "Parcours & Profil"}
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Tous les champs de chaque étape sont obligatoires pour valider votre adhésion.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={`transition-all duration-300 ease-in-out transform ${
                isAnimating ? 'opacity-0 translate-y-4 scale-98' : 'opacity-100 translate-y-0 scale-100'
              }`}>
                
                {/* ETAPE 1 */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Nom et prénoms *</label>
                      <input 
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Ex: RAKOTOARISON Ando ..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Date de naissance *</label>
                      <input 
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Sexe *</label>
                      <select 
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                      >
                        <option value="" disabled>Sélectionnez votre sexe</option>
                        <option value="Homme">Homme</option>
                        <option value="Femme">Femme</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Adresse email *</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="exemple@domaine.mg"
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Numéro de Téléphone *</label>
                      <input 
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+261 34 00 000 00"
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* ETAPE 2 */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Catégorie de membre *</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                      >
                        <option value="" disabled>Sélectionnez votre catégorie</option>
                        <option value="Gen 3">Gen 3</option>
                        <option value="Gen 2">Gen 2</option>
                        <option value="Famille">Famille</option>
                        <option value="Focolarine">Focolarine</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Localisation du centre Focolari *</label>
                      <select 
                        name="centerLocation"
                        value={formData.centerLocation}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                      >
                        <option value="" disabled>Sélectionnez un centre</option>
                        <option value="Antananarivo">Antananarivo</option>
                        <option value="Ambatondrazaka">Ambatondrazaka</option>
                        <option value="Antsirabe">Antsirabe</option>
                        <option value="Ambositra">Ambositra</option>
                        <option value="Fianarantsoa">Fianarantsoa</option>
                        <option value="Moramanga">Moramanga</option>
                        <option value="Toamasina">Toamasina</option>
                        <option value="Toliara">Toliara</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* ETAPE 3 */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Situation actuelle *</label>
                      <select 
                        name="currentStatus"
                        value={formData.currentStatus}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white text-sm focus:outline-none focus:border-blue-500 transition-all"
                      >
                        <option value="" disabled>Sélectionnez votre situation</option>
                        <option value="Lycéen">Lycéen</option>
                        <option value="Etudiant">Etudiant</option>
                        <option value="Salarié">Salarié</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Entrepreneur">Entrepreneur</option>
                        <option value="Indépendant">Indépendant</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    {formData.currentStatus === 'Autre' && (
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-300">Précisez votre situation *</label>
                        <input 
                          type="text"
                          name="customStatus"
                          value={formData.customStatus}
                          onChange={handleChange}
                          required
                          placeholder="Ex: Retraité, Chercheur..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-all"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Structure / Organisation *</label>
                      <input 
                        type="text"
                        name="structure"
                        value={formData.structure}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Université d'Antananarivo / Ministère..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-300">Détail sur votre profil *</label>
                      <textarea 
                        name="profileDetails"
                        rows="3"
                        value={formData.profileDetails}
                        onChange={handleChange}
                        required
                        placeholder="Ex: Je suis un étudiant en M2 Génie Logiciel / Je travaille dans le domaine de l'agronomie..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/60 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 resize-none transition-all"
                      />
                    </div>
                  </div>
                )}

              </div>

              {/* Boutons de navigation */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-800">
                {step > 1 ? (
                  <button 
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 rounded-xl font-semibold text-sm border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Précédent</span>
                  </button>
                ) : (
                  <div /> /* Espace vide pour garder l'alignement */
                )}

                {step < 3 ? (
                  <button 
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 rounded-xl font-bold text-sm bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25 hover:from-blue-500 hover:to-indigo-500 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <span>Suivant</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="px-8 py-3 rounded-xl font-bold text-sm bg-linear-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/25 hover:from-emerald-500 hover:to-teal-500 transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>S'inscrire</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegisterPage;