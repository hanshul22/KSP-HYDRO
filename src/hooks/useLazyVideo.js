import { useEffect, useState } from 'react';

/**
 * useLazyVideo - Custom hook for lazy loading videos with IntersectionObserver
 * 
 * This hook observes a video element and only sets its src attribute when it
 * enters the viewport, preventing unnecessary video downloads on page load.
 * 
 * @param {React.RefObject} ref - Reference to the video element
 * @param {string} dataSrc - The actual video source URL
 * @param {Object} options - IntersectionObserver options
 * @param {string} options.rootMargin - Margin around the root (default: '100px')
 * @param {number} options.threshold - Visibility threshold (default: 0.01)
 * 
 * @returns {Object} - { isInView, hasLoaded }
 * 
 * @example
 * const videoRef = useRef(null);
 * const { isInView, hasLoaded } = useLazyVideo(videoRef, '/videos/demo.mp4');
 * 
 * return (
 *   <video ref={videoRef} data-src="/videos/demo.mp4" preload="none">
 *     {hasLoaded && <source src="/videos/demo.mp4" type="video/mp4" />}
 *   </video>
 * );
 */
const useLazyVideo = (ref, dataSrc, options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const {
    rootMargin = '100px',
    threshold = 0.01
  } = options;

  useEffect(() => {
    // Skip if no ref or dataSrc
    if (!ref.current || !dataSrc) return;

    const videoElement = ref.current;

    // Create IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsInView(true);
          
          // Set the video src from data-src attribute
          const src = videoElement.getAttribute('data-src');
          if (src && !videoElement.src) {
            videoElement.src = src;
            setHasLoaded(true);
          }
          
          // Disconnect observer after loading
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold
      }
    );

    // Start observing
    observer.observe(videoElement);

    // Cleanup
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, [ref, dataSrc, rootMargin, threshold, hasLoaded]);

  return { isInView, hasLoaded };
};

export default useLazyVideo;
