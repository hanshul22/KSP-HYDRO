// src/lib/cloudinary.js
// ─────────────────────────────────────────────────────────
// Frontend-only Cloudinary setup. No API keys needed here.
// Only your Cloud Name is required (it's public).
// ─────────────────────────────────────────────────────────

import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: "dc4yyyu4l"
  },
  url: {
    secure: true, // always use https
  },
});

export default cld;
