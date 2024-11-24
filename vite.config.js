import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    exclude: ['WebSdk']
  },
  resolve: {
    alias: {
      'WebSdk': '/src/modules/WebSdk/index.js'
    }
  }
})
