import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { careersHeroData } from '@/data/careersData';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const title = '.careers-title';
    const subtitle = '.careers-subtitle';
    const cta = '.careers-cta';

    gsap.set([title, subtitle, cta], { opacity: 0 });

    if (prefersReduced) {
      gsap.to([title, subtitle, cta], { opacity: 1, duration: 0.8, stagger: 0.2 });
      return;
    }

    mm.add({
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)'
    }, (context) => {
      const { isDesktop } = context.conditions;
      const yTitle = isDesktop ? 24 : 14;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          toggleActions: 'play reverse play reverse'
        }
      });

      tl.fromTo(title,
        { y: yTitle, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power2.out' }
      )
        .fromTo(subtitle,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
          '-=0.8'
        )
        .fromTo(cta,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        );
    });
  }, { scope: containerRef });

  const scrollToForm = () => {
    const formEl = document.getElementById('careers-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="careers-hero w-full pt-60 pb-24 flex items-center justify-center px-6 relative overflow-hidden min-h-[60vh]"
    >
      <div className="max-w-[1100px] w-full text-center relative z-10">
        <h1 className="careers-title text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
          {careersHeroData.title}
        </h1>
        <p className="careers-subtitle text-base md:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto mb-8">
          {careersHeroData.description}
        </p>
        <button
          onClick={scrollToForm}
          className="careers-cta inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
        >
          {careersHeroData.ctaText}
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
