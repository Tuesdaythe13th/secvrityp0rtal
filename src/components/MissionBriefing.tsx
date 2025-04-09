
import React from 'react';

const MissionBriefing: React.FC = () => {
  return (
    <div className="neon-border p-6 bg-black bg-opacity-70 h-full">
      <h2 className="text-2xl cyber-font neon-red mb-4 flex items-center">
        <span className="mr-2">█</span> MISSION BRIEFING
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-900 border border-gray-800">
          <h3 className="text-lg cyber-font neon-pink">OBJECTIVE</h3>
          <p className="text-gray-300 mt-2">Penetrate the target system and identify vulnerabilities. Your goal is to simulate a real-world cyber attack to test the system's defenses.</p>
        </div>
        
        <div className="p-4 bg-gray-900 border border-gray-800">
          <h3 className="text-lg cyber-font neon-pink">TARGET</h3>
          <p className="text-gray-300 mt-2">Megacorp Financial Network (MFN)</p>
          <p className="text-xs text-gray-500 mt-1">IP: 192.168.4.22</p>
        </div>
        
        <div className="p-4 bg-gray-900 border border-gray-800">
          <h3 className="text-lg cyber-font neon-pink">TOOLS</h3>
          <ul className="text-gray-300 mt-2 space-y-1">
            <li><span className="text-red-500 mr-2">▶</span> Port Scanner</li>
            <li><span className="text-red-500 mr-2">▶</span> Vulnerability Database</li>
            <li><span className="text-red-500 mr-2">▶</span> Exploit Framework</li>
            <li><span className="text-red-500 mr-2">▶</span> Password Cracker</li>
          </ul>
        </div>
        
        <div className="p-4 bg-gray-900 border border-gray-800">
          <h3 className="text-lg cyber-font neon-pink">SCENARIO</h3>
          <p className="text-gray-300 mt-2">You're a red team operator hired to test MFN's new quantum encryption system. Find a way in before their security team detects you.</p>
        </div>
      </div>
    </div>
  );
};

export default MissionBriefing;
