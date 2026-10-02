import { defineConfig, mergeConfig, type ConfigEnv, type UserConfig } from 'vite';
import baseConfig from '../vite.config';

export default defineConfig(async (env: ConfigEnv) => {
  const base: UserConfig =
    typeof baseConfig === 'function' ? await baseConfig(env) : await baseConfig;

  return mergeConfig(base, {
    cacheDir: 'node_modules/.vite-e2e',
    optimizeDeps: { include: ['react-scan'] },
  });
});
