// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//       global: 'window', // Add this line

// })
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import rollupNodePolyFill from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    // rollupNodePolyFill(), // ✅ this works in v0.1.3
  ],
  define: {
    global: 'window',
    'process.env': {},
  },
  resolve: {
    alias: {
      util: 'util',
      events: 'events',
      stream: 'stream-browserify',
      buffer: 'buffer',
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'stream-browserify', 'util', 'events'],
  },
});

