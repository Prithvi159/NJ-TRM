import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/njtransit': {
        target: 'http://localhost:7001',
        secure: false,
      },
    },
  },
  plugins: [react()],
})
