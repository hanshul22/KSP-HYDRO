import { useRef } from 'react';
import { Settings, Zap, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Equipement1, Equipement2, Equipement3, Equipement4, Equipement5, Equipement6, Equipement7 } from '@/assets';

gsap.registerPlugin(ScrollTrigger);

const equipments = [
  {
    id: 1,
    badge: "Equipment #1",
    title: "AutoScreen",
    subtitle: "Advanced Rotary Drum Fine Screen System",
    description: "The Rotary Drum Fine Screen is a highly efficient, automated screening solution designed for removing fine suspended solids and debris from wastewater. Engineered with precision, this system features a rotating drum mechanism with fine mesh screens that capture particles as small as 0.5mm. The self-cleaning design ensures continuous operation with minimal maintenance, making it ideal for municipal and industrial wastewater treatment plants.",
    features: [
      "Self-cleaning mechanism",
      "Fine mesh screening (0.5mm)",
      "Corrosion-resistant materials",
      "Low power consumption"
    ],
    image: Equipement1,
    isReversed: false,
    badgeText: "Product",
    isVideo: false
  },
  {
    id: 2,
    badge: "Equipment #2",
    title: "OLMS (Online Monitoring System)",
    subtitle: "Real-Time Water Quality Analysis",
    description: "An online water analyser is a device designed for continuous, real-time monitoring of water quality parameters in treatment plants. This intelligent system measures critical parameters including pH, turbidity, dissolved oxygen, conductivity, and total suspended solids. The OLMS provides instant data transmission to control rooms, enabling operators to make informed decisions quickly and ensure compliance with regulatory standards. With built-in alarms and data logging capabilities, it serves as the central nervous system of modern water treatment facilities.",
    features: [
      "Multi-parameter monitoring",
      "Real-time data transmission",
      "Automated alerts",
      "Cloud connectivity"
    ],
    image: Equipement2,
    isReversed: true,
    badgeText: "Product",
    isVideo: false
  },
  {
    id: 3,
    badge: "Equipment #3",
    title: "IoT Controller for Automation",
    subtitle: "Intelligent Water Treatment Automation",
    description: "The Automatic Water Monitoring Controller is an intelligent system designed to automate the entire water treatment process. This IoT-enabled controller integrates sensors, actuators, and cloud connectivity to provide complete automation of pumps, valves, chemical dosing, and treatment sequences. The system features remote monitoring through mobile apps, predictive maintenance alerts, energy optimization algorithms, and comprehensive data analytics. It reduces manual intervention by 80% while improving treatment efficiency and reducing operational costs.",
    features: [
      "IoT-enabled automation",
      "Remote monitoring & control",
      "Predictive maintenance",
      "Energy optimization"
    ],
    image: Equipement3,
    isReversed: false,
    badgeText: "Video Demo",
    isVideo: true
  },
  {
    id: 4,
    badge: "Equipment #4",
    title: "Decanters",
    subtitle: "Efficient Clarified Water Separation",
    description: "Decanters are devices used to separate and remove clarified water from the top layer of settlement tanks in sewage treatment plants. Our decanter systems feature precision-engineered arms with adjustable weir plates that skim the clear effluent while preventing disturbed sludge from being carried over. The motorized rotation mechanism ensures uniform collection across the entire tank surface. Constructed from corrosion-resistant materials, these decanters are designed for long-term reliability in harsh wastewater environments.",
    features: [
      "Adjustable weir plates",
      "Motorized rotation",
      "Corrosion-resistant construction",
      "Uniform collection"
    ],
    image: Equipement4,
    isReversed: true,
    badgeText: "Product",
    isVideo: false
  },
  {
    id: 5,
    badge: "Equipment #5",
    title: "Pumping Systems",
    subtitle: "High-Performance Water Transfer Solutions",
    description: "The Pumping System by KSP Hydro Engineers Pvt. Ltd. encompasses a comprehensive range of centrifugal, submersible, and dosing pumps engineered for water and wastewater applications. Our systems are designed for optimal hydraulic efficiency, minimal energy consumption, and maximum reliability. Each pumping system is custom-configured based on flow requirements, head calculations, and site conditions. Features include VFD integration for variable speed control, soft-start mechanisms, dry-run protection, and automated switching between duty and standby pumps.",
    features: [
      "Variable speed control",
      "Energy-efficient operation",
      "Automated duty-standby switching",
      "Dry-run protection"
    ],
    image: Equipement5,
    isReversed: false,
    badgeText: "Product",
    isVideo: false
  },
  {
    id: 6,
    badge: "Equipment #6",
    title: "OWC (Organic Waste Converter)",
    subtitle: "Sustainable Organic Waste Management",
    description: "Organic waste composters are automated systems designed to convert organic waste into nutrient-rich compost through accelerated aerobic decomposition. The OWC system features temperature-controlled chambers, automated mixing mechanisms, and odor control systems. It processes kitchen waste, garden waste, and organic sludge, reducing waste volume by up to 80% within 24 hours. The output compost can be used as fertilizer, promoting circular economy principles. Ideal for hotels, residential complexes, commercial kitchens, and institutional facilities.",
    features: [
      "24-hour composting cycle",
      "80% volume reduction",
      "Odor control system",
      "Automated operation"
    ],
    image: Equipement6,
    isReversed: true,
    badgeText: "Product",
    isVideo: false
  },
  {
    id: 7,
    badge: "Equipment #7",
    title: "DAF System (Dissolved Air Flotation)",
    subtitle: "Advanced Solid-Liquid Separation",
    description: "The DAF (Dissolved Air Flotation) System is an advanced clarification technology that removes suspended solids, oils, and greases from wastewater through the principle of flotation. Micro air bubbles are generated and mixed with wastewater, attaching to suspended particles and causing them to float to the surface where they are skimmed off. The SBR Decanter Arm is a key component in sequential batch reactor systems, providing precise control over the decanting process. Our DAF systems achieve removal efficiencies of up to 95% for suspended solids and are widely used in industrial effluent treatment, food processing, and oil refineries.",
    features: [
      "95% removal efficiency",
      "Compact footprint",
      "Low chemical consumption",
      "Automated sludge removal"
    ],
    image: Equipement7,
    isReversed: false,
    badgeText: "Video Demo",
    isVideo: true
  }
];

