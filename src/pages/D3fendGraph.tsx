
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toggleTactic, closeArtifactPanel, showArtifactDetails } from "../utils/d3fend-utils";
import { setupGlobalEventFunctions } from "../utils/d3fend-events-utils";
import { d3fendData } from "../data/d3fend-data";
import { digitalEventsData } from "../data/digital-events-data";
import "../styles/D3fendGraph.css";

export default function D3fendGraph() {
  useEffect(() => {
    document.title = "D3FEND Knowledge Graph - Neural Security";
    
    // Make the d3fend data available globally for cross-referencing
    ;(window as any).d3fendData = d3fendData;

    // Make functions available globally
    ;(window as any).toggleTactic = toggleTactic;
    ;(window as any).closeArtifactPanel = closeArtifactPanel;
    ;(window as any).showArtifactDetails = showArtifactDetails;

    // Setup event functions
    setupGlobalEventFunctions();

    // Add combined artifacts to global data
    ;(window as any).combinedArtifacts = [...d3fendData.artifacts, ...digitalEventsData.artifacts];
  }, []);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-purple-800 hover:border-purple-800"
        >
          ← BACK
        </Link>
      </div>

      <div className="container mx-auto py-16">
        <div className="d3fend-graph-container">
          <h1 className="text-4xl font-black mb-4 text-center uppercase tracking-wide">D3FEND KNOWLEDGE GRAPH</h1>
          <p className="text-center text-lg mb-6 font-bold">CYBERSECURITY COUNTERMEASURES & EVENT MONITORING FRAMEWORK</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* D3FEND Tactics Section */}
            <div>
              <h2 className="text-2xl font-black mb-3 border-b-4 border-black pb-2">DEFENSIVE TACTICS</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
                <div
                  className="brutal-panel p-3 bg-red-500 text-black font-bold text-center cursor-pointer"
                  onClick={() => toggleTactic("detect")}
                >
                  <div className="flex justify-between items-center">
                    <span>DETECT</span>
                    <span id="detect-arrow">+</span>
                  </div>
                </div>
                <div
                  className="brutal-panel p-3 bg-green-500 text-black font-bold text-center cursor-pointer"
                  onClick={() => toggleTactic("harden")}
                >
                  <div className="flex justify-between items-center">
                    <span>HARDEN</span>
                    <span id="harden-arrow">+</span>
                  </div>
                </div>
                <div
                  className="brutal-panel p-3 bg-blue-500 text-black font-bold text-center cursor-pointer"
                  onClick={() => toggleTactic("deceive")}
                >
                  <div className="flex justify-between items-center">
                    <span>DECEIVE</span>
                    <span id="deceive-arrow">+</span>
                  </div>
                </div>
                <div
                  className="brutal-panel p-3 bg-orange-500 text-black font-bold text-center cursor-pointer"
                  onClick={() => toggleTactic("evict")}
                >
                  <div className="flex justify-between items-center">
                    <span>EVICT</span>
                    <span id="evict-arrow">+</span>
                  </div>
                </div>
                <div
                  className="brutal-panel p-3 bg-purple-500 text-black font-bold text-center cursor-pointer"
                  onClick={() => toggleTactic("isolate")}
                >
                  <div className="flex justify-between items-center">
                    <span>ISOLATE</span>
                    <span id="isolate-arrow">+</span>
                  </div>
                </div>
              </div>

              {/* Base Techniques Section */}
              <div id="base-techniques" className="hidden mb-8">
                <h2 className="text-2xl font-black mb-3 border-b-4 border-black pb-2">BASE TECHNIQUES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="techniques-container"></div>
              </div>

              {/* Sub-Techniques Section */}
              <div id="sub-techniques" className="hidden mb-8">
                <h2 className="text-2xl font-black mb-3 border-b-4 border-black pb-2">SPECIFIC TECHNIQUES</h2>
                <div id="sub-techniques-container"></div>
              </div>
            </div>

            {/* Digital Events Section */}
            <div>
              <h2 className="text-2xl font-black mb-3 border-b-4 border-black pb-2">DIGITAL EVENT MONITORING</h2>

              {/* Event Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {digitalEventsData.categories.map((category) => (
                  <div
                    key={category.id}
                    className="brutal-panel p-3 font-bold text-center cursor-pointer"
                    style={{ backgroundColor: category.color }}
                    onClick={() => (window as any).toggleEventCategory(category.id)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span id={`${category.id}-arrow`}>+</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Event List Section */}
              <div id="events-list" className="hidden mb-8">
                <h3 className="text-xl font-black mb-3 border-b-2 border-black pb-2">EVENT TYPES</h3>
                <div id="events-container" className="max-h-96 overflow-y-auto pr-2"></div>
              </div>

              {/* Event Details Section */}
              <div id="event-details" className="hidden mb-8">
                <h3 className="text-xl font-black mb-3 border-b-2 border-black pb-2">EVENT DETAILS</h3>
                <div id="event-details-container"></div>
              </div>
            </div>
          </div>

          {/* Artifacts Panel */}
          <div
            id="artifact-panel"
            className="hidden fixed top-0 right-0 w-full md:w-1/3 h-screen bg-white brutal-panel overflow-y-auto z-10"
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-black">DIGITAL ARTIFACT</h2>
                <button className="brutal-btn px-3 py-1 font-bold" onClick={() => closeArtifactPanel()}>
                  X
                </button>
              </div>
              <div id="artifact-details" className="space-y-4"></div>
            </div>
          </div>

          {/* Integrated Legend */}
          <div className="brutal-panel p-4 mt-8">
            <h3 className="text-xl font-black mb-3 border-b-2 border-black pb-1">LEGEND</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              <h4 className="col-span-full text-lg font-bold mt-2 mb-1">DEFENSIVE TACTICS</h4>
              <div className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-red-500 mr-2 border-2 border-black"></span>
                <span className="font-bold">DETECT</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-green-500 mr-2 border-2 border-black"></span>
                <span className="font-bold">HARDEN</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-blue-500 mr-2 border-2 border-black"></span>
                <span className="font-bold">DECEIVE</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-orange-500 mr-2 border-2 border-black"></span>
                <span className="font-bold">EVICT</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 rounded-full bg-purple-500 mr-2 border-2 border-black"></span>
                <span className="font-bold">ISOLATE</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <h4 className="col-span-full text-lg font-bold mt-2 mb-1">DETECTION VALUE</h4>
              <div className="flex items-center">
                <span className="w-5 h-5 bg-red-600 mr-2 border-2 border-black"></span>
                <span className="font-bold">CRITICAL</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 bg-orange-500 mr-2 border-2 border-black"></span>
                <span className="font-bold">HIGH</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 bg-yellow-500 mr-2 border-2 border-black"></span>
                <span className="font-bold">MEDIUM</span>
              </div>
              <div className="flex items-center">
                <span className="w-5 h-5 bg-blue-500 mr-2 border-2 border-black"></span>
                <span className="font-bold">LOW</span>
              </div>
            </div>
          </div>

          {/* NIST Reference */}
          <div className="brutal-panel p-4 mt-6 bg-gray-100">
            <h3 className="font-bold mb-2">EVENT-BASED DEFENSE FRAMEWORK:</h3>
            <p className="text-sm">
              This expanded D3FEND Knowledge Graph incorporates comprehensive digital event monitoring capabilities, aligned
              with NIST SP 800-61 and NIST SP 800-92 guidelines for security event management and monitoring. Events are
              categorized by type and assigned detection values to prioritize defensive responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
