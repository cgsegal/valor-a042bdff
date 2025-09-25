import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined,
        format: 'es'
      }
    },
    commonjsOptions: {
      include: [/node_modules/]
    },
    sourcemap: false,
    reportCompressedSize: false
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
      target: 'esnext'
    },
  },
  define: {
    global: 'globalThis',
  },
  esbuild: {
    target: 'esnext',
    format: 'esm'
  },
  envPrefix: 'VITE_',
  envDir: '.'
}) 