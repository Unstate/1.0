import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { defineConfig } from 'vitest/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const stylesDir = path.join(dirname, 'src/app/styles');
const browser = () => ({
  enabled: true,
  headless: true,
  provider: playwright(),
  instances: [{ browser: 'chromium' as const }]
});

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  server: {
    proxy: {
      '/api': {
        target: process.env.API_PROXY_TARGET ?? 'http://127.0.0.1:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source: string, filename: string) {
          if (path.dirname(filename) === stylesDir) return source;
          return `@use "${path.join(stylesDir, 'main.scss').replaceAll('\\', '/')}" as *;\n${source}`;
        }
      }
    }
  },
  test: {
    maxWorkers: 2,
    fileParallelism: false,
    projects: [
      {
        extends: true,
        test: {
          name: 'components',
          include: ['src/**/*.{test,spec}.{ts,tsx}'],
          browser: browser()
        }
      },
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, '.storybook') })
        ],
        test: { name: 'storybook', browser: browser() }
      }
    ]
  }
});
