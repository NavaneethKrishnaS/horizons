import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      Placeholder photography for the tour packages, served from Unsplash's
      CDN while we wait for our own. Next still optimises and resizes these
      at build time, so the visitor is not fetching a 6000px original; the
      only thing hosted elsewhere is the source file.

      Every one of them is a single line in data/packages.ts. Replacing one
      with our own photograph means changing that line to a local path —
      this entry can come out when the last of them has gone.
    */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
