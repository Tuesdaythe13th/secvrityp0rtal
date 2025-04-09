
import { Link } from "react-router-dom";

interface FeaturedSimulatorProps {
  title: string;
  description: string;
  primaryLinkText: string;
  primaryLinkPath: string;
  secondaryButtonText: string;
  isHighlighted?: boolean;
}

const FeaturedSimulator = ({ 
  title, 
  description, 
  primaryLinkText, 
  primaryLinkPath,
  secondaryButtonText,
  isHighlighted = false 
}: FeaturedSimulatorProps) => {
  return (
    <section className="container mx-auto my-6 bg-white border-4 border-black p-6">
      <h2 className={`text-2xl font-bold ${isHighlighted ? 'text-red-600' : 'text-black'} mb-2`}>{title}</h2>
      <p className="text-black mb-4">{description}</p>
      <div className="flex space-x-4">
        <Link 
          to={primaryLinkPath} 
          className={isHighlighted 
            ? "bg-red-600 text-white px-6 py-2 border-2 border-red-600 hover:bg-white hover:text-red-600 transition-colors duration-300"
            : "bg-black text-white px-6 py-2 border-2 border-black hover:bg-white hover:text-black transition-colors duration-300"
          }
        >
          {primaryLinkText}
        </Link>
        <button className="border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-colors duration-300">
          {secondaryButtonText}
        </button>
      </div>
    </section>
  );
};

export default FeaturedSimulator;
