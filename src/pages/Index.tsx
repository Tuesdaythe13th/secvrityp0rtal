
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <Link to="/">
            <motion.button 
              className="border border-neonRed text-neonRed px-4 py-2 flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,0,60,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              ← BACK TO ARTIFEX LABS
            </motion.button>
          </Link>
        </motion.div>
        
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
