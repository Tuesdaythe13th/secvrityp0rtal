
import React, { useState } from "react";
import { Link } from "react-router-dom";

interface VDPFormData {
  agencyName: string;
  policyDate: string;
  useDefaultIntro: boolean;
  customIntro: string;
  useDefaultAuth: boolean;
  customAuth: string;
  useDefaultGuidelines: boolean;
  customGuidelines: string;
  inScopeSystems: string[];
  outOfScopeSystems: string[];
  reportingEmail: string;
  reportingUrl: string;
  acknowledgmentTime: number;
  supportsPGP: boolean;
  pgpKey: string;
}

interface SystemItem {
  id: string;
  name: string;
}

export default function VDPGenerator() {
  const [activeTab, setActiveTab] = useState("agency");
  const [formData, setFormData] = useState<VDPFormData>({
    agencyName: "",
    policyDate: "",
    useDefaultIntro: true,
    customIntro: "",
    useDefaultAuth: true,
    customAuth: "",
    useDefaultGuidelines: true,
    customGuidelines: "",
    inScopeSystems: [],
    outOfScopeSystems: [],
    reportingEmail: "",
    reportingUrl: "",
    acknowledgmentTime: 3,
    supportsPGP: false,
    pgpKey: "",
  });

  const [inScopeItems, setInScopeItems] = useState<SystemItem[]>([]);
  const [outOfScopeItems, setOutOfScopeItems] = useState<SystemItem[]>([]);
  const [newSystem, setNewSystem] = useState("");
  const [outScopeSystem, setOutScopeSystem] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleTabChange = (tab: string) => {
    // Validate current tab before proceeding
    if (activeTab === "agency" && tab !== "agency") {
      const newErrors: Record<string, boolean> = {};
      if (!formData.agencyName) newErrors.agencyName = true;
      if (!formData.policyDate) newErrors.policyDate = true;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
    }

    if (activeTab === "scope" && tab === "reporting") {
      if (inScopeItems.length === 0) {
        setErrors({ ...errors, scope: true });
        return;
      }
    }

    setActiveTab(tab);

    // Update preview if moving to review tab
    if (tab === "review") {
      updatePreview();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id.replace("-", "")]: value });

    // Clear error for this field if it exists
    if (errors[id.replace("-", "")]) {
      const newErrors = { ...errors };
      delete newErrors[id.replace("-", "")];
      setErrors(newErrors);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData({ ...formData, [id.replace("-", "")]: checked });
  };

  const addSystem = (type: "in-scope" | "out-scope") => {
    if (type === "in-scope" && newSystem.trim()) {
      const newItem = { id: `in-${Date.now()}`, name: newSystem.trim() };
      setInScopeItems([...inScopeItems, newItem]);
      setNewSystem("");

      // Clear scope error if it exists
      if (errors.scope) {
        const newErrors = { ...errors };
        delete newErrors.scope;
        setErrors(newErrors);
      }
    } else if (type === "out-scope" && outScopeSystem.trim()) {
      const newItem = { id: `out-${Date.now()}`, name: outScopeSystem.trim() };
      setOutOfScopeItems([...outOfScopeItems, newItem]);
      setOutScopeSystem("");
    }
  };

  const removeSystem = (id: string, type: "in-scope" | "out-scope") => {
    if (type === "in-scope") {
      setInScopeItems(inScopeItems.filter((item) => item.id !== id));
    } else {
      setOutOfScopeItems(outOfScopeItems.filter((item) => item.id !== id));
    }
  };

  const updatePreview = () => {
    // This would update the preview in the review tab
    // For brevity, we're not implementing the full preview logic here
    console.log("Updating preview with:", formData);
  };

  const generatePolicy = () => {
    // Validate required fields
    const newErrors: Record<string, boolean> = {};
    if (!formData.agencyName) newErrors.agencyName = true;
    if (!formData.policyDate) newErrors.policyDate = true;
    if (inScopeItems.length === 0) newErrors.scope = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Navigate to first tab with errors
      if (newErrors.agencyName || newErrors.policyDate) {
        setActiveTab("agency");
      } else if (newErrors.scope) {
        setActiveTab("scope");
      }
      return;
    }

    // Generate policy text
    const policyText = generatePolicyText();

    // Create download
    const blob = new Blob([policyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.agencyName.replace(/ /g, "_")}_Vulnerability_Disclosure_Policy.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generatePolicyText = () => {
    // Generate the policy text based on form data
    // This is a simplified version
    let policyText = `Vulnerability Disclosure Policy\n`;
    policyText += `========================================================================\n`;
    policyText += `${formData.agencyName}\n`;
    policyText += `${formData.policyDate}\n\n`;

    policyText += `INTRODUCTION\n`;
    policyText += `------------------------------------------------------------------------\n`;
    if (formData.useDefaultIntro) {
      policyText += `${formData.agencyName} is committed to ensuring the security of systems by protecting information. This policy describes what systems and types of research are covered under this policy, how to send vulnerability reports, and how long we ask researchers to wait before public disclosure.\n\n`;
    } else {
      policyText += `${formData.customIntro}\n\n`;
    }

    // Add other sections...

    return policyText;
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="brutal-btn px-4 py-2 bg-black text-white font-bold border-2 border-white hover:bg-purple-800 hover:border-purple-800"
        >
          ← BACK
        </Link>
      </div>

      <div className="max-w-6xl mx-auto mt-16 border-4 border-black bg-white text-black p-6">
        <h1 className="text-3xl font-black mb-6 text-center uppercase">
          Vulnerability Disclosure Policy Generator
        </h1>

        <div className="vdp-generator">
          {/* Navigation Tabs */}
          <div className="flex border-b-4 border-black mb-6 overflow-x-auto">
            <button
              className={`brutal-btn px-4 py-2 mr-2 font-bold text-sm ${activeTab === "agency" ? "bg-purple-600 text-white" : ""}`}
              onClick={() => handleTabChange("agency")}
            >
              AGENCY INFO
            </button>
            <button
              className={`brutal-btn px-4 py-2 mr-2 font-bold text-sm ${activeTab === "introduction" ? "bg-purple-600 text-white" : ""}`}
              onClick={() => handleTabChange("introduction")}
            >
              INTRODUCTION
            </button>
            <button
              className={`brutal-btn px-4 py-2 mr-2 font-bold text-sm ${activeTab === "authorization" ? "bg-purple-600 text-white" : ""}`}
              onClick={() => handleTabChange("authorization")}
            >
              AUTHORIZATION
            </button>
            <button
              className={`brutal-btn px-4 py-2 mr-2 font-bold text-sm ${activeTab === "guidelines" ? "bg-purple-600 text-white" : ""}`}
              onClick={() => handleTabChange("guidelines")}
            >
              GUIDELINES
            </button>
            <button
              className={`brutal-btn px-4 py-2 mr-2 font-bold text-sm ${activeTab === "scope" ? "bg-purple-600 text-white" : ""}`}
              onClick={() => handleTabChange("scope")}
            >
              SCOPE
            </button>
            <button
              className={`brutal-btn px-4 py-2 mr-2 font-bold text-sm ${activeTab === "reporting" ? "bg-purple-600 text-white" : ""}`}
              onClick={() => handleTabChange("reporting")}
            >
              REPORTING
            </button>
            <button
              className={`brutal-btn px-4 py-2 mr-2 font-bold text-sm ${activeTab === "review" ? "bg-purple-600 text-white" : ""}`}
              onClick={() => handleTabChange("review")}
            >
              REVIEW
            </button>
          </div>

          {/* Agency Info Section */}
          {activeTab === "agency" && (
            <div id="agency-section" className="section-content">
              <h2 className="text-2xl font-black mb-4 border-b-4 border-black pb-2">AGENCY INFORMATION</h2>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">AGENCY NAME *</label>
                <input
                  type="text"
                  id="agency-name"
                  className={`brutal-input w-full p-2 ${errors.agencyName ? "border-red-600" : ""}`}
                  value={formData.agencyName}
                  onChange={handleInputChange}
                />
                {errors.agencyName && <p className="text-red-600 mt-1">Required field</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">POLICY DATE *</label>
                <input
                  type="text"
                  id="policy-date"
                  className={`brutal-input w-full p-2 ${errors.policyDate ? "border-red-600" : ""}`}
                  placeholder="e.g., January 1, 2025"
                  value={formData.policyDate}
                  onChange={handleInputChange}
                />
                {errors.policyDate && <p className="text-red-600 mt-1">Required field</p>}
              </div>

              <div className="flex justify-end">
                <button className="brutal-btn px-4 py-2 font-bold" onClick={() => handleTabChange("introduction")}>
                  NEXT →
                </button>
              </div>
            </div>
          )}

          {/* Introduction Section */}
          {activeTab === "introduction" && (
            <div id="introduction-section" className="section-content">
              <h2 className="text-2xl font-black mb-4 border-b-4 border-black pb-2">INTRODUCTION</h2>

              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    id="use-default-intro"
                    className="mr-2"
                    checked={formData.useDefaultIntro}
                    onChange={handleCheckboxChange}
                  />
                  <span className="font-bold">USE DEFAULT TEXT</span>
                </label>
              </div>

              {formData.useDefaultIntro ? (
                <div id="default-intro-text" className="bg-gray-100 p-4 mb-4">
                  <p>
                    {formData.agencyName || "[AGENCY NAME]"} is committed to ensuring the security of systems by protecting
                    information. This policy describes what systems and types of research are covered under this policy, how
                    to send vulnerability reports, and how long we ask researchers to wait before public disclosure.
                  </p>
                </div>
              ) : (
                <div id="custom-intro-text">
                  <textarea
                    id="custom-intro"
                    className="brutal-input w-full p-2 h-48"
                    placeholder="Enter custom introduction text..."
                    value={formData.customIntro}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              )}

              <div className="flex justify-between">
                <button className="brutal-btn px-4 py-2 font-bold" onClick={() => handleTabChange("agency")}>
                  ← BACK
                </button>
                <button className="brutal-btn px-4 py-2 font-bold" onClick={() => handleTabChange("authorization")}>
                  NEXT →
                </button>
              </div>
            </div>
          )}

          {/* For brevity, I'm not including all the other sections */}
          {/* In a real implementation, you would add similar sections for authorization, guidelines, scope, reporting, and review */}

          {/* Review Section */}
          {activeTab === "review" && (
            <div id="review-section" className="section-content">
              <h2 className="text-2xl font-black mb-4 border-b-4 border-black pb-2">REVIEW & GENERATE</h2>

              <div className="brutal-panel p-4 mb-4 border-2 border-black">
                <h3 className="text-xl font-bold mb-2">VULNERABILITY DISCLOSURE POLICY</h3>
                <p id="preview-agency-name" className="font-bold mb-2">
                  {formData.agencyName || "[AGENCY NAME]"}
                </p>
                <p id="preview-policy-date" className="mb-4">
                  {formData.policyDate || "[DATE]"}
                </p>

                <h4 className="font-bold border-b-2 border-black mb-2">INTRODUCTION</h4>
                <div id="preview-intro" className="mb-4">
                  <p>
                    {formData.useDefaultIntro
                      ? `${formData.agencyName || "[AGENCY NAME]"} is committed to ensuring the security of systems by protecting information. This policy describes what systems and types of research are covered under this policy, how to send vulnerability reports, and how long we ask researchers to wait before public disclosure.`
                      : formData.customIntro || "[CUSTOM INTRODUCTION TEXT]"}
                  </p>
                </div>

                {/* Preview other sections */}
              </div>

              <div className="flex justify-between">
                <button className="brutal-btn px-4 py-2 font-bold" onClick={() => handleTabChange("reporting")}>
                  ← BACK
                </button>
                <button className="brutal-btn px-4 py-2 font-bold bg-purple-600 text-white" onClick={generatePolicy}>
                  GENERATE POLICY
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>
        {`
        .brutal-btn {
          border: 2px solid black;
          background: white;
          color: black;
          transition: all 0.3s ease;
        }
        
        .brutal-btn:hover {
          background: black;
          color: white;
        }
        
        .brutal-input {
          border: 2px solid black;
          background: white;
          transition: border 0.3s ease;
        }
        
        .brutal-input:focus {
          outline: none;
          border-color: #805ad5;
        }
        
        .section-content {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
}
