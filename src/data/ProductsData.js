import {
  PrdImg1, PrdImg2, PrdImg3, PrdImg4, PrdImg5, PrdImg6, PrdImg7,PrdImg8, PrdImg9, PrdImg10, PrdImg11,
  PrdVideo1, PrdVideo3, PrdVideo4, PrdVideo5, PrdVideo6, PrdVideo8, PrdVideo9, PrdVideo10, PrdVideo11,
  Equipement1
} from "../assets/";

const ProductsData = [
  {
    id: "SPR-001",
    slug: "swimming-pool-systems",
    title: "Swimming Pool Systems",
    image: PrdImg1,
    video: PrdVideo1,
    homeSubtitle: "Advanced filtration and circulation systems for clean, safe, and hygienic swimming pools",
    subtitle:
      "Advanced filtration and circulation systems for clean, safe, and hygienic swimming pools.",
    svg: "left",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "Integrated filtration, circulation, and disinfection systems designed to maintain optimal water quality and hygiene in swimming pools.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Hotels & resorts", "Residential complexes", "Sports & recreation facilities", "Private & public swimming pools"],
      },
      advantages: {
        title: "Advantages",
        items: ["Crystal-clear water quality", "Reduced chemical usage", "Energy-efficient operation", "Easy monitoring and maintenance"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Pre-filtration & debris removal",
          "Sand/media filtration",
          "Chemical dosing & disinfection",
          "Continuous circulation & monitoring",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Safe and hygienic water", "Low maintenance effort", "Consistent water quality", "User-friendly operation"],
      },
    },
  },

  {
    id: "WTP-002",
    slug: "water-treatment-plant",
    title: "Water Treatment Plant (WTP)",
    image: PrdImg2,
    video: "",
    homeSubtitle: "Reliable water treatment systems designed to deliver safe, potable water for diverse applications",
    subtitle:
      "Reliable water treatment systems designed to deliver safe, potable water for diverse applications.",
    svg: "right",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "Custom-engineered water treatment plants that remove physical, chemical, and biological impurities to produce safe water suitable for industrial, municipal, and institutional use.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Municipal water supply", "Industrial facilities", "Commercial buildings", "Educational & healthcare institutions"],
      },
      advantages: {
        title: "Advantages",
        items: ["Consistent water quality", "Scalable plant design", "Compliance with drinking water standards", "Long-term operational reliability"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Raw water intake & screening",
          "Coagulation & sedimentation",
          "Filtration (sand / UF)",
          "Disinfection",
          "Treated water storage & distribution",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Safe potable water", "Reduced operational risks", "Designed for continuous use"],
      },
    },
  },

  {
    id: "STP-003",
    slug: "sewage-treatment-plant",
    title: "Sewage Treatment Plant (STP)",
    image: PrdImg3,
    video: PrdVideo3,
    homeSubtitle: "Efficient sewage treatment solutions for safe discharge or reuse of treated wastewater",
    subtitle:
      "Efficient sewage treatment solutions for safe discharge or reuse of treated wastewater.",
    svg: "left",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "STPs designed to treat domestic sewage using proven biological and membrane-based technologies to meet regulatory discharge and reuse standards.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Residential townships", "Hotels & hospitals", "Commercial complexes", "Municipal infrastructure"],
      },
      advantages: {
        title: "Advantages",
        items: ["Compact footprint & Odour-controlled operation", "Reuse-ready treated water", "Low operating cost", "Self-developed online water analyzer & automatic fine screen system"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Screening & grit removal",
          "Biological treatment (MBR / MBBR / FMBR)",
          "Secondary clarification/membrane filtration",
          "Disinfection",
          "Sludge handling",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Compliance with pollution norms", "Water reuse for flushing & landscaping", "Reliable long-term performance"],
      },
    },
  },

  {
    id: "ETP-004",
    slug: "effluent-treatment-plant",
    title: "Effluent Treatment Plant (ETP)",
    image: PrdImg4,
    video: PrdVideo4,
    homeSubtitle: "Industrial effluent treatment systems designed to handle complex wastewater streams",
    subtitle:
      "Industrial effluent treatment systems designed to handle complex wastewater streams.",
    svg: "right",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "ETPs engineered to treat industrial wastewater containing chemicals, oils, and high organic loads before discharge or reuse.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Manufacturing units", "Process industries", "Food & packaging plants", "Chemical & pharmaceutical facilities"],
      },
      advantages: {
        title: "Advantages",
        items: ["Customized process design", "Handles variable effluent loads", "Regulatory compliance assured", "Reduced environmental impact"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Effluent collection & equalization",
          "Physico-chemical treatment",
          "Biological treatment",
          "Clarification & filtration",
          "Sludge handling & disposal",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Compliance with discharge norms", "Effective treatment of complex effluents", "Reduced environmental impact", "Stable performance"],
      },
    },
  },

  {
    id: "RO-005",
    slug: "reverse-osmosis-systems",
    title: "Reverse Osmosis (RO) Systems",
    image: PrdImg5,
    video: PrdVideo5,
    homeSubtitle: "Efficient RO systems for delivering safe drinking water and high-purity industrial water",
    subtitle:
      "Efficient RO systems for delivering safe drinking water and high-purity industrial water.",
    svg: "left",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "Membrane-based purification system for removing dissolved salts and contaminants from water.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Homes & residential use", "Offices & commercial spaces", "Industrial process water", "Boiler & cooling systems"],
      },
      advantages: {
        title: "Advantages",
        items: ["High-purity water output", "Compact & scalable design", "Energy-efficient operation", "Low maintenance"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Pre-filtration",
          "RO membrane separation",
          "Permeate collection",
          "Post-treatment & storage",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Safe drinking & process water", "Consistent water quality", "Reduced dissolved solids", "Reliable performance"],
      },
    },
  },

  {
    id: "LRWB-006",
    slug: "lake-revival-water-body-aeration",
    title: "Lake Revival & Water Body Aeration Systems",
    image: PrdImg6,
    video: PrdVideo6,
    homeSubtitle: "Effective aeration and treatment solutions for restoring and maintaining healthy water bodies",
    subtitle:
      "Effective aeration and treatment solutions for restoring and maintaining healthy water bodies.",
    svg: "right",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "Aeration and circulation systems designed to improve oxygen levels, reduce pollutants, and restore ecological balance.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Public parks & lakes", "Residential water bodies", "Decorative ponds", "Urban reservoirs"],
      },
      advantages: {
        title: "Advantages",
        items: ["Improved water quality & clarity", "Reduction in algae and odour", "Eco-friendly treatment", "Low operational cost"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Debris removal",
          "Aeration",
          "Circulation & oxygenation",
          "Optional UV/ozone",
          "Monitoring",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Restored aquatic health", "Reduced pollutants", "Better aesthetics", "Sustainable solution"],
      },
    },
  },

  {
    id: "DRO-007",
    slug: "domestic-ro-systems",
    title: "Domestic RO Systems",
    image: PrdImg7,
    video: "",
    homeSubtitle: "Compact RO systems for safe and reliable drinking water",
    subtitle: "Compact RO systems for safe and reliable drinking water.",
    svg: "right",
    headerIcon: { type: "glass-water", bgColor: "#2563EB", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "Domestic-scale RO systems designed to provide safe, potable water for residential and small commercial use.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Homes", "Small offices", "Residential buildings", "Educational & healthcare institutions"],
      },
      advantages: {
        title: "Advantages",
        items: ["Safe drinking water", "Compact design", "Easy maintenance", "Long-term operational reliability"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: ["Sediment & carbon filtration", "RO membrane purification", "Post-treatment polishing", "Safe water storage"],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Safe drinking water", "Compact & user-friendly design", "Low maintenance"],
      },
    },
  },

  {
    id: "UF-008",
    slug: "ultra-filtration-systems",
    title: "Ultra Filtration (UF) Systems",
    image: PrdImg8,
    video: PrdVideo8,
    homeSubtitle: "UF systems using membrane filtration to remove bacteria, turbidity, and suspended particles",
    subtitle:
      "UF systems using membrane filtration to remove bacteria, turbidity, and suspended particles.",
    svg: "left",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "UF membrane filtration system.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["RO pre-treatment", "Drinking water", "Industrial systems"],
      },
      advantages: {
        title: "Advantages",
        items: ["Chemical-free filtration", "High efficiency", "Consistent performance"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Pre-screening",
          "Membrane filtration",
          "Backwashing",
          "Collection",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Removes bacteria", "Ideal RO pre-treatment", "Consistent output"],
      },
    },
  },

  {
    id: "MBR-009",
    slug: "membrane-bio-reactor",
    title: "Membrane Bio Reactor (MBR)",
    image: PrdImg9,
    video: PrdVideo9,
    homeSubtitle: "Advanced sewage treatment with superior effluent quality and minimal footprint",
    subtitle:
      "Advanced sewage treatment with superior effluent quality and minimal footprint.",
    svg: "right",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "Biological + membrane filtration system.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Space-constrained sites", "Commercial buildings", "Residential projects"],
      },
      advantages: {
        title: "Advantages",
        items: ["High-quality output", "Small footprint", "Less sludge"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Biological treatment",
          "Membrane filtration",
          "Recovery",
          "Sludge handling",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Superior quality", "Reuse-ready", "Compact"],
      },
    },
  },

  {
    id: "MBBR-010",
    slug: "bio-activated-hd-reactor",
    title: "Bio-Activated HD Reactor (B-HD-R)",
    image: PrdImg10,
    video: PrdVideo10,
    homeSubtitle: "Hybrid biological treatment system",
    subtitle: "Hybrid biological treatment system.",
    svg: "left",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "MBBR + HD membrane system.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["STPs", "Reuse systems", "Industrial use"],
      },
      advantages: {
        title: "Advantages",
        items: ["Low power", "Compact", "High quality output"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Bio treatment",
          "Membrane filtration",
          "Mixing",
          "Recovery",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Low sludge", "Reliable", "High efficiency"],
      },
    },
  },

  {
    id: "SMS-012",
    slug: "sequencing-batch-reactor",
    title: "Sequencing Batch Reactor (SBR)",
    image: PrdImg11,
    video: PrdVideo11,
    homeSubtitle: "Batch-based biological treatment system",
    subtitle:
      "Batch-based biological treatment system.",
    svg: "left",
    headerIcon: { type: "flask", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
      whatItIs: {
        title: "What It Is",
        description:
          "Single tank activated sludge system.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Industrial", "Hospitals", "Residential"],
      },
      advantages: {
        title: "Advantages",
        items: ["Automated", "Compact", "High efficiency"],
      },
      processOverview: {
        title: "Treatment Process",
        steps: [
          "Fill",
          "Aeration",
          "Settling",
          "Discharge",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Space-saving", "Stable performance"],
      },
    },
  },

  {
    id: "EQP-013",
    slug: "equipment",
    title: "Equipments",
    image: Equipement1,
    video: "",
    homeSubtitle: "Advanced automation and treatment equipment",
    subtitle:
      "Advanced automation and treatment equipment for water and wastewater treatment systems.",
    svg: "right",
    headerIcon: { type: "settings", bgColor: "#155DFC", iconColor: "#FFFFFF" },
    sections: {
        whatItIs: {
        title: "What It Is",
        description:
          "Specialized equipment and automation systems designed to enhance the efficiency and reliability of water treatment operations.",
      },
      whereItsUsed: {
        title: "Where It's Used",
        items: ["Water treatment plants", "Wastewater facilities", "Industrial processes", "Municipal systems"],
      },
      advantages: {
        title: "Advantages",
        items: ["Advanced automation", "High reliability", "Energy efficient", "Easy maintenance"],
      },
      processOverview: {
        title: "Equipment Features",
        steps: [
          "Automated control systems",
          "Monitoring & sensors",
          "Treatment components",
          "Quality assurance",
        ],
      },
      keyBenefits: {
        title: "Key Benefits",
        items: ["Improved efficiency", "Reduced operational costs", "Enhanced reliability", "Real-time monitoring"],
      },
    },
  },
];

export default ProductsData;
