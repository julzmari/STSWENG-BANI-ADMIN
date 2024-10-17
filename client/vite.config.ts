import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,  
    host: '0.0.0.0',                 
    proxy: {
      '/api':'https://bani-admin-api'
    }
  },
  plugins: [react()]
})
