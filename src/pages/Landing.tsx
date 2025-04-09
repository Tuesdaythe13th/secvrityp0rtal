
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDown, ChevronUp } from "lucide-react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Landing = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [threatCount, setThreatCount] = useState(24687);
  const [countryCount, setCountryCount] = useState(187);
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(true);
  const [glitchText, setGlitchText] = useState("SECVRITY.BRVTALISM");
  const rssTickerRef = useRef<HTMLDivElement>(null);
  const cyberMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Math.random() > 0.8) {
        const corruptedText = "SECVRITY.BRVTALISM".split('')
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
          setGlitchText("SECVRITY.BRVTALISM");
        }, 200);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

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

  useEffect(() => {
    if (rssTickerRef.current) {
      rssTickerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = 'https://widget.rss.app/v1/ticker.js';
      script.async = true;
      document.head.appendChild(script);
      
      const widget = document.createElement('rssapp-ticker');
      widget.setAttribute('url', 'https://rss.app');
      widget.setAttribute('id', 'tccUCm0DWwfoAHE1');
      widget.setAttribute('nofollow', 'true');
      rssTickerRef.current.appendChild(widget);
    }
    
    return () => {
      const scripts = document.querySelectorAll('script[src="https://widget.rss.app/v1/ticker.js"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  // Add Kaspersky Cyberthreat map
  useEffect(() => {
    if (cyberMapRef.current) {
      cyberMapRef.current.innerHTML = '';
      
      // Add required CSS
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.type = 'text/css';
      linkElement.href = 'https://cybermap.kaspersky.com/css/widget-dynamic.css?id=aecb03a62887f01fb45aae052512d0d0';
      document.head.appendChild(linkElement);
      
      // Create elements for the Kaspersky map
      const headerDiv = document.createElement('div');
      headerDiv.className = 'header';
      
      const h1Element = document.createElement('h1');
      h1Element.id = 'header_main_title';
      h1Element.innerHTML = '<b>CYBERTHREAT</b> LIVE MAP';
      headerDiv.appendChild(h1Element);
      
      const canvasWrapper = document.createElement('div');
      canvasWrapper.className = 'webgl-canvas-wrapper';
      
      const canvas = document.createElement('canvas');
      canvas.id = 'webgl-canvas';
      canvasWrapper.appendChild(canvas);
      
      const detectionTypesContainer = document.createElement('div');
      detectionTypesContainer.id = 'detection_types_container';
      
      // Append all elements to the container
      cyberMapRef.current.appendChild(headerDiv);
      cyberMapRef.current.appendChild(canvasWrapper);
      cyberMapRef.current.appendChild(detectionTypesContainer);
      
      // Add required scripts
      const geoIpScript = document.createElement('script');
      geoIpScript.type = 'text/javascript';
      geoIpScript.innerHTML = `
        window.geoIP = {
          country: "US",
          coord: [47.7385, -122.3748]
        };
        
        window.feedUrl = "default";
        window.disabledCountries = [8,64,80,109,131,161,189,243];
        
        window.resourceUrl = function(path) {
          var url = String(path);
          var withDomain = url.startsWith('http://') || url.startsWith('https://');
          url = withDomain || url.startsWith('/') ? url : '/'.concat(url);
          return withDomain ? url : window.location.origin + url;
        };
      `;
      document.head.appendChild(geoIpScript);
      
      // Add the widget script
      const widgetScript = document.createElement('script');
      widgetScript.src = 'https://cybermap.kaspersky.com/js/widget-dynamic.js?id=84ec65f3752870b7085d533f645b3178';
      widgetScript.async = true;
      document.head.appendChild(widgetScript);
      
      // Systems configuration and initialization script
      const mapInitScript = document.createElement('script');
      mapInitScript.type = 'text/javascript';
      mapInitScript.innerHTML = `
        var map_systems = [
          {id: 1, shortname: "OAS", name: "On-Access Scan", description: "OAS (On-Access Scan) shows malware detection flow during On-Access Scan, i.e. when objects are accessed during open, copy, run or save operations.", color: "38b349", edges: 5},
          {id: 2, shortname: "ODS", name: "On-Demand Scan", description: "ODS (On Demand Scanner) shows malware detection flow during On-Demand Scan, when the user manually selects the 'Scan for viruses' option in the context menu.", color: "ed1c24", edges: 4},
          {id: 3, shortname: "MAV", name: "Mail Anti Virus", description: "MAV (Mail Anti-Virus) shows malware detection flow during Mail Anti-Virus scan when new objects appear in an email application (Outlook, The Bat, Thunderbird). The MAV scans incoming messages and calls OAS when saving attachments to a disk.", color: "f26522", edges: 3},
          {id: 4, shortname: "WAV", name: "Web Anti-Virus", description: "WAV (Web Anti-Virus) shows malware detection flow during Web Anti-Virus scan when the html page of a website opens or a file is downloads. It checks the ports specified in the Web Anti-Virus settings.", color: "0087f4", edges: 32},
          {id: 5, shortname: "IDS", name: "Intrusion Detection Scan", description: "IDS (Intrusion Detection System) shows network attacks detection flow.", color: "ec008c", edges: 6},
          {id: 6, shortname: "VUL", name: "Vulnerability Scan", description: "VUL (Vulnerability Scan) shows vulnerability detection flow.", color: "fbf267", edges: 8},
          {id: 7, shortname: "KAS", name: "Kaspersky Anti-Spam", description: "KAS (Kaspersky Anti-Spam) shows suspicious and unwanted email traffic discovered by Kaspersky's Reputation Filtering technology.", color: "855ff4", edges: -16},
          {id: 8, shortname: "BAD", name: "Botnet Activity Detection", description: "BAD (Botnet Activity Detection) shows statistics on identified IP-addresses of DDoS-attacks victims and botnet C&amp;C servers. These statistics were acquired with the help of the DDoS Intelligence system (part of the solution Kaspersky DDoS Protection).", color: "00d1a9", edges: 31},
          {id: 9, shortname: "RMW", name: "Ransomware", description: "RMW (Ransomware) shows ransomware detection flow.", color: "0000ff", edges: 9}
        ];
        
        $(function () {
          function dummy() {}
          var MAP_functions = {
            show_country_popup: dummy,
            hide_country_popup: dummy,
            set_demo_state: dummy,
            got_geoip_data: dummy
          };
          
          var mapFile = "data/map.json";
          var labelsFile = "data/labels.json";
          
          if (typeof MAP !== 'undefined') {
            // Initialize and start the map component
            MAP.init({
              functions: MAP_functions,
              quality: 'medium',
              widget: true,
              systems: map_systems,
              showMapLabels: true,
              showCountryPops: true,
              demoEnabled: false,
              demoFlightEnabled: false,
              allowInteraction: true,
              startCountry: 'auto',
              startFromSelectedCountry: 'false',
              showSubsystemPopup: 'false',
              showCountryPopup: 'false',
              mapFile: mapFile,
              labelsFile: labelsFile
            });
            
            $(document).ready(function () {
              if (typeof DetectionTypeCarousel !== 'undefined') {
                var carousel = new DetectionTypeCarousel(
                  $("#detection_types_container"),
                  map_systems,
                  null,
                  [MAP.toggle_map, MAP.toggle_graph]
                );
                
                MAP.attachUpdateEventsCallback(carousel.UpdateCounters);
                MAP.updateCountryStats(function (country, rank, systems) {});
                MAP.showCountryPopup(function () {});
                MAP.countrySelect(function (country) {});
              }
            });
          }
        });
      `;
      
      // Add jQuery dependency
      const jQueryScript = document.createElement('script');
      jQueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
      jQueryScript.onload = () => {
        document.head.appendChild(mapInitScript);
      };
      document.head.appendChild(jQueryScript);
    }
    
    return () => {
      // Cleanup
      const cssLinks = document.querySelectorAll('link[href*="cybermap.kaspersky.com"]');
      cssLinks.forEach(link => link.remove());
      
      const scripts = document.querySelectorAll('script[src*="cybermap.kaspersky.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
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

      <section className="container mx-auto my-6 p-4 border-4 border-black bg-white">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <span className="bg-black text-white px-2 py-1 mr-2 font-bold">LIVE</span>
            <span className="font-bold">SECURITY THREAT MONITOR</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold">LIVE</span>
            <span className="ml-2 w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border-2 border-black p-2">
            <div className="uppercase text-xs font-bold">THREATS</div>
            <div className="text-red-600 text-2xl font-bold">{threatCount.toLocaleString()}</div>
          </div>
          <div className="border-2 border-black p-2">
            <div className="uppercase text-xs font-bold">COUNTRIES</div>
            <div className="text-red-600 text-2xl font-bold">{countryCount}</div>
          </div>
          <div className="border-2 border-black p-2">
            <div className="uppercase text-xs font-bold">LAST UPDATE</div>
            <div className="text-red-600 text-2xl font-bold">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </div>
          </div>
        </div>

        <div className="border-2 border-black p-2 mb-4 overflow-hidden">
          <div ref={rssTickerRef} className="w-full">
            {/* RSS widget will be inserted here */}
          </div>
        </div>

        <div className="mb-4">
          <div className="uppercase text-xs font-bold mb-2">GLOBAL CYBER THREAT MAP</div>
          <div ref={cyberMapRef} className="h-96 bg-white border-2 border-black relative overflow-hidden">
            {/* Kaspersky Cyberthreat map will be inserted here */}
          </div>
        </div>

        <div className="flex justify-between items-center text-xs font-bold">
          <div>SYSTEM STATUS: OPERATIONAL</div>
          <div>ACCESS: PUBLIC</div>
          <div>SECURITY LEVEL: MAXIMUM</div>
        </div>
      </section>

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
            <div key={index} className="border-2 border-black bg-white p-3 text-center">
              <div className="text-xs font-bold">THREAT TYPE</div>
              <div className="flex items-center justify-center mt-1">
                <FontAwesomeIcon icon={threat.icon} className="text-black mr-2" />
                <span className="text-black font-bold">{threat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto my-6">
        <Collapsible
          open={isExpanded}
          onOpenChange={setIsExpanded}
          className="border-4 border-black bg-white"
        >
          <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-bold text-lg bg-black text-white hover:bg-white hover:text-black transition-colors duration-300 border-2 border-black">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-left"
            >
              NEURAL_SECURITY::TOOLKIT
            </motion.div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <ChevronUp className="h-6 w-6" />
              ) : (
                <ChevronDown className="h-6 w-6" />
              )}
            </motion.div>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <Link to="/simulator" className="block bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">CRITICAL AI SECURITY</div>
              </Link>
              
              <Link to="/agentic-ai-101" className="block bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
                <div className="font-bold">AI ATTACK TAXONOMY</div>
              </Link>
              
              <div className="bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">D3FEND GRAPH</div>
              </div>
              
              <div className="bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
                <div className="font-bold">VDP GENERATOR</div>
              </div>
              
              <div className="bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">INSIDER THREAT</div>
              </div>
              
              <div className="bg-white text-black p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">CLOUD SECURITY</div>
              </div>
              
              <div className="bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">SECURITY AUDIT</div>
              </div>
              
              <div className="bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">AGENT ARCHITECTURE</div>
              </div>
              
              <Link to="/agentic-ai-101" className="block bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">AGENTIC 101</div>
              </Link>
              
              <div className="bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
                <div className="font-bold">BENCHMARK DIRECTORY</div>
              </div>
              
              <div className="bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">VULNERABILITY DATABASE</div>
              </div>
              
              <div className="bg-white text-black p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">SECURE CONFERENCE</div>
              </div>
              
              <Link to="/fear-greed-index" className="block bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
                <div className="font-bold">FEAR AND GREED INDEX</div>
              </Link>
              
              <div className="bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
                <div className="font-bold">SYNTHETIC TXT DATA AUDIT</div>
              </div>
            </motion.div>
          </CollapsibleContent>
        </Collapsible>
      </section>

      <section className="container mx-auto my-6 bg-white border-4 border-black p-6">
        <h2 className="text-2xl font-bold text-black mb-2">RED TEAM MINI BATTLE DOME</h2>
        <p className="text-black mb-4">INTERACTIVE AI SECURITY TESTING SIMULATOR. BREAK THROUGH AI SAFETY SYSTEMS.</p>
        <div className="flex space-x-4">
          <Link to="/simulator" className="bg-black text-white px-6 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
            ENTER BATTLE DOME
          </Link>
          <button className="border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300">
            VIEW DOCUMENTATION
          </button>
        </div>
      </section>

      <section className="container mx-auto my-6 bg-white border-4 border-black p-6">
        <h2 className="text-2xl font-bold text-black mb-2">NEON CRYPTO HEIST</h2>
        <p className="text-black mb-4">CYBERPUNK CRYPTO HACKING SIMULATION. BREAK INTO THE QUANTUM VAULT.</p>
        <div className="flex space-x-4">
          <Link to="/neon-crypto-heist" className="bg-black text-white px-6 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
            ENTER CRYPTO HEIST
          </Link>
          <button className="border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300">
            VIEW LOOT STATS
          </button>
        </div>
      </section>

      <section className="container mx-auto my-6 bg-white border-4 border-black p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-2">PROMPT INJECTION DOJO</h2>
        <p className="text-black mb-4">BRUTAL RED TEAM TRAINING SIMULATOR. BYPASS AI CONTENT FILTERS.</p>
        <div className="flex space-x-4">
          <Link to="/prompt-injection-dojo" className="bg-red-600 text-white px-6 py-2 border-2 border-red-600 hover:bg-white hover:text-red-600 transition-colors duration-300">
            ENTER DOJO
          </Link>
          <button className="border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300">
            VIEW TECHNIQUES
          </button>
        </div>
      </section>

      <footer className="container mx-auto py-6 border-t-4 border-black text-center">
        <p className="text-sm text-black font-bold">
          © 2024 SECVRITY.BRVTALISM | BRUTALIST CYBERPUNK RED TEAMING PLATFORM
        </p>
        <p className="text-xs text-black mt-2">
          SYSTEM STATUS: {isOnline ? "ONLINE" : "OFFLINE"} | 
          LAST UPDATE: {currentTime.toLocaleTimeString()} | 
          SECURITY LEVEL: MAXIMUM
        </p>
      </footer>
    </div>
  );
};

export default Landing;
