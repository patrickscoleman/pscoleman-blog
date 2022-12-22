/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./utils/generate-sitemap");
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
