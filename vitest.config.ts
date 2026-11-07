import { defineConfig } from 'vitest/config';

// Kept apart from vite.config.ts so unit tests load none of the app's build plugins (the PWA
// manifest, the render probe), only the path alias the code under test imports through.
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
});
