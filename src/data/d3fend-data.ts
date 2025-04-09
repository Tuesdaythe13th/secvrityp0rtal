
// D3FEND data structure
export const d3fendData = {
  tactics: [
    {
      id: "detect",
      name: "Detect",
      description: "Defensive maneuvers to identify adversary presence or activity",
      color: "#ef4444",
      techniques: [
        {
          id: "process-analysis",
          name: "Process Analysis",
          description: "Techniques for analyzing processes and their behavior",
          children: [
            {
              id: "process-code-segment-verification",
              name: "Process Code Segment Verification",
              description: "Verifies code segments within a running process match expected values",
              artifacts: ["process-memory", "code-segment", "memory-region"],
              sourceDocs: 12,
              details: `<span class="brutal-code">VERIFY_EXECUTABLE_INTEGRITY()</span> - This technique verifies the portions of memory assigned to a running process that contain machine code for execution. These code segments are usually loaded from disk when the application is executed to launch the process. Monitoring deviations can detect process hollowing and other code injection attacks.`,
            },
            {
              id: "process-lineage-analysis",
              name: "Process Lineage Analysis",
              description: "Examines relationships between processes and their parent/child processes",
              artifacts: ["process-creation-log", "process-tree"],
              sourceDocs: 8,
              details: `<span class="brutal-code">ANALYZE_PROCESS_TREE()</span> - Analyzes the process creation chain to identify abnormal parent-child relationships that may indicate malicious activity. Common attack patterns include svchost spawning cmd.exe or powershell from unexpected parent processes.`,
            },
          ],
        },
        {
          id: "network-traffic-analysis",
          name: "Network Traffic Analysis",
          description: "Techniques for analyzing network communications",
          children: [
            {
              id: "connection-attempt-analysis",
              name: "Connection Attempt Analysis",
              description: "Analyzes network connection attempts for suspicious patterns",
              artifacts: ["network-flow", "connection-log"],
              sourceDocs: 15,
              details: `<span class="brutal-code">MONITOR_NETWORK_CONNECTIONS()</span> - Examines network connection attempts to identify potentially malicious communication patterns or destinations. Techniques include detecting beaconing behavior, anomalous port usage, and connections to known malicious infrastructure.`,
            },
            {
              id: "protocol-metadata-anomaly-detection",
              name: "Protocol Metadata Anomaly Detection",
              description: "Identifies anomalies in network protocol metadata",
              artifacts: ["protocol-header", "network-packet"],
              sourceDocs: 9,
              details: `<span class="brutal-code">ANALYZE_PROTOCOL_HEADERS()</span> - Analyzes network protocol headers and metadata to detect deviations from expected behavior or protocol specifications. Can identify custom protocol implementations, tunneling attempts, and protocol-level evasion techniques.`,
            },
          ],
        },
      ],
    },
    {
      id: "harden",
      name: "Harden",
      description: "Defensive maneuvers to strengthen systems against attack",
      color: "#22c55e",
      techniques: [
        {
          id: "credential-hardening",
          name: "Credential Hardening",
          description: "Techniques for strengthening authentication credentials",
          children: [
            {
              id: "multi-factor-authentication",
              name: "Multi-factor Authentication",
              description: "Requires multiple forms of authentication",
              artifacts: ["authentication-log", "credential-store"],
              sourceDocs: 20,
              details: `<span class="brutal-code">ENFORCE_MFA()</span> - Implements authentication that requires multiple forms of verification, typically something you know (password), something you have (token or device), and/or something you are (biometric). Significantly reduces risk of credential compromise leading to account takeover.`,
            },
          ],
        },
        {
          id: "message-hardening",
          name: "Message Hardening",
          description: "Techniques for securing messages and communications",
          children: [
            {
              id: "message-authentication",
              name: "Message Authentication",
              description: "Verifies message integrity and authenticity",
              artifacts: ["message-digest", "digital-signature"],
              sourceDocs: 14,
              details: `<span class="brutal-code">VERIFY_MESSAGE_SIGNATURE()</span> - Implements mechanisms to verify that messages have not been altered and confirms the identity of the sender. Common implementations include HMAC for integrity and digital signatures using RSA or ECDSA for authenticity.`,
            },
          ],
        },
      ],
    },
    {
      id: "deceive",
      name: "Deceive",
      description: "Defensive maneuvers to mislead or confuse adversaries",
      color: "#3b82f6",
      techniques: [
        {
          id: "decoy-environment",
          name: "Decoy Environment",
          description: "Techniques for creating fake environments to distract attackers",
          children: [
            {
              id: "decoy-system",
              name: "Decoy System",
              description: "Deploys fake systems to attract attackers",
              artifacts: ["system-image", "virtualization-config"],
              sourceDocs: 10,
              details: `<span class="brutal-code">DEPLOY_HONEYPOT()</span> - Creates false targets designed to attract attackers away from production systems and to observe their techniques. Advanced implementations include interactive systems with deceptive data and realistic network services to prolong attacker engagement.`,
            },
          ],
        },
      ],
    },
    {
      id: "evict",
      name: "Evict",
      description: "Defensive maneuvers to remove adversary presence from systems",
      color: "#f97316",
      techniques: [
        {
          id: "process-termination",
          name: "Process Termination",
          description: "Techniques for terminating malicious processes",
          children: [
            {
              id: "process-forced-termination",
              name: "Process Forced Termination",
              description: "Forcibly ends process execution",
              artifacts: ["process-handle", "system-call"],
              sourceDocs: 7,
              details: `<span class="brutal-code">KILL_PROCESS()</span> - Terminates suspected malicious processes to stop their execution and limit damage. Often implemented as a response action following detection of malicious behavior. May include additional measures to prevent process restart or persistence mechanisms.`,
            },
          ],
        },
      ],
    },
    {
      id: "isolate",
      name: "Isolate",
      description: "Defensive maneuvers to contain adversary activity",
      color: "#a855f7",
      techniques: [
        {
          id: "execution-isolation",
          name: "Execution Isolation",
          description: "Techniques for isolating code execution",
          children: [
            {
              id: "virtualization-based-security",
              name: "Virtualization-based Security",
              description: "Uses virtualization to isolate execution environments",
              artifacts: ["hypervisor-config", "virtual-machine"],
              sourceDocs: 18,
              details: `<span class="brutal-code">ISOLATE_EXECUTION()</span> - Leverages virtualization technology to create isolated execution environments for security-critical operations. Provides hardware-enforced memory separation between environments. Used for sensitive operations like credential handling and secure browsing.`,
            },
          ],
        },
      ],
    },
  ],
  artifacts: [
    {
      id: "process-memory",
      name: "Process Memory",
      description: "Memory allocated to a running process, including code, data, heap, and stack segments",
      parent: "memory-artifact",
      childArtifacts: ["code-segment", "heap", "stack"],
    },
    {
      id: "code-segment",
      name: "Code Segment",
      description:
        "Portion of process memory containing executable machine code, typically mapped from the binary on disk",
      parent: "process-memory",
    },
    {
      id: "memory-region",
      name: "Memory Region",
      description: "Defined area of system memory with specific permissions (read, write, execute) and purpose",
      parent: "memory-artifact",
    },
    {
      id: "process-creation-log",
      name: "Process Creation Log",
      description: "Event log entries recording process creation events including parent/child relationships",
      parent: "log-file",
    },
    {
      id: "process-tree",
      name: "Process Tree",
      description: "Hierarchical representation of process parent-child relationships showing execution lineage",
      parent: "system-artifact",
    },
    {
      id: "network-flow",
      name: "Network Flow",
      description: "Record of network communication between endpoints including protocol, ports, and bytes transferred",
      parent: "network-artifact",
    },
    {
      id: "connection-log",
      name: "Connection Log",
      description: "Log entries recording network connection attempts including source, destination, and result",
      parent: "log-file",
    },
    {
      id: "protocol-header",
      name: "Protocol Header",
      description: "Metadata portion of a network packet specific to a protocol (e.g., TCP flags, HTTP request line)",
      parent: "network-packet",
    },
    {
      id: "network-packet",
      name: "Network Packet",
      description: "Formatted unit of data carried by a network including headers and payload",
      parent: "network-artifact",
    },
    {
      id: "authentication-log",
      name: "Authentication Log",
      description: "Log entries recording authentication attempts including success/failure and user context",
      parent: "log-file",
    },
    {
      id: "credential-store",
      name: "Credential Store",
      description: "Secure storage location for authentication credentials (e.g., Windows LSA, /etc/shadow)",
      parent: "system-artifact",
    },
    {
      id: "message-digest",
      name: "Message Digest",
      description: "Cryptographic hash of a message used to verify integrity (e.g., SHA-256 hash)",
      parent: "cryptographic-artifact",
    },
    {
      id: "digital-signature",
      name: "Digital Signature",
      description: "Cryptographic mechanism for verifying message authenticity (e.g., RSA signature)",
      parent: "cryptographic-artifact",
    },
    {
      id: "system-image",
      name: "System Image",
      description: "Snapshot of a system state including memory and disk contents at a point in time",
      parent: "system-artifact",
    },
    {
      id: "virtualization-config",
      name: "Virtualization Configuration",
      description: "Configuration settings defining virtual environments (e.g., VM settings, container specs)",
      parent: "configuration-file",
    },
    {
      id: "process-handle",
      name: "Process Handle",
      description: "Kernel object reference to a running process allowing interaction via system calls",
      parent: "system-artifact",
    },
    {
      id: "system-call",
      name: "System Call",
      description: "Interface between a user process and the operating system kernel for privileged operations",
      parent: "system-artifact",
    },
    {
      id: "hypervisor-config",
      name: "Hypervisor Configuration",
      description: "Settings defining hypervisor behavior including isolation policies and resource allocation",
      parent: "configuration-file",
    },
    {
      id: "virtual-machine",
      name: "Virtual Machine",
      description: "Software-emulated computer system with defined CPU, memory, and device resources",
      parent: "system-artifact",
    },
  ],
}
