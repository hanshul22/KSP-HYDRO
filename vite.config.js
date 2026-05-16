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
          // Route-based code splitting
          if (id.includes('src/pages/Home')) {
            return 'home';
          }
          if (id.includes('src/pages/Products')) {
            return 'products';
          }
          if (id.includes('src/pages/Services')) {
            return 'services';
          }
          if (id.includes('src/pages/Projects')) {
            return 'projects';
          }
          if (id.includes('src/pages/About')) {
            return 'about';
          }
          if (id.includes('src/pages/Contact')) {
            return 'contact';
          }
          
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react') || id.includes('framer-motion') || 
                id.includes('clsx') || id.includes('tailwind-merge') || id.includes('tailwindcss-animate')) {
              return 'ui-vendor';
            }
            if (id.includes('gsap') || id.includes('lenis')) {
              return 'animation-vendor';
            }
            if (id.includes('date-fns') || id.includes('react-hook-form') || id.includes('zod') || 
                id.includes('@hookform/resolvers') || id.includes('sonner')) {
              return 'utils-vendor';
            }
          }
        }
      }
    }
  }
}));
