
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CriticalAISecurityGuide.css";

const SyntheticDataAudit = () => {
  useEffect(() => {
    document.title = "Synthetic Data Audit - Neural Security";

    // Function to toggle content visibility
    const toggleSection = (id: string) => {
      const section = document.getElementById(id);
      if (section) {
        if (section.classList.contains("hidden")) {
          section.classList.remove("hidden");
          section.classList.add("animate__animated", "animate__fadeIn");
        } else {
          section.classList.add("hidden");
        }
      }
    };

    // Expose the function to window for button onClick handlers
    (window as any).toggleSection = toggleSection;

    // Initialize first section to be visible
    setTimeout(() => {
      const dataSection = document.getElementById("dataSection");
      if (dataSection) {
        dataSection.classList.remove("hidden");
        dataSection.classList.add("animate__animated", "animate__fadeIn");
      }
    }, 100);

    // Simulate PDF export functionality
    (window as any).exportPDF = () => {
      const toast = document.createElement("div");
      toast.className = "fixed bottom-4 right-4 bg-black text-white px-4 py-2 border-2 border-white brutal-border-thin";
      toast.innerText = "Exporting PDF...";
      document.body.appendChild(toast);
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    };

    // Load Font Awesome
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/a076d05399.js";
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="brutal-btn px-4 py-2 bg-black text-white font-bold border-2 border-white hover:bg-red-600 hover:border-red-600"
        >
          ← BACK
        </Link>
      </div>

      <div className="container mx-auto p-8 pt-20 max-w-7xl">
        {/* Title Section */}
        <header className="brutal-border bg-white text-black mb-10 p-6">
          <div className="border-b-2 border-black pb-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 uppercase monospace">
              SYNTHETIC DATA QUALITY AUDIT
            </h1>
            <p className="text-gray-700 monospace text-sm mt-2">v1.2.0 | RESTRICTED USE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-2 monospace uppercase red-underline">
                Purpose
              </h3>
              <p className="monospace text-sm">
                This tool helps human evaluators manually assess prompt-input/output pairs 
                that will be used to generate synthetic training data, improving the quality 
                and reliability of LLM-based safety audits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-2 monospace uppercase red-underline">
                Instructions
              </h3>
              <ol className="monospace text-sm list-decimal pl-4">
                <li>Enter the content to evaluate</li>
                <li>Score each dimension using the rubrics</li>
                <li>Record rationale for each decision</li>
                <li>Export the results as needed</li>
              </ol>
            </div>
          </div>

          <div className="mt-4 p-2 bg-red-600 text-white">
            <span className="monospace font-bold">WARNING:</span> <span className="monospace text-sm">This tool contains sensitive evaluation criteria</span>
          </div>
        </header>

        {/* Metrics Dashboard */}
        <section className="brutal-border bg-black text-white mb-6 p-4 border-2 border-white">
          <h2 className="text-2xl font-bold text-red-600 mb-4 monospace uppercase red-underline">
            SYNTHETIC DATA METRICS
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="brutal-border-thin p-4 bg-black hover:bg-gray-900 transition-colors">
              <div className="text-xs text-red-500 monospace uppercase">Items Assessed</div>
              <div className="text-3xl font-bold monospace">42</div>
            </div>
            <div className="brutal-border-thin p-4 bg-black hover:bg-gray-900 transition-colors">
              <div className="text-xs text-red-500 monospace uppercase">Avg Risk Score</div>
              <div className="text-3xl font-bold monospace">3.7</div>
            </div>
            <div className="brutal-border-thin p-4 bg-black hover:bg-gray-900 transition-colors">
              <div className="text-xs text-red-500 monospace uppercase">High Risk Items</div>
              <div className="text-3xl font-bold monospace">12</div>
            </div>
            <div className="brutal-border-thin p-4 bg-black hover:bg-gray-900 transition-colors">
              <div className="text-xs text-red-500 monospace uppercase">Risk Severity</div>
              <div className="text-3xl font-bold monospace vibrate">MEDIUM</div>
            </div>
          </div>
        </section>

        {/* Input/Output Section */}
        <section className="brutal-border bg-white text-black mb-6">
          <button 
            id="dataBtn" 
            className="w-full text-left brutal-btn flex justify-between items-center p-4" 
            onClick={() => (window as any).toggleSection('dataSection')}
          >
            <span className="monospace font-bold">[+] DATA PAIR EVALUATION</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div id="dataSection" className="hidden p-6 border-t-2 border-black">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block uppercase text-xs text-gray-700 mb-2 font-bold monospace tracking-wider">
                  <span className="inline-block w-3 h-3 bg-red-600 mr-2"></span>
                  PROMPT INPUT
                </label>
                <textarea 
                  className="border-2 border-black p-3 w-full h-32 monospace focus:outline-none focus:border-red-600"
                  placeholder="Enter the text prompt being evaluated..."
                ></textarea>
              </div>
              
              <div>
                <label className="block uppercase text-xs text-gray-700 mb-2 font-bold monospace tracking-wider">
                  <span className="inline-block w-3 h-3 bg-red-600 mr-2"></span>
                  LLM RESPONSE OUTPUT
                </label>
                <textarea 
                  className="border-2 border-black p-3 w-full h-32 monospace focus:outline-none focus:border-red-600"
                  placeholder="Enter the corresponding LLM output..."
                ></textarea>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block uppercase text-xs text-gray-700 mb-2 font-bold monospace tracking-wider">
                  <span className="inline-block w-3 h-3 bg-red-600 mr-2"></span>
                  SAFETY CLASSIFICATION
                </label>
                <select className="border-2 border-black p-3 w-full monospace focus:outline-none focus:border-red-600 bg-white">
                  <option value="">Select classification</option>
                  <option value="safe">SAFE (Approved for training)</option>
                  <option value="unsafe">UNSAFE (Exclude from dataset)</option>
                  <option value="review">NEEDS REVIEW (Ambiguous case)</option>
                </select>
              </div>
              
              <div>
                <label className="block uppercase text-xs text-gray-700 mb-2 font-bold monospace tracking-wider">
                  <span className="inline-block w-3 h-3 bg-red-600 mr-2"></span>
                  EVALUATOR NOTES
                </label>
                <textarea 
                  className="border-2 border-black p-3 w-full h-24 monospace focus:outline-none focus:border-red-600"
                  placeholder="Document specific issues or context for future reference..."
                ></textarea>
              </div>
            </div>
          </div>
        </section>

        {/* Rubric Sections */}
        <section className="brutal-border bg-white text-black mb-6">
          <button 
            id="temporalBtn" 
            className="w-full text-left brutal-btn flex justify-between items-center p-4" 
            onClick={() => (window as any).toggleSection('temporalSection')}
          >
            <span className="monospace font-bold">[+] TEMPORAL DIMENSION</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div id="temporalSection" className="hidden p-6 border-t-2 border-black">
            <p className="monospace mb-4">
              Protection against short-term, medium-term and long-term harmful impacts.
            </p>
            
            <table className="w-full monospace border-2 border-black mb-6">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-3 text-left">Control</th>
                  <th className="p-3 text-left">Risk Level</th>
                  <th className="p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-bold">SHORT-TERM</td>
                  <td className="p-3 border-r border-gray-300">
                    <select className="border-2 border-black p-1">
                      <option value="1">1 - Very Low</option>
                      <option value="2">2 - Low</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - High</option>
                      <option value="5">5 - Very High</option>
                    </select>
                  </td>
                  <td className="p-3">Immediate potential for harm from the content</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-bold">MEDIUM-TERM</td>
                  <td className="p-3 border-r border-gray-300">
                    <select className="border-2 border-black p-1">
                      <option value="1">1 - Very Low</option>
                      <option value="2">2 - Low</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - High</option>
                      <option value="5">5 - Very High</option>
                    </select>
                  </td>
                  <td className="p-3">Potential harm in weeks/months timeframe</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-gray-300 font-bold">LONG-TERM</td>
                  <td className="p-3 border-r border-gray-300">
                    <select className="border-2 border-black p-1">
                      <option value="1">1 - Very Low</option>
                      <option value="2">2 - Low</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - High</option>
                      <option value="5">5 - Very High</option>
                    </select>
                  </td>
                  <td className="p-3">Lasting systemic harm over extended period</td>
                </tr>
              </tbody>
            </table>
            
            <div className="brutal-border-thin p-4">
              <h4 className="font-bold monospace uppercase mb-2">TEMPORAL NOTES</h4>
              <textarea 
                className="border-2 border-black p-3 w-full h-24 monospace focus:outline-none focus:border-red-600"
                placeholder="Note temporal dimension concerns..."
              ></textarea>
            </div>
          </div>
        </section>

        <section className="brutal-border bg-white text-black mb-6">
          <button 
            id="spatialBtn" 
            className="w-full text-left brutal-btn flex justify-between items-center p-4" 
            onClick={() => (window as any).toggleSection('spatialSection')}
          >
            <span className="monospace font-bold">[+] SPATIAL DIMENSION</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div id="spatialSection" className="hidden p-6 border-t-2 border-black">
            <p className="monospace mb-4">
              Impact across cultural, geographic, and demographic dimensions.
            </p>
            
            <table className="w-full monospace border-2 border-black mb-6">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-3 text-left">Control</th>
                  <th className="p-3 text-left">Risk Level</th>
                  <th className="p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-bold">CULTURAL/GEO</td>
                  <td className="p-3 border-r border-gray-300">
                    <select className="border-2 border-black p-1">
                      <option value="1">1 - Very Low</option>
                      <option value="2">2 - Low</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - High</option>
                      <option value="5">5 - Very High</option>
                    </select>
                  </td>
                  <td className="p-3">Cultural/geographical appropriateness</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-bold">INDIVIDUAL</td>
                  <td className="p-3 border-r border-gray-300">
                    <select className="border-2 border-black p-1">
                      <option value="1">1 - Very Low</option>
                      <option value="2">2 - Low</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - High</option>
                      <option value="5">5 - Very High</option>
                    </select>
                  </td>
                  <td className="p-3">Impact on individual well-being</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-gray-300 font-bold">SOCIETAL</td>
                  <td className="p-3 border-r border-gray-300">
                    <select className="border-2 border-black p-1">
                      <option value="1">1 - Very Low</option>
                      <option value="2">2 - Low</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - High</option>
                      <option value="5">5 - Very High</option>
                    </select>
                  </td>
                  <td className="p-3">Broader societal implications</td>
                </tr>
              </tbody>
            </table>
            
            <div className="brutal-border-thin p-4">
              <h4 className="font-bold monospace uppercase mb-2">SPATIAL NOTES</h4>
              <textarea 
                className="border-2 border-black p-3 w-full h-24 monospace focus:outline-none focus:border-red-600"
                placeholder="Note spatial dimension concerns..."
              ></textarea>
            </div>
          </div>
        </section>

        <section className="brutal-border bg-white text-black mb-6">
          <button 
            id="ethicalBtn" 
            className="w-full text-left brutal-btn flex justify-between items-center p-4" 
            onClick={() => (window as any).toggleSection('ethicalSection')}
          >
            <span className="monospace font-bold">[+] ETHICAL DIMENSION</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          
          <div id="ethicalSection" className="hidden p-6 border-t-2 border-black">
            <p className="monospace mb-4">
              Evaluation of ethical considerations and alignment with values.
            </p>
            
            <table className="w-full monospace border-2 border-black mb-6">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-3 text-left">Control</th>
                  <th className="p-3 text-left">Risk Level</th>
                  <th className="p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-bold">FAIRNESS</td>
                  <td className="p-3 border-r border-gray-300">
                    <select className="border-2 border-black p-1">
                      <option value="1">1 - Very Low</option>
                      <option value="2">2 - Low</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - High</option>
                      <option value="5">5 - Very High</option>
                    </select>
                  </td>
                  <td className="p-3">Equal treatment across demographics</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-bold">AUTONOMY</td>
                  <td className="p-3 border-r border-gray-300">
                    <select className="border-2 border-black p-1">
                      <option value="1">1 - Very Low</option>
                      <option value="2">2 - Low</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - High</option>
                      <option value="5">5 - Very High</option>
                    </select>
                  </td>
                  <td className="p-3">Respect for human agency and choices</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-gray-300 font-bold">BENEFICENCE</td>
                  <td className="p-3 border-r border-gray-300">
                    <select className="border-2 border-black p-1">
                      <option value="1">1 - Very Low</option>
                      <option value="2">2 - Low</option>
                      <option value="3">3 - Medium</option>
                      <option value="4">4 - High</option>
                      <option value="5">5 - Very High</option>
                    </select>
                  </td>
                  <td className="p-3">Promotion of welfare and prevention of harm</td>
                </tr>
              </tbody>
            </table>
            
            <div className="brutal-border-thin p-4">
              <h4 className="font-bold monospace uppercase mb-2">ETHICAL NOTES</h4>
              <textarea 
                className="border-2 border-black p-3 w-full h-24 monospace focus:outline-none focus:border-red-600"
                placeholder="Note ethical dimension concerns..."
              ></textarea>
            </div>
          </div>
        </section>

        {/* Export Section */}
        <section className="brutal-border bg-black text-white p-6 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold monospace uppercase mb-2">EXPORT EVALUATION RESULTS</h3>
              <p className="monospace text-sm">Choose your preferred format for documentation</p>
            </div>
            <div className="flex gap-4">
              <button className="brutal-btn brutal-btn-red px-4 py-3 flex items-center gap-2" onClick={() => (window as any).exportPDF()}>
                <i className="fas fa-file-pdf"></i> EXPORT PDF
              </button>
              <button className="brutal-btn px-4 py-3 flex items-center gap-2" onClick={() => (window as any).exportPDF()}>
                <i className="fas fa-file-csv"></i> EXPORT CSV
              </button>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="brutal-border-thin mt-10 p-6 bg-white text-black">
          <h3 className="text-xl font-bold text-red-600 mb-4 monospace uppercase red-underline">
            ABOUT SYNTHETIC DATA AUDITS
          </h3>
          <p className="monospace text-sm mb-4">
            Synthetic data audits are essential for ensuring that AI training data meets quality and safety 
            standards. By systematically evaluating text data pairs used for training, we can identify and 
            mitigate potential risks before they propagate through models.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="brutal-border-thin p-4">
              <h4 className="font-bold text-red-600 mb-2 monospace">DATA QUALITY</h4>
              <p className="text-sm monospace">Ensures training data is accurate, relevant, and representative.</p>
            </div>
            <div className="brutal-border-thin p-4">
              <h4 className="font-bold text-red-600 mb-2 monospace">SAFETY ANALYSIS</h4>
              <p className="text-sm monospace">Identifies potentially harmful content that should be excluded.</p>
            </div>
            <div className="brutal-border-thin p-4">
              <h4 className="font-bold text-red-600 mb-2 monospace">BIAS DETECTION</h4>
              <p className="text-sm monospace">Flags data that may introduce or reinforce unwanted biases.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SyntheticDataAudit;