const EquipmentItem = ({ equip }) => {
  const itemRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from(itemRef.current.querySelector('.equip-card'), {
      x: equip.isReversed ? 50 : -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    })
    .from(itemRef.current.querySelector('.equip-content'), {
      x: equip.isReversed ? -50 : 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8");
  }, { scope: itemRef });

  return (
    <div ref={itemRef} className={`flex flex-col ${equip.isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-6 lg:gap-10 mb-16 last:mb-0`}>
      {/* Image/Video Card */}
      <div className="equip-card lg:flex-[0_0_42%] relative w-full">
        <div className="rounded-xl overflow-hidden shadow-lg bg-slate-50 relative">
          {equip.isVideo ? (
            <video
              src={equip.image}
              controls
              controlsList="nodownload"
              playsInline
              className="w-full h-full aspect-video object-cover bg-black"
            />
          ) : (
            <img
              src={equip.image}
              alt={equip.title}
              className="w-full h-full aspect-video object-cover"
            />
          )}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-[#0076df] text-white px-4 py-1.5 rounded-md text-xs font-bold shadow-lg">
              {equip.badgeText}
            </span>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="equip-content lg:flex-[0_0_58%] w-full">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0076df] text-white rounded-full text-xs font-bold mb-4 shadow-lg shadow-blue-100">
          <Zap className="w-3 h-3 fill-white" />
          {equip.badge}
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-[#0A1628] mb-0.5 tracking-tight">{equip.title}</h3>
        <h4 className="text-sm font-bold text-[#0076df] mb-3">{equip.subtitle}</h4>

        <div className="bg-white rounded-xl p-4 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100/50">
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-5">
            {equip.description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 rounded-full bg-[#10b981] flex items-center justify-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-[#0A1628] text-base">Key Features</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {equip.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 py-2 px-3 bg-[#f0fdf4] rounded-lg border border-[#dcfce7]">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981] flex-shrink-0" />
                  <span className="text-[13px] font-semibold text-[#1e293b]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EquipmentsSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.section-title-area', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="section-title-area text-center mb-20">
          <div className="inline-flex items-center justify-center p-3.5 bg-[#0076df] rounded-xl mb-6 shadow-xl shadow-blue-100">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
            Equipments
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Advanced automation and treatment equipment engineered for reliability and performance
          </p>
        </div>

        {/* Equipments List */}
        <div className="space-y-20">
          {equipments.map((equip) => (
            <EquipmentItem key={equip.id} equip={equip} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentsSection;
