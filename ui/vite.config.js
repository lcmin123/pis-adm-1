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
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '@components': path.resolve(__dirname, 'components'),
      '@providers': path.resolve(__dirname, 'providers'),
      '@routes': path.resolve(__dirname, 'routes'),
      '@shared': path.resolve(__dirname, 'shared'),
      '@stores': path.resolve(__dirname, 'stores'),
      '@utils': path.resolve(__dirname, 'utils')
    }
  }
});
