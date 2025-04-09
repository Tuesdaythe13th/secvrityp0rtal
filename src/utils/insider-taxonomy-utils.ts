
import { insiderThreatData } from "../data/insider-taxonomy-data"

// Toggle category expansion
export function toggleInsiderCategory(categoryId: string) {
  // Get current category from data attribute
  const currentCategory = document.body.getAttribute("data-current-insider-category")
  const expandedSection = document.getElementById("expanded-insider-category")

  if (!expandedSection) return

  // Reset all arrows
  document.querySelectorAll('[id$="-arrow"]').forEach((arrow) => {
    arrow.textContent = "+"
  })

  if (currentCategory === categoryId) {
    // Collapse current category
    document.body.setAttribute("data-current-insider-category", "")
    document.body.setAttribute("data-current-insider-subcategory", "")
    expandedSection.classList.add("hidden")
  } else {
    // Expand new category
    document.body.setAttribute("data-current-insider-category", categoryId)
    document.body.setAttribute("data-current-insider-subcategory", "")

    // Update arrow
    const arrowElement = document.getElementById(`${categoryId}-arrow`)
    if (arrowElement) arrowElement.textContent = "-"

    // Show expanded section
    expandedSection.classList.remove("hidden")

    // Render subcategories
    renderInsiderSubcategories(categoryId)
  }
}

// Render subcategories for a category
export function renderInsiderSubcategories(categoryId: string) {
  const expandedSection = document.getElementById("expanded-insider-category")
  if (!expandedSection) return

  const category = insiderThreatData.categories.find((c) => c.id === categoryId)
  if (!category) return

  // Get color class based on category
  let colorClass = ""
  switch (categoryId) {
    case "types":
      colorClass = "blue"
      break
    case "manifestations":
      colorClass = "red"
      break
    case "insiders":
      colorClass = "green"
      break
    default:
      colorClass = "black"
  }

  let html = `
    <div class="mb-6">
      <h2 class="text-2xl font-black mb-3 text-${colorClass}-600">${category.title}</h2>
      <p class="mb-4">${category.description}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  `

  category.subcategories.forEach((subcategory) => {
    html += `
      <div class="brutal-panel p-4 border-${colorClass}-600 cursor-pointer" 
           onclick="window.toggleInsiderSubcategory('${subcategory.id}')">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-bold">${subcategory.title}</h3>
          <span id="${subcategory.id}-arrow">+</span>
        </div>
        <p class="text-sm">${subcategory.description}</p>
      </div>
    `
  })

  html += "</div>"

  // Add subcategory details section
  html += `
    <div id="insider-subcategory-details" class="mt-6 hidden">
      <!-- Subcategory details will be rendered here -->
    </div>
  `

  expandedSection.innerHTML = html

  // Make the toggle function available globally
  ;(window as any).toggleInsiderSubcategory = toggleInsiderSubcategory
}

// Toggle subcategory expansion
export function toggleInsiderSubcategory(subcategoryId: string) {
  const currentCategory = document.body.getAttribute("data-current-insider-category")
  const currentSubcategory = document.body.getAttribute("data-current-insider-subcategory")
  const detailsSection = document.getElementById("insider-subcategory-details")

  if (!detailsSection || !currentCategory) return

  // Reset all subcategory arrows
  document.querySelectorAll('[id$="-arrow"]').forEach((arrow) => {
    if (arrow.id !== `${currentCategory}-arrow`) {
      arrow.textContent = "+"
    }
  })

  if (currentSubcategory === subcategoryId) {
    // Collapse current subcategory
    document.body.setAttribute("data-current-insider-subcategory", "")
    detailsSection.classList.add("hidden")
  } else {
    // Expand new subcategory
    document.body.setAttribute("data-current-insider-subcategory", subcategoryId)

    // Update arrow
    const arrowElement = document.getElementById(`${subcategoryId}-arrow`)
    if (arrowElement) arrowElement.textContent = "-"

    // Show details section
    detailsSection.classList.remove("hidden")

    // Render examples
    renderInsiderExamples(currentCategory, subcategoryId)
  }
}

// Render examples for a subcategory
export function renderInsiderExamples(categoryId: string, subcategoryId: string) {
  const detailsSection = document.getElementById("insider-subcategory-details")
  if (!detailsSection) return

  const category = insiderThreatData.categories.find((c) => c.id === categoryId)
  if (!category) return

  const subcategory = category.subcategories.find((s) => s.id === subcategoryId)
  if (!subcategory) return

  // Get color class based on category
  let colorClass = ""
  switch (categoryId) {
    case "types":
      colorClass = "blue"
      break
    case "manifestations":
      colorClass = "red"
      break
    case "insiders":
      colorClass = "green"
      break
    default:
      colorClass = "black"
  }

  let html = `
    <h3 class="text-xl font-black mb-4 border-b-2 border-${colorClass}-600 pb-2">${subcategory.title} - EXAMPLES</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
  `

  subcategory.examples.forEach((example) => {
    html += `
      <div class="brutal-panel p-4">
        <h4 class="font-bold mb-2 underline">${example.title}</h4>
        <p class="text-sm mb-3">${example.description}</p>
        <div class="bg-gray-100 p-3">
          <h5 class="font-bold text-sm mb-2">INSTANCES:</h5>
          <ul class="list-disc ml-5">
            ${example.instances.map((instance) => `<li class="text-sm mb-1">${instance}</li>`).join("")}
          </ul>
        </div>
      </div>
    `
  })

  html += "</div>"

  detailsSection.innerHTML = html
}
