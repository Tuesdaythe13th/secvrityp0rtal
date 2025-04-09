
import { useState, useEffect, useRef } from "react";

interface ThreatMonitorProps {
  threatCount: number;
  setThreatCount: React.Dispatch<React.SetStateAction<number>>;
  countryCount: number;
  currentTime: Date;
}

const ThreatMonitor = ({ threatCount, setThreatCount, countryCount, currentTime }: ThreatMonitorProps) => {
  const rssTickerRef = useRef<HTMLDivElement>(null);

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

  return (
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
        <div className="h-[400px] bg-white border-2 border-black relative overflow-hidden">
          <iframe 
            width="100%" 
            height="100%" 
            src="https://cybermap.kaspersky.com/en/widget/dynamic/dark" 
            frameBorder="0"
            title="Kaspersky Cyberthreat Map"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs font-bold">
        <div>SYSTEM STATUS: OPERATIONAL</div>
        <div>ACCESS: PUBLIC</div>
        <div>SECURITY LEVEL: MAXIMUM</div>
      </div>
    </section>
  );
};

export default ThreatMonitor;
