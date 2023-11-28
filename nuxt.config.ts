// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    autoImport: true
  },
  css: ['assets/global.scss'],
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET ?? '114514'
  },
  modules: [
    '@unocss/nuxt',
    'nuxt-icon',
    '@nuxtjs/color-mode',
    'nuxt-quasar-ui',
    'nuxt-headlessui',
    '@vite-pwa/nuxt',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
    'nuxt-lodash',
    'dayjs-nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt'
  ]
});
