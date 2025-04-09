
import React from "react";
import TaxonomyItem from "./TaxonomyItem";

interface TaxonomyCategoryProps {
  title: string;
  description: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    detail?: string;
  }>;
  selectedDetail: string | null;
  showDetails: (itemId: string) => void;
}

const TaxonomyCategory: React.FC<TaxonomyCategoryProps> = ({
  title,
  description,
  items,
  selectedDetail,
  showDetails,
}) => {
  return (
    <div className="p-4 md:p-6 brutal-border mb-8 h-full">
      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-600">{title}</h3>
      <p className="mb-4">{description}</p>
      {items.map(item => (
        <TaxonomyItem 
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          detail={item.detail}
          isSelected={selectedDetail === item.id}
          onSelect={showDetails}
        />
      ))}
    </div>
  );
};

export default TaxonomyCategory;
