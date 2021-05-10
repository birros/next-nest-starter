module.exports = {
  async redirects() {
    return [
      {
        source: "/swagger-ui.css",
        destination: "/api/swagger-ui.css",
        permanent: false,
      },
      {
        source: "/swagger-ui-bundle.js",
        destination: "/api/swagger-ui-bundle.js",
        permanent: false,
      },
      {
        source: "/swagger-ui-standalone-preset.js",
        destination: "/api/swagger-ui-standalone-preset.js",
        permanent: false,
      },
      {
        source: "/swagger-ui-init.js",
        destination: "/api/swagger-ui-init.js",
        permanent: false,
      },
    ];
  },
};
