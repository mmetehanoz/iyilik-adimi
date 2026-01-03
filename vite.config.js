import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Github Pages (project pages) icin alt dizin:
  // Repo adi: iyilik-adimi → /iyilik-adimi/
  base: '/iyilik-adimi/',
  plugins: [react()],
})
