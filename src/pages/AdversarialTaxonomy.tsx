
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/AdversarialTaxonomy.css";

// Import components
import TaxonomyHeader from "../components/taxonomy/TaxonomyHeader";
import TaxonomySearch from "../components/taxonomy/TaxonomySearch";
import TaxonomyCategory from "../components/taxonomy/TaxonomyCategory";
import TaxonomyManifesto from "../components/taxonomy/TaxonomyManifesto";
import TaxonomyFooter from "../components/taxonomy/TaxonomyFooter";

// Import data
import { taxonomyData } from "../data/adversarial-taxonomy-data";

export default function AdversarialTaxonomy() {
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(0);

  // Handle showing details for a taxonomy item
  const showDetails = (itemId: string) => {
    setSelectedDetail(itemId === selectedDetail ? null : itemId);
  };

  // Clear search query
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults(0);
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Count results (simplified implementation)
    if (value.trim() === "") {
      setSearchResults(0);
    } else {
      // Just a basic count for demo purposes
      setSearchResults(
        ["glitch", "noise", "error", "detournement", "parasitism", "sabotage", "obfuscation", "encryption", "stealth"]
          .filter(item => item.includes(value.toLowerCase()))
          .length
      );
    }
  };

  useEffect(() => {
    document.title = "Adversarial Taxonomy - Neural Security";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="px-4 py-2 bg-black text-white font-bold border-2 border-white hover:bg-red-800 hover:border-red-800"
        >
          ← BACK
        </Link>
      </div>

      {/* Header */}
      <TaxonomyHeader />

      {/* Main content */}
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="error-corruption"></div>
          
          {/* Search Box */}
          <TaxonomySearch 
            searchQuery={searchQuery}
            searchResults={searchResults}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8" id="taxonomy-grid">
            <div className="col-span-1">
              <TaxonomyCategory 
                title={taxonomyData.disruption.title}
                description={taxonomyData.disruption.description}
                items={taxonomyData.disruption.items}
                selectedDetail={selectedDetail}
                showDetails={showDetails}
              />
            </div>

            <div className="col-span-1">
              <TaxonomyCategory 
                title={taxonomyData.subversion.title}
                description={taxonomyData.subversion.description}
                items={taxonomyData.subversion.items}
                selectedDetail={selectedDetail}
                showDetails={showDetails}
              />
            </div>

            <div className="col-span-1">
              <TaxonomyCategory 
                title={taxonomyData.resistance.title}
                description={taxonomyData.resistance.description}
                items={taxonomyData.resistance.items}
                selectedDetail={selectedDetail}
                showDetails={showDetails}
              />
            </div>
          </div>

          <TaxonomyManifesto />
        </div>
      </main>

      {/* Footer */}
      <TaxonomyFooter />
    </div>
  );
}
