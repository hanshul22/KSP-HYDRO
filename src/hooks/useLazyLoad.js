import { useEffect, useRef, useState } from 'react';
import lazyObserver from '../utils/lazyObserver';

/**
 * useLazyLoad - Hook for lazy loading with shared IntersectionObserver
 * 
 * This hook uses a single shared observer instance across all components,
 * preventing performance issues from creating multiple observers.
 * 
 * @param {boolean} eager - If true, skip lazy loading (for above-fold images)
 * @returns {Object} { ref, isInView }
 * 
 * @example
 * const { ref, isInView } = useLazyLoad(false);
 * return <div ref={ref}>{isInView && <img src="..." />}</div>
 */
export function useLazyLoad(eager = false) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(eager);

  useEffect(() => {
    // Skip if eager loading
    if (eager) {
      setIsInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Listen for lazyload event
    const handleLazyLoad = () => setIsInView(true);
    el.addEventListener('lazyload', handleLazyLoad);

    // Observe element
    lazyObserver.observe(el);

    // Cleanup
    return () => {
      el.removeEventListener('lazyload', handleLazyLoad);
      lazyObserver.unobserve(el);
    };
  }, [eager]);

  return { ref, isInView };
}

export default useLazyLoad;
