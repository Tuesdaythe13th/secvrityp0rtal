import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SecurityToolkitProps {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const securityFeatures = [
  {
    title: "Network Security Simulator",
    description: "Interactive sandbox for testing network security defenses",
    link: "/simulator",
  },
  {
    title: "Vulnerability Database",
    description: "Searchable database of known vulnerabilities",
    link: "/vulnerability-database",
  },
  {
    title: "Security Audit Tool",
    description: "Automated security auditing for web applications",
    link: "/security-audit",
  },
  {
    title: "Market Fear & Greed Index",
    description: "Real-time cryptocurrency market sentiment analysis",
    link: "/fear-greed-index",
  },
  {
    title: "VDP Generator",
    description: "Vulnerability Disclosure Policy generator for organizations",
    link: "/vdp-generator",
  },
  {
    title: "Cloud Security Table",
    description: "Periodic table of cloud security controls and threats",
    link: "/cloud-security-table",
  },
  {
    title: "Synthetic Data Audit",
    description: "Quality assessment tool for AI training data",
    link: "/synthetic-data-audit",
  },
  {
    title: "Critical AI Security Guide",
    description: "Comprehensive AI security guidelines and best practices",
    link: "/critical-ai-security",
  },
  {
    title: "Insider Threat Taxonomy",
    description: "Framework for categorizing and addressing insider threats",
    link: "/insider-taxonomy",
  },
];

const SecurityToolkit = ({ isExpanded, setIsExpanded }: SecurityToolkitProps) => {
  return (
    <section className="container mx-auto my-6">
      <Collapsible
        open={isExpanded}
        onOpenChange={setIsExpanded}
        className="border-4 border-black bg-white"
      >
        <CollapsibleTrigger className="flex justify-between items-center w-full p-4 font-bold text-lg bg-black text-white hover:bg-white hover:text-black transition-colors duration-300 border-2 border-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-left"
          >
            NEURAL_SECURITY::TOOLKIT
          </motion.div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <ChevronUp className="h-6 w-6" />
            ) : (
              <ChevronDown className="h-6 w-6" />
            )}
          </motion.div>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <Link to="/critical-ai-security" className="block bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
              <div className="font-bold">CRITICAL AI SECURITY</div>
            </Link>
            
            <Link to="/agentic-ai-101" className="block bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
              <div className="font-bold">AI ATTACK TAXONOMY</div>
            </Link>
            
            <Link to="/cloud-security-table" className="block bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
              <div className="font-bold">CLOUD SECURITY TABLE</div>
            </Link>
            
            <Link to="/vdp-generator" className="block bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
              <div className="font-bold">VDP GENERATOR</div>
            </Link>
            
            <div className="bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
              <div className="font-bold">INSIDER THREAT</div>
            </div>
            
            <div className="bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
              <div className="font-bold">CLOUD SECURITY</div>
            </div>
            
            <Link to="/security-audit" className="block bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
              <div className="font-bold">SECURITY AUDIT</div>
            </Link>
            
            <div className="bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
              <div className="font-bold">AGENT ARCHITECTURE</div>
            </div>
            
            <Link to="/agentic-ai-101" className="block bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
              <div className="font-bold">AGENTIC 101</div>
            </Link>
            
            <div className="bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
              <div className="font-bold">BENCHMARK DIRECTORY</div>
            </div>
            
            <Link to="/vulnerability-database" className="block bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
              <div className="font-bold">VULNERABILITY DATABASE</div>
            </Link>
            
            <div className="bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
              <div className="font-bold">SECURE CONFERENCE</div>
            </div>
            
            <Link to="/fear-greed-index" className="block bg-black text-white p-4 text-center border-2 border-black hover:bg-white hover:text-black transition-colors duration-300">
              <div className="font-bold">FEAR AND GREED INDEX</div>
            </Link>
            
            <Link to="/synthetic-data-audit" className="block bg-white text-black p-4 text-center border-2 border-black hover:bg-black hover:text-white transition-colors duration-300">
              <div className="font-bold">SYNTHETIC TXT DATA AUDIT</div>
            </Link>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};

export default SecurityToolkit;
