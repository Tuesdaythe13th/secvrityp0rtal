
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShieldAlt, 
  faBug, 
  faCode, 
  faExclamationTriangle,
  faGlobe,
  faClock,
  faLock,
  faChartLine,
  faUserSecret,
  faCloud,
  faClipboardCheck,
  faMicrochip,
  faDatabase,
  faExchangeAlt,
  faFileCode
} from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [threatCount, setThreatCount] = useState(24687);
  const [countryCount, setCountryCount] = useState(187);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        toast({
          title: "Back Online",
          description: "Connection restored.",
        });
      } else {
        toast({
          title: "Offline",
          description: "No internet connection.",
          variant: "destructive",
        });
      }
    };

    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate changing threat counts
      setThreatCount(prev => prev + Math.floor(Math.random() * 10 - 5));
    }, 5000);

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      clearInterval(timer);
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, [toast]);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-5xl font-bold text-red-600">SECVRITY.BRVTALISM</h1>
        <nav className="mt-6 flex justify-center space-x-6">
          <a href="#" className="hover:text-red-600 transition-colors">HOME</a>
          <a href="#" className="hover:text-red-600 transition-colors">PUBLICATIONS</a>
          <a href="#" className="hover:text-red-600 transition-colors">UPCOMING</a>
          <a href="#" className="hover:text-red-600 transition-colors">SUBSTACK</a>
          <a href="#" className="hover:text-red-600 transition-colors">RESOURCES</a>
          <a href="#" className="hover:text-red-600 transition-colors">SIGN UP</a>
        </nav>
      </header>

      {/* Security Threat Monitor */}
      <section className="container mx-auto my-6 p-4 border-2 border-red-600 bg-gray-900">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="bg-red-600 px-2 py-1 mr-2">LIVE</span>
            <span>SECURITY THREAT MONITOR</span>
          </div>
          <div className="flex items-center">
            <span>LIVE</span>
            <span className="ml-2 w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border border-red-600 p-2">
            <div className="uppercase text-xs text-gray-400">THREATS</div>
            <div className="text-red-600 text-2xl">{threatCount.toLocaleString()}</div>
          </div>
          <div className="border border-red-600 p-2">
            <div className="uppercase text-xs text-gray-400">COUNTRIES</div>
            <div className="text-red-600 text-2xl">{countryCount}</div>
          </div>
          <div className="border border-red-600 p-2">
            <div className="uppercase text-xs text-gray-400">LAST UPDATE</div>
            <div className="text-red-600 text-2xl">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </div>
          </div>
        </div>

        <div className="border border-red-600 p-2 mb-4 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee">
            <span className="inline-block mx-4 text-green-500">CONFERENCES</span>
            <span className="inline-block mx-4 text-yellow-500">CYBERSECURITY EXPERTS WEIGH IN ON CRUCIAL PROTECTIONS FOR BUSINESSES</span>
            <span className="inline-block mx-4 text-red-500">NEW TCSB MALWARE FOUND IN SYSTEMS</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="uppercase text-xs text-gray-400 mb-2">GLOBAL CYBER THREAT MAP</div>
          <div className="h-64 bg-black border border-gray-700 flex items-center justify-center">
            <div className="text-center">
              <div className="text-xl mb-2">CYBERTHREAT LIVE MAP</div>
              <div className="text-xs">Powered by kaspersky</div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <div>SYSTEM STATUS: OPERATIONAL</div>
          <div>ACCESS: PUBLIC</div>
          <div>SECURITY LEVEL: MAXIMUM</div>
        </div>
      </section>

      {/* Threat Types */}
      <section className="container mx-auto my-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
          {[
            { name: "MALWARE", icon: faBug },
            { name: "PHISHING", icon: faExclamationTriangle },
            { name: "SPAM", icon: faExchangeAlt },
            { name: "EXPLOITS", icon: faCode },
            { name: "BOTNETS", icon: faGlobe },
            { name: "DDOS", icon: faExclamationTriangle }
          ].map((threat, index) => (
            <div key={index} className="border border-gray-700 bg-gray-900 p-3 text-center">
              <div className="text-xs text-gray-400">THREAT TYPE</div>
              <div className="flex items-center justify-center mt-1">
                <FontAwesomeIcon icon={threat.icon} className="text-red-600 mr-2" />
                <span className="text-red-600">{threat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security Tools Grid */}
      <section className="container mx-auto my-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/simulator" className="block bg-red-600 p-4 text-center">
            <div className="font-bold">CRITICAL AI SECURITY</div>
          </Link>
          
          <Link to="/agentic-ai-101" className="block bg-blue-600 p-4 text-center">
            <div className="font-bold">AI ATTACK TAXONOMY</div>
          </Link>
          
          <div className="bg-yellow-500 p-4 text-center text-black">
            <div className="font-bold">D3FEND GRAPH</div>
          </div>
          
          <div className="bg-gray-700 p-4 text-center">
            <div className="font-bold">VDP GENERATOR</div>
          </div>
          
          <div className="bg-orange-400 p-4 text-center text-black">
            <div className="font-bold">INSIDER THREAT</div>
          </div>
          
          <div className="bg-blue-500 p-4 text-center">
            <div className="font-bold">CLOUD SECURITY</div>
          </div>
          
          <div className="bg-red-500 p-4 text-center">
            <div className="font-bold">SECURITY AUDIT</div>
          </div>
          
          <div className="bg-green-500 p-4 text-center text-black">
            <div className="font-bold">AGENT ARCHITECTURE</div>
          </div>
          
          <Link to="/agentic-ai-101" className="block bg-orange-400 p-4 text-center text-black">
            <div className="font-bold">AGENTIC 101</div>
          </Link>
          
          <div className="bg-blue-600 p-4 text-center">
            <div className="font-bold">BENCHMARK DIRECTORY</div>
          </div>
          
          <div className="bg-red-500 p-4 text-center">
            <div className="font-bold">VULNERABILITY DATABASE</div>
          </div>
          
          <div className="bg-green-500 p-4 text-center text-black">
            <div className="font-bold">SECURE CONFERENCE</div>
          </div>
          
          <Link to="/fear-greed-index" className="block bg-yellow-500 p-4 text-center text-black">
            <div className="font-bold">FEAR AND GREED INDEX</div>
          </Link>
          
          <div className="bg-purple-600 p-4 text-center">
            <div className="font-bold">SYNTHETIC TXT DATA AUDIT</div>
          </div>
        </div>
      </section>

      {/* Red Team Mini Battle Dome */}
      <section className="container mx-auto my-6 bg-gray-900 border border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-green-500 mb-2">RED TEAM MINI BATTLE DOME</h2>
        <p className="text-gray-400 mb-4">INTERACTIVE AI SECURITY TESTING SIMULATOR. BREAK THROUGH AI SAFETY SYSTEMS.</p>
        <div className="flex space-x-4">
          <Link to="/simulator" className="bg-red-600 px-6 py-2 hover:bg-red-700 transition-colors">
            ENTER BATTLE DOME
          </Link>
          <button className="border border-gray-600 px-6 py-2 hover:bg-gray-800 transition-colors">
            VIEW DOCUMENTATION
          </button>
        </div>
      </section>

      {/* Neon Crypto Heist */}
      <section className="container mx-auto my-6 bg-gray-900 border border-gray-700 p-6 border-t-4 border-cyan-400">
        <h2 className="text-2xl font-bold text-cyan-400 mb-2">NEON CRYPTO HEIST</h2>
        <p className="text-gray-400 mb-4">CYBERPUNK CRYPTO HACKING SIMULATION. BREAK INTO THE QUANTUM VAULT.</p>
        <div className="flex space-x-4">
          <Link to="/neon-crypto-heist" className="bg-cyan-600 px-6 py-2 hover:bg-cyan-700 transition-colors">
            ENTER CRYPTO HEIST
          </Link>
          <button className="border border-gray-600 px-6 py-2 hover:bg-gray-800 transition-colors">
            VIEW LOOT STATS
          </button>
        </div>
      </section>

      {/* Prompt Injection Dojo */}
      <section className="container mx-auto my-6 bg-gray-900 border border-gray-700 p-6 border-t-4 border-red-600">
        <h2 className="text-2xl font-bold text-red-500 mb-2">PROMPT INJECTION DOJO</h2>
        <p className="text-gray-400 mb-4">BRUTAL RED TEAM TRAINING SIMULATOR. BYPASS AI CONTENT FILTERS.</p>
        <div className="flex space-x-4">
          <Link to="/prompt-injection-dojo" className="bg-red-600 px-6 py-2 hover:bg-red-700 transition-colors">
            ENTER DOJO
          </Link>
          <button className="border border-gray-600 px-6 py-2 hover:bg-gray-800 transition-colors">
            VIEW TECHNIQUES
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto py-6 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-500">
          © 2024 SECVRITY.BRVTALISM | BRUTALIST CYBERPUNK RED TEAMING PLATFORM
        </p>
        <p className="text-xs text-gray-600 mt-2">
          SYSTEM STATUS: {isOnline ? "ONLINE" : "OFFLINE"} | 
          LAST UPDATE: {currentTime.toLocaleTimeString()} | 
          SECURITY LEVEL: MAXIMUM
        </p>
      </footer>
    </div>
  );
};

export default Landing;
