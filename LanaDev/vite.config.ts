import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production'
  return {
    base: isProd ? '/dist': './',
    plugins: [vue()]
  }
})
