import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/',
  define: {
    // The embedded Sanity Studio (and some of its deps) read process.env.*
    // which doesn't exist in the browser. Most-specific key wins in esbuild.
    'process.env.NODE_ENV': JSON.stringify(
      mode === 'production' ? 'production' : 'development'
    ),
    'process.env': '{}',
  },
  build: {
    // The lazy-loaded /admin studio chunk is inherently large.
    chunkSizeWarningLimit: 2500,
  },
}))
