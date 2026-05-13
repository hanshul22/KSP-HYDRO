import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { careersCultureData } from '@/data/careersData';

gsap.registerPlugin(ScrollTrigger);

const CultureSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const header = '.culture-header';
    const paragraphs = gsap.utils.toArray('.culture-paragraph');

    if (!prefersReduced) {
      gsap.set(header, { opacity: 0, y: 20 });
      gsap.set(paragraphs, { opacity: 0, y: 16 });
    } else {
      gsap.set([header, ...paragraphs], { opacity: 0 });
    }

    mm.add({
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)'
    }, () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      });

      if (!prefersReduced) {
        tl.to(header, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
          .to(paragraphs, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out'
          }, '-=0.4');
      } else {
        tl.to(header, { opacity: 1, duration: 0.6 })
          .to(paragraphs, { opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.3');
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full px-4 py-16 md:px-8 md:py-20">
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="culture-header mb-10 text-center">
          <h2 className="text-3xl font-bold md:text-4xl text-slate-900">
            {careersCultureData.title}
          </h2>
        </div>

        <div className="space-y-5">
          {careersCultureData.content.map((paragraph, index) => (
            <p
              key={index}
              className="culture-paragraph text-base md:text-lg leading-relaxed text-slate-600 text-center"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
