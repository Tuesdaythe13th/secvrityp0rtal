
import { useState } from 'react';
import Header from '@/components/Header';
import MatrixRain from '@/components/MatrixRain';
import MissionBriefing from '@/components/MissionBriefing';
import Terminal from '@/components/Terminal';
import Challenge from '@/components/Challenge';
import StatusBar from '@/components/StatusBar';

const Index = () => {
  const [appStatus, setAppStatus] = useState("READY");

  return (
    <div className="relative min-h-screen">
      <div className="scanline"></div>
      <MatrixRain />
      
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Mission Briefing */}
          <div className="lg:col-span-1">
            <MissionBriefing />
          </div>
          
          {/* Center Panel - Terminal */}
          <div className="lg:col-span-2">
            <Terminal />
            <Challenge />
          </div>
        </div>
        
        <StatusBar status={appStatus} />
      </div>
    </div>
  );
};

export default Index;
