import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/landing/Header";
import ThreatMonitor from "@/components/landing/ThreatMonitor";
import ThreatTypes from "@/components/landing/ThreatTypes";
import SecurityToolkit from "@/components/landing/SecurityToolkit";
import FeaturedSimulator from "@/components/landing/FeaturedSimulator";
import Footer from "@/components/landing/Footer";
import AgentArchHomePreview from "@/components/landing/AgentArchHomePreview";

const Landing = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [threatCount, setThreatCount] = useState(24687);
  const [countryCount, setCountryCount] = useState(187);
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(true);
  const [glitchText, setGlitchText] = useState("SECVRITY.P0RT4L");

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

  return (
    <div className="bg-white text-black min-h-screen">
      <Header glitchText={glitchText} setGlitchText={setGlitchText} />
      <ThreatMonitor 
        threatCount={threatCount} 
        setThreatCount={setThreatCount} 
        countryCount={countryCount} 
        currentTime={currentTime} 
      />

      {/* AGENT ARCH PROMO (preview box) */}
      <AgentArchHomePreview />

      {/* RED TEAM MINI BATTLE DOME FEATURED SIMULATOR */}
      <FeaturedSimulator 
        title="RED TEAM MINI BATTLE DOME"
        description="INTERACTIVE AI SECURITY TESTING SIMULATOR. BREAK THROUGH AI SAFETY SYSTEMS."
        primaryLinkText="ENTER BATTLE DOME"
        primaryLinkPath="/simulator"
        secondaryButtonText="VIEW DOCUMENTATION"
      />
      
      <FeaturedSimulator 
        title="NEON CRYPTO HEIST"
        description="CYBERPUNK CRYPTO HACKING SIMULATION. BREAK INTO THE QUANTUM VAULT."
        primaryLinkText="ENTER CRYPTO HEIST"
        primaryLinkPath="/neon-crypto-heist"
        secondaryButtonText="VIEW LOOT STATS"
      />
      
      <FeaturedSimulator 
        title="PROMPT INJECTION DOJO"
        description="BRUTAL RED TEAM TRAINING SIMULATOR. BYPASS AI CONTENT FILTERS."
        primaryLinkText="ENTER DOJO"
        primaryLinkPath="/prompt-injection-dojo"
        secondaryButtonText="VIEW TECHNIQUES"
        isHighlighted={true}
      />
      
      <Footer isOnline={isOnline} currentTime={currentTime} />
    </div>
  );
};

export default Landing;
