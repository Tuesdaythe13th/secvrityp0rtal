
import React from "react";

const TaxonomyFooter: React.FC = () => {
  return (
    <footer className="p-6 md:p-8 border-t-8 border-white mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="mb-4 md:mb-0">© 2023 BRVTAL.DESIGN — ADVERSARIAL EDITION</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <button className="text-white hover:text-red-600 transition-all">
              DOWNLOAD PDF
            </button>
            <button className="text-white hover:text-red-600 transition-all">
              PRINT VERSION
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TaxonomyFooter;
