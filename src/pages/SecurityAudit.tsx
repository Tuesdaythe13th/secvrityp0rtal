
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SecurityAudit = () => {
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

    // Initialize audit state
    const auditData = {
      governance: {
        title: "1. GOVERNANCE, POLICIES, AND PROCEDURES",
        description:
          "Ensuring technology aligns with organizational goals and regulatory requirements through formal, standardized policies and procedures.",
        questions: [
          "Do cybersecurity policies cover all relevant areas (access control, data protection, network, physical, personnel security, incident response)?",
          "Are standards defined for each of these areas?",
          "How is access to software applications managed for new/departing team members?",
          "What are your industry's data retention requirements for personnel, and are they met?",
          "How effective are current policies at mitigating threats?",
          "Does leadership actively demonstrate commitment to cybersecurity practices?",
          "What resources (personnel, budget) are dedicated to enforcing cybersecurity?",
        ],
      },
      iam: {
        title: "2. USER IDENTITY AND ACCESS MANAGEMENT (IAM)",
        description:
          "Managing user identities and access privileges to ensure the right individuals have appropriate access to resources.",
        questions: [
          "Is there a robust process for managing user identities throughout their lifecycle (onboarding, offboarding, role changes)?",
          "Are user account provisioning and de-provisioning managed effectively and in compliance with regulations?",
          "Is Role-Based Access Control (RBAC) implemented to streamline permissions for different roles?",
          "Is Multifactor Authentication (MFA) enforced for accessing critical systems and data?",
        ],
      },
      networkDeviceSecurity: {
        title: "3. NETWORK DEVICE SECURITY",
        description: "Securing the physical and virtual components of the network infrastructure.",
        questions: [
          "Are firewalls, switches, access points, servers, and VMs configured securely?",
          "Is remote access (e.g., VPN) secured with strong authentication and encryption?",
          "Are appropriate encryption standards applied consistently across the network?",
          "Are 24x7 monitoring tools used to detect suspicious traffic?",
          "Are processes in place for monitoring and mitigating suspicious network activity?",
          "Is network equipment firmware updated frequently with the latest security patches?",
        ],
      },
      endpointDeviceSecurity: {
        title: "4. END-POINT DEVICE SECURITY",
        description: "Protecting user workstations, laptops, mobile devices, and other endpoints.",
        questions: [
          "Is antivirus/antimalware software deployed and kept up-to-date on all endpoint devices?",
          "Is there a patch management process ensuring timely application of security patches, prioritizing critical ones?",
          "If mobile devices access organizational data, is a Mobile Device Management (MDM) solution in place and managed securely?",
        ],
      },
      dataProtection: {
        title: "5. DATA PROTECTION",
        description: "Implementing controls to safeguard data throughout its lifecycle.",
        questions: [
          "Is there a data classification scheme to identify sensitive data?",
          "Are data owners clearly identified and responsible for their data?",
          "Is data encrypted both at rest (storage) and in transit (network)?",
          "Is there a secure process for managing encryption keys?",
          "Are regular data backups performed?",
          "Where are backups stored (consider offsite/immutable storage)?",
          "Are backup restoration procedures tested regularly?",
          "Are Data Leakage Prevention (DLP) measures implemented?",
          "Are there clear policies governing data sharing and remote work security?",
        ],
      },
      thirdPartyProtection: {
        title: "6. THIRD-PARTY PROTECTION",
        description: "Managing risks associated with vendors, partners, and third-party software/services.",
        questions: [
          "Is there a vendor risk management program to assess third-party security postures?",
          "Are secure methods used when sharing information with vendors/partners?",
          "Are security requirements defined and enforced for cloud service providers?",
          "Is the security of third-party applications assessed before and during use?",
          "Is the network architecture designed to segment critical systems from potential third-party compromises?",
        ],
      },
      bcdr: {
        title: "7. BUSINESS CONTINUITY AND DISASTER RECOVERY (BC/DR) PLAN",
        description:
          "Preparing for, responding to, and recovering from disruptive incidents like cyberattacks or natural disasters.",
        questions: [
          "Is there a documented Incident Response Plan and/or BC/DR plan?",
          "Does the plan cover recovery procedures for critical systems and data?",
          "Are configurations (servers, firewalls, etc.) backed up alongside data?",
          "Are Recovery Point Objectives (RPOs) and Recovery Time Objectives (RTOs) defined and achievable?",
          "Is the BC/DR plan tested regularly through drills or simulations (including data restoration)?",
          "Does the incident response process include steps to thoroughly investigate and eradicate threats post-incident?",
        ],
      },
      regulatoryCompliance: {
        title: "8. REGULATORY COMPLIANCE",
        description: "Understanding and adhering to applicable laws, regulations, and industry standards.",
        questions: [
          "Have all relevant Federal, State, Local, and International regulations (e.g., HIPAA, GDPR, CCPA, CFR) been identified?",
          "Are IT governance policies aligned with these regulatory requirements?",
          "Can adherence to these policies and regulations be demonstrated (e.g., through logs, audits)?",
        ],
      },
      continuousImprovement: {
        title: "9. CONTINUOUS IMPROVEMENT",
        description: "Treating cybersecurity as an ongoing process of assessment, adaptation, and enhancement.",
        questions: [
          "Is cybersecurity viewed and managed as a continuous process, not a one-time project?",
          "Are regular security assessments, vulnerability scans, or penetration tests conducted?",
          "Is there a process for analyzing threats and evolving security controls accordingly?",
          "Is feedback from incidents and tests used to improve policies and procedures?",
        ],
      },
    };

    const auditState: Record<string, any> = {};
    for (const sectionId in auditData) {
      auditState[sectionId] = {
        status: "Not Assessed",
        notes: "",
        questionStatuses: Array((auditData as any)[sectionId].questions.length).fill(false),
      };
    }

    // Render audit sections
    function renderAuditSections() {
      const container = document.getElementById("audit-container");
      if (!container) return;
      container.innerHTML = "";

      for (const sectionId in auditData) {
        const section = (auditData as any)[sectionId];
        const state = auditState[sectionId];

        const sectionEl = document.createElement("div");
        sectionEl.className = "bg-black border-2 border-white p-6 fade-in";
        sectionEl.id = `section-${sectionId}`;

        sectionEl.innerHTML = `
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-xl md:text-2xl font-bold">${section.title}</h2>
          <div id="${sectionId}-badge" class="completion-badge bg-black text-xs px-2 py-1 border border-white">${
            state ? state.questionStatuses.filter((s: boolean) => s).length : 0
          }/${section.questions.length}</div>
        </div>
        <p class="mb-6">${section.description}</p>
        
        <div class="space-y-1 mb-6">
          <p class="font-bold text-red-600">KEY CONSIDERATIONS / QUESTIONS:</p>
          <ul class="list-disc pl-5 space-y-2">
            ${section.questions
              .map(
                (q: string, i: number) => `
              <li class="flex items-start gap-4">
                <label class="inline-flex items-center mt-1">
                  <input type="checkbox" data-section="${sectionId}" data-question="${i}" 
                         ${state.questionStatuses[i] ? "checked" : ""}
                         class="form-checkbox h-4 w-4 text-red-600 bg-black border-2 border-white">
                </label>
                <span>${q}</span>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block font-bold mb-2">SECTION STATUS</label>
            <select id="${sectionId}-status" class="status-select bg-black w-full">
              <option value="Not Assessed" ${state.status === "Not Assessed" ? "selected" : ""}>NOT ASSESSED</option>
              <option value="Compliant" ${state.status === "Compliant" ? "selected" : ""}>COMPLIANT</option>
              <option value="Partially Implemented" ${
                state.status === "Partially Implemented" ? "selected" : ""
              }>PARTIALLY IMPLEMENTED</option>
              <option value="Needs Improvement" ${
                state.status === "Needs Improvement" ? "selected" : ""
              }>NEEDS IMPROVEMENT</option>
              <option value="Not Applicable" ${state.status === "Not Applicable" ? "selected" : ""}>NOT APPLICABLE</option>
            </select>
          </div>
          <div>
            <label for="${sectionId}-notes" class="block font-bold mb-2">NOTES</label>
            <textarea id="${sectionId}-notes" class="w-full bg-black border-2 border-white text-white p-2" 
                    placeholder="Enter findings, action items, and recommendations...">${state.notes}</textarea>
          </div>
        </div>
      `;

        container.appendChild(sectionEl);

        // Add event listeners
        const statusSelect = document.getElementById(`${sectionId}-status`);
        if (statusSelect) {
          statusSelect.addEventListener("change", (e) => {
            const target = e.target as HTMLSelectElement;
            auditState[sectionId].status = target.value;
            updateCompletionStats();
          });
        }

        const notesTextarea = document.getElementById(`${sectionId}-notes`);
        if (notesTextarea) {
          notesTextarea.addEventListener("input", (e) => {
            const target = e.target as HTMLTextAreaElement;
            auditState[sectionId].notes = target.value;
          });
        }
      }

      // Add checkbox event listeners
      document.querySelectorAll('input[type="checkbox"][data-section]').forEach((checkbox) => {
        checkbox.addEventListener("change", (e) => {
          const target = e.target as HTMLInputElement;
          const sectionId = target.getAttribute("data-section");
          const questionIndex = Number.parseInt(target.getAttribute("data-question") || "0");
          if (sectionId) {
            auditState[sectionId].questionStatuses[questionIndex] = target.checked;

            // Update section badge
            updateSectionBadge(sectionId);
            updateCompletionStats();
          }
        });
      });
    }

    // Render section tabs
    function renderSectionTabs() {
      const container = document.getElementById("section-tabs");
      if (!container) return;
      container.innerHTML = "";

      for (const sectionId in auditData) {
        const section = (auditData as any)[sectionId];

        const tabEl = document.createElement("button");
        tabEl.className =
          "tab block w-full text-left p-3 bg-black border-l-4 border-white hover:border-red-600 hover:bg-gray-900 transition-all";
        tabEl.textContent = section.title;
        tabEl.addEventListener("click", () => {
          const sectionElement = document.getElementById(`section-${sectionId}`);
          if (sectionElement) {
            sectionElement.scrollIntoView({
              behavior: "smooth",
            });

            // Highlight active tab
            document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
            tabEl.classList.add("active");
          }
        });

        container.appendChild(tabEl);
      }
    }

    // Update section completion badge
    function updateSectionBadge(sectionId: string) {
      const state = auditState[sectionId];
      const total = state.questionStatuses.length;
      const completed = state.questionStatuses.filter((s: boolean) => s).length;

      const badge = document.getElementById(`${sectionId}-badge`);
      if (!badge) return;

      badge.textContent = `${completed}/${total}`;

      // Change color based on completion
      if (completed === total) {
        badge.classList.add("text-green-600", "border-green-600");
        badge.classList.remove("text-yellow-600", "border-yellow-600", "text-red-600", "border-red-600");
      } else if (completed > 0) {
        badge.classList.add("text-yellow-600", "border-yellow-600");
        badge.classList.remove("text-green-600", "border-green-600", "text-red-600", "border-red-600");
      } else {
        badge.classList.add("text-red-600", "border-red-600");
        badge.classList.remove("text-green-600", "border-green-600", "text-yellow-600", "border-yellow-600");
      }
    }

    // Update global completion stats
    function updateCompletionStats() {
      let totalQuestions = 0;
      let completedQuestions = 0;
      let completedSections = 0;
      let totalSections = 0;

      // Count questions
      for (const sectionId in auditData) {
        const state = auditState[sectionId];
        totalQuestions += state.questionStatuses.length;
        completedQuestions += state.questionStatuses.filter((s: boolean) => s).length;
        totalSections++;
        if (state.status !== "Not Assessed") completedSections++;
      }

      // Update progress bar
      const progress = Math.round((completedQuestions / totalQuestions) * 100);
      const progressBar = document.getElementById("global-progress");
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      // Update text
      const completionStats = document.getElementById("completion-stats");
      if (completionStats) {
        completionStats.textContent = `${progress}%`;
      }

      const completionText = document.getElementById("completion-text");
      if (completionText) {
        completionText.textContent = `${completedQuestions} of ${totalQuestions} items assessed`;
      }

      // Change progress bar color based on completion
      if (progressBar) {
        progressBar.classList.remove("bg-green-600", "bg-yellow-600", "bg-red-600");
        if (progress === 100) progressBar.classList.add("bg-green-600");
        else if (progress >= 50) progressBar.classList.add("bg-yellow-600");
        else progressBar.classList.add("bg-red-600");
      }
    }

    // Show email modal
    function showEmailModal() {
      const modal = document.getElementById("email-modal");
      if (modal) {
        modal.classList.remove("hidden");
      }
    }

    // Hide email modal
    function hideEmailModal() {
      const modal = document.getElementById("email-modal");
      if (modal) {
        modal.classList.add("hidden");
      }
    }

    // Simulate sending email
    function sendEmail() {
      const emailInput = document.getElementById("email-address") as HTMLInputElement;
      const email = emailInput?.value;
      if (!email || !email.includes("@")) {
        alert("Please enter a valid email address");
        return;
      }

      hideEmailModal();
      showSuccess(`Report sent to ${email} successfully`);
    }

    // Show success notification
    function showSuccess(message: string) {
      const notification = document.getElementById("success-notification");
      if (!notification) return;

      const messageElement = notification.querySelector("#success-message");
      if (messageElement) {
        messageElement.textContent = message;
      }

      notification.classList.remove("hidden");

      setTimeout(() => {
        notification.classList.add("fade-in");
      }, 10);

      setTimeout(() => {
        notification.classList.add("opacity-0", "transition-opacity", "duration-1000");
        setTimeout(() => {
          notification.classList.add("hidden");
          notification.classList.remove("opacity-0", "transition-opacity", "duration-1000");
        }, 1000);
      }, 3000);
    }

    // Reset audit
    function resetAudit() {
      if (confirm("Are you sure you want to reset all audit progress? This cannot be undone.")) {
        for (const sectionId in auditState) {
          auditState[sectionId] = {
            status: "Not Assessed",
            notes: "",
            questionStatuses: Array((auditData as any)[sectionId].questions.length).fill(false),
          };
        }

        renderAuditSections();
        updateCompletionStats();

        // Update all section badges
        for (const sectionId in auditData) {
          updateSectionBadge(sectionId);
        }

        showSuccess("Audit has been reset");
      }
    }

    // Google Drive export simulation
    function exportToDrive() {
      showSuccess("Report saved to Google Drive successfully");
    }

    // Initialize the app
    createBloodDrops();
    renderAuditSections();
    renderSectionTabs();
    updateCompletionStats();

    // Add event listeners for export buttons
    const exportPdfButton = document.getElementById("export-pdf");
    if (exportPdfButton) {
      exportPdfButton.addEventListener("click", () => {
        showSuccess("PDF export functionality would be implemented here");
      });
    }

    const exportEmailButton = document.getElementById("export-email");
    if (exportEmailButton) {
      exportEmailButton.addEventListener("click", showEmailModal);
    }

    const exportDriveButton = document.getElementById("export-drive");
    if (exportDriveButton) {
      exportDriveButton.addEventListener("click", exportToDrive);
    }

    const resetAuditButton = document.getElementById("reset-audit");
    if (resetAuditButton) {
      resetAuditButton.addEventListener("click", resetAudit);
    }

    // Email modal events
    const closeEmailButton = document.getElementById("close-email");
    if (closeEmailButton) {
      closeEmailButton.addEventListener("click", hideEmailModal);
    }

    const sendEmailButton = document.getElementById("send-email");
    if (sendEmailButton) {
      sendEmailButton.addEventListener("click", sendEmail);
    }

    // Close modal when clicking outside
    const emailModal = document.getElementById("email-modal");
    if (emailModal) {
      emailModal.addEventListener("click", (e) => {
        if (e.target === emailModal) {
          hideEmailModal();
        }
      });
    }

    // Initialize first tab as active
    const firstTab = document.querySelector(".tab");
    if (firstTab) {
      firstTab.classList.add("active");
    }
  }, []);

  return (
    <div className="bg-black text-white font-mono scanlines relative overflow-x-hidden">
      {/* Blood drops for effect */}
      <div id="blood-drops"></div>

      {/* Back Button */}
      <motion.div 
        className="fixed top-4 left-4 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/"
          className="brutal-btn px-4 py-2 bg-black text-white font-bold border-2 border-white hover:bg-red-600 hover:border-red-600 transition-colors"
        >
          ← BACK
        </Link>
      </motion.div>

      <header className="container mx-auto px-4 py-8 border-b-4 border-red-600">
        <div className="flex justify-between items-center">
          <div>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-2 tracking-tighter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              BRUTAL<span className="text-red-600">SEC</span>
            </motion.h1>
            <motion.p 
              className="text-red-400 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              CYBERSECURITY AUDIT TOOL v2.4.1
            </motion.p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-xs mb-1">COMPLETION:</p>
              <div id="completion-stats" className="text-red-600 text-2xl font-bold">
                0%
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">SYSTEM AUDIT PROGRESS</h2>
          <div className="h-2 bg-gray-800 mb-2">
            <div id="global-progress" className="progress-bar bg-red-600" style={{ width: "0%" }}></div>
          </div>
          <div className="flex justify-between text-xs">
            <span>BEGIN AUDIT</span>
            <span id="completion-text">0 of 65 items assessed</span>
            <span>AUDIT COMPLETE</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar navigation */}
          <div className="lg:col-span-1">
            <motion.div 
              className="sticky top-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="bg-black border-2 border-white p-4 mb-4">
                <h3 className="text-xl font-bold mb-3 border-b-2 border-red-600 pb-2">AUDIT SECTIONS</h3>
                <div id="section-tabs" className="space-y-2"></div>
              </div>

              <div className="bg-black border-2 border-white p-4">
                <h3 className="text-xl font-bold mb-3 border-b-2 border-red-600 pb-2">EXPORT AUDIT</h3>
                <div className="space-y-3">
                  <button
                    id="export-pdf"
                    className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    GENERATE PDF
                  </button>
                  <button
                    id="export-email"
                    className="w-full py-3 px-4 bg-black hover:bg-gray-900 text-white border-2 border-white hover:border-red-600 font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    EMAIL REPORT
                  </button>
                  <button
                    id="export-drive"
                    className="w-full py-3 px-4 bg-black hover:bg-gray-900 text-white border-2 border-white hover:border-red-600 font-bold flex items-center justify-center gap-2 transition-all"
                  >
                    SAVE TO DRIVE
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main content */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <div id="audit-container" className="space-y-8"></div>
          </motion.div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 border-t-4 border-red-600 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-xs uppercase tracking-widest">BRUTALSEC INDUSTRIES</p>
            <p className="text-red-400 text-sm">"Our security audits leave scars."</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-70 pulse">
              SYSTEM STATUS: <span className="text-red-600">SECURE</span>
            </span>
            <button
              id="reset-audit"
              className="text-xs py-1 px-3 bg-transparent border border-white hover:border-red-600 hover:text-red-600 transition-colors"
            >
              RESET AUDIT
            </button>
          </div>
        </div>
      </footer>

      {/* Email Modal */}
      <div
        id="email-modal"
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 hidden"
      >
        <div className="bg-black border-4 border-white p-8 max-w-md w-full relative">
          <button id="close-email" className="absolute top-2 right-2 text-white hover:text-red-600 text-xl">
            ✕
          </button>
          <h3 className="text-2xl font-bold mb-4 text-center">EMAIL REPORT</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm mb-1">
                RECIPIENT EMAIL
              </label>
              <input
                type="email"
                id="email-address"
                className="w-full bg-black border-2 border-white text-white p-2 focus:outline-none focus:border-red-600"
                placeholder="security@yourdomain.com"
              />
            </div>
            <div>
              <label htmlFor="email-subject" className="block text-sm mb-1">
                SUBJECT
              </label>
              <input
                type="text"
                id="email-subject"
                className="w-full bg-black border-2 border-white text-white p-2 focus:outline-none focus:border-red-600"
                defaultValue="Cybersecurity Audit Report"
              />
            </div>
            <div>
              <label htmlFor="email-message" className="block text-sm mb-1">
                MESSAGE
              </label>
              <textarea
                id="email-message"
                rows={4}
                className="w-full bg-black border-2 border-white text-white p-2 focus:outline-none focus:border-red-600"
                defaultValue="Attached is your security audit report. Review carefully and implement recommendations immediately."
              ></textarea>
            </div>
            <button
              id="send-email"
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 transition-all"
            >
              SEND REPORT
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification */}
      <div
        id="success-notification"
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black border-2 border-green-600 px-6 py-3 shadow-lg flex items-center gap-3 hidden"
      >
        <div>
          <p className="font-bold">OPERATION SUCCESSFUL</p>
          <p id="success-message" className="text-sm">
            Report generated successfully
          </p>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }

        @keyframes scanline {
          0% { background-position: 0 -100vh; }
          100% { background-position: 0 100vh; }
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        .scanlines {
          position: relative;
          overflow: hidden;
        }

        .scanlines::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(255, 0, 0, 0.03) 50%,
            rgba(255, 0, 0, 0.1) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
          animation: scanline 8s linear infinite;
          z-index: 100;
        }

        .blood-drop {
          position: absolute;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0) 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 90;
        }

        .flashing-border {
          animation: borderPulse 2s infinite;
          border: 2px solid red;
        }

        @keyframes borderPulse {
          0% { border-color: red; }
          50% { border-color: black; }
          100% { border-color: red; }
        }

        .tab {
          transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        .tab:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
        }

        .tab.active {
          border-left: 6px solid red;
          background-color: rgba(255, 0, 0, 0.1);
        }

        .progress-bar {
          height: 6px;
          transition: width 1s ease-out;
        }

        .completion-badge {
          font-family: monospace;
          font-size: 12px;
          letter-spacing: 1px;
        }
      `}</style>
    </div>
  );
};

export default SecurityAudit;
