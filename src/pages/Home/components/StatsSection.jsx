import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StatsImg1, StatsImg2 } from '@/assets';
import { OptimizedImage } from '@/components';

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    });

    tl.from('.stat-number', {
      scale: 0.8,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })
    .from('.stat-description', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.5")
    .from('.social-btn', {
      x: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.3");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-2 md:py-4 bg-transparent relative z-10 overflow-hidden md:overflow-visible">
      <div className="max-w-4xl px-4 mx-auto text-center md:px-8">
      

        {/* Massive Number */}
        <h2 className="stat-number mb-6 text-5xl font-bold tracking-tight text-[#0d6efd] md:text-7xl lg:text-[5.5rem] leading-none">
          75,000,000+
        </h2>

        {/* Description */}
        <p className="stat-description max-w-2xl mx-auto text-base text-gray-600 md:text-lg leading-relaxed">
          More than 75,00,000 million litres of water treated, with<br className="hidden md:block" /> continuous operations worldwide.
        </p>

      </div>

      {/* Floating Social Buttons */}
      <div className="absolute hidden md:flex right-2 md:right-8 top-1/2 -translate-y-1/2 flex-col gap-3 md:gap-4 z-50">
        <a href="https://t.me/NaazKSP" target="_blank" rel="noopener noreferrer" className="social-btn transition-transform hover:scale-110 active:scale-95" aria-label="Telegram">
          <OptimizedImage
            src={StatsImg1}
            alt="Telegram"
            width={56}
            height={56}
            className="drop-shadow-md rounded-full"
            objectFit="contain"
          />
        </a>
        <a href="https://wa.me/917073472044" target="_blank" rel="noopener noreferrer" className="social-btn transition-transform hover:scale-110 active:scale-95" aria-label="WhatsApp">
          <OptimizedImage
            src={StatsImg2}
            alt="WhatsApp"
            width={56}
            height={56}
            className="drop-shadow-md rounded-full"
            objectFit="contain"
          />
        </a>
      </div>
    </section>
  );
};


export default StatsSection;
