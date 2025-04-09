
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Landing = () => {
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.2
      }
    }
  };

  const pulseVariants = {
    initial: { opacity: 0.6 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const threatTypes = [
    "MALWARE", "PHISHING", "SPAM", "EXPLOITS", "BOTNETS", "DDOS"
  ];

  const securityModules = [
    { title: "CRITICAL AI SECURITY", category: "critical" },
    { title: "AI ATTACK TAXONOMY", category: "critical" },
    { title: "D3FEND GRAPH", category: "warning" },
    { title: "VDP GENERATOR", category: "standard" },
    { title: "INSIDER THREAT", category: "standard" },
    { title: "CLOUD SECURITY", category: "info" },
    { title: "SECURITY AUDIT", category: "standard" },
    { title: "AGENT ARCHITECTURE", category: "standard" },
    { title: "AGENTIC 101", category: "caution" },
    { title: "BENCHMARK DIRECTORY", category: "standard" },
    { title: "VULNERABILITY DATABASE", category: "critical" },
    { title: "SECURE CONFERENCE", category: "success" },
    { title: "FEAR AND GREED INDEX", category: "warning" },
    { title: "SYNTHETIC TXT DATA AUDIT", category: "standard" }
  ];

  const moduleColors = {
    critical: "bg-red-500",
    warning: "bg-yellow-500",
    standard: "bg-white",
    info: "bg-blue-500",
    caution: "bg-orange-400",
    success: "bg-green-500"
  };

  const moduleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const moduleFrameVariants = {
    hidden: { opacity: 0, height: "0px" },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const moduleLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handleModuleClick = (title: string) => {
    toast({
      title: `Module Selected: ${title}`,
      description: "Loading security module...",
      variant: "destructive",
    });
  };

  return (
    <div className="relative min-h-screen bg-darkBg text-white">
      <div className="scanline"></div>
      
      <motion.div 
        className="container mx-auto px-4 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={logoVariants} className="flex flex-col items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/f4cc2880-2437-4c3c-81ae-3821a31d6e66.png" 
            alt="Artifex Labs Logo" 
            className="w-[80%] max-w-[700px] mb-4"
          />
          <motion.h2 
            className="text-5xl md:text-7xl font-bold mt-4 mb-8 text-center"
            style={{ 
              color: '#0f0', 
              textShadow: '0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0' 
            }}
          >
            SECVRITY.BRVTALISM
          </motion.h2>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center space-x-4 md:space-x-8 text-xs md:text-base mb-12">
          {['HOME', 'PUBLICATIONS', 'UPCOMING', 'SUBSTACK', 'RESOURCES', 'SIGN UP'].map((item) => (
            <motion.button
              key={item}
              className="hover:text-neonRed transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
        
        <motion.div variants={itemVariants} className="neon-border border-red-600 bg-black bg-opacity-80 p-4 mb-8">
          <div className="flex justify-between items-center mb-2">
            <motion.h3 variants={pulseVariants} initial="initial" animate="animate" className="text-red-500 font-bold">
              LIVE SECURITY THREAT MONITOR
            </motion.h3>
            <div className="flex items-center">
              <span className="text-red-500 mr-2">LIVE</span>
              <motion.div 
                className="w-2 h-2 bg-red-500 rounded-full"
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
            <div className="border border-red-500 p-2">
              <div className="text-xs text-gray-400">THREATS</div>
              <div className="text-red-500 text-xl">24,687</div>
            </div>
            <div className="border border-red-500 p-2">
              <div className="text-xs text-gray-400">COUNTRIES</div>
              <div className="text-red-500 text-xl">187</div>
            </div>
            <div className="border border-red-500 p-2">
              <div className="text-xs text-gray-400">LAST UPDATE</div>
              <div className="text-red-500 text-xl">4:01:09 AM</div>
            </div>
          </div>
          
          <div className="mb-4 bg-gray-900 p-2 border border-gray-700 overflow-hidden">
            <div className="relative" style={{ height: "30px" }}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <iframe
                  src="https://rss.app/embed/v1/ticker/tccUCm0DWwfoAHE1"
                  frameBorder="0"
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-red-500 mb-2">GLOBAL CYBER THREAT MAP</h4>
            <div className="border border-gray-700 p-1 h-[200px] bg-gray-900 flex items-center justify-center relative overflow-hidden">
              <iframe 
                src="https://cybermap.kaspersky.com/en/widget/dynamic/dark" 
                width="100%" 
                height="100%" 
                title="Kaspersky Cyber Map" 
                frameBorder="0"
                className="z-10"
              />
              <motion.div 
                className="absolute inset-0 bg-green-500 opacity-5 pointer-events-none z-20"
                animate={{ 
                  opacity: [0.03, 0.07, 0.03]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </div>
          </div>
          
          <div className="flex justify-between text-xs">
            <div className="text-red-500">SYSTEM STATUS: OPERATIONAL</div>
            <div className="text-red-500">ACCESS: PUBLIC</div>
            <div className="text-red-500">SECURITY LEVEL: MAXIMUM</div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="border border-red-600 bg-black bg-opacity-80 p-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            {threatTypes.map((type) => (
              <motion.button
                key={type}
                className="border border-red-500 p-2 text-red-500 text-xs hover:bg-red-900 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-gray-400">THREAT TYPE</div>
                {type}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {securityModules.map((module, index) => (
            <motion.div key={module.title} className="flex flex-col">
              <motion.button
                className={`p-4 text-black font-bold text-center ${moduleColors[module.category as keyof typeof moduleColors]}`}
                variants={moduleVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                onClick={() => handleModuleClick(module.title)}
              >
                {module.title}
              </motion.button>
              
              <motion.div
                className="overflow-hidden"
                variants={moduleFrameVariants}
                initial="hidden"
                whileHover="visible"
              >
                <motion.div 
                  className="bg-black bg-opacity-90 border border-red-600 p-2 text-center"
                  variants={moduleLinkVariants}
                >
                  <Link 
                    to="/" 
                    className="text-red-500 text-xs hover:text-white"
                  >
                    ENTER MODULE
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="border border-red-600 bg-black bg-opacity-80 p-6 mb-8"
        >
          <motion.h3 
            className="text-2xl mb-2"
            style={{ 
              color: '#0f0', 
              textShadow: '0 0 5px #0f0, 0 0 10px #0f0' 
            }}
          >
            RED TEAM MINI BATTLE DOME
          </motion.h3>
          <p className="text-gray-300 mb-4">INTERACTIVE AI SECURITY TESTING SIMULATOR. BREAK THROUGH AI SAFETY SYSTEMS.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-red-600 text-white px-8 py-3 font-bold"
              whileHover={{ scale: 1.05, backgroundColor: "#ff0044" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/simulator">ENTER BATTLE DOME</Link>
            </motion.button>
            
            <motion.button
              className="border border-red-600 text-red-600 px-8 py-3 font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW DOCUMENTATION
            </motion.button>
          </div>
        </motion.div>
        
        {/* New Neon Crypto Heist Section */}
        <motion.div 
          variants={itemVariants}
          className="border border-cyan-500 bg-black bg-opacity-80 p-6 mb-8"
          style={{ 
            boxShadow: '0 0 10px #00f0ff, inset 0 0 10px #00f0ff' 
          }}
        >
          <motion.h3 
            className="text-2xl mb-2"
            style={{ 
              color: '#00f0ff', 
              textShadow: '0 0 5px #00f0ff, 0 0 10px #00f0ff' 
            }}
          >
            NEON CRYPTO HEIST
          </motion.h3>
          <p className="text-gray-300 mb-4">CYBERPUNK CRYPTO HACKING SIMULATION. BREAK INTO THE QUANTUM VAULT.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              className="bg-cyan-600 text-white px-8 py-3 font-bold"
              whileHover={{ scale: 1.05, backgroundColor: "#00b8d4" }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                boxShadow: '0 0 15px #00f0ff' 
              }}
            >
              <Link to="/neon-crypto-heist">ENTER CRYPTO HEIST</Link>
            </motion.button>
            
            <motion.button
              className="border border-cyan-500 text-cyan-500 px-8 py-3 font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VIEW LOOT STATS
            </motion.button>
          </div>
        </motion.div>
        
        <motion.footer variants={itemVariants} className="text-center text-xs text-gray-500 mt-12">
          <p>© 2025 ARTIFEX LABS. ALL RIGHTS RESERVED.</p>
          <p>BRUTALIST SECURITY INTERFACE DESIGNED FOR MAXIMUM EFFICIENCY.</p>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default Landing;
