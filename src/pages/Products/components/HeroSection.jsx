import { useState, useRef } from 'react';
import {
  Waves,
  Filter,
  Recycle,
  FlaskConical,
  Layers,
  GlassWater,
  SlidersHorizontal,
  Cpu,
  RefreshCw,
  Activity,
  Settings
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { icon: Waves, label: 'Swimming Pool', slug: 'swimming-pool-lake-revival' },
  { icon: Filter, label: 'Watertreatment Plant', slug: 'water-treatment-plant' },
  { icon: Recycle, label: 'Sewage Treatment', slug: 'sewage-treatment-plant' },
  { icon: FlaskConical, label: 'Effluent Treatment', slug: 'effluent-treatment-plant' },
  { icon: Layers, label: 'Reverse Osmosis', slug: 'industrial-reverse-osmosis' },
  { icon: GlassWater, label: 'Domestic RO', slug: 'domestic-ro-systems' },
  { icon: SlidersHorizontal, label: 'Ultra Filteration', slug: 'ultra-filtration-systems' },
  { icon: Cpu, label: 'Membrane Bio Reactor', slug: 'membrane-bio-reactor' },
  { icon: RefreshCw, label: 'Moving Bed Reactor', slug: 'moving-bed-bio-reactor' },
  { icon: Activity, label: 'Fluidized Media Reactor', slug: 'fluidized-media-bio-reactor' },
  { icon: Settings, label: 'Mechanical System', slug: 'specialised-mechanical-systems' },
];

const HeroSection = () => {
  const containerRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const isFirstRender = useRef(true);

  const { contextSafe } = useGSAP(() => {
    // Scroll Reveal Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play reverse play reverse"
      }
    });

    // 1. Heading + Subtitle
    tl.from(".products-title", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })
      .from(".products-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6");

    // 2. Filter Pills (Initial Reveal)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop
      tl.from(".filter-pill", {
        y: 16,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.2)"
      }, "-=0.4");
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile
      tl.from(".filter-pill", {
        y: 10,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");
    });

  }, { scope: containerRef });

  const scrollToSection = (slug) => {
    setActiveCategory(slug);

    // Reset active category after a short delay to revert color
    setTimeout(() => {
      setActiveCategory(null);
    }, 800);

    const element = document.getElementById(slug);
    if (element) {
      const headerOffset = 100; // Adjust for fixed header
      
      // Wrap getBoundingClientRect in requestAnimationFrame to batch layout reads
      requestAnimationFrame(() => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      });
    }
  };

  // Micro Interactions
  const handleMouseEnter = contextSafe((e, slug) => {
    if (activeCategory === slug) return; // Don't animate hover if active
    if (window.matchMedia("(max-width: 767px)").matches) return; // Disable on mobile

    const target = e.currentTarget;
    const icon = target.querySelector('.filter-icon');

    gsap.to(target, {
      y: -2,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      borderColor: "#BFDBFE", // blue-200
      opacity: 1,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true
    });

    if (icon) {
      gsap.to(icon, {
        y: -2,
        scale: 1.05,
        color: "#2563EB", // blue-600
        duration: 0.2,
        ease: "power2.out",
        overwrite: true
      });
    }
  });

  const handleMouseLeave = contextSafe((e, slug) => {
    if (activeCategory === slug) return; // Don't reset if active
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const target = e.currentTarget;
    const icon = target.querySelector('.filter-icon');

    gsap.to(target, {
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      borderColor: "#F3F4F6", // gray-100
      backgroundColor: "#FFFFFF",
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
      overwrite: true
    });

    if (icon) {
      gsap.to(icon, {
        y: 0,
        scale: 1,
        color: "#6B7280", // gray-500
        duration: 0.25,
        ease: "power2.out",
        overwrite: true
      });
    }
  });

  // Handle Active State Animation
  useGSAP(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const pills = gsap.utils.toArray('.filter-pill');

    pills.forEach((pill) => {
      const slug = pill.getAttribute('data-slug');
      const icon = pill.querySelector('.filter-icon');
      const label = pill.querySelector('.filter-label');

      if (slug === activeCategory) {
        // Animate IN (Active)
        gsap.to(pill, {
          backgroundColor: "#2563EB", // blue-600
          borderColor: "#2563EB",
          y: -2,
          boxShadow: "0 10px 15px -3px rgba(37, 99, 235, 0.2), 0 4px 6px -2px rgba(37, 99, 235, 0.1)",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true
        });

        if (icon) {
          gsap.to(icon, {
            color: "#FFFFFF",
            y: -2,
            scale: 1.05,
            duration: 0.3,
            overwrite: true
          });
        }

        if (label) {
          gsap.to(label, {
            color: "#FFFFFF",
            duration: 0.3,
            overwrite: true
          });
        }
      } else {
        // Animate OUT (Inactive)
        gsap.to(pill, {
          backgroundColor: "#FFFFFF",
          borderColor: "#F3F4F6", // gray-100
          y: 0,
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true
        });

        if (icon) {
          gsap.to(icon, {
            color: "#6B7280", // gray-500
            y: 0,
            scale: 1,
            duration: 0.3,
            overwrite: true
          });
        }

        if (label) {
          gsap.to(label, {
            color: "#0A1628",
            duration: 0.3,
            overwrite: true
          });
        }
      }
    });
  }, [activeCategory]); // Re-run when activeCategory changes

  return (
    <section ref={containerRef} className="products-section relative pt-40 pb-12 md:pt-60 md:pb-28 overflow-hidden min-h-[50vh] md:min-h-[80vh] flex items-center">
      {/* Background wave image */}


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Hero Content */}
        <div className="text-center mb-10 md:mb-20">
          <h1 className="products-title text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1628] mb-6">
            Our Products
          </h1>
          <p className="products-subtitle text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive water treatment and infrastructure solutions engineered for excellence
          </p>
        </div>

        {/* Category Pills - Hidden on Mobile */}
        <div className="hidden md:flex flex-wrap justify-center gap-4 mt-auto">
          {categories.map((category, index) => (
            <button
              key={index}
              data-slug={category.slug}
              onClick={() => scrollToSection(category.slug)}
              onMouseEnter={(e) => handleMouseEnter(e, category.slug)}
              onMouseLeave={(e) => handleMouseLeave(e, category.slug)}
              onFocus={(e) => handleMouseEnter(e, category.slug)}
              onBlur={(e) => handleMouseLeave(e, category.slug)}
              className="filter-pill flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100 cursor-pointer outline-none"
              aria-label={`Filter by ${category.label}`}
              aria-pressed={activeCategory === category.slug}
            >
              <category.icon className="filter-icon w-5 h-5 text-gray-500 transition-none" />
              <span className="filter-label text-sm font-medium text-[#0A1628] transition-none">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
