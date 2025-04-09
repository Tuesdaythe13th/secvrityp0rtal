
// Cloud Security Periodic Table Data
export const categories = [
  { id: "identity", name: "IDENTITY MANAGEMENT", color: "#F5A77E" },
  { id: "network", name: "NETWORK MANAGEMENT", color: "#E5EB7D" },
  { id: "host", name: "HOST SECURITY", color: "#7DE9BD" },
  { id: "active", name: "ACTIVE SCANNING", color: "#7DD5E9" },
  { id: "threat-detection", name: "THREAT DETECTION", color: "#F5E27D" },
  { id: "secret", name: "SECRET MANAGEMENT", color: "#D07DE9" },
  { id: "config", name: "CONFIGURATION SCANNING", color: "#9C7DE9" },
  { id: "data", name: "DATA MANAGEMENT", color: "#7DE9A6" },
  { id: "threat-prevention", name: "THREAT PREVENTION", color: "#E97D9C" },
  { id: "cloud-products", name: "CLOUD SECURITY PRODUCTS", color: "#D9D9D9" },
];

export const elements = [
  // Identity Management
  {
    id: "iam",
    symbol: "IAM",
    name: "Identity and Access Management",
    category: "identity",
    description: "Controls user and machine access to resources",
  },
  {
    id: "sso",
    symbol: "SSO",
    name: "Single Sign-On",
    category: "identity",
    description: "Allows users to access multiple systems with one login",
  },
  {
    id: "mfa",
    symbol: "MFA",
    name: "Multi-Factor Authentication",
    category: "identity",
    description: "Adds additional verification methods for access",
  },
  {
    id: "permission-boundary",
    symbol: "Boundary",
    name: "Permission Boundary",
    category: "identity",
    description: "Defines maximum permissions an entity can have",
  },
  {
    id: "password-policies",
    symbol: "Policies",
    name: "Password Policies",
    category: "identity",
    description: "Set rules for password complexity and rotation",
  },
  {
    id: "namespacing",
    symbol: "Namespacing",
    name: "Namespacing",
    category: "identity",
    description: "Isolates environments to avoid cross-environment leakage",
  },
  {
    id: "rbac",
    symbol: "RBAC",
    name: "Role-Based Access Control",
    category: "identity",
    description: "Assigns permissions based on roles",
  },

  // Network Management
  {
    id: "load-balancer",
    symbol: "Balancer",
    name: "Load Balancer",
    category: "network",
    description: "Distributes requests or network traffic to multiple servers",
  },
  {
    id: "network-firewall",
    symbol: "Firewall",
    name: "Network Firewall",
    category: "network",
    description: "Monitors and controls network traffic between subnets",
  },
  {
    id: "api-gateway",
    symbol: "Gateway",
    name: "API Gateway",
    category: "network",
    description: "Manages API requests and routes them to correct services",
  },
  {
    id: "proxy",
    symbol: "Proxy",
    name: "Proxy",
    category: "network",
    description: "Forwards client requests to resources between networks",
  },
  {
    id: "vpn",
    symbol: "VPN",
    name: "VPN",
    category: "network",
    description: "Secures connections over the internet to a private network",
  },
  {
    id: "bastion-host",
    symbol: "Bastion",
    name: "Bastion Host",
    category: "network",
    description: "A highly secured host used to gain access to production",
  },

  // Host Security
  {
    id: "virtualization",
    symbol: "Virt",
    name: "Virtualization",
    category: "host",
    description: "Creates isolated virtual environments for running instances",
  },
  {
    id: "containerization",
    symbol: "Contain",
    name: "Containerization",
    category: "host",
    description: "Packages applications to run in isolated containers",
  },
  {
    id: "secure-boot",
    symbol: "Boot",
    name: "Secure Boot",
    category: "host",
    description: "Ensures systems only run trusted software",
  },
  {
    id: "host-config",
    symbol: "Config",
    name: "Host Configuration",
    category: "host",
    description: "Security configurations applied to servers",
  },
  {
    id: "fim",
    symbol: "FIM",
    name: "File Integrity Monitoring",
    category: "host",
    description: "Detects changes to files indicating violations",
  },
  {
    id: "confidential-computing",
    symbol: "CC",
    name: "Confidential Computing",
    category: "host",
    description: "Protects data in use in secure environments",
  },

  // Active Scanning
  {
    id: "vulnerability-scanning",
    symbol: "VulnScan",
    name: "Vulnerability Scanning",
    category: "active",
    description: "Proactively tests for vulnerabilities",
  },
  {
    id: "sbom",
    symbol: "SBOM",
    name: "Software Bill of Materials",
    category: "active",
    description: "Inventory of all software components",
  },
  {
    id: "sensitive-data-scanning",
    symbol: "DataScan",
    name: "Sensitive Data Scanning",
    category: "active",
    description: "Identifies where sensitive info is stored",
  },

  // Threat Detection
  {
    id: "threat-intel",
    symbol: "Intel",
    name: "Threat Intelligence",
    category: "threat-detection",
    description: "Collecting and analyzing data about threats",
  },
  {
    id: "siem",
    symbol: "SIEM",
    name: "Security Information Management",
    category: "threat-detection",
    description: "Aggregates security data to detect threats",
  },
  {
    id: "dfir",
    symbol: "DFIR",
    name: "Digital Forensics",
    category: "threat-detection",
    description: "Processes for responding to security incidents",
  },

  // Secret Management
  {
    id: "kms",
    symbol: "KMS",
    name: "Key Management System",
    category: "secret",
    description: "Manages cryptographic keys for encryption",
  },
  {
    id: "security-keys",
    symbol: "Keys",
    name: "Security Keys",
    category: "secret",
    description: "Physical authentication devices",
  },
  {
    id: "acl",
    symbol: "ACL",
    name: "Access Control Lists",
    category: "secret",
    description: "Defines resource access permissions",
  },

  // Configuration Scanning
  {
    id: "cloud-config-scanning",
    symbol: "ConfigScan",
    name: "Cloud Config Scanning",
    category: "config",
    description: "Scans cloud settings for compliance",
  },

  // Data Management
  {
    id: "data-backup",
    symbol: "Backup",
    name: "Data Backup",
    category: "data",
    description: "Copies and archives data for recovery",
  },
  {
    id: "data-replication",
    symbol: "Repl",
    name: "Data Replication",
    category: "data",
    description: "Duplicates data across locations",
  },
  {
    id: "data-masking",
    symbol: "Masking",
    name: "Data Masking",
    category: "data",
    description: "Replaces sensitive data for protection",
  },

  // Threat Prevention
  {
    id: "admission-controller",
    symbol: "AdmCtrl",
    name: "Admission Controller",
    category: "threat-prevention",
    description: "Validates resource requests",
  },
  {
    id: "quarantine",
    symbol: "Quar",
    name: "Quarantine",
    category: "threat-prevention",
    description: "Isolates suspicious resources",
  },
  {
    id: "patch-management",
    symbol: "Patch",
    name: "Patch Management",
    category: "threat-prevention",
    description: "Updates to fix vulnerabilities",
  },
  {
    id: "account-lockout",
    symbol: "Lockout",
    name: "Account Lockout",
    category: "threat-prevention",
    description: "Locks accounts after failed attempts",
  },

  // Cloud Products
  {
    id: "cnapp",
    symbol: "CNAPP",
    name: "Cloud-Native Protection",
    category: "cloud-products",
    description: "Security for cloud-native applications",
  },
  {
    id: "cspm",
    symbol: "CSPM",
    name: "Cloud Security Posture",
    category: "cloud-products",
    description: "Monitors infra for best practices",
  },
  {
    id: "ciem",
    symbol: "CIEM",
    name: "Cloud Entitlement Mgmt",
    category: "cloud-products",
    description: "Manages identities and entitlements",
  },
  {
    id: "cdr",
    symbol: "CDR",
    name: "Cloud Detection",
    category: "cloud-products",
    description: "Detects and responds to cloud threats",
  },
  {
    id: "sspm",
    symbol: "SSPM",
    name: "SaaS Security Posture",
    category: "cloud-products",
    description: "Ensures best SaaS configurations",
  },
  {
    id: "soar",
    symbol: "SOAR",
    name: "Security Orchestration",
    category: "cloud-products",
    description: "Coordinates security use cases",
  },
  {
    id: "cwpp",
    symbol: "CWPP",
    name: "Workload Protection",
    category: "cloud-products",
    description: "Protects cloud workloads",
  },
];

// Table layout configuration
export const tableLayout = {
  // Main table grid
  mainTable: [
    // Row 1
    ["iam", null, null, null, null, null, "vulnerability-scanning", "threat-intel", "cnapp"],
    // Row 2
    [
      "sso",
      "kms",
      "load-balancer",
      "network-firewall",
      "api-gateway",
      "virtualization",
      "sbom",
      "admission-controller",
      "siem",
    ],
    // Row 3
    [
      "mfa",
      "security-keys",
      "cloud-config-scanning",
      "proxy",
      "vpn",
      "containerization",
      "secure-boot",
      "quarantine",
      "dfir",
    ],
    // Row 4
    [
      "permission-boundary",
      "acl",
      "bastion-host",
      "rbac",
      "host-config",
      "sensitive-data-scanning",
      "data-backup",
      "patch-management",
      "cspm",
    ],
    // Row 5
    [
      "password-policies",
      "namespacing",
      "fim",
      "confidential-computing",
      "data-replication",
      "data-masking",
      "account-lockout",
      "ciem",
      "cdr",
    ],
  ],
  // Cloud products at bottom
  cloudProducts: ["sspm", "soar", "cwpp"],
};
