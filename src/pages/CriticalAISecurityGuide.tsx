
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CriticalAISecurityGuide.css";

export default function CriticalAISecurityGuide() {
  useEffect(() => {
    // Toggle sections
    function setupSectionToggle(btnId: string, contentId: string, iconClass: string) {
      const btn = document.getElementById(btnId);
      const content = document.getElementById(contentId);
      if (!btn || !content) return;

      const icon = btn.querySelector("i");

      btn.addEventListener("click", () => {
        const isExpanded = !content.classList.contains("hidden");

        // Toggle content
        content.classList.toggle("hidden");

        // Update button text
        const btnText = btn.querySelector("span");
        if (btnText) {
          btnText.textContent = isExpanded
            ? "[+] " + btnText.textContent!.substring(4)
            : "[-] " + btnText.textContent!.substring(4);
        }

        // Update icon
        if (icon) {
          if (iconClass.includes("down")) {
            icon.className = isExpanded ? "fas fa-chevron-right" : "fas fa-chevron-down";
          } else {
            icon.className = isExpanded ? "fas fa-chevron-right" : "fas fa-chevron-down";
          }
        }

        // If it's the overview section (which starts expanded), update the button color
        if (btnId === "overviewBtn") {
          btn.classList.toggle("brutal-btn-red");
          btn.classList.toggle("bg-black");
        }
      });
    }

    // Initialize section toggles
    setupSectionToggle("overviewBtn", "overviewContent", "fa-chevron-down");
    setupSectionToggle("dataBtn", "dataContent", "fa-chevron-right");
    setupSectionToggle("modelBtn", "modelContent", "fa-chevron-right");
    setupSectionToggle("opsBtn", "opsContent", "fa-chevron-right");
    setupSectionToggle("conclusionBtn", "conclusionContent", "fa-chevron-right");

    // Set up PDF download button
    const downloadBtn = document.querySelector(".bg-black button");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        alert("Downloading full guidelines PDF...");
        // In a real implementation, this would initiate a download
      });
    }

    // Load Font Awesome
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-white text-black">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="brutal-btn px-4 py-2 bg-black text-white font-bold border-2 border-black hover:bg-red-600 hover:border-red-600"
        >
          ← BACK
        </Link>
      </div>

      <div className="container mx-auto p-4 max-w-6xl">
        {/* Title Block */}
        <header className="brutal-border bg-white mb-8 p-6 text-black">
          <div className="border-b-2 border-black pb-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-red-600 uppercase monospace">
              CRITICAL AI SECURITY GUIDELINES
            </h1>
            <p className="text-gray-700 monospace text-sm mt-2">v2.3.1 | MIT License</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-red-600 mb-2 monospace uppercase red-underline">
              Contributing Authors
            </h3>
            <ul className="columns-1 md:columns-2 gap-4 list-none pl-0 monospace">
              <li className="mb-1">• Dr. Alan Turing</li>
              <li className="mb-1">• Prof. Grace Hopper</li>
              <li className="mb-1">• Dr. Tim Berners-Lee</li>
              <li className="mb-1">• Dr. Fei-Fei Li</li>
              <li className="mb-1">• Prof. Yoshua Bengio</li>
              <li className="mb-1">• Dr. Joy Buolamwini</li>
              <li className="mb-1">• Dr. Andrew Ng</li>
              <li className="mb-1">• Dr. Cynthia Dwork</li>
            </ul>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-black text-white text-sm font-bold monospace">WARNING</span>
            <span className="text-sm monospace">This document contains sensitive security information</span>
          </div>
        </header>

        {/* Overview Section */}
        <section className="brutal-border bg-white mb-6 text-black">
          <button
            id="overviewBtn"
            className="w-full text-left brutal-btn brutal-btn-red flex justify-between items-center p-4"
          >
            <span>[-] OVERVIEW</span>
            <i className="fas fa-chevron-down"></i>
          </button>
          <div id="overviewContent" className="p-6 border-t-2 border-black">
            <p className="monospace mb-4">
              These guidelines establish an industry-wide standard for securing artificial intelligence systems against
              emerging threats. The rapid advancement of AI capabilities necessitates equally rapid advancement in
              security methodologies.
            </p>

            <h4 className="text-xl font-bold text-black mt-6 mb-3 monospace uppercase red-underline">Motivation</h4>
            <p className="monospace mb-4">
              AI system vulnerabilities differ fundamentally from traditional software vulnerabilities due to their
              probabilistic nature, data dependencies, and emergent behaviors. This requires novel approaches to
              security that go beyond conventional IT practices.
            </p>

            <blockquote className="border-l-4 border-red-600 bg-gray-100 p-4 italic monospace my-6 vibrate">
              "The intersection of AI and security represents one of the most significant technical challenges of our
              generation."
              <br />
              <span className="font-bold">- AI Security Task Force, 2025</span>
            </blockquote>

            <h4 className="text-xl font-bold text-black mt-6 mb-3 monospace uppercase red-underline">Key Challenges</h4>
            <ul className="monospace pl-0">
              <li className="red-bullet mb-2 pl-0">Model inversion and extraction attacks</li>
              <li className="red-bullet mb-2 pl-0">Adversarial input manipulation</li>
              <li className="red-bullet mb-2 pl-0">Training data poisoning</li>
              <li className="red-bullet mb-2 pl-0">Model confidentiality breaches</li>
              <li className="red-bullet pl-0">Output manipulation and deception</li>
            </ul>
          </div>
        </section>

        {/* Control Categories */}
        <h2 className="text-3xl font-bold text-red-600 mt-10 mb-6 monospace uppercase border-b-2 border-red-600 pb-2">
          CONTROL CATEGORIES
        </h2>
        <p className="monospace mb-8">
          The following categories represent the critical dimensions of AI system security. Each category contains
          specific controls that should be implemented based on system criticality and threat model.
        </p>

        {/* Data Security Section */}
        <section className="brutal-border bg-white mb-6 text-black">
          <button id="dataBtn" className="w-full text-left brutal-btn flex justify-between items-center p-4">
            <span>[+] DATA SECURITY</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          <div id="dataContent" className="hidden p-6 border-t-2 border-black">
            <p className="monospace mb-4">
              Protection of training data, validation data, and all data processed by AI systems throughout their
              lifecycle. This includes data at rest, in transit, and during computation.
            </p>
          
            <h4 className="text-xl font-bold text-black mt-6 mb-3 monospace uppercase red-underline">
              Required Controls
            </h4>
            <table className="w-full monospace border-2 border-black mb-6">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-3 text-left">Control</th>
                  <th className="p-3 text-left">Level</th>
                  <th className="p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-bold">DS-01</td>
                  <td className="p-3 border-r border-gray-300">Critical</td>
                  <td className="p-3">Implement cryptographic protection for all training data</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-3 border-r border-gray-300 font-bold">DS-02</td>
                  <td className="p-3 border-r border-gray-300">High</td>
                  <td className="p-3">Data lineage tracking with immutable logs</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-gray-300 font-bold">DS-03</td>
                  <td className="p-3 border-r border-gray-300">Medium</td>
                  <td className="p-3">Automated data quality validation checks</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-red-600 text-white p-4 my-6 flex items-start">
              <span className="text-2xl mr-3">!</span>
              <p className="monospace">
                <strong>Warning:</strong> Failure to implement data security controls is the leading cause of AI system
                compromises, with 73% of incidents originating from this vector.
              </p>
            </div>
          </div>
        </section>

        {/* Model Security Section */}
        <section className="brutal-border bg-white mb-6 text-black">
          <button id="modelBtn" className="w-full text-left brutal-btn flex justify-between items-center p-4">
            <span>[+] MODEL SECURITY</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          <div id="modelContent" className="hidden p-6 border-t-2 border-black">
            <p className="monospace mb-4">
              Protection against model theft, tampering, and extraction attacks. This includes secure model storage,
              deployment, and access control mechanisms.
            </p>

            <h4 className="text-xl font-bold text-black mt-6 mb-3 monospace uppercase red-underline">
              Required Controls
            </h4>
            <ul className="monospace pl-0">
              <li className="red-bullet mb-2 pl-0">Model encryption at rest and in transit (MS-01)</li>
              <li className="red-bullet mb-2 pl-0">Runtime integrity verification (MS-02)</li>
              <li className="red-bullet mb-2 pl-0">Model fingerprinting and watermarking (MS-03)</li>
              <li className="red-bullet pl-0">API rate limiting and monitoring (MS-04)</li>
            </ul>
          </div>
        </section>

        {/* Operational Security Section */}
        <section className="brutal-border bg-white mb-6 text-black">
          <button id="opsBtn" className="w-full text-left brutal-btn flex justify-between items-center p-4">
            <span>[+] OPERATIONAL SECURITY</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          <div id="opsContent" className="hidden p-6 border-t-2 border-black">
            <p className="monospace mb-4">
              Security controls for AI system deployment, monitoring, and maintenance. Focuses on runtime protections
              and operational monitoring.
            </p>

            <h4 className="text-xl font-bold text-black mt-6 mb-3 monospace uppercase red-underline">
              Key Considerations
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 monospace mb-6">
              <div className="brutal-border-thin p-4 bg-gray-100">
                <h5 className="font-bold text-red-600 mb-2">Detection</h5>
                <p>Implement anomaly detection for model inputs and outputs</p>
              </div>
              <div className="brutal-border-thin p-4 bg-gray-100">
                <h5 className="font-bold text-red-600 mb-2">Response</h5>
                <p>Automated incident response playbooks for AI-specific threats</p>
              </div>
              <div className="brutal-border-thin p-4 bg-gray-100">
                <h5 className="font-bold text-red-600 mb-2">Recovery</h5>
                <p>Immutable model versioning and rollback capabilities</p>
              </div>
              <div className="brutal-border-thin p-4 bg-gray-100">
                <h5 className="font-bold text-red-600 mb-2">Logging</h5>
                <p>Comprehensive audit logging of all AI system decisions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion Section */}
        <section className="brutal-border bg-white mb-6 text-black">
          <button
            id="conclusionBtn"
            className="w-full text-left brutal-btn flex justify-between items-center p-4"
          >
            <span>[+] CONCLUSION</span>
            <i className="fas fa-chevron-right"></i>
          </button>
          <div id="conclusionContent" className="hidden p-6 border-t-2 border-black">
            <p className="monospace mb-4">
              AI security is not a one-time implementation but requires continuous monitoring, assessment, and
              improvement. As attack vectors evolve, so too must our defenses.
            </p>

            <div className="brutal-border-thin p-4 bg-red-600 text-white mt-6">
              <h4 className="text-xl font-bold mb-3 monospace uppercase">Immediate Actions</h4>
              <ol className="monospace pl-5 list-decimal">
                <li className="mb-2">Conduct thorough risk assessment of all AI systems</li>
                <li className="mb-2">Prioritize implementation of critical controls</li>
                <li className="mb-2">Establish continuous monitoring processes</li>
                <li className="mb-2">Train all staff on AI-specific security protocols</li>
                <li>Participate in industry threat intelligence sharing</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Download Block */}
        <section className="brutal-border bg-black text-white p-6 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold monospace uppercase mb-2">DOWNLOAD FULL GUIDELINES</h3>
              <p className="monospace text-sm">Includes detailed control specifications and implementation guidance</p>
            </div>
            <button className="brutal-btn brutal-btn-red px-8 py-3 flex items-center gap-2">
              <i className="fas fa-file-pdf"></i> GET PDF
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
