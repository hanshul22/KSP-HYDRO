// src/components/OptimizedImage.jsx
// ─────────────────────────────────────────────────────────
// HYBRID: Works with BOTH local files (src) AND Cloudinary (publicId)
//
// USAGE WITH CLOUDINARY:
//   <OptimizedImage
//     publicId="ksp/swimming-pool"   ← Cloudinary public ID
//     alt="Swimming pool"
//     width={600}
//     height={400}
//   />
//
// USAGE WITH LOCAL FILES:
//   <OptimizedImage
//     src={localImage}               ← Local import
//     alt="Swimming pool"
//     width={600}
//     height={400}
//   />
// ─────────────────────────────────────────────────────────

import { useState, useMemo, useRef, useEffect } from "react";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";
import { auto as autoFormat } from "@cloudinary/url-gen/qualifiers/format";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import cld from "../../lib/cloudinary";
import { useLazyLoad } from '@/hooks';
import PropTypes from 'prop-types';

export default function OptimizedImage({
  publicId,           // Cloudinary public ID (optional)
  src,                // Local file path (optional)
  alt,
  width = 600,
  height = 400,
  eager = false,
  className = "",
  style = {},
  responsive = false,
  sizes = '100vw',
  objectFit = 'cover',
  ...props
}) {
  const [loaded, setLoaded] = useState(true); // ← start visible, avoids cached-image opacity bug
  const [hasError, setHasError] = useState(false);
  const { ref, isInView } = useLazyLoad(eager);
  const imgRef = useRef(null);
  const cloudinaryContainerRef = useRef(null);

  // Determine if using Cloudinary or local files
  const useCloudinary = !!publicId;

  // Check if image is already cached/loaded on mount
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const checkImage = () => {
      if (useCloudinary) {
        // For Cloudinary: find the img element rendered by AdvancedImage
        const container = cloudinaryContainerRef.current;
        if (container) {
          const img = container.querySelector('img');
          if (img && img.complete && img.naturalWidth > 0) {
            setLoaded(true);
          }
        }
      } else {
        // For local files: check the img element directly
        const img = imgRef.current;
        if (img && img.complete && img.naturalWidth > 0) {
          setLoaded(true);
        }
      }
    };

    // Check immediately
    checkImage();

    // Also check after a small delay to catch images that load very quickly
    const timeoutId = setTimeout(checkImage, 10);

    return () => clearTimeout(timeoutId);
  }, [useCloudinary, isInView]);

  // Cloudinary image setup
  const cloudinaryImage = useMemo(() => {
    if (!useCloudinary) return null;

    const image = cld
      .image(publicId)
      .format(autoFormat())
      .quality(autoQuality())
      .resize(
        fill()
          .width(width)
          .height(height)
          .gravity(autoGravity())
      );

    console.log("Cloudinary URL:", image.toURL());
    return image;
  }, [publicId, width, height, useCloudinary]);

  // Local image data setup
  const imageData = useMemo(() => {
    if (useCloudinary || !src) return null;

    const getExtension = (path) => {
      const match = path.match(/\.(jpg|jpeg|png|webp)$/i);
      return match ? match[0] : '.png';
    };

    const ext = getExtension(src);
    const isWebP = ext === '.webp';
    const basePath = src.replace(ext, '');
    const webpPath = isWebP ? src : `${basePath}.webp`;

    const webpSrcSet = responsive
      ? `${basePath}-400w.webp 400w, ${basePath}-800w.webp 800w`
      : undefined;

    const fallbackSrcSet = responsive && !isWebP
      ? `${basePath}-400w${ext} 400w, ${basePath}-800w${ext} 800w`
      : undefined;

    return {
      isWebP,
      webpPath,
      webpSrcSet,
      fallbackSrcSet,
      ext
    };
  }, [src, responsive, useCloudinary]);

  const containerStyle = useMemo(() => ({
    aspectRatio: width && height ? `${width} / ${height}` : undefined,
    backgroundColor: 'transparent',  // Changed from gray to transparent
    transform: 'translateZ(0)',      // Force compositing layer
    willChange: loaded ? 'auto' : 'opacity'  // Hint during transition
  }), [width, height, loaded]);

  const imgStyle = useMemo(() => ({ objectFit }), [objectFit]);

  // CLOUDINARY RENDER
  if (useCloudinary && cloudinaryImage) {
    return (
      <div
        ref={cloudinaryContainerRef}
        style={{
          width: "100%",
          aspectRatio: `${width} / ${height}`,
          overflow: "hidden",
          background: "transparent",  // Changed from gray to transparent
          ...style,
        }}
      >
        {hasError ? (
          <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // background: "#f0f4f8",
            color: "#94a3b8",
            fontSize: "13px",
            gap: "8px",
            borderRadius: "inherit"
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
              <path d="M12 6c-2.67 0-8 1.34-8 4v2c0 2.66 5.33 4 8 4s8-1.34 8-4V10c0-2.66-5.33-4-8-4z" />
            </svg>
            <span>Image unavailable</span>
          </div>
        ) : (
          <AdvancedImage
            cldImg={cloudinaryImage}
            alt={alt}
            className={className}
            onLoad={() => setLoaded(true)}
            onError={() => setHasError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              // opacity: loaded ? 1 : 0,
              // transition: "opacity 0.4s ease",
            }}
            plugins={[
              ...(!eager ? [lazyload({ rootMargin: "200px 0px" })] : []),
              placeholder({ mode: "blur" }),
            ]}
          />
        )}
      </div>
    );
  }

  // LOCAL FILE RENDER
  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      {isInView && (
        <>
          {hasError ? (
            <div style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "#f0f4f8",
              color: "#94a3b8",
              fontSize: "13px",
              gap: "8px",
              borderRadius: "inherit"
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 6c-2.67 0-8 1.34-8 4v2c0 2.66 5.33 4 8 4s8-1.34 8-4V10c0-2.66-5.33-4-8-4z" />
              </svg>
              <span>Image unavailable</span>
            </div>
          ) : (
            <picture>
              {!imageData?.isWebP && (
                <source
                  type="image/webp"
                  srcSet={imageData?.webpSrcSet || imageData?.webpPath}
                  sizes={responsive ? sizes : undefined}
                />
              )}

              {!imageData?.isWebP && (
                <source
                  type={`image/${imageData?.ext.replace('.', '')}`}
                  srcSet={imageData?.fallbackSrcSet || src}
                  sizes={responsive ? sizes : undefined}
                />
              )}

              <img
                ref={imgRef}
                src={imageData?.isWebP ? src : imageData?.webpPath}
                alt={alt}
                loading={eager ? 'eager' : 'lazy'}
                fetchPriority={eager ? 'high' : 'auto'}
                onLoad={() => setLoaded(true)}
                onError={() => setHasError(true)}
                className={`w-full h-full  duration-400 ease-in-out 
                  }`}
                style={imgStyle}
                width={width}
                height={height}
                {...props}
              />
            </picture>
          )}
        </>
      )}
    </div>
  );
}

OptimizedImage.propTypes = {
  publicId: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string,
  eager: PropTypes.bool,
  responsive: PropTypes.bool,
  sizes: PropTypes.string,
  objectFit: PropTypes.string,
};