
import { Link } from "react-router-dom";
import "../../styles/AgentArch.css";

const AgentArchHomePreview = () => (
  <div className="max-w-4xl mx-auto mb-10">
    <div className="brutal-border bg-white p-8 mt-8 shadow-lg flex flex-col items-center slide-in" style={{ animationDelay: "0s" }}>
      <h2 className="text-3xl md:text-4xl font-bold mb-1 tracking-tight text-black font-[Space Grotesk,sans-serif]">
        AGENT<span className="text-red-600">ARCH</span>
      </h2>
      <p className="mb-4 text-black text-lg font-medium text-center">
        Visualize & Analyze Agentic AI Architectures.<br />Model Cards, Threat Scans, Mitigation.
      </p>
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-5">
        <div className="flex-1 min-w-[220px] text-left">
          <ul className="list-disc pl-5 mb-2 text-gray-700 text-base">
            <li><b>Interactive Model Cards:</b> Map agents and flows</li>
            <li><b>Threat Scanner:</b> Find security gaps automatically</li>
            <li><b>Mitigation Guidance:</b> View actionable recommendations</li>
            <li><b>Easy Export/Import:</b> Share and review models</li>
          </ul>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/agent-arch">
            <button className="brutal-btn px-6 py-3 font-bold text-lg mb-4 w-full">
              Open AGENT ARCH
            </button>
          </Link>
          <div className="w-full max-w-[300px]">
            <div className="brutal-border-thin p-3 bg-gray-50 mb-2">
              <span className="text-sm text-gray-600">Model Example:</span>
              <div className="mt-1 mb-1 text-black text-base font-bold">Chatbot LLM Agent</div>
              <ul className="list-disc pl-4 text-xs mb-1">
                <li>Components: API Gateway, Database, LLM Service</li>
                <li>Flows: API Gateway → LLM Service, LLM Service → Database</li>
                <li>Vulnerabilities: <span className="text-red-500">No Auth</span>, <span className="text-yellow-600">API Key Exposure</span></li>
              </ul>
              <span className="block text-xs text-green-700 mt-1">Mitigation: Enable auth & key rotation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AgentArchHomePreview;
