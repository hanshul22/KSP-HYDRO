import { useState, useEffect, useRef } from 'react';

/**
 * LazyVideo - Optimized video component with deferred loading
 * Features:
 * - Only loads video source when in viewport
 * - Poster image support with automatic fallback
 * - Prevents autoplay until visible
 * - Play button overlay for user-initiated playback
 * - Reduces initial bundle and network load
 * - preload="none" to prevent automatic video download
 * 
 * @param {Object} props
 * @param {string} props.src - Video source URL
 * @param {string} props.poster - Poster image URL (optional, auto-generated from video name)
 * @param {string} props.className - CSS classes
 * @param {boolean} props.autoPlay - Auto play when visible (default: false)
 * @param {boolean} props.muted - Muted audio (default: true)
 * @param {boolean} props.loop - Loop video (default: false)
 * @param {boolean} props.playsInline - Plays inline on mobile (default: true)
 * @param {boolean} props.controls - Show video controls (default: false)
 * @param {boolean} props.showPlayButton - Show play button overlay (default: true)
 */
const LazyVideo = ({
  src,
  poster,
  className = '',
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  controls = false,
  showPlayButton = true,
  ...props
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  // Auto-generate poster path if not provided
  const posterImage = poster || (src ? src.replace(/\.(mp4|webm|mov)$/i, '-poster.webp') : null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px',
        threshold: 0.01
      }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Auto play when loaded and in view (only if autoPlay is true)
  useEffect(() => {
    if (isLoaded && autoPlay && videoRef.current && !isPlaying) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Ignore autoplay errors (browser policy)
      });
    }
  }, [isLoaded, autoPlay, isPlaying]);

  // Handle play button click
  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.error('Video play failed:', err);
        });
      }
    }
  };

  // Handle video play/pause events
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {/* Poster image - shown before video loads or when not in view */}
      {(!isInView || !isLoaded) && posterImage && (
        <img
          src={posterImage}
          alt="Video poster"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
      
      {/* Video element - only rendered when in viewport */}
      {isInView && (
        <>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            preload="none"
            poster={posterImage}
            controls={controls && isPlaying}
            onLoadedData={() => setIsLoaded(true)}
            onPlay={handlePlay}
            onPause={handlePause}
            {...props}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Play button overlay - shown when video is not playing */}
          {showPlayButton && !isPlaying && isLoaded && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-200 cursor-pointer group"
              aria-label="Play video"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-blue-600 ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}

          {/* Pause overlay - shown when video is playing and user hovers */}
          {showPlayButton && isPlaying && !controls && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-black/20 transition-colors duration-200 cursor-pointer opacity-0 hover:opacity-100"
              aria-label="Pause video"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              </div>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default LazyVideo;
