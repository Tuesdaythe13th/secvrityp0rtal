
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBug, 
  faExclamationTriangle, 
  faCode, 
  faGlobe,
  faExchangeAlt
} from "@fortawesome/free-solid-svg-icons";

const ThreatTypes = () => {
  const threats = [
    { name: "MALWARE", icon: faBug },
    { name: "PHISHING", icon: faExclamationTriangle },
    { name: "SPAM", icon: faExchangeAlt },
    { name: "EXPLOITS", icon: faCode },
    { name: "BOTNETS", icon: faGlobe },
    { name: "DDOS", icon: faExclamationTriangle }
  ];

  return (
    <section className="container mx-auto my-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
        {threats.map((threat, index) => (
          <div key={index} className="border-2 border-black bg-white p-3 text-center">
            <div className="text-xs font-bold">THREAT TYPE</div>
            <div className="flex items-center justify-center mt-1">
              <FontAwesomeIcon icon={threat.icon} className="text-black mr-2" />
              <span className="text-black font-bold">{threat.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreatTypes;
