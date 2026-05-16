import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import aboutImage from '@/assets/images/about.webp';
import { OptimizedImage } from '@/components';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutData } from '@/data/homeData';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      const { isDesktop, reduceMotion } = context.conditions;

      if (reduceMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // 1. SECTION ENTRY (Container)
      tl.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }
      )

        // 2. SECTION LABEL
        .fromTo('.about-label',
          { y: isDesktop ? 20 : 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )

        // 3. MAIN HEADING (Line-by-line)
        .fromTo('.about-heading-line',
          { y: isDesktop ? 30 : 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
          },
          "-=0.4"
        )

        // 4. DESCRIPTION PARAGRAPH
        .fromTo('.about-desc',
          { y: isDesktop ? 20 : 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        )

        // 5. CTA BUTTON
        .fromTo('.about-cta',
          {
            y: isDesktop ? 20 : 10,
            opacity: 0,
            scale: isDesktop ? 0.95 : 1 // Mobile: No scale
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
          },
          "-=0.6"
        )

        // 6. IMAGE (Bottom/Left)
        .fromTo('.about-image',
          {
            scale: 0.96,
            opacity: 0,
            y: isDesktop ? 20 : 0 // Mobile: No vertical movement
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
          },
          "-=0.4"
        );

    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-0 md:py-24 opacity-0">
      <div className="px-4 mx-auto max-w-7xl md:px-8">
        {/* Mobile Layout */}
        <div className="relative block md:hidden">
          {/* Mobile Background Shape - Fixed positioning */}
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-screen overflow-hidden -z-10" style={{ height: '461px' }}>
            <svg
              viewBox="0 0 375 461"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 left-0 w-full"
              style={{ minHeight: '461px' }}
            >
              <path
                d="M328.685 445.968C346.5 433.12 365.5 435 374.5 458V142.5C352.359 147.063 340.705 120.507 339.44 108.34C339.44 28.6596 208.912 54.6477 203.429 54.6477C125.407 57.805 23.2887 51.2958 -1 0V249.779C5.5791 292.971 16.5 338.5 30.5 358.5C36.1 366.5 81.5895 414.03 123.088 386.655C164.587 359.28 193.94 385.388 203.429 401.864C242.904 480.948 303.381 464.218 328.685 445.968Z"
                fill="#EFFEEF"
              />
            </svg>
          </div>

          {/* Mobile Content - Centered */}
          <div className="relative z-10 flex flex-col items-center px-2 pt-12 pb-12 text-center">
            {/* Label */}
            <span className="mb-4 text-lg font-bold tracking-widest text-blue-600 uppercase about-label">
              {aboutData.label}
            </span>

            {/* Heading - Larger and bolder */}
            <h2 className="text-[2.6rem] font-bold leading-[1.1] text-gray-900 mb-6 w-full">
              {aboutData.headingLines.map((line, idx) => (
                <span key={idx} className="block about-heading-line">{line}</span>
              ))}
            </h2>

            {/* Description - Larger text */}
            <p className="text-xl leading-relaxed text-slate-600 w-full mb-8 about-desc">
              {aboutData.description}
            </p>

            {/* CTA Button */}
            <Link
              to={aboutData.cta.link}
              className="inline-flex items-center gap-2 px-6 py-2 text-xl text-blue-600 transition-all bg-white border-2 border-blue-600 rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mb-12 shadow-sm about-cta"
            >
              {aboutData.cta.text}
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* Image - Added for mobile */}
            <div className="w-full px-0 about-image">
              <OptimizedImage
                src={aboutImage}
                alt="Aerial view of wastewater treatment tanks at KSP Hydro Engineers facility"
                width={400}
                height={400}
                responsive={true}
                sizes="(max-width: 768px) 100vw, 400px"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Desktop Layout - Unchanged */}
        <div className="items-center hidden gap-8 md:grid lg:grid-cols-2 lg:gap-12">
          {/* Left Side - Image */}
          <div className="relative about-image">
            <OptimizedImage
              src={aboutImage}
              alt="Aerial view of wastewater treatment tanks at KSP Hydro Engineers facility"
              width={600}
              height={400}
              responsive={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side - Content */}
          <div className="space-y-6">
            {/* Label */}
            <div className="text-sm font-semibold tracking-wide text-blue-600 uppercase about-label">
              {aboutData.label}
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl about-heading-line">
              {aboutData.headingLines.join(" ")}
            </h2>

            {/* Description */}
            <p className="text-base leading-relaxed md:text-lg text-slate-600 about-desc">
              {aboutData.description}
            </p>

            {/* CTA Button */}
            <div className="pt-2 about-cta">
              <Link
                to={aboutData.cta.link}
                className="inline-flex items-center gap-2 px-4 py-2 font-medium text-blue-600 transition-all bg-white border-2 border-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                {aboutData.cta.text}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
