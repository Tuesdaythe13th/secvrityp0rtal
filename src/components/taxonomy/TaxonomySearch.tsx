
import React from "react";

interface TaxonomySearchProps {
  searchQuery: string;
  searchResults: number;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
}

const TaxonomySearch: React.FC<TaxonomySearchProps> = ({ 
  searchQuery, 
  searchResults, 
  handleSearch, 
  clearSearch 
}) => {
  return (
    <div className="mb-8">
      <input 
        type="text" 
        className="search-box" 
        placeholder="SEARCH TAXONOMY..." 
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-400">{searchResults} RESULTS</span>
        <button 
          onClick={clearSearch} 
          className="copy-btn px-2 py-1 border border-white hover:bg-red-800 hover:border-red-800"
        >
          CLEAR
        </button>
      </div>
    </div>
  );
};

export default TaxonomySearch;
