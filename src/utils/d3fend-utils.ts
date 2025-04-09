
import { d3fendData } from "../data/d3fend-data";

// Toggle tactic expansion
export function toggleTactic(tacticId: string) {
  const arrowElement = document.getElementById(`${tacticId}-arrow`);

  // Get current tactic from data attribute
  const currentTactic = document.body.getAttribute("data-current-tactic");

  if (currentTactic === tacticId) {
    // Collapse current tactic
    document.body.setAttribute("data-current-tactic", "");
    document.body.setAttribute("data-current-technique", "");
    if (arrowElement) arrowElement.textContent = "+";
    const baseTechniquesEl = document.getElementById("base-techniques");
    const subTechniquesEl = document.getElementById("sub-techniques");
    if (baseTechniquesEl) baseTechniquesEl.classList.add("hidden");
    if (subTechniquesEl) subTechniquesEl.classList.add("hidden");
  } else {
    // Expand new tactic
    document.body.setAttribute("data-current-tactic", tacticId);
    document.body.setAttribute("data-current-technique", "");

    // Reset all arrows
    document.querySelectorAll('[id$="-arrow"]').forEach((arrow) => {
      arrow.textContent = "+";
    });
    if (arrowElement) arrowElement.textContent = "-";

    // Show base techniques
    const baseTechniquesEl = document.getElementById("base-techniques");
    const subTechniquesEl = document.getElementById("sub-techniques");
    if (baseTechniquesEl) baseTechniquesEl.classList.remove("hidden");
    if (subTechniquesEl) subTechniquesEl.classList.add("hidden");

    // Render techniques
    renderTechniques(tacticId);
  }
}

// Render techniques for a tactic
export function renderTechniques(tacticId: string) {
  const techniquesContainer = document.getElementById("techniques-container");
  if (!techniquesContainer) return;

  techniquesContainer.innerHTML = "";

  const tactic = d3fendData.tactics.find((t) => t.id === tacticId);
  if (!tactic) return;

  tactic.techniques.forEach((technique) => {
    const techniqueEl = document.createElement("div");
    techniqueEl.className = "brutal-panel p-3 cursor-pointer hover:bg-gray-100";
    techniqueEl.onclick = () => toggleTechnique(technique.id);

    techniqueEl.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <span class="font-bold">${technique.name}</span>
        <span class="bg-black text-white px-2 py-1">+</span>
      </div>
      <p class="text-sm">${technique.description}</p>
    `;

    techniquesContainer.appendChild(techniqueEl);
  });
}

// Toggle technique expansion
export function toggleTechnique(techniqueId: string) {
  document.body.setAttribute("data-current-technique", techniqueId);

  // Show sub-techniques
  const subTechniquesEl = document.getElementById("sub-techniques");
  if (subTechniquesEl) subTechniquesEl.classList.remove("hidden");

  // Render sub-techniques
  const currentTactic = document.body.getAttribute("data-current-tactic");
  if (currentTactic) {
    renderSubTechniques(currentTactic, techniqueId);
  }
}

// Render sub-techniques
export function renderSubTechniques(tacticId: string, techniqueId: string) {
  const container = document.getElementById("sub-techniques-container");
  if (!container) return;

  container.innerHTML = "";

  const tactic = d3fendData.tactics.find((t) => t.id === tacticId);
  if (!tactic) return;

  const technique = tactic.techniques.find((t) => t.id === techniqueId);
  if (!technique) return;

  technique.children.forEach((subTechnique) => {
    const subTechEl = document.createElement("div");
    subTechEl.className = "brutal-panel p-4 mb-4";

    subTechEl.innerHTML = `
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-xl font-black">${subTechnique.name}</h3>
        <span class="brutal-panel px-2 py-1 bg-black text-white">
          SOURCES: ${subTechnique.sourceDocs}
        </span>
      </div>
      <p class="mb-4">${subTechnique.description}</p>
      
      <div class="mb-4">
        <p class="font-bold uppercase text-sm mb-2">Digital Artifacts:</p>
        <div class="flex flex-wrap gap-2">
          ${subTechnique.artifacts
            .map((artifactId) => {
              const artifact = d3fendData.artifacts.find((a) => a.id === artifactId);
              if (!artifact) return "";
              return `<span class="brutal-btn px-2 py-1 text-xs cursor-pointer" onclick="showArtifactDetails('${artifactId}')">${artifact.name}</span>`;
            })
            .join("")}
        </div>
      </div>
      
      <div class="bg-gray-900 text-green-400 p-3 font-mono text-sm overflow-x-auto">
        ${subTechnique.details}
      </div>
    `;

    container.appendChild(subTechEl);
  });
}

// Show artifact details panel
export function showArtifactDetails(artifactId: string) {
  const artifact = d3fendData.artifacts.find((a) => a.id === artifactId);
  if (!artifact) return;

  const panel = document.getElementById("artifact-panel");
  if (panel) panel.classList.remove("hidden");

  const detailsEl = document.getElementById("artifact-details");
  if (!detailsEl) return;

  detailsEl.innerHTML = `
    <div class="brutal-panel p-4">
      <h3 class="text-xl font-black mb-2">${artifact.name}</h3>
      <p class="mb-4">${artifact.description}</p>
      
      <div class="mb-4">
        <p class="font-bold text-sm mb-1">Category:</p>
        <span class="brutal-btn px-2 py-1 text-xs">${artifact.parent}</span>
      </div>
      
      ${
        artifact.childArtifacts && artifact.childArtifacts.length > 0
          ? `
        <div class="mb-4">
          <p class="font-bold text-sm mb-1">Contains:</p>
          <div class="flex flex-wrap gap-2">
            ${artifact.childArtifacts
              .map((childId) => {
                const childArtifact = d3fendData.artifacts.find((a) => a.id === childId);
                if (!childArtifact) return "";
                return `<span class="brutal-btn px-2 py-1 text-xs cursor-pointer" onclick="showArtifactDetails('${childId}')">${childArtifact.name}</span>`;
              })
              .join("")}
          </div>
        </div>
      `
          : ""
      }
      
      <div>
        <p class="font-bold text-sm mb-2">Associated Techniques:</p>
        <div class="space-y-2">
          ${getAssociatedTechniques(artifactId)
            .map(
              (tech) => `
            <div class="flex items-center gap-2">
              <span class="w-4 h-4 rounded-full" style="background-color: ${tech.color}"></span>
              <span class="text-sm">${tech.name}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

// Find techniques associated with an artifact
export function getAssociatedTechniques(artifactId: string) {
  const techniques: { name: string; color: string }[] = [];

  d3fendData.tactics.forEach((tactic) => {
    tactic.techniques.forEach((technique) => {
      technique.children.forEach((subTechnique) => {
        if (subTechnique.artifacts.includes(artifactId)) {
          techniques.push({
            name: subTechnique.name,
            color: tactic.color,
          });
        }
      });
    });
  });

  return techniques;
}

// Close artifact panel
export function closeArtifactPanel() {
  const panel = document.getElementById("artifact-panel");
  if (panel) panel.classList.add("hidden");
}
