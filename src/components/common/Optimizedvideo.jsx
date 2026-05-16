// src/components/OptimizedVideo.jsx
// ─────────────────────────────────────────────────────────
// HYBRID: Works with BOTH local files (src) AND Cloudinary (publicId)
//
// USAGE WITH CLOUDINARY:
//   <OptimizedVideo
//     publicId="Equipment3"                    ← Cloudinary video public ID (without ksp/ prefix)
//     posterPublicId="Equipment3-thumbnail"    ← Cloudinary thumbnail public ID (without ksp/ prefix)
//     autoPlay={false}
//     loop={false}
//   />
//
// USAGE WITH LOCAL FILES:
//   <OptimizedVideo
//     src={localVideo}                         ← Local import
//     poster={localThumbnail}                  ← Local thumbnail
//     autoPlay={false}
//     loop={false}
//   />
// ─────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { AdvancedVideo, lazyload } from "@cloudinary/react";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";
import { auto as autoFormat } from "@cloudinary/url-gen/qualifiers/format";
import { fill } from "@cloudinary/url-gen/actions/resize";
import cld from "../../lib/cloudinary";

export default function OptimizedVideo({
  publicId,           // Cloudinary video public ID (without ksp/ prefix) - optional
  posterPublicId,     // Cloudinary thumbnail image public ID (without ksp/ prefix) - optional
  src,                // Local file path (optional)
  poster,             // Local poster path (optional)
  width = 600,
  height = 400,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
  playsInline = true,
  showPlayButton = true,
  className = "",
  style = {},
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const posterImgRef = useRef(null);

  // Determine if using Cloudinary or local files
  const useCloudinary = !!publicId;

  // Cloudinary video setup
  const cloudinaryVideo = useCloudinary ? cld
    .video(publicId)
    .quality(autoQuality())
    .format(autoFormat())
    .resize(fill().width(width).height(height)) : null;

  if (useCloudinary && cloudinaryVideo) {
    console.log("Cloudinary Video URL:", cloudinaryVideo.toURL());
  }

  // UPDATED POSTER LOGIC
  // If posterPublicId is provided, use Cloudinary thumbnail
  // If not, fall back to auto-generated first frame
  const posterUrl = useCloudinary 
    ? (posterPublicId
        ? `https://res.cloudinary.com/dc4yyyu4l/image/upload/q_auto,f_auto,w_${width}/ksp/${posterPublicId}`
        : `https://res.cloudinary.com/dc4yyyu4l/video/upload/so_0,w_${width},h_${height},c_fill,q_auto,f_jpg/ksp/${publicId}.jpg`)
    : poster || (src ? src.replace(/\.(mp4|webm|mov)$/i, '-poster.webp') : null);

  // Log poster URL for debugging
  if (useCloudinary) {
    console.log("Poster URL:", posterUrl);
  }

  // Intersection Observer for lazy loading
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

  // Check if poster image is already cached and loaded
  useEffect(() => {
    const img = posterImgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  // Auto play when loaded
  useEffect(() => {
    if (loaded && autoPlay && videoRef.current && !isPlaying) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Ignore autoplay errors
      });
    }
  }, [loaded, autoPlay, isPlaying]);

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

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  // CLOUDINARY RENDER
  if (useCloudinary && cloudinaryVideo) {
    return (
      <div
        ref={containerRef}
        style={{
          width: "100%",
          aspectRatio: `${width} / ${height}`,
          overflow: "hidden",
          background: "#e8edf2",
          position: "relative",
          transform: 'translateZ(0)',  // Force compositing layer
          willChange: loaded ? 'auto' : 'opacity',  // Hint during transition
          ...style,
        }}
      >
        {!loaded && posterUrl && (
          <img
            ref={posterImgRef}
            src={posterUrl}
            alt="Video thumbnail"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 1,
            }}
          />
        )}

        {isInView && (
          <AdvancedVideo
            cldVid={cloudinaryVideo}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            controls={controls}
            className={className}
            onLoadedData={() => setLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              position: "relative",
              zIndex: 2,
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
            plugins={[
              lazyload({ rootMargin: "300px 0px" }),
            ]}
          />
        )}
      </div>
    );
  }

  // LOCAL FILE RENDER
  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden bg-gray-100 ${className}`} 
      style={{
        transform: 'translateZ(0)',  // Force compositing layer
        willChange: loaded ? 'auto' : 'opacity',  // Hint during transition
        ...style
      }}
    >
      {(!isInView || !loaded) && posterUrl && (
        <img
          ref={posterImgRef}
          src={posterUrl}
          alt="Video poster"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
      
      {isInView && (
        <>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={muted}
            loop={loop}
            playsInline={playsInline}
            preload="none"
            poster={posterUrl}
            controls={controls && isPlaying}
            onLoadedData={() => setLoaded(true)}
            onPlay={handlePlay}
            onPause={handlePause}
            {...props}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {showPlayButton && !isPlaying && loaded && (
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
}