import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const renderProbe = (): Plugin => ({
  name: 'render-probe',
  apply: 'serve',
  transformIndexHtml(html) {
    if (process.env.VITE_RENDER_PROBE !== '1') return html;
    return {
      html,
      tags: [
        {
          tag: 'script',
          attrs: { type: 'module', src: '/src/devtools/renderProbe.ts' },
          injectTo: 'head-prepend',
        },
      ],
    };
  },
});

export default defineConfig(({ mode }) => {
  const appName = mode === 'test' ? 'Buqs Test' : 'Buqs';

  return {
  plugins: [
    renderProbe(),
    react({
      babel: {
        plugins: [
          ["module:@preact/signals-react-transform"]
        ]
      }
    }),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      includeAssets: ['icon-192x192.png', 'icon-512x512.png'],
      manifest: {
        id: '/',
        start_url: '/',
        name: appName,
        short_name: appName,
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
      injectManifest: {
        maximumFileSizeToCacheInBytes: 3000000 // 3MB
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (/[\\/]node_modules[\\/]@tanstack[\\/]react-query/.test(id)) {
            return 'vendor-query';
          }

          if (
            /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(
              id,
            )
          ) {
            return 'vendor-react';
          }
        },
      },
    },
  },
  };
});