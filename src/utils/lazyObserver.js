/**
 * Shared IntersectionObserver for lazy loading images
 * 
 * This single observer instance is shared across ALL lazy-loaded images
 * in the application, preventing the performance issue of creating
 * multiple observer instances.
 * 
 * Usage: Import and use via useLazyLoad hook
 */

const lazyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        // Handle data-src attribute (if used)
        if (el.dataset.src) {
          el.src = el.dataset.src;
          el.removeAttribute('data-src');
        }
        
        // Add loaded class for fade-in effect
        el.classList.add('loaded');
        
        // Trigger custom event for React components
        el.dispatchEvent(new CustomEvent('lazyload'));
        
        // Unobserve after loading
        lazyObserver.unobserve(el);
      }
    });
  },
  {
    rootMargin: '200px 0px', // Preload 200px before entering view
    threshold: 0.01
  }
);

export default lazyObserver;
