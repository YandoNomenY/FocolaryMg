import React, { useState } from "react";
import { MapPin, Mail, Phone, Send, CheckCircle2 } from "lucide-react";

const contactLocations = [
  {
    city: "Antananarivo",
    address: "Ambatobe, Lot ...",
    email: "tana.focolary@gmail.com",
    phone: "+261 34 00 000 01",
    whatsapp: "+261 34 00 000 01",
  },
  {
    city: "Ambatondrazaka",
    address: "Centre Ville, Lot ...",
    email: "ambatondrazaka.focolary@gmail.com",
    phone: "+261 34 00 000 02",
    whatsapp: "+261 34 00 000 02",
  },
  {
    city: "Antsirabe",
    address: "Près de l'Université, Lot ...",
    email: "antsirabe.focolary@gmail.com",
    phone: "+261 34 00 000 03",
    whatsapp: "+261 34 00 000 03",
  },
  {
    city: "Toamasina",
    address: "Boulevard Joffre, Lot ...",
    email: "toamasina.focolary@gmail.com",
    phone: "+261 34 00 000 04",
    whatsapp: "+261 34 00 000 04",
  },
];

export const Contact = ({ theme = "light" }) => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation d'envoi de message (vous pouvez connecter votre API ou service d'email ici)
    console.log("Message envoyé :", formData);
    setIsSubmitted(true);

    // Réinitialisation après quelques secondes
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ email: "", subject: "", message: "" });
    }, 4000);
  };

  // Styles dynamiques selon le thème
  const isDark = theme === "dark";
  const containerClasses = isDark
    ? "w-full min-h-screen bg-[#020617] py-20 px-4 text-white"
    : "w-full min-h-screen bg-slate-50 py-20 px-4 text-slate-900";

  return (
    <div
      id="contact"
      className={`${containerClasses} flex flex-col items-center justify-center`}
    >
      {/* En-tête de section */}
      <div className="max-w-6xl w-full mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight bg-linear-to-r from-blue-500 to-amber-400 bg-clip-text text-transparent">
          Contactez-nous
        </h2>
        <p
          className={`mt-3 text-base md:text-lg font-medium ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Retrouvez nos différentes antennes à Madagascar ou envoyez-nous
          directement un message.
        </p>
      </div>

      {/* Grille principale : Liste des antennes + Formulaire */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* 1. Liste des Localisations / Antennes */}
        <div className="space-y-6">
          <h3
            className={`text-2xl font-bold ${
              isDark ? "text-slate-200" : "text-slate-800"
            }`}
          >
            Nos Antennes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactLocations.map((loc, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-lg ${
                  isDark
                    ? "bg-slate-900/80 border-slate-800 text-slate-300"
                    : "bg-white border-slate-200 text-slate-700"
                } backdrop-blur-md`}
              >
                <h4 className="text-lg font-bold text-blue-500 mb-3">
                  Focolary {loc.city}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <a
                      href={`mailto:${loc.email}`}
                      className="hover:underline truncate"
                    >
                      {loc.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <a
                      href={`https://wa.me/${loc.whatsapp.replace(
                        /[^0-9]/g,
                        ""
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {loc.phone} (WhatsApp)
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Formulaire d'envoi de message */}
        <div
          className={`p-8 rounded-3xl border shadow-xl ${
            isDark
              ? "bg-slate-900/90 border-slate-800 text-white"
              : "bg-white border-slate-200 text-slate-900"
          } backdrop-blur-md relative overflow-hidden`}
        >
          <h3 className="text-2xl font-bold mb-6">Envoyez-nous un message</h3>

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
              <h4 className="text-xl font-bold">
                Message envoyé avec succès !
              </h4>
              <p
                className={`text-sm ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Merci de nous avoir contactés. Nous vous répondrons dans les
                plus brefs délais.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Champ Email */}
              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Votre Adresse Email
                </label>
                <input
                  //   type="email5" // corrigé implicitement en email
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="exemple@domaine.mg"
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                    isDark
                      ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500"
                  }`}
                />
              </div>

              {/* Champ Objet */}
              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Objet du message
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Demande d'information, Partenariat..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
                    isDark
                      ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500"
                  }`}
                />
              </div>

              {/* Champ Contenu */}
              <div className="space-y-2">
                <label
                  className={`block text-sm font-semibold ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  Contenu du message
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Écrivez votre message ici..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none transition-all ${
                    isDark
                      ? "bg-slate-800/50 border-slate-700 text-white focus:border-blue-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500"
                  }`}
                />
              </div>

              {/* Bouton d'envoi */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide bg-linear-to-r from-blue-600 to-amber-500 text-white shadow-lg shadow-blue-500/25 hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Envoyer le message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
