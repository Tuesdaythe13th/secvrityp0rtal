import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const glitchVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: [0, 1, 0.5, 1], 
    skew: [0, -5, 5, 0], 
    scale: [1, 1.02, 0.98, 1],
    transition: { 
      duration: 0.5, 
      repeat: Infinity, 
      repeatType: "mirror" as const
    }
  }
};

const glitchTextVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: [0, 1, 0.8, 1],
    x: [0, -2, 2, 0],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: "mirror" as const
    }
  }
};

const scanlineVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 0.2,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "mirror" as const
    }
  }
};

export default function Landing() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { toast } = useToast();

  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        toast({
          title: "Back Online",
          description: "Connection restored.",
        });
      } else {
        toast({
          title: "Offline",
          description: "No internet connection.",
          variant: "destructive",
        });
      }
    };

    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, [toast]);

  return (
    <div className="bg-white text-black">
      <div className="container mx-auto p-4 max-w-6xl">
        <motion.header
          className="brutal-border bg-white mb-8 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border-b-2 border-black pb-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-black uppercase monospace">
              CYBERPUNK RED TEAM SIM
            </h1>
            <p className="text-gray-700 monospace text-sm mt-2">
              Brutalist Red Teaming Platform | Status:{" "}
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-black text-white px-3 py-1">
              <span className="monospace text-sm font-bold">
                AI-POWERED
              </span>
            </div>
            <div className="flex items-center gap-2 bg-black text-white px-3 py-1">
              <span className="monospace text-sm font-bold">
                RED TEAM FOCUS
              </span>
            </div>
            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1">
              <span className="monospace text-sm font-bold">
                UNDER DEVELOPMENT
              </span>
            </div>
          </div>
        </motion.header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 monospace">
            Core Simulators
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/simulator">
              <motion.div
                className="brutal-border bg-white p-4 hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-xl font-bold mb-2 monospace">
                  Main Simulator
                </h3>
                <p className="text-gray-700 monospace">
                  Core red teaming simulation environment.
                </p>
              </motion.div>
            </Link>

            <Link to="/neon-crypto-heist">
              <motion.div
                className="brutal-border bg-white p-4 hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-xl font-bold mb-2 monospace">
                  Neon Crypto-Heist
                </h3>
                <p className="text-gray-700 monospace">
                  Scenario-based crypto hacking simulation.
                </p>
              </motion.div>
            </Link>

            <Link to="/prompt-injection-dojo">
              <motion.div
                className="brutal-border bg-white p-4 hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-xl font-bold mb-2 monospace">
                  Prompt Injection Dojo
                </h3>
                <p className="text-gray-700 monospace">
                  Test and refine your prompt injection skills.
                </p>
              </motion.div>
            </Link>

            <Link to="/agentic-ai-101">
              <motion.div
                className="brutal-border bg-white p-4 hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-xl font-bold mb-2 monospace">
                  Agentic AI 101
                </h3>
                <p className="text-gray-700 monospace">
                  Learn about agentic AI and how to defend against it.
                </p>
              </motion.div>
            </Link>

            <Link to="/fear-greed-index">
              <motion.div
                className="brutal-border bg-white p-4 hover:bg-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-xl font-bold mb-2 monospace">
                  Crypto Fear/Greed Index
                </h3>
                <p className="text-gray-700 monospace">
                  Real-time market sentiment analysis.
                </p>
              </motion.div>
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 monospace">
            AI-Enhanced Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="brutal-border bg-black text-white p-4"
              variants={glitchVariants}
              initial="initial"
              animate="animate"
            >
              <h3 className="text-xl font-bold mb-2 monospace">
                <motion.span
                  className="inline-block"
                  variants={glitchTextVariants}
                >
                  AI-Powered Threat Intel
                </motion.span>
              </h3>
              <p className="text-gray-300 monospace">
                Real-time threat intelligence reports generated by AI.
              </p>
              <motion.div
                className="scanline"
                variants={scanlineVariants}
                initial="initial"
                animate="animate"
              />
            </motion.div>

            <motion.div
              className="brutal-border bg-black text-white p-4"
              variants={glitchVariants}
              initial="initial"
              animate="animate"
            >
              <h3 className="text-xl font-bold mb-2 monospace">
                <motion.span
                  className="inline-block"
                  variants={glitchTextVariants}
                >
                  Automated Exploit Analysis
                </motion.span>
              </h3>
              <p className="text-gray-300 monospace">
                AI analyzes exploits and provides actionable insights.
              </p>
              <motion.div
                className="scanline"
                variants={scanlineVariants}
                initial="initial"
                animate="animate"
              />
            </motion.div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 monospace">
            Community & Support
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <p className="text-gray-700 monospace mb-4">
                Join our community to collaborate, share insights, and get
                support.
              </p>
              <Button asChild>
                <a
                  href="https://github.com/orgs/lovable-hq/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faGithub} />
                  GitHub Discussions
                </a>
              </Button>
            </div>

            <div className="md:w-1/2">
              <p className="text-gray-700 monospace mb-4">
                Report issues, suggest features, and contribute to the
                platform.
              </p>
              <Button asChild>
                <a
                  href="https://github.com/lovable-hq/cyberpunk-red-team-sim/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faGithub} />
                  GitHub Issues
                </a>
              </Button>
            </div>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm monospace">
          <p>
            &copy; 2024 Lovable. All rights reserved. | Brutalist Cyberpunk
            Red Teaming Platform
          </p>
        </footer>
      </div>
    </div>
  );
}
