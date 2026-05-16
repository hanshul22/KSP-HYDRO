// src/components/common/CloudinaryVideo.jsx
// Drop-in replacement for <video> tags using Cloudinary

import { AdvancedVideo, lazyload } from "@cloudinary/react";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";
import { auto as autoFormat } from "@cloudinary/url-gen/qualifiers/format";
import { fill } from "@cloudinary/url-gen/actions/resize";
import cld from "../../lib/cloudinary";
import { useState } from "react";

export default function CloudinaryVideo({
  publicId,
  width = 600,
  height = 400,
  autoPlay = false,
  loop = false,
  muted = true,
  controls = true,
  className = "",
  style = {},
}) {
  const [loaded, setLoaded] = useState(false);

  const video = cld
    .video(publicId)
    .quality(autoQuality())
    .format(autoFormat())
    .resize(fill().width(width).height(height));

  const posterUrl = `https://res.cloudinary.com/dc4yyyu4l/video/upload/so_0,w_${width},h_${height},c_fill,q_auto,f_jpg/${publicId}.jpg`;

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        overflow: "hidden",
        background: "#e8edf2",
        position: "relative",
        ...style,
      }}
    >
      {!loaded && (
        <img
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

      <AdvancedVideo
        cldVid={video}
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
    </div>
  );
}
