
import React from "react";
import { Link } from "react-router-dom";

const TaxonomyHeader: React.FC = () => {
  return (
    <header className="p-6 md:p-8 border-b-8 border-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-24"></div> {/* spacer for balance */}
        <h1 className="text-2xl md:text-4xl font-bold tracking-tighter">
          TAXONOMY<span className="text-red-600">.</span>OF<span className="text-red-600">.</span>ADVERSARIAL
          <span className="text-red-600">.</span>ARTS
        </h1>
        <div className="w-24"></div> {/* spacer for balance */}
      </div>
    </header>
  );
};

export default TaxonomyHeader;
