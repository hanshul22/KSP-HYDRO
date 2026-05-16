import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToHashElement Component
 * 
 * Production-level component that handles automatic scrolling to sections based on URL hash.
 * 
 * Features:
 * - Detects URL hash changes (both on mount and navigation)
 * - Smoothly scrolls to target sections
 * - Accounts for fixed navbar offset (120px)
 * - Works with direct URL access and in-app navigation
 * - Handles edge cases (missing elements, timing issues)
 * 
 * @component
 */
const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract hash from URL (e.g., "#who-we-are")
    const hash = location.hash;

    if (hash) {
      // Remove the '#' symbol to get the element ID
      const elementId = hash.replace('#', '');

      /**
       * Use setTimeout to ensure DOM is fully rendered
       * This is critical for:
       * 1. Lazy-loaded components
       * 2. Dynamic content
       * 3. Page transitions
       */
      const scrollTimeout = setTimeout(() => {
        const element = document.getElementById(elementId);

        if (element) {
          // Calculate scroll position with navbar offset
          const navbarHeight = 120; // Fixed navbar height + padding
          
          // Wrap getBoundingClientRect in requestAnimationFrame to batch layout reads
          requestAnimationFrame(() => {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            // Smooth scroll to calculated position
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          });

          /**
           * Update browser history to reflect the hash
           * This ensures the URL stays in sync with the scroll position
           */
          if (window.location.hash !== hash) {
            window.history.replaceState(null, '', hash);
          }
        } else {
          // Fallback: If element not found, scroll to top
          console.warn(`Element with id "${elementId}" not found`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 200); // 200ms delay for DOM rendering

      // Cleanup timeout on unmount or hash change
      return () => clearTimeout(scrollTimeout);
    } else {
      // No hash present - scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]); // Re-run when hash or pathname changes

  // This component doesn't render anything
  return null;
};

export default ScrollToHashElement;
