
import { digitalEventsData } from "../data/digital-events-data";

// Setup global event functions
export function setupGlobalEventFunctions() {
  (window as any).toggleEventCategory = toggleEventCategory;
  (window as any).showEventDetails = showEventDetails;
}

// Toggle event category expansion
export function toggleEventCategory(categoryId: string) {
  const arrowElement = document.getElementById(`${categoryId}-arrow`);

  // Get current category from data attribute
  const currentCategory = document.body.getAttribute("data-current-event-category");

  if (currentCategory === categoryId) {
    // Collapse current category
    document.body.setAttribute("data-current-event-category", "");
    document.body.setAttribute("data-current-event", "");
    if (arrowElement) arrowElement.textContent = "+";
    const eventsListEl = document.getElementById("events-list");
    const eventDetailsEl = document.getElementById("event-details");
    if (eventsListEl) eventsListEl.classList.add("hidden");
    if (eventDetailsEl) eventDetailsEl.classList.add("hidden");
  } else {
    // Expand new category
    document.body.setAttribute("data-current-event-category", categoryId);
    document.body.setAttribute("data-current-event", "");

    // Reset all arrows
    document.querySelectorAll('[id$="-arrow"]').forEach((arrow) => {
      if (!arrow.id.includes("tactic")) {
        arrow.textContent = "+";
      }
    });
    if (arrowElement) arrowElement.textContent = "-";

    // Show events list
    const eventsListEl = document.getElementById("events-list");
    const eventDetailsEl = document.getElementById("event-details");
    if (eventsListEl) eventsListEl.classList.remove("hidden");
    if (eventDetailsEl) eventDetailsEl.classList.add("hidden");

    // Render mock events (in a real implementation, this would load events from the data source)
    renderMockEvents(categoryId);
  }
}

// Render mock events for demo purposes
export function renderMockEvents(categoryId: string) {
  const eventsContainer = document.getElementById("events-container");
  if (!eventsContainer) return;

  eventsContainer.innerHTML = "";

  // Find the category
  const category = digitalEventsData.categories.find((c) => c.id === categoryId);
  if (!category) return;

  // Create some mock events based on the category
  const mockEvents = getMockEventsForCategory(categoryId);

  mockEvents.forEach((event) => {
    const eventEl = document.createElement("div");
    eventEl.className = "brutal-panel p-3 cursor-pointer hover:bg-gray-100 mb-2";
    eventEl.onclick = () => showEventDetails(event.id);

    eventEl.innerHTML = `
      <div class="flex justify-between items-center mb-1">
        <span class="font-bold">${event.name}</span>
        <span class="px-2 py-1 text-xs" style="background-color: ${getSeverityColor(
          event.severity
        )}; color: #000000; font-weight: bold;">
          ${event.severity}
        </span>
      </div>
      <p class="text-sm">${event.shortDescription}</p>
    `;

    eventsContainer.appendChild(eventEl);
  });
}

// Show event details
export function showEventDetails(eventId: string) {
  // Get current category from data attribute
  const currentCategory = document.body.getAttribute("data-current-event-category");
  if (!currentCategory) return;

  const mockEvents = getMockEventsForCategory(currentCategory);
  const event = mockEvents.find((e) => e.id === eventId);
  if (!event) return;

  document.body.setAttribute("data-current-event", eventId);

  // Show event details section
  const eventDetailsEl = document.getElementById("event-details");
  if (eventDetailsEl) eventDetailsEl.classList.remove("hidden");

  // Render event details
  const detailsContainer = document.getElementById("event-details-container");
  if (!detailsContainer) return;

  detailsContainer.innerHTML = `
    <div class="brutal-panel p-4">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-xl font-black">${event.name}</h3>
        <span class="px-2 py-1" style="background-color: ${getSeverityColor(
          event.severity
        )}; color: #000000; font-weight: bold;">
          ${event.severity}
        </span>
      </div>
      
      <p class="mb-4">${event.fullDescription}</p>
      
      <div class="mb-4">
        <p class="font-bold uppercase text-sm mb-2">Detection Value:</p>
        <div class="flex items-center gap-2">
          <span class="w-4 h-4" style="background-color: ${getSeverityColor(event.severity)}"></span>
          <span>${getDetectionValue(event.severity)}</span>
        </div>
      </div>
      
      <div class="mb-4">
        <p class="font-bold uppercase text-sm mb-2">Related Artifacts:</p>
        <div class="flex flex-wrap gap-2">
          ${event.relatedArtifacts
            .map(
              (artifact) =>
                `<span class="brutal-btn px-2 py-1 text-xs cursor-pointer" onclick="showArtifactDetails('${artifact}')">${artifact}</span>`
            )
            .join("")}
        </div>
      </div>
      
      <div class="bg-gray-900 text-green-400 p-3 font-mono text-sm overflow-x-auto">
        <p class="mb-2">// Event Detection Example</p>
        <code>${event.detectionCode}</code>
      </div>
    </div>
  `;
}

