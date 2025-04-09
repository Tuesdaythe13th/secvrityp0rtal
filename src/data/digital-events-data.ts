
// Digital events data structure
export const digitalEventsData = {
  categories: [
    {
      id: "network",
      name: "NETWORK EVENTS",
      color: "#3b82f6",
      description: "Events related to network communication and data transfer",
    },
    {
      id: "system",
      name: "SYSTEM EVENTS",
      color: "#22c55e",
      description: "Events related to operating system activity",
    },
    {
      id: "application",
      name: "APPLICATION EVENTS",
      color: "#f97316",
      description: "Events related to application execution and behavior",
    },
    {
      id: "authentication",
      name: "AUTHENTICATION EVENTS",
      color: "#a855f7",
      description: "Events related to user authentication and access",
    },
  ],
  artifacts: [
    {
      id: "log-file",
      name: "Log File",
      description: "Text file containing chronological records of system or application events",
      parent: "file-artifact",
    },
    {
      id: "heap",
      name: "Heap",
      description: "Dynamically allocated memory used by a process for runtime data storage",
      parent: "process-memory",
    },
    {
      id: "stack",
      name: "Stack",
      description: "Memory structure storing local variables and return addresses for function calls",
      parent: "process-memory",
    },
    {
      id: "memory-artifact",
      name: "Memory Artifact",
      description: "Digital object stored in system RAM or virtual memory",
      parent: "digital-artifact",
    },
    {
      id: "network-artifact",
      name: "Network Artifact",
      description: "Digital object associated with network communications",
      parent: "digital-artifact",
    },
    {
      id: "system-artifact",
      name: "System Artifact",
      description: "Digital object created or managed by the operating system",
      parent: "digital-artifact",
    },
    {
      id: "cryptographic-artifact",
      name: "Cryptographic Artifact",
      description: "Digital object created through cryptographic operations",
      parent: "digital-artifact",
    },
    {
      id: "configuration-file",
      name: "Configuration File",
      description: "File containing settings and parameters for system or application operation",
      parent: "file-artifact",
    },
    {
      id: "file-artifact",
      name: "File Artifact",
      description: "Digital object stored as a discrete unit in a file system",
      parent: "digital-artifact",
    },
    {
      id: "digital-artifact",
      name: "Digital Artifact",
      description: "Base class for all digital objects that can be collected and analyzed",
      parent: null,
    },
  ],
}
