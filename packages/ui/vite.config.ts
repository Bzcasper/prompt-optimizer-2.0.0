/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, '../ui')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'PromptOptimizerUI',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs']
    },
    watch: process.env.NODE_ENV === 'development' ? {
      // More precise watch configuration
      include: ['src/**/*'],
      buildDelay: 100
    } : null,
    sourcemap: true,
    rollupOptions: {
      external: ['vue', '@prompt-optimizer/core', 'element-plus', 'element-plus/dist/index.css', 'uuid'],
      output: {
        globals: {
          vue: 'Vue',
          '@prompt-optimizer/core': 'PromptOptimizerCore',
          'element-plus': 'ElementPlus',
          'uuid': 'uuid'
        },
        assetFileNames: 'style.css'
      }
    },
    cssCodeSplit: false,
    emptyOutDir: false
  },
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'],
  test: {
    // Global timeout set to 5 seconds
    testTimeout: 5000,
    // Environment settings
    environment: 'jsdom',
    // Global setup files
    setupFiles: ['./tests/setup.ts'],
    // Included file patterns
    include: ['tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // Excluded file patterns
    exclude: ['**/node_modules/**', '**/dist/**', '**/.{idea,git,cache,output,temp}/**'],
    // Global test settings
    globals: true,
    // Test coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        '**/[.]**',
        'packages/*/test?(s)/**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__x00__*',
        '**/\x00*',
        'cypress/**',
      ],
    },
  },
})