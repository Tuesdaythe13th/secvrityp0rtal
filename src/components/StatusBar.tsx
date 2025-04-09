
import { useState, useEffect } from 'react';

interface StatusBarProps {
  status?: string;
}

const StatusBar = ({ status = "READY" }: StatusBarProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  return (
    <footer className="mt-8 neon-border p-3 bg-black bg-opacity-70">
      <div className="flex justify-between items-center cyber-font text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
            <span className="neon-pink">SECURITY LEVEL: HIGH</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <span className="neon-pink">CONNECTION: SECURE</span>
          </div>
        </div>
        <div className="neon-red animate-pulse">
          <span>STATUS: <span id="status">{currentStatus}</span></span>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;
