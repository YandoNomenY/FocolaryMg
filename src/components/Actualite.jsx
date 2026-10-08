export const Actualite = ({ theme = "light"}) => {
   const themeClasses = theme === "light" 
        ? "w-screen h-[600px] bg-blue-500" 
        : "w-screen h-[600px] bg-[#020617] ";

    return (
        <div className={themeClasses}>

        </div>
    );
}