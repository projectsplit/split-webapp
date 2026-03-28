import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { VitePWA } from 'vite-plugin-pwa';
// import * as fs from 'node:fs';
// import path from 'path';

export default defineConfig({
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost+1-key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost+1.pem')),
  //   },
  //   host: 'localhost',
  //   port: 5173,
  // },
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
        name: 'Buqs',
        short_name: 'Buqs',
        description: 'Buqs Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
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