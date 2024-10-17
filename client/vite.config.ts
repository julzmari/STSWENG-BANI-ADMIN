import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT || 5173, // render process
    host: '0.0.0.0',                 
    proxy: {
      '/api':'https://bani-admin-api.onrender.com'
    }
  },
  plugins: [react()]
})
