import { useRef, useMemo, memo } from 'react';
import {
  Client1,
  Client2,
  Client3,
  Client4,
  Client5,
  Client6,
  Client7,
  Client8,
  Client9,
  Client10,
  Client11,
  Client12,
  Client13,
  Client14,
  Client15,
  Client16,
  Client17,
  Client18,
  Client19,
  Client20,
} from '@/assets';
import { OptimizedImage } from '@/components';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Memoized LogoCard component to prevent unnecessary re-renders
const LogoCard = memo(({ logo, keyPrefix }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm w-[160px] h-[120px] md:w-[180px] md:h-[130px] flex items-center justify-center flex-shrink-0 mx-3">
    <OptimizedImage
      src={logo.src}
      alt={logo.alt}
      width={140}
      height={90}
      objectFit="contain"
    />
  </div>
));

LogoCard.displayName = 'LogoCard';

const ClientsSection = () => {
  const containerRef = useRef(null);

  // Memoize logo arrays to prevent recreation on every render
  const row1Logos = useMemo(() => [
    { src: Client1, alt: 'Tata Realty' },
    { src: Client2, alt: 'Mankind' },
    { src: Client3, alt: 'NIMS University' },
    { src: Client4, alt: 'Harvest Gold' },
    { src: Client5, alt: 'Avery Dennison' },
    { src: Client6, alt: 'Oji JK Packaging' },
    { src: Client7, alt: 'Tata Communications' },
  ], []);

  const row2Logos = useMemo(() => [
    { src: Client8, alt: 'Impact Kerala' },
    { src: Client9, alt: 'RUIDP' },
    { src: Client10, alt: 'Assam Cancer Care Foundation' },
    { src: Client11, alt: 'DCSEM' },
    { src: Client12, alt: 'CPWD' },
    { src: Client13, alt: 'Marriott' },
    { src: Client14, alt: 'Client 14' },
    { src: Client15, alt: 'Client 15' },
    { src: Client16, alt: 'Client 16' },
    { src: Client17, alt: 'Client 17' },
    { src: Client18, alt: 'Client 18' },
    { src: Client19, alt: 'Client 19' },
    { src: Client20, alt: 'Client 20' },
  ], []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Selectors
    const header = '.clients-header';
    const subtitle = '.clients-subtitle';
    const note = '.clients-note';

    // Initial States
    if (!prefersReduced) {
      gsap.set([header, subtitle, note], { opacity: 0, y: 20 });
    } else {
      gsap.set([header, subtitle, note], { opacity: 0 });
    }

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      const { isDesktop } = context.conditions;

      // Adjust initial Y for mobile
      if (!prefersReduced && !isDesktop) {
        gsap.set([header, subtitle, note], { y: 12 });
      }

      // Main Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      });

      if (!prefersReduced) {
        tl.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        })
          .to(subtitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.6")
          .to(note, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.4");
      } else {
        // Reduced Motion
        tl.to(header, { opacity: 1, duration: 0.6 })
          .to(subtitle, { opacity: 1, duration: 0.6 }, "-=0.4")
          .to(note, { opacity: 1, duration: 0.6 }, "-=0.4");
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="clients-section relative w-full px-4 py-16 overflow-hidden md:px-8 md:py-20">
      {/* CSS Animations */}
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scrollLeft 30s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scrollRight 30s linear infinite;
        }
        
        .logo-row:hover .animate-scroll-left,
        .logo-row:hover .animate-scroll-right {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="clients-header mb-4 text-3xl font-bold md:text-4xl text-slate-900">
            Our Esteemed Clients
          </h2>
          <p className="clients-subtitle max-w-2xl mx-auto text-base leading-relaxed md:text-lg text-slate-500">
            Trusted by industry leaders across multiple sectors for reliable and sustainable water solutions
          </p>
        </div>

        {/* Logo Rows Container */}
        <div className="space-y-6">
          {/* Row 1 - Scrolling Right to Left */}
          <div className="overflow-hidden logo-row">
            <div className="flex animate-scroll-left w-max">
              {/* Original logos */}
              {row1Logos.map((logo, index) => (
                <LogoCard key={`row1-${index}`} logo={logo} />
              ))}
              {/* Duplicated logos for seamless loop */}
              {row1Logos.map((logo, index) => (
                <LogoCard key={`row1-dup-${index}`} logo={logo} />
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolling Left to Right */}
          <div className="overflow-hidden logo-row">
            <div className="flex animate-scroll-right w-max">
              {/* Original logos */}
              {row2Logos.map((logo, index) => (
                <LogoCard key={`row2-${index}`} logo={logo} />
              ))}
              {/* Duplicated logos for seamless loop */}
              {row2Logos.map((logo, index) => (
                <LogoCard key={`row2-dup-${index}`} logo={logo} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="clients-note mt-10 text-sm text-center text-slate-500">
          And many more across the world...
        </p>
      </div>
    </section>
  );
};

export default ClientsSection;
