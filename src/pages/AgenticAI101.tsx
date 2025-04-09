import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/AgenticAI101.css";

const AgenticAI101 = () => {
  useEffect(() => {
    // Create blood drop effects
    function createBloodDrops() {
      const container = document.getElementById("blood-drops")
      if (!container) return

      const colors = ["rgba(255,0,0,0.2)", "rgba(255,0,0,0.4)", "rgba(255,0,0,0.6)"]

      for (let i = 0; i < 15; i++) {
        const drop = document.createElement("div")
        drop.className = "blood-drop"
        drop.style.left = `${Math.random() * 100}%`
        drop.style.top = `${Math.random() * 100}%`
        drop.style.width = `${20 + Math.random() * 40}px`
        drop.style.height = `${20 + Math.random() * 40}px`
        drop.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        drop.style.opacity = (Math.random() * 0.6 + 0.2).toString()
        container.appendChild(drop)
      }
    }

    // Toggle section visibility
    function toggleSection(sectionId: string) {
      const content = document.getElementById(`${sectionId}-content`)
      const button = document.querySelector(`[data-section="${sectionId}"] span`)

      if (content && button) {
        content.classList.toggle("open")
        button.textContent = content.classList.contains("open") ? "−" : "+"
      }
    }

    // Initialize the app
    createBloodDrops()

    // Open first section by default
    const firstSection = document.getElementById("coreConcepts-content")
    const firstButton = document.querySelector('[data-section="coreConcepts"] span')
    if (firstSection && firstButton) {
      firstSection.classList.add("open")
      firstButton.textContent = "−"
    }

    // Add event listeners for navigation buttons
    document.getElementById("nav-overview")?.addEventListener("click", () => {
      document.getElementById("overview-section")?.scrollIntoView({
        behavior: "smooth",
      })
    })

    document.getElementById("nav-concepts")?.addEventListener("click", () => {
      document.getElementById("coreConcepts-content")?.scrollIntoView({
        behavior: "smooth",
      })
    })

    document.getElementById("nav-usecases")?.addEventListener("click", () => {
      document.getElementById("useCases-content")?.scrollIntoView({
        behavior: "smooth",
      })
    })

    document.getElementById("nav-tech")?.addEventListener("click", () => {
      document.getElementById("technicalAspects-content")?.scrollIntoView({
        behavior: "smooth",
      })
    })

    document.getElementById("nav-ethics")?.addEventListener("click", () => {
      document.getElementById("ethicalSocietal-content")?.scrollIntoView({
        behavior: "smooth",
      })
    })

    // Add click handlers for section toggles
    document.querySelectorAll("[data-section]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const sectionId = el.getAttribute("data-section")
        if (sectionId) toggleSection(sectionId)
      })
    })
  }, [])

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const pulsingVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror" 
      }
    }
  };

  return (
    <motion.div 
      className="bg-white text-black font-mono scanlines relative overflow-x-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      {/* Blood drops for effect */}
      <div id="blood-drops"></div>

      <motion.header 
        className="container mx-auto px-4 py-12 border-b-4 border-red-600"
        variants={fadeInVariants}
      >
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="text-4xl font-bold tracking-tighter hover:text-red-600">
              ← BACK
            </Link>
          </motion.div>
          <div className="flex flex-col items-center text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter glow-red"
              variants={pulsingVariants}
              initial="initial"
              animate="animate"
            >
              AGENTIC<span className="text-red-600">AI</span>
            </motion.h1>
            <p className="text-xl md:text-2xl uppercase border-b-4 border-red-600 pb-2 flicker">
              EDUCATIONAL TERMINAL v4.2.1
            </p>
          </div>
          <div className="w-24 hidden md:block"></div> {/* spacer for balance */}
        </div>
        <motion.p 
          className="mt-4 text-red-600 text-sm md:text-base flashing-text text-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          WARNING: HIGH-INTENSITY KNOWLEDGE TRANSFER IN PROGRESS
        </motion.p>
      </motion.header>

      <motion.main 
        className="container mx-auto px-4 py-8"
        variants={staggerContainerVariants}
      >
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b-2 border-red-600 pb-4">
          {["OVERVIEW", "CONCEPTS", "USE CASES", "TECH SPECS", "ETHICS"].map((tab, index) => (
            <motion.button
              key={tab}
              id={`nav-${tab.toLowerCase().replace(" ", "")}`}
              className="py-2 px-4 bg-white hover:bg-gray-100 text-black border-2 border-black hover:border-red-600 hover:text-red-600 font-bold"
              whileHover={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {tab}
            </motion.button>
          ))}
        </div>

        {/* Overview Section */}
        <motion.div 
          id="overview-section" 
          className="mb-20"
          variants={fadeInVariants}
        >
          <h2 className="text-3xl font-bold mb-6 border-b-2 border-red-600 pb-2 uppercase">SYSTEM OVERVIEW</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["CORE CAPABILITIES", "KEY DIFFERENTIATORS", "CRITICAL CONSIDERATIONS"].map((title, index) => (
              <motion.div 
                key={title}
                className="bg-white border-2 border-black p-6 highlight-box"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
              >
                <h3 className="text-xl font-bold mb-3 text-red-600 flex items-center gap-2">
                  <i className="fas fa-brain"></i> {title}
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {
                    title === "CORE CAPABILITIES" ? (
                      <>
                        <li>Autonomous Decision Making</li>
                        <li>Advanced Reasoning</li>
                        <li>Continuous Learning</li>
                        <li>Language Understanding</li>
                      </>
                    ) : title === "KEY DIFFERENTIATORS" ? (
                      <>
                        <li>Action-Oriented Design</li>
                        <li>Dynamic Environment Adaptation</li>
                        <li>Multi-Step Task Execution</li>
                        <li>System Coordination</li>
                      </>
                    ) : (
                      <>
                        <li>Ethical Frameworks</li>
                        <li>Transparency Requirements</li>
                        <li>Human Oversight Protocols</li>
                        <li>Risk Mitigation Strategies</li>
                      </>
                    )
                  }
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Sections */}
        <div id="content-sections" className="space-y-12">
          {/* Core Concepts */}
          <motion.div 
            className="bg-white border-2 border-black p-6 flash-border"
            whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
            variants={fadeInVariants}
          >
            <div className="flex justify-between items-center cursor-pointer" data-section="coreConcepts">
              <h2 className="text-2xl font-bold text-red-600">1. CORE CONCEPTS & FUNCTIONALITIES</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="coreConcepts-content" className="section-transition">
              <div className="mt-6 space-y-6">
                {["Autonomy", "Reasoning & Planning", "Adaptability & Learning", "Language Understanding", "Workflow Optimization"].map((concept, index) => (
                  <motion.div 
                    key={concept}
                    className="pl-4 border-l-4 border-red-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold uppercase mb-2">{concept}</h3>
                    <p className="pl-2">
                      {
                        concept === "Autonomy" 
                          ? "Operate independently with minimal human intervention, making decisions based on environment analysis and objectives."
                          : concept === "Reasoning & Planning"
                          ? "Utilize advanced capabilities to understand situations, evaluate options, formulate strategies, and execute actions."
                          : concept === "Adaptability & Learning"
                          ? "Adapt to changing environments and improve performance via continuous learning from feedback and interactions."
                          : concept === "Language Understanding"
                          ? "Often powered by LLMs, possess NLP capabilities to interpret complex instructions and engage in conversations."
                          : "Excel at streamlining complex workflows, automating tasks, and coordinating across systems/tools."
                      }
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Differentiation */}
          <motion.div 
            className="bg-white border-2 border-black p-6 flash-border"
            whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
            variants={fadeInVariants}
          >
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
          </motion.div>

          {/* Use Cases */}
          <motion.div 
            className="bg-white border-2 border-black p-6 flash-border"
            whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
            variants={fadeInVariants}
          >
            <div className="flex justify-between items-center cursor-pointer" data-section="useCases">
              <h2 className="text-2xl font-bold text-red-600">3. KEY USE CASES</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="useCases-content" className="section-transition">
              <motion.div 
                className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainerVariants}
              >
                {["Automating IT workflows", "Improving code quality", "Enhancing customer service", "Optimizing supply chains"].map((useCase, index) => (
                  <motion.div 
                    key={useCase}
                    className="bg-white border border-red-600 p-4"
                    whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold mb-2">{useCase}</h3>
                    <p>
                      {
                        useCase === "Automating IT workflows" 
                          ? "Responding to requests, troubleshooting, automating IT processes."
                          : useCase === "Improving code quality"
                          ? "Automating reviews, detecting issues, ensuring standard adherence."
                          : useCase === "Enhancing customer service"
                          ? "Personalized support via AI chatbots and virtual assistants."
                          : "Predicting demand, managing inventory, adjusting logistics in real-time."
                      }
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Emerging Questions */}
          <motion.div 
            className="bg-white border-2 border-black p-6 flash-border"
            whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
            variants={fadeInVariants}
          >
            <div className="flex justify-between items-center cursor-pointer" data-section="emergingQuestions">
              <h2 className="text-2xl font-bold text-red-600">4. EMERGING QUESTIONS</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="emergingQuestions-content" className="section-transition">
              <div className="mt-6 space-y-4">
                {["Ethics & Responsibility", "Transparency & Trust", "Autonomy vs. Oversight"].map((question, index) => (
                  <motion.div 
                    key={question}
                    className="p-4 bg-white border border-red-600"
                    whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold uppercase">{question}</h3>
                    <p className="mt-2">
                      {
                        question === "Ethics & Responsibility" 
                          ? "How to ensure ethical decision-making in agentic systems?"
                          : question === "Transparency & Trust"
                          ? "How to maintain transparency and trust in autonomous agents?"
                          : "How to balance AI autonomy with necessary human oversight and control?"
                      }
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Technical Aspects */}
          <motion.div 
            className="bg-white border-2 border-black p-6 flash-border"
            whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
            variants={fadeInVariants}
          >
            <div className="flex justify-between items-center cursor-pointer" data-section="technicalAspects">
              <h2 className="text-2xl font-bold text-red-600">5. TECHNICAL ASPECTS AND ARCHITECTURES</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="technicalAspects-content" className="section-transition">
              <div className="mt-6 space-y-6">
                {["Core Components", "Single-Agent vs. Multi-Agent Systems", "Integration", "Frameworks & Tools"].map((aspect, index) => (
                  <motion.div 
                    key={aspect}
                    className="pl-4 border-l-4 border-red-600"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold uppercase mb-2">{aspect}</h3>
                    <p className="pl-2">
                      {
                        aspect === "Core Components" 
                          ? "Typically include perception, reasoning, planning, decision-making, and action execution."
                          : aspect === "Single-Agent vs. Multi-Agent Systems"
                          ? "Single independent entity vs. multiple interacting agents (collaborating/competing)."
                          : aspect === "Integration"
                          ? "Often leverages other AI (LLMs, ML models, computer vision)."
                          : "Development supported by tools like AutoGen, CrewAI, AgentGPT, MetaGPT."
                      }
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Ethical and Societal */}
          <motion.div 
            className="bg-white border-2 border-black p-6 flash-border"
            whileHover={{ boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
            variants={fadeInVariants}
          >
            <div className="flex justify-between items-center cursor-pointer" data-section="ethicalSocietal">
              <h2 className="text-2xl font-bold text-red-600">6. ETHICAL AND SOCIETAL IMPLICATIONS</h2>
              <span className="text-xl">+</span>
            </div>
            <div id="ethicalSocietal-content" className="section-transition">
              <motion.div 
                className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={staggerContainerVariants}
              >
                {["Bias and Fairness", "Transparency and Explainability (XAI)", "Accountability & Responsibility", "Data Privacy and Security"].map((aspect, index) => (
                  <motion.div 
                    key={aspect}
                    className="p-4 bg-white border border-red-600"
                    whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold uppercase mb-2">{aspect}</h3>
                    <p>
                      {
                        aspect === "Bias and Fairness" 
                          ? "Risk of perpetuating/amplifying biases from training data, leading to discrimination."
                          : aspect === "Transparency and Explainability (XAI)"
                          ? "Lack of clarity hinders accountability and error correction."
                          : aspect === "Accountability & Responsibility"
                          ? "Challenge in assigning responsibility when autonomous systems err."
                          : "Concerns over collection/use of vast sensitive data."
                      }
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.main>

      <motion.footer 
        className="container mx-auto px-4 py-8 border-t-4 border-red-600 mt-12"
        variants={fadeInVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-xs uppercase tracking-widest">AGENTIC AI RESEARCH LAB</p>
            <p className="text-red-600 text-sm">"Understanding the autonomous systems of tomorrow."</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-70">
              SYSTEM STATUS: <span className="text-red-600">OPERATIONAL</span>
            </span>
            <motion.button
              onClick={() => window.print()}
              className="text-xs py-1 px-3 bg-transparent border border-black hover:border-red-600 hover:text-red-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PRINT MANUAL
            </motion.button>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default AgenticAI101;
