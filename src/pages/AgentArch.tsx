
import React, { useRef, useEffect, useState } from "react";
import "../styles/AgentArch.css";

interface Component {
  id: string;
  name: string;
}
interface Flow {
  id: string;
  source: string;
  target: string;
  type: string;
  sourceName: string;
  targetName: string;
}
interface Threat {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  mitigation: string;
}

const CONNECTION_LABELS: { [key: string]: string } = {
  unencrypted: "Unencrypted",
  "api-key": "API Key",
  oauth: "OAuth",
  jwt: "JWT",
  none: "No Auth",
};
const CONNECTION_COLORS: { [key: string]: string } = {
  unencrypted: "text-red-600",
  "api-key": "text-yellow-600",
  oauth: "text-blue-600",
  jwt: "text-green-600",
  none: "text-red-600",
};

type Tab = "visualization" | "threat" | "mitigation";

const defaultModel = {
  name: "",
  version: "",
  description: "",
  agentType: "",
  components: [] as Component[],
  flows: [] as Flow[],
  threats: [] as Threat[],
};

const AgentArch: React.FC = () => {
  const [model, setModel] = useState({ ...defaultModel });
  const [customComponentName, setCustomComponentName] = useState("");
  const [srcComponent, setSrcComponent] = useState("");
  const [tgtComponent, setTgtComponent] = useState("");
  const [connType, setConnType] = useState("unencrypted");
  const [activeTab, setActiveTab] = useState<Tab>("visualization");

  // For preview (non state to avoid flickering for big objects)
  const [previewModel, setPreviewModel] = useState({ ...defaultModel });

  // Update preview model when main model changes
  useEffect(() => {
    setPreviewModel({ ...model });
  }, [model]);

  // Tabs logic
  function switchTab(tab: Tab) {
    setActiveTab(tab);
  }

  function addComponent(name: string) {
    const id = `component-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const component = { id, name };
    setModel((prev) => {
      const newComponents = [...prev.components, component];
      return { ...prev, components: newComponents };
    });
    setCustomComponentName("");
  }

  function removeComponent(id: string) {
    setModel((prev) => {
      const newComps = prev.components.filter((c) => c.id !== id);
      const newFlows = prev.flows.filter((f) => f.source !== id && f.target !== id);
      return { ...prev, components: newComps, flows: newFlows };
    });
  }

  function addFlow() {
    if (!srcComponent || !tgtComponent) return;
    const source = model.components.find((c) => c.id === srcComponent);
    const target = model.components.find((c) => c.id === tgtComponent);
    if (!source || !target) return;
    const flow: Flow = {
      id: `flow-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      source: srcComponent,
      target: tgtComponent,
      type: connType,
      sourceName: source.name,
      targetName: target.name,
    };
    setModel((prev) => ({ ...prev, flows: [...prev.flows, flow] }));
  }

  function removeFlow(id: string) {
    setModel((prev) => ({
      ...prev,
      flows: prev.flows.filter((f) => f.id !== id),
    }));
  }

  function resetModel() {
    if (window.confirm("Are you sure you want to start a new model?")) {
      setModel({ ...defaultModel });
    }
  }

  // Scan for threats
  function scanForThreats() {
    const allThreats: Threat[] = [];

    // Unencrypted & no auth connections
    model.flows.forEach((f) => {
      if (f.type === "unencrypted") {
        allThreats.push({
          id: `threat-${Date.now()}`,
          severity: "high",
          title: `Unencrypted data flow: ${f.sourceName} → ${f.targetName}`,
          description: `Data transmitted between ${f.sourceName} and ${f.targetName} is not encrypted.`,
          mitigation: `Implement TLS/SSL encryption for all communications between ${f.sourceName} and ${f.targetName}.`,
        });
      }
      if (f.type === "none") {
        allThreats.push({
          id: `threat-${Date.now()}`,
          severity: "high",
          title: `No authentication: ${f.sourceName} → ${f.targetName}`,
          description: `The connection between ${f.sourceName} and ${f.targetName} has no authentication.`,
          mitigation: `Implement authentication (API keys, OAuth, JWT, etc.) for this connection.`,
        });
      }
    });
    // Database with no auth
    model.components
      .filter((c) => c.name.toLowerCase().includes("database") || c.name.toLowerCase().includes("db"))
      .forEach((db) => {
        const hasNoAuth = model.flows.some(
          (f) => (f.target === db.id || f.source === db.id) && f.type === "none"
        );
        if (hasNoAuth) {
          allThreats.push({
            id: `threat-${Date.now()}`,
            severity: "critical",
            title: `Database authentication missing: ${db.name}`,
            description: `Database "${db.name}" has no authentication on some connections.`,
            mitigation: `Implement strong authentication for the database "${db.name}".`,
          });
        }
      });
    // API key exposure
    const usesApiKey = model.flows.some((f) => f.type === "api-key");
    if (usesApiKey) {
      allThreats.push({
        id: `threat-${Date.now()}`,
        severity: "medium",
        title: "API key exposure risk",
        description: "API keys used for authentication without proper rotation policy or storage.",
        mitigation: "Implement key rotation, use secret management, restrict permissions.",
      });
    }
    // Missing rate limiting
    const inputHandlers = model.components.filter(
      (c) =>
        c.name.toLowerCase().includes("input") || c.name.toLowerCase().includes("handler")
    );
    if (inputHandlers.length > 0) {
      allThreats.push({
        id: `threat-${Date.now()}`,
        severity: "low",
        title: "Missing rate limiting",
        description: "Input handlers may be vulnerable to denial of service without rate limiting.",
        mitigation: "Implement rate limiting on all handlers.",
      });
    }

    setModel((prev) => ({
      ...prev,
      threats: allThreats,
    }));
    setActiveTab("threat");
  }

  // Export and load
  function exportModel() {
    const modelData = JSON.stringify(model, null, 2);
    const blob = new Blob([modelData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brutal-agent-model-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function loadModel() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const data = JSON.parse(event.target.result);
          if (!data.components || !data.flows) throw new Error("Invalid model file format");
          setModel({
            name: data.name || "",
            version: data.version || "",
            description: data.description || "",
            agentType: data.agentType || "",
            components: data.components || [],
            flows: data.flows || [],
            threats: data.threats || [],
          });
        } catch (err: any) {
          alert("Error loading model: " + err.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  // Visualisation graph (simple)
  function visualGraph() {
    if (model.components.length === 0)
      return (
        <div className="text-gray-500">
          Add components and connections to visualize your architecture
        </div>
      );
    return (
      <div className="flex flex-wrap justify-center items-start">
        <div className="inline-block m-4">
          <div className="brutal-border-thin p-4 bg-red-100 text-center component-node">
            <div className="font-bold">User</div>
          </div>
          <div className="h-8 w-1 bg-black mx-auto connection-line"></div>
        </div>
        {model.components.map((component, index) => {
          const incoming = model.flows.filter((f) => f.target === component.id);
          const issue = incoming.some((f) => f.type === "unencrypted" || f.type === "none");
          return (
            <div key={component.id} className="inline-block m-4">
              <div
                className={`brutal-border-thin p-4 ${issue ? "bg-red-50" : "bg-white"
                  } text-center component-node`}
              >
                <div className="font-bold">{component.name}</div>
                {incoming[0] ? (
                  <div className={`text-xs ${CONNECTION_COLORS[incoming[0].type] || ""}`}>
                    {CONNECTION_LABELS[incoming[0].type] || incoming[0].type}
                  </div>
                ) : null}
              </div>
              {index < model.components.length - 1 ? (
                <div className="h-8 w-1 bg-black mx-auto connection-line"></div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  // Threat display
  function threatDisplay() {
    const ts = model.threats;
    if (ts.length === 0)
      return (
        <div className="p-4 bg-gray-100">
          <p>No threats detected. Your architecture appears secure.</p>
        </div>
      );
    const group = (sev: string) => ts.filter((t) => t.severity === sev);
    const threatBlock = (items: Threat[], label: string, color: string) =>
      items.length ? (
        <div className="mb-6" key={label}>
          <h4 className={`font-bold text-lg mb-2 ${color}`}>{label}</h4>
          <div className="space-y-3">
            {items.map((t) => (
              <div className={`p-4 vulnerability-${t.severity}`} key={t.id}>
                <div className="font-bold mb-1">{t.title}</div>
                <p className="text-sm mb-2">{t.description}</p>
                <p className="text-xs font-medium">
                  MITIGATION: {t.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null;
    return (
      <>
        {threatBlock(group("critical"), "CRITICAL THREATS", "text-red-600")}
        {threatBlock(group("high"), "HIGH SEVERITY", "text-red-600")}
        {threatBlock(group("medium"), "MEDIUM SEVERITY", "text-yellow-600")}
        {threatBlock(group("low"), "LOW SEVERITY", "text-green-600")}
      </>
    );
  }

  // Mitigation display
  function mitigationDisplay() {
    if (model.threats.length === 0)
      return (
        <div className="p-4 bg-gray-100">
          <p>No mitigation needed. Your architecture appears secure.</p>
        </div>
      );
    // Group mitigations by component (simple)
    const mitigations: { [comp: string]: Set<string> } = {};
    model.threats.forEach((threat) => {
      // Use component from description/title if present
      const matches = threat.title.match(/:\s(.*?)$/);
      let comp = matches?.[1] || "General";
      if (!mitigations[comp]) mitigations[comp] = new Set();
      mitigations[comp].add(threat.mitigation);
    });
    return (
      <>
        {Object.entries(mitigations).map(([comp, mitigs]) => (
          <div className="mb-6" key={comp}>
            <h4 className="font-bold text-lg mb-2">{comp}</h4>
            <ul className="list-disc pl-5 space-y-2">
              {[...mitigs].map((mit, i) => (
                <li key={i}>{mit}</li>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
  }

  // Model card preview
  function modelCardPreview() {
    return (
      <div className="space-y-4" id="modelCardPreview">
        <div>
          <h4 className="font-bold text-lg">{previewModel.name || "My Agentic AI"}</h4>
          <p className="text-sm text-gray-600">
            {previewModel.version
              ? `Version ${previewModel.version}`
              : "Version 1.0.0"}
          </p>
        </div>
        <p className="text-sm">
          {previewModel.description || "No description provided."}
        </p>
        <div>
          <h5 className="font-bold">Architecture Type:</h5>
          <p>{previewModel.agentType || "Not specified"}</p>
        </div>
        <div>
          <h5 className="font-bold">Components:</h5>
          <ul className="list-disc pl-5">
            {previewModel.components.length
              ? previewModel.components.map((c) => <li key={c.id}>{c.name}</li>)
              : <li>No components added</li>}
          </ul>
        </div>
        <div>
          <h5 className="font-bold">Data Flows:</h5>
          <ul className="list-disc pl-5">
            {previewModel.flows.length
              ? previewModel.flows.map((f) => (
                  <li key={f.id}>
                    {f.sourceName} → {f.targetName} (
                    {CONNECTION_LABELS[f.type] ?? f.type})
                  </li>
                ))
              : <li>No data flows defined</li>}
          </ul>
        </div>
      </div>
    );
  }

  // On mount, apply font family only for this page
  useEffect(() => {
    document.body.classList.add("agent-arch");
    return () => {
      document.body.classList.remove("agent-arch");
    };
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold">
              AGENT<span className="text-red-600">ARCH</span>
            </h1>
            <button
              className="brutal-btn px-6 py-2 font-medium"
              onClick={exportModel}
            >
              EXPORT
            </button>
          </div>
          <div className="brutal-border bg-white p-6">
            <h2 className="text-2xl font-bold mb-4">
              AGENTIC AI MODEL CARD CREATOR
            </h2>
            <p className="mb-4">
              Map your agentic architecture and analyze for potential vulnerabilities.
            </p>
            <div className="flex space-x-4">
              <button className="brutal-btn px-4 py-1" onClick={resetModel}>
                New Model
              </button>
              <button className="brutal-btn px-4 py-1" onClick={loadModel}>
                Load Model
              </button>
              <button
                className="brutal-btn-danger px-4 py-1"
                onClick={scanForThreats}
              >
                Scan for Threats
              </button>
            </div>
          </div>
        </header>
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <div className="lg:w-1/3">
            <div className="brutal-border bg-white p-6 mb-6 slide-in">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-black text-white px-2 mr-2">1</span>
                MODEL METADATA
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Model Name</label>
                  <input
                    type="text"
                    className="w-full brutal-border-thin p-2"
                    placeholder="My Agentic AI"
                    value={model.name}
                    onChange={(e) =>
                      setModel((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Version</label>
                  <input
                    type="text"
                    className="w-full brutal-border-thin p-2"
                    placeholder="1.0.0"
                    value={model.version}
                    onChange={(e) =>
                      setModel((prev) => ({ ...prev, version: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Description</label>
                  <textarea
                    className="w-full brutal-border-thin p-2 h-24"
                    placeholder="Describe your agent's purpose..."
                    value={model.description}
                    onChange={(e) =>
                      setModel((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="brutal-border bg-white p-6 mb-6 slide-in" style={{ animationDelay: "0.1s" }}>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-black text-white px-2 mr-2">2</span>
                ARCHITECTURE COMPONENTS
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">
                    Primary Agent Type
                  </label>
                  <select
                    className="w-full brutal-border-thin p-2"
                    value={model.agentType}
                    onChange={(e) =>
                      setModel((prev) => ({
                        ...prev,
                        agentType: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select type</option>
                    <option>Autonomous Agent</option>
                    <option>Assistive Agent</option>
                    <option>Multi-Agent System</option>
                    <option>Hybrid Architecture</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-1">
                    Add Components
                  </label>
                  <div className="flex space-x-2 mb-2">
                    <button className="brutal-btn px-3 py-1 text-sm" type="button" onClick={() => addComponent("API Gateway")}>
                      API
                    </button>
                    <button className="brutal-btn px-3 py-1 text-sm" type="button" onClick={() => addComponent("Database")}>
                      Database
                    </button>
                    <button className="brutal-btn px-3 py-1 text-sm" type="button" onClick={() => addComponent("LLM Service")}>
                      LLM
                    </button>
                    <button className="brutal-btn px-3 py-1 text-sm" type="button" onClick={() => addComponent("Tool")}>
                      Tool
                    </button>
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      className="w-full brutal-border-thin p-2 mb-2"
                      placeholder="Custom component name"
                      value={customComponentName}
                      onChange={(e) => setCustomComponentName(e.target.value)}
                    />
                    <button
                      className="brutal-btn w-full py-1 text-sm"
                      type="button"
                      onClick={() => {
                        if (customComponentName.trim()) addComponent(customComponentName.trim());
                      }}
                    >
                      Add Custom
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {model.components.length ? (
                    model.components.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between brutal-border-thin p-2 component-node"
                      >
                        <span>{c.name}</span>
                        <button
                          className="text-red-600 font-bold"
                          onClick={() => removeComponent(c.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">
                      No components added
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="brutal-border bg-white p-6 slide-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-black text-white px-2 mr-2">3</span>
                DATA FLOWS
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">
                    Add Connection
                  </label>
                  <div className="flex space-x-2">
                    <select
                      className="flex-1 brutal-border-thin p-2"
                      value={srcComponent}
                      onChange={(e) => setSrcComponent(e.target.value)}
                    >
                      <option value="">Select source</option>
                      {model.components.map((c) => (
                        <option value={c.id} key={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <span className="flex items-center">→</span>
                    <select
                      className="flex-1 brutal-border-thin p-2"
                      value={tgtComponent}
                      onChange={(e) => setTgtComponent(e.target.value)}
                    >
                      <option value="">Select target</option>
                      {model.components.map((c) => (
                        <option value={c.id} key={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-2">
                    <select
                      className="w-full brutal-border-thin p-2 mb-2"
                      value={connType}
                      onChange={(e) => setConnType(e.target.value)}
                    >
                      <option value="unencrypted">Unencrypted</option>
                      <option value="api-key">API Key</option>
                      <option value="oauth">OAuth</option>
                      <option value="jwt">JWT</option>
                      <option value="none">No Auth</option>
                    </select>
                  </div>
                  <button
                    className="brutal-btn w-full py-1"
                    type="button"
                    onClick={addFlow}
                  >
                    Add Flow
                  </button>
                </div>
                <div className="space-y-2">
                  {model.flows.length ? (
                    model.flows.map((f) => (
                      <div className="brutal-border-thin p-2 flex justify-between items-center" key={f.id}>
                        <span>
                          {f.sourceName} → {f.targetName}
                        </span>
                        <span className={CONNECTION_COLORS[f.type] || ""}>
                          {CONNECTION_LABELS[f.type] || f.type}
                        </span>
                        <button
                          className="text-red-600 font-bold ml-2"
                          onClick={() => removeFlow(f.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm">
                      No data flows defined
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Right Panel */}
          <div className="lg:w-2/3">
            <div className="brutal-border bg-white p-6 mb-6 fade-in">
              <div className="flex border-b border-gray-200 mb-4">
                <button
                  className={`px-4 py-2 mr-2 ${activeTab === "visualization" ? "tab-active" : ""}`}
                  onClick={() => switchTab("visualization")}
                  type="button"
                >
                  Visualization
                </button>
                <button
                  className={`px-4 py-2 mr-2 ${activeTab === "threat" ? "tab-active" : ""}`}
                  onClick={() => switchTab("threat")}
                  type="button"
                >
                  Threat Analysis
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === "mitigation" ? "tab-active" : ""}`}
                  onClick={() => switchTab("mitigation")}
                  type="button"
                >
                  Mitigation
                </button>
              </div>
              <div className={activeTab === "visualization" ? "" : "hidden"}>
                <div className="brutal-border-thin p-8 min-h-96 flex items-center justify-center mb-6">
                  {visualGraph()}
                </div>
                <div className="text-right">
                  <button
                    className="brutal-btn-danger px-6 py-2 font-medium pulse"
                    onClick={scanForThreats}
                  >
                    RUN SECURITY SCAN
                  </button>
                </div>
              </div>
              <div className={activeTab === "threat" ? "" : "hidden"}>
                {threatDisplay()}
              </div>
              <div className={activeTab === "mitigation" ? "" : "hidden"}>
                {mitigationDisplay()}
              </div>
            </div>
            <div className="brutal-border bg-white p-6 fade-in" style={{ animationDelay: "0.3s" }}>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="bg-black text-white px-2 mr-2">C</span>
                MODEL CARD PREVIEW
              </h3>
              {modelCardPreview()}
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-black text-center text-sm">
          <p>BRUTAL AGENT - Agentic AI Security Analysis Tool</p>
          <p className="text-red-600">
            Handle with care. All findings should be manually verified.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AgentArch;
