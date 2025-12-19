import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import path from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      }
    }),
    tailwindcss()
  ],
  envDir: '../',
  build: {
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '@app': path.resolve(__dirname, 'app'),
      '@pages': path.resolve(__dirname, 'pages'),
      '@widgets': path.resolve(__dirname, 'widgets'),
      '@features': path.resolve(__dirname, 'features'),
      '@entities': path.resolve(__dirname, 'entities'),
      '@shared': path.resolve(__dirname, 'shared')
    }
  }
});
