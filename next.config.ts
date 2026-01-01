const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,

  disable: process.env.NODE_ENV === 'development',

  runtimeCaching: [
    // App shell & pages
    {
      urlPattern: ({ request }: { request: any }) =>
        request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages',
        networkTimeoutSeconds: 3,
      },
    },

    // JS / CSS
    {
      urlPattern: /\.(?:js|css)$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources',
      },
    },

    // Images
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
  ],
})

module.exports = withPWA({
  reactStrictMode: true,
})
