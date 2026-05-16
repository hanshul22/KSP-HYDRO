import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Users, 
  Heart, 
  Handshake,
  Droplets,
  Recycle,
  Filter,
  Waves,
  Layers,
  Activity,
  Wind,
  Settings,
  ShieldCheck,
  Globe,
  Milestone,
  Beaker,
  Lightbulb,
  Briefcase,
  Gauge
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {logo} from '@/assets';
import { OptimizedImage } from '@/components';
import { navItems } from '@/data/navigationData';

// Icon mapping for dropdown items
const iconMap = {
  about: Users,
  journey: Milestone,
  values: Heart,
  certification: ShieldCheck,
  clients: Globe,
  partner: Handshake,
  pool: Droplets,
  'water-treatment': Beaker,
  sewage: Recycle,
  effluent: Filter,
  'reverse-osmosis': Waves,
  lake: Gauge,
  'ultra-filtration': Layers,
  'membrane-reactor': Activity,
  'fluidized-reactor': Wind,
  bio: Droplets,
  sequencing: Activity,
  equipment: Settings,
  project: Briefcase,
  service: Lightbulb,
};

const MobileMenu = ({ isOpen, onClose, navLinks, currentPath }) => {
  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const itemsRef = useRef([]);
  const ctaRef = useRef(null);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Animation Context
  const { contextSafe } = useGSAP({ scope: containerRef });

  // Close Animation Sequence
  const handleClose = contextSafe(() => {
    const tl = gsap.timeline({
      onComplete: onClose
    });

    // 1. Menu items fade out
    tl.to(itemsRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in"
    })
    // CTA fade out
    .to(ctaRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.2,
      ease: "power2.in"
    }, "<")
    // 2. Panel fades + slight downward motion
    .to(panelRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.98,
      duration: 0.25,
      ease: "power2.in"
    }, "-=0.1")
    // 3. Overlay fades out
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.15");
  });

  // Open Animation Sequence
  useGSAP(() => {
    if (!isOpen) return;

    const tl = gsap.timeline();

    // 1. Overlay fades in
    tl.fromTo(overlayRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.25 }
    )
    // 2. Menu panel appears
    .fromTo(panelRef.current,
      { opacity: 0, y: 20, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power2.out" },
      "-=0.15"
    )
    // 3. Menu items stagger in
    .fromTo(itemsRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out" },
      "-=0.2"
    )
    // 4. CTA button appears last
    .fromTo(ctaRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.2"
    );

  }, { scope: containerRef, dependencies: [isOpen] });

  // Micro-interactions
  const handleCtaTap = contextSafe((e) => {
    gsap.to(e.currentTarget, { scale: 0.96, duration: 0.15, yoyo: true, repeat: 1 });
    handleClose(); // Close on CTA click
  });

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 flex items-start justify-center lg:hidden pt-24">
      {/* 1. Full-screen overlay backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-transparent"
        onClick={handleClose}
      />

      {/* 2. Menu panel (centered card style) */}
      <div 
        ref={panelRef}
        className="relative w-[95%] bg-white shadow-2xl rounded-b-[32px] overflow-hidden max-h-[80vh] flex flex-col border-x border-b border-gray-100"
      >
        {/* Removed redundant header to avoid "double" branding and keep it simple */}

        {/* 4. Navigation links - Centered items without sub-sections */}
        <div className="flex flex-col px-4 pt-10 pb-6 space-y-4 overflow-y-auto flex-1">
          {navLinks.map((link, i) => (
            <div key={link.id} className="text-center">
              <Link
                to={link.path}
                ref={el => itemsRef.current[i] = el}
                onClick={handleClose}
                className={`w-full px-4 py-2 text-lg font-medium transition-all duration-200 block ${
                  currentPath === link.path 
                    ? 'text-blue-600 font-bold' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>

        {/* 5. Primary CTA button */}
        <div className="px-10 pb-8 pt-2 bg-white">
          <Link
            to="/contact"
            ref={ctaRef}
            onClick={handleCtaTap}
            className="block w-full py-3 text-center text-white bg-blue-600 rounded-xl text-sm font-bold shadow-lg hover:bg-blue-700 transition-all duration-200 active:scale-98"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const containerRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    
    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
      reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
      const { isDesktop, reduceMotion } = context.conditions;
      
      if (reduceMotion) {
        gsap.set(containerRef.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline();

      // Main container drop
      tl.from(containerRef.current, {
        y: isDesktop ? -30 : -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      });

      // Stagger children content
      tl.from(".nav-content-item", {
        y: -10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all" 
      }, "-=0.4");
    });
  }, { scope: containerRef });

  const handleMouseEnter = (navId) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(navId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleDropdownItemClick = (path) => {
    setActiveDropdown(null);
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  // Get active dropdown data
  const activeDropdownData = navItems.find(item => item.id === activeDropdown);

  return (
    <>
      <nav ref={containerRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
        <div className="flex items-center justify-between px-8 py-4 bg-white/95 backdrop-blur-md rounded-full shadow-xl lg:px-12 border border-gray-100">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 nav-content-item">
            <OptimizedImage
              src={logo}
              alt="KSP Hydro Engineers Logo"
              width={40}
              height={40}
              eager={true}
              objectFit="contain"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg block leading-tight">
                KSP Hydro Engineers
              </span>
              <span className="hidden sm:block text-[10px] text-gray-500 lg:text-xs">
                Pavati Beyond Imagination
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden gap-2 lg:flex">
            {navItems.map((link) => (
              <div
                key={link.id}
                className="relative"
              >
                  <Link
                    to={link.path}
                    key={link.id}
                    className={`nav-link text-sm font-semibold transition-all duration-300 relative py-2 px-4 block ${
                      isActive(link.path) || activeDropdown === link.id
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                    onMouseEnter={() => handleMouseEnter(link.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setActiveDropdown(null)}
                  >
                    {link.name}
                    {(isActive(link.path) || activeDropdown === link.id) && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </Link>
              </div>
            ))}
            
            {/* Contact Button */}
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md ml-2 nav-content-item"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button - Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2.5 text-gray-700 lg:hidden hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 nav-content-item active:scale-95"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Global Dropdown Panel - Below Navbar */}
        {activeDropdownData && activeDropdownData.dropdown && (
          <div
            className="absolute left-1/2 -translate-x-1/2 mt-0 hidden lg:block z-50 transition-all duration-300"
            onMouseEnter={() => handleMouseEnter(activeDropdownData.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={`bg-white rounded-[32px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden ${
              activeDropdownData.id === 1 || activeDropdownData.id === 2 ? 'w-[95vw] max-w-[1100px]' : 'w-auto min-w-[380px]'
            } ${
              activeDropdown === activeDropdownData.id
                ? 'opacity-100 visible translate-y-0'
                : 'opacity-0 invisible -translate-y-4 pointer-events-none'
            }`}>
              <div className="px-8 py-8">
                {/* Different layouts based on dropdown type */}
                <div className={`${
                  activeDropdownData.id === 1 // Products
                    ? 'grid grid-cols-5 gap-4' 
                    : activeDropdownData.id === 2 // Projects
                    ? 'grid grid-cols-5 gap-4'
                    : 'grid grid-cols-2 gap-4' // About, Services
                } mx-auto`}>
                    {activeDropdownData.dropdown.map((item) => {
                      const IconComponent = iconMap[item.icon] || Briefcase;
                      
                      return (
                      <button
                        key={item.id}
                        onClick={() => handleDropdownItemClick(item.path)}
                        className="px-4 py-3.5 text-[13px] font-semibold transition-all duration-300 rounded-xl flex items-center justify-start gap-3 group border-2 w-full bg-white border-gray-50 text-gray-600 hover:border-blue-100 hover:text-blue-600 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_-5px_rgba(0,0,0,0.08)]"
                      >
                        <div className="p-1.5 rounded-lg transition-colors duration-300 bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500">
                          <IconComponent className="w-4 h-4 flex-shrink-0" />
                        </div>
                        <span className="text-left leading-tight block flex-1">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Portal */}
      {isMenuOpen && (
        <MobileMenu 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
          navLinks={navItems}
          currentPath={location.pathname}
        />
      )}
    </>
  );
};

export default Header;
