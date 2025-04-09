
import React from "react";

const TaxonomyManifesto: React.FC = () => {
  return (
    <div className="mt-8 md:mt-12 p-4 md:p-8 brutal-border">
      <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">MANIFESTO</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <div>
          <p className="mb-4 font-bold">1. AESTHETICS MUST WOUND.</p>
          <p>COMFORT IS THE ENEMY OF AWARENESS. DESIGN SHOULD AGITATE, DISTURB, AND CHALLENGE.</p>
        </div>
        <div>
          <p className="mb-4 font-bold">2. SYSTEMS MUST FAIL.</p>
          <p>PERFECTION IS A LIE. EMBRACE THE GLITCH, THE ERROR, AND THE UNEXPECTED.</p>
        </div>
        <div>
          <p className="mb-4 font-bold">3. FORM MUST FOLLOW FRACTURE.</p>
          <p>STRUCTURE EMERGES FROM COLLAPSE. BUILD FROM THE RUINS OF STANDARDIZATION.</p>
        </div>
      </div>
    </div>
  );
};

export default TaxonomyManifesto;
