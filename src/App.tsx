
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound";
import NeonCryptoHeist from "./pages/NeonCryptoHeist";
import PromptInjectionDojo from "./pages/PromptInjectionDojo";
import AgenticAI101 from "./pages/AgenticAI101";
import FearGreedIndex from "./pages/FearGreedIndex";
import VulnerabilityDatabase from "./pages/VulnerabilityDatabase";
import SecurityAudit from "./pages/SecurityAudit";
import SyntheticDataAudit from "./pages/SyntheticDataAudit";
import VDPGenerator from "./pages/VDPGenerator";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/simulator" element={<Index />} />
          <Route path="/neon-crypto-heist" element={<NeonCryptoHeist />} />
          <Route path="/prompt-injection-dojo" element={<PromptInjectionDojo />} />
          <Route path="/agentic-ai-101" element={<AgenticAI101 />} />
          <Route path="/fear-greed-index" element={<FearGreedIndex />} />
          <Route path="/vulnerability-database" element={<VulnerabilityDatabase />} />
          <Route path="/security-audit" element={<SecurityAudit />} />
          <Route path="/synthetic-data-audit" element={<SyntheticDataAudit />} />
          <Route path="/vdp-generator" element={<VDPGenerator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
