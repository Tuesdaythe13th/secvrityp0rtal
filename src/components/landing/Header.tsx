
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HeaderProps {
  glitchText: string;
  setGlitchText: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ glitchText, setGlitchText }: HeaderProps) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.random() > 0.8) {
        const corruptedText = "SECVRITY.P0RT4L".split('')
          .map(char => {
            if (Math.random() > 0.7) {
              const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');
              return chars[Math.floor(Math.random() * chars.length)];
            }
            return char;
          })
          .join('');
        setGlitchText(corruptedText);
        
        setTimeout(() => {
          setGlitchText("SECVRITY.P0RT4L");
        }, 200);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [setGlitchText]);

  return (
    <header className="text-center py-6 border-b-4 border-black">
      <div className="flex flex-col items-center justify-center">
        <motion.div
          className="mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img 
            src="/lovable-uploads/820397d6-4aa0-4d0b-8905-d517b3492289.png" 
            alt="ARTIFEX LABS" 
            className="h-16 w-auto"
          />
        </motion.div>
        
        <motion.h1
          className="text-5xl font-bold text-black relative"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span
            className="absolute top-0 left-0 right-0 text-red-600 opacity-70 select-none"
            animate={{ 
              x: [-2, 1, -3, 0, 2, -1, 0],
              opacity: [0.7, 0.3, 0.7]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2,
              repeatType: "reverse" 
            }}
          >
            {glitchText}
          </motion.span>
          
          <motion.span
            className="absolute top-0 left-0 right-0 text-black opacity-70 select-none"
            animate={{ 
              x: [2, -1, 3, 0, -2, 1, 0],
              opacity: [0.7, 0.5, 0.7]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.8,
              repeatType: "reverse",
              delay: 0.1
            }}
          >
            {glitchText}
          </motion.span>
          
          {glitchText}
        </motion.h1>
      </div>

      <nav className="mt-6 flex justify-center space-x-6">
        <a href="#" className="hover:text-red-600 transition-colors font-bold">HOME</a>
        <a href="#" className="hover:text-red-600 transition-colors font-bold">PUBLICATIONS</a>
        <a href="#" className="hover:text-red-600 transition-colors font-bold">UPCOMING</a>
        <a href="#" className="hover:text-red-600 transition-colors font-bold">SUBSTACK</a>
        <a href="#" className="hover:text-red-600 transition-colors font-bold">RESOURCES</a>
        <a href="#" className="hover:text-red-600 transition-colors font-bold">SIGN UP</a>
      </nav>
    </header>
  );
};

export default Header;
