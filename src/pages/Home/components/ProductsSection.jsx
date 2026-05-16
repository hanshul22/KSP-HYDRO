import { Droplet, Filter, Recycle, Factory, Settings } from 'lucide-react';
import ProductsData from '@/data/ProductsData';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OptimizedVideo, OptimizedImage } from '@/components';
import { productCloudinaryIds } from '@/data/cloudinaryMapping';

// Import local poster images for videos
import prdImg1 from '@/assets/Products/prd-img1.webp';
import prdImg3 from '@/assets/Products/prd-img3.webp';
import prdImg4 from '@/assets/Products/prd-img4.webp';
import prdImg6 from '@/assets/Products/prd-img6.webp';
import prdImg9 from '@/assets/Products/prd-img9.webp';
import prdImg10 from '@/assets/Products/prd-img10.webp';
import prdImg11 from '@/assets/Products/prd-img11.webp';

gsap.registerPlugin(ScrollTrigger);

// Toggle between Cloudinary and local assets
const USE_CLOUDINARY = false;  // Set to true to use Cloudinary

// Local poster mapping for videos
const localPosters = {
  'Prd1': prdImg1,
  'Prd3': prdImg3,
  'Prd4': prdImg4,
  'Prd6': prdImg6,
  'Prd9': prdImg9,
  'Prd10': prdImg10,
  'Prd11': prdImg11,
};

