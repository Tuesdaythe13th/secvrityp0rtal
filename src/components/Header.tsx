
import { useEffect, useState } from 'react';

const Header = () => {
  const [time, setTime] = useState('23:59:42');
  const [date, setDate] = useState('2077-11-15');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour12: false });
      const dateString = now.toISOString().split('T')[0];
      
      setTime(timeString);
      setDate(dateString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex justify-between items-center mb-8 neon-border p-4 bg-black bg-opacity-70">
      <div className="glitch" data-text="CYBERPUNK RED TEAM SIM v4.2.0">
        <h1 className="text-3xl md:text-4xl cyber-font neon-red">CYBERPUNK RED TEAM SIM v4.2.0</h1>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm cyber-font neon-pink">
          <span className="mr-2">{time}</span>
          <span>{date}</span>
        </div>
        <div className="w-16 h-6 bg-red-500 flex items-center justify-center">
          <div className="w-4 h-4 bg-red-700 animate-pulse"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
