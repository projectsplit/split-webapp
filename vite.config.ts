import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
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
    react(),
    // checker({ typescript: true })
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});