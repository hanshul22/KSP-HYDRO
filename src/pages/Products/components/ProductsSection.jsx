import { useRef } from 'react';
import {
  Droplets,
  CheckCircle,
  Filter,
  Recycle,
  FlaskConical,
  Layers,
  GlassWater,
  SlidersHorizontal,
  Cpu,
  RefreshCw,
  Activity,
  Settings,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ProductsData from '@/data/ProductsData';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping based on headerIcon.type
const iconMap = {
  'droplets': Droplets,
  'filter': Filter,
  'recycle': Recycle,
  'flask': FlaskConical,
  'layers': Layers,
  'glass-water': GlassWater,
  'sliders': SlidersHorizontal,
  'cpu': Cpu,
  'refresh': RefreshCw,
  'activity': Activity,
  'settings': Settings,
};

const ProductSection = ({ product }) => {
  const containerRef = useRef(null);
  const IconComponent = iconMap[product.headerIcon.type] || Droplets;
  const { sections } = product;
  
  // Check if product has a video
  const hasVideo = product.video && product.video !== "";

  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Elements
    const header = containerRef.current.querySelector('.product-header');
    const headerIcon = containerRef.current.querySelector('.header-icon');
    const headerTitle = containerRef.current.querySelector('.header-title');
    const headerSubtitle = containerRef.current.querySelector('.header-subtitle');
    const mediaCard = containerRef.current.querySelector('.media-showcase-card');
    const cards = gsap.utils.toArray('.info-card');
    const processSection = containerRef.current.querySelector('.process-section-container');
    const processTitle = containerRef.current.querySelector('.process-title');
    const processSteps = gsap.utils.toArray('.process-step');
    const benefitsCard = containerRef.current.querySelector('.benefits-card');


    // No background fade-in animation (static)
    gsap.set(containerRef.current, { opacity: 1 });

    if (prefersReduced) {
      // Reduced Motion: Simple Fades
      ScrollTrigger.batch([header, mediaCard, ...cards, processSection, benefitsCard], {
        onEnter: (elements) => gsap.to(elements, { opacity: 1, duration: 0.5, stagger: 0.1 }),
        start: "top 85%"
      });
      return;
    }

    // 1. Header Animation (Group)
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: "top 85%",
        toggleActions: "play reverse play reverse"
      }
    });

    headerTl.fromTo(header,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    )
      .from(headerIcon, { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.6")
      .from([headerTitle, headerSubtitle], { y: 10, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, "-=0.4");

    // Media Card Animation
    gsap.fromTo(mediaCard,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: mediaCard,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 2. Info Cards Animation
    mm.add("(min-width: 768px)", () => {
      // Desktop
      gsap.fromTo(cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile
      gsap.fromTo(cards,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cards[0],
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    });

    // 3. Process Section Animation
    const processTl = gsap.timeline({
      scrollTrigger: {
        trigger: processSection,
        start: "top 80%",
        toggleActions: "play reverse play reverse"
      }
    });

    processTl.fromTo(processSection,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    )
      .fromTo(processTitle,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(processSteps,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

    // 4. Key Benefits Card Animation
    gsap.fromTo(benefitsCard,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2, // Slight delay
        scrollTrigger: {
          trigger: benefitsCard,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );



  }, { scope: containerRef });

  // Micro Interactions (Context Safe)
  const handleCardHover = contextSafe((e) => {
    if (window.innerWidth < 768) return;
    gsap.to(e.currentTarget, {
      y: -3,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: true
    });
  });

  const handleCardLeave = contextSafe((e) => {
    if (window.innerWidth < 768) return;
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: true
    });
  });

  const handleIconHover = contextSafe((e) => {
    if (window.innerWidth < 768) return;
    const icon = e.currentTarget.querySelector('.header-icon-svg');
    gsap.to(e.currentTarget, { y: -2, duration: 0.2, ease: "power2.out", overwrite: true });
    if (icon) gsap.to(icon, { scale: 1.05, duration: 0.2, ease: "power2.out", overwrite: true });
  });

  const handleIconLeave = contextSafe((e) => {
    if (window.innerWidth < 768) return;
    const icon = e.currentTarget.querySelector('.header-icon-svg');
    gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out", overwrite: true });
    if (icon) gsap.to(icon, { scale: 1, duration: 0.2, ease: "power2.out", overwrite: true });
  });

  const handleProcessHover = contextSafe((e) => {
    if (window.innerWidth < 768) return;
    const text = e.currentTarget.querySelector('.process-text');
    if (text) gsap.to(text, { x: 4, duration: 0.3, ease: "power2.out", overwrite: true });
  });

  const handleProcessLeave = contextSafe((e) => {
    if (window.innerWidth < 768) return;
    const text = e.currentTarget.querySelector('.process-text');
    if (text) gsap.to(text, { x: 0, duration: 0.3, ease: "power2.out", overwrite: true });
  });

  return (
    <section ref={containerRef} id={product.slug} className="product-section relative py-12 md:py-20 md:mb-20">

      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ">
        {/* Section Header */}
        <div className="product-header mb-12 text-center opacity-0">
          {/* Icon */}
          <div
            className="header-icon inline-flex items-center justify-center mb-6 w-14 h-14 rounded-xl cursor-default"
            style={{ backgroundColor: product.headerIcon.bgColor }}
            onMouseEnter={handleIconHover}
            onMouseLeave={handleIconLeave}
          >
            <IconComponent className="header-icon-svg text-white w-7 h-7 transition-none" />
          </div>

          <h2 className="header-title text-3xl md:text-4xl font-bold text-[#0A1628] mb-4">
            {product.title}
          </h2>
          <p className="header-subtitle max-w-2xl mx-auto text-base text-gray-500 md:text-lg">
            {product.subtitle}
          </p>
        </div>

        {/* Media (Video/Image) Showcase Card */}
        <div className="media-showcase-card relative w-full mb-12 rounded-xl overflow-hidden shadow-2xl opacity-0">
          <div className="aspect-[21/9] w-full relative">
            {hasVideo ? (
              <video
                src={product.video}
                poster={product.image}
                controls
                controlsList="nodownload"
                playsInline
                className="w-full h-full object-cover bg-black"
              />
            ) : (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Top Information Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          {/* Card 1 - What It Is */}
          <div
            className="info-card p-6 bg-white border border-gray-200 rounded-2xl shadow-lg opacity-0 cursor-default"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <h3 className="text-lg font-semibold text-[#0A1628] mb-3">{sections.whatItIs.title}</h3>
            <p className="text-sm leading-relaxed text-gray-600">
              {sections.whatItIs.description}
            </p>
          </div>

          {/* Card 2 - Where It's Used */}
          <div
            className="info-card p-6 bg-white border border-gray-200 rounded-2xl shadow-lg opacity-0 cursor-default"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <h3 className="text-lg font-semibold text-[#0A1628] mb-3">{sections.whereItsUsed.title}</h3>
            <ul className="space-y-2">
              {sections.whereItsUsed.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3 - Advantages */}
          <div
            className="info-card p-6 bg-white border border-gray-200 rounded-2xl shadow-lg opacity-0 cursor-default"
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardLeave}
          >
            <h3 className="text-lg font-semibold text-[#0A1628] mb-3">{sections.advantages.title}</h3>
            <ul className="space-y-2">
              {sections.advantages.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#155DFC] flex-shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Overview & Benefits Section - Two Separate Boxes */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left Box - Treatment Process */}
          <div className="process-section-container p-6 bg-white border border-gray-200 rounded-2xl shadow-lg opacity-0">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-[#155DFC]" />
              <h3 className="process-title text-lg font-semibold text-[#0A1628]">
                {sections.processOverview.title}
              </h3>
            </div>

            <ul className="space-y-3">
              {sections.processOverview.steps.map((step, index) => (
                <li
                  key={index}
                  className="process-step flex items-center gap-3 opacity-0 cursor-default"
                  onMouseEnter={handleProcessHover}
                  onMouseLeave={handleProcessLeave}
                >
                  <span className="flex items-center justify-center w-6 h-6 bg-[#155DFC] text-white text-xs font-bold rounded-full flex-shrink-0 transition-transform duration-300">
                    {index + 1}
                  </span>
                  <span className="process-text text-sm text-gray-600 transition-transform duration-300">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Box - Key Benefits */}
          <div className="benefits-card p-6 bg-[#F0F9FF] border border-gray-200 rounded-2xl shadow-lg opacity-0">
            <h3 className="text-lg font-semibold text-[#0A1628] mb-4">{sections.keyBenefits.title}</h3>
            <ul className="space-y-4">
              {sections.keyBenefits.items.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-semibold text-[#0A1628] block">
                      {benefit}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProductsSection = () => {
  return (
    <>
      {ProductsData.filter(product => product.slug !== 'equipment').map((product) => (
        <ProductSection key={product.id} product={product} />
      ))}
    </>
  );
};

export default ProductsSection;