const ProductsSection = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const iconMap = {
    'water-drop': Droplet,
    filter: Filter,
    recycle: Recycle,
    factory: Factory,
    settings: Settings,
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. ENTRY ANIMATION (ScrollTrigger)
    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
      },
      (context) => {
        const { isDesktop, reduceMotion } = context.conditions;

        // Skip animations if reduced motion is preferred
        if (reduceMotion) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        });

        // Header Fade In
        tl.fromTo('.products-header',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        )
          // Product Cards Staggered Entry
          .fromTo('.product-card',
            { y: isDesktop ? 30 : 15, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.12,
              ease: "power2.out"
            },
            "-=0.4"
          );
      }
    );

    // 2. HOVER ANIMATIONS (Desktop Only)
    // Setup hover only if not reduced motion and is desktop
    if (!prefersReducedMotion && isDesktop) {
      const cards = gsap.utils.toArray('.product-card');

      cards.forEach(card => {
        const image = card.querySelector('.product-image');
        const iconBadge = card.querySelector('.product-icon-badge');

        const hoverTl = gsap.timeline({ paused: true });

        // Card Lift + Shadow
        hoverTl.to(card, {
          y: -6,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          duration: 0.3,
          ease: "power2.out"
        }, 0)
          // Image Scale
          .to(image, {
            scale: 1.04,
            duration: 0.4,
            ease: "power2.out"
          }, 0)
          // Icon Badge Lift
          .to(iconBadge, {
            y: -4,
            scale: 1.06,
            duration: 0.3,
            ease: "power2.out"
          }, 0);

        card.addEventListener('mouseenter', () => hoverTl.play());
        card.addEventListener('mouseleave', () => hoverTl.reverse());
      });
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-16 mt-28 products-section">
      {/* Green Background Vector - Mobile Only */}
      <div className="absolute inset-0 z-0 pointer-events-none md:hidden">
        <svg
          className="w-full h-auto min-h-[462px] object-cover"
          viewBox="0 0 375 462"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M329.685 445.968C347.5 433.12 366.5 435 375.5 458V142.5C353.359 147.063 341.705 120.507 340.44 108.34C340.44 28.6596 209.912 54.6477 204.429 54.6477C126.407 57.805 24.2887 51.2958 0 0V249.779C6.5791 292.971 17.5 338.5 31.5 358.5C37.1 366.5 82.5895 414.03 124.088 386.655C165.587 359.28 194.94 385.388 204.429 401.864C243.904 480.948 304.381 464.218 329.685 445.968Z"
            fill="#EFFEEF"
          />
        </svg>
      </div>

      {/* Light Blue Wave Layer */}
      <div className="absolute top-3 left-0 w-full h-[20px] -translate-y-6 md:-translate-y-8 z-0 pointer-events-none">
        {/* Desktop SVG */}
        <svg
          className="w-full hidden md:block"
          height="120"
          preserveAspectRatio="none"
          viewBox="0 0 1340 126"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M132.298 37.1257C73.4988 5.96105 0 62.227 0 62.227V126H1340V81.1656C1340 81.1656 1284.3 18.5629 1203.83 48.9745C1123.37 79.3861 1083.14 30.0166 1027.82 20.5376C972.506 11.0587 972.506 23.8282 884.307 48.9745C796.109 74.1207 762.841 4.53874e-05 671.934 0C581.028 -4.53873e-05 564.394 39.1006 490.121 48.9745C415.849 58.8483 379.486 20.5376 310.242 20.5376C249.204 20.5376 191.097 68.2904 132.298 37.1257Z"
            fill="#D7F1F8"
          />
        </svg>

        {/* Mobile SVG */}

      </div>

      {/* Main Blue Background */}
      <div className="absolute inset-0 z-0 hidden pointer-events-none md:block">
        <svg
          className="w-full"
          height="725"
          preserveAspectRatio="none"
          viewBox="0 0 1340 725"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M132.298 36.3467C73.4988 5.83596 0 47.9468 0 47.9468V721.907L1340 725V64.5734C1340 64.5734 1284.3 18.1733 1203.83 47.9468C1123.37 77.7202 1083.14 29.3867 1027.82 20.1067C972.506 10.8266 972.506 23.3282 884.307 47.9468C796.109 72.5654 762.841 4.44349e-05 671.934 0C581.028 -4.44348e-05 564.394 38.2801 490.121 47.9468C415.849 57.6134 379.486 20.1067 310.242 20.1067C249.204 20.1067 191.097 66.8574 132.298 36.3467Z"
            fill="url(#paint0_linear_1_94)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_1_94"
              x1="904.809"
              y1="116.387"
              x2="910.993"
              y2="752.454"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#1561F6" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 px-4 mx-auto max-w-7xl md:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16 products-header">
          <p className="mb-3 text-sm font-semibold tracking-wide uppercase text-blue-500 md:text-white/90">
            Our Solutions
          </p>
          <h2 className="mb-4 text-4xl font-bold text-black md:text-white md:text-4xl lg:text-5xl">
            Our Products
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-black md:text-lg md:text-white/90">
            Comprehensive water treatment solutions engineered for reliability and
            sustainability
          </p>
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {ProductsData.map((product) => {
            const Icon = iconMap[product.headerIcon?.type] || Droplet;

            // Determine if this product uses a video
            // Vite imports return the actual URL string, so we can check it directly
            const isVideo = product.image && String(product.image).toLowerCase().includes('.mp4');

            // Get the product key by checking which key name appears in the URL
            // Vite adds hash suffixes like Prd2_nkx4l4, so we need to match the base name
            const productKey = Object.keys(productCloudinaryIds).find(key => {
              if (key.includes('Poster')) return false;
              const imageStr = String(product.image);
              // Match the key at the start of the filename (before any hash or extension)
              // e.g., "Prd2" matches "/assets/Prd2_nkx4l4.webp"
              console.log(imageStr);

              return imageStr.includes(`/${key}_`) || imageStr.includes(`/${key}.`);
            });

            return (
              <div
                key={product.id}
                onClick={() => navigate(`/products#${product.slug}`)}
                className="product-card flex flex-col h-full overflow-hidden bg-white shadow-md rounded-lg w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] transition-none cursor-pointer"
              >
                {/* Image/Video */}
                <div
                  className="relative w-full overflow-hidden bg-gray-200"
                  style={{ height: '200px' }}
                >
                  {USE_CLOUDINARY ? (
                    // Cloudinary Mode
                    isVideo ? (
                      <OptimizedVideo
                        publicId={productCloudinaryIds[productKey]}
                        posterPublicId={productCloudinaryIds[`${productKey}Poster`]}
                        width={400}
                        height={200}
                        autoPlay={false}
                        muted={true}
                        loop={true}
                        controls={false}
                        className="product-image w-full h-full transition-none object-cover"
                      />
                    ) : (
                      <OptimizedImage
                        src={product.image}
                        alt={product.title}
                        width={600}
                        height={200}
                        eager={true}
                        className="product-image w-full h-full transition-none object-cover"
                      />
                    )
                  ) : (
                    // Local Assets Mode (fallback)
                    isVideo ? (
                      <video
                        src={product.image}
                        poster={localPosters[productKey]}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="product-image w-full h-full transition-none object-cover"
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={product.title}
                        className="product-image w-full h-full transition-none object-cover"
                        onError={(e) => console.error(`Failed to load image for ${product.title}:`, e)}
                        onLoad={() => console.log(`Successfully loaded image for ${product.title}`)}
                      />
                    )
                  )}

                  {/* Icon Badge */}
                  <div className="absolute z-10 top-3 right-3 product-icon-badge">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg shadow-sm bg-white/95 backdrop-blur-sm">
                      <Icon className="product-icon w-5 h-5 text-blue-600" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 className="mb-2 text-base font-bold leading-snug text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {product.homeSubtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
