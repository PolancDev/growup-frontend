import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vitest-angular';
import { mergeConfig } from 'vitest/config';

export default mergeConfig(
  defineConfig({
    plugins: [
      angular()
    ]
  }),
  {
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test.ts'],
      include: ['**/*.spec.ts']
    }
  }
);
