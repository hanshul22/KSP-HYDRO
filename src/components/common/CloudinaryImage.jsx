// src/components/common/CloudinaryImage.jsx
// Drop-in replacement for <img> tags using Cloudinary

import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";
import { auto as autoFormat } from "@cloudinary/url-gen/qualifiers/format";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import cld from "../../lib/cloudinary";
import { useState } from "react";

export default function CloudinaryImage({
  publicId,
  alt,
  width = 600,
  height = 400,
  eager = false,
  className = "",
  style = {},
}) {
  const [loaded, setLoaded] = useState(false);

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

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: `${width} / ${height}`,
        overflow: "hidden",
        background: "#e8edf2",
        ...style,
      }}
    >
      <AdvancedImage
        cldImg={image}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
        plugins={[
          ...(!eager ? [lazyload({ rootMargin: "200px 0px" })] : []),
          placeholder({ mode: "blur" }),
        ]}
      />
    </div>
  );
}
