
import React from "react";

interface TaxonomyItemProps {
  id: string;
  title: string;
  description: string;
  detail?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const TaxonomyItem: React.FC<TaxonomyItemProps> = ({
  id,
  title,
  description,
  detail,
  isSelected,
  onSelect,
}) => {
  return (
    <div className="taxonomy-item" onClick={() => onSelect(id)}>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-sm">{description}</p>
      {isSelected && detail && (
        <div className="mt-4 p-3 bg-gray-800">
          <p>{detail}</p>
        </div>
      )}
    </div>
  );
};

export default TaxonomyItem;
