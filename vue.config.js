// vue.config.js 

module.exports = {
  pwa: {
    name: 'Bankie',
    themeColor: '#ca3e47',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    assetsVersion: '0.01',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      runtimeCaching: [
        {
          // cache google fonts stylesheets
          urlPattern: /^https:\/\/fonts\.googleapis\.com/,
          handler: 'staleWhileRevalidate',

          options: {
            cacheName: 'google-fonts-stylesheets'
          }
        },
        {
          // cache google fonts webfont
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'cacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365 // a year
            }
          }
        }
      ]
    },

    // iconPaths
    iconPaths: {
      favicon32: 'static/icons/Icon-20.png',
      favicon16: 'static/icons/Icon-20.png',
      appleTouchIcon: 'static/icons/Icon-152.png',
      msTileImage: 'static/icons/Icon-144.png'
    }
  }
}