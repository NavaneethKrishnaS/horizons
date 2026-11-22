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

  /*
    Standard safety instructions, sent with every page.

    Vercel already adds Strict-Transport-Security on its own, but it is
    set here too so the rule travels with the project rather than with
    the host: the same four lines hold if this ever moves off Vercel.

      HSTS                    always use the secure connection
      X-Frame-Options         no other site may show these pages in a frame
      X-Content-Type-Options  do not guess a file's type
      Referrer-Policy         send only the domain when following a link out
      Permissions-Policy      never ask for the camera, microphone or location

    Nothing on the site uses the camera, microphone or location, so
    refusing all three costs us nothing and closes the door on any
    script that might one day try.
  */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
