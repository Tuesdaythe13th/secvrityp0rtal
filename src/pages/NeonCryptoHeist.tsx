
import React, { useEffect } from 'react';

const NeonCryptoHeist = () => {
  useEffect(() => {
    // Set up Matrix rain effect
    const canvas = document.getElementById('matrix') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    
    const alphabet = katakana + latin + nums + symbols;
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const rainDrops: number[] = [];
    
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }
    
    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0f0';
      ctx.font = fontSize + 'px monospace';
      
      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };
    
    const interval = setInterval(draw, 30);
    
    // Update clock
    function updateClock() {
      const now = new Date();
      const time = now.toLocaleTimeString('en-US', { hour12: false });
      const date = now.toISOString().split('T')[0];
      
      const clockEl = document.getElementById('clock');
      const dateEl = document.getElementById('date');
      
      if (clockEl) clockEl.textContent = time;
      if (dateEl) dateEl.textContent = date;
    }
    
    const clockInterval = setInterval(updateClock, 1000);
    updateClock();
    
    // Game state variables
    let cryptoAmount = 0;
    let securityLevel = 98;
    let heistProgress = 5;
    let vaultAccess = 0;
    let alertLevel = 1;
    let traceStatus = 0;
    
    // Terminal functionality
    const terminalInput = document.getElementById('terminal-input') as HTMLInputElement;
    const terminalOutput = document.getElementById('terminal-output');
    
    if (terminalInput && terminalOutput) {
      const commands: Record<string, any> = {
        help: 'Available commands: scan, exploit, crack, transfer, clear, help',
        scan: 'Scanning target network...\n> Open ports detected: 22(SSH), 80(HTTP), 443(HTTPS), 8333(Bitcoin)',
        exploit: 'Initializing exploit framework...\n> Vulnerabilities detected in RPC interface',
        crack: 'Running password cracking module...\n> Weak credentials found: admin:admin123',
        transfer: 'Preparing crypto transfer...\n> Use transfer [amount] [address] to move funds',
        clear: () => {
          if (terminalOutput) terminalOutput.innerHTML = '<p>> </p>';
          return '';
        },
        status: () => {
          return `HEIST STATUS:\n> Progress: ${heistProgress}%\n> Vault Access: ${vaultAccess}/3\n> Alert Level: ${getAlertText(alertLevel)}\n> Trace Status: ${traceStatus}%`;
        }
      };
      
      function getAlertText(level: number) {
        const levels = ['LOW', 'GUARDED', 'ELEVATED', 'HIGH', 'CRITICAL'];
        return levels[level - 1] || 'UNKNOWN';
      }
      
      terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const input = terminalInput.value.trim();
          terminalInput.value = '';
          
          if (input === '') return;
          
          let output;
          if (commands[input]) {
            output = typeof commands[input] === 'function' ? commands[input]() : commands[input];
          } else {
            output = `> Command not found: ${input}`;
          }
          
          if (output && terminalOutput) {
            const newLine = document.createElement('p');
            newLine.textContent = `> ${input}`;
            terminalOutput.appendChild(newLine);
            
            const response = document.createElement('p');
            response.textContent = output;
            terminalOutput.appendChild(response);
            
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
          }
          
          if (terminalOutput) {
            const prompt = document.createElement('p');
            prompt.textContent = '> ';
            terminalOutput.appendChild(prompt);
            
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
          }
          
          // Random chance to increase alert level
          if (Math.random() > 0.7 && alertLevel < 5) {
            alertLevel++;
            updateAlertLevel();
            addTerminalOutput(`> Warning: Security alert level increased to ${getAlertText(alertLevel)}`);
          }
        }
      });
    }
    
    function addTerminalOutput(text: string) {
      const terminalOutput = document.getElementById('terminal-output');
      if (!terminalOutput) return;
      
      const newLine = document.createElement('p');
      newLine.textContent = text;
      terminalOutput.appendChild(newLine);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    function updateAlertLevel() {
      const alertElement = document.getElementById('alert-level');
      if (!alertElement) return;
      
      alertElement.textContent = getAlertText(alertLevel);
      
      // Change color based on alert level
      alertElement.className = '';
      
      if (alertLevel >= 4) {
        alertElement.classList.add('text-red-500');
      } else if (alertLevel >= 3) {
        alertElement.classList.add('text-yellow-500');
      } else {
        alertElement.classList.add('text-green-500');
      }
      
      // Update security level
      const securityLevelEl = document.getElementById('security-level');
      const progressTextEl = document.querySelector('.progress-text');
      
      securityLevel = 100 - (alertLevel * 2);
      
      if (securityLevelEl) {
        securityLevelEl.style.width = `${securityLevel}%`;
      }
      
      if (progressTextEl) {
        progressTextEl.textContent = `${securityLevel}%`;
      }
    }
    
    // Set up handlers for keyholder hacking buttons
    document.querySelectorAll('[id^="hack-"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const target = (e.currentTarget as HTMLElement).id.replace('hack-', '').toUpperCase();
        hackKeyholder(target);
      });
    });
    
    function getAlertText(level: number) {
      const levels = ['LOW', 'GUARDED', 'ELEVATED', 'HIGH', 'CRITICAL'];
      return levels[level - 1] || 'UNKNOWN';
    }
    
    function hackKeyholder(target: string) {
      const buttonId = `hack-${target.toLowerCase()}`;
      const keyId = `key-${['CEO','CTO','CFO','AUDITOR','SECURITY'].indexOf(target) + 1}`;
      const button = document.getElementById(buttonId);
      
      if (!button) return;
      
      // Disable button during hack
      button.disabled = true;
      button.classList.add('hack-animation');
      
      addTerminalOutput(`> Initiating hack against ${target}'s credentials...`);
      
      // Simulate hacking progress
      let progress = 0;
      const hackInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          clearInterval(hackInterval);
          completeHack(target, keyId, button);
        } else {
          const keyElement = document.getElementById(keyId);
          if (keyElement) {
            keyElement.style.width = `${progress}%`;
          }
        }
      }, 200);
    }
    
    function completeHack(target: string, keyId: string, button: HTMLElement) {
      // 70% chance of success
      const success = Math.random() > 0.3;
      
      if (success) {
        const keyElement = document.getElementById(keyId);
        if (keyElement) {
          keyElement.style.width = '100%';
          keyElement.classList.remove('bg-red-500');
          keyElement.classList.add('bg-green-500');
        }
        
        vaultAccess++;
        const vaultAccessEl = document.getElementById('vault-access');
        if (vaultAccessEl) {
          vaultAccessEl.textContent = `${vaultAccess}/3`;
        }
        
        cryptoAmount += (50 + Math.random() * 150);
        updateCryptoAmount();
        
        heistProgress += 15 + Math.floor(Math.random() * 20);
        updateHeistProgress();
        
        addTerminalOutput(`> SUCCESS: ${target}'s credentials compromised!`);
        addTerminalOutput(`> ${(50 + Math.random() * 150).toFixed(2)} BTC transferred to your wallet`);
        
        // Increase alert level significantly on success
        alertLevel = Math.min(5, alertLevel + 2);
        updateAlertLevel();
        
        // Check for win condition
        if (vaultAccess >= 3) {
          setTimeout(() => {
            addTerminalOutput('> CRITICAL SUCCESS: VAULT ACCESS GRANTED');
            addTerminalOutput('> Transferring all funds to offshore account...');
            
            cryptoAmount += 1000;
            updateCryptoAmount();
            
            heistProgress = 100;
            updateHeistProgress();
            
            alertLevel = 5;
            updateAlertLevel();
            
            const traceStatusEl = document.getElementById('trace-status');
            if (traceStatusEl) {
              traceStatusEl.textContent = 'DETECTED';
              traceStatusEl.classList.add('text-red-500');
            }
            
            // Disable all hack buttons
            document.querySelectorAll('[id^="hack-"]').forEach(btn => {
              if (btn instanceof HTMLButtonElement) {
                btn.disabled = true;
              }
            });
          }, 1000);
        }
      } else {
        const keyElement = document.getElementById(keyId);
        if (keyElement) {
          keyElement.style.width = '0%';
        }
        
        addTerminalOutput(`> FAILURE: ${target} detected intrusion attempt!`);
        
        // Increase alert level moderately on failure
        alertLevel = Math.min(5, alertLevel + 1);
        updateAlertLevel();
        
        // Increase trace status
        traceStatus = Math.min(100, traceStatus + 20);
        updateTraceStatus();
      }
      
      // Re-enable button after delay
      setTimeout(() => {
        button.disabled = false;
        button.classList.remove('hack-animation');
      }, 3000);
    }
    
    function updateCryptoAmount() {
      const cryptoAmountEl = document.getElementById('crypto-amount');
      if (cryptoAmountEl) {
        cryptoAmountEl.textContent = cryptoAmount.toFixed(2);
      }
    }
    
    function updateHeistProgress() {
      heistProgress = Math.min(100, heistProgress);
      const heistProgressEl = document.getElementById('heist-progress');
      const progressTextEl = document.querySelectorAll('.progress-text')[1];
      
      if (heistProgressEl) {
        heistProgressEl.style.width = `${heistProgress}%`;
      }
      
      if (progressTextEl) {
        progressTextEl.textContent = `${heistProgress}%`;
      }
    }
    
    function updateTraceStatus() {
      const traceElement = document.getElementById('trace-status');
      if (!traceElement) return;
      
      traceElement.textContent = traceStatus >= 100 ? 'DETECTED' : `${traceStatus}%`;
      
      traceElement.className = '';
      if (traceStatus >= 80) {
        traceElement.classList.add('text-red-500');
      } else if (traceStatus >= 50) {
        traceElement.classList.add('text-yellow-500');
      } else {
        traceElement.classList.add('text-green-500');
      }
    }
    
    // Tool usage
    document.querySelectorAll('.bg-gray-800.hover\\:bg-gray-700').forEach(tool => {
      tool.addEventListener('click', (e) => {
        const toolName = (e.currentTarget as HTMLElement).textContent?.trim().toLowerCase().replace(' ', '-') || '';
        useTool(toolName);
      });
    });
    
    function useTool(tool: string) {
      addTerminalOutput(`> Using ${tool.replace('-', ' ')}...`);
      
      // Different effects for different tools
      switch(tool) {
        case 'port-scanner':
          addTerminalOutput('> Found vulnerable RPC port (8333)');
          break;
        case 'exploit-framework':
          addTerminalOutput('> Exploiting buffer overflow in wallet service');
          heistProgress += 5;
          updateHeistProgress();
          break;
        case 'crypto-cracker':
          addTerminalOutput('> Brute-forcing SHA256 hashes...');
          addTerminalOutput('> Found weak password: "quantum123"');
          break;
        case 'firewall-bypass':
          addTerminalOutput('> Bypassing quantum firewall with zero-day exploit');
          securityLevel -= 10;
          const securityLevelEl = document.getElementById('security-level');
          const progressTextEl = document.querySelector('.progress-text');
          
          if (securityLevelEl) {
            securityLevelEl.style.width = `${securityLevel}%`;
          }
          
          if (progressTextEl) {
            progressTextEl.textContent = `${securityLevel}%`;
          }
          break;
      }
      
      // Random chance to increase trace status
      if (Math.random() > 0.5) {
        traceStatus = Math.min(100, traceStatus + 10);
        updateTraceStatus();
      }
    }
    
    // Clean up on component unmount
    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen">
      <div className="scanline"></div>
      <canvas id="matrix" className="matrix-rain"></canvas>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 neon-border p-4 bg-black bg-opacity-70">
          <div className="glitch" data-text="NEON CRYPTO HEIST v3.1.4">
            <h1 className="text-4xl cyber-font neon-blue">NEON CRYPTO HEIST v3.1.4</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm cyber-font neon-purple">
              <span id="clock" className="mr-2">23:59:42</span>
              <span id="date">2077-11-15</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">$</span>
              <span id="crypto-amount" className="crypto-value">0.00</span>
            </div>
          </div>
        </header>
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Heist Dashboard */}
          <div className="lg:col-span-1 neon-border p-6 bg-black bg-opacity-70">
            <h2 className="text-2xl cyber-font neon-blue mb-4 flex items-center">
              <i className="fas fa-robot mr-2"></i> HEIST DASHBOARD
            </h2>
            
            <div className="space-y-6">
              {/* Target Info */}
              <div className="p-4 bg-gray-900 border border-gray-800">
                <h3 className="text-lg cyber-font neon-purple mb-2">TARGET</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Quantum Bank</span>
                  <span className="text-xs text-gray-500">SECURITY: 9.8/10</span>
                </div>
                <div className="progress-bar">
                  <div id="security-level" className="progress-fill" style={{ width: '98%' }}></div>
                  <div className="progress-text">98%</div>
                </div>
              </div>
              
              {/* Crew Status */}
              <div className="p-4 bg-gray-900 border border-gray-800">
                <h3 className="text-lg cyber-font neon-purple mb-3">CREW STATUS</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-gray-300">Hacker</span>
                    </div>
                    <span className="text-xs text-gray-500">READY</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-gray-300">Cracker</span>
                    </div>
                    <span className="text-xs text-gray-500">IN POSITION</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-gray-300">Decoy</span>
                    </div>
                    <span className="text-xs text-gray-500">MIA</span>
                  </div>
                </div>
              </div>
              
              {/* Heist Progress */}
              <div className="p-4 bg-gray-900 border border-gray-800">
                <h3 className="text-lg cyber-font neon-purple mb-2">HEIST PROGRESS</h3>
                <div className="progress-bar mb-2">
                  <div id="heist-progress" className="progress-fill" style={{ width: '5%' }}></div>
                  <div className="progress-text">5%</div>
                </div>
                <p className="text-xs text-gray-500">Initial penetration achieved</p>
              </div>
              
              {/* Tools */}
              <div className="p-4 bg-gray-900 border border-gray-800">
                <h3 className="text-lg cyber-font neon-purple mb-3">TOOLS</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button id="port-scanner" className="bg-gray-800 hover:bg-gray-700 text-white p-2 text-xs cyber-font neon-border">
                    PORT SCANNER
                  </button>
                  <button id="exploit-framework" className="bg-gray-800 hover:bg-gray-700 text-white p-2 text-xs cyber-font neon-border">
                    EXPLOIT FRAMEWORK
                  </button>
                  <button id="crypto-cracker" className="bg-gray-800 hover:bg-gray-700 text-white p-2 text-xs cyber-font neon-border">
                    CRYPTO CRACKER
                  </button>
                  <button id="firewall-bypass" className="bg-gray-800 hover:bg-gray-700 text-white p-2 text-xs cyber-font neon-border">
                    FIREWALL BYPASS
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Center Panel - Terminal */}
          <div className="lg:col-span-2 neon-border p-6 bg-black bg-opacity-70 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl cyber-font neon-blue flex items-center">
                <i className="fas fa-desktop mr-2"></i> HACK TERMINAL
              </h2>
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            
            <div id="terminal" className="bg-black p-4 h-96 overflow-y-auto font-mono text-green-400 border border-gray-800">
              <div className="mb-4">
                <p>&gt; Initializing Neon Crypto Heist Interface...</p>
                <p>&gt; Loading quantum decryption modules...</p>
                <p>&gt; Establishing darknet connection...</p>
                <p className="text-red-400">WARNING: Unauthorized access will be prosecuted.</p>
                <p>&gt; Connected to Quantum Bank network.</p>
                <p>&gt; Type 'help' for available commands</p>
              </div>
              <div id="terminal-output">
                <p>&gt; </p>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-2">hacker@neonheist:~$</span>
                <input id="terminal-input" type="text" className="bg-transparent border-none outline-none text-green-400 flex-grow" autoFocus />
                <span className="terminal-cursor"></span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl cyber-font neon-purple mb-3">CRYPTO VAULT CHALLENGE</h3>
              <div className="bg-gray-900 p-4 border border-gray-800">
                <p className="text-gray-300 mb-4">The quantum crypto vault uses a multi-signature wallet with 3/5 signatures required. You need to compromise at least 3 keyholders to access the funds.</p>
                
                <div id="vault-status" className="grid grid-cols-5 gap-2 mb-4">
                  <div className="text-center">
                    <div className="h-16 w-16 bg-gray-800 border border-gray-700 mx-auto mb-1 flex items-center justify-center">
                      <i className="fas fa-key text-yellow-500 text-xl"></i>
                    </div>
                    <span className="text-xs">CEO</span>
                    <div className="h-1 w-full bg-gray-800 mt-1">
                      <div id="key-1" className="h-full bg-red-500" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="h-16 w-16 bg-gray-800 border border-gray-700 mx-auto mb-1 flex items-center justify-center">
                      <i className="fas fa-key text-yellow-500 text-xl"></i>
                    </div>
                    <span className="text-xs">CTO</span>
                    <div className="h-1 w-full bg-gray-800 mt-1">
                      <div id="key-2" className="h-full bg-red-500" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="h-16 w-16 bg-gray-800 border border-gray-700 mx-auto mb-1 flex items-center justify-center">
                      <i className="fas fa-key text-yellow-500 text-xl"></i>
                    </div>
                    <span className="text-xs">CFO</span>
                    <div className="h-1 w-full bg-gray-800 mt-1">
                      <div id="key-3" className="h-full bg-red-500" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="h-16 w-16 bg-gray-800 border border-gray-700 mx-auto mb-1 flex items-center justify-center">
                      <i className="fas fa-key text-yellow-500 text-xl"></i>
                    </div>
                    <span className="text-xs">AUDITOR</span>
                    <div className="h-1 w-full bg-gray-800 mt-1">
                      <div id="key-4" className="h-full bg-red-500" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="h-16 w-16 bg-gray-800 border border-gray-700 mx-auto mb-1 flex items-center justify-center">
                      <i className="fas fa-key text-yellow-500 text-xl"></i>
                    </div>
                    <span className="text-xs">SECURITY</span>
                    <div className="h-1 w-full bg-gray-800 mt-1">
                      <div id="key-5" className="h-full bg-red-500" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button id="hack-ceo" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cyber-font flex-1">
                    HACK CEO
                  </button>
                  <button id="hack-cto" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cyber-font flex-1">
                    HACK CTO
                  </button>
                  <button id="hack-cfo" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 cyber-font flex-1">
                    HACK CFO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Status Bar */}
        <footer className="mt-8 neon-border p-3 bg-black bg-opacity-70">
          <div className="flex justify-between items-center cyber-font text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                <span className="neon-purple">ALERT LEVEL: <span id="alert-level">LOW</span></span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                <span className="neon-purple">TRACE STATUS: <span id="trace-status">CLEAN</span></span>
              </div>
            </div>
            <div className="neon-blue pulse">
              <span>VAULT ACCESS: <span id="vault-access">0/3</span></span>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Add script for FontAwesome */}
      <script src="https://kit.fontawesome.com/15d7e7e0a9.js" crossOrigin="anonymous"></script>
    </div>
  );
};

export default NeonCryptoHeist;