// Helper function to get mock events for a category
function getMockEventsForCategory(categoryId: string) {
  switch (categoryId) {
    case "network":
      return [
        {
          id: "unexpected-outbound",
          name: "Unexpected Outbound Connection",
          severity: "high",
          shortDescription: "Outbound connection to previously unseen destination",
          fullDescription:
            "A process has initiated an outbound connection to an IP address or domain that has not been previously observed in the environment. This could indicate command and control communication or data exfiltration.",
          relatedArtifacts: ["network-flow", "connection-log"],
          detectionCode: `DETECT_UNUSUAL_CONNECTION(process, destination) {\n  if (!BASELINE_CONNECTIONS.includes(destination)) {\n    ALERT("Unusual outbound connection detected", SEVERITY.HIGH);\n    LOG_EVENT(process, destination, "Unexpected Outbound");\n  }\n}`,
        },
        {
          id: "dns-tunneling",
          name: "DNS Tunneling Detected",
          severity: "critical",
          shortDescription: "Unusual DNS query patterns indicative of tunneling",
          fullDescription:
            "DNS requests with high entropy values or unusual patterns have been detected, suggesting potential DNS tunneling activity. This technique is commonly used for command and control or data exfiltration that bypasses traditional controls.",
          relatedArtifacts: ["network-packet", "protocol-header"],
          detectionCode: `DETECT_DNS_TUNNELING(dns_queries) {\n  const entropy = CALCULATE_ENTROPY(dns_queries);\n  if (entropy > TUNNELING_THRESHOLD) {\n    ALERT("Potential DNS tunneling detected", SEVERITY.CRITICAL);\n    BLOCK_DNS_QUERIES(dns_queries.source);\n  }\n}`,
        },
      ];
    case "system":
      return [
        {
          id: "scheduled-task-creation",
          name: "Suspicious Scheduled Task",
          severity: "medium",
          shortDescription: "Unusual scheduled task created for persistence",
          fullDescription:
            "A new scheduled task has been created with suspicious attributes such as obfuscated command lines, execution of PowerShell or other scripting engines, or unusual timing patterns.",
          relatedArtifacts: ["process-creation-log", "system-artifact"],
          detectionCode: `DETECT_SUSPICIOUS_SCHEDULED_TASK(task) {\n  if (CONTAINS_SUSPICIOUS_PATTERNS(task.command) || \n      UNUSUAL_TIMING(task.schedule)) {\n    ALERT("Suspicious scheduled task detected", SEVERITY.MEDIUM);\n    LOG_TASK_DETAILS(task);\n  }\n}`,
        },
        {
          id: "registry-persistence",
          name: "Registry Persistence Mechanism",
          severity: "high",
          shortDescription: "Modification of registry for persistence",
          fullDescription:
            "A registry key associated with system startup or authentication processes has been modified. This is a common technique used by attackers to maintain persistence across system reboots.",
          relatedArtifacts: ["system-artifact"],
          detectionCode: `DETECT_REGISTRY_PERSISTENCE(registry_event) {\n  if (AUTORUN_LOCATIONS.includes(registry_event.key)) {\n    ALERT("Registry persistence mechanism detected", SEVERITY.HIGH);\n    RESTORE_REGISTRY_DEFAULTS(registry_event.key);\n  }\n}`,
        },
      ];
    case "application":
      return [
        {
          id: "process-injection",
          name: "Process Memory Injection",
          severity: "critical",
          shortDescription: "Code injected into running process",
          fullDescription:
            "Evidence of code being injected into the memory space of a running process has been detected. This technique is commonly used to execute malicious code within the context of a legitimate process to evade detection.",
          relatedArtifacts: ["process-memory", "code-segment"],
          detectionCode: `DETECT_PROCESS_INJECTION(process) {\n  const memoryRegions = SCAN_PROCESS_MEMORY(process.id);\n  for (const region of memoryRegions) {\n    if (region.permissions.includes("EXECUTE") && \n        region.recently_modified && \n        !region.mapped_from_disk) {\n      ALERT("Process memory injection detected", SEVERITY.CRITICAL);\n      DUMP_MEMORY_REGION(region);\n    }\n  }\n}`,
        },
        {
          id: "unusual-child-process",
          name: "Unusual Child Process",
          severity: "high",
          shortDescription: "Application spawned unexpected child process",
          fullDescription:
            "An application has spawned a child process that is not typically associated with the parent application. This could indicate exploitation of the application to execute unauthorized code.",
          relatedArtifacts: ["process-creation-log", "process-tree"],
          detectionCode: `DETECT_UNUSUAL_CHILD_PROCESS(parent, child) {\n  if (!BASELINE_PROCESS_TREE[parent].includes(child.name)) {\n    ALERT("Unusual child process detected", SEVERITY.HIGH);\n    LOG_PROCESS_DETAILS(parent, child);\n  }\n}`,
        },
      ];
    case "authentication":
      return [
        {
          id: "password-spray",
          name: "Password Spray Attack",
          severity: "high",
          shortDescription: "Multiple failed logins across different accounts",
          fullDescription:
            "A pattern of authentication failures has been detected across multiple user accounts from the same source, indicating a potential password spray attack trying to gain unauthorized access.",
          relatedArtifacts: ["authentication-log", "credential-store"],
          detectionCode: `DETECT_PASSWORD_SPRAY(auth_events) {\n  const sourceIPs = GROUP_BY_SOURCE_IP(auth_events);\n  for (const [ip, events] of Object.entries(sourceIPs)) {\n    if (UNIQUE_USERNAMES(events) > SPRAY_THRESHOLD && \n        FAILURE_RATE(events) > 0.8) {\n      ALERT("Password spray attack detected", SEVERITY.HIGH);\n      BLOCK_SOURCE_IP(ip);\n    }\n  }\n}`,
        },
        {
          id: "credential-dumping",
          name: "Credential Dumping Attempt",
          severity: "critical",
          shortDescription: "Process accessing credential storage",
          fullDescription:
            "A process has been detected accessing the system credential store in an unauthorized manner. This is typically associated with credential theft tools like Mimikatz that attempt to extract authentication credentials from memory.",
          relatedArtifacts: ["process-memory", "credential-store"],
          detectionCode: `DETECT_CREDENTIAL_DUMPING(process) {\n  if (process.accessing_lsass || \n      CREDENTIAL_STORE_ACCESS_PATTERN(process)) {\n    ALERT("Credential dumping attempt detected", SEVERITY.CRITICAL);\n    TERMINATE_PROCESS(process.id);\n    RESET_AFFECTED_CREDENTIALS();\n  }\n}`,
        },
      ];
    default:
      return [];
  }
}

// Helper function to get severity color
function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case "critical":
      return "#ef4444"; // red-500
    case "high":
      return "#f97316"; // orange-500
    case "medium":
      return "#eab308"; // yellow-500
    case "low":
      return "#3b82f6"; // blue-500
    default:
      return "#6b7280"; // gray-500
  }
}

// Helper function to get detection value description
function getDetectionValue(severity: string) {
  switch (severity.toLowerCase()) {
    case "critical":
      return "CRITICAL - Immediate response required";
    case "high":
      return "HIGH - Prioritize investigation";
    case "medium":
      return "MEDIUM - Standard investigation";
    case "low":
      return "LOW - Investigate when resources available";
    default:
      return "UNKNOWN";
  }
}
