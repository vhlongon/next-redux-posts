import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.test.?(c|m)[jt]s?(x)'],
    setupFiles: './test.setup.ts',
    coverage: {
      reporter: ['lcov', 'html', 'json', 'text-summary'],
      include: ['app/**', 'lib/**', '!app/styles/**'],
    },
  },
});
