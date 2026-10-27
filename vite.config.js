import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'pwa/apple-touch-icon-180x180.png'],
      manifest: {
        name: 'bt-proto',
        short_name: 'bt-proto',
        description: 'bt-proto',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#00050f',
        background_color: '#00050f',
        // Placeholder icons — replace files in public/pwa/ with real artwork
        icons: [
          { src: 'pwa/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webp,woff2}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
})
