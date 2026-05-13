import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { careersBenefitsData } from '@/data/careersData';

gsap.registerPlugin(ScrollTrigger);

const WhyWorkWithUsSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const header = '.why-header';
    const cards = gsap.utils.toArray('.benefit-card');

    if (!prefersReduced) {
      gsap.set(header, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 24 });
    } else {
      gsap.set([header, ...cards], { opacity: 0 });
    }

    mm.add({
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)'
    }, (context) => {
      const { isDesktop } = context.conditions;

      if (!prefersReduced && !isDesktop) {
        gsap.set(header, { y: 12 });
        gsap.set(cards, { y: 14 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        }
      });

      if (!prefersReduced) {
        tl.to(header, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
          .to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power2.out'
          }, '-=0.4');
      } else {
        tl.to(header, { opacity: 1, duration: 0.6 })
          .to(cards, { opacity: 1, duration: 0.6, stagger: 0.1 }, '-=0.3');
      }

      if (isDesktop && !prefersReduced) {
        cards.forEach((card) => {
          const icon = card.querySelector('.benefit-icon');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -4, duration: 0.3, ease: 'power2.out', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' });
            if (icon) gsap.to(icon, { y: -3, scale: 1.05, duration: 0.3, ease: 'power2.out' });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' });
            if (icon) gsap.to(icon, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
          });
        });
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full px-4 py-16 md:px-8 md:py-20">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="why-header mb-12 text-center">
          <h2 className="text-3xl font-bold md:text-4xl text-slate-900">
            {careersBenefitsData.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {careersBenefitsData.benefits.map((benefit, index) => (
            <article
              key={index}
              className="benefit-card p-6 text-center bg-white shadow-sm rounded-xl transition-shadow"
            >
              <div className={`benefit-icon flex items-center justify-center mx-auto mb-4 w-14 h-14 rounded-xl ${benefit.iconBgColor}`}>
                <benefit.icon className={`w-7 h-7 ${benefit.iconColor}`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-900">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWorkWithUsSection;
