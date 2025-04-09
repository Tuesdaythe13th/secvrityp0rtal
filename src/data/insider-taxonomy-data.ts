
// Insider Threat Taxonomy Data
export const insiderThreatData = {
  categories: [
    {
      id: "types",
      title: "TYPES OF INSIDER THREATS",
      color: "#2563eb", // blue-600
      description: "Categories of insider threats based on intention and affiliation",
      subcategories: [
        {
          id: "unintentional",
          title: "UNINTENTIONAL THREATS",
          description: "Threats where the insider does not intend to cause harm",
          examples: [
            {
              title: "NEGLIGENCE",
              description: "An insider who exposes an organization to a threat through carelessness",
              instances: [
                'Allowing someone to "piggyback" through a secure entrance',
                "Misplacing a storage device containing sensitive information",
                "Ignoring updates and security patches",
              ],
            },
            {
              title: "ACCIDENTAL",
              description: "An insider who mistakenly causes an unintended risk",
              instances: [
                "Mistyping an email address and sending sensitive info to the wrong person",
                "Clicking on a phishing link by mistake",
                "Improperly disposing of sensitive documents",
              ],
            },
          ],
        },
        {
          id: "intentional",
          title: "INTENTIONAL THREATS",
          description: 'Also known as "malicious insiders" - actions taken deliberately to harm an organization',
          examples: [
            {
              title: "MALICIOUS INSIDERS",
              description: "Those who deliberately cause harm for personal benefit or grievance",
              instances: [
                "Leaking sensitive information for revenge",
                "Harassing associates",
                "Sabotaging equipment",
                "Perpetrating violence",
                "Stealing proprietary data or intellectual property",
              ],
            },
          ],
        },
        {
          id: "other",
          title: "OTHER THREAT TYPES",
          description: "Additional categories of insider threats",
          examples: [
            {
              title: "COLLUSIVE THREATS",
              description: "When insiders collaborate with external threat actors",
              instances: [
                "Collaboration with cybercriminals",
                "Enabling fraud",
                "Facilitating intellectual property theft",
                "Aiding espionage",
              ],
            },
            {
              title: "THIRD-PARTY THREATS",
              description: "Contractors or vendors who have been granted access",
              instances: [
                "Contractors with facility access",
                "Vendors with system access",
                "External consultants with insider knowledge",
                "Service providers with network access",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "manifestations",
      title: "EXPRESSIONS OF INSIDER THREAT",
      color: "#dc2626", // red-600
      description: "How insider threats manifest in organizations",
      subcategories: [
        {
          id: "violence",
          title: "VIOLENCE",
          description: "Threats or actions involving physical harm or intimidation",
          examples: [
            {
              title: "WORKPLACE VIOLENCE",
              description:
                "Any action or threat of physical violence, harassment, intimidation, or other threatening behavior",
              instances: [
                "Physical violence against coworkers",
                "Sexual harassment",
                "Intimidation",
                "Bullying",
                "Threatening behavior",
              ],
            },
            {
              title: "TERRORISM",
              description: "Unlawful use of or threat of violence by those associated with an organization",
              instances: [
                "Violence to promote political objectives",
                "Threats designed to intimidate for social goals",
                "Acts of terror from within",
              ],
            },
          ],
        },
        {
          id: "espionage",
          title: "ESPIONAGE",
          description: "Covert gathering of confidential information for advantage",
          examples: [
            {
              title: "ECONOMIC ESPIONAGE",
              description: "Obtaining trade secrets from foreign nations",
              instances: [
                "Stealing manufacturing methods",
                "Obtaining financial or business information",
                "Acquiring technical or scientific data",
                "Theft of engineering processes",
              ],
            },
            {
              title: "GOVERNMENT ESPIONAGE",
              description: "Intelligence-gathering activities against another government",
              instances: [
                "Spying on government entities",
                "Intelligence gathering from corporations",
                "Infiltrating think tanks and research groups",
              ],
            },
            {
              title: "CRIMINAL ESPIONAGE",
              description: "U.S. citizens betraying government secrets to foreign nations",
              instances: [
                "Sharing classified information with foreign states",
                "Selling sensitive government data",
                "Providing access to protected systems",
              ],
            },
          ],
        },
        {
          id: "sabotage",
          title: "SABOTAGE",
          description: "Deliberate actions to harm an organization's infrastructure",
          examples: [
            {
              title: "PHYSICAL SABOTAGE",
              description: "Actions aimed at harming physical infrastructure",
              instances: [
                "Damaging facilities",
                "Disabling equipment",
                "Contaminating clean spaces",
                "Tampering with machinery",
              ],
            },
            {
              title: "VIRTUAL SABOTAGE",
              description: "Malicious actions through technical means to disrupt operations",
              instances: [
                "Deleting code",
                "Disrupting systems",
                "Injecting errors into processes",
                "Tampering with digital resources",
              ],
            },
          ],
        },
        {
          id: "theft",
          title: "THEFT",
          description: "Stealing money or intellectual property",
          examples: [
            {
              title: "FINANCIAL CRIME",
              description: "Unauthorized taking of money or property",
              instances: ["Embezzlement", "Fraud", "Misappropriation of funds", "Theft of physical assets"],
            },
            {
              title: "INTELLECTUAL PROPERTY THEFT",
              description: "Theft of ideas, inventions, or creative expressions",
              instances: [
                "Stealing trade secrets",
                "Copying proprietary designs",
                "Taking research data",
                "Appropriating unique processes",
              ],
            },
          ],
        },
        {
          id: "cyber",
          title: "CYBER",
          description: "Threats related to technology and digital systems",
          examples: [
            {
              title: "UNINTENTIONAL CYBER THREATS",
              description: "Non-malicious exposure of IT infrastructure, systems, and data",
              instances: [
                "Falling for phishing emails",
                "Installing rogue software",
                "Clicking on malicious advertisements",
                "Misconfiguring systems",
              ],
            },
            {
              title: "INTENTIONAL CYBER THREATS",
              description: "Malicious actions using technical means to disrupt operations",
              instances: [
                "Changing data deliberately",
                "Inserting malware",
                "Exploiting IT weaknesses",
                "Unauthorized data exfiltration",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "insiders",
      title: "WHO IS AN INSIDER?",
      color: "#16a34a", // green-600
      description: "Categories of people who qualify as insiders in an organization",
      subcategories: [
        {
          id: "trusted",
          title: "TRUSTED INDIVIDUALS",
          description: "People the organization explicitly trusts",
          examples: [
            {
              title: "AUTHORIZED PERSONNEL",
              description: "Those with formal access to organizational resources",
              instances: ["Employees", "Organization members", "Those with access to sensitive information"],
            },
            {
              title: "BADGE HOLDERS",
              description: "People with physical access credentials",
              instances: [
                "Employees with access badges",
                "Contractors with credentials",
                "Vendors with facility access",
                "Repair personnel with continuous access",
              ],
            },
          ],
        },
        {
          id: "technical",
          title: "TECHNICAL ACCESS HOLDERS",
          description: "People with access to digital resources",
          examples: [
            {
              title: "IT USERS",
              description: "Those with access to technology resources",
              instances: ["Network access holders", "Computer users", "System administrators", "Database managers"],
            },
            {
              title: "DEVELOPERS AND PRODUCT CREATORS",
              description: "Those who develop organizational products and services",
              instances: ["Software developers", "Engineers", "Product designers", "R&D personnel"],
            },
          ],
        },
        {
          id: "knowledge",
          title: "KNOWLEDGE HOLDERS",
          description: "People with special knowledge of the organization",
          examples: [
            {
              title: "BUSINESS KNOWLEDGE",
              description: "Those familiar with organizational fundamentals",
              instances: ["Pricing specialists", "Cost analysts", "Strategic planners", "Operations managers"],
            },
            {
              title: "STRATEGIC KNOWLEDGE",
              description: "Those trusted with future plans or organizational strategy",
              instances: ["Executive team members", "Board members", "Strategic planners", "Future product developers"],
            },
            {
              title: "SENSITIVE INFORMATION HOLDERS",
              description: "Those with access to protected information in government contexts",
              instances: [
                "Classified information handlers",
                "National security personnel",
                "Public safety officials",
                "Critical infrastructure workers",
              ],
            },
          ],
        },
      ],
    },
  ],
}
