
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdversarialTaxonomy() {
  useEffect(() => {
    // Set document title
    document.title = "Adversarial Taxonomy - Neural Security";
    
    // Add CSS for the brutalist aesthetic
    const style = document.createElement("style");
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=IBM+Plex+Mono:wght@400;700&display=swap');
        
        .brutal-border {
            border: 8px solid #fff;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .brutal-border:hover {
            border-color: #ff0000;
        }
        
        .brutal-border:before {
            content: "";
            position: absolute;
            top: -12px;
            left: -12px;
            right: -12px;
            bottom: -12px;
            border: 4px solid #ff0000;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .brutal-border:hover:before {
            opacity: 1;
        }
        
        .glitch {
            position: relative;
        }
        
        .glitch:before, .glitch:after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
        }
        
        .glitch:before {
            left: 2px;
            text-shadow: -2px 0 #ff0000;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim-1 2s infinite linear alternate-reverse;
        }
        
        .glitch:after {
            left: -2px;
            text-shadow: -2px 0 #00ff00;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim-2 2s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim-1 {
            0% { clip: rect(32px, 9999px, 78px, 0); }
            10% { clip: rect(65px, 9999px, 119px, 0); }
            20% { clip: rect(54px, 9999px, 149px, 0); }
            30% { clip: rect(21px, 9999px, 28px, 0); }
            40% { clip: rect(91px, 9999px, 132px, 0); }
            50% { clip: rect(98px, 9999px, 145px, 0); }
            60% { clip: rect(14px, 9999px, 47px, 0); }
            70% { clip: rect(40px, 9999px, 78px, 0); }
            80% { clip: rect(2px, 9999px, 35px, 0); }
            90% { clip: rect(87px, 9999px, 129px, 0); }
            100% { clip: rect(34px, 9999px, 60px, 0); }
        }
        
        @keyframes glitch-anim-2 {
            0% { clip: rect(61px, 9999px, 119px, 0); }
            10% { clip: rect(33px, 9999px, 59px, 0); }
            20% { clip: rect(78px, 9999px, 134px, 0); }
            30% { clip: rect(112px, 9999px, 159px, 0); }
            40% { clip: rect(15px, 9999px, 44px, 0); }
            50% { clip: rect(67px, 9999px, 102px, 0); }
            60% { clip: rect(98px, 9999px, 145px, 0); }
            70% { clip: rect(109px, 9999px, 138px, 0); }
            80% { clip: rect(45px, 9999px, 65px, 0); }
            90% { clip: rect(21px, 9999px, 26px, 0); }
            100% { clip: rect(58px, 9999px, 96px, 0); }
        }
        
        .error-corruption {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), 
                linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
            background-size: 100% 2px, 3px 100%;
            pointer-events: none;
            z-index: 10;
            opacity: 0.4;
        }
        
        .ai-category {
            border-left: 8px solid;
            padding-left: 20px;
            transition: all 0.3s ease;
        }
        
        .ai-category:hover {
            transform: translateX(5px);
        }
        
        .taxonomy-item {
            margin-bottom: 16px;
            padding: 12px;
            background-color: rgba(255, 255, 255, 0.05);
            border-left: 4px solid #ff0000;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .taxonomy-item:hover {
            background-color: rgba(255, 255, 255, 0.1);
            transform: translateX(5px);
        }
    `;
    document.head.appendChild(style);

    // Functions for the adversarial taxonomy
    window.showDetails = function(id) {
      alert(`Details for ${id} would be shown here`);
    };

    window.clearSearch = function() {
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.value = '';
        document.getElementById('search-count').textContent = '0 RESULTS';
      }
    };

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="brutal-btn px-4 py-2 bg-black text-white font-bold border-2 border-white hover:bg-red-600 hover:border-red-600"
        >
          ← BACK
        </Link>
      </div>

      <div id="app" className="min-h-screen flex flex-col pt-16">
        {/* Main Page */}
        <div id="main-page" className="min-h-screen flex flex-col">
          {/* Brutal Header */}
          <header className="p-6 md:p-8 border-b-8 border-white">
            <div className="container mx-auto flex justify-between items-center">
              <div className="w-24"></div> {/* spacer for balance */}
              <h1 className="text-2xl md:text-4xl font-bold tracking-tighter">
                TAXONOMY<span className="text-red-600">.</span>OF<span className="text-red-600">.</span>ADVERSARIAL
                <span className="text-red-600">.</span>ARTS
              </h1>
              <div className="w-24"></div> {/* spacer for balance */}
            </div>
          </header>

          {/* Taxonomy Content */}
          <main className="flex-grow py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-6 relative">
              <div className="error-corruption"></div>
              
              {/* Search Box */}
              <div className="mb-8">
                <input type="text" id="search-input" className="search-box" placeholder="SEARCH TAXONOMY..." />
                <div className="flex justify-between items-center mt-2">
                  <span id="search-count" className="text-sm text-gray-400">0 RESULTS</span>
                  <button onClick={() => window.clearSearch()} className="copy-btn">CLEAR</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" id="taxonomy-grid">
                <div className="col-span-1">
                  <div className="p-4 md:p-6 brutal-border mb-8 h-full">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">DISRUPTION</h3>
                    <p className="mb-4">
                      THE PRIMARY TOOL OF ADVERSARIAL PRACTICE. TO INTERRUPT THE EXPECTED FLOW AND CREATE NEW PATHWAYS.
                    </p>
                    <div className="taxonomy-item" onClick={() => window.showDetails('glitch')}>
                      <h4 className="text-xl font-bold mb-2">GLITCH</h4>
                      <p className="text-sm">INTENTIONAL SYSTEM FAILURE AS AESTHETIC</p>
                    </div>
                    <div className="taxonomy-item" onClick={() => window.showDetails('noise')}>
                      <h4 className="text-xl font-bold mb-2">NOISE</h4>
                      <p className="text-sm">SIGNAL CORRUPTION AS COMMUNICATION</p>
                    </div>
                    <div className="taxonomy-item" onClick={() => window.showDetails('error')}>
                      <h4 className="text-xl font-bold mb-2">ERROR</h4>
                      <p className="text-sm">FAILURE AS CREATIVE CATALYST</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="p-4 md:p-6 brutal-border mb-8 h-full">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">SUBVERSION</h3>
                    <p className="mb-4">
                      THE ACT OF OVERTURNING ESTABLISHED NORMS AND REPLACING THEM WITH UNEXPECTED ALTERNATIVES.
                    </p>
                    <div className="taxonomy-item" onClick={() => window.showDetails('detournement')}>
                      <h4 className="text-xl font-bold mb-2">DETOURNEMENT</h4>
                      <p className="text-sm">HACKING EXISTING STRUCTURES</p>
                    </div>
                    <div className="taxonomy-item" onClick={() => window.showDetails('parasitism')}>
                      <h4 className="text-xl font-bold mb-2">PARASITISM</h4>
                      <p className="text-sm">FEEDING ON HOST SYSTEMS</p>
                    </div>
                    <div className="taxonomy-item" onClick={() => window.showDetails('sabotage')}>
                      <h4 className="text-xl font-bold mb-2">SABOTAGE</h4>
                      <p className="text-sm">SYSTEMIC CIRCUMVENTION</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-1">
                  <div className="p-4 md:p-6 brutal-border mb-8 h-full">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">RESISTANCE</h3>
                    <p className="mb-4">THE WILL TO PERSIST AGAINST ASSIMILATION AND HOMOGENIZATION.</p>
                    <div className="taxonomy-item" onClick={() => window.showDetails('obfuscation')}>
                      <h4 className="text-xl font-bold mb-2">OBFUSCATION</h4>
                      <p className="text-sm">MAKING LEGIBLE ILLEGIBLE</p>
                    </div>
                    <div className="taxonomy-item" onClick={() => window.showDetails('encryption')}>
                      <h4 className="text-xl font-bold mb-2">ENCRYPTION</h4>
                      <p className="text-sm">CODED COMMUNICATION</p>
                    </div>
                    <div className="taxonomy-item" onClick={() => window.showDetails('stealth')}>
                      <h4 className="text-xl font-bold mb-2">STEALTH</h4>
                      <p className="text-sm">OPERATING BELOW THRESHOLDS</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-12 p-4 md:p-8 brutal-border">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">MANIFESTO</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                  <div>
                    <p className="mb-4 font-bold">1. AESTHETICS MUST WOUND.</p>
                    <p>COMFORT IS THE ENEMY OF AWARENESS. DESIGN SHOULD AGITATE, DISTURB, AND CHALLENGE.</p>
                  </div>
                  <div>
                    <p className="mb-4 font-bold">2. SYSTEMS MUST FAIL.</p>
                    <p>PERFECTION IS A LIE. EMBRACE THE GLITCH, THE ERROR, AND THE UNEXPECTED.</p>
                  </div>
                  <div>
                    <p className="mb-4 font-bold">3. FORM MUST FOLLOW FRACTURE.</p>
                    <p>STRUCTURE EMERGES FROM COLLAPSE. BUILD FROM THE RUINS OF STANDARDIZATION.</p>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Brutal Footer */}
          <footer className="p-6 md:p-8 border-t-8 border-white mt-auto">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="mb-4 md:mb-0">© 2023 BRVTAL.DESIGN — ADVERSARIAL EDITION</p>
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  <a href="#" className="text-white hover:text-red-600 transition-all">
                    DOWNLOAD PDF
                  </a>
                  <a href="#" className="text-white hover:text-red-600 transition-all">
                    PRINT VERSION
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
