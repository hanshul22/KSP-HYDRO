import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.png';

/**
 * BrandSection - Company logo and branding display
 * Positioned on the left side of the navbar
 */
const BrandSection = () => {
  return (
    <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
      <img
        src={logo}
        alt="KSP Hydro Engineers"
        width={44}
        height={44}
        className="transition-transform group-hover:scale-110 object-contain"
      />
      <div className="flex flex-col">
        <span className="text-gray-900 font-bold text-sm md:text-[17px] leading-tight tracking-tight">
          KSP Hydro Engineers
        </span>
        <span className="hidden sm:block text-[10px] text-gray-500 font-medium tracking-[0.1em] uppercase">
          Pavati Beyond Imagination
        </span>
      </div>
    </Link>
  );
};

export default BrandSection;
