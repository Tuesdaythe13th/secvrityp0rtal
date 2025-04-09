
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdversarialTaxonomy() {
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(0);

  // Handle showing details for a taxonomy item
  const showDetails = (itemId: string) => {
    setSelectedDetail(itemId === selectedDetail ? null : itemId);
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults(0);
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Count results (simplified implementation)
    if (value.trim() === "") {
      setSearchResults(0);
    } else {
      // Just a basic count for demo purposes
      setSearchResults(
        ["glitch", "noise", "error", "detournement", "parasitism", "sabotage", "obfuscation", "encryption", "stealth"]
          .filter(item => item.includes(value.toLowerCase()))
          .length
      );
    }
  };

  useEffect(() => {
    document.title = "Adversarial Taxonomy - Neural Security";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Styles */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=IBM+Plex+Mono:wght@400;700&display=swap');
        
        .brutal-border {
            border: 8px solid #fff;
            position: relative;
            transition: all 0.3s ease;
        }
        
        .brutal-border:hover {
            border-color: #ff0000;
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
        
        .search-box {
            background: rgba(255,255,255,0.1);
            border: 2px solid #fff;
            color: white;
            padding: 10px 15px;
            font-family: 'IBM Plex Mono', monospace;
            width: 100%;
            margin-bottom: 20px;
            transition: all 0.3s ease;
        }
        
        .search-box:focus {
            outline: none;
            border-color: #ff0000;
            box-shadow: 0 0 10px rgba(255,0,0,0.5);
        }
        `}
      </style>

      {/* Content */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="px-4 py-2 bg-black text-white font-bold border-2 border-white hover:bg-red-800 hover:border-red-800"
        >
          ← BACK
        </Link>
      </div>

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
            <input 
              type="text" 
              className="search-box" 
              placeholder="SEARCH TAXONOMY..." 
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-400">{searchResults} RESULTS</span>
              <button onClick={clearSearch} className="copy-btn px-2 py-1 border border-white hover:bg-red-800 hover:border-red-800">CLEAR</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" id="taxonomy-grid">
            <div className="col-span-1">
              <div className="p-4 md:p-6 brutal-border mb-8 h-full">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">DISRUPTION</h3>
                <p className="mb-4">
                  THE PRIMARY TOOL OF ADVERSARIAL PRACTICE. TO INTERRUPT THE EXPECTED FLOW AND CREATE NEW PATHWAYS.
                </p>
                <div className="taxonomy-item" onClick={() => showDetails('glitch')}>
                  <h4 className="text-xl font-bold mb-2">GLITCH</h4>
                  <p className="text-sm">INTENTIONAL SYSTEM FAILURE AS AESTHETIC</p>
                  {selectedDetail === 'glitch' && (
                    <div className="mt-4 p-3 bg-gray-800">
                      <p>The deliberate exploitation of digital or analog errors to create unexpected aesthetic outcomes.</p>
                    </div>
                  )}
                </div>
                <div className="taxonomy-item" onClick={() => showDetails('noise')}>
                  <h4 className="text-xl font-bold mb-2">NOISE</h4>
                  <p className="text-sm">SIGNAL CORRUPTION AS COMMUNICATION</p>
                  {selectedDetail === 'noise' && (
                    <div className="mt-4 p-3 bg-gray-800">
                      <p>Using signal degradation and interference patterns as deliberate compositional elements.</p>
                    </div>
                  )}
                </div>
                <div className="taxonomy-item" onClick={() => showDetails('error')}>
                  <h4 className="text-xl font-bold mb-2">ERROR</h4>
                  <p className="text-sm">FAILURE AS CREATIVE CATALYST</p>
                  {selectedDetail === 'error' && (
                    <div className="mt-4 p-3 bg-gray-800">
                      <p>Embracing system failures and mistakes as generative principles rather than obstacles.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="p-4 md:p-6 brutal-border mb-8 h-full">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">SUBVERSION</h3>
                <p className="mb-4">
                  THE ACT OF OVERTURNING ESTABLISHED NORMS AND REPLACING THEM WITH UNEXPECTED ALTERNATIVES.
                </p>
                <div className="taxonomy-item" onClick={() => showDetails('detournement')}>
                  <h4 className="text-xl font-bold mb-2">DETOURNEMENT</h4>
                  <p className="text-sm">HACKING EXISTING STRUCTURES</p>
                  {selectedDetail === 'detournement' && (
                    <div className="mt-4 p-3 bg-gray-800">
                      <p>Repurposing existing cultural artifacts by changing their context or content to create new meanings.</p>
                    </div>
                  )}
                </div>
                <div className="taxonomy-item" onClick={() => showDetails('parasitism')}>
                  <h4 className="text-xl font-bold mb-2">PARASITISM</h4>
                  <p className="text-sm">FEEDING ON HOST SYSTEMS</p>
                  {selectedDetail === 'parasitism' && (
                    <div className="mt-4 p-3 bg-gray-800">
                      <p>Creating works that depend on or exploit existing systems while undermining or redirecting them.</p>
                    </div>
                  )}
                </div>
                <div className="taxonomy-item" onClick={() => showDetails('sabotage')}>
                  <h4 className="text-xl font-bold mb-2">SABOTAGE</h4>
                  <p className="text-sm">SYSTEMIC CIRCUMVENTION</p>
                  {selectedDetail === 'sabotage' && (
                    <div className="mt-4 p-3 bg-gray-800">
                      <p>The deliberate disruption of systems to reveal their vulnerabilities and assumptions.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-span-1">
              <div className="p-4 md:p-6 brutal-border mb-8 h-full">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">RESISTANCE</h3>
                <p className="mb-4">THE WILL TO PERSIST AGAINST ASSIMILATION AND HOMOGENIZATION.</p>
                <div className="taxonomy-item" onClick={() => showDetails('obfuscation')}>
                  <h4 className="text-xl font-bold mb-2">OBFUSCATION</h4>
                  <p className="text-sm">MAKING LEGIBLE ILLEGIBLE</p>
                  {selectedDetail === 'obfuscation' && (
                    <div className="mt-4 p-3 bg-gray-800">
                      <p>Creating confusion or ambiguity as a strategy against surveillance and control systems.</p>
                    </div>
                  )}
                </div>
                <div className="taxonomy-item" onClick={() => showDetails('encryption')}>
                  <h4 className="text-xl font-bold mb-2">ENCRYPTION</h4>
                  <p className="text-sm">CODED COMMUNICATION</p>
                  {selectedDetail === 'encryption' && (
                    <div className="mt-4 p-3 bg-gray-800">
                      <p>Using cryptographic techniques to hide messages within public-facing works.</p>
                    </div>
                  )}
                </div>
                <div className="taxonomy-item" onClick={() => showDetails('stealth')}>
                  <h4 className="text-xl font-bold mb-2">STEALTH</h4>
                  <p className="text-sm">OPERATING BELOW THRESHOLDS</p>
                  {selectedDetail === 'stealth' && (
                    <div className="mt-4 p-3 bg-gray-800">
                      <p>Creating works that exist below the threshold of detection or recognition by systems of power.</p>
                    </div>
                  )}
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
              <button className="text-white hover:text-red-600 transition-all">
                DOWNLOAD PDF
              </button>
              <button className="text-white hover:text-red-600 transition-all">
                PRINT VERSION
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
