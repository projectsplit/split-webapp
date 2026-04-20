import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
// import * as fs from 'node:fs';
// import path from 'path';

export default defineConfig({
  server: {
    port: 5175,
    host: true,
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost+1-key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost+1.pem')),
  //   },
  //   host: 'localhost',
  //   port: 5173,
  // },
  },  
  plugins: [
    react({
      // Add the Babel transform here
      babel: {
        plugins: [
          ["module:@preact/signals-react-transform"]
        ]
      }
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192x192.png', 'icon-512x512.png'],
      manifest: {
        id: '/',
        start_url: '/',
        name: 'Buqs',
        short_name: 'Buqs',
        description: 'Buqs Web App',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3000000 // 3MB
      },
      devOptions: {
        enabled: true
      }
    }),
    // checker({ typescript: true }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});