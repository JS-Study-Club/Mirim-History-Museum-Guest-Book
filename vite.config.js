import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    force: true,
    include: ['react', 'react-dom']
  },
  server: {
    port: 3000,
    force: true
  },
  clearScreen: false
})