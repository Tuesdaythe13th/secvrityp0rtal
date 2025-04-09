
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toggleInsiderCategory } from "../utils/insider-taxonomy-utils";
import { insiderThreatData } from "../data/insider-taxonomy-data";

export default function InsiderTaxonomy() {
  useEffect(() => {
    // Make the toggle function available globally
    ;(window as any).toggleInsiderCategory = toggleInsiderCategory

    // Set document title
    document.title = "Insider Threat Taxonomy - Neural Security";
    
    // Add CSS for the brutalist aesthetic
    const style = document.createElement("style");
    style.innerHTML = `
      .brutal-panel {
        border: 3px solid #000;
        box-shadow: 5px 5px 0 #000;
        background-color: white;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .brutal-panel:hover {
        transform: translate(-2px, -2px);
        box-shadow: 7px 7px 0 #000;
      }
      
      .border-blue-600 {
        border-left: 5px solid #2563eb;
      }
      
      .border-red-600 {
        border-left: 5px solid #dc2626;
      }
      
      .border-green-600 {
        border-left: 5px solid #16a34a;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="bg-white text-black">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="brutal-btn px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-purple-800 hover:border-purple-800"
        >
          ← BACK
        </Link>
      </div>

      <div className="container mx-auto p-6 pt-20 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-4 uppercase">Insider Threat Taxonomy</h1>
          <p className="text-lg">
            A comprehensive framework for understanding, categorizing, and addressing insider threats
            in organizational contexts.
          </p>
        </header>

        <div className="insider-taxonomy">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" id="insider-categories">
            {insiderThreatData.categories.map((category) => (
              <div
                key={category.id}
                className={`brutal-panel p-4 border-${category.id === "types" ? "blue" : category.id === "manifestations" ? "red" : "green"}-600 cursor-pointer`}
                onClick={() => toggleInsiderCategory(category.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-xl">{category.title}</h3>
                  <span className="text-xl" id={`${category.id}-arrow`}>
                    +
                  </span>
                </div>
                <p className="text-sm">{category.description}</p>
              </div>
            ))}
          </div>

          {/* Expanded Category Section */}
          <div id="expanded-insider-category" className="brutal-panel p-6 mb-8 hidden">
            {/* Content will be dynamically inserted here */}
          </div>

          {/* CISA Definition Box */}
          <div className="brutal-panel p-4 bg-gray-100">
            <h3 className="font-bold mb-2">CISA DEFINITION OF INSIDER THREAT:</h3>
            <p>
              The threat that an insider will use their authorized access, intentionally or unintentionally, to do harm to
              the department's mission, resources, personnel, facilities, information, equipment, networks, or systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
