export default {
  target: 'static',

  head: {
    title: 'Multicommerce Admin Center',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Multicommerce Admin Center.'
      },
      {
        hid: 'msapplication-TileColor',
        name: 'msapplication-TileColor',
        content: '#2b5797'
      },
      {
        hid: 'msapplication-config',
        name: 'msapplication-config',
        content: '/browserconfig.xml'
      },
      { name: 'theme-color', content: '#fff' }
    ],
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap'
      },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/icons/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/icons/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/icons/favicon-16x16.png'
      },
      {
        rel: 'mask-icon',
        color: '#5bbad5',
        href: '/icons/safari-pinned-tab.svg'
      }
    ]
  },

  loading: {
    color: '#A855F7',
    failedColor: '#EF4444'
  },

  pwa: {
    icon: false,
    manifest: {
      lang: 'en',
      name: 'Multicommerce Admin Center',
      short_name: 'Multicommerce AC',
      start_url: '/',
      display: 'standalone',
      theme_color: '#fff',
      background_color: '#fff',
      description: 'Multicommerce Admin Center.',
      icons: [
        {
          src: '/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    }
  },

  css: ['@/assets/scss/tailwind.scss'],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/tailwindcss'],

  modules: ['@nuxtjs/pwa', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  publicRuntimeConfig: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://ecoseaproducts.com/api/admin'
        : 'http://api.multicommerce.test/api/admin'
  },

  axios: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'https://ecoseaproducts.com/api/admin'
        : 'http://api.multicommerce.test/api/admin'
  },

  generate: {
    fallback: true
  },

  router: {
    middleware: ['auth']
  },

  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/auth/login',
      home: '/'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post'
          },
          user: {
            url: '/auth/admin',
            method: 'get'
          },
          logout: {
            url: '/logout',
            method: 'post'
          }
        },
        user: {
          property: 'data'
        }
      }
    }
  },

  build: {
    postcss: {
      preset: {
        features: {
          'focus-within-pseudo-class': false
        }
      }
    }
  },

  server: {
    port: 8000,
    host: '0.0.0.0'
  }
};
