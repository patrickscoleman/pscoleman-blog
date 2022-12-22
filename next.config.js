/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-sitemap");
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/",
        permanent: true, // triggers 308 redirect
      },
    ];
  },
};
