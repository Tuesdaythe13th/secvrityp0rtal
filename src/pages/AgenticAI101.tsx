
import { useEffect } from "react";
import { Link } from "react-router-dom";

const AgenticAI101 = () => {
  useEffect(() => {
    // Create blood drop effects
    function createBloodDrops() {
      const container = document.getElementById("blood-drops");
      if (!container) return;

      const colors = ["rgba(255,0,0,0.2)", "rgba(255,0,0,0.4)", "rgba(255,0,0,0.6)"];

      for (let i = 0; i < 15; i++) {
        const drop = document.createElement("div");
        drop.className = "blood-drop";
        drop.style.left = `${Math.random() * 100}%`;
        drop.style.top = `${Math.random() * 100}%`;
        drop.style.width = `${20 + Math.random() * 40}px`;
        drop.style.height = `${20 + Math.random() * 40}px`;
        drop.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        drop.style.opacity = (Math.random() * 0.6 + 0.2).toString();
        container.appendChild(drop);
      }
    }

    // Toggle section visibility
    function toggleSection(sectionId: string) {
      const content = document.getElementById(`${sectionId}-content`);
      const button = document.querySelector(`[data-section="${sectionId}"] span`);

      if (content && button) {
        content.classList.toggle("open");
        button.textContent = content.classList.contains("open") ? "−" : "+";
      }
    }

    // Initialize the app
    createBloodDrops();

    // Open first section by default
    const firstSection = document.getElementById("coreConcepts-content");
    const firstButton = document.querySelector('[data-section="coreConcepts"] span');
    if (firstSection && firstButton) {
      firstSection.classList.add("open");
      firstButton.textContent = "−";
    }

    // Add event listeners for navigation buttons
    document.getElementById("nav-overview")?.addEventListener("click", () => {
      document.getElementById("overview-section")?.scrollIntoView({
        behavior: "smooth",
      });
    });

    document.getElementById("nav-concepts")?.addEventListener("click", () => {
      document.getElementById("coreConcepts-content")?.scrollIntoView({
        behavior: "smooth",
      });
    });

    document.getElementById("nav-usecases")?.addEventListener("click", () => {
      document.getElementById("useCases-content")?.scrollIntoView({
        behavior: "smooth",
      });
    });

    document.getElementById("nav-tech")?.addEventListener("click", () => {
      document.getElementById("technicalAspects-content")?.scrollIntoView({
        behavior: "smooth",
      });
    });

    document.getElementById("nav-ethics")?.addEventListener("click", () => {
      document.getElementById("ethicalSocietal-content")?.scrollIntoView({
        behavior: "smooth",
      });
    });

    // Add click handlers for section toggles
    document.querySelectorAll("[data-section]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const sectionId = el.getAttribute("data-section");
        if (sectionId) toggleSection(sectionId);
      });
    });
  }, []);

  return (
    <div className="bg-black text-white font-mono scanlines relative overflow-x-hidden">
      {/* Blood drops for effect */}
      <div id="blood-drops"></div>

      <header className="container mx-auto px-4 py-12 border-b-4 border-red-600">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-4xl font-bold tracking-tighter hover:text-red-600">
            ← BACK
          </Link>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter glow-red">
              AGENTIC<span className="text-red-600">AI</span>
            </h1>
            <p className="text-xl md:text-2xl uppercase border-b-4 border-red-600 pb-2 flicker">
              EDUCATIONAL TERMINAL v4.2.1
            </p>
          </div>
          <div className="w-24 hidden md:block"></div> {/* spacer for balance */}
        </div>
        <p className="mt-4 text-red-400 text-sm md:text-base flashing-text text-center">
          WARNING: HIGH-INTENSITY KNOWLEDGE TRANSFER IN PROGRESS
        </p>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b-2 border-red-600 pb-4">
          <button
            id="nav-overview"
            className="py-2 px-4 bg-black hover:bg-gray-900 text-white border-2 border-white hover:border-red-600 font-bold"
          >
            OVERVIEW
          </button>
          <button
            id="nav-concepts"
            className="py-2 px-4 bg-black hover:bg-gray-900 text-white border-2 border-white hover:border-red-600 font-bold"
          >
            CONCEPTS
          </button>
          <button
            id="nav-usecases"
            className="py-2 px-4 bg-black hover:bg-gray-900 text-white border-2 border-white hover:border-red-600 font-bold"
          >
            USE CASES
          </button>
          <button
            id="nav-tech"
            className="py-2 px-4 bg-black hover:bg-gray-900 text-white border-2 border-white hover:border-red-600 font-bold"
          >
            TECH SPECS
          </button>
          <button
            id="nav-ethics"
            className="py-2 px-4 bg-black hover:bg-gray-900 text-white border-2 border-white hover:border-red-600 font-bold"
          >
            ETHICS
          </button>
        </div>

        {/* Overview Section */}
        <div id="overview-section" className="mb-20">
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-red-600 pb-2 uppercase">SYSTEM OVERVIEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black border-2 border-white p-6 highlight-box">
              <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
                <i className="fas fa-brain"></i> CORE CAPABILITIES
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Autonomous Decision Making</li>
                <li>Advanced Reasoning</li>
                <li>Continuous Learning</li>
                <li>Language Understanding</li>
              </ul>
            </div>
            <div className="bg-black border-2 border-white p-6 highlight-box">
              <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
                <i className="fas fa-project-diagram"></i> KEY DIFFERENTIATORS
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Action-Oriented Design</li>
                <li>Dynamic Environment Adaptation</li>
                <li>Multi-Step Task Execution</li>
                <li>System Coordination</li>
              </ul>
            </div>
            <div className="bg-black border-2 border-white p-6 highlight-box">
              <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle"></i> CRITICAL CONSIDERATIONS
              </h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Ethical Frameworks</li>
                <li>Transparency Requirements</li>
                <li>Human Oversight Protocols</li>
                <li>Risk Mitigation Strategies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Content Sections */}
        <div id="content-sections" className="space-y-12">
          {/* Core Concepts */}
          <div className="bg-black border-2 border-white p-6 flash-border">
            <div className="flex justify-between items-center cursor-pointer" data-section="coreConcepts">
              <h2 className="text-2xl font-bold text-red-600">1. CORE CONCEPTS & FUNCTIONALITIES</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="coreConcepts-content" className="section-transition">
              <div className="mt-6 space-y-6">
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Autonomy</h3>
                  <p className="pl-2">
                    Operate independently with minimal human intervention, making decisions based on environment
                    analysis and objectives.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Reasoning & Planning</h3>
                  <p className="pl-2">
                    Utilize advanced capabilities to understand situations, evaluate options, formulate strategies, and
                    execute actions.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Adaptability & Learning</h3>
                  <p className="pl-2">
                    Adapt to changing environments and improve performance via continuous learning from feedback and
                    interactions.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Language Understanding</h3>
                  <p className="pl-2">
                    Often powered by LLMs, possess NLP capabilities to interpret complex instructions and engage in
                    conversations.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Workflow Optimization</h3>
                  <p className="pl-2">
                    Excel at streamlining complex workflows, automating tasks, and coordinating across systems/tools.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Differentiation */}
          <div className="bg-black border-2 border-white p-6 flash-border">
            <div className="flex justify-between items-center cursor-pointer" data-section="differentiation">
              <h2 className="text-2xl font-bold text-red-600">2. DIFFERENTIATION FROM OTHER AI MODELS</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="differentiation-content" className="section-transition">
              <div className="mt-6 space-y-6">
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Agentic AI vs. Traditional AI</h3>
                  <p className="pl-2">
                    Greater autonomy, adapts to dynamic environments, tackles complex multi-step tasks compared to
                    rule-based AI.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Agentic AI vs. Generative AI</h3>
                  <p className="pl-2">
                    Action-oriented (decision-making, task execution) rather than content creation focused.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-black border-2 border-white p-6 flash-border">
            <div className="flex justify-between items-center cursor-pointer" data-section="useCases">
              <h2 className="text-2xl font-bold text-red-600">3. KEY USE CASES</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="useCases-content" className="section-transition">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black border border-red-600 p-4">
                  <h3 className="text-xl font-bold mb-2">Automating IT workflows</h3>
                  <p>Responding to requests, troubleshooting, automating IT processes.</p>
                </div>
                <div className="bg-black border border-red-600 p-4">
                  <h3 className="text-xl font-bold mb-2">Improving code quality</h3>
                  <p>Automating reviews, detecting issues, ensuring standard adherence.</p>
                </div>
                <div className="bg-black border border-red-600 p-4">
                  <h3 className="text-xl font-bold mb-2">Enhancing customer service</h3>
                  <p>Personalized support via AI chatbots and virtual assistants.</p>
                </div>
                <div className="bg-black border border-red-600 p-4">
                  <h3 className="text-xl font-bold mb-2">Optimizing supply chains</h3>
                  <p>Predicting demand, managing inventory, adjusting logistics in real-time.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emerging Questions */}
          <div className="bg-black border-2 border-white p-6 flash-border">
            <div className="flex justify-between items-center cursor-pointer" data-section="emergingQuestions">
              <h2 className="text-2xl font-bold text-red-600">4. EMERGING QUESTIONS</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="emergingQuestions-content" className="section-transition">
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-black border border-red-600">
                  <h3 className="text-xl font-bold uppercase">Ethics & Responsibility</h3>
                  <p className="mt-2">How to ensure ethical decision-making in agentic systems?</p>
                </div>
                <div className="p-4 bg-black border border-red-600">
                  <h3 className="text-xl font-bold uppercase">Transparency & Trust</h3>
                  <p className="mt-2">How to maintain transparency and trust in autonomous agents?</p>
                </div>
                <div className="p-4 bg-black border border-red-600">
                  <h3 className="text-xl font-bold uppercase">Autonomy vs. Oversight</h3>
                  <p className="mt-2">How to balance AI autonomy with necessary human oversight and control?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Aspects */}
          <div className="bg-black border-2 border-white p-6 flash-border">
            <div className="flex justify-between items-center cursor-pointer" data-section="technicalAspects">
              <h2 className="text-2xl font-bold text-red-600">5. TECHNICAL ASPECTS AND ARCHITECTURES</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="technicalAspects-content" className="section-transition">
              <div className="mt-6 space-y-6">
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Core Components</h3>
                  <p className="pl-2">
                    Typically include perception, reasoning, planning, decision-making, and action execution.
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Single-Agent vs. Multi-Agent Systems</h3>
                  <p className="pl-2">
                    Single independent entity vs. multiple interacting agents (collaborating/competing).
                  </p>
                </div>
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Integration</h3>
                  <p className="pl-2">Often leverages other AI (LLMs, ML models, computer vision).</p>
                </div>
                <div className="pl-4 border-l-4 border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Frameworks & Tools</h3>
                  <p className="pl-2">Development supported by tools like AutoGen, CrewAI, AgentGPT, MetaGPT.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ethical and Societal */}
          <div className="bg-black border-2 border-white p-6 flash-border">
            <div className="flex justify-between items-center cursor-pointer" data-section="ethicalSocietal">
              <h2 className="text-2xl font-bold text-red-600">6. ETHICAL AND SOCIETAL IMPLICATIONS</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="ethicalSocietal-content" className="section-transition">
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-black border border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Bias and Fairness</h3>
                  <p>Risk of perpetuating/amplifying biases from training data, leading to discrimination.</p>
                </div>
                <div className="p-4 bg-black border border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Transparency and Explainability (XAI)</h3>
                  <p>Lack of clarity hinders accountability and error correction.</p>
                </div>
                <div className="p-4 bg-black border border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Accountability & Responsibility</h3>
                  <p>Challenge in assigning responsibility when autonomous systems err.</p>
                </div>
                <div className="p-4 bg-black border border-red-600">
                  <h3 className="text-xl font-bold uppercase mb-2">Data Privacy and Security</h3>
                  <p>Concerns over collection/use of vast sensitive data.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 border-t-4 border-red-600 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-xs uppercase tracking-widest">AGENTIC AI RESEARCH LAB</p>
            <p className="text-red-400 text-sm">"Understanding the autonomous systems of tomorrow."</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-70">
              SYSTEM STATUS: <span className="text-red-600">OPERATIONAL</span>
            </span>
            <button
              onClick={() => window.print()}
              className="text-xs py-1 px-3 bg-transparent border border-white hover:border-red-600 hover:text-red-600 transition-colors"
            >
              PRINT MANUAL
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgenticAI101;
