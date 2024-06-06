// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-security"],
   security: {
    headers: {
      crossOriginEmbedderPolicy:
        process.env.NODE_ENV === "development" ? "unsafe-none" : "require-corp",
      crossOriginResourcePolicy: 'same-origin',
      crossOriginOpenerPolicy: 'same-origin',
       contentSecurityPolicy: {
         'base-uri': ["'none'"],
         'default-src': ["'none'"],
         'connect-src': ["'self'", 'https:'],
         'font-src': ["'self'", 'https:', 'data:'],
         'form-action': ["'self'"],
         'frame-ancestors': ["'self'"],
         'frame-src': ["'self'"],
         'img-src': ["'self'", 'data:', 'https://source.unsplash.com', 'https://images.unsplash.com'],
         'manifest-src': ["'self'"],
         'media-src': ["'self'"],
         'object-src': ["'none'"],
         'script-src-attr': ["'none'"],
         'style-src': ["'self'", 'https:', "'unsafe-inline'"],
         'script-src': ["'self'", 'https:', "'unsafe-inline'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
         'upgrade-insecure-requests': true,
         'worker-src': ["'self'"],
       }
    },
    basicAuth: {
      enabled: false,
      name: "test",
      pass: "test",
      message: "Basic Auth Required",
    },
  },
  typescript: {
    strict: true,
  },
  telemetry: false,
})