// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/LanaResume/dist/'
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  typescript: {
    typeCheck: true
  },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
})
