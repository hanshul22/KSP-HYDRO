import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { componentTagger } from 'lovable-tagger';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '::',
    port: 8080,
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Only split vendor chunks to avoid circular dependencies
          // Let Vite automatically handle route-based splitting
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react') || id.includes('framer-motion') || 
                id.includes('clsx') || id.includes('tailwind-merge') || id.includes('tailwindcss-animate')) {
              return 'ui-vendor';
            }
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'animation-vendor';
            }
            if (id.includes('@cloudinary')) {
              return 'cloudinary-vendor';
            }
            if (id.includes('date-fns') || id.includes('react-hook-form') || id.includes('zod') || 
                id.includes('@hookform/resolvers') || id.includes('sonner') || id.includes('@emailjs')) {
              return 'utils-vendor';
            }
          }
        }
      }
    }
  }
}));
