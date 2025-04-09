
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { commands } from '../utils/terminalCommands';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<JSX.Element[]>([
    <p key="init-1">&gt; Initializing CyberPunk Red Team Simulator...</p>,
    <p key="init-2">&gt; Loading vulnerability database...</p>,
    <p key="init-3">&gt; Establishing secure connection...</p>,
    <p key="init-4" className="text-red-400">WARNING: This system is for authorized penetration testing only.</p>,
    <p key="init-5">&gt; Ready.</p>,
    <p key="init-6">&gt; Type 'help' for available commands</p>
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when output changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    setHistory(prev => [...prev, trimmedCmd]);
    
    // Add command to output
    setOutput(prev => [...prev, <p key={`cmd-${prev.length}`}>&gt; {trimmedCmd}</p>]);
    
    // Process command
    if (trimmedCmd in commands) {
      const result = commands[trimmedCmd].execute();
      
      if (trimmedCmd === 'clear') {
        setOutput([]);
      } else if (result) {
        const resultLines = result.split('\n');
        setOutput(prev => [
          ...prev, 
          ...resultLines.map((line, i) => (
            <p key={`result-${prev.length}-${i}`}>{line}</p>
          ))
        ]);
      }
    } else if (trimmedCmd) {
      setOutput(prev => [...prev, <p key={`error-${prev.length}`}>&gt; Command not found: {trimmedCmd}</p>]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl cyber-font neon-red flex items-center">
          <span className="mr-2">█</span> TERMINAL
        </h2>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="bg-black p-4 h-96 overflow-y-auto font-mono text-green-400 border border-gray-800"
        onClick={focusInput}
      >
        <div className="mb-4">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        
        <div className="flex items-center">
          <span className="text-red-500 mr-2">user@redteam:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-green-400 flex-grow w-full"
            autoFocus
          />
          <span className="terminal-cursor"></span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
