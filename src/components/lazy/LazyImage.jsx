import { useState, useMemo } from 'react';
import { useLazyLoad } from '@/hooks';

/**
 * LazyImage - Optimized image component with lazy loading
 * Features:
 * - Lazy loading with SHARED IntersectionObserver (performance optimized)
 * - Smooth fade-in transition
 * - Prevents layout shift with aspect ratio
 * - Responsive image support
 * 
 * @param {Object} props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - CSS classes
 * @param {number} props.width - Image width (for aspect ratio)
 * @param {number} props.height - Image height (for aspect ratio)
 * @param {boolean} props.priority - Load immediately (for above-fold images)
 * @param {string} props.objectFit - CSS object-fit value
 */
const LazyImage = ({
  src,
  alt = '',
  className = '',
  width,
  height,
  priority = false,
  objectFit = 'cover',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, isInView } = useLazyLoad(priority);

  // Memoize container style
  const containerStyle = useMemo(() => ({
    aspectRatio: width && height ? `${width} / ${height}` : undefined,
    backgroundColor: '#ffffff'
  }), [width, height]);

  // Memoize img style
  const imgStyle = useMemo(() => ({ objectFit }), [objectFit]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      {isInView && (
        <>
          {/* Placeholder blur effect */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-white animate-pulse" />
          )}
          
          {/* Actual image */}
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full transition-opacity duration-400 ease-in-out ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={imgStyle}
            width={width}
            height={height}
            {...props}
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;
