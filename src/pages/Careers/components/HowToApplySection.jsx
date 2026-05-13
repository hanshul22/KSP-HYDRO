import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { howToApplyData } from '@/data/careersData';

gsap.registerPlugin(ScrollTrigger);

const HowToApplySection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const header = '.apply-header';
    const intro = '.apply-intro';
    const steps = gsap.utils.toArray('.apply-step');
    const footer = '.apply-footer';

    if (!prefersReduced) {
      gsap.set([header, intro, footer], { opacity: 0, y: 20 });
      gsap.set(steps, { opacity: 0, y: 24 });
    } else {
      gsap.set([header, intro, ...steps, footer], { opacity: 0 });
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
          .to(intro, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
          .to(steps, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out' }, '-=0.4')
          .to(footer, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');
      } else {
        tl.to([header, intro], { opacity: 1, duration: 0.6 })
          .to(steps, { opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.3')
          .to(footer, { opacity: 1, duration: 0.6 }, '-=0.2');
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="careers-form"
      ref={containerRef}
      className="relative w-full px-4 py-16 md:px-8 md:py-20"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="apply-header mb-8 text-center">
          <h2 className="text-3xl font-bold md:text-4xl text-slate-900">
            {howToApplyData.title}
          </h2>
        </div>

        {/* Intro Paragraphs */}
        <div className="apply-intro mb-10 space-y-3 text-center">
          {howToApplyData.intro.map((text, index) => (
            <p key={index} className="text-base md:text-lg leading-relaxed text-slate-600">
              {text}
            </p>
          ))}
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-2">
          {howToApplyData.steps.map((step) => (
            <div
              key={step.id}
              className={`apply-step p-6 rounded-xl border ${step.bgColor} ${step.borderColor}`}
            >
              <div className="flex items-start gap-4">
                <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${step.numberColor}`}>
                  {step.id}
                </span>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                  {step.email && (
                    <a
                      href={`mailto:${step.email}`}
                      className="inline-block mt-1 text-sm font-medium text-cyan-600 hover:text-cyan-700 underline underline-offset-2"
                    >
                      {step.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="apply-footer text-sm text-center text-slate-500">
          {howToApplyData.footerText}
        </p>
      </div>
    </section>
  );
};

export default HowToApplySection;
