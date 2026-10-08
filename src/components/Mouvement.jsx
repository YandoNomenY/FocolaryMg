export const Mouvement = ({ theme = 'light' }) => {
    const themeClasses = theme === "light" 
        ? "w-screen h-[600px] bg-gradient-to-b from-slate-50 to-95% to-blue-500" 
        : "w-screen h-[600px] bg-[#020617] ";

    return (
        <div className={themeClasses}>

        </div>
    );
};
  
// bg-linear-to-b from-slate-50 to-95% to-blue-500
// bg-linear-to-b from-black to-20% to-[#020617]
// bg-[#020617]