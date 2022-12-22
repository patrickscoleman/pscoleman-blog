module.exports = {
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
