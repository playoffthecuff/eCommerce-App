/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

type ViteConfigOutput = {
  mode: string;
  command: string;
};

// https://vitejs.dev/config/
export default (args: ViteConfigOutput) => {
  const generateScopedName = args.mode === 'production' ? '[hash:base64:3]' : '[local]_[hash:base64:3]';

  return defineConfig({
    base: '/eCommerceApp/',
    plugins: [react()],
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      coverage: {
        reportsDirectory: './tests/coverage',
      },
    },
  });
};
